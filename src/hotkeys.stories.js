import React from 'react';
import { storiesOf } from '@storybook/react';
import Hotkeys from './hotkeys';

storiesOf('Hotkeys', module)
  .add('with collision', () => (
    <div>
      <Hotkeys keys="up up down down" callback={() => alert('hi')} />
      <Hotkeys keys="up up down down" callback={() => alert('hi2')} />
    </div>
  ))
  .add('FlappyBird', () => {
    class FlappyBird extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          paused: false,
          height: 0
        }

        this.fall = this.fall.bind(this);
        this.jump = this.jump.bind(this);
        this.pause = this.pause.bind(this);
      }

      componentDidMount() {
        this.interval = setInterval(this.fall, 1000);
      }

      fall() {
        if (!this.state.paused) {         
          this.setState({
            height: prevState.height - 1
          });
        }
      }

      jump() {
        this.setState({
          height: prevState.height + 1
        });
      }

      pause() {
        this.setState({
          paused: !this.state.paused
        });
      }

      render() {
        return (
          <div>
            {this.state.paused
              ? <h1>Paused. Hit spacebar to make FlappyBird jump. Hit "enter" or "p" to resume.</h1>
              : <h1>Flappy Bird's height is {this.state.height} units </h1>
            }
            <Hotkeys keys="space" callback={this.jump} disabled={this.state.paused} />
            <Hotkeys keys={["enter", "p"]} callback={this.pause} />
          </div>
        );
      }
    }

    return <FlappyBird />
  })