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

    return (
        <div style={style}>
            {hitCount === 0 ? null : <div>{hitCount}</div>}
        </div>
    );
};

export default Brick;
