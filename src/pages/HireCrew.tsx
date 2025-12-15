import { useContext, useEffect, useState } from "react"

export default function HireCrew() {

    //UseStates Personajes, buscador y llamada al contexto(Uso temporal de NombreTemp)
    const [characters, setCharacters] = useState<Character[]>([]);
    const [hireCharacter, setHireCharacter] = useContext(NombreTemp);
    const [search, setSearch] = useState<String>("");


    //Consumo api(A la espera de cambiar NombreTemporal)

    useEffect(() => {
        async function loadCharacters() {
            try{
                const data = await NombreTemporal();
                setCharacters(data);
            }
            catch (error){
                console.error(error)
            }
        }
        loadCharacters();
    }, []);


    //Buscador de personajes

    const filterCharacter = characters.filter(character => {
        character.nombre.toLowerCase()
    })


    return(
        <>
            <h1>Hola HireCrew</h1>
        </>
    )
}