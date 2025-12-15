import { useContext } from "react"
import { GlobalContext } from "../context/ShipContext"
import { type Character } from '../types/character';
import CharacterCard from '../components/CharacterCard';


export default function Dashboard() {

    const context = useContext(GlobalContext);
    
    if(!context) return null;

    const { fuel, characters } = context;

    return(
        <>
            <div className="container mt-4">
                <h1 className="mb-4">🚀 Puente de Mando</h1>

                {fuel <= 0 && (
                    <div className="alert alert-danger text-center" role="alert">
                        🚨 Game Over: ¡La nave se ha quedado sin combustible!
                    </div>
                )}

                {characters.length == 0 ? (
                    <div className="alert alert-danger text-center" role="alert">
                        🚨 ¡La nave no tiene tripulantes! Contrátalos en la Cantina.
                    </div>
                ) : (
                    characters.map((character: Character) => (
                        <CharacterCard character={character} />
                    ))
                )}
                    
            </div>

        </>
    )
}