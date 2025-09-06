import React from 'react';
import { useIFrameAPI, type IFrameAPI } from '@/hooks/useiFrameAPI';

const IFrameAPIContext = React.createContext<IFrameAPI | undefined>(undefined);

export const IFrameAPIProvider = ({ children }: { children: React.ReactNode }) => {
  const iFrameAPI = useIFrameAPI();

  return (
    <IFrameAPIContext.Provider value={iFrameAPI}>
      {children}
    </IFrameAPIContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useIFrameAPIContext = () => {
  const context = React.useContext(IFrameAPIContext);
  if (context === undefined) {
    throw new Error('useIFrameAPIContext must be used within a IFrameAPIProvider');
  }
  return context;
};
