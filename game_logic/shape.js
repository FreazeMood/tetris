class Shape {
    constructor(ctx, col, row, color) {    
        this.ctx = ctx;
        this.col = col;
        this.row = row;
        this.default_color = color;
        this.speed = 1000; // miliseconds
    }

    create(cell_size) {
        // calculate the position of the cell on the canvas
        let x = this.col * cell_size,
        y = this.row * cell_size;

        // Draw the cell
        this.ctx.fillStyle = this.default_color;
        this.ctx.fillRect(x, y, cell_size, cell_size);
        this.ctx.strokeStyle = 'purple';
        this.ctx.strokeRect(x, y, cell_size, cell_size);
    }

    update(fill_color, cell_size) {
        // calculate the position of the cell on the canvas
        let x = this.col * cell_size,
        y = this.row * cell_size;

        // Draw the cell
        this.ctx.fillStyle = fill_color;
        this.ctx.fillRect(x, y, cell_size, cell_size);
        this.ctx.strokeStyle = 'purple';
        this.ctx.strokeRect(x, y, cell_size, cell_size);
    }
}

