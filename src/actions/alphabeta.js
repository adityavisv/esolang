import AlphabetaInterpreter from '../interpreter_engine/alphabeta';
import {
    E_COMPLETE
} from "../interpreter_engine/brainfuck_constants";
import {
    ALPHABETA_EXEC_COMPLETE
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
                }
        }

    }
}

export default new AlphabetaActions();