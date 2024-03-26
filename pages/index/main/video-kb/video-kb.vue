<template>
	<view class="setfull">
		 <dv-border-box-1 class="main-container">
		<video src="rtsp://admin:123654@192.168.8.188:554/stream1" :autoplay='true' class="row no-gutters col-6 videoContent" controls></video>
		</dv-border-box-1>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.setfull{
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		background-image: url(../../../../components/datav/img/bg.png);
		background-size: 100% 100%;
	}
	.videoContent{
		height: 50%;
	}
	.main-container .border{
		border: 0px!important;
	}
</style>
