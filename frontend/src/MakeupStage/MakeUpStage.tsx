import { DressUpDispatcher, DressUpState } from "../DressUpReducer";

interface MakeupStageProps {
    state: DressUpState,
    stateDispatch: DressUpDispatcher
}

const MakeupStage = ({state, stateDispatch}: MakeupStageProps) => {
    return (
        <h1>Makeup stage</h1>
    )
}

export default MakeupStage;