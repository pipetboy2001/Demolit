import React, { useState, useEffect } from 'react'
import '../Style/Game.css'
import Paddle from './Paddle';
import Brick from './Brick';
import Ball from './Ball';

function Game() {

    const [ballPosition, setBallPosition] = useState({ x: 2, y: 50 });
    const [ballVelocity, setBallVelocity] = useState({ x: 5, y: 5 });

    //... código para crear ladrillos
    //... código para crear ladrillos
    useEffect(() => {
        const initialBricks = [];
        for (let i = 0; i < 24; i++) {
            const colorIndex = i % 7;
            const hitCount = i + 1;
            const row = Math.floor(i / 8);
            const x = 50 + (i % 8) * 60;
            const y = 50 + row * 50;
            initialBricks.push({
                position: { x, y },
                width: 50,
                height: 20,
                color: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#000000'][colorIndex],
                hitCount
            });
        }
        setBricks(initialBricks);
    }, []);

    const [bricks, setBricks] = useState([]);

    const handleBrickCollision = (index) => {
        const newBricks = [...bricks];
        newBricks.splice(index, 1);
        setBricks(newBricks);
    };

    //Funcion pelota en movimiento y que no salga del recuadro
    useEffect(() => {
        // Esta función se ejecuta en cada fotograma
        const updateBallPosition = () => {
            // Verificar colisiones con los bordes del contenedor
            if (ballPosition.x + ballVelocity.x > 570 - 10 || ballPosition.x + ballVelocity.x < 10) {
                setBallVelocity(prevVelocity => ({ x: -prevVelocity.x, y: prevVelocity.y }));
            }
            if (ballPosition.y + ballVelocity.y < 10) {
                setBallVelocity(prevVelocity => ({ x: prevVelocity.x, y: -prevVelocity.y }));
            }
            if (ballPosition.y + ballVelocity.y > 300 - 10) {
                // La pelota ha llegado al borde inferior, reiniciar el juego
                setBallPosition({ x: 100, y: 200 });
                setBallVelocity({ x: 5, y: 5 });
                return;
            }
            // Actualiza la posición de la bola
            setBallPosition(prevPosition => ({
                x: prevPosition.x + ballVelocity.x,
                y: prevPosition.y + ballVelocity.y
            }));
        };

        const animationId = setInterval(updateBallPosition, 16); // Actualiza la posición de la bola cada 16ms

        return () => clearInterval(animationId); // Limpia el intervalo cuando el componente se desmonta
    }, [ballVelocity, ballPosition]);


    return (
        <div className="container">
            <div className="contenedor">
                <Ball
                    position={ballPosition}
                    radius={10}
                    color={'#000'}
                    bricks={bricks}
                    onBrickCollision={handleBrickCollision}
                />
                <Paddle position={100} width={100} height={10} color={'#000'} />
                {bricks.map((brick, index) => (
                    <Brick key={index} {...brick} />
                ))}
            </div>
        </div>
    );
}
export default Game