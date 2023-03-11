import React, { Component } from 'react';

class Ball extends Component {
    state = {
        x: this.props.x,
        y: this.props.y,
        dx: this.props.dx,
        dy: this.props.dy,
        radius: this.props.radius,
        bricks: this.props.bricks, // Agregar la propiedad bricks al estado
    };

    componentDidMount() {
        this.animate();
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.animationId);
    }

    animate = () => {
        const { x, y, dx, dy, radius } = this.state;
        const { paddleX, paddleY, paddleWidth, paddleHeight, onGameOver, LimitX, LimitY, bricks, onBrickCollision } = this.props;

        // Agrega una variable de conteo para llevar registro de cuántos bloques quedan
        let remainingBricks = bricks.length;
        // Bucle para recorrer los bloques
        for (let i = 0; i < bricks.length; i++) {
            const brick = bricks[i];
            // Detecta colisión con el bloque
            if (
                y - radius <= brick.position.y + brick.height &&
                y + radius >= brick.position.y &&
                x + radius >= brick.position.x &&
                x - radius <= brick.position.x + brick.width
            ) {
                // Cambia la dirección de la pelota en el eje y
                this.setState({ dy: -dy });
                // Disminuye el conteo de bloques
                remainingBricks--;
                //borra un cuadrado inmediatamente
                onBrickCollision(i);
            }
        }

        // Verifica si no quedan bloques y muestra el mensaje de "GANASTE!"
        if (remainingBricks === 0) {
            alert('GANASTE!');
            return;
        }


        // Detecta colisión con los bordes
        if (x + radius >= window.innerWidth || x - radius <= 0) {
            this.setState({ dx: -dx });
        }
        if (y - radius <= 0) {
            this.setState({ dy: -dy });
        }
        // Agrega la comprobación para el borde izquierdo de la pantalla
        if (x - radius <= 0) {
            this.setState({ dx: Math.abs(dx) });
            this.setState({ x: radius });
        }
        // Agrega la comprobación para el borde derecho de la pantalla
        if (x + radius >= LimitX) {
            this.setState({ dx: -Math.abs(dx) });
            this.setState({ x: LimitX - radius });
        }        
        // Agrega la comprobación para el borde superior de la pantalla
        if (y - radius <= 0) {
            this.setState({ dy: Math.abs(dy) });
        }

        // Detecta colisión con la barra
        if (
            y + radius >= paddleY &&
            y - radius <= paddleY + paddleHeight &&
            x + radius >= paddleX &&
            x - radius <= paddleX + paddleWidth
        ) {
            // Cambia la dirección de la pelota en el eje y
            this.setState({ dy: -Math.abs(dy) });

            // Ajusta la posición de la pelota para evitar que atraviese la barra
            const collisionOffset = (y + radius) - paddleY;
            this.setState({ y: paddleY - radius - collisionOffset });

            // Cambia la dirección de la pelota en el eje x, dependiendo de la posición en la que toque la barra
            if (x < paddleX + paddleWidth / 3) {
                this.setState({ dx: -Math.abs(dx) });
            }
            if (x > paddleX + (paddleWidth / 3) * 2) {
                this.setState({ dx: Math.abs(dx) });
            }
        }

        // Detecta fin del juego
        if (y + radius >= LimitY) {
            onGameOver();
            return;
        }
        // // Detecta colisión con el borde inferior de la pantalla
        // if (y + radius >= LimitY) {
        //     this.setState({ dy: -Math.abs(dy) });
        // }
        // Actualiza posición de la bola
        this.setState({ x: x + dx, y: y + dy });
        // Solicita nueva animación
        this.animationId = requestAnimationFrame(this.animate);
    };

    render() {
        const { x, y, radius } = this.state;
        return (
            <div
                style={{
                    position: 'absolute',
                    left: `${x}px`,
                    top: `${y}px`,
                    width: `${radius * 2}px`,
                    height: `${radius * 2}px`,
                    borderRadius: `${radius}px`,
                    backgroundColor: 'red',
                }}
            />
        );
    }
}

export default Ball;
