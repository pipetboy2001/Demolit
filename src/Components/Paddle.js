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
        const { speed, width, LimitX } = this.props;
        const { key } = event;

        if (key === 'ArrowLeft') {
            this.setState({ x: Math.max(x - speed, 0) });
        } else if (key === 'ArrowRight') {
            this.setState({ x: Math.min(x + speed, LimitX - width) });
        }

    };


    handleCollision = (ballX, ballY, ballRadius, ballVelocityX, ballVelocityY) => {
        const { x, y, width, height } = this.props;
        const paddleTop = y;
        const paddleBottom = y + height;
        const paddleLeft = x;
        const paddleRight = x + width;
        const ballTop = ballY - ballRadius;
        const ballBottom = ballY + ballRadius;
        const ballLeft = ballX - ballRadius;
        const ballRight = ballX + ballRadius;

        if (ballBottom >= paddleTop && ballTop <= paddleBottom && ballRight >= paddleLeft && ballLeft <= paddleRight) {
            // Calculate the point of contact
            const contactPoint = ballX - (x + (width / 2));
            // Normalize the contact point to a range between -1 and 1
            const normalizedContactPoint = contactPoint / (width / 2);
            // Calculate the angle of deflection
            const angle = normalizedContactPoint * Math.PI / 3;
            // Calculate the new velocity values
            const newVelocityX = ballVelocityX * Math.cos(angle) + ballVelocityY * Math.sin(angle);
            const newVelocityY = ballVelocityX * Math.sin(angle) - ballVelocityY * Math.cos(angle);
            // Update the velocity values
            return { ballVelocityX: newVelocityX, ballVelocityY: -newVelocityY };
        } else {
            return { ballVelocityX, ballVelocityY };
        }
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
