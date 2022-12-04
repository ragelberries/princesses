import axios from 'axios';
import { useEffect, useState } from 'react';
import { ItemData } from './DressUp';
import { DressUpAction } from './DressUpReducer';
import './DressUpToolBox.css'

interface DressUpToolBoxProps {
    items: ItemData[] | undefined;
    dispatch: (a: DressUpAction) => void;
}

const DressUpToolBox = ({ items, dispatch }: DressUpToolBoxProps) => {
    const handleClick = (item: ItemData) => {
        dispatch({
            type: 'add', item: {
                id: Date.now(),
                url: item.url,
                position: { x: 300, y: 300 },
                z: item.z
            }
        })
    }

    return (
        <div className="toolbar">
            {items && items.map(item => (
                <img draggable="false" className="toolbarItem" src={item.url} key={item.url} onClick={() => handleClick(item)} />
            ))}
        </div>
    )
}

export default DressUpToolBox;