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
}


const DressUpToolBox = ({ dispatch }: DressUpToolBoxProps) => {
    const items: DressUpToolBoxItem[] = [
        { name: 'Dress 1', url: '/princesses/young/dress1.png' },
        { name: 'Dress 2', url: '/princesses/young/dress2.png' },
        { name: 'Dress 3', url: '/princesses/young/dress3.png' },
    ]

    const handleClick = (url: string) => {
        dispatch({ type: 'add', item: { id: Date.now(), url: url, position: { x: 300, y: 300 } } })
    }
    return (
        <div>
            {items.map(item => (
                <button key={item.url} onClick={() => handleClick(item.url)}>{item.name}</button>
            ))}
        </div>
    )
}

export default DressUpToolBox;