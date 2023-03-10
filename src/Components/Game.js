import React, { useState } from 'react';
import Paddle from './Paddle';
import Ball from './Ball';
import '../Style/Game.css';
import Brick from './Brick';
import bricksData from '../Json/Brick.json';

function Game(props) {
    const [gameOver, setGameOver] = useState(false);
    const [ballKey, setBallKey] = useState(0);
    const [bricks, setBricks] = useState(bricksData);

    const paddleX = 700;
    const paddleY = 400;
    const paddleWidth = 100;
    const paddleHeight = 20;
    const TamañoCuadradowidth = 990;
    const TamañoCuadradoheight = 480;
    const containerWidth= 990;
    const containerHeight= 100;
    
    const handleGameOver = () => {
        setGameOver(true);
    };
    const handleRestart = () => {
        setGameOver(false);
        setBallKey(ballKey + 1);
    };

    const handleBrickCollision = (index) => {
        // Haz una copia del estado de bloques
        const newBricks = [...bricks];
        // Elimina el bloque de la lista
        newBricks.splice(index, 1);
        // Actualiza el estado de los bloques
        setBricks(newBricks);
    };
    
    return (
        <div className='TamañoPagina'>
            <div className='contenedor'>
                {gameOver ? (
                    <div className='gameOver'>
                        <p>Game Over</p>
                        <button onClick={handleRestart}>Restart</button>
                    </div>
                ) : (
                    <>
                            <Paddle
                                speed={10} 
                                x={paddleX}
                                y={paddleY}
                                width={paddleWidth}
                                height={paddleHeight} 
                                LimitX={TamañoCuadradowidth}
                                LimitY={TamañoCuadradoheight}
                                />
                            <Ball
                                key={ballKey}
                                x={window.innerWidth / 2} //donde parte la bola
                                y={window.innerHeight / 2} //donde parte la bola
                                dx={3} //velocidad horizonta
                                dy={3} //velocidad vertical
                                radius={10}
                                paddleX={paddleX}//barra en x
                                paddleY={paddleY}//barra en Y
                                paddleWidth={paddleWidth}//tamaño de anchura de la barra
                                paddleHeight={paddleHeight}//tamaño dee altura de la barra
                                onGameOver={handleGameOver}//mandar funcion de terminar juego
                                onBrickCollision={handleBrickCollision} // Agregar la función de colisión de bloques
                                bricks={bricks} // Agregar el array de bloques
                                LimitX={TamañoCuadradowidth}
                                LimitY={TamañoCuadradoheight}
                            />


                            {bricks.map((brick, index) => (
                                <Brick 
                                key={index} 
                                onCollision={() => handleBrickCollision(index)}
                                {...brick} />
                            ))}

                            
                    </>
                )}
            </div>
        </div>
    );
}

export default Game;
