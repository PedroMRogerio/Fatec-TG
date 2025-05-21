import React, { createContext, useState, useContext, ReactNode } from 'react';

export type IUserContext = {
  uid: string;
  email: string | null;
  uType: string
  [key: string]: any; // permite adicionar campos do Firestore dinamicamente
};

type UserContextType = {
  user: IUserContext | null;
  setUser: (user: IUserContext | null) => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUserContext | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
