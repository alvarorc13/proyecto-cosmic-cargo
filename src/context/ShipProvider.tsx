import { GlobalContext } from "./ShipContext";
import type { Character } from "../types/character";
import type { Location } from "../types/character";
import { useEffect, useState } from "react";

export default function GlobalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const ReduceFuel = 10;

  const [credit, setCredit] = useState<number>(() => {
    const stored = localStorage.getItem("credit");
    return stored ? JSON.parse(stored) : 1000;
  });

  useEffect(() => {
    localStorage.setItem("credit", JSON.stringify(credit));
  }, [credit]);

  const [fuel, setFuel] = useState<number>(() => {
    const stored = localStorage.getItem("fuel");
    return stored ? JSON.parse(stored) : 100;
  });

  useEffect(() => {
    localStorage.setItem("fuel", JSON.stringify(fuel));
  }, [fuel]);

  const [characters, setCharacters] = useState<Character[]>(() => {
    const stored = localStorage.getItem("crew");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("crew", JSON.stringify(characters));
  }, [characters]);

  const [locations, setLocations] = useState<Location[]>([]);

  function modifyMoney(money: number) {
    setCredit(credit + money);
  }

  function reduceFuel() {
    setFuel(fuel - ReduceFuel);
  }

  function addCharacter(character: Character) {
    if (characters.length >= 4)
      throw new Error("Ya hay 4 tripulantes en la nave");
    if (characters.some((c) => c.id === character.id))
      throw new Error("No puede haber tripulantes repetidos");

    setCharacters([...characters, character]);
  }

  function addLocation(location: Location) {
    if (!locations.some((l) => l.name === location.name)) {
      setLocations([...locations, location]);
    } else {
      throw new Error("No puede haber localizaciones repetidas");
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        credit,
        fuel,
        characters,
        locations,
        modifyMoney,
        reduceFuel,
        addCharacter,
        addLocation,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
