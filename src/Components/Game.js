import React from 'react'
import '../Style/Game.css'
import Paddle from './Paddle';
import Brick from './Brick';
import Ball from './Ball';

function Game() {

    const bricks = [];
    for (let i = 0; i < 24; i++) {
        const colorIndex = i % 7;
        const hitCount = i + 1;
        const row = Math.floor(i / 8);
        const x = 50 + (i % 8) * 60;
        const y = 50 + row * 50;
        bricks.push({
            position: { x, y },
            width: 50,
            height: 20,
            color: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#000000'][colorIndex],
            hitCount
        });
    }
    return (
        <div className="container">
            <div className="contenedor">
                <Ball position={{ x: 100, y: 200 }} radius={10} color={'#000'} />

                <Paddle position={100} width={100} height={10} color={'#000'} />
                {bricks.map((brick, index) => (
                    <Brick key={index} {...brick} />
                ))}

            </div>
        </div>
    )
}
export default Game