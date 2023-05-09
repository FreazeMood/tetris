class Board {
    
    constructor({ cell_size, rows, columns, canvas_id }) {
        this.cell_size = cell_size;
        this.rows = rows;
        this.columns = columns;
        this.board = this.createNewBoard()
        this.ctx = this.createCanvas(canvas_id);
        this.shapes = [];
        this.drawBoard()
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
        // loop through the board and create a new Shape object for each empty cell, then draw it on the canvas
        for (let row = 0; row < this.rows; row++) {
            this.shapes.push([]);
            for (let col = 0; col < this.columns; col++) {
                if (this.board[row][col] === 0) {
                    const shape = new Shape(this.ctx, col, row, 'rgb(17 24 39)');
                    shape.create(this.cell_size);
                    this.shapes[row].push(shape);
                }
            }
        }
        console.log(this.shapes);
    }  

}