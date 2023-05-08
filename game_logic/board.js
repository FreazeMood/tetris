class Board {
    
    constructor({ cell_size, rows, columns, canvas_id }) {
        this.cell_size = cell_size;
        this.rows = rows;
        this.columns = columns;
        this.ctx = this.createCanvas(canvas_id);
        this.board = this.createNewBoard()
        this.drawBoard()
    }
    
    
    createNewBoard() {
        // initialize the board on the document
        return Array.from(
            {length: this.rows}, () => Array(this.columns).fill(0)
        ); 
    }

    createCanvas(id) {
        const canvas = document.getElementById(id);
        const ctx = canvas.getContext('2d');
      
        ctx.canvas.width = this.columns * this.cell_size;
        ctx.canvas.height = this.rows * this.cell_size;
      
        // Scale blocks
        // ctx.scale(this.cell_size, this.cell_size);
      
        return ctx;
      }
      
    
    drawBoard() {
        // loop through the board and create a new Shape object for each empty cell, then draw it on the canvas
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.columns; col++) {
                if (this.board[row][col] === 0) {
                    const shape = new Shape(col, row, 'rgb(17 24 39)');
                    shape.create(this.cell_size, this.ctx);
                }
            }
        }
    }  
    
    
}