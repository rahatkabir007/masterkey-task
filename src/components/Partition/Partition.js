import React, { useState, useRef, useEffect } from 'react';
import './Partition.css';
import { getRandomColor } from '../../utils/getRandomcolor';

const Partition = ({ initialColor }) => {
 
    const [isSplit, setIsSplit] = useState(false);
    const [isVertical, setIsVertical] = useState(true);
    const [leftColor, setLeftColor] = useState(initialColor);
    const [rightColor, setRightColor] = useState(getRandomColor());
    const [dimensions, setDimensions] = useState({ width: '100%', height: '100%' });

    const partitionRef = useRef(null);

    const handleSplit = (direction) => {
        setIsSplit(true);
        setIsVertical(direction === 'V');
    };

    const handleRemove = () => {
        setIsSplit(false);
    };

    const handleMouseDown = (e) => {
        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = partitionRef.current.offsetWidth;
        const startHeight = partitionRef.current.offsetHeight;

        const onMouseMove = (e) => {
            if (isVertical) {
                const newWidth = startWidth + e.clientX - startX;
                setDimensions((prev) => ({ ...prev, width: newWidth }));
            } else {
                const newHeight = startHeight + e.clientY - startY;
                setDimensions((prev) => ({ ...prev, height: newHeight }));
            }
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    return (
        <div
            className="partition"
            style={{ backgroundColor: initialColor, width: dimensions.width, height: dimensions.height }}
            ref={partitionRef}
        >
            {!isSplit ? (
                <div className="buttons">
                    <button onClick={() => handleSplit('V')}>V</button>
                    <button onClick={() => handleSplit('H')}>H</button>
                </div>
            ) : (
                <div className={`split-container ${isVertical ? 'vertical' : 'horizontal'}`}>
                    <Partition initialColor={leftColor} />
                    <Partition initialColor={rightColor} />
                        <div className='resizer' onMouseDown={handleMouseDown}><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M8 18h3v-3H2v-2h20v2h-9v3h3l-4 4zm4-16L8 6h3v3H2v2h20V9h-9V6h3z" /></svg></div>
                    <button className="remove-button" onClick={handleRemove}>-</button>
                </div>
            )}
        </div>
    );
};



export default Partition;
