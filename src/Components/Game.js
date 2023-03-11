import React, { useState } from 'react';
import Paddle from './Paddle';
import Ball from './Ball';
import '../Style/Game.css';
import '../Style/WelcomeScreen.css'
import Brick from './Brick';
import bricksData from '../Json/Brick.json';

//Pantalla de bienevenida
function WelcomeScreen({ onStartGame }) {
    return (
        <div className="background-image">
            <div className="game-title">
                <h1 class="game-title__heading">¡DEMOLIT!</h1>
                <p class="game-title__created-by">Creado por <a href="https://github.com/pipetboy2001">Pipetboy</a></p>
                <button class="game-title__btn-start" onClick={onStartGame}>¡Comenzar a jugar!</button>
            </div>
        </div>
    );
}

function Game(props) {
    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [ballKey, setBallKey] = useState(0);
    const [bricks, setBricks] = useState(bricksData);
    const paddleX = 700;
    const paddleY = 400;
    const paddleWidth = 100;
    const paddleHeight = 20;
    const TamañoCuadradowidth = 990;
    const TamañoCuadradoheight = 480;
    const [paddlePosition, handlePaddleMove] = usePaddlePosition(paddleX);


    const handleGameOver = () => {
        setGameOver(true);
    };
    const handleRestart = () => {
        setGameOver(false);
        setBallKey(ballKey + 1); //reiniciar la bola
        setBricks(bricksData); // reinicia los bloques a su configuración inicial
    };

    //colocar para que al inicio parta la funcion welcomeScreen
    if (!gameStarted) {
        return <WelcomeScreen onStartGame={() => setGameStarted(true)} />;
    }

    function handleBrickCollision(index) {
        // haz una copia del estado de bloques
        const newBricks = [...bricks];
        // actualiza el bloque que fue golpeado
        const hitCount = newBricks[index].hitCount - 1;
        if (hitCount <= 0) {
            // elimina el bloque de la lista si ha sido destruido
            newBricks.splice(index, 1);
        } else {
            // actualiza el contador de golpes si el bloque aún no ha sido destruido
            newBricks[index].hitCount = hitCount;
        }
        // actualiza el estado de los bloques
        setBricks(newBricks);
    }

    //Funcion que lee la posicion de la barra
    function usePaddlePosition(initialPosition) {
        const [paddleX, setPaddleX] = useState(initialPosition);
        const handlePaddleMove = (x) => {
            setPaddleX(x);
        };
        return [paddleX, handlePaddleMove];
    }

    return (
        <div className='TamañoPagina'>
            <div className='contenedor'>
                {gameOver ? (
                    <div className='gameOver'>
                        <h2 class='gameOver__heading'>¡Game Over!</h2>
                        <p class='gameOver__text'>Lo siento, ¡has perdido!</p>
                        <button class='gameOver__btn-restart' onClick={handleRestart}>¡Jugar de nuevo!</button>
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
                            onPaddleMove={handlePaddleMove}
                        />
                        <Ball
                            key={ballKey}
                            x={window.innerWidth / 2} //donde parte la bola
                            y={window.innerHeight / 2} //donde parte la bola
                            dx={3} //velocidad horizonta
                            dy={3} //velocidad vertical
                            radius={10}
                            paddleX={paddlePosition}//barra en x
                            paddleY={paddleY}//barra en Y
                            paddleWidth={paddleWidth}//tamaño de anchura de la barra
                            paddleHeight={paddleHeight}//tamaño dee altura de la barra
                            onGameOver={handleGameOver}//mandar funcion de terminar juego
                            LimitX={TamañoCuadradowidth}
                            LimitY={TamañoCuadradoheight}
                            bricks={bricks}
                            onBrickCollision={handleBrickCollision}
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