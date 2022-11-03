import { E_COMPLETE } from "./brainfuck_constants";

export const runDeadSimple = (sourceCodeBuf, deadSimpleState) => {
    var { acc, instructionPtr, stdoutStr } = deadSimpleState;
    for (; instructionPtr < sourceCodeBuf.length; instructionPtr++) {
        const instructionChar = sourceCodeBuf.charAt(instructionPtr);
        if (instructionChar === '_')
            acc = 0;
        else if (instructionChar === '+')
            acc++;
        else if (instructionChar === '-')
            acc--;
        else if (instructionChar === 'S')
            stdoutStr += String.fromCharCode(acc);
    }
    return {
        execCode: E_COMPLETE,
        stdoutStr,
        instructionPtr,
        acc
    };
}