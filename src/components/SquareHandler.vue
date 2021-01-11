<template>
	<div
		class="square"
		:class="{
			[square.command]: square.command,
			chosen: (activeFunctionsCell.f == square.funcIndex - 1) && (activeFunctionsCell.s == square.squareIndex - 1),
			disabled: gameState == 'play'
		}"
		:style="{
			backgroundColor: square.color || '#ddd',
		}"
		@click="doAction"
	>
	</div>
</template>

<script>
	export default {
		name: 'SquareHandler',
		props: ['square'],
		computed: {
			activeFunctionsCell() {
				return this.$store.state.activeFunctionsCell;
			},
			gameState() {
				return this.$store.state.gameState;
			}
		},
		methods: {
			doAction() {
				if (this.gameState == 'play') return;
				if (this.square.action == 'choseCell') {
					this.$store.commit('choseCell', {f: this.square.funcIndex - 1, s: this.square.squareIndex - 1});
				}
				if (this.square.action == 'choseColor') {
					this.$store.commit('choseColor', this.square.color);
				}
				if (this.square.action == 'choseCommand') {
					this.$store.commit('choseCommand', this.square.command);
				}
			}
		}
	}
</script>

<style>
	.square.step {background-image: url(../assets/step.svg);}
	.square.turnToRight {background-image: url(../assets/turnToRight.svg);}
	.square.turnToLeft {background-image: url(../assets/turnToLeft.svg);}
	.square.paintSalmon {background-image: url(../assets/paintSalmon.svg);}
	.square.paintGold {background-image: url(../assets/paintGold.svg);}
	.square.paintGreen {background-image: url(../assets/paintGreen.svg);}
	.square.insertF0::after {content: 'F1';}
	.square.insertF1::after {content: 'F2';}
	.square.insertF2::after {content: 'F3';}

	.square.chosen {border: 1px solid grey;}
</style>