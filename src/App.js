import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    snake: [[5, 5], [5, 6]],
    goal: null,
    gameOver: false,
    head: [5, 5],
    count: 0,
    speed: 300
  };
  table = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

  moveToSide = (newSnake) => {
    const {snake} = this.state;
    this.setState({head: newSnake})
    return [newSnake].concat(snake.slice(0, snake.length - 1))
  }
  generateGoal = () => {
    return [Math.round(Math.random() * 9), Math.round(Math.random() * 9)]
  }
  gameOver = () => {
    const {snake, head} = this.state
    snake.slice(1).map(el => {
      return el[0] === head[0] && el[1] === head[1] && this.setState({gameOver: true}, clearInterval(this.interval))
    })
    if (head[0] == 10 || head[1] == 10 || head[0] < 0 || head[1] < 0) {
      this.setState({gameOver: true},clearInterval(this.interval))
    }

  }
  restart = () => {
    this.setState({
      snake: [[5, 5], [5, 6]],
      goal: this.generateGoal(),
      gameOver: false,
      head: [5, 5],
      count: 0,
      speed: 300
    })
  }

  interval = null;

  laucnSnake = (event) => {
    clearInterval(this.interval)
    this.interval = setInterval(() => {
      this.moveSnake(event)
    }, this.state.speed)
  }

  moveSnake = (event) => {
    const {snake, goal, head, count,speed} = this.state;
    // удлинение змеи
    if (snake[0][0] === goal[0] && snake[0][1] === goal[1]) {
      this.setState({
        snake: snake.concat(snake.slice(snake.length - 2, snake.length - 1)),
        count: count + 1,
        goal: this.generateGoal()
      })
    }
    if (count >= 5) {
      this.setState({speed:150})
    }

    switch (event.keyCode) {
      // вверх
      case 38: {
        this.setState({snake: this.moveToSide([snake[0][0], snake[0][1] - 1])}, this.gameOver())
        break;
      }
      // вниз
      case 40: {
        this.setState({snake: this.moveToSide([snake[0][0], snake[0][1] + 1])}, this.gameOver())
        break;
      }
      // вправо
      case 39: {
        this.setState({snake: this.moveToSide([snake[0][0] + 1, snake[0][1]])}, this.gameOver())
        break;
      }
      // влево
      case 37: {
        this.setState({snake: this.moveToSide([snake[0][0] - 1, snake[0][1]])}, this.gameOver())
        break;
      }
    }
  };


  componentDidMount() {
    document.addEventListener("keydown", this.laucnSnake, false)
    this.setState({goal: this.generateGoal()})
  }

  styleGoal = {
    backgroundColor: "green"
  }


  render() {
    const {gameOver, snake, goal, count,head} = this.state
    if (goal) {
      return (
        <>
          <div className="count">Count: {count}</div>
          <div className="App">
            {gameOver ? <div className={"gameOver"}>
                <div>Game Over</div>
                <div onClick={this.restart}>Try Again</div>
              </div> :
              this.table.map((row, rowIdx) => (
                <div key={rowIdx} className="row">
                  {row.map((cell, cellIdx) => (
                    <div key={cellIdx}
                         style={(goal[0] === rowIdx && goal[1] === cellIdx) ? this.styleGoal : null}
                         className={snake.some(el => (el[0] === rowIdx && el[1] === cellIdx)) ? "snake" : "cell"}>
                    </div>))}
                </div>
              ))}
          </div>
        </>
      );
    }
    return null
  }


}

export default App;
