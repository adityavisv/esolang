import './App.css';
import React from 'react';
import { runBrainfuck, runInputInstruction } from './interpreter_engine/brainfuck';
import { runCortlang } from './interpreter_engine/cortlang';
import { E_COMPLETE, E_IO_PAUSE, E_SYNTAX_ERR } from './interpreter_engine/brainfuck_constants';
import Editor from '@monaco-editor/react';
import 'bootstrap/dist/css/bootstrap.css';
import Toolbar from './components/Toolbar/Toolbar';
import { runABC } from './interpreter_engine/abc';
import { runDeadSimple } from './interpreter_engine/deadsimple';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      consoleBufEndPtr: 2, 
      ioWait: false,
      userInputChar: '',
      canExecute: false,
      selectedLang: 'Brainfuck',
      sourceCodeBuf: '',
      stdoutStr: '> ',
      brainfuckState: {
        brainfuckTape: new Array(8192).fill(0),
        brainfuckTapePtr: 0,
        instructionPtr: 0,
        execCode: E_COMPLETE
      },
      cortlangState: {
        cortlangStack: [],
        instructionPtr: 0,
        execCode: E_COMPLETE
      },
      abcState: {
        instructionPtr: 0,
        execCode: E_COMPLETE,
        stringMode: false,
        acc: 0
      },
      deadSimpleState: {
        instructionPtr: 0,
        acc: 0
      }
    };
    this.editorRef = React.createRef();
  }

  /* ----------------------------------------- EDITOR UI Handlers ------------------------------ */
  handleEditorMount = (editor, monaco) => {
    this.editorRef.current = editor;
  }

  handleEditorChange = (value, event) => {
    const canExecute = (value !== '');
   
    this.setState({
      sourceCodeBuf: value,
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
      const finalBFState = runBrainfuck(newBrainfuckState);
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
  handleLanguageChange = (event) => {
    this.setState({
      selectedLang: event.target.value
    });
  }

  handleClickResetBtn = () => {
    this.setState({
      consoleBufEndPtr: 2, 
      ioWait: false,
      userInputChar: '',
      sourceCodeBuf: '',
      stdoutStr: '> ',
      brainfuckState: {
        brainfuckTape: new Array(8192).fill(0),
        brainfuckTapePtr: 0,
        instructionPtr: 0,
        execCode: E_COMPLETE
      },
      cortlangState: {
        cortlangStack: [],
        instructionPtr: 0,
        execCode: E_COMPLETE
      },
      abcState: {
        stringMode: false,
        acc: 0,
        instructionPtr: 0
      }
    });
  }

  handleClickRunBtn = () => { 
    const {selectedLang, sourceCodeBuf, stdoutStr} = this.state;

    if (selectedLang === 'Brainfuck') {
      var {brainfuckState} = this.state;
      brainfuckState = {
        ...brainfuckState,
        sourceCodeBuf,
        stdoutStr
      }
      var newBFState = runBrainfuck(sourceCodeBuf, brainfuckState);
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
        stdoutStr: newBFState.stdoutStr,
        consoleBufEndPtr: newBFState.stdoutStr.length
      });
    }

    else if (selectedLang === '11CORTLANG') {
      var {cortlangState} = this.state;
      cortlangState = {
        ...cortlangState,
        stdoutStr
      };
      var newCortlangState = runCortlang(sourceCodeBuf, cortlangState);
      var ioWait = (newCortlangState.execCode === E_IO_PAUSE);
      this.setState({
        ioWait,
        cortlangState: newCortlangState,
        consoleBufEndPtr: newCortlangState.stdoutStr.length,
        stdoutStr: newCortlangState.stdoutStr
      });
    }

    else if (selectedLang === 'ABC') {
      var {abcState} = this.state;
      abcState = {
        ...abcState,
        stdoutStr
      };
      var newAbcState = runABC(sourceCodeBuf, abcState);
      var ioWait = (newAbcState.execCode === E_IO_PAUSE);
      this.setState({
        ioWait,
        abcState: newAbcState,
        consoleBufEndPtr: newAbcState.stdoutStr.length,
        stdoutStr: newAbcState.stdoutStr
      });
    }

    else if (selectedLang === 'DeadSimple') {
      var {deadSimpleState} = this.state;
      deadSimpleState = {
        ...deadSimpleState,
        sourceCodeBuf,
        stdoutStr
      };
      var newDeadSimpleState = runDeadSimple(sourceCodeBuf, deadSimpleState);
      var ioWait = (newDeadSimpleState.execCode === E_IO_PAUSE);
      this.setState({
        ioWait,
        deadSimpleState: newDeadSimpleState,
        consoleBufEndPtr: newDeadSimpleState.stdoutStr.length,
        stdoutStr: newDeadSimpleState.stdoutStr
      });
    }
  }


  render = () => {
    const {sourceCodeBuf, stdoutStr, brainfuckState, ioWait, canExecute} = this.state;
   
    return (
      <div className="App">
        <Toolbar
          sourceCodeBuf={sourceCodeBuf}
          brainfuckState={brainfuckState}
          canExecute={canExecute}
          handleClickResetBtn={this.handleClickResetBtn}
          handleClickRunBtn={this.handleClickRunBtn}
          handleLanguageChange={this.handleLanguageChange}
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
