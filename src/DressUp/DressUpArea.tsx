import { DressUpAction, DressUpItem, princessId } from "./DressUp";
import DressUpItemWidget from "./DressUpItemWidget";

interface DressUpAreaProps {
    items: DressUpItem[];
    dispatch: (a: DressUpAction) => void;
}

const DressUpArea = ({ items, dispatch }: DressUpAreaProps) => {

    return (
        <div>
            {
                items.map(item => (
                    <DressUpItemWidget key={item.id} item={item} dispatch={dispatch} />
                ))
            }
        </div >
    )
}

export default DressUpArea;