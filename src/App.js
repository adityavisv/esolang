import './App.css';
import React from 'react';
import { brainfuckRun, runInputInstruction } from './interpreter_engine/brainfuck';
import { E_COMPLETE, E_IO_PAUSE, E_SYNTAX_ERR } from './interpreter_engine/brainfuck_constants';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {XTerm} from 'xterm-for-react';
import {dark} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Editor from '@monaco-editor/react';
import { Navbar, Nav, Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

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
    this.xtermRef = React.createRef();
    this.editorRef = React.createRef();
  }

  componentDidMount() {
    this.xtermRef.current.terminal.writeln('test');
  }

  handleEditorChange = (value, event) => {
    var {brainfuckState} = this.state;
    brainfuckState = {
      ...brainfuckState,
      sourceCodeBuf: value
    };
    this.setState({
      sourceCoodeBuf: value,
      brainfuckState
    });
  }

  onConsoleInput = (event) => {
    const consoleInputText = event.target.value;

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

  handleConsoleKeyChange = (event) => {
    const consoleInputText = event.key;
    var {brainfuckState} = this.state;
    brainfuckState = {
      ...brainfuckState,
      stdoutStr: consoleInputText
    };

    this.setState({
      consoleOutput: consoleInputText,
      brainfuckState
    });
    this.xtermRef.current.terminal.writeln(consoleInputText);
  }

  handleConsoleData = (data) => {
    var {brainfuckState} = this.state;
    brainfuckState = {
      ...brainfuckState,
      stcoutStr: data
    };

    this.setState({
      consoleOutput: data,
      brainfuckState
    });
    this.xtermRef.current.terminal.writeln(data);
  }

  handleLineFeed = () => {
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
        brainfuckState: newBFState,
        consoleBufEndPtr: newBFState.stdoutStr.length
      });
    }
    else {
      this.setState({
        consoleOutput: newBFState.stdoutStr,
        ioWait: false,
        brainfuckState: newBFState,
        consoleBufEndPtr: newBFState.stdoutStr.length
      });
    }
  }

  handleEditorMount = (editor, monaco) => {
      this.editorRef.current = editor;
  }

  render = () => {
    const {sourceCodeBuf, consoleOutput, ioWait} = this.state;
    return (
      <div className="App">
        <textarea value={consoleOutput} onChange={this.onConsoleInput} onKeyDown={this.onConsoleKeyPressListener} readOnly={! ioWait} />
        <Navbar bg="dark" variant="dark">
          <Container>
              <Navbar.Brand>Esolang Runner</Navbar.Brand>
              <Navbar.Toggle/>
              <Nav className="mne-auto">
               
              </Nav>
              <Navbar.Collapse className="justify-content-end">
                <Form className="d-flex">
                  <Form.Select size="sm">
                    <option>Brainfuck</option>
                  </Form.Select>
                  <div className="run_btn">
                    <Button variant="secondary" onClick={this.onClickButton}>Run</Button>
                  </div>
                </Form>
              </Navbar.Collapse>
            </Container>
        </Navbar>
        <div className="ide_box">
          <div className="editorDiv">
            <Editor
              height="74vh"
              defaultValue="# type in your code here"
              onMount={this.handleEditorMount}
              theme="vs-dark"
              onChange={this.handleEditorChange}
              value={sourceCodeBuf}
              />
          </div>
          <div className="consoleDiv">
            
            <XTerm
              ref={this.xtermRef}
              onKey={this.onConsoleKeyPressListener}
              onData={(data) => this.handleConsoleData(data)}
              options={{
                disableStdin: false,
                rows: 25
              }}
              onLineFeed={this.handleLineFeed}
              onKey={this.handleConsoleKeyChange}
            />
          </div>
        </div>
        
        
        {/* <XTerm ref={this.xtermRef} onKey={this.onConsoleKeyPressListener} /> */}
      </div>
    );
  }
}

export default App;
