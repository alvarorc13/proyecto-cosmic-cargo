import { useContext } from "react"
import { GlobalContext } from "../context/ShipContext"
import { type Character } from '../types/character';
import CharacterCard from '../components/CharacterCard';
import { Link } from "react-router-dom";


export default function Dashboard() {

    const context = useContext(GlobalContext);
    
    if(!context) return null;

    const { fuel, credit } = context;

    const charactersLocalStorage : Character[] = JSON.parse(localStorage.getItem('crew') || '[]');

    return(
        <>
            <div className="dashboard-bg">
                <div className="container pt-4">
                    <h1 className="mb-4">🚀 Puente de Mando</h1>
                    <div className="div-general">
                        {fuel <= 0 && (
                            <div className="alert alert-danger text-center" role="alert">
                                🚨 Game Over: ¡La nave se ha quedado sin combustible!
                            </div>
                        )}

                        {charactersLocalStorage.length == 0 ? (
                            <div className="alert alert-danger text-center" role="alert">
                                <Link to="/hirecrew" className="alert-link">
                                    🚨 ¡La nave no tiene tripulantes! Contrátalos en la Cantina.
                                </Link>

                            </div>
                        ) : (
                            charactersLocalStorage.map((character: Character) => (
                                <CharacterCard character={character} />
                            ))
                        )}
                    </div> 
                    <div>
                        <span>
                            {credit}
                        </span>
                        <span>
                            {fuel}
                        </span>
                    </div>     
                </div>
            </div>
        </>
    )
}