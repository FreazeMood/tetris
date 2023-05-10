class Board {
    
    constructor({ cell_size, rows, columns, canvas_id }) {
        this.cell_size = cell_size;
        this.rows = rows;
        this.columns = columns;
        this.board = this.createNewBoard()
        this.ctx = this.createCanvas(canvas_id);
        this.shapes = [];
        this.drawBoard();
        this.current_tetromino = this.generateTetromino();
        this.game_loop = setInterval(() => this.updateBoard(), 100); // save interval id
    }
    
    createNewBoard() {
        // initialize the board state
        return Array.from({length: this.rows}, () => Array(this.columns).fill(0)); 
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
                shape.create_or_update('rgb(17 24 39)', this.cell_size);
                this.shapes[row].push(shape);
            
            }
        }
        console.log(this.shapes);
    }  

    updateBoard() {
       
            const current_row = this.current_tetromino.current_row,
            current_shape = this.current_tetromino.current_shape,
            start_col = this.current_tetromino.current_col,
            end_col = start_col + current_shape[0].length - 1;

            if (current_row > 0) {
                for (let row = current_row-1; row < current_shape.length + current_row; row++) {
                    for (let col = start_col; col <= end_col; col++) {
                        if (this.board[row][col] !== 0) {
                            this.board[row][col] = 0;
                            this.shapes[row][col].create_or_update('rgb(17 24 39)', this.cell_size);
                        }
                    }
                }
            }

            // updates the state of the falling tetromino
            for (let row = current_row; row < current_shape.length + current_row; row++) {
                for (let col = start_col; col <= end_col; col++) {
                    debugger
                    if (current_row === this.board.length - (current_shape.length)) {
                        return this.current_tetromino = this.generateTetromino();
                    }
                    this.board[row][col] = current_shape[row - current_row][col - start_col];
                    current_shape[row - current_row][col - start_col] ? this.shapes[row][col].create_or_update('yellow', this.cell_size) : null;
                }
            }
            
            this.current_tetromino.current_row += 1;
            console.log(this.current_tetromino);
            console.log(this.board);
            
    }

    generateTetromino() {
        const randomIndex = Math.floor(Math.random() * POSSIBLE_TETROMINOS.length);
        return {current_shape: POSSIBLE_TETROMINOS[randomIndex], current_row: 0, current_col: 4};
    }

    isPlaced() {


    }
}