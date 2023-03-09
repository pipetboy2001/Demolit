import React from 'react';

const Paddle = (props) => {
    const { position, width, height, color } = props;

    const style = {
        position: 'absolute',
        bottom: '0',
        left: `${position}px`,
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: color,
    };

    return <div style={style}></div>;
};

export default Paddle;
