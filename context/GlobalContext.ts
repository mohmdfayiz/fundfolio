import { createContext, useContext } from "react";
import { User } from "../types";

interface GlobalContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  setToken: (token: string) => Promise<void>;
  removeToken: () => Promise<void>;
}

export const GlobalContext = createContext<GlobalContextProps>({
  user: null,
  setUser: () => { },
  isLogged: false,
  setIsLogged: () => { },
  setToken: async () => { },
  removeToken: async () => { },
});

export const useGlobalContext = () => useContext(GlobalContext)