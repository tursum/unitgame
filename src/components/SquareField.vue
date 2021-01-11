<template>
	<div
		class="square"
		:class="{
			current: (square.x == coords.x && square.y == coords.y),
			star: square.star,
			[getDirection(direction)]: (square.x == coords.x && square.y == coords.y)
		}"
		:style="{backgroundColor: square.color || 'transparent'}"
	>
	</div>
</template>

<script>
	export default {
		name: 'SquareField',
		props: ['square'],
		computed: {
			coords() {
				return {
					x: this.$store.state.playerSquare.x,
					y: this.$store.state.playerSquare.y
				}
			},
			direction() {
				return this.$store.state.playerDirection;
			}
		},
		methods: {
			getDirection(deg) {
				switch (deg) {
					case 0: return 'top';
					case 90: return 'right';
					case 180: return 'bottom';
					case 270: return 'left';
					default: return '';
				}
			}
		}
	}
</script>

<style>
	.square.current::before {
		content: '';
		background-image: url(../assets/cursor.svg);
	}

	.square.right::before {
		transform: rotate(90deg);
	}

	.square.bottom::before {
		transform: rotate(180deg);
	}

	.square.left::before {
		transform: rotate(270deg);
	}

	.square.top::before {
		transform: rotate(0deg);
	}

	.square.star {
		background-image: url(../assets/star.svg);
		background-size: 30%;
	}
</style>