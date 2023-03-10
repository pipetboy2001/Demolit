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

    const handleGameOver = () => {
        setGameOver(true);
    };
    const handleRestart = () => {
        setGameOver(false);
        setBallKey(ballKey + 1);
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
                                height={paddleHeight} />
                            <Ball
                                key={ballKey}
                                x={window.innerWidth / 2}
                                y={window.innerHeight / 2}
                                dx={5}
                                dy={5}
                                radius={10}
                                paddleX={paddleX} // pasa el valor de paddleX aquí
                                paddleY={paddleY}
                                paddleWidth={paddleWidth}
                                paddleHeight={paddleHeight}
                                onGameOver={handleGameOver}
                            />


                            {bricks.map((brick, index) => (
                                <Brick key={index} {...brick} />
                            ))}
                    </>
                )}
            </div>
        </div>
    );
}

export default Game;
