import React, { Component } from 'react';

class Ball extends Component {
    state = {
        x: this.props.x,
        y: this.props.y,
        dx: this.props.dx,
        dy: this.props.dy,
        radius: this.props.radius,
    };

    componentDidMount() {
        this.animate();
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.animationId);
    }

    animate = () => {
        const { x, y, dx, dy, radius } = this.state;
        const { paddleX, paddleY, paddleWidth, paddleHeight, onGameOver } = this.props;

        // Detecta colisión con la barra
        if (
            y + radius >= paddleY &&
            y + radius <= paddleY + paddleHeight &&
            x + radius >= paddleX &&
            x - radius <= paddleX + paddleWidth
        ) {
            // Calcula la posición de la colisión en la barra
            const collisionPoint = x - paddleX - paddleWidth / 2;
            // Calcula el ángulo de rebote en función de la posición de la colisión
            const angle = collisionPoint / (paddleWidth / 2) * Math.PI / 3;
            // Cambia la dirección de la pelota en el eje x y el eje y en función del ángulo de rebote
            this.setState({ dx: Math.sin(angle) * radius * 5, dy: -Math.cos(angle) * radius * 5 });
        }

        // Detecta colisión con los bordes
        if (x + radius >= window.innerWidth || x - radius <= 0) {
            this.setState({ dx: -dx });
        } if (y - radius <= 0) {
            this.setState({ dy: -dy });
        }

        // Detecta fin del juego
        if (y + radius >= window.innerHeight) {
            onGameOver();
            return;
        }

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
                    backgroundColor: 'white',
                }}
            />
        );
    }
}

export default Ball;
