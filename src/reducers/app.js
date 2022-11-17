/* eslint-disable import/no-anonymous-default-export */
import {
    ABC_EXEC_COMPLETE,
    BRAINFUCK_EXEC_COMPLETE,
    BRAINFUCK_EXEC_ERR,
    BRAINFUCK_EXEC_IO_PAUSE,
    DEADSIMPLE_EXEC_COMPLETE
} from "../actions/types";

const {
    E_COMPLETE
} = require("../interpreter_engine/brainfuck_constants");

const initialState = {
    brainfuckState: {
        brainfuckTape: new Array(8192).fill(0),
        brainfuckTapePtr: 0,
        instructionPtr: 0,
        execCode: E_COMPLETE
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
    ioWait: false,
    consoleBufEndPtr: 2,
    stdoutStr: '> ',
    isError: false
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
        default:
            return state;

    }
}