import ABCInterpreter from "../interpreter_engine/abc"
import {
    E_COMPLETE
} from "../interpreter_engine/brainfuck_constants";
import {
    ABC_EXEC_COMPLETE
} from "./types";

class ABCActions {
    runABCWhole = (sourceCodeBuf, abcState) => (dispatch) => {
        const newAbcState = ABCInterpreter.runABC(sourceCodeBuf, abcState);
        const {
            execCode
        } = newAbcState;
        switch (execCode) {
            case E_COMPLETE:
                dispatch({
                    type: ABC_EXEC_COMPLETE,
                    payload: {
                        abcState: newAbcState
                    }
                });
                break;
            default:
                // idk todo
        }
    }
}

export default new ABCActions();