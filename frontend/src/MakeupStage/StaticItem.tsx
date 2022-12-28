import './StaticItem.css';
import { DressUpAction, DressUpItem } from "../DressUpReducer";

interface StaticItemProps {
    item: DressUpItem;
    dispatch: (a: DressUpAction) => void;
}

const StaticItem = ({ item, dispatch }: StaticItemProps) => {

    return (
        <img className="itemWidget"
            src={item.url}
            draggable="false"
            style={{ left: item.position.x, top: item.position.y, zIndex: item.z }}
        />
    )
}


export default StaticItem;

