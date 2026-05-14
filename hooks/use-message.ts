'use client';

import { useCallback, useState } from 'react';

interface MessageOptions {
  showLogo?: boolean;
  title?: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  children?: React.ReactNode;
  confirmText?: string | React.ReactNode;
  cancelText?: string | React.ReactNode;
  confirmVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'main';
  cancelVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'main';
  showCancel?: boolean;
}

interface MessageState {
  isOpen: boolean;
  resolve?: (confirmed: boolean) => void;
  options?: MessageOptions;
}

export function useMessage() {
  const [state, setState] = useState<MessageState>({ isOpen: false });

  const showMessage = useCallback((options: MessageOptions = {}): Promise<boolean> => {
    return new Promise(resolve => {
      setState({
        isOpen: true,
        resolve,
        options,
      });
    });
  }, []);

  const handleConfirm = useCallback(() => {
    state.resolve?.(true);
    setState({ isOpen: false });
  }, [state]);

  const handleCancel = useCallback(() => {
    state.resolve?.(false);
    setState({ isOpen: false });
  }, [state]);

  return {
    showMessage,
    messageProps: {
      open: state.isOpen,
      showLogo: state.options?.showLogo || false,
      title: state.options?.title,
      subtitle: state.options?.subtitle,
      children: state.options?.children,
      confirmText: state.options?.confirmText,
      cancelText: state.options?.cancelText,
      confirmVariant: state.options?.confirmVariant,
      cancelVariant: state.options?.cancelVariant,
      showCancel: state.options?.showCancel,
      onConfirm: handleConfirm,
      onCancel: handleCancel,
    },
  };
}
