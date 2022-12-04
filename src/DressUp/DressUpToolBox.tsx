import { DressUpAction } from "./DressUp";

interface DressUpToolBoxItem {
    url: string;
}

interface DressUpToolBoxProps {
    dispatch: (a: DressUpAction) => void;
}

interface DressUpToolBoxItem {
    name: string;
    url: string;
    z: number;
}


const DressUpToolBox = ({ dispatch }: DressUpToolBoxProps) => {
    const items: DressUpToolBoxItem[] = [
        { name: 'Dress 1', url: '/princesses/young/dress1.png', z: 200 },
        { name: 'Dress 2', url: '/princesses/young/dress2.png', z: 200 },
        { name: 'Dress 3', url: '/princesses/young/dress3.png', z: 200 },
        { name: 'Crown', url: '/princesses/young/crown.png', z: 200 },
        { name: 'Bow', url: '/princesses/young/bow.png', z: 200 },
        { name: 'Wings', url: '/princesses/young/wings.png', z: 50 },
    ]

    const handleClick = (item: DressUpToolBoxItem) => {
        dispatch({ type: 'add', item: { id: Date.now(),
            url: item.url,
            position: { x: 300, y: 300 },
            z: item.z
        } })
    }
    return (
        <div>
            {items.map(item => (
                <button key={item.url} onClick={() => handleClick(item)}>{item.name}</button>
            ))}
        </div>
    )
}

export default DressUpToolBox;