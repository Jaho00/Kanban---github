<template>
	<view class="container-fluid setfull">
		<view class="row align-items-center" style="background-color: #000000;color: #ffffff;" v-if="isToastShow == 'noToast'">
			<view class="col row align-items-center align-self-center">
				<image :src="LOGO" mode="scaleToFill" style="width: 50px;height: 50px;margin-left: 5%;"></image>
				<!-- <dv-border-box-8 style="width:49%;height:50px;font-size: .2rem;margin-left: 25%;" v-show="titleObj.FCOMPANY == '' ? false : true">{{ titleObj.FCOMPANY }}</dv-border-box-8> -->
			</view>
			<view class="col-6 pageTitle row justify-content-center" style="font-size: .5rem;text-align: center;">
				<dv-decoration-8 class="titleDec" />
				<text style="margin: 0 5%;">{{ titleObj.FTITLE }}</text>
				<dv-decoration-8 :reverse="true" class="titleDec" />
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
				<!-- <dv-decoration-8 style="width:70px;height:50px;" /> -->
				<text style="margin: 0 5%;">{{ titleObj.FTITLE }}</text>
				<!-- <dv-decoration-8 :reverse="true" style="width:70px;height:50px;" /> -->
			</view>
			<view class="col titltTime row align-items-center">
				<u-notice-bar class="toastTitle" mode="horizontal" :volume-icon="false" :volume-size="20" :speed="25" :font-size="20"
				 :padding="0" type='none' :is-circular="true" :list="newtoaList" bg-color='#000000' color='#ffffff'></u-notice-bar>
			</view>
		</view>
		<!-- 内容区 -->
		<view class="row no-gutters allsize" style="overflow: hidden;">
			<view class="col-9" style="height: 100%;">
				<view class="row half-box addbg justify-content-center">
					<text class="col" style="color: #FFFFFF;font-size: .25rem;text-align: center;">每小时生产数量</text>
					<view class="col-12" style="height: 90%;">
						<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts yddiv allsize"></canvas>
					</view>
				</view>
				<view class="row half-box addbg">
					<table class="table table-striped">
						<thead>
							<tr>
								<th>工单号</th>
								<th>客户名称</th>
								<th>产品名称</th>
								<th>产品规格</th>
								<th>拉线</th>
								<th>工单数</th>
								<th>完成数</th>
								<th>完成率</th>
								<th>良品数</th>
								<th>合格率</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>WS20180101</td>
								<td>客户一</td>
								<td>大师傅西施煲</td>
								<td>750W</td>
								<td>1线</td>
								<td>3000</td>
								<td>2700</td>
								<td>
									<div class="progress">
										<div class="progress-bar" style="width:70%"></div>
									</div>
								</td>
								<td>2500</td>
								<td>
									<div class="progress">
										<div class="progress-bar" style="width:70%"></div>
									</div>
								</td>
							</tr>
							<tr>
								<td>WS20180101</td>
								<td>客户二</td>
								<td>大师傅西施煲</td>
								<td>750W</td>
								<td>1线</td>
								<td>3000</td>
								<td>2700</td>
								<td>
									<div class="progress">
										<div class="progress-bar" style="width:70%"></div>
									</div>
								</td>
								<td>2500</td>
								<td>
									<div class="progress">
										<div class="progress-bar" style="width:70%"></div>
									</div>
								</td>
							</tr>
							<tr>
								<td>WS20180101</td>
								<td>客户三</td>
								<td>大师傅西施煲</td>
								<td>750W</td>
								<td>1线</td>
								<td>3000</td>
								<td>2700</td>
								<td>
									<div class="progress">
										<div class="progress-bar" style="width:70%"></div>
									</div>
								</td>
								<td>2500</td>
								<td>
									<div class="progress">
										<div class="progress-bar" style="width:70%"></div>
									</div>
								</td>
							</tr>
							<tr>
								<td>WS20180101</td>
								<td>客户四</td>
								<td>大师傅西施煲</td>
								<td>750W</td>
								<td>1线</td>
								<td>3000</td>
								<td>2700</td>
								<td>
									<div class="progress">
										<div class="progress-bar" style="width:70%"></div>
									</div>
								</td>
								<td>2500</td>
								<td>
									<div class="progress">
										<div class="progress-bar" style="width:70%"></div>
									</div>
								</td>
							</tr>
							<tr>
								<td>WS20180101</td>
								<td>客户五</td>
								<td>大师傅西施煲</td>
								<td>750W</td>
								<td>1线</td>
								<td>3000</td>
								<td>2700</td>
								<td>
									<div class="progress">
										<div class="progress-bar" style="width:70%"></div>
									</div>
								</td>
								<td>2500</td>
								<td>
									<div class="progress">
										<div class="progress-bar" style="width:70%"></div>
									</div>
								</td>
							</tr>
							<tr>
								<td>WS20180101</td>
								<td>客户六</td>
								<td>大师傅西施煲</td>
								<td>750W</td>
								<td>1线</td>
								<td>3000</td>
								<td>2700</td>
								<td>
									<div class="progress">
										<div class="progress-bar" style="width:70%"></div>
									</div>
								</td>
								<td>2500</td>
								<td>
									<div class="progress">
										<div class="progress-bar" style="width:70%"></div>
									</div>
								</td>
							</tr>

						</tbody>
					</table>
				</view>
			</view>
			<view class="col-3">
				<view class="row no-gutters justify-content-center addbg" style="padding: .1rem;">
					<text style="color: #FFFFFF;font-size: .25rem;">当前产品信息</text>
				</view>
				<table class="fsui-table2 text-left addbg">
					<tbody>
						<tr>
							<td rowspan="3" class="text-center">
								<img src="http://www.huaco908.com/imageRepository/0ce40504-d93b-487f-875b-b59cb18194b5.jpg" alt="" style="width:1rem;">
							</td>
							<td>产品名称：</td>
							<td>大师傅西施煲</td>
						</tr>
						<tr>
							<td>产品规格：</td>
							<td>12*15*14</td>
						</tr>
					</tbody>
				</table>
				<view class="row no-gutters mt-1 justify-content-center addbg" style="padding: .1rem;">
					<text style="color: #FFFFFF;font-size: .25rem;">员工信息</text>
				</view>
				<table class="fsui-table2 text-left mb-2 addbg">
					<tbody>
						<tr>
							<td rowspan="4" class="text-center">
								<img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2326667234,2232513640&fm=26&gp=0.jpg" alt=""
								 style="height:1.8rem;">
							</td>
							<td>职称：</td>
							<td>组长</td>
						</tr>
						<tr>
							<td>姓名：</td>
							<td>王武良</td>
						</tr>
						<tr>
							<td>车间线别：</td>
							<td>总装一线</td>
						</tr>
						<tr>
							<td>工位：</td>
							<td>G001</td>
						</tr>
					</tbody>
				</table>
				<table class="fsui-table2 text-left mb-2 addbg">
					<tbody>
						<tr>
							<td rowspan="4" class="text-center">
								<img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1985670688,3720826420&fm=26&gp=0.jpg" alt=""
								 style="height:1.8rem;">
							</td>
							<td>职称：</td>
							<td>物料员</td>
						</tr>
						<tr>
							<td>姓名：</td>
							<td>李春桃</td>
						</tr>
						<tr>
							<td>车间线别：</td>
							<td>总装一线</td>
						</tr>
						<tr>
							<td>工位：</td>
							<td>G002</td>
						</tr>
					</tbody>
				</table>
				<table class="fsui-table2 text-left mb-2 addbg">
					<tbody>
						<tr>
							<td rowspan="4" class="text-center">
								<img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1315333203,4030138572&fm=26&gp=0.jpg" alt=""
								 style="height:1.8rem;">
							</td>
							<td>职位：</td>
							<td>机修</td>
						</tr>
						<tr>
							<td>姓名：</td>
							<td>张明</td>
						</tr>
						<tr>
							<td>车间线别：</td>
							<td>总装一线</td>
						</tr>
						<tr>
							<td>工位：</td>
							<td>G003</td>
						</tr>
					</tbody>
				</table>
			</view>
		</view>

	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js'; //引入ucharts图表组件
	var _self = null;
	var getINFOtimer = null;
	var canvaLineA = null;
	export default {
		data() {
			return {
				toastList: [], // 消息列表
				toastString: "", //消息字符串
				isToastShow: 'noToast',
				nowTime: "",
				nowDay: "",
				titleObj: {},
				LOGO: "",
				yddiv: '',
			}
		},
		onLoad(option) {
			_self = this;
			//获取设备信息
			const res = uni.getSystemInfoSync();
			this.sb = res.windowWidth;
			try {
				//从路径中获取看板标题等信息
				const item = JSON.parse(decodeURIComponent(option.ele));
				this.titleObj = item;
			} catch (e) {
				//TODO handle the exception
				//如果没有title信息，则不显示

			}

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
			// this.DayPZJKoption.data = this.DayPZJKoption.data.concat(this.DayPZJKoption.data.slice(0,10));
		},
		onHide() {
			clearInterval(getINFOtimer);
		},
		created() {
			getINFOtimer = setInterval(() => {

			}, (this.titleObj.FREFTIME * 1000 || 30000));
		},
		mounted() {
			var md = {
				"categories": ['8:00-9:00', '9:00-10:00', '10:00-11:00', '11:00-12:00','12:00-13:00', '13:00-14:00',  '14:00-15:00', '15:00-16:00', '16:00-17:00', '17:00-18:00'],
				"series": [{
					"name": "当前批次",
					"data": [10, 52, 200, 334, 390, 330, 220,260,198,205],
					textColor: '#ffffff'
				}]
			}
			this.drawmd("canvasLineA", md);
		},
		methods: {
			drawmd(canvasId, chartData) {
				setTimeout(() => {
					let ydDIV = uni.createSelectorQuery().in(this).select(".yddiv");
					ydDIV.fields({
						size: true,
						scrollOffset: true
					}, data => {
						_self.ydDIV = {
							height: data.height,
							width: data.width
						};
						canvaLineA = new uCharts({
							$this: _self,
							canvasId: canvasId,
							type: 'column',
							legend: {
								show: true,
								fontColor: '#ffffff'
							},
							fontSize: 11,
							background: '#FFFFFF',
							pixelRatio: 1,
							animation: true,
							// rotate:true,// 用来控制横向或侧向
							categories: chartData.categories,
							series: chartData.series,
							colors: ['#3FB1E3', '#6BE6C1'],
							xAxis: {
								type: 'grid',
								gridColor: '#ffffff',
								gridType: 'dash',
								dashLength: 8,
								fontColor: '#ffffff',
								disableGrid: true,
							},
							yAxis: {
								gridType: 'solid',
								gridColor: '#cccccc',
								splitNumber: 5,
								data: [{
									fontColor: '#FFFFFF',
									disabled: false,
								}],
							},
							width: _self.ydDIV.width,
							height: _self.ydDIV.height,
							extra: {
								column: {
									type: 'group',
									width: 80, //每个柱子的宽度
									meter: {
										//这个是外层边框的宽度
										border: 4,
										//这个是内部填充颜色
										fillColor: '#E5FDC3'
									}
								}
							}
						});
					}).exec();
				}, 300);
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
		background-image: url(../../../../components/datav/img/bg.png);
		background-size: 100% 100%;
		overflow: hidden;
		color: #FFFFFF;
	}

	.dele-margin {
		margin: 0;
	}

	.add-margin {
		margin: 0 10px;
	}

	.dele-padding {
		padding: 0;
	}

	.titltTime {
		font-size: .2rem;
		text-align: right;
	}

	.charttitle {
		font-size: .3rem !important;
		color: #FFFFFF;
	}

	.tdSize {
		font-size: .3rem;
	}

	.toastTitle {
		font-size: .3rem;
		width: 100%;
	}

	.titleDec {
		width: 150px;
		height: 50px;
	}

	.Content-box {
		color: rgba(148, 206, 244, 0.8);
		text-align: center;
	}

	.addbg {
		background: rgba(28, 78, 151, 0.2);
		;
	}

	.allsize {
		width: 100%;
		height: 100%;
	}

	.half-box {
		height: 50%;
		margin: 15px 15px;
		overflow: scroll;
	}

	/* 下方表格样式 */
	.table {
		border-collapse: collapse;
		text-align: left;
		line-height: 1.5;
		background: transparent;
		color: #FFFFFF;
	}

	.table thead tr th {
		border-top: 1px solid #0a57a5;
		border-bottom: 1px solid #0a57a5;
		background: rgba(10, 87, 165, 0.3);
		font-size: 0.2rem;
		padding: 0.1rem;
		word-break: break-all;

	}

	.table tbody tr {
		font-size: 0.2rem;
	}

	.table tbody tr td {
		padding: 0.1rem;
		word-break: break-all;
		border-top: 1px solid #0a57a5;
		color: #fafafa;
		vertical-align: middle;
	}

	.progress {
		overflow: hidden;
		height: 0.2rem;
		min-height: 0.12rem;
		font-size: 0.1rem;
	}

	/* 表格样式到这结束 */

	/* 左侧表格样式 */
	.fsui-table2 {
		width: 100%;
		table-layout: fixed;
		border-collapse: collapse;
		text-align: center;
		font-size: 0.2rem;
	}

	.fsui-table2 td {
		border: 1px solid #044c8b;
		padding: 0.1rem 0.15rem;
	}
</style>
