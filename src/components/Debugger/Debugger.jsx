import { faArrowAltCircleDown, faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import {  Button } from 'react-bootstrap';
import { runBrainfuck, runSingleInstructionBrainfuck } from '../../interpreter_engine/brainfuck';
import './debugger.css';

class Debugger extends React.Component {

    constructor(props) {
        super(props);
        const { sourceCodeBuf, 
            brainfuckState
        } = this.props;

        const sourceCodeLineByLineSplit = sourceCodeBuf.replace(/ /g, '').split("");

        this.state = {
            sourceCodeBuf,
            brainfuckState,
            sourceCodeBufSplit: sourceCodeLineByLineSplit,
        };
    }

    renderInstructionWithDecoration = () => {
        const { sourceCodeBufSplit, brainfuckState: { instructionPtr} } = this.state;
        const instructionLines = Array.from(sourceCodeBufSplit).map((instruction, index) => (
            <>

            <span className={instructionPtr === index ? "current_instruction" : "instruction"}>{instruction}</span>
            <br/>
            </>
        ));
        return (
            <>
                {instructionLines}
            </>
        );
    }

    renderPointerArrow = (brainfuckTapePtr, tapeIndex) => {
        return (
            <>
                {brainfuckTapePtr === tapeIndex}
            </>
        );
    }

    renderLiveBFTape = () => {
        const { brainfuckState: { brainfuckTape, brainfuckTapePtr } } = this.state;
        const bfTapeElement = Array.from(brainfuckTape).map((cell, index) => (
            <>
                <span>{brainfuckTapePtr === index ? '->' : ''} {cell},</span>
                <br/>
            </>
        ));
        return (
            <>
                [ <br/>
                    {bfTapeElement}
                ]
            </>
        );
    }

    handleClickStepOver = () => {
        const { brainfuckState, sourceCodeBufSplit } = this.state;
        const { sourceCodeBuf } = this.props;
        const newBrainfuckState = runSingleInstructionBrainfuck(sourceCodeBuf, brainfuckState);
        this.setState({
            brainfuckState: {
                ...newBrainfuckState
            }
        });
    }

    handleClickExecute = () => {
        const { brainfuckState, sourceCodeBufSplit } = this.state;
        const { sourceCodeBuf } = this.props;
        const newBrainfuckState = runBrainfuck(sourceCodeBuf, brainfuckState);
        this.setState({
            brainfuckState: {
                ...newBrainfuckState
            }
        });
    }

    render = () => {
        const { sourceCodeBufSplit, brainfuckState: {brainfuckTape} } = this.state;
        return (
            <div>
                <div>
                   
                    <Button variant="primary" onClick={this.handleClickStepOver}><FontAwesomeIcon icon={faArrowAltCircleDown} fixedWidth />  Step Over</Button>
                    <span id="executeBtn">
                        <Button variant="primary" onClick={this.handleClickExecute}>
                            
                            <FontAwesomeIcon icon={faPlay} fixedWidth /> Execute</Button>
                    </span>
                    <span id="stopBtn">
                        <Button variant="primary" onClick={this.props.closeDebugger}>
                            <FontAwesomeIcon icon={faStop} fixedWidth /> Stop
                        </Button>
                    </span>
                    
                    
                </div>
                <div className="debug_data_box">
                    <div className="debugger_box">
                        <div className="instruction_box">
                            {this.renderInstructionWithDecoration()}
                        </div>
                        <div className="tape_box">
                            {this.renderLiveBFTape()}
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Debugger;