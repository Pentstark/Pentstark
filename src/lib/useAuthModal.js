import { useState, useCallback } from 'react';

export const useAuthModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [message, setMessage] = useState('');

  const openLoginModal = useCallback((customMessage = '') => {
    setMode('login');
    setMessage(customMessage);
    setIsOpen(true);
  }, []);

  const openSignupModal = useCallback((customMessage = '') => {
    setMode('signup');
    setMessage(customMessage);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setMessage('');
  }, []);

  const switchMode = useCallback(() => {
    setMode(prevMode => prevMode === 'login' ? 'signup' : 'login');
  }, []);

  return {
    isOpen,
    mode,
    message,
    openLoginModal,
    openSignupModal,
    closeModal,
    switchMode,
    setIsOpen
  };
};
