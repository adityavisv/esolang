export const runAlphaBeta = (sourceCodeBuf, alphabetaState) => {
    var { instructionPtr, regOne, regTwo, resultReg, memoryReg, positionReg, memoryArray, stdoutStr, memoryMode } = alphabetaState;
    var newPosition = -1;
    for ( ; instructionPtr < sourceCodeBuf.length; instructionPtr++) {
        const instructionChar = sourceCodeBuf.charAt(instructionPtr);
        switch(instructionChar) {
            case 'a':
                regOne++;
                break;
            case 'b':
                regOne--;
                break;
            case 'c':
                regOne += 10;
                break;
            case 'd':
                regOne -= 10;
                break;
            case 'e':
                regOne += 100;
                break;
            case 'f':
                regOne -= 100;
                break;
            case 'g':
                regTwo++;
                break;
            case 'h':
                regTwo--;
                break;
            case 'i':
                regTwo += 10;
                break;
            case 'j':
                regTwo -= 10;
                break;
            case 'k':
                regTwo += 100;
                break;
            case 'l':
                regTwo -= 100;
                break;
            case 'm':
                resultReg = !regOne;
                break;
            case 'n':
                resultReg = !regTwo;
                break;
            case 'o':
                resultReg = regOne & regTwo;
                break;
            case 'p':
                resultReg = regOne | regTwo;
                break;
            case 'q':
                resultReg = regOne ^ regTwo;
                break;
            case 'r':
                resultReg = regOne + regTwo;
                break;
            case 's':
                resultReg = regOne - regTwo;
                break;
            case 't':
                resultReg = regOne * regTwo;
                break;
            case 'u':
                resultReg = regOne / regTwo;
                break;
            case 'v':
                resultReg = regOne % regTwo;
                break;
            case 'w':
                resultReg = Math.pow(regOne, regTwo);
                break;
            case 'x':
                regOne = 0;
                break;
            case 'y':
                regTwo = 0;
                break;
            case 'z':
                resultReg = 0;
                break;
            case 'A':
                regTwo = regOne;
                break;
            case 'B':
                regOne = regTwo;
                break;
            case 'C':
                resultReg = regOne;
                break;
            case 'D':
                resultReg = regTwo;
                break;
            case 'E':
                regOne = resultReg;
                break;
            case 'F':
                regTwo = resultReg;
                break;
            case 'G':
                regOne = memoryArray[memoryReg];
                break;
            case 'H':
                regTwo = memoryArray[memoryReg];
                break;
            case 'I':
                memoryArray[memoryReg] = resultReg;
                break;
            case 'J':
            case 'K':
                // todo 
                break;
            case 'L':
                stdoutStr += String.fromCharCode(resultReg);
                break;
            case 'M':
                stdoutStr += `${resultReg}`;
                break;
            case 'N':
                if (regOne === regTwo)
                    newPosition = positionReg;
                break;
            case 'O':
                if (regOne !== regTwo)
                    newPosition = positionReg;
                break;
            case 'P':
                if (regOne >= regTwo)
                    newPosition = positionReg;
                break;
            case 'Q':
                if (regOne <= regTwo)
                    newPosition = positionReg;
                break;
            case 'R':
                if (resultReg === 0)
                    newPosition = positionReg - 1;
                break;
            case 'S':
                if (memoryMode)
                    memoryReg++;
                else
                    positionReg++;
                break;
            case 'T':
                if (memoryMode)
                    memoryReg--;
                else
                    positionReg--;
                break;
            case 'U':
                if (memoryMode)
                    memoryReg += 10;
                else
                    positionReg += 10;
                break;
            case 'V':
                if (memoryMode)
                    memoryReg -= 10;
                else
                    positionReg -= 10;
                break;
            case 'W':
                if (memoryMode)
                    memoryReg += 100;
                else
                    positionReg += 100;
                break;
            case 'X':
                if (memoryMode)
                    memoryReg -= 100;
                else
                    positionReg -= 100;
                break;
            case 'Y':
                if (memoryMode)
                    memoryReg = 0;
                else
                    positionReg = 0;
                break;
            case 'Z':
                memoryMode = !memoryMode;
                break;
        }





        }
    }
}