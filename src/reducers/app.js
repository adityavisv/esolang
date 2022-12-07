/* eslint-disable default-case */
/* eslint-disable import/no-anonymous-default-export */
import {
    ABC_EXEC_COMPLETE,
    ALPHABETA_EXEC_COMPLETE,
    ALPHABETA_IO_PAUSE,
    ALPHABETA_SET_INPUT_CHAR,
    ALPHABETA_SET_INPUT_CHAR_J,
    ALPHABETA_SET_INPUT_CHAR_K,
    BRAINFUCK_EXEC_COMPLETE,
    BRAINFUCK_EXEC_ERR,
    BRAINFUCK_EXEC_IO_PAUSE,
    BRAINFUCK_SET_INPUT_CHAR,
    CORTLANG_EXEC_COMPLETE,
    CORTLANG_EXEC_ERR,
    CORTLANG_EXEC_IO_PAUSE,
    DEADSIMPLE_EXEC_COMPLETE,
    RESET_APP_STATE,
    SELECTED_LANG_SET,
    SOURCE_CODE_BUF_UPDATE,
    STDOUT_UPDATE
} from "../actions/types";

import {
    E_COMPLETE,
    E_SYNTAX_ERR,
    E_IO_PAUSE,
    E_INCOMPLETE
} from "../interpreter_engine/brainfuck_constants";
import BrainfuckInterpreter from '../interpreter_engine/brainfuck';
import AlphabetaInterpreter from '../interpreter_engine/alphabeta';
import { E_IO_PAUSE_J, E_IO_PAUSE_K } from "../interpreter_engine/alphabeta_constants";

const initialState = {
    brainfuckState: {
        brainfuckTape: new Array(8192).fill(0),
        brainfuckTapePtr: 0,
        instructionPtr: 0,
        execCode: E_COMPLETE,
        userInputChar: ''
    },
    cortlangState: {
        cortlangStack: [],
        instructionPtr: 0,
        execCode: E_COMPLETE
    },
    abcState: {
        instructionPtr: 0,
        execCode: E_COMPLETE,
        stringMode: false,
        acc: 0
    },
    deadSimpleState: {
        instructionPtr: 0,
        acc: 0
    },
    alphabetaState: {
        instructionPtr: 0,
        regOne: 0,
        regTwo: 0,
        resultReg: 0,
        memoryReg: 0,
        positionReg: 0,
        memoryArray: new Array(1024).fill(0),
        memoryMode: true
    },
    ioWait: false,
    consoleBufEndPtr: 2,
    stdoutStr: '> ',
    isError: false,
    canExecute: false,
    selectedLang: 'Brainfuck',
    sourceCodeBuf: ''
}

