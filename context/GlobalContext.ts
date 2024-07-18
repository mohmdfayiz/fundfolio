import { createContext, useContext } from "react";
import { User } from "../types";

interface GlobalContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  useAppLock: boolean;
  setUseAppLock: React.Dispatch<React.SetStateAction<boolean>>;
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  setToken: (name: string, token: string) => Promise<void>;
  removeToken: (name: string) => Promise<void>;
}

export const GlobalContext = createContext<GlobalContextProps>({
  user: null,
  setUser: () => { },
  useAppLock: false,
  setUseAppLock: () => { },
  isLogged: false,
  setIsLogged: () => { },
  setToken: async () => { },
  removeToken: async () => { },
});

export const useGlobalContext = () => useContext(GlobalContext)