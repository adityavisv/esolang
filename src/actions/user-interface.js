import {
    CONSOLE_BUF_END_PTR_UPDATE,
    RESET_APP_STATE,
    SELECTED_LANG_SET,
    SOURCE_CODE_BUF_UPDATE,
    STDOUT_UPDATE
} from "./types"

export const updateStdout = (stdoutStr) => (dispatch) => {
    dispatch({
        type: STDOUT_UPDATE,
        payload: {
            stdoutStr
        }
    });
}

export const updateSourceCodeBuf = (sourceCodeBuf) => (dispatch) => {
    dispatch({
        type: SOURCE_CODE_BUF_UPDATE,
        payload: {
            sourceCodeBuf
        }
    });
}

export const resetAppState = () => (dispatch) => {
    dispatch({
        type: RESET_APP_STATE,
        payload: {}
    });
}

export const updateSelectedLang = (selectedLang) => (dispatch) => {
    dispatch({
        type: SELECTED_LANG_SET,
        payload: {
            selectedLang
        }
    });
}