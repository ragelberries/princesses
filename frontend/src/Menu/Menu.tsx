import { SetMenuState, View } from "../App"

interface MenuProps {
    setMenuState: SetMenuState
}

const Menu = ({ setMenuState }: MenuProps) => {
    return (
        <div>
            <h1>Menu</h1>
            <button onClick={() => setMenuState({ view: View.DressUp, chosenCharacterIdentifier: 'young' })}>Young Princess</button>
        </div>
    )
}

export default Menu