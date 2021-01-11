<template>
	<div id="app" class="app">
		<Field />
		<div class="buttons">
			<div class="buttons-play">
				<button :disabled="gameState == 'play'" @click.prevent="run" class="button-run"></button>
				<button :disabled="gameState != 'play'" @click.prevent="stop" class="button-stop"></button>	
			</div>
			<div class="buttons-speed">
				<button @click.prevent="setSpeed(500)" class="button-speed-x1" :class="{active: gameSpeed == 500}">x1</button>
				<button @click.prevent="setSpeed(50)" class="button-speed-x2" :class="{active: gameSpeed == 50}">x2</button>	
				<button @click.prevent="setSpeed(10)" class="button-speed-x3" :class="{active: gameSpeed == 10}">x3</button>
			</div>
		</div>
		<div class="funcs">
			<p>Functions</p>
			<ul>
				<li v-for="(func, funcIndex) in functions">
					<Func :func="func" :funcIndex="funcIndex + 1" />
					<button @click.prevent="clear(funcIndex)" :disabled="gameState == 'play'"></button>
				</li>
			</ul>
		</div>
		<div class="actions">
			<div class="commands">
				<p>Commands</p>
				<ul>
					<SquareHandler v-for="command in commands" :square="{command, action: 'choseCommand'}" />
				</ul>	
			</div>
			<div class="colors">
				<p>Colors</p>
				<ul>
					<SquareHandler v-for="color in colors" :square="{color, action: 'choseColor'}" />
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import Field from './components/Field';
	import Func from './components/Func';
	import SquareHandler from './components/SquareHandler';

	export default {
		name: 'App',
		computed: {
			functions() {
				return this.$store.state.functions;
			},
			commands() {
				let commandsList = this.$store.state.currentLevel.commands;
				this.$store.state.functions.forEach((f, id) => {
					commandsList.push(`insertF${id}`);
				});
				return commandsList;
			},
			colors() {
				return this.$store.state.currentLevel.colors;
			},
			gameState() {
				return this.$store.state.gameState;
			},
			gameSpeed() {
				return this.$store.state.speed;
			}
		},
		components: {
			Field,
			Func,
			SquareHandler
		},
		methods: {
			run() {
				this.$store.dispatch('run');
			},
			clear(f) {
				this.$store.commit('clear', f);
			},
			stop() {
				this.$store.commit('stop');
			},
			setSpeed(speed) {
				this.$store.commit('setSpeed', speed);
			}
		}
	}
</script>

<style>
	* {
		outline: none;
	}

	button[disabled] {
		opacity: 0.3;
	}

	.app {
		display: flex;
		flex-flow: column;
		width: 550px;
		margin: 0 auto;
	}

	.buttons {
		background-color: #eee;
		padding: 5px 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.buttons button {
		width: 30px;
		height: 30px;
		border: none;
		background-color: none;
		background-position: center center;
		background-repeat: no-repeat;
		background-size: 50%;
		cursor: pointer;
	}

	.buttons button.active {
		font-weight: bold;
		color: red;
	}

	.buttons .button-run {
		background-image: url(./assets/play.svg); 
	}

	.buttons .button-stop {
		background-image: url(./assets/stop.svg); 
	}

	.actions {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.funcs ul li {
		display: flex;
		align-items: center;
	}

	.funcs ul li button {
		width: 10px;
		height: 10px;
		display: flex;
		background-color: none;
		background-position: center center;
		background-repeat: no-repeat;
		background-size: 100%;
		background-image: url(./assets/cancel.svg);
		border: none;
		background-color: transparent;
		margin-left: 10px;
		cursor: pointer;
	}

	.funcs, .actions {
		padding: 5px 20px;
	}

	.commands {
		margin-right: 20px;
	}

	.commands ul, .colors ul {
		display: flex;
	}

	@media (max-width: 767px) {
		.app {
			width: 100vw;
		}
	}
</style>
