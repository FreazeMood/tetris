class Board {

    constructor({ cell_size, rows, columns, canvas_id }) {
        this.cell_size = cell_size;
        this.rows = rows;
        this.score = 0;
        this.canvas_id = canvas_id;
        this.scoreElement = [...document.getElementsByClassName('score')];
        this.columns = columns;
        this.board = this.createNewBoard();
        this.ctx = this.createCanvas(canvas_id);
        this.shapes = []; // stores all the objects of Shape;
        this.drawBoard();
        this.current_tetromino = this.generateTetromino();
        this.game_loop = setInterval(() => this.updateBoard(), 800);
        document.addEventListener('keyup', (e) => {
            e.key === 'ArrowLeft' ? this.moveLeft() : null;
            e.key === 'ArrowRight' ? this.moveRight() : null;
            e.key === 'ArrowUp' ? this.rotate() : null;
        }
        );

    }

    createNewBoard() {
        // initialize the board state
        return Array.from({ length: this.rows }, () => Array(this.columns).fill(0));
    }

    createCanvas(id) {
        const canvas = document.getElementById(id);
        const ctx = canvas.getContext('2d');

        ctx.canvas.width = this.columns * this.cell_size;
        ctx.canvas.height = this.rows * this.cell_size;

        return ctx;
    }

    drawBoard() {
        // loop through the board and create a new Shape object for each empty cell then draw it on the canvas
        for (let row = 0; row < this.rows; row++) {
            this.shapes.push([]);
            for (let col = 0; col < this.columns; col++) {
                const shape = new Shape(this.ctx, col, row);
                shape.create_or_update('rgb(17, 24, 39)', this.cell_size);
                this.shapes[row].push(shape);

            }
        }
        console.log(this.shapes);
    }

    updateBoard() {
        debugger
        this.clearCurrentTetromino();
        const { current_row, current_col, current_shape } = this.current_tetromino;
        const next_row = current_row + 1;

        if (this.isMoveValid(next_row, current_col, current_shape)) {
            this.drawCurrentTetromino();
            return this.current_tetromino.current_row = next_row;
        }

        this.freezeTetromino();
        this.score += 34;
        this.updateScore();
        this.current_tetromino = this.generateTetromino();

        if (!this.isMoveValid(this.current_tetromino.current_row, this.current_tetromino.current_col, this.current_tetromino.current_shape)) {
            this.gameOver();
        }

    }

    generateTetromino() {
        const randomTetrominoIdx = Math.floor(Math.random() * POSSIBLE_TETROMINOS.length), randomColorIdx = Math.floor(Math.random() * TETROMINO_COLORS.length), start_col = 4, start_row = 0, tetromino = {
            current_shape: POSSIBLE_TETROMINOS[randomTetrominoIdx],
            current_row: start_row,
            current_col: start_col,
            color: TETROMINO_COLORS[randomColorIdx]
        };
        return tetromino;
    }

    moveLeft() {
        const { current_row, current_col } = this.current_tetromino;
        const new_col = current_col - 1;
        if (current_row > 0 && this.isCellEmpty(current_row, new_col)) {
            this.clearCurrentTetromino();
            this.current_tetromino.current_col = new_col;
            this.drawCurrentTetromino();
        }
    }

    moveRight() {
        const { current_row, current_col, current_shape } = this.current_tetromino;
        const new_col = current_col + 1;
        if (current_row > 0 && this.isCellEmpty(current_row, new_col + current_shape[0].length - 1)) {
            this.clearCurrentTetromino();
            this.current_tetromino.current_col = new_col;
            this.drawCurrentTetromino();
        }
    }

    isCellEmpty(row, col) {
        if (row < 0 || row >= this.rows || col < 0 || col >= this.columns) {
            return false; // out of bounds
        }
        return this.board[row][col] === 0;
    }

    isMoveValid(row, col, shape) {
        for (let r = 0; r < shape.length; r++) {
            for (let c = 0; c < shape[0].length; c++) {
                if (shape[r][c] !== 0) {
                    const new_row = row + r;
                    const new_col = col + c;
                    if (!this.isCellEmpty(new_row, new_col)) {
                        return false; // collision detected
                    }
                }
            }
        }
        return true;
    }


    countTetrominoPieces() {
        const { current_shape } = this.current_tetromino;
        let counter = 0;
        current_shape.map((e) => {
            e.forEach(piece => piece === 1 ? counter += 1 : null);
        });
        return counter;
    }

    clearCurrentTetromino() {
        const { current_row, current_col, current_shape } = this.current_tetromino;
        const start_col = current_col, end_col = start_col + current_shape[0].length - 1, pieces = this.countTetrominoPieces();
        let removed_pieces = 0;

        if (current_row > 0 && current_row !== this.board.length) {
            for (let row = current_row - 1; row < current_shape.length + current_row; row++) {
                for (let col = start_col; col <= end_col; col++) {
                    if (this.board[row][col] !== 0 && removed_pieces !== pieces) {
                        this.board[row][col] = 0;
                        this.shapes[row][col].create_or_update('rgb(17, 24, 39)', this.cell_size);
                        removed_pieces += 1;
                    }
                }
            }
        }
    }

    drawCurrentTetromino() {
        const { current_row, current_col, current_shape, color } = this.current_tetromino;
        const start_col = current_col, end_col = start_col + current_shape[0].length - 1;

        // updates the state of the falling tetromino
        for (let row = current_row; row < current_shape.length + current_row; row++) {
            for (let col = start_col; col <= end_col; col++) {
                if (current_row - current_shape.length === (this.board.length - current_shape.length - 1)) {
                    return this.current_tetromino = this.generateTetromino();
                }
                this.board[row][col] = current_shape[row - current_row][col - start_col];
                current_shape[row - current_row][col - start_col] ? this.shapes[row][col].create_or_update(color, this.cell_size) : null;
            }
        }
    }

    freezeTetromino() {
        const { current_row, current_col, current_shape, color } = this.current_tetromino;
        const start_col = current_col, end_col = start_col + current_shape[0].length - 1;
        for (let row = current_row; row < current_shape.length + current_row; row++) {
            for (let col = start_col; col <= end_col; col++) {
                if (current_shape[row - current_row][col - start_col]) {
                    this.board[row][col] = current_shape[row - current_row][col - start_col];
                    this.shapes[row][col].create_or_update(color, this.cell_size);
                }
            }
        }
        this.checkLineCompleted();
    }

    
    rotate() {
        const { current_row, current_col, current_shape } = this.current_tetromino;
        const rotated_shape = Array.from({ length: current_shape[0].length }, () => Array(current_shape.length).fill(0));
        
        if (current_row > 0) {
            for (let i = 0; i < current_shape.length; i++) {
                for (let j = 0; j < current_shape[i].length; j++) {
                    rotated_shape[j][current_shape.length - 1 - i] = current_shape[i][j];
                }
            }
            for (let i = 0; i < rotated_shape.length; i++) {
                rotated_shape[i].reverse();
            }
            
            if (this.isValidRotation(current_row, current_col, rotated_shape)){
                this.clearCurrentTetromino();
                this.current_tetromino.current_shape = rotated_shape;
                this.drawCurrentTetromino();
            }
        }
    }
    
    isValidRotation(row, col, shape) {
        // get the dimensions of the rotated shape
        const rotated_rows = shape[0].length;
        const rotated_cols = shape.length;
        
        // check if any part of the rotated shape goes out of bounds
        for (let i = 0; i < rotated_rows; i++) {
            for (let j = 0; j < rotated_cols; j++) {
                if (shape[j][i] !== 0 && (col + i < 0 || col + i >= this.columns || row + j >= this.rows)) {
                    return false;
                }
            }
        }
        return true;
    }
    
    checkLineCompleted() {
        this.board.map((row, idx) => {
            if (row.every(e => e === 1)) {
                this.score += 100;
                this.updateScore();
                this.board[idx].fill(0);
                this.deleteLine(idx);
            }
        });
    }
    
    deleteLine(row) {
        this.shapes[row].map(elem => elem.create_or_update('rgb(17, 24, 39)', this.cell_size));
        for (let r = row; r >= 0; r--) {
            for (let c = 0; c < this.columns; c++) {
                if (this.board[r][c] === 1) {
                    this.board[r][c] = 0;
                    this.shapes[r + 1][c].create_or_update(this.shapes[r][c].fill_color, this.cell_size);
                    this.shapes[r][c].create_or_update('rgb(17, 24, 39)', this.cell_size);
                    this.board[r + 1][c] = 1;
                }
            }
        }
        this.checkLineCompleted();
    }
    
    updateScore() {
        this.scoreElement.map(e => e.innerHTML = this.score);
    }

    gameOver() {
        clearInterval(this.game_loop);
        !localStorage.getItem('max-score') ? localStorage.setItem('max-score', this.score) : null;
        parseInt(localStorage.getItem('max-score')) < this.score ? localStorage.setItem('max-score', this.score) : null;
        location.reload();
    }
}
