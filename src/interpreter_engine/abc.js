import { E_COMPLETE } from "./brainfuck_constants";

export const runABC = (sourceCodeBuf, abcState) => {
    var {acc, stdoutStr, instructionPtr, stringMode} = abcState;
    for (; instructionPtr < sourceCodeBuf.length; instructionPtr++) {
        const instructionChar = sourceCodeBuf.charAt(instructionPtr);
        if (instructionChar === 'a') {
            ++acc;
        }
        else if (instructionChar === 'b') {
            --acc;
        }
        else if (instructionChar === 'c') {
            if (stringMode)
                stdoutStr += String.fromCharCode(acc);
            else
                stdoutStr += `${acc}`;
        }
        else if (instructionChar === 'd') {
            acc *= -1;
        }
        else if (instructionChar === 'r') {
            acc = Math.floor(Math.random() * (acc + 1));
        }
        else if (instructionChar === 'n') {
            acc = 0;
        }
        else if (instructionChar === '$') {
            stringMode = !stringMode;
        }
        else if (instructionChar === 'l') {
            instructionPtr = -1;
        }
        else if (instructionChar === ';') {
            stdoutStr += `${acc} ${String.fromCharCode(acc)}`;
        }
    }
    return {
        execCode: E_COMPLETE,
        instructionPtr,
        acc,
        stringMode,
        stdoutStr
    }
}