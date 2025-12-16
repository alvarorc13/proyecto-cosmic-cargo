import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "../context/ShipContext"
import { getFirst20Locations } from "../services/rickAndMortyService";

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

    return(
        <>
            <div className="/**/">
                <h1>Elige una misión</h1>

                <form onSubmit={(event) => handleSubmit(event)}>
                    <select onChange={(event) => handleCharacter(event)} id="selectCharacter" className="form-select" value={character}>
                        <option value="">Selecciona un tripulante...</option>
                        {characters.map((c, index) => (
                        <option key={index} value={c.name}>{c.name}</option>
                        ))}
                    </select>

                    <select onChange={(event) => handleLocation(event)} id="selectLocation" className="form-select" value={location}>
                        <option value="">Selecciona un planeta...</option>
                        {locations.map((l, index) => (
                        <option key={index} value={l.name}>{l.name}</option>
                        ))}
                    </select>

                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">
                            Iniciar Misión
                        </button>
                    </div>
                </form>

                <div className="/**/">
                    <p>Actualmente el combustible es: {fuel} y los créditos: {credit}</p>
                </div>
            </div>

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
