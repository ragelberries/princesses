import axios from "axios"
import { useEffect, useState } from "react"
import { MenuState, View } from "../App";

interface CharacterListing {
    identifier: string;
    iconUrl: string;
}
interface MenuProps {
    setMenuState: (s: MenuState) => void;
}

const Menu = ({ setMenuState }: MenuProps) => {
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
                <img
                    key={character.identifier}
                    src={character.iconUrl}
                    onClick={() => setMenuState({ view: View.Clothing, characterIdentifier: character.identifier })} />
            ))}
        </div>
    )
}


export default Menu