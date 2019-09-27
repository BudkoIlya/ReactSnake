import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
    state = {
        snake: [[5, 5], [5, 6]]
    };
    table = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
    moveSnake = (event) => {
        const {snake} = this.state;
        switch (event.keyCode) {
            case 38: {
              console.log(38)
                this.setState({snake: [[snake[0][0], snake[0][1] - 1]].concat(snake.slice(0, snake.length - 1))})
              break;
            }
            case 39: {
              console.log(39)
              this.setState({snake: [[snake[0][0]+1, snake[0][1] ]].concat(snake.slice(0, snake.length - 1))})
              break;
            }
            case 37: {
              console.log(39)
              this.setState({snake: [[snake[0][0]-1, snake[0][1] ]].concat(snake.slice(0, snake.length - 1))})
              break;
            }
            case 40: {
              console.log(39)
              this.setState({snake: [[snake[0][0], snake[0][1]+1]].concat(snake.slice(0, snake.length - 1))})
              break;
            }
        }
        console.log(event)
    };

    componentDidMount() {
        document.addEventListener("keydown", this.moveSnake, false)
    }

    render() {
        return (
            <div className="App">
                {this.table.map((row, rowIdx) => (
                    <div className="row">
                        {row.map((cell, cellIdx) => (<div className="cell">
                            {this.state.snake.some(el => (el[0] === rowIdx && el[1] === cellIdx)) ? '!!!' : '???'}
                        </div>))}
                    </div>
                ))}
            </div>
        );
    }


}

export default App;
