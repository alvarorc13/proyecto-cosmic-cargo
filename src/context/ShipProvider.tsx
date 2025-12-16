import { useState } from "react";
import { GlobalContext } from "./ShipContext";
import type { Character } from "../types/character";
import type { Location } from "../types/character";

export default function GlobalProvider({ children }: { children: React.ReactNode }) {
  const ReduceFuel = 10;

  const [credit, setCredit] = useState<number>(1000);
  const [fuel, setFuel] = useState<number>(100);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);

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

  function addLocation(location: Location) {
    if (!locations.some((l) => l.name === location.name)) {
      setLocations([...locations, location]);
    }
  }

  return (
    <GlobalContext.Provider
      value={{ credit, fuel, characters, locations, modifyMoney, reduceFuel, addCharacter, addLocation }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
