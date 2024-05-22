import React, { useState } from 'react';
import Tile from './Tile';
import './Grid.css';

const Grid = () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const [outputString, setOutputString] = useState('');

    const handleTileClick = (letter) => {
        let newOutputString = outputString + letter;

        newOutputString = newOutputString.replace(/(.)\1{2,}/g, (match) => '_');

        setOutputString(newOutputString);
    };

    return (
        <div>
            <div className="grid">
                {alphabet.map((letter) => (
                    <Tile key={letter} letter={letter} onClick={handleTileClick} />
                ))}
            </div>
            <div id="outputString" className="output">
                {outputString}
            </div>
        </div>
    );
};

export default Grid;
