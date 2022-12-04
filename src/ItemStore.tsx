import { useState } from "react";
import ItemWidget from "./ItemWidget";

interface Item {
    url: string;
    initialPos: { x: number; y: number }
}


const ItemStore = () => {
    const items = [
        { url: './princesses/young/princess.png', initialPos: { x: 100, y: 100}},
        { url: './princesses/young/princess.png', initialPos: { x: 1000, y: 100}},
        { url: './princesses/young/princess.png', initialPos: { x: 1000, y: 800}},
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