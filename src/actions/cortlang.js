import {
    E_COMPLETE,
    E_IO_PAUSE,
    E_SYNTAX_ERR
} from "../interpreter_engine/brainfuck_constants";
import CortlangInterpreter from '../interpreter_engine/cortlang';
import {
    CORTLANG_EXEC_COMPLETE,
    CORTLANG_EXEC_ERR,
    CORTLANG_EXEC_IO_PAUSE
} from "./types";

class CortlangActions {
    runCortlangWhole = (sourceCodeBuf, cortlangState) => (dispatch) => {
        const newCortlangState = CortlangInterpreter.runCortlang(sourceCodeBuf, cortlangState);
        const {
            execCode
        } = newCortlangState;
        switch (execCode) {
            case E_SYNTAX_ERR:
                dispatch({
                    type: CORTLANG_EXEC_ERR,
                    payload: {
                        cortlangState: newCortlangState
                    }
                });
                break;
            case E_IO_PAUSE:
                dispatch({
                    type: CORTLANG_EXEC_IO_PAUSE,
                    payload: {
                        cortlangState: newCortlangState
                    }
                });
                break;
            case E_COMPLETE:
                dispatch({
                    type: CORTLANG_EXEC_COMPLETE,
                    payload: {
                        cortlangState: newCortlangState
                    }
                });
                break;
            default:
                //idk TODO
        }
    }
}

export default new CortlangActions();