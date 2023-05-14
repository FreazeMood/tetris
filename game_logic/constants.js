const GRID_SETTINGS = { cell_size: 40, rows: 20, columns: 10, canvas_id: 'gameboard' };
const POSSIBLE_TETROMINOS = [
    [
      [1, 1, 1, 1]
    ],

    [
      [0, 0, 1],
      [1, 1, 1]
    ],

    [
      [1, 0, 0],
      [1, 1, 1]
    ],

    [
      [1, 1],
      [1, 1]
    ],

    [
      [0, 1, 1],
      [1, 1, 0]
    ],

    [
      [0, 1, 0],
      [1, 1, 1]
    ],

    [
      [1, 1, 0],
      [0, 1, 1]
    ]
  ]; 

  const TETROMINO_COLORS = [
    'rgb(250, 120, 120)', // red
    'rgb(255, 165, 0)', // orange
    'rgb(255, 255, 0)', // yellow
    'rgb(0, 128, 0)', // green
    'rgb(0, 0, 255)', // blue
    'rgb(128, 0, 128)', // purple
    'rgb(255, 0, 255)', // magenta
  ];
  