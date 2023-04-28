export function generateSudoku() {
    let sudoku = [];
    for (let i = 0; i < 9; i++) {
        sudoku[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
    fillSudoku(sudoku, 0, 0);
    //console.log(sudoku)
    return sudoku;
}

function fillSudoku(sudoku, row, col) {
    if (row === 9) {
        return true;
    }
    if (col === 9) {
        return fillSudoku(sudoku, row + 1, 0);
    }
    let values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    shuffleArray(values);
    for (let i = 0; i < values.length; i++) {
        let n = values[i];
        if (checkValue(sudoku, row, col, n)) {
            sudoku[row][col] = n;
            if (fillSudoku(sudoku, row, col + 1)) {
                return true;
            }
            sudoku[row][col] = 0;
        }
    }
    return false;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function checkValue(sudoku, row, col, n) {
    for (let i = 0; i < 9; i++) {
        if (sudoku[row][i] === n || sudoku[i][col] === n) {
            //console.log(sudoku, row, col, n)
            return false;
        }
    }
    let startRow = Math.floor(row / 3) * 3;
    let startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (sudoku[i][j] === n) {
                return false;
            }
        }
    }
    return true;
}