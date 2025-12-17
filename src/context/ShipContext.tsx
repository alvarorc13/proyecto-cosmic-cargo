import { createContext } from "react";
import type { GlobalContextType } from "../types/character";

export const GlobalContext = createContext<GlobalContextType | null>(null);