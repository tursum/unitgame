class Cell {
	constructor(x, y, color, star) {
		this.x = x;
		this.y = y;
		this.color = color;
		this.star = star;
	}
}

const umaps = [
	[
		new Cell(6, 8, 'yellowgreen', false),
		new Cell(7, 8, 'lightsalmon', false),
		new Cell(8, 8, 'gold', false),
		new Cell(9, 8, 'yellowgreen', false),
		new Cell(10, 8, 'lightsalmon', true),
	],
	[
		new Cell(12, 12, 'lightsalmon', false),
		new Cell(11, 12, 'lightsalmon', false),
		new Cell(11, 11, 'lightsalmon', false),
		new Cell(10, 11, 'lightsalmon', false),
		new Cell(10, 10, 'lightsalmon', false),
		new Cell(9, 10, 'lightsalmon', false),
		new Cell(9, 9, 'lightsalmon', false),
		new Cell(8, 9, 'lightsalmon', false),
		new Cell(8, 8, 'lightsalmon', false),
		new Cell(7, 8, 'lightsalmon', false),
		new Cell(7, 7, 'lightsalmon', false),
		new Cell(6, 7, 'lightsalmon', false),
		new Cell(6, 6, 'lightsalmon', false),
		new Cell(5, 6, 'lightsalmon', false),
		new Cell(5, 5, 'lightsalmon', false),
		new Cell(4, 5, 'lightsalmon', false),
		new Cell(4, 4, 'lightsalmon', false),
		new Cell(3, 4, 'lightsalmon', false),
		new Cell(3, 3, 'lightsalmon', false),
		new Cell(2, 3, 'lightsalmon', true)
	],
	[
		new Cell(15, 6, 'yellowgreen', false),
		new Cell(14, 6, 'yellowgreen', false),
		new Cell(14, 7, 'yellowgreen', false),
		new Cell(13, 7, 'yellowgreen', false),
		new Cell(13, 8, 'yellowgreen', false),
		new Cell(12, 8, 'yellowgreen', false),
		new Cell(12, 9, 'yellowgreen', false),
		new Cell(11, 9, 'yellowgreen', false),
		new Cell(11, 10, 'yellowgreen', false),
		new Cell(10, 10, 'yellowgreen', false),
		new Cell(10, 11, 'gold', false),
		new Cell(9, 11, 'gold', false),
		new Cell(9, 10, 'yellowgreen', false),
		new Cell(8, 10, 'yellowgreen', false),
		new Cell(8, 9, 'yellowgreen', false),
		new Cell(7, 9, 'yellowgreen', false),
		new Cell(7, 8, 'yellowgreen', false),
		new Cell(6, 8, 'yellowgreen', false),
		new Cell(6, 7, 'yellowgreen', false),
		new Cell(5, 7, 'yellowgreen', false),
		new Cell(5, 6, 'yellowgreen', false),
		new Cell(4, 6, 'yellowgreen', true)
	],
	[
		new Cell(4, 8, 'yellowgreen', false),
		new Cell(5, 8, 'lightsalmon', false),
		new Cell(6, 8, 'lightsalmon', false),
		new Cell(7, 8, 'lightsalmon', false),
		new Cell(8, 8, 'lightsalmon', false),
		new Cell(9, 8, 'gold', false),
		new Cell(9, 7, 'lightsalmon', false),
		new Cell(9, 6, 'lightsalmon', false),
		new Cell(9, 5, 'lightsalmon', false),
		new Cell(9, 4, 'lightsalmon', false),
		new Cell(9, 9, 'lightsalmon', false),
		new Cell(9, 10, 'lightsalmon', false),
		new Cell(9, 11, 'lightsalmon', false),
		new Cell(9, 12, 'lightsalmon', false),
		new Cell(9, 3, 'yellowgreen', true),
		new Cell(9, 13, 'yellowgreen', true)
	],
	[
		new Cell(4, 8, 'lightsalmon', false),
		new Cell(5, 8, 'gold', false),
		new Cell(6, 8, 'gold', false),
		new Cell(7, 8, 'gold', false),
		new Cell(8, 8, 'gold', false),
		new Cell(9, 8, 'lightsalmon', false),
		new Cell(9, 7, 'gold', false),
		new Cell(9, 6, 'gold', false),
		new Cell(9, 5, 'gold', false),
		new Cell(9, 4, 'gold', false),
		new Cell(9, 9, 'gold', false),
		new Cell(9, 10, 'gold', false),
		new Cell(9, 11, 'gold', false),
		new Cell(9, 12, 'gold', false),
		new Cell(9, 3, 'yellowgreen', true),
		new Cell(9, 13, 'yellowgreen', true)
	],
	[
		new Cell(8, 13, 'gold', false),
		new Cell(8, 12, 'gold', false),
		new Cell(8, 11, 'gold', false),
		new Cell(8, 10, 'gold', false),
		new Cell(8, 9, 'gold', false),
		new Cell(8, 8, 'gold', false),
		new Cell(8, 7, 'gold', false),
		new Cell(8, 6, 'gold', false),
		new Cell(8, 5, 'yellowgreen', false),
		new Cell(8, 4, 'yellowgreen', false),
		new Cell(8, 3, 'yellowgreen', false),
		new Cell(8, 2, 'gold', false),
		new Cell(7, 2, 'yellowgreen', true)
	],
	[
		new Cell(7, 7, 'lightsalmon', true),
		new Cell(7, 8, 'yellowgreen', false),
		new Cell(7, 9, 'yellowgreen', false),
		new Cell(7, 10, 'lightsalmon', true),
		new Cell(8, 10, 'yellowgreen', false),
		new Cell(9, 10, 'yellowgreen', false),
		new Cell(10, 10, 'lightsalmon', true),
		new Cell(10, 9, 'yellowgreen', false),
		new Cell(10, 8, 'yellowgreen', false),
		new Cell(10, 7, 'lightsalmon', false),
		new Cell(9, 7, 'yellowgreen', false),
		new Cell(8, 7, 'yellowgreen', false),
		new Cell(10, 11, 'yellowgreen', true),
	]
];

