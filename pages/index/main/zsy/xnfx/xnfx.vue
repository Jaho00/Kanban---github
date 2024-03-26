<template>
	<view class="container-fluid setfull no-gutters">
		<dv-full-screen-container>
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
			<view class="row no-gutters" style="height: 60%;">
				<view class="allsize" id="digit">

				</view>
			</view>
		</dv-full-screen-container>
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
			setTimeout(() => {
				this.test();
			}, 1000);

		},
		methods: {
			test() {
				const _self = this;
				let dayChart = this.$echarts.init(document.getElementById("digit"), 'dark');
				var data = [];
				var dataCount1 = 40;
				var dataCount2 = 20;
				var dataCount3 = 30;
				var startTime = +new Date(new Date().toLocaleDateString());
				var endTime = startTime + (24 * 60 * 60 * 1000 - 1)
				var baseTime1 = startTime;
				var baseTime2 = startTime;
				var baseTime3 = startTime;
				console.log(`开始时间：${startTime}`)
				var categories = ['机台A', '机台B', '机台C'];
				var types = [{
						name: '停机',
						color: '#7b9ce1'
					},
					{
						name: '待机',
						color: '#bd6d6c'
					},
					{
						name: '运行',
						color: '#75d874'
					},
					{
						name: '故障',
						color: '#e0bc78'
					},
				];
				for (var i = 0; i < dataCount1; i++) {
					var typeItem = types[Math.round(Math.random() * (types.length - 1))];
					var duration = Math.round(Math.random() * 10000);
					data.push({
						name: typeItem.name,
						value: [
							0,
							baseTime1,
							baseTime1 += duration,
							duration
						],
						itemStyle: {
							normal: {
								color: typeItem.color
							}
						}
					});
				}
				for (var i = 0; i < dataCount2; i++) {
					var typeItem = types[Math.round(Math.random() * (types.length - 1))];
					var duration = Math.round(Math.random() * 10000);
					data.push({
						name: typeItem.name,
						value: [
							1,
							baseTime2,
							baseTime2 += duration,
							duration
						],
						itemStyle: {
							normal: {
								color: typeItem.color
							}
						}
					});
				}
				for (var i = 0; i < dataCount3; i++) {
					var typeItem = types[Math.round(Math.random() * (types.length - 1))];
					var duration = Math.round(Math.random() * 10000);
					data.push({
						name: typeItem.name,
						value: [
							2,
							baseTime3,
							baseTime3 += duration,
							duration
						],
						itemStyle: {
							normal: {
								color: typeItem.color
							}
						}
					});
				}
				console.log(`最长时间: ${data[89].value[2]}`)

				function renderItem(params, api) {
					var categoryIndex = api.value(0);
					var start = api.coord([api.value(1), categoryIndex]);
					var end = api.coord([api.value(2), categoryIndex]);
					var height = api.size([0, 1])[1] * 0.6;
					var rectShape = _self.$echarts.graphic.clipRectByRect({
						x: start[0],
						y: start[1] - height / 2,
						width: end[0] - start[0],
						height: height
					}, {
						x: params.coordSys.x,
						y: params.coordSys.y,
						width: params.coordSys.width,
						height: params.coordSys.height
					});
					return rectShape && {
						type: 'rect',
						transition: ['shape'],
						shape: rectShape,
						style: api.style()
					};
				}


				var option = {
					tooltip: {
						formatter: function(params) {
							return params.marker + params.name + ': ' + params.value[3] + ' ms';
						}
					},
					title: {
						text: '设备状态',
						left: 'center'
					},
					dataZoom: [{
						type: 'slider',
						filterMode: 'weakFilter',
						showDataShadow: false,
						top: 400,
						labelFormatter: ''
					}, {
						type: 'inside',
						filterMode: 'weakFilter'
					}],
					grid: {
						height: 300
					},
					xAxis: {
						min: startTime,
						scale: true,
						axisLabel: {
							formatter: function(val) {
								console.log(val);
								var a = new Date(val).getHours();
								var b = new Date(val).getMinutes();
								var c = new Date(val).getSeconds();
								a = a < 10 ? "0" + a : a;
								b = b < 10 ? "0" + b : b;
								c = c < 10 ? "0" + c : c;
								// return Math.max(0, val - startTime) + ' ms';

								return `${a}:${b}:${c}`
							}
						}
					},
					yAxis: {
						data: categories
					},
					series: [{
						type: 'custom',
						renderItem: renderItem,
						itemStyle: {
							opacity: 0.8
						},
						encode: {
							x: [1, 2],
							y: 0
						},
						data: data
					}]
				};
				dayChart.setOption(option);
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
</style>
