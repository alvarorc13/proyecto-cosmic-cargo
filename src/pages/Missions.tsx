import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "../context/ShipContext"
import { getFirst20Locations } from "../services/rickAndMortyService";
import "../CSS/missions.css";

export default function Missions() {

    const context = useContext(GlobalContext);

    if (!context) {
        return null;
    }

    const { fuel, characters, locations, credit } = context;

    useEffect(() => {
        async function loadLocations() {
            try {
                const data = await getFirst20Locations();

                data.results.forEach(location => {
                    context?.addLocation(location);
                });

            } catch (error) {
                console.error(error);
            }
        }
        loadLocations();
    }, [context]);

    const [character, setCharacter] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [isTravelling, setIsTravelling] = useState(false);

    function handleCharacter(event: React.ChangeEvent<HTMLSelectElement>) {
        setCharacter(event.target.value);
    }

    function handleLocation(event: React.ChangeEvent<HTMLSelectElement>) {
        setLocation(event.target.value);
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setIsTravelling(true);

        setTimeout(() => {
            context?.reduceFuel();
            context?.modifyMoney(Math.floor(Math.random() * (500 - 50 + 1)) + 50);

            setIsTravelling(false);

            setCharacter("");
            setLocation("");
            alert("El tripulante " + character + " ha completado exitosamente la misión a " + location);
        }, 3000);
    }

   return (
        <>
        <body className="missions-bg">

            
                <div className="missionsTitle">
                    <h1>Elige una misión</h1>
                </div>

                <div className="div-general-missions">

                {fuel >= 10 ? (
                    <form onSubmit={(event) => handleSubmit(event)}>
                        <select required onChange={handleCharacter} id="selectCharacter" className="selectMissions" value={character}>
                            <option disabled value="">Selecciona un tripulante...</option>
                            {characters.map((c, index) => (
                                <option key={index} value={c.name}>{c.name}</option>
                            ))}
                        </select>

                        <select required onChange={handleLocation} id="selectLocation" className="selectMissions" value={location}>
                            <option disabled value="">Selecciona un planeta...</option>
                            {locations.map((l, index) => (
                                <option key={index} value={l.name}>{l.name}</option>
                            ))}
                        </select>

                        <button type="submit" className="fantasy-button">
                            Iniciar Misión
                        </button>
                    </form>
                ) : (
                    <div className="alert-no-fuel" style={{color: 'red', padding: '10px'}}>
                        <p>⚠️ Te has quedado sin gasolina. No es posible realizar misiones.</p>
                        <a href="/">Dirigete al puente de mando para repostar</a>
                    </div>
                )}


                    <div className="state">
                        <p>Actualmente el combustible es: {fuel}⛽ y los créditos: {credit}💲</p>
                    </div>
                </div>
            
        </body>

            {isTravelling && (
                <div
                    style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        background: "rgba(0,0,0,0.8)",
                        color: "white",
                        padding: "20px",
                        borderRadius: "8px",
                        textAlign: "center",
                        fontSize: "1.5rem",
                        zIndex: 9999
                    }}
                >
                    🚀 Realizando un viaje...
                </div>
            )}
        </>
    )
}