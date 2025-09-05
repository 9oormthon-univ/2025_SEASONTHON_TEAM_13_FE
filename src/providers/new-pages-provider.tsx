import type { FeelingID } from '@/constants/feelings';
import type { Music } from '@/types/music';
import React from 'react';

type NewPagesProviderProps = {
  children: React.ReactNode
};

type NewPagesProviderState = {
  feelings: FeelingID[]
  setFeelings: (feelings: FeelingID[] | ((prev: FeelingID[]) => FeelingID[])) => void
  tags: string[]
  setTags: (tags: string[] | ((prev: string[]) => string[])) => void
  music?: Music
  setMusic: (music: Music | ((prev: Music | undefined) => Music | undefined)) => void
};

const initialState: NewPagesProviderState = {
  feelings: [],
  setFeelings: (_) => null,
  tags: [],
  setTags: (_) => null,
  music: undefined,
  setMusic: (_) => null,
};

const NewPagesProviderContext = React.createContext<NewPagesProviderState>(initialState);

export const NewPagesProvider = ({ children }: NewPagesProviderProps) => {
  const [feelings, setFeelings] = React.useState<FeelingID[]>([]);
  const [tags, setTags] = React.useState<string[]>([]);
  const [music, setMusic] = React.useState<Music | undefined>(undefined);

  return (
    <NewPagesProviderContext.Provider value={{
      feelings,
      setFeelings,
      tags,
      setTags,
      music,
      setMusic
    }}
    >
      {children}
    </NewPagesProviderContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useNewPagesProvider = () => {
  const context = React.useContext(NewPagesProviderContext);
  if (!context) {
    throw new Error('useNewPagesProvider must be used within a NewPagesProvider');
  }
  return context;
};
