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
                        <Paddle x={700} y={400} width={100} height={20} speed={10} />
                        <Ball
                            key={ballKey}
                            x={window.innerWidth / 2}
                            y={window.innerHeight / 2}
                            dx={5}
                            dy={5}
                            radius={10}
                            paddleX={0}
                            paddleY={400}
                            paddleWidth={100}
                            paddleHeight={20}
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
