import { E_IO_PAUSE, E_COMPLETE } from "./brainfuck_constants";

export const runCortlang = (cortlangState) => {
    var {sourceCodeBuf, instructionPtr, stdoutStr, execCode, cortlangStack} = cortlangState;

    const sourceCodeLines = sourceCodeBuf.split ("\r\n");

   for (; instructionPtr < sourceCodeLines.length; instructionPtr++) {
       const line = sourceCodeLines[instructionPtr];
       if (line.startsWith('0')) {
           const stackPushVal = parseInt(line.substring(1), 2);
           cortlangStack.push(stackPushVal);
       }
       else if (line.startsWith('1')) {
           const command = line.substring(1);
           if (command === '0') {
               // NOP
           }
           else if (command === '1') {
               cortlangStack.pop();
           }
           else if (command === '00') {
               var top = cortlangStack[cortlangStack.length - 1];
               stdoutStr += String.fromCharCode(top);
           }
           else if (command === '01') {
               var top = cortlangStack[cortlangStack.length - 1];
               var secondTop = cortlangStack[cortlangStack.length - 2];
               top += secondTop;
               cortlangStack.pop();
               cortlangStack.push(top);
           }
           else if (command === '10') {
               var top = cortlangStack[cortlangStack.length - 1];
               var secondTop = cortlangStack[cortlangStack.length - 2];
               top -= secondTop;
               cortlangStack.pop();
               cortlangStack.push(top);
           }
           else if (command === '11') {
               var top = cortlangStack[cortlangStack.length - 1];
               var secondTop = cortlangStack[cortlangStack.length - 2];
               top *= secondTop;
               cortlangStack.pop();
               cortlangStack.push(top);
           }
           else if (command === '000') {
            var top = cortlangStack[cortlangStack.length - 1];
            var secondTop = cortlangStack[cortlangStack.length - 2];
            top /= secondTop;
            cortlangStack.pop();
            cortlangStack.push(top);
           }
           else if (command === '0001') {
                execCode = E_IO_PAUSE;
                return {
                    stdoutStr,
                    instructionPtr,
                    cortlangStack,
                    execCode,
                    sourceCodeBuf
                }
           }
           else if (command === '010') {
                const jumpCount = parseInt(command.substring(3), 2);
                instructionPtr += jumpCount;
           }
       }
   }
   execCode = E_COMPLETE;
   return {
       stdoutStr,
       execCode,
       instructionPtr,
       cortlangStack,
       sourceCodeBuf
   };
}