export default function(state = initialState, action) {
    const {
        type,
        payload
    } = action;

    switch (type) {
        case BRAINFUCK_EXEC_IO_PAUSE:
            {
                const {
                    brainfuckState: {
                        instructionPtr,
                        brainfuckTape,
                        brainfuckTapePtr,
                        execCode,
                        stdoutStr
                    }
                } = payload;
                return {
                    ...state,
                    brainfuckState: {
                        instructionPtr,
                        brainfuckTape,
                        brainfuckTapePtr,
                        execCode
                    },
                    ioWait: true,
                    stdoutStr,
                    isError: false
                };
            }
        case BRAINFUCK_EXEC_ERR:
            {
                const {
                    brainfuckState: {
                        instructionPtr,
                        brainfuckTape,
                        brainfuckTapePtr,
                        execCode,
                        stdoutStr
                    }
                } = payload;
                return {
                    ...state,
                    brainfuckState: {
                        instructionPtr,
                        brainfuckTape,
                        brainfuckTapePtr,
                        execCode
                    },
                    ioWait: false,
                    stdoutStr,
                    isError: true
                };
            }
        case BRAINFUCK_EXEC_COMPLETE:
            {
                const {
                    brainfuckState: {
                        instructionPtr,
                        brainfuckTape,
                        brainfuckTapePtr,
                        execCode,
                        stdoutStr
                    }
                } = payload;
                return {
                    ...state,
                    brainfuckState: {
                        instructionPtr,
                        brainfuckTape,
                        brainfuckTapePtr,
                        execCode
                    },
                    ioWait: false,
                    stdoutStr,
                    isError: false
                }
            }
        case BRAINFUCK_SET_INPUT_CHAR:
            {
                const {
                    consoleBufEndPtr: consoleEndPtr,
                    stdoutStr: stdoutStrPre,
                    brainfuckState: bfState,
                    sourceCodeBuf
                } = state;
                const userInputChar = stdoutStrPre.substr(consoleEndPtr);
                const brainfuckState = {
                    ...bfState,
                    stdoutStr: stdoutStrPre
                };
                const postInputBFState = BrainfuckInterpreter.runInputInstruction(userInputChar, brainfuckState);
                const finalBFState = BrainfuckInterpreter.runBrainfuck(sourceCodeBuf, postInputBFState);

                const {
                    instructionPtr,
                    brainfuckTape,
                    brainfuckTapePtr,
                    execCode,
                    stdoutStr
                } = finalBFState;

                switch (execCode) {
                    case E_IO_PAUSE:
                        return {
                            ...state,
                            brainfuckState: {
                                instructionPtr,
                                brainfuckTape,
                                brainfuckTapePtr,
                                execCode
                            },
                            ioWait: true,
                            isError: false,
                            stdoutStr,
                            consoleBufEndPtr: consoleEndPtr + 1
                        };
                    case E_COMPLETE:
                    case E_INCOMPLETE:
                        return {
                            ...state,
                            brainfuckState: {
                                instructionPtr,
                                brainfuckTape,
                                brainfuckTapePtr,
                                execCode
                            },
                            ioWait: false,
                            isError: false,
                            stdoutStr,
                            consoleBufEndPtr: consoleEndPtr + 1
                        };
                    case E_SYNTAX_ERR:
                        return {
                            ...state,
                            brainfuckState: {
                                instructionPtr,
                                brainfuckTape,
                                brainfuckTapePtr,
                                execCode
                            },
                            ioWait: false,
                            isError: true,
                            stdoutStr,
                            consoleBufEndPtr: consoleEndPtr + 1
                        };
                    default:
                        return state;
                }
            }
        case ABC_EXEC_COMPLETE:
            {
                const {
                    abcState: {
                        instructionPtr,
                        stdoutStr,
                        stringMode,
                        acc,
                        execCode
                    }
                } = payload;
                return {
                    ...state,
                    ioWait: false,
                    stdoutStr,
                    isError: false,
                    abcState: {
                        instructionPtr,
                        acc,
                        execCode,
                        stringMode
                    }
                };
            }
        case DEADSIMPLE_EXEC_COMPLETE:
            {
                const {
                    deadSimpleState: {
                        instructionPtr,
                        stdoutStr,
                        execCode,
                        acc
                    }
                } = payload;
                return {
                    ...state,
                    ioWait: false,
                    stdoutStr,
                    isError: false,
                    deadSimpleState: {
                        instructionPtr,
                        acc,
                        execCode
                    }
                };
            }
        case CORTLANG_EXEC_IO_PAUSE:
            {
                const {
                    cortlangState: {
                        cortlangStack,
                        instructionPtr,
                        stdoutStr,
                        execCode
                    }
                } = payload;
                return {
                    ...state,
                    ioWait: true,
                    stdoutStr,
                    isError: false,
                    cortlangState: {
                        instructionPtr,
                        cortlangStack,
                        execCode
                    }
                };
            }
        case CORTLANG_EXEC_ERR:
            {
                const {
                    cortlangState: {
                        cortlangStack,
                        instructionPtr,
                        stdoutStr,
                        execCode
                    }
                } = payload;
                return {
                    ...state,
                    ioWait: false,
                    stdoutStr,
                    isError: true,
                    cortlangState: {
                        instructionPtr,
                        cortlangStack,
                        execCode
                    }
                };
            }
        case CORTLANG_EXEC_COMPLETE:
            {
                const {
                    cortlangState: {
                        cortlangStack,
                        instructionPtr,
                        stdoutStr,
                        execCode
                    }
                } = payload;
                return {
                    ...state,
                    ioWait: false,
                    stdoutStr,
                    isError: false,
                    cortlangState: {
                        instructionPtr,
                        cortlangStack,
                        execCode
                    }
                };
            }
        case ALPHABETA_EXEC_COMPLETE:
            {
                const {
                    alphabetaState: {
                        instructionPtr,
                        regOne,
                        regTwo,
                        resultReg,
                        memoryReg,
                        positionReg,
                        memoryArray,
                        stdoutStr,
                        memoryMode,
                        execCode
                    }
                } = payload;
                return {
                    ...state,
                    ioWait: false,
                    stdoutStr,
                    isError: false,
                    alphabetaState: {
                        instructionPtr,
                        regOne,
                        regTwo,
                        resultReg,
                        memoryReg,
                        positionReg,
                        memoryArray,
                        memoryMode,
                        execCode
                    }
                };
            }
        case ALPHABETA_IO_PAUSE: {
            const {
                alphabetaState: {
                    instructionPtr,
                    regOne,
                    regTwo,
                    resultReg,
                    memoryReg,
                    positionReg,
                    memoryArray,
                    stdoutStr,
                    memoryMode,
                    execCode
                }
            } = payload;
            return {
                ...state,
                ioWait: true,
                stdoutStr,
                isError: false,
                alphabetaState: {
                    instructionPtr,
                    regOne,
                    regTwo,
                    resultReg,
                    memoryReg,
                    positionReg,
                    memoryArray,
                    memoryMode,
                    execCode
                }
            };
        }
        case ALPHABETA_SET_INPUT_CHAR:
            {
                const {
                    consoleBufEndPtr: consoleEndPtr,
                    stdoutStr: stdoutStrPre,
                    alphabetaState: abState,
                    sourceCodeBuf
                } = state;
                const userInputChar = stdoutStrPre.substr(consoleEndPtr);
                const alphabetaState = {
                    ...abState,
                    stdoutStr: stdoutStrPre
                };
                const postInputAlphabetaState = AlphabetaInterpreter.runInputInstruction(userInputChar, alphabetaState);
                const finalAlphabetaState = AlphabetaInterpreter.runAlphaBeta(sourceCodeBuf, postInputAlphabetaState);
                const {
                    instructionPtr,
                    regOne,
                    regTwo,
                    resultReg,
                    memoryReg,
                    positionReg,
                    memoryArray,
                    memoryMode,
                    execCode,
                    stdoutStr
                } = finalAlphabetaState;
                switch(execCode) {
                    case E_COMPLETE: {
                        return {
                            ...state,
                            stdoutStr,
                            ioWait: false,
                            isError: false,
                            consoleBufEndPtr: consoleEndPtr + 1,
                            alphabetaState: {
                                regOne, 
                                regTwo,
                                resultReg,
                                positionReg,
                                instructionPtr,
                                memoryArray,
                                memoryReg,
                                memoryMode,
                                execCode
                            }
                        }
                    }
                    case E_IO_PAUSE_J:
                    case E_IO_PAUSE_K: {
                        return {
                            ...state,
                            stdoutStr,
                            ioWait: true,
                            isError: false,
                            consoleBufEndPtr: consoleEndPtr + 1,
                            alphabetaState: {
                                regOne, 
                                regTwo,
                                resultReg,
                                positionReg,
                                instructionPtr,
                                memoryArray,
                                memoryReg,
                                memoryMode,
                                execCode
                            }
                        }
                    }
                }
                break;
            }
        case STDOUT_UPDATE:
            {
                const {
                    stdoutStr
                } = payload;
                return {
                    ...state,
                    stdoutStr
                };
            }

        case SOURCE_CODE_BUF_UPDATE:
            {
                const {
                    sourceCodeBuf
                } = payload;
                return {
                    ...state,
                    sourceCodeBuf,
                    canExecute: sourceCodeBuf !== ''
                };
            };
        case RESET_APP_STATE:
            {
                return {
                    ...initialState
                };
            }
        case SELECTED_LANG_SET:
            {
                const {
                    selectedLang
                } = payload;
                return {
                    ...state,
                    selectedLang
                };
            }
        default:
            return state;

    }
}