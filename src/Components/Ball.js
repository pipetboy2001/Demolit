import React from 'react';

function Ball(props) {
    const { position, radius, color, bricks } = props;

    // Verificar colisiones con los ladrillos
    for (let i = 0; i < bricks.length; i++) {
        const brick = bricks[i];
        if (
            position.x + radius > brick.position.x &&
            position.x - radius < brick.position.x + brick.width &&
            position.y + radius > brick.position.y &&
            position.y - radius < brick.position.y + brick.height
        ) {
            // Hay colisión con el ladrillo, llamar a la función de manejo de colisión
            props.onBrickCollision(i);
        }
    }

    return (
        <div
            style={{
                position: 'absolute',
                left: position.x - radius,
                top: position.y - radius,
                width: radius * 2,
                height: radius * 2,
                backgroundColor: color,
                borderRadius: '50%',
            }}
        ></div>
    );
}

export default Ball;
