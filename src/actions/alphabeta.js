import { runAlphaBeta } from "../interpreter_engine/alphabeta"

export const runAlphabetaWhole = (sourceCodeBuf, alphabetaState) = > (dispatch) => {
    const newAlphabetaState = runAlphaBeta(sourceCodeBuf, alphabetaState);
    
}