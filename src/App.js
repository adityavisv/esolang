import './App.css';
import React from 'react';
import { brainfuckRun } from './interpreter_engine/brainfuck';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sourceCodeBuf: '',
      execOutput: '> '
    };
  }

  onCodeInput = (event) => {
    this.setState ({
      sourceCodeBuf: event.target.value.trim()
    });
  }

  onClickButton = () => { 
      const brainfuckParams = {
        sourceCodeBuf: this.state.sourceCodeBuf,
        stdoutStr: '> '
      };
     
      brainfuckRun(brainfuckParams);
      this.setState({
        execOutput: brainfuckParams.stdoutStr
      });
  }
  render = () => {
    const {sourceCodeBuf, execOutput} = this.state;
    return (
      <div className="App">
        <textarea onChange={this.onCodeInput} value = {sourceCodeBuf} />
        <textarea value={execOutput} />
        <button onClick={this.onClickButton}>Run</button>
      </div>
    );
  }
  
}

export default App;
