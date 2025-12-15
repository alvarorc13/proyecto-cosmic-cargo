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

                console.log("Localizaciones cargadas:", context?.locations);
            } catch (error) {
                console.error(error);
            }
        }
        loadLocations();
    }, [context]);

    const [selectedCharacter, setSelectedCharacter] = useState<string>("");
    const [selectedLocation, setSelectedLocation] = useState<string>("");

    function handleCharacter(event: Event) {
        /*setSelectedCharacter(event?.target?.value);*/
    }

    function handleLocation(event: Event) {
        /*setSelectedLocation(event?.target?.value);*/
    }

    function handleSubmit() {
        setTimeout(() => {
            context?.reduceFuel();
            context?.modifyMoney(100);
        }, 3000);
    }

    return(
        <>
            <h1>Elige una misión</h1>

            <form onSubmit={handleSubmit}>
                <select /*onChange={handleCharacter}*/ id="role" className="form-select">
                    <option value="">Selecciona un tripulante...</option>
                    {characters.map((c, index) => (
                    <option key={index} value={c.name}>{c.name}</option>
                    ))}
                </select>

                <select /*onChange={handleLocation}*/ id="role" className="form-select">
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

            <p>Actualmente el combustible es: {fuel} y los créditos: {credit}</p>
        </>
    )
}