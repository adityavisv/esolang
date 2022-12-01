import {
    runBrainfuck,
    runInputInstruction,
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

    executeInputInstr = (inputCharacter, brainfuckState) => {
        const newBFState = runInputInstruction(inputCharacter, brainfuckState);
        return newBFState;
    }
}

export default new BrainfuckService();