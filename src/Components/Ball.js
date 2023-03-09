import React from 'react';

const Ball = (props) => {
    const { position, radius, color } = props;

    return (
        <div style={{
            position: 'absolute',
            left: position.x - radius,
            top: position.y - radius,
            width: radius * 2,
            height: radius * 2,
            borderRadius: '50%',
            backgroundColor: color
        }}></div>
    );
};

export default Ball;
