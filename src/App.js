import './App.css';
import React from 'react';
import { brainfuckRun, runInputInstruction } from './interpreter_engine/brainfuck';
import { E_COMPLETE, E_IO_PAUSE, E_SYNTAX_ERR } from './interpreter_engine/brainfuck_constants';
import Editor from '@monaco-editor/react';
import 'bootstrap/dist/css/bootstrap.css';
import Toolbar from './components/Toolbar/Toolbar';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      consoleBufEndPtr: 2, 
      ioWait: false,
      userInputChar: '',
      canExecute: false,
      selectedLang: 'Brainfuck',
      brainfuckState: {
        brainfuckTape: new Array(8192).fill(0),
        brainfuckTapePtr: 0,
        instructionPtr: 0,
        sourceCodeBuf: '',
        stdoutStr: '> ',
        execCode: E_COMPLETE
      }
    };
    this.editorRef = React.createRef();
  }

  handleLanguageChange = (event) => {
    this.setState({
      selectedLang: event.target.value
    });
  }

  /* ----------------------------------------- EDITOR UI Handlers ------------------------------ */
  handleEditorMount = (editor, monaco) => {
    this.editorRef.current = editor;
  }

  handleEditorChange = (value, event) => {
    var {brainfuckState} = this.state;
    const canExecute = (value !== '');
    brainfuckState = {
      ...brainfuckState,
      sourceCodeBuf: value
    };
    this.setState({
      brainfuckState,
      canExecute
    });
  }

  /*------------------------------- CONSOLE UI Handlers ----------------------------------- */
  handleConsoleInput = (event) => {
    const consoleInputText = event.target.value;
    var { brainfuckState } = this.state;
    brainfuckState = {
      ...brainfuckState,
      stdoutStr: consoleInputText
    };
    this.setState ({
      brainfuckState
    });
  }

  handleConsoleKeyPress = (event) => {
    if (event.keyCode === 13) {
      // Catch the enter key and prevent it from throwing a newline into the textarea.
      // Not doing this causes a weird bug where a '\n' gets inserted into the stdoutStr and messes with the code execution.
      event.preventDefault();

      const { consoleBufEndPtr, brainfuckState, brainfuckState: {stdoutStr} } = this.state;
      const userInputChar = stdoutStr.substr(consoleBufEndPtr);

      const newBrainfuckState = runInputInstruction(brainfuckState, userInputChar);
      const finalBFState = brainfuckRun(newBrainfuckState);
      const ioWait = finalBFState.execCode === E_IO_PAUSE;
      this.setState({
        brainfuckState: {
          ...finalBFState
        },
        consoleBufEndPtr: finalBFState.stdoutStr.length,
        ioWait
      });
    }
  }

  /* -------------------------------------- TOOLBAR Button handlers ------------------------------------ */
  handleClickResetBtn = () => {
    this.setState({
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
    });
  }

  handleClickRunBtn = () => { 
    const {brainfuckState} = this.state;
    var newBFState = brainfuckRun(brainfuckState);
    var ioWait = false;
    if (newBFState.execCode === E_SYNTAX_ERR) {
      window.alert("Syntax error");
    }
    else {
      ioWait = (newBFState.execCode === E_IO_PAUSE);
    }
    this.setState({
      ioWait,
      brainfuckState: newBFState,
      consoleBufEndPtr: newBFState.stdoutStr.length
    });
  }


  render = () => {
    const {brainfuckState: {sourceCodeBuf, stdoutStr}, ioWait, canExecute} = this.state;
    return (
      <div className="App">
        <Toolbar
          canExecute={canExecute}
          handleClickResetBtn={this.handleClickResetBtn}
          handleClickRunBtn={this.handleClickRunBtn}
        />
        <div className="ide_box">
          <div className="editorDiv">
            <Editor
              height="85vh"
              defaultValue="# type in your code here"
              onMount={this.handleEditorMount}
              theme="vs-dark"
              onChange={this.handleEditorChange}
              value={sourceCodeBuf}
              />
          </div>
          <div className="consoleDiv">
            <textarea
              value={stdoutStr}
              onChange={this.handleConsoleInput}
              onKeyDown={this.handleConsoleKeyPress}
              readOnly={! ioWait}
              id="console_textarea"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
