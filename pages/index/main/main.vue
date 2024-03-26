<template>
	<view class="container-fluid full" :style="{backgroundColor: bkc}">
		 <dv-full-screen-container>
		<view class="">
			<u-toast ref="uToast" />
		</view>
		<view class="full">
			<swiper class="allScrean" :circular="circular" :indicator-color="indicatorColor" :indicator-active-color="indicatorActiveColor" :indicator-dots="indicatorDots" :autoplay="autoplay" 
				:interval="interval" :duration="duration" @change="changItem" >
				 <swiper-item v-for="item in listData" :key="item.FID">
					<view class="swiper-item setheight">
						<iframe :src="item.FURL" width="100%" height="100%" style="border: 0!important;overflow-y: hidden;"></iframe>
					</view>
				</swiper-item>
			</swiper>
		</view>
			</dv-full-screen-container>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				indicatorDots: true,  //是否显示小圆点
				indicatorColor: "#ffffff",
				bottomRight:'bottomRight',
				indicatorActiveColor: "#F40",
				autoplay: true,			//是否自动播放
				interval: 60000,			//自动间隔时间
				duration: 1000,				//滑动动画时长
				circular: true,  		//衔接滑动
				listData:[],
				showIndex: 0
			}
		},
		onLoad() {
			this.bkc = '#FFFFFF';
			uni.request({
				url: this.basePath +'/APP/sysLogin!getMainFunctionForUser.action',
				data: {
					zhid: uni.getStorageSync('UserInfo').ZHID,
					usercode: uni.getStorageSync('UserInfo').USERCODE,
					operaterm: 'TV'
				},
				method: 'POST',
				header: {
					'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
				},
				success:(res)=>{
					console.log("main",res)
					if(res.data.IsSuccess){
						res.data.Data.forEach((ele,index)=>{
							ele.FLOGO = ele.FLOGO.split('*')[1];
							ele.FURL = this.basePath + ele.FURL+ '?ele='+ encodeURIComponent(JSON.stringify(ele));
							 // ele.FURL =  'http://localhost:8181' + ele.FURL + '?ele='+ encodeURIComponent(JSON.stringify(ele));	
						});
						this.listData = res.data.Data;
					}else{
						this.$refs.uToast.show({
							title: res.data.message,
							type: 'error',
							duration: '2300'
						})
					}
				},
			});
		},
		methods: {
			changItem(event){
				this.showIndex = event.detail.current;
			},
		}
	}
</script>

<style>
	.full{
		  width: 100%;
		    position: absolute;
			top: 0;
		    bottom: 0;
		    left: 0px;
		    margin: 0;
	}
	.allScrean{
		display: block;
		height: 100%;
	}
	.setheight{
		height: 100%;
	}
</style>
