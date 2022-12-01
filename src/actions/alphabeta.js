import {
    runAlphaBeta
} from "../interpreter_engine/alphabeta"
import {
    E_COMPLETE
} from "../interpreter_engine/brainfuck_constants";
import {
    ALPHABETA_EXEC_COMPLETE
} from "./types";

export const runAlphabetaWhole = (sourceCodeBuf, alphabetaState) => (dispatch) => {
    const newAlphabetaState = runAlphaBeta(sourceCodeBuf, alphabetaState);
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
            }
    }

}