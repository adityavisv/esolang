/* eslint-disable default-case */
import AlphabetaInterpreter from '../interpreter_engine/alphabeta';
import { E_IO_PAUSE_J, E_IO_PAUSE_K } from '../interpreter_engine/alphabeta_constants';
import {
    E_COMPLETE
} from "../interpreter_engine/brainfuck_constants";
import {
    ALPHABETA_EXEC_COMPLETE, ALPHABETA_IO_PAUSE, ALPHABETA_SET_INPUT_CHAR, ALPHABETA_SET_INPUT_CHAR_J, ALPHABETA_SET_INPUT_CHAR_K
} from "./types";

class AlphabetaActions {
    runAlphabetaWhole = (sourceCodeBuf, alphabetaState) => (dispatch) => {
        const newAlphabetaState = AlphabetaInterpreter.runAlphaBeta(sourceCodeBuf, alphabetaState);
        const {
            execCode
        } = newAlphabetaState;
        switch (execCode) {
            case E_COMPLETE:
                {
                    dispatch({
                        type: ALPHABETA_EXEC_COMPLETE,
                        payload: {
                            alphabetaState: newAlphabetaState
                        }
                    });
                    break;
                }
            case E_IO_PAUSE_J:
            case E_IO_PAUSE_K:
                {
                    dispatch({
                        type: ALPHABETA_IO_PAUSE,
                        payload: {
                            alphabetaState: newAlphabetaState
                        }
                    });
                    break;
                }
        }
    }

    setInputChar = () => (dispatch) => {
        dispatch({
            type: ALPHABETA_SET_INPUT_CHAR,
            payload: {}
        });
    }
}

export default new AlphabetaActions();