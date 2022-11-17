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
import { connect } from 'react-redux';
import { runBrainfuckWhole } from './actions/brainfuck';
import { runABCWhole } from './actions/abc';
import { runDeadSimpleWhole } from './actions/deadsimple';

class App extends React.Component {
  constructor(props) {
    super(props);
    const {
      consoleBufEndPtr,
      ioWait,
      stdoutStr,
      brainfuckState,
      cortlangState,
      abcState,
      deadSimpleState
    } = this.props;
    this.state = {
      consoleBufEndPtr, 
      ioWait,
      userInputChar: '',
      canExecute: false,
      selectedLang: 'Brainfuck',
      sourceCodeBuf: '',
      stdoutStr,
      brainfuckState,
      cortlangState,
      abcState,
      deadSimpleState
    };
    this.editorRef = React.createRef();
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.ioWait !== prevProps.ioWait ||
        this.props.consoleBufEndPtr !== prevProps.consoleBufEndPtr ||
        this.props.stdoutStr !== prevProps.stdoutStr ||
        this.props.brainfuckState !== prevProps.brainfuckState ||
        this.props.cortlangState !== prevProps.cortlangState || 
        this.props.abcState !== prevProps.abcState ||
        this.props.deadSimpleState !== prevProps.deadSimpleState
      ) {
        const {
          consoleBufEndPtr,
          ioWait,
          stdoutStr,
          brainfuckState,
          cortlangState,
          abcState,
          deadSimpleState
        } = this.props;
        this.setState({
          consoleBufEndPtr,
          ioWait,
          stdoutStr,
          brainfuckState,
          cortlangState,
          abcState,
          deadSimpleState
        });
      }
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
    const { dispatch } = this.props;

    if (selectedLang === 'Brainfuck') {
      var {brainfuckState} = this.state;
      brainfuckState = {
        ...brainfuckState,
        stdoutStr
      }
      dispatch(runBrainfuckWhole(sourceCodeBuf, brainfuckState));
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
      dispatch(runABCWhole(sourceCodeBuf, abcState));
    }

    else if (selectedLang === 'DeadSimple') {

      const {deadSimpleState} = this.state;
      dispatch(runDeadSimpleWhole(sourceCodeBuf, {
        ...deadSimpleState,
        stdoutStr
      }));
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

function mapStateToProps(state) {
  const { brainfuckState, cortlangState, deadSimpleState, ioWait, stdoutStr, consoleBufEndPtr, isError, abcState } = state.app;
  return {
    brainfuckState,
    cortlangState,
    deadSimpleState,
    abcState,
    ioWait,
    stdoutStr,
    consoleBufEndPtr,
    isError
  };
}

export default connect(mapStateToProps)(App);
