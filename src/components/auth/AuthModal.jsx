import React from 'react';
import { 
  SignIn, 
  SignUp,
} from '@clerk/clerk-react';
import { clerkAppearance } from '@/lib/clerk-theme';
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

export function AuthModal({ mode = 'login', isOpen, setIsOpen, onSuccess, message }) {
  // Handle successful authentication
  const handleAuthComplete = () => {
    setIsOpen(false);
    if (onSuccess) onSuccess();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md lg:max-w-lg xl:max-w-xl p-0 overflow-hidden border-0 bg-transparent shadow-none mx-4 w-[calc(100vw-2rem)] sm:w-full max-h-[95vh] overflow-y-auto">
        <div className="relative">
          {/* Dark themed container */}
          <div 
            className="relative rounded-xl border shadow-2xl"
            style={{
              background: '#1a1a1a',
              border: '1px solid #404040',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)'
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-20 p-2 rounded-lg transition-all duration-200 border"
              style={{
                backgroundColor: '#2a2a2a',
                borderColor: '#404040',
                color: '#a0a0a0',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#3a3a3a';
                e.target.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#2a2a2a';
                e.target.style.color = '#a0a0a0';
              }}
              aria-label="Close authentication modal"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {mode === 'login' ? (
              <SignIn 
                fallbackRedirectUrl="/"
                forceRedirectUrl="/"
                appearance={clerkAppearance}
              />
            ) : (
              <SignUp 
                fallbackRedirectUrl="/"
                forceRedirectUrl="/"
                appearance={clerkAppearance}
              />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AuthModal;