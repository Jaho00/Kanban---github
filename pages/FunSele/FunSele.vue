<template>
	<view class="container-fluid full" :style="{backgroundColor: bkc}">
		<view class="row align-items-center" style="background-color: #052D84;color: #ffffff;">
			<view class="col align-self-center" style="font-size: .25rem;" @click="returnBack">
				<image src="../../static/img/back.png" mode="" style="width: 7rpx;height: 7rpx;"></image>
				返回</view> 
			<view class="col pageTitle align-self-center">
					<text>工作台</text>
			</view>
			<view class="col titltTime"></view>
		</view>
		<view class="menu_item" style="margin: 10px 20px;font-size: 24px;display: inline-block;" v-for="item in listData" :key="item.FID" @click="openPage(item)">
			<view class="row align-items-center justify-content-center img-content">
				<image class="img-self col-9" :src="Objpath+item.FICON" mode=""></image>
			</view>
			<text :style="{fontSize: item.FFONTSIZE+'px',fontWeight:'bold'}">{{ item.FNAME }}</text>
		</view>
	</view>
</template>

<script>
	import globalData from '../../util/golbalData.js'; 
	export default {
		data() {
			return {
				listData:[],
				bkc:""
			}
		},
		computed:{
			Objpath(){return this.basePath + '/APP/images/';}
		},
		methods: {
			openPage(item){
				globalData.TitleObj = item;
				console.log(item.FURL);
				uni.navigateTo({
					url:item.FURL+'?code='+item.FCODE
				})
			},
			returnBack() {
				uni.redirectTo({
					url: '/pages/index/index'
				});
			},
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
					if(res.data.IsSuccess){
						this.listData = res.data.Data;
					}
				},
			});
		}
	}
</script>

<style>
	.uni-page-wrapper{
		background-color: #FFFFFF!important;
	}
	html, body{
		background-color: #FFFFFF;
	}
	.full{
		  width: 100%;
		    position: absolute;
			top: 0;
		    bottom: 5px;
		    left: 0px;
		    margin: 0;
	}
	/* 顶部样式 */
	.pageTitle {
		text-align: center;
		font-size: .4rem;
	}
	
	.titltTime {
		text-align: right;
		font-size: .4rem;
	}
.menu_item{
    width: 250px;
    display: inline-block;
    text-align: center;
}
.img-content{
    width: 80%;
    height: 150px;
    margin: 0 auto;
	/* background-color: #1370FB; */
}
.img-self{
    width: 100%;
    height: 120px;
}
</style>
