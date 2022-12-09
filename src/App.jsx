import './App.css';
import React from 'react';
import Editor from '@monaco-editor/react';
import 'bootstrap/dist/css/bootstrap.css';
import Toolbar from './components/Toolbar/Toolbar';
import Debugger from './components/Debugger/Debugger';
import { connect } from 'react-redux';
import BrainfuckActions from './actions/brainfuck';
import AlphabetaActions from './actions/alphabeta';
import ABCActions from './actions/abc';
import CortlangActions from './actions/cortlang';
import DeadSimpleActions from './actions/deadsimple';
import UserInterfaceActions from './actions/user-interface';
import { Alert, Modal } from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);
    const {
      brainfuckState,
      cortlangState,
      abcState,
      deadSimpleState,
      alphabetaState,
      ioWait,
      consoleBufEndPtr,
      stdoutStr,
      isError,
      canExecute,
      selectedLang,
      sourceCodeBuf
    } = this.props;
    this.state = {
      brainfuckState,
      cortlangState,
      abcState,
      deadSimpleState,
      alphabetaState,
      ioWait,
      consoleBufEndPtr,
      stdoutStr,
      isError,
      canExecute,
      selectedLang,
      sourceCodeBuf,
      showDebugger: false,
      showErrorModal: false
    };
    this.editorRef = React.createRef();
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.brainfuckState !== prevProps.brainfuckState) {
      this.setState({
        brainfuckState: this.props.brainfuckState
      });
    }
    if (this.props.cortlangState !== prevProps.cortlangState) {
      this.setState({
        cortlangState: this.props.cortlangState
      });
    }
    if (this.props.abcState !== prevProps.abcState) {
      this.setState({
        abcState: this.props.abcState
      });
    }
    if (this.props.deadSimpleState !== prevProps.deadSimpleState) {
      this.setState({
        deadSimpleState: this.props.deadSimpleState
      });
    }
    if (this.props.ioWait !== prevProps.ioWait) {
      this.setState({
        ioWait: this.props.ioWait
      });
    }
    if (this.props.consoleBufEndPtr !== prevProps.consoleBufEndPtr) {
      this.setState({
        consoleBufEndPtr: this.props.consoleBufEndPtr
      });
    }
    if (this.props.stdoutStr !== prevProps.stdoutStr) {
      this.setState({
        stdoutStr: this.props.stdoutStr
      });
    }
    if (this.props.isError !== prevProps.isError) {
      this.setState({
        isError: this.props.isError,
        showErrorModal: this.props.isError
      });
    }
    if (this.props.canExecute !== prevProps.canExecute) {
      this.setState({
        canExecute: this.props.canExecute
      });
    }
    if (this.props.selectedLang !== prevProps.selectedLang) {
      this.setState({
        selectedLang: this.props.selectedLang
      });
    }
    if (this.props.sourceCodeBuf !== prevProps.sourceCodeBuf) {
      this.setState({
        sourceCodeBuf: this.props.sourceCodeBuf
      });
    }
  }

  /*------------------------------------------ MISC UI Handlers --------------------------------- */
  hideErrorModal = () => {
    this.setState({
      showErrorModal: false
    });
  }

  /* ----------------------------------------- EDITOR UI Handlers ------------------------------ */
  handleEditorMount = (editor, monaco) => {
    this.editorRef.current = editor;
  }

  handleEditorChange = (value, event) => {
    const { dispatch } = this.props;
    dispatch(UserInterfaceActions.updateSourceCodeBuf(value));
  }

  /*------------------------------- CONSOLE UI Handlers ----------------------------------- */
  handleConsoleInput = (event) => {
    const consoleInputText = event.target.value;
    const { dispatch } = this.props;
    dispatch(UserInterfaceActions.updateStdout(consoleInputText));
  }

  handleConsoleKeyPress = (event) => {
    if (event.keyCode === 13) {
      // Catch the enter key and prevent it from throwing a newline into the textarea.
      // Not doing this causes a weird bug where a '\n' gets inserted into the stdoutStr and messes with the code execution.
      event.preventDefault();

      const { selectedLang } = this.state;
      const { dispatch } = this.props;
      if (selectedLang === 'Brainfuck') {
        dispatch(BrainfuckActions.setInputChar());
      }
      else if (selectedLang === 'AlphaBeta') {
        dispatch(AlphabetaActions.setInputChar());
      }
      
    }
  }

  /* -------------------------------------- TOOLBAR Button handlers ------------------------------------ */
  handleLanguageChange = (event) => {
    const { dispatch } = this.props;
    dispatch(UserInterfaceActions.updateSelectedLang(event.target.value));
  }

  handleClickResetBtn = () => {
    const { dispatch } = this.props;
    dispatch(UserInterfaceActions.resetAppState());
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
      dispatch(BrainfuckActions.runWhole(sourceCodeBuf, brainfuckState));
    }

    else if (selectedLang === '11CORTLANG') {
      var {cortlangState} = this.state;
      cortlangState = {
        ...cortlangState,
        stdoutStr
      };
      dispatch(CortlangActions.runCortlangWhole(sourceCodeBuf, cortlangState));
    }
    else if (selectedLang === 'ABC') {
      var {abcState} = this.state;
      abcState = {
        ...abcState,
        stdoutStr
      };
      dispatch(ABCActions.runABCWhole(sourceCodeBuf, abcState));
    }

    else if (selectedLang === 'DeadSimple') {

      const {deadSimpleState} = this.state;
      dispatch(DeadSimpleActions.runDeadSimpleWhole(sourceCodeBuf, {
        ...deadSimpleState,
        stdoutStr
      }));
    }
    else if (selectedLang === "AlphaBeta") {
      const { alphabetaState } = this.state;
      dispatch(AlphabetaActions.runAlphabetaWhole(sourceCodeBuf, {
        ...alphabetaState,
        stdoutStr
      }));
    }
  }

  handleClickDebugBtn = () => {
    this.setState({
      showDebugger: true
    });
  }

  /* ------------------------------------------- DEBUGGER CONTROL --------------------- */
  handleCloseDebugger = () => {
    const { dispatch } = this.props;
    dispatch(UserInterfaceActions.resetAppState());
    this.setState({
      showDebugger: false
    });
  }


  render = () => {
    const {sourceCodeBuf, stdoutStr, brainfuckState, ioWait, canExecute, showDebugger, selectedLang, showErrorModal} = this.state;
   
    return (
      <div className="App">
        <Modal show={showErrorModal} onHide={this.hideErrorModal}>
          <Modal.Header closeButton>
            <Modal.Title>Error!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Alert variant="danger">There is a syntax error in the source code. Please check again.</Alert>
          </Modal.Body>
        </Modal>
        <Toolbar
          selectedLang={selectedLang}
          sourceCodeBuf={sourceCodeBuf}
          brainfuckState={brainfuckState}
          canExecute={canExecute}
          handleClickResetBtn={this.handleClickResetBtn}
          handleClickRunBtn={this.handleClickRunBtn}
          handleClickDebugBtn={this.handleClickDebugBtn}
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
        <div className="debugger_modal">
          <Modal show={showDebugger} onHide={this.handleCloseDebugger} size="lg">
            <Modal.Header closeButton>
              Brainfuck Debugger
            </Modal.Header>
            <Modal.Body>
                <Debugger
                    sourceCodeBuf={sourceCodeBuf}
                    brainfuckState={brainfuckState}
                    closeDebugger={this.handleCloseDebugger}
                />
            </Modal.Body>
          </Modal>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { brainfuckState, 
    cortlangState, 
    abcState, 
    deadSimpleState, 
    alphabetaState,
    ioWait,  
    consoleBufEndPtr,  
    stdoutStr, 
    isError, 
    canExecute, 
    selectedLang, 
    sourceCodeBuf 
  } = state.app;
  return {
    brainfuckState,
    cortlangState,
    abcState,
    deadSimpleState,
    alphabetaState,
    ioWait,
    consoleBufEndPtr,
    stdoutStr,
    isError,
    canExecute,
    selectedLang,
    sourceCodeBuf
  };
}

export default connect(mapStateToProps)(App);
