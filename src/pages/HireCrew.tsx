import { useContext, useEffect, useState } from "react"
import type { Character } from "../types/character";
import { getFirst20Characters } from "../services/rickAndMortyService";
import { GlobalContext } from "../context/ShipContext";
import CharacterCard from "../components/CharacterCard";
import Button from "../components/Button";

export default function HireCrew() {

    //UseStates Personajes y buscador
    const [characters, setCharacters] = useState<Character[]>([]);
    const [search, setSearch] = useState<string>("");

    const global = useContext(GlobalContext);

    //Consumo api

    useEffect(() => {
        async function loadCharacters() {
            try {
                const data = await getFirst20Characters();
                setCharacters(data.results);
            }
            catch (error) {
                console.error(error)
            }
        }
        loadCharacters();
    }, []);


    //Buscador de personajes

    const filterCharacter = characters.filter((character) => character.name.toLowerCase().includes(search.toLowerCase()));

    //Manejo contratacion personajes
    function handleHire(character: Character) {
        try {
            if (global) {
                if (global.credit < 200) {
                    throw new Error("No hay suficientes créditos para contratar a este personaje.");
                }
                else {
                    global.addCharacter(character);
                    global.modifyMoney(-200);
                }
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    // const creditLocalStorage = localStorage.getItem('credit') ? JSON.parse(localStorage.getItem('credit') as string) : global?.credit;
    // const totalCharacters: number = JSON.parse(localStorage.getItem('crew') || '[]').length;

    const totalCharacters = global?.characters.length ?? 0;

    return (
        <>
            <div className="cantina-bg">
                <div className="container pt-4">
                    <h1>Cantina</h1>

                    <input type="text" className="form-contro mb-3" placeholder="Introduce el nombre del personaje" value={search} onChange={(e) => setSearch(e.target.value)} />

                    <div className="row">
                        {filterCharacter.map((character) => {
                            const isDead = character.status.toLowerCase() === "dead";
                            const isFull = totalCharacters === 4;
                            const noMoney = (global?.credit ?? 0) < 200;
                            const isHired = global?.characters.some((c) => c.id === character.id);

                            return (

                                <div key={character.id} className="col-md-3 mb-4">
                                    <CharacterCard character={character} />
                                    <Button text={isHired ? "Descontratar" : (isFull ? "Tripulación Llena" : "Contratar")} onClick={() => {
                                        if (isHired) {
                                            global?.removeCharacter(character);
                                            global?.modifyMoney(100);
                                        }
                                        else {
                                            handleHire(character);
                                        }
                                    }}
                                        disabled={isDead || (!isHired && isFull) || (!isHired && noMoney)}></Button>

                                </div>

                            )
                        })}

                    </div>

                </div>
            </div>
        </>
    )
}
