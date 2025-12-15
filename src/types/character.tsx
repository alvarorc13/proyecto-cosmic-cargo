export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

export interface Location {
  name: string;
  url: string;
}

export interface GlobalContextType {
  credit: number;
  fuel: number;
  characters: Character[];
  modifyMoney: (money: number) => void;
  reduceFuel: () => void;
  addCharacter: (character: Character) => void;
}