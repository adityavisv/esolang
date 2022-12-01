import {
    E_COMPLETE,
    E_IO_PAUSE,
    E_INCOMPLETE,
    E_SYNTAX_ERR
} from '../interpreter_engine/brainfuck_constants';
import BrainfuckService from '../services/brainfuck.service';
import {
    BRAINFUCK_EXEC_COMPLETE,
    BRAINFUCK_EXEC_ERR,
    BRAINFUCK_EXEC_INCOMPLETE,
    BRAINFUCK_EXEC_IO_PAUSE,
    BRAINFUCK_SET_INPUT_CHAR
} from './types';

export const runBrainfuckWhole = (sourceCodeBuf, brainfuckState) => (dispatch) => {
    const newBrainfuckState = BrainfuckService.executeSourceCodeBuf(sourceCodeBuf, brainfuckState);
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

export const runBrainfuckSingleInstr = (sourceCodeBuf, brainfuckState) => (dispatch) => {
    const newBrainfuckState = BrainfuckService.executeSingeInstr(sourceCodeBuf, brainfuckState);
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

export const runBrainfuckInputInstr = (userInputChar, sourceCodeBuf, brainfuckState) => (dispatch) => {
    const newBrainfuckState = BrainfuckService.executeInputInstr(userInputChar, brainfuckState);
    const finalBrainfuckState = BrainfuckService.executeSourceCodeBuf(sourceCodeBuf, newBrainfuckState);
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

export const brainfuckSetInputChar = () => (dispatch) => {
    dispatch({
        type: BRAINFUCK_SET_INPUT_CHAR,
        payload: {}
    });
}