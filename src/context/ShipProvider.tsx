import { useState } from "react";
import { GlobalContext } from "./ShipContext";
import type { Character } from "../types/character";

export default function GlobalProvider({ children }: { children: React.ReactNode }) {
  const ReduceFuel = 10;

  const [credit, setCredit] = useState<number>(1000);
  const [fuel, setFuel] = useState<number>(100);
  const [characters, setCharacters] = useState<Character[]>([]);

  function modifyMoney(money: number) {
    setCredit(prev => prev + money);
  }

  function reduceFuel() {
    setFuel(prev => prev - ReduceFuel);
  }

  function addCharacter(character: Character) {
    if (characters.length < 4) {
      if (!characters.some((c) => c.id === character.id)) {
        setCharacters([...characters, character]);
      } else {
        throw new Error("No puede haber tripulantes repetidos");
      }
    } else {
      throw new Error("Ya hay 4 tripulantes en la nave");
    }
  }

  return (
    <GlobalContext.Provider
      value={{ credit, fuel, characters, modifyMoney, reduceFuel, addCharacter }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
