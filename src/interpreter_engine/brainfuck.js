import { E_COMPLETE, E_IO_PAUSE, E_SYNTAX_ERR } from "./brainfuck_constants";

const checkParentheses = (source_code_buf) => {
    var bracketCount = 0;

    [...source_code_buf].forEach((c) => {
        if (c === '[')
            bracketCount++;
        else if (c === ']')
            bracketCount--;
    });
    return bracketCount === 0;
}

export const runInputInstruction = (brainfuckState, inputCharacter) => {
    var {brainfuckTape, brainfuckTapePtr, instructionPtr} = brainfuckState;
    brainfuckTape[brainfuckTapePtr] = inputCharacter.charCodeAt(0);
    instructionPtr++;
    brainfuckState = {
        ...brainfuckState,
        brainfuckTape,
        brainfuckTapePtr,
        instructionPtr
    };
    return brainfuckState;
}

export const brainfuckRun = (brainfuckState) => {
    const {sourceCodeBuf} = brainfuckState;
    var {brainfuckTape, brainfuckTapePtr, instructionPtr, stdoutStr, execCode} = brainfuckState;

    // run checks for parentheses
    if ( ! checkParentheses(sourceCodeBuf) ) {
        execCode = E_SYNTAX_ERR;
        return {
            ...brainfuckState,
            execCode
        }
    }

    for (; instructionPtr < sourceCodeBuf.length; instructionPtr++) {
        var instructionChar = sourceCodeBuf.charAt(instructionPtr);
        if (instructionChar === '+') {
            brainfuckTape[brainfuckTapePtr]++;
        }
        else if (instructionChar === '-') {
            brainfuckTape[brainfuckTapePtr]--;
        }
        else if (instructionChar === '>')
            brainfuckTapePtr++;
        else if (instructionChar === '<')
            brainfuckTapePtr--;
        else if (instructionChar === '.')
            stdoutStr += String.fromCharCode(brainfuckTape[brainfuckTapePtr]);
        else if (instructionChar === ',') {
            execCode = E_IO_PAUSE;
            return {
                stdoutStr,
                instructionPtr,
                brainfuckTape,
                brainfuckTapePtr,
                sourceCodeBuf,
                execCode
            };
        }
        else if (instructionChar === '[') {
            if( ! brainfuckTape[brainfuckTapePtr]) {
                var bc = 1;
                while (bc > 0)
                {
                    instructionChar = brainfuckState.sourceCodeBuf.charAt(++brainfuckState.instructionPtr);
                    if (instructionChar === ']')
                        --bc;
                    else if (instructionChar === '[')
                        ++bc;
                }
            }
        }
        else if (instructionChar === ']') {
            if (brainfuckTape[brainfuckTapePtr]) {
                var bc = 1;
                while (bc > 0)
                {
                    instructionChar = sourceCodeBuf.charAt(--instructionPtr)
                    if (instructionChar === '[')
                        --bc;
                    else if (instructionChar === ']')
                        ++bc;
                }
            }
        }
    }
    execCode = E_COMPLETE;
    return {
        stdoutStr,
        execCode,
        instructionPtr,
        sourceCodeBuf,
        brainfuckTape,
        brainfuckTapePtr
    };
}