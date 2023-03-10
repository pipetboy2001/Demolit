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
        const { speed, width } = this.props;
        const { key } = event;

        if (key === 'ArrowLeft') {
            this.setState({ x: Math.max(x - speed, 0) });
        } else if (key === 'ArrowRight') {
            this.setState({ x: Math.min(x + speed, window.innerWidth - width) });
        }
    };

    handleCollision = (ballX, ballY, ballRadius) => {
        const { x, y, width } = this.props;
        const paddleTop = y;
        const paddleBottom = y + 10;
        const paddleLeft = x;
        const paddleRight = x + width;
        const ballTop = ballY - ballRadius;
        const ballBottom = ballY + ballRadius;
        const ballLeft = ballX - ballRadius;
        const ballRight = ballX + ballRadius;

        if (ballBottom >= paddleTop && ballTop <= paddleBottom && ballRight >= paddleLeft && ballLeft <= paddleRight) {
            return true;
        } else {
            return false;
        }
    }

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
