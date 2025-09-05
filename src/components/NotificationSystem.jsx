import React from 'react';
import { Toaster } from 'react-hot-toast';

const NotificationSystem = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        // Define default options
        className: '',
        duration: 4000,
        style: {
          background: 'hsl(0, 0%, 100%)',
          color: 'hsl(220, 15%, 15%)',
          boxShadow: '0 4px 12px hsla(220, 15%, 15%, 0.08)',
          borderRadius: '12px',
          padding: '16px',
          fontSize: '14px',
          fontWeight: '500',
        },

        // Default options for specific types
        success: {
          duration: 3000,
          style: {
            background: 'hsl(142, 76%, 36%)',
            color: 'white',
          },
          iconTheme: {
            primary: 'white',
            secondary: 'hsl(142, 76%, 36%)',
          },
        },
        error: {
          duration: 5000,
          style: {
            background: 'hsl(0, 84%, 60%)',
            color: 'white',
          },
          iconTheme: {
            primary: 'white',
            secondary: 'hsl(0, 84%, 60%)',
          },
        },
        loading: {
          duration: Infinity,
          style: {
            background: 'hsl(200, 90%, 50%)',
            color: 'white',
          },
        },
      }}
    />
  );
};

export default NotificationSystem;
