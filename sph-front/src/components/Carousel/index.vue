<template>
	<div class="swiper-container" :ref="refName">
		<div class="swiper-wrapper">
			<div class="swiper-slide" v-for="carousel in carouselList" :key="carousel.id">
				<img :src="carousel.imgUrl">
			</div>
		</div>
		<!-- 如果需要分页器 -->
		<div class="swiper-pagination"></div>

		<!-- 如果需要导航按钮 -->
		<div class="swiper-button-prev"></div>
		<div class="swiper-button-next"></div>
	</div>
</template>

<script>
import Swiper from 'swiper'

export default {
	name: 'Carousel',
	props: ['carouselList', 'refName'],
	watch: {
		carouselList: {
			immediate: true,
			handler () {
				this.$nextTick(() => {
					const mySwiper = new Swiper(this.$refs[this.refName], {
						loop: true,
						pagination: {
							el: ".swiper-pagination",
							type: "bullets",
							clickable: true,
						},
						autoplay: {
							delay: 1000,
							stopOnLastSlide: true,
							disableOnInteraction: false,
						},
						navigation: {
							nextEl: ".swiper-button-next",
							prevEl: ".swiper-button-prev",
						},
					})

					mySwiper.el.onmouseover = function () {
						mySwiper.autoplay.stop()
					}

					mySwiper.el.onmouseout = function () {
						mySwiper.autoplay.start()
					}
				})
			}
		}
	}
}
</script>

<style lang="less" scoped></style>