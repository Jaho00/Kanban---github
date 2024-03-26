<template>
	<view class="container-fluid setfull no-gutters">
			<view class="row align-items-center" style="background-color: #1890FF;color: #ffffff;" v-if="isToastShow == 'noToast'">
				<view class="col row align-items-center align-self-center">
					<image :src="LOGO" mode="aspectFit" style="width: 100px;height: 50px;margin-left: 5%;"></image>
					<text style="margin-left:10%;font-size: .2rem;line-height: 2.5;" v-show="titleObj.FCOMPANY == '' ? false : true">{{ titleObj.FCOMPANY }}</text>

				</view>
				<view class="col-4 pageTitle row justify-content-center" style="font-size: .4rem;text-align: center;">
					<text style="margin: 0 5%;">{{ titleObj.FTITLE }}</text>
				</view>
				<view class="col titltTime row align-items-center">
					<view class="col-6" style="width: 100%;">
						<!-- <dv-border-box-2 style="width:100%;height:50px;" v-show="titleObj.FSYSTEM == '' ? false : true">{{ titleObj.FSYSTEM }}</dv-border-box-2> -->
					</view>
					<view class="col-6">
						<text style="display: block;text-align: center;">{{ nowDay }}</text>
						<text style="display: block;text-align: center;">{{ nowTime }}</text>
					</view>
				</view>
			</view>
			<!-- 有消息的样式 -->
			<view class="row align-items-center" style="background-color: #000000;color: #ffffff;" v-else>
				<view class="col-2 row align-items-center align-self-center justify-content-around">
					<image :src="LOGO" mode="scaleToFill" style="width: 65px;height: 65px;margin-left: 5%;"></image>
				</view>
				<view class="col-3 pageTitle row justify-content-center" style="font-size: .5rem;text-align: center;">
					<text style="margin: 0 5%;">{{ titleObj.FTITLE }}</text>
				</view>
				<view class="col titltTime row align-items-center">
					<u-notice-bar class="toastTitle" mode="horizontal" :volume-icon="false" :volume-size="20" :speed="25" :font-size="20"
					 :padding="0" type='none' :is-circular="true" :list="newtoaList" bg-color='#000000' color='#ffffff'></u-notice-bar>
				</view>
			</view>
			<view class="row no-gutters justify-content-center" style="height: 5%;">
				<view class="col-6 deletepadding row no-gutters align-content-around justify-content-center" style="width: 100%;">
					<view class="col-2 deletepadding">
						<view class="statu-btn" style="margin: 0 5px;background-color: #75d874;">
							<image src="../../../../../static/img/领料.png" mode="scaleToFill" class="ic-sb"></image>
							<text style="margin: 0 5px;">开机</text>
						</view>
					</view>
					<view class="col-2 deletepadding">
						<view class="statu-btn" style="margin: 0 5px;background-color: #bd6d6c;">
							<image src="../../../../../static/img/领料.png" mode="scaleToFill" class="ic-sb"></image>
							<text style="margin: 0 5px;">待机</text>
						</view>
					</view>
					<view class="col-2 deletepadding">
						<view class="statu-btn" style="margin: 0 5px;background-color: #7b9ce1;">
							<image src="../../../../../static/img/领料.png" mode="scaleToFill" class="ic-sb"></image>
							<text style="margin: 0 5px;">停机</text>
						</view>
					</view>
					<view class="col-2 deletepadding">
						<view class="statu-btn" style="margin: 0 5px;background-color: #e0bc78;">
							<image src="../../../../../static/img/领料.png" mode="scaleToFill" class="ic-sb"></image>
							<text style="margin: 0 5px;">故障</text>
						</view>
					</view>
				</view>
			</view>
			<view class="clearfix" style="height: 37%;width: 30%;">
				<!-- <scroll-view class="scroll-view_H" scroll-x="true">
					<view class="scroll-view-item_H">
						<view class="time-concent">
							<text>01:00</text>
						</view>
						<view class="time-concent">
							<text>02:00</text>
						</view>
						<view class="time-concent">
							<text>03:00</text>
						</view>
						<view class="time-concent">
							<text>04:00</text>
						</view>
						<view class="time-concent">
							<text>05:00</text>
						</view>
						<view class="time-concent">
							<text>06:00</text>
						</view>
						<view class="time-concent">
							<text>07:00</text>
						</view>
						<view class="time-concent">
							<text>08:00</text>
						</view>
						<view class="time-concent">
							<text>09:00</text>
						</view>
						<view class="time-concent">
							<text>10:00</text>
						</view>
						<view class="time-concent">
							<text>11:00</text>
						</view>
						<view class="time-concent">
							<text>12:00</text>
						</view>
					</view>
				</scroll-view> -->
				<scroll-view class="scroll-view_H" scroll-x="true">
					<view id="demo1" class="scroll-view-item_H uni-bg-red">A</view>
					<view id="demo2" class="scroll-view-item_H uni-bg-green">B</view>
					<view id="demo3" class="scroll-view-item_H uni-bg-blue">C</view>
				</scroll-view>
			</view>
			<view class="uni-padding-wrap uni-common-mt clearfix">
				<view>
					<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll">
						<view id="demo1" class="scroll-view-item_H uni-bg-red">A</view>
						<view id="demo2" class="scroll-view-item_H uni-bg-green">B</view>
						<view id="demo3" class="scroll-view-item_H uni-bg-blue">C</view>
					</scroll-view>
				</view>
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				titleObj: {},
				LOGO: "",
				nowTime: "",
				nowDay: "",
				toastList: [], // 消息列表
				toastString: "", //消息字符串
				isToastShow: 'noToast',
				isfirst: true,
			}
		},
		onLoad(option) {
			//从路径中获取看板标题等信息
			const item = JSON.parse(decodeURIComponent(option.ele));
			this.titleObj = item;
			try {
				this.LOGO = this.basePath + item.FLOGO.split('*')[0];
			} catch (e) {
				//TODO handle the exception
				this.LOGO = "";
			}
			setInterval(() => {
				var time = new Date();
				var month = time.getMonth() + 1;
				var hours = time.getHours();
				var seconds = time.getSeconds();
				var minutes = time.getMinutes();
				//判断是否在前面加0
				function getNow(s) {
					return s < 10 ? '0' + s : s;
				}
				this.nowDay = time.getFullYear() + '年' + month + '月' + time.getDate() + '日';
				this.nowTime = getNow(hours) + ':' + getNow(minutes) + ":" + getNow(seconds);
			}, 1000);

		},
		mounted() {
			
		},
		methods: {
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
		}
	}
