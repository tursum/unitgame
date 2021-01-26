// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Vuex from 'vuex';

import style from './assets/style.css';

import {levels} from './db';

Vue.use(Vuex);

const generateMap = umapData => {
	let umap = Array(16).fill(null).map((item, id) => Array(16).fill(null).map((jtem, jd) => ({x: id, y: jd})));

	umapData.forEach(square => {
		umap[square.x][square.y] = Object.assign({}, square);
	});

	return umap;
}

export const store = new Vuex.Store({
	state: {
		currentLevel: null,
		levelId: parseInt(localStorage.getItem('unitgameLevel')) || 0,
		actions: [],
		functions: [],
		activeFunctionsCell: {f: 0, s: 0},
		playerSquare: null,
		playerDirection: null,
		gameState: null,
		counter: 0,
		pickedDtars: 0,
		speed: 500
	},
	mutations: {
		loadMap(state, umap) {
			if (state.gameState == 'stay') return;
			state.currentLevel.umap = generateMap(umap);
			state.pickedStars = 0;
		},
		loadPlayer(state) {
			state.gameState = 'stay';
			state.playerSquare = state.currentLevel.umap[state.currentLevel.initialPlayer.x][state.currentLevel.initialPlayer.y];
			state.playerDirection = state.currentLevel.initialPlayer.direction;
		},
		loadLevel(state, level) {
			state.currentLevel = Object.assign({}, level);
			this.commit('loadMap', level.umap);
			state.playerSquare = state.currentLevel.umap[state.currentLevel.initialPlayer.x][state.currentLevel.initialPlayer.y];

			state.playerDirection = state.currentLevel.initialPlayer.direction;

			state.functions = [];
			state.currentLevel.functions.forEach(f => {
				state.functions.push(Array(f).fill(null).map(i => ({color: null, command: null})));
			});

			state.activeFunctionsCell = {f: 0, s: 0};
			state.pickedStars = 0;
			state.counter = 0;
			state.gameState = 'stay';
			state.actions = [];
		},
		setSpeed(state, speed) {
			state.speed = speed;
		},
		pickStar(state) {
			state.pickedStars += 1;
			state.playerSquare.star = false;

			if (state.pickedStars == state.currentLevel.stars) {
				state.gameState = 'win';
				this.commit('win');
			}
		},
		win(state) {
			if (levels[state.levelId + 1]) {
				localStorage.setItem('unitgameLevel', state.levelId + 1 + '');
				state.levelId = parseInt(localStorage.getItem('unitgameLevel'));
				this.commit('loadLevel', levels[state.levelId]);
			} else {
				console.log('No more levels');
			}
		},
		step(state) {
			state.counter++;

			let coords = {x: state.playerSquare.x, y: state.playerSquare.y};

			switch (state.playerDirection) {
				case 0:
					coords.x -= 1;
					break;
				case 180:
					coords.x += 1;
					break;
				case 90:
					coords.y += 1;
					break;
				case 270:
					coords.y -= 1;
					break
				default: break;
			}

			if (coords.x > 15 || coords.x < 0 || coords.y > 15 || coords.y < 0) {
				state.playerSquare = {x: -1, y: -1};
				this.commit('leaveField');
				return;
			}

			state.playerSquare = state.currentLevel.umap[coords.x][coords.y];

			if (!state.playerSquare.color) {
				this.commit('leaveField');
				return;
			}

			if (state.playerSquare.star) {
				this.commit('pickStar');
			}
		},
		turnToRight(state) {
			state.counter++;

			state.playerDirection += 90;

			if (state.playerDirection >= 360) {
				state.playerDirection -= 360;
			} if (state.playerDirection < 0) {
				state.playerDirection += 360;
			}
			
		},
		turnToLeft(state) {
			state.counter++;

			state.playerDirection -= 90;

			if (state.playerDirection >= 360) {
				state.playerDirection -= 360;
			} if (state.playerDirection < 0) {
				state.playerDirection += 360;
			}
		},
		insertF(state, f) {
			state.actions.splice(state.counter, 1, ...state.functions[f].filter(i => i.command));
		},
		paintSalmon(state) {
			state.playerSquare.color = 'lightsalmon';
		},
		paintGold(state) {
			state.playerSquare.color = 'gold';
		},
		paintGreen(state) {
			state.playerSquare.color = 'yellowgreen';
		},
		leaveField(state) {
			state.gameState = 'leave';
			state.actions = [];
		},
		choseCell(state, params) {
			this.commit('loadMap', levels[state.levelId].umap);
			this.commit('loadPlayer');

			state.activeFunctionsCell = {f: params.f, s: params.s}
		},
		choseColor(state, color) {
			this.commit('loadMap', levels[state.levelId].umap);
			this.commit('loadPlayer');

			let cell = state.functions[state.activeFunctionsCell.f][state.activeFunctionsCell.s];
			if (cell.color == color) {
				cell.color = null;
			} else {
				cell.color = color;
			}
		},
		choseCommand(state, command) {
			this.commit('loadMap', levels[state.levelId].umap);
			this.commit('loadPlayer');

			let cell = state.functions[state.activeFunctionsCell.f][state.activeFunctionsCell.s];
			if (cell.command == command) {
				cell.command = null;
			} else {
				cell.command = command;
			}
		},
		clear(state, f) {
			this.commit('loadMap', levels[state.levelId].umap);
			this.commit('loadPlayer');

			state.functions[f].forEach(i => {
				i.color = null;
				i.command = null;
			});
		},
		stop(state) {
			state.gameState = 'stop';
		}
	},
	actions: {
		run(store) {
			this.commit('loadMap', levels[store.state.levelId].umap);
			this.commit('loadPlayer');

			store.state.gameState = 'play';
			store.state.counter = 0;
			store.state.actions = Object.assign([], store.state.functions[0].filter(i => {
				return i.command;
			}));

			const promiseMaker = obj => {
				return new Promise((res, rej) => {
					if (!obj) {
						store.state.gameState = 'stay';
						return;
					}

					if (!obj.color || (store.state.playerSquare.color == obj.color)) {
						if (obj.command.indexOf('insert') != -1) {
							setTimeout(() => {
								store.commit('insertF', obj.command[7]);
								res();
							}, 4);
						} else {
							setTimeout(() => {
								store.commit(obj.command);
								res();	
							}, store.state.speed);
						}
					} else {
						store.state.counter++;
						res();
					}
				}).then(() => {
					if (store.state.gameState != 'play') {
						return;
					}
					promiseMaker(con[store.state.counter]);
				});
			}

			let con = store.state.actions;
			promiseMaker(con[store.state.counter]);
		},
		progress(store) {
			this.commit('stop');
			localStorage.setItem('unitgameLevel', '0');
			store.state.levelId = 0;
			this.commit('loadLevel', levels[store.state.levelId]);
		}
	}
});

store.commit('loadLevel', levels[store.state.levelId]);

new Vue({
	el: '#app',
	components: { App },
	template: '<App/>',
	store
});