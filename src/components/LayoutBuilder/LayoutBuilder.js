import React, { useState } from 'react';
import './LayoutBuilder.css';

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const Partition = ({ id, color, onSplit, onRemove, onResize }) => (
    <div
        className="partition"
        style={{ backgroundColor: color }}
        onMouseDown={(e) => onResize(e, id)}
    >
        <button className="split-btn" onClick={() => onSplit(id, 'vertical')}>V</button>
        <button className="split-btn" onClick={() => onSplit(id, 'horizontal')}>H</button>
        <button className="remove-btn" onClick={() => onRemove(id)}>-</button>
    </div>
);

const LayoutBuilder = () => {
    const [partitions, setPartitions] = useState([
        { id: 1, color: getRandomColor(), width: '100%', height: '100%' },
    ]);

    const splitPartition = (id, direction) => {
        setPartitions((prevPartitions) =>
            prevPartitions.flatMap((partition) =>
                partition.id === id
                    ? [
                        partition,
                        {
                            id: prevPartitions.length + 1,
                            color: getRandomColor(),
                            width: direction === 'vertical' ? '50%' : '100%',
                            height: direction === 'horizontal' ? '50%' : '100%',
                        },
                    ]
                    : [partition]
            )
        );
    };

    const removePartition = (id) => {
        setPartitions((prevPartitions) =>
            prevPartitions.filter((partition) => partition.id !== id)
        );
    };

    const handleResize = (e, id) => {
        const startX = e.clientX;
        const startY = e.clientY;

        const onMouseMove = (e) => {
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;

            setPartitions((prevPartitions) =>
                prevPartitions.map((partition) =>
                    partition.id === id
                        ? {
                            ...partition,
                            width: `calc(${partition.width} + ${dx}px)`,
                            height: `calc(${partition.height} + ${dy}px)`,
                        }
                        : partition
                )
            );
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    return (
        <div className="layout-builder">
            {partitions.map((partition) => (
                <div
                    key={partition.id}
                    className="resizable"
                    style={{
                        width: partition.width,
                        height: partition.height,
                    }}
                >
                    <Partition
                        id={partition.id}
                        color={partition.color}
                        onSplit={splitPartition}
                        onRemove={removePartition}
                        onResize={handleResize}
                    />
                </div>
            ))}
        </div>
    );
};

export default LayoutBuilder;
