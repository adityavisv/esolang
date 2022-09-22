import './App.css';
import React from 'react';
import { brainfuckRun, runInputInstruction } from './interpreter_engine/brainfuck';
import { E_COMPLETE, E_IO_PAUSE, E_SYNTAX_ERR } from './interpreter_engine/brainfuck_constants';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sourceCodeBuf: '',
      consoleOutput: '> ',
      consoleBufEndPtr: 2, 
      ioWait: false,
      userInputChar: '',
      brainfuckState: {
        brainfuckTape: new Array(8192).fill(0),
        brainfuckTapePtr: 0,
        instructionPtr: 0,
        sourceCodeBuf: '',
        stdoutStr: '> ',
        execCode: E_COMPLETE
      }
    };
  }

  onCodeInput = (event) => {
    var {brainfuckState} = this.state;
    brainfuckState = {
      ...brainfuckState,
      sourceCodeBuf: event.target.value
    };
    this.setState ({
      sourceCodeBuf: event.target.value.trim(),
      brainfuckState
    });
  }

  onConsoleInput = (event) => {
    const consoleInputText = event.target.value;
    // const { consoleOutput } = this.state;
    // const userInputChar = consoleInputText.substr(consoleOutput.length, consoleInputText.length - consoleOutput.length);

    var { brainfuckState } = this.state;
    brainfuckState = {
      ...brainfuckState,
      stdoutStr: consoleInputText
    };

    this.setState ({
      consoleOutput: consoleInputText,
      brainfuckState
    });
  }

  onConsoleKeyPressListener = (event) => {
    if (event.keyCode === 13) {
      const { consoleOutput, consoleBufEndPtr, brainfuckState } = this.state;
      const userInputChar = consoleOutput.substr(consoleBufEndPtr);
      const newBrainfuckState = runInputInstruction(brainfuckState, userInputChar);
      const finalBFState = brainfuckRun(newBrainfuckState);
      if (finalBFState.execCode === E_COMPLETE) {
        this.setState({
          brainfuckState: {
            ...finalBFState
          },
          consoleOutput: finalBFState.stdoutStr,
          consoleBufEndPtr: finalBFState.stdoutStr.length,
          ioWait: false
        });
      }
      else {
        this.setState({
          brainfuckState: {
            ...finalBFState
          },
          consoleOutput: finalBFState.stdoutStr,
          consoleBufEndPtr: finalBFState.stdoutStr.length,
          ioWait: true
        });
      }
    } 
  }

  onClickButton = () => { 
    const {brainfuckState} = this.state;
     
    var newBFState = brainfuckRun(brainfuckState);
    if (newBFState.execCode === E_SYNTAX_ERR) {
      window.alert("Syntax error");
    }
    else if (newBFState.execCode === E_IO_PAUSE) {
      this.setState({
        consoleOutput: newBFState.stdoutStr,
        ioWait: true,
        brainfuckState: newBFState
      });
    }
    else {
      this.setState({
        consoleOutput: newBFState.stdoutStr,
        ioWait: false,
        brainfuckState: newBFState
      });
    }
  }

  render = () => {
    const {sourceCodeBuf, consoleOutput, ioWait} = this.state;
    return (
      <div className="App">
        <textarea onChange={this.onCodeInput} value = {sourceCodeBuf} />
        <textarea value={consoleOutput} onChange={this.onConsoleInput} onKeyDown={this.onConsoleKeyPressListener} readOnly={! ioWait} />
        <button onClick={this.onClickButton}>Run</button>
      </div>
    );
  }
}

export default App;