class Level {
	constructor(stars, functions, commands, colors, initialPlayer) {
		this.stars = stars;
		this.functions = functions;
		this.commands = commands;
		this.colors = colors;
		this.umap = umaps[Level.counter];
		this.initialPlayer = initialPlayer;

		Level.counter++;
	}

	static counter = 0;
}

export const levels = [
	new Level(
		1,
		[2],
		['step'],
		['yellowgreen', 'lightsalmon', 'gold'],
		{x: 6, y: 8, direction: 180}
	),
	new Level(
		1,
		[5],
		['step', 'turnToRight', 'turnToLeft'],
		['yellowgreen', 'lightsalmon', 'gold'],
		{x: 12, y: 12, direction: 0}
	),
	new Level(
		1,
		[5],
		['step', 'turnToRight', 'turnToLeft'],
		['yellowgreen', 'lightsalmon', 'gold'],
		{x: 15, y: 6, direction: 0}
	),
	new Level(
		2,
		[6],
		['step', 'turnToRight', 'turnToLeft', 'paintSalmon'],
		['yellowgreen', 'lightsalmon', 'gold'],
		{x: 4, y: 8, direction: 180}
	),
	new Level(
		2,
		[3, 4],
		['step', 'turnToRight', 'turnToLeft', 'paintGold'],
		['yellowgreen', 'lightsalmon', 'gold'],
		{x: 4, y: 8, direction: 180}
	),
	new Level(
		1,
		[3, 3],
		['step', 'turnToRight', 'turnToLeft'],
		['yellowgreen', 'lightsalmon', 'gold'],
		{x: 8, y: 13, direction: 270}
	),
	new Level(
		4,
		[4],
		['step', 'turnToRight', 'turnToLeft', 'paintGreen'],
		['yellowgreen', 'lightsalmon', 'gold'],
		{x: 10, y: 7, direction: 90}
	),
];