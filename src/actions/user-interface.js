import {
    RESET_APP_STATE,
    SELECTED_LANG_SET,
    SOURCE_CODE_BUF_UPDATE,
    STDOUT_UPDATE
} from "./types"

class UserInterfaceActions {
    updateStdout = (stdoutStr) => (dispatch) => {
        dispatch({
            type: STDOUT_UPDATE,
            payload: {
                stdoutStr
            }
        });
    }

    updateSourceCodeBuf = (sourceCodeBuf) => (dispatch) => {
        dispatch({
            type: SOURCE_CODE_BUF_UPDATE,
            payload: {
                sourceCodeBuf
            }
        });
    }

    resetAppState = () => (dispatch) => {
        dispatch({
            type: RESET_APP_STATE,
            payload: {}
        });
    }

    updateSelectedLang = (selectedLang) => (dispatch) => {
        dispatch({
            type: SELECTED_LANG_SET,
            payload: {
                selectedLang
            }
        });
    }
}

export default new UserInterfaceActions();