import { E_COMPLETE } from "../interpreter_engine/brainfuck_constants";
import { runDeadSimple } from "../interpreter_engine/deadsimple"
import { DEADSIMPLE_EXEC_COMPLETE } from "./types";

export const runDeadSimpleWhole = (sourceCodeBuf, deadSimpleState) => (dispatch) => {
    const newDeadSimpleState = runDeadSimple(sourceCodeBuf, deadSimpleState);
    const { execCode } = newDeadSimpleState;
    switch(execCode) {
        case E_COMPLETE: {
            dispatch({
                type: DEADSIMPLE_EXEC_COMPLETE,
                payload: {
                    deadSimpleState: newDeadSimpleState
                }
            });
            break;
        }
        default:
            // idk todp
    }

}