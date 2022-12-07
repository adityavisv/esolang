/* eslint-disable default-case */
import {
    E_COMPLETE,
    E_IO_PAUSE,
    E_INCOMPLETE,
    E_SYNTAX_ERR
} from '../interpreter_engine/brainfuck_constants';
import BrainfuckInterpreter from '../interpreter_engine/brainfuck';
import {
    BRAINFUCK_EXEC_COMPLETE,
    BRAINFUCK_EXEC_ERR,
    BRAINFUCK_EXEC_INCOMPLETE,
    BRAINFUCK_EXEC_IO_PAUSE,
    BRAINFUCK_SET_INPUT_CHAR
} from './types';

class BrainfuckActions {
    runWhole = (sourceCodeBuf, brainfuckState) => (dispatch) => {
        const newBrainfuckState = BrainfuckInterpreter.runBrainfuck(sourceCodeBuf, brainfuckState);
        const {
            execCode
        } = newBrainfuckState;
        switch (execCode) {
            case E_SYNTAX_ERR:
                dispatch({
                    type: BRAINFUCK_EXEC_ERR,
                    payload: {
                        brainfuckState: newBrainfuckState
                    }
                });
                break;
            case E_IO_PAUSE:
                dispatch({
                    type: BRAINFUCK_EXEC_IO_PAUSE,
                    payload: {
                        brainfuckState: newBrainfuckState
                    }
                });
                break;
            case E_COMPLETE:
                dispatch({
                    type: BRAINFUCK_EXEC_COMPLETE,
                    payload: {
                        brainfuckState: newBrainfuckState
                    }
                });
                break;
            default:
                // TODO idk
        }
    }

    runSingleInstr = (sourceCodeBuf, brainfuckState) => (dispatch) => {
        const newBrainfuckState = BrainfuckInterpreter.runSingleInstructionBrainfuck(sourceCodeBuf, brainfuckState);
        const {
            execCode
        } = newBrainfuckState;
        switch (execCode) {
            case E_COMPLETE:
                dispatch({
                    type: BRAINFUCK_EXEC_COMPLETE,
                    payload: {
                        brainfuckState: newBrainfuckState
                    }
                });
                break;
            case E_INCOMPLETE:
                dispatch({
                    type: BRAINFUCK_EXEC_INCOMPLETE,
                    payload: {
                        brainfuckState: newBrainfuckState
                    }
                });
                break;
        }
    }

    runInputInstr = (userInputChar, sourceCodeBuf, brainfuckState) => (dispatch) => {
        const newBrainfuckState = BrainfuckInterpreter.runInputInstruction(userInputChar, brainfuckState);
        const finalBrainfuckState = BrainfuckInterpreter.runBrainfuck(sourceCodeBuf, newBrainfuckState);
        const {
            execCode
        } = finalBrainfuckState;
        switch (execCode) {
            case E_IO_PAUSE:
                dispatch({
                    type: BRAINFUCK_EXEC_IO_PAUSE,
                    payload: {
                        brainfuckState: finalBrainfuckState
                    }
                });
                break;
            case E_COMPLETE:
                dispatch({
                    type: BRAINFUCK_EXEC_COMPLETE,
                    payload: {
                        brainfuckState: finalBrainfuckState
                    }
                });
                break;
            case E_INCOMPLETE:
                dispatch({
                    type: BRAINFUCK_EXEC_INCOMPLETE,
                    payload: {
                        brainfuckState: finalBrainfuckState
                    }
                });
                break;
            case E_SYNTAX_ERR:
                dispatch({
                    type: BRAINFUCK_EXEC_ERR,
                    payload: {
                        brainfuckState: finalBrainfuckState
                    }
                });
                break;
            default:
                // idk
        }

    }


    setInputChar = () => (dispatch) => {
        dispatch({
            type: BRAINFUCK_SET_INPUT_CHAR,
            payload: {}
        });
    }
}

export default new BrainfuckActions();