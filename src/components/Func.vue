<template>
	<div class="func">
		<p>F{{funcIndex}}: </p>
		<SquareHandler
			v-for="(action, squareIndex) in func"
			:square="{
				squareIndex: squareIndex + 1,
				funcIndex: funcIndex,
				color: action.color,
				command: action.command,
				action: 'choseCell'
			}"
			:key="squareIndex"
		/>
	</div>
</template>

<script>
	import SquareHandler from './SquareHandler';

	export default {
		name: 'Func',
		props: ['func', 'funcIndex'],
		components: {
			SquareHandler
		}
	}
</script>

<style>
	.func {
		display: flex;
		align-items: center;
	}
</style>