import React, { Component } from 'react';

class Paddle extends Component {
    state = {
        x: this.props.x,
        y: this.props.y,
    };
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }
    handleKeyDown = (event) => {
    const { x } = this.state;
    const { speed, width, LimitX, onPaddleMove } = this.props; // Agregar la prop onPaddleMove
    const { key } = event;
    if (key === 'ArrowLeft') {
        this.setState({ x: Math.max(x - speed, 0) }, () => {
            onPaddleMove(this.state.x); // Llamar a onPaddleMove con el valor actualizado de x
        });
    } else if (key === 'ArrowRight') {
        this.setState({ x: Math.min(x + speed, LimitX - width) }, () => {
            onPaddleMove(this.state.x); // Llamar a onPaddleMove con el valor actualizado de x
        });
    }
    console.log(`Posición actual de la barra: ${this.state.x}`);
};

    render() {
        const { x, y } = this.state;
        const { width, height } = this.props;

        return (
            <div
                style={{
                    position: 'absolute',
                    left: `${x}px`,
                    top: `${y}px`,
                    width: `${width}px`,
                    height: `${height}px`,
                    backgroundColor: 'white',
                }}
            />
        );
    }
}

export default Paddle;
