import React from 'react';
import './Tile.css';

const Tile = ({ letter, onClick }) => {
    return (
        <div className="tile" onClick={() => onClick(letter)}>
            {letter}
        </div>
    );
};

export default Tile;
