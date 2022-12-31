import { DressUpDispatcher, DressUpState, princessId } from "../DressUpReducer";
import StaticItem from "./StaticItem";
import forwardArrow from '/src/assets/forwardarrow.png';
import { MenuState, View } from "../App";
import './MakeUpStage.css';
import PaintableWidget from "./PaintableWidget";

interface MakeupStageProps {
    state: DressUpState,
    stateDispatch: DressUpDispatcher
    menuState: MenuState;
    setMenuState: (s: MenuState) => void;
}

const MakeupStage = ({ state, stateDispatch, menuState, setMenuState }: MakeupStageProps) => {
    return (
        <div>

            {state.map(item => {
                if (item.id === princessId) {
                    return <PaintableWidget url={item.url} />
                }
                else {
                    return <StaticItem key={item.id} item={item} dispatch={stateDispatch} />
                }
            })}
            <img
                className="clothingNavigation"
                style={{}}
                src={forwardArrow}
                onClick={() => setMenuState({ view: View.Clothing, characterIdentifier: menuState.characterIdentifier })}
            />
        </div>
    )
}

export default MakeupStage;