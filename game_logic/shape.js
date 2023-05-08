class Shape {
    constructor(col, row, color) {    
        this.col = col;
        this.row = row;
        this.color = color;
        this.speed = 1000; // miliseconds
    }

    create(cell_size, ctx) {
        // calculate the position of the cell on the canvas
        let x = this.col * cell_size,
        y = this.row * cell_size;

        // Draw the cell
        ctx.fillStyle = this.color;
        ctx.fillRect(x, y, cell_size, cell_size);
        ctx.strokeStyle = 'purple';
        ctx.strokeRect(x, y, cell_size, cell_size);
    }

    rotate(x, y) {

    }   

    move(position) {

    }

    speed_up() {
        this.speed = 500;
    }


}