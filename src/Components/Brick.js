import React from 'react';

const Brick = (props) => {
    const { position, width, height, color, hitCount } = props;

    const style = {
        position: 'absolute',
        top: `${position.y}px`,
        left: `${position.x}px`,
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: color,
    };

    if (hitCount === 0) {
        return null;
    }

    return (
        <div style={style}>
            {hitCount}
        </div>
    );
};

export default Brick;
