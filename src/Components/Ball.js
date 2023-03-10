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
        const MAX_ANGLE = Math.PI * (5 / 6);
        const MIN_ANGLE = Math.PI * (4 / 6);
        const { x, y, dx, dy, radius } = this.state;
        const { paddleX, paddleY, paddleWidth, paddleHeight, onGameOver } = this.props;

        // Detecta colisión con la barra
        if (
            y + radius >= paddleY &&
            y + radius <= paddleY + paddleHeight &&
            x + radius >= paddleX &&
            x - radius <= paddleX + paddleWidth
        ) {
            // Cambia la dirección de la pelota en el eje y
            this.setState({ dy: -dy });
            // Cambia la dirección de la pelota en el eje x, dependiendo de la posición en la que toque la barra
            const ballPositionOnPaddle = x - paddleX;
            const paddleCenter = paddleWidth / 2;
            const ballPositionRelativeToCenter = ballPositionOnPaddle - paddleCenter;
            const maxPositionFromCenter = paddleCenter - radius;
            const positionRelativeToMax = ballPositionRelativeToCenter / maxPositionFromCenter;
            const angle = positionRelativeToMax * MAX_ANGLE;
            const newDx = -dy * Math.tan(angle);
            this.setState({ dx: newDx });
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

        // Agrega la comprobación para el borde superior de la pantalla
        if (y - radius <= 0) {
            this.setState({ dy: Math.abs(dy) });
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
