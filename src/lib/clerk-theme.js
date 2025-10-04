import { dark } from '@clerk/themes';

// Simple official Clerk dark theme with hidden footer elements
export const clerkDarkTheme = {
  baseTheme: dark,
  variables: {
    // Use Orbitron font for all text
    fontFamily: '"Orbitron", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontFamilyButtons: '"Orbitron", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  elements: {
    // Hide any clerk branding
    clerkBranding: {
      display: 'none',
    },
    // footer: {
    //   display: 'none',
    // },
    // debugMode: {
    //   display: 'none',
    // },
    // footerActionText: {
    //   display: 'none',
    // },
    // Apply Orbitron font to all text elements
    headerTitle: {
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: '700',
    },
    headerSubtitle: {
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: '400',
    },
    formFieldLabel: {
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: '500',
    },
    formFieldInput: {
      fontFamily: '"Orbitron", sans-serif',
    },
    formButtonPrimary: {
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: '600',
    },
    socialButtonsBlockButton: {
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: '500',
    },
    socialButtonsBlockButtonText: {
      fontFamily: '"Orbitron", sans-serif',
    },
    dividerText: {
      fontFamily: '"Orbitron", sans-serif',
    },
    footerActionLink: {
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: '600',
    },
    footerActionText: {
      fontFamily: '"Orbitron", sans-serif',
    },
    formFieldErrorText: {
      fontFamily: '"Orbitron", sans-serif',
    },
    formFieldSuccessText: {
      fontFamily: '"Orbitron", sans-serif',
    },
    alternativeMethodsBlockButton: {
      fontFamily: '"Orbitron", sans-serif',
    },
    identityPreviewText: {
      fontFamily: '"Orbitron", sans-serif',
    },
    identityPreviewEditButton: {
      fontFamily: '"Orbitron", sans-serif',
    },
  },
};

// Official Clerk dark theme with customizations to match our design
export const clerkAppearance = {
  baseTheme: dark,
  variables: {
    // Customize the dark theme to match our design
    colorPrimary: '#ffffff',
    colorBackground: '#1a1a1a',
    colorInputBackground: '#2a2a2a',
    colorInputText: '#ffffff',
    colorText: '#ffffff',
    colorTextSecondary: '#a0a0a0',
    borderRadius: '8px',
    // Use Orbitron font for all text
    fontFamily: '"Orbitron", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontFamilyButtons: '"Orbitron", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    spacingUnit: '16px',
  },
  elements: {
    // Customize specific elements to match the design with blur effects
    card: {
      backgroundColor: 'rgba(42, 42, 42, 0.8)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(64, 64, 64, 0.5)',
      borderRadius: '12px',
      padding: '32px',
    },
    headerTitle: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#ffffff',
      fontFamily: '"Orbitron", sans-serif',
    },
    headerSubtitle: {
      color: '#a0a0a0',
      fontSize: '16px',
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: '400',
    },
    formButtonPrimary: {
      backgroundColor: 'rgba(64, 64, 64, 0.8)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      color: '#000000',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '600',
      fontFamily: '"Orbitron", sans-serif',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    },
    formFieldInput: {
      backgroundColor: 'rgba(42, 42, 42, 0.8)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      border: '1px solid rgba(64, 64, 64, 0.5)',
      color: '#ffffff',
      borderRadius: '8px',
      fontFamily: '"Orbitron", sans-serif',
    },
    socialButtonsBlockButton: {
      backgroundColor: 'rgba(42, 42, 42, 0.8)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      border: '1px solid rgba(64, 64, 64, 0.5)',
      color: '#ffffff',
      borderRadius: '8px',
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: '500',
    },
    // Apply Orbitron font to all form elements
    formFieldLabel: {
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: '500',
    },
    socialButtonsBlockButtonText: {
      fontFamily: '"Orbitron", sans-serif',
    },
    dividerText: {
      fontFamily: '"Orbitron", sans-serif',
    },
    footerActionLink: {
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: '600',
    },
    footerActionText: {
      fontFamily: '"Orbitron", sans-serif',
    },
    formFieldErrorText: {
      fontFamily: '"Orbitron", sans-serif',
    },
    formFieldSuccessText: {
      fontFamily: '"Orbitron", sans-serif',
    },
    alternativeMethodsBlockButton: {
      fontFamily: '"Orbitron", sans-serif',
    },
    identityPreviewText: {
      fontFamily: '"Orbitron", sans-serif',
    },
    identityPreviewEditButton: {
      fontFamily: '"Orbitron", sans-serif',
    },
    // Hide any clerk branding
    clerkBranding: {
      display: 'none',
    },
    // footer: {
    //   display: 'none',
    // },
    // debugMode: {
    //   display: 'none',
    // },
    // footerActionText: {
    //   display: 'none',
    // },
    // Add blur and glassmorphism to the Clerk UserButton dropdown
    card: {
      background: 'rgba(20, 16, 32, 0.85)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      border: '1.5px solid rgba(128, 90, 213, 0.25)', // purple border
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      borderRadius: '18px',
    },
    popoverCard: {
      background: 'rgba(20, 16, 32, 0.85)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      border: '1.5px solid rgba(128, 90, 213, 0.25)',
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      borderRadius: '18px',
    },
    // Blurry glassmorphic theme for Clerk account/profile modal
    modal: {
      background: 'rgba(20, 16, 32, 0.85)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      border: '1.5px solid rgba(128, 90, 213, 0.25)',
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      borderRadius: '18px',
    },
    modalContent: {
      background: 'rgba(20, 16, 32, 0.85)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      border: '1.5px solid rgba(128, 90, 213, 0.25)',
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      borderRadius: '18px',
    },
    main: {
      background: 'rgba(20, 16, 32, 0.85)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      border: '1.5px solid rgba(128, 90, 213, 0.25)',
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      borderRadius: '18px',
    },
  },
}; 