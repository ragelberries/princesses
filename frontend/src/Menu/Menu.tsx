import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

interface CharacterListing {
    identifier: string;
    iconUrl: string;
}

const Menu = () => {
    const [characterData, setCharacterData] = useState<CharacterListing[] | null>(null);

    const fetchData = async () => {
        let response = await axios.get('/character-listing');
        setCharacterData(response.data);
    }

    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div>
            {characterData && characterData.map(character => (
                <Link to={`dressup/${character.identifier}`}>
                    <img key={character.identifier} src={character.iconUrl} />
                </Link>
            ))}
        </div>
    )
}


export default Menu