import { createContext } from "react";

let isLogged: boolean = false;
let setIsLogged: React.Dispatch<React.SetStateAction<boolean>> = () => {};

export const GlobalContext = createContext({
  isLogged,
  setIsLogged,
});