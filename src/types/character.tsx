export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

export interface CharacterResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}
 
export interface Location {
  name: string;
  url: string;
}

export interface LocationResponse {
  results: Location[];
}

export interface GlobalContextType {
  credit: number;
  fuel: number;
  characters: Character[];
  locations: Location[];
  modifyMoney: (money: number) => void;
  reduceFuel: () => void;
  addCharacter: (character: Character) => void;
  addLocation: (location: Location) => void;
  removeCharacter: (character: Character) => void;
  addFuel: (fuelAdded : number) => void;
  refuelTank : () => void;
}