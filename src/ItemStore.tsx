import ItemWidget from "./ItemWidget";

const ItemStore = () => {
    const items = [
        { url: './princesses/young/wings.png', initialPos: { x: 100, y: 100}},
        { url: './princesses/young/princess.png', initialPos: { x: 100, y: 100}},
        { url: './princesses/young/dress1.png', initialPos: { x: 1000, y: 100}},
        { url: './princesses/young/dress2.png', initialPos: { x: 1000, y: 100}},
        { url: './princesses/young/dress3.png', initialPos: { x: 1000, y: 100}},
        { url: './princesses/young/bow.png', initialPos: { x: 1000, y: 800}},
        { url: './princesses/young/crown.png', initialPos: { x: 1000, y: 800}},
    ];

    return (
        <div>
            {
                items.map(item => (
                    <ItemWidget url={item.url} initialPos={item.initialPos} />))
            }
        </div>
    )
}

export default ItemStore;