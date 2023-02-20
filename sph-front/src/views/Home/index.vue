<template>
	<div>
		<TypeNav></TypeNav>
		<ListContainer></ListContainer>
		<Recommend></Recommend>
		<Rank></Rank>
		<Like></Like>
		<Floor v-for="floor in floorList" :floor="floor" :key="floor.id"></Floor>
		<Brand></Brand>
	</div>
</template>

<script>
import { mapState } from 'vuex'

import ListContainer from './ListContainer'
import Recommend from './Recommend'
import Rank from './Rank'
import Like from './Like'
import Floor from './Floor'
import Brand from './Brand'

export default {
	name: 'Home',
	components: {
		ListContainer,
		Recommend,
		Rank,
		Like,
		Floor,
		Brand
	},
	computed: {
		...mapState('home', ['floorList'])
	},
	mounted () {
		this.$store.dispatch('home/floorList')
	},
}
</script>

<style lang="less" scoped></style>
