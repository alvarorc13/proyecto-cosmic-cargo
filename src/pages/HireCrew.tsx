import { useContext, useEffect, useState } from "react"
import type { Character } from "../types/character";
import { get20CharactersFromPage, getFirst20Characters } from "../services/rickAndMortyService";
import { GlobalContext } from "../context/ShipContext";
import CharacterCard from "../components/CharacterCard";

export default function HireCrew() {

    //UseStates Personajes y buscador
    const [characters, setCharacters] = useState<Character[]>([]);
    const [search, setSearch] = useState<string>("");

    const global = useContext(GlobalContext);

    //Consumo api

    useEffect(() => {
        async function loadCharacters() {
            try{
                const data = await getFirst20Characters();
                const totalPages = data.info.pages;

                const allResults = [...data.results];

                for(let page = 2; page <= totalPages; page++){
                    const response = await get20CharactersFromPage(page);
                    allResults.push(...response.results);
                }

                setCharacters(allResults);
            }
            catch (error){
                console.error(error)
            }
        }
        loadCharacters();
    }, []);


    //Buscador de personajes

    const filterCharacter = characters.filter((character) =>  character.name.toLowerCase().includes(search.toLowerCase()));

    //Manejo contratacion personajes
    function handleHire(character: Character) {
        try {
            if(global){
                if(global.credit < 200){
                    throw new Error("No hay suficientes créditos para contratar a este personaje.");
                }
                else{
                    global.addCharacter(character);
                    global.modifyMoney(-200);
                }
            }
        }
        catch (error) {
                console.error(error);
        }
    }

    return(
        <>
            <div className="container mt-4">
                <h1>Cantina</h1>

                <input type="text" className="form-contro mb-3" placeholder="Introduce el nombre del personaje" value={search} onChange={(e) => setSearch(e.target.value)} />

                <div className="row">
                    {filterCharacter.map((character) => {
                        const isDead = character.status.toLowerCase() === "dead";
                        const isFull = global?.characters.length === 4;
                        const noMoney = (global?.credit ?? 0) < 200;

                        return (

                            <div key={character.id} className="col-md-3 mb-4">
                                <CharacterCard character={character} />
                                <button className="btn btn-primary mt-2" onClick={() => handleHire(character)} disabled={isDead || isFull || noMoney}>Contratar</button>
                            </div>

                        )
                    })}

                </div>

                <div className="mt-4">
                    <p>Créditos: {global?.credit}</p>
                </div>
                
            </div>
        </>
    )
}
    