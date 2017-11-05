<style lang="sass" scoped>
	.toast {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		height: 44px;
		padding: 0 16px;
		box-sizing: border-box;
		line-height: 44px;
		border-radius: 10px;
		background-color: rgba(0, 0, 0, .6);
		p {
			padding-left: 30px;
			font-size: 12px;
			color: #fff;
		}
		.icon {
			position: absolute;
			top: 12px;
			left: 16px;
			width: 20px;
			height: 20px;
			border-radius: 50%;
			border: 1px solid #2d8a31;
			line-height: 20px;
			text-align: center;
			color: #2d8a31;
		}
	}

	.fade-enter-active, .fade-leave-active {
  		transition: opacity .5s
	}

	.fade-enter, .fade-leave-to {
	  opacity: 0
	}
</style>

<template>
	<transition name="fade">
		<div class="toast" v-show="isShowToast">
			<span class="icon">√</span>
			<p class="title">{{ title }}</p>
		</div>
	</transition>
</template>

<script>
export default {
	name: 'Toast',
	data() {
		return {
			isShowToast: false
		}
	},
	props: ['title', 'showToast', 'duration', 'callback'],
	watch: {
		showToast() {
			this.isShowToast = this.showToast
			if(this.showToast) {
				setTimeout(() => {
					this.isShowToast = false
					if (this.callback) this.callback()
				}, this.duration ? this.duration : 1500)
			}
		}
	}
}
</script>