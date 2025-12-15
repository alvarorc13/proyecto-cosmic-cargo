import { createContext } from "react";
import type { Character, GlobalContextType } from "../types/character";

export const GlobalContext = createContext<GlobalContextType | null>(null);