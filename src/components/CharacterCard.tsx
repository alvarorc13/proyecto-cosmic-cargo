

const CharacterCard = ({character}) => {
    return (
        <div className="character-card">
            <img src={character.image} alt={character.name} className="character-image"/>
            <h3>{character.name}</h3>
            <p>{character.status}</p>
        </div>
    );
}

export default CharacterCard