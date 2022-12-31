import axios from "axios"
import { useEffect, useState } from "react"
import { MenuState, View } from "../App";
import { DressUpDispatcher } from "../DressUpReducer";

interface CharacterListing {
    identifier: string;
    iconUrl: string;
}
interface MenuProps {
    setMenuState: (s: MenuState) => void
    stateDispatch: DressUpDispatcher
}

const Menu = ({ setMenuState, stateDispatch }: MenuProps) => {
    const [characterData, setCharacterData] = useState<CharacterListing[] | null>(null);

    const fetchData = async () => {
        let response = await axios.get('/character-listing');
        setCharacterData(response.data);
    }

    useEffect(() => {
        fetchData();
    }, [])

    const createNewClothingStage = (identifier: string) => {
        stateDispatch({
            type: 'reset',
            item: undefined
        })
        setMenuState({ view: View.Clothing, characterIdentifier: identifier })
    }
    return (
        <div>
            {characterData && characterData.map(character => (
                <img
                    key={character.identifier}
                    src={character.iconUrl}
                    onClick={() => createNewClothingStage(character.identifier)}
                />
            ))}
        </div>
    )
}


export default Menu