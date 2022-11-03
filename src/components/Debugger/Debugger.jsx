import React from 'react';
import { Form, Container, Button } from 'react-bootstrap';
import { runSingleInstructionBrainfuck } from '../../interpreter_engine/brainfuck';
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

    render = () => {
        const { sourceCodeBufSplit, brainfuckState: {brainfuckTape} } = this.state;
        return (
            <div>
                <Button onClick={this.handleClickStepOver}>Step Over</Button>
                <div className="debugger_box">
                <div className="instruction_box">
                    {this.renderInstructionWithDecoration()}
                </div>
                <div className="tape_box">
                    {this.renderLiveBFTape()}
                </div>
                </div>
                
            </div>
        )
    }
}

export default Debugger;