import {
    E_IO_PAUSE,
    E_COMPLETE
} from "./brainfuck_constants";

class CortlangInterpreter {
    runCortlang = (sourceCodeBuf, cortlangState) => {
        var {
            instructionPtr,
            stdoutStr,
            execCode,
            cortlangStack
        } = cortlangState;

        const sourceCodeLines = sourceCodeBuf.split("\r\n");
        var nextCmdRepCount = 1;
        for (; instructionPtr < sourceCodeLines.length; instructionPtr++) {
            const line = sourceCodeLines[instructionPtr];

            if (line.startsWith('0')) {
                for (let i = 0; i < nextCmdRepCount; i++) {

                    const stackPushVal = parseInt(line.substring(1), 2);
                    cortlangStack.push(stackPushVal);
                }
                nextCmdRepCount = 1;
            } else if (line.startsWith('1')) {
                const command = line.substring(1);
                if (command === '0') {
                    // NOP
                } else if (command === '1') {
                    for (let i = 0; i < nextCmdRepCount; i++) {
                        cortlangStack.pop();
                    }
                    nextCmdRepCount = 1;
                } else if (command === '00') {
                    for (let i = 0; i < nextCmdRepCount; i++) {
                        var top = cortlangStack[cortlangStack.length - 1];
                        stdoutStr += String.fromCharCode(top);
                    }
                    nextCmdRepCount = 1;
                } else if (command === '01') {
                    for (let i = 0; i < nextCmdRepCount; i++) {
                        var top = cortlangStack[cortlangStack.length - 1];
                        var secondTop = cortlangStack[cortlangStack.length - 2];
                        top += secondTop;
                        cortlangStack.pop();
                        cortlangStack.push(top);
                    }
                    nextCmdRepCount = 1;
                } else if (command === '10') {
                    for (let i = 0; i < nextCmdRepCount; i++) {
                        var top = cortlangStack[cortlangStack.length - 1];
                        var secondTop = cortlangStack[cortlangStack.length - 2];
                        top -= secondTop;
                        cortlangStack.pop();
                        cortlangStack.push(top);
                    }
                    nextCmdRepCount = 1;
                } else if (command === '11') {
                    for (let i = 0; i < nextCmdRepCount; i++) {
                        var top = cortlangStack[cortlangStack.length - 1];
                        var secondTop = cortlangStack[cortlangStack.length - 2];
                        top *= secondTop;
                        cortlangStack.pop();
                        cortlangStack.push(top);
                    }
                    nextCmdRepCount = 1;
                } else if (command === '000') {
                    for (let i = 0; i < nextCmdRepCount; i++) {
                        var top = cortlangStack[cortlangStack.length - 1];
                        var secondTop = cortlangStack[cortlangStack.length - 2];
                        top /= secondTop;
                        cortlangStack.pop();
                        cortlangStack.push(top);
                    }
                    nextCmdRepCount = 1;
                } else if (command === '0001') {
                    execCode = E_IO_PAUSE;
                    return {
                        stdoutStr,
                        instructionPtr,
                        cortlangStack,
                        execCode,
                        sourceCodeBuf
                    }
                } else if (command.startsWith('010')) {
                    for (let i = 0; i < nextCmdRepCount; i++) {
                        const jumpCount = parseInt(command.substring(3), 2);
                        instructionPtr += jumpCount;
                    }
                    nextCmdRepCount = 1;
                } else {
                    nextCmdRepCount = parseInt(command, 2);
                }
            }
        }
        execCode = E_COMPLETE;
        return {
            stdoutStr,
            execCode,
            instructionPtr,
            cortlangStack,
        };
    }
}

export default new CortlangInterpreter();