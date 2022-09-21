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

export const brainfuckRun = (brainfuckParam) => {
    const {sourceCodeBuf} = brainfuckParam;
    var brainfuckTape = new Array(8192).fill(0);
    var brainfuckTapePtr = 0;
    // run checks for parentheses
    if ( ! checkParentheses(sourceCodeBuf) ) {
        return -1;
    }

    for (let instructionIndex = 0; instructionIndex < sourceCodeBuf.length; instructionIndex++) {
        var instructionChar = sourceCodeBuf.charAt(instructionIndex);
        switch(instructionChar) {
            case '+':
                brainfuckTape[brainfuckTapePtr]++;
                break;
            case '-':
                brainfuckTape[brainfuckTapePtr]--;
                break;
            case '>':
                brainfuckTapePtr++;
                break;
            case '<':
                brainfuckTapePtr--;
                break;
            case '.':
                brainfuckParam.stdoutStr += String.fromCharCode(brainfuckTape[brainfuckTapePtr]);
                break;
            case ',':
                // ignore
                break;
            case '[':
                if( ! brainfuckTape[brainfuckTapePtr]) {
                    var bc = 1;
                    while (bc > 0)
                    {
                        instructionChar = sourceCodeBuf.charAt(++instructionIndex);
                        if (instructionChar === ']')
                            --bc;
                        else if (instructionChar === '[')
                            ++bc;
                    }
                }
                break;
            case ']':
                if (brainfuckTape[brainfuckTapePtr]) {
                    var bc = 1;
                    while (bc > 0)
                    {
                        instructionChar = sourceCodeBuf.charAt(--instructionIndex)
                        if (instructionChar === '[')
                            --bc;
                        else if (instructionChar === ']')
                            ++bc;
                    }
                }
                break;
            default:
                // just ignore
        }
    }
    return 0;
}