</script>

<style>
	.setfull {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		background-image: url(../../../../../components/datav/img/bg.png);
		background-size: 100% 100%;
	}

	.addbg {
		background-image: url(../../../../../static/img/titleBG.jpg);
		background-size: 100% 100%;
	}

	.titltTime {
		font-size: .2rem;
		text-align: right;
	}

	.charttitle {
		font-size: .2rem !important;
		color: #FFFFFF;
		overflow: hidden;
	}

	.dele-padding {
		padding: 0;
	}

	.allsize {
		width: 100%;
		height: 100%;
	}
	.statu-btn{
		padding: 5px 0px;
		line-height: 1.5;
		font-size: .19rem;
		text-align: center;
		border-radius: 10%;
	}
	.ic-sb{
		width: 24px;
		height: 24px;
		vertical-align: sub;
	}
	.time-concent{
		width: 16.7%;
		display: inline-block;
	}
	/* .scroll-view_H{
		white-space: nowrap;
		width: 100%;
		color: #FFFFFF;
		height: 50%;
	}
	.scroll-view-item_H{
		display: inline-block;
		width: 100%;
		height: 100%;
		text-align: center;
		font-size: 18px;
	} */
	.uni-bg-red {
	    background: #f76260;
	    color: #fff;
	}
	.uni-bg-green {
	    background: #09bb07;
	    color: #fff;
	}
	.uni-bg-blue {
	    background: #007aff;
	    color: #fff;
	}
	.uni-padding-wrap {
		width: 345px;
		padding: 0 15px;
	}
	
	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
	}
	.scroll-view-item {
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
		font-size: 36rpx;
	}
	
	.scroll-view-item_H {
		display: inline-block;
		width: 100%;
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
		font-size: 36rpx;
	}
</style>
