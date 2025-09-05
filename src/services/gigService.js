import { apiService } from './api.js';
import { mockGigs } from '../data/mockData.js';
import { config } from '../config/environment.js';

export class GigService {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }

  // Get all gigs with optional filtering
  async getGigs(filters = {}) {
    try {
      const cacheKey = `gigs_${JSON.stringify(filters)}`;
      const cached = this.cache.get(cacheKey);
      
      if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
        return cached.data;
      }

      // In development or when API is not available, use mock data
      if (config.isDevelopment || !config.apiBaseUrl) {
        const filteredGigs = this.filterMockGigs(mockGigs, filters);
        this.cache.set(cacheKey, { data: filteredGigs, timestamp: Date.now() });
        return filteredGigs;
      }

      const response = await apiService.gigs.getAll(filters);
      const gigs = response.data;
      
      this.cache.set(cacheKey, { data: gigs, timestamp: Date.now() });
      return gigs;
    } catch (error) {
      console.error('Error fetching gigs:', error);
      // Fallback to mock data on error
      return this.filterMockGigs(mockGigs, filters);
    }
  }

  // Get gigs matching user skills and preferences
  async getMatchingGigs(user, filters = {}) {
    try {
      if (config.isDevelopment || !config.apiBaseUrl) {
        const matchingGigs = this.calculateMatches(mockGigs, user);
        return this.filterMockGigs(matchingGigs, filters);
      }

      const response = await apiService.gigs.getMatching(user.farcasterId, filters);
      return response.data;
    } catch (error) {
      console.error('Error fetching matching gigs:', error);
      // Fallback to local matching algorithm
      const matchingGigs = this.calculateMatches(mockGigs, user);
      return this.filterMockGigs(matchingGigs, filters);
    }
  }

  // Search gigs by query
  async searchGigs(query, filters = {}) {
    try {
      if (config.isDevelopment || !config.apiBaseUrl) {
        const searchResults = mockGigs.filter(gig =>
          gig.title.toLowerCase().includes(query.toLowerCase()) ||
          gig.description.toLowerCase().includes(query.toLowerCase()) ||
          gig.skillsRequired.some(skill => 
            skill.toLowerCase().includes(query.toLowerCase())
          )
        );
        return this.filterMockGigs(searchResults, filters);
      }

      const response = await apiService.gigs.search(query, filters);
      return response.data;
    } catch (error) {
      console.error('Error searching gigs:', error);
      // Fallback to local search
      const searchResults = mockGigs.filter(gig =>
        gig.title.toLowerCase().includes(query.toLowerCase()) ||
        gig.description.toLowerCase().includes(query.toLowerCase())
      );
      return this.filterMockGigs(searchResults, filters);
    }
  }

  // Get gig by ID
  async getGigById(id) {
    try {
      const cached = this.cache.get(`gig_${id}`);
      if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
        return cached.data;
      }

      if (config.isDevelopment || !config.apiBaseUrl) {
        const gig = mockGigs.find(g => g.id === id);
        if (gig) {
          this.cache.set(`gig_${id}`, { data: gig, timestamp: Date.now() });
        }
        return gig;
      }

      const response = await apiService.gigs.getById(id);
      const gig = response.data;
      
      this.cache.set(`gig_${id}`, { data: gig, timestamp: Date.now() });
      return gig;
    } catch (error) {
      console.error('Error fetching gig:', error);
      return mockGigs.find(g => g.id === id);
    }
  }

  // Calculate match scores for gigs based on user profile
  calculateMatches(gigs, user) {
    return gigs.map(gig => {
      let matchScore = 0;
      let factors = 0;

      // Skill matching (60% weight)
      if (gig.skillsRequired && user.skills) {
        const matchingSkills = gig.skillsRequired.filter(skill =>
          user.skills.some(userSkill => 
            userSkill.toLowerCase().includes(skill.toLowerCase()) ||
            skill.toLowerCase().includes(userSkill.toLowerCase())
          )
        );
        const skillMatch = (matchingSkills.length / gig.skillsRequired.length) * 100;
        matchScore += skillMatch * 0.6;
        factors += 0.6;
      }

      // Budget matching (20% weight)
      if (gig.budget && user.preferences?.minBudget && user.preferences?.maxBudget) {
        const budgetRange = this.extractBudgetRange(gig.budget);
        if (budgetRange) {
          const budgetMatch = this.calculateBudgetMatch(budgetRange, user.preferences);
          matchScore += budgetMatch * 0.2;
          factors += 0.2;
        }
      }

      // Location preference (10% weight)
      if (gig.location && user.preferences?.remote !== undefined) {
        const locationMatch = gig.location.toLowerCase().includes('remote') && user.preferences.remote ? 100 : 50;
        matchScore += locationMatch * 0.1;
        factors += 0.1;
      }

      // Recency (10% weight)
      if (gig.postedDate) {
        const daysSincePosted = Math.floor((Date.now() - new Date(gig.postedDate)) / (1000 * 60 * 60 * 24));
        const recencyScore = Math.max(0, 100 - (daysSincePosted * 10));
        matchScore += recencyScore * 0.1;
        factors += 0.1;
      }

      const finalScore = factors > 0 ? Math.round(matchScore / factors) : 0;
      
      return {
        ...gig,
        match: Math.min(100, Math.max(0, finalScore))
      };
    }).sort((a, b) => b.match - a.match);
  }

  // Extract budget range from budget string
  extractBudgetRange(budgetString) {
    const matches = budgetString.match(/\$(\d+(?:,\d+)?)\s*-\s*\$(\d+(?:,\d+)?)/);
    if (matches) {
      return {
        min: parseInt(matches[1].replace(',', '')),
        max: parseInt(matches[2].replace(',', ''))
      };
    }
    return null;
  }

  // Calculate budget match score
  calculateBudgetMatch(gigBudget, userPreferences) {
    const { minBudget, maxBudget } = userPreferences;
    
    // Perfect match if ranges overlap
    if (gigBudget.max >= minBudget && gigBudget.min <= maxBudget) {
      return 100;
    }
    
    // Partial match based on proximity
    if (gigBudget.max < minBudget) {
      const gap = minBudget - gigBudget.max;
      return Math.max(0, 100 - (gap / minBudget) * 100);
    }
    
    if (gigBudget.min > maxBudget) {
      const gap = gigBudget.min - maxBudget;
      return Math.max(0, 100 - (gap / maxBudget) * 100);
    }
    
    return 50; // Default partial match
  }

  // Filter mock gigs based on criteria
  filterMockGigs(gigs, filters) {
    let filtered = [...gigs];

    if (filters.platform) {
      filtered = filtered.filter(gig => gig.platform === filters.platform);
    }

    if (filters.skills && filters.skills.length > 0) {
      filtered = filtered.filter(gig =>
        gig.skillsRequired.some(skill =>
          filters.skills.some(filterSkill =>
            skill.toLowerCase().includes(filterSkill.toLowerCase())
          )
        )
      );
    }

    if (filters.minMatch) {
      filtered = filtered.filter(gig => (gig.match || 0) >= filters.minMatch);
    }

    if (filters.location) {
      filtered = filtered.filter(gig =>
        gig.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.sortBy) {
      filtered = this.sortGigs(filtered, filters.sortBy);
    }

    return filtered;
  }

  // Sort gigs by different criteria
  sortGigs(gigs, sortBy) {
    switch (sortBy) {
      case 'match':
        return gigs.sort((a, b) => (b.match || 0) - (a.match || 0));
      case 'date':
        return gigs.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
      case 'budget':
        return gigs.sort((a, b) => {
          const budgetA = this.extractBudgetRange(a.budget);
          const budgetB = this.extractBudgetRange(b.budget);
          if (!budgetA || !budgetB) return 0;
          return budgetB.max - budgetA.max;
        });
      default:
        return gigs;
    }
  }

  // Clear cache
  clearCache() {
    this.cache.clear();
  }
}

export const gigService = new GigService();
