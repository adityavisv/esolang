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
    BRAINFUCK_EXEC_IO_PAUSE
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
                    brianfuckState: newBrainfuckState
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