import toast from 'react-hot-toast';
import { CheckCircle, XCircle, AlertCircle, Info, Briefcase } from 'lucide-react';

export const useNotifications = () => {
  const showSuccess = (message, options = {}) => {
    return toast.success(message, {
      icon: '✅',
      ...options,
    });
  };

  const showError = (message, options = {}) => {
    return toast.error(message, {
      icon: '❌',
      ...options,
    });
  };

  const showInfo = (message, options = {}) => {
    return toast(message, {
      icon: 'ℹ️',
      style: {
        background: 'hsl(200, 90%, 50%)',
        color: 'white',
      },
      ...options,
    });
  };

  const showWarning = (message, options = {}) => {
    return toast(message, {
      icon: '⚠️',
      style: {
        background: 'hsl(50, 90%, 60%)',
        color: 'hsl(220, 15%, 15%)',
      },
      ...options,
    });
  };

  const showLoading = (message, options = {}) => {
    return toast.loading(message, {
      ...options,
    });
  };

  const showGigAlert = (gig, options = {}) => {
    return toast.success(
      `New gig match: ${gig.title}`,
      {
        icon: '💼',
        duration: 6000,
        style: {
          background: 'hsl(142, 76%, 36%)',
          color: 'white',
        },
        ...options,
      }
    );
  };

  const showApplicationSuccess = (gigTitle, options = {}) => {
    return toast.success(
      `Successfully applied to "${gigTitle}"!`,
      {
        icon: '🎉',
        duration: 4000,
        ...options,
      }
    );
  };

  const showProfileUpdate = (options = {}) => {
    return toast.success(
      'Profile updated successfully!',
      {
        icon: '👤',
        duration: 3000,
        ...options,
      }
    );
  };

  const dismiss = (toastId) => {
    toast.dismiss(toastId);
  };

  const dismissAll = () => {
    toast.dismiss();
  };

  return {
    showSuccess,
    showError,
    showInfo,
    showWarning,
    showLoading,
    showGigAlert,
    showApplicationSuccess,
    showProfileUpdate,
    dismiss,
    dismissAll,
  };
};
