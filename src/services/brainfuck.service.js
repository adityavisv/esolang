import {
    runBrainfuck,
    runSingleInstructionBrainfuck
} from '../interpreter_engine/brainfuck';

class BrainfuckService {
    executeSourceCodeBuf = (sourceCodeBuf, brainfuckState) => {
        const newBFState = runBrainfuck(sourceCodeBuf, brainfuckState);
        return newBFState;
    }

    executeSingeInstr = (sourceCodeBuf, brainfuckState) => {
        const newBFState = runSingleInstructionBrainfuck(sourceCodeBuf, brainfuckState);
        return newBFState;
    }
}

export default new BrainfuckService();