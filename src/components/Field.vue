<template>
	<div class="field">
		<SquareField v-for="(square, id) in squaresMap" :square="square" :key="id" />
	</div>
</template>

<script>
	import SquareField from './SquareField';

	export default {
		name: 'Field',
		components: {
			SquareField
		},
		computed: {
			currentLevel() {
				return this.$store.state.currentLevel;
			},
			squaresMap() {
				let squares = [];
				this.$store.state.currentLevel.umap.forEach((row, x) => {
					row.forEach((item, y) => {
						squares.push(Object.assign({}, item));
					});
				});

				return squares;
			}
		}
	}
</script>

<style>
	.field {
		width: 550px;
		height: 550px;
		display: flex;
		flex-flow: row wrap;
		background-color: #eee;
		align-content: center;
		justify-content: center;
	}

	.square {
		width: 31px;
		height: 31px;
		background-color: #ddd;
		margin: 1px;
		position: relative;
		background-position: center center;
		background-repeat: no-repeat;
		background-size: 50%;
	}

	.square.disabled {
		opacity: 0.3;
	}

	.square::before, .square::after {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background-position: center center;
		background-repeat: no-repeat;
		background-size: 50%;
	}

	@media (max-width: 767px) {
		.field {
			width: 100vw;
			height: 100vw;
		}

		.field .square {
			width: 5.882%;
			height: 5.882%;
			margin: 0.183%;
		}
	}
</style>