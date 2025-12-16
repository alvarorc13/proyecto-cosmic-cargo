import type { Character } from '../types/character';

interface CharacterCardProp {
    character: Character
}

const CharacterCard = ({ character }: CharacterCardProp) => {
    return (
        <div className="character-card">
            <div className='card-image'>
                <img src={character.image} alt={character.name} className="character-image" />
            </div>
            <div className='card-text'>
                <h3>{character.name}</h3>
                <p>{character.status}</p>
            </div>
        </div>
    );
}

export default CharacterCard