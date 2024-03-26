<template>
	<view class="container-fluid setfull no-gutters">

		<view class="row align-items-center" style="color: #ffffff;" v-if="isToastShow == 'noToast'">
			<view class="col row align-items-center align-self-center">
				<image :src="item.LOGO" mode="aspectFit" style="width: 100px;height: 40px;margin-left: 5%;"></image>
				<text style="margin-left:10%;height:50px;font-size: .2rem;line-height: 2.5;"
					v-show="titleObj.FCOMPANY == '' ? false : true">{{ titleObj.FCOMPANY }}</text>

			</view>
			<view class="col-3 pageTitle row justify-content-center" style="font-size: .4rem;text-align: center;">
				<text style="margin: 0 5%;">机台实时看板</text>
				<!-- <text style="margin: 0 5%;">注塑车间看板</text> -->
			</view>
			<view class="col-3 titltTime row justify-content-end">
				<view class="col-9 deletepadding row no-gutters justify-content-end" style="width: 100%;">
					<view class="col deletepadding">
						<!-- <view class="statu-btn" style="margin: 0 5px;background-color: rgba(39, 185, 75, 0.75);">
								<image src="../../../../../static/img/领料.png" mode="scaleToFill" class="ic-sb"></image>
								<text style="margin: 0 5px;">生产工艺</text>
							</view> -->
					</view>
					<view class="col-6 deletepadding">
						<view class="statu-btn" style="background-color: rgba(24, 57, 104, 0.6);" @click="backBtn">
							<image src="../../../../../static/img/领料.png" mode="scaleToFill" class="ic-sb"></image>
							<text style="margin: 0 5px;">返回</text>
						</view>
					</view>
				</view>
			</view>
			<view class="col-2 titltTime row align-items-center">
				<view class="col-1 deletepadding row no-gutters align-content-around" style="width: 100%;">

				</view>
				<view class="col-11">
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
				<u-notice-bar class="toastTitle" mode="horizontal" :volume-icon="false" :volume-size="20" :speed="25"
					:font-size="20" :padding="0" type='none' :is-circular="true" :list="newtoaList" bg-color='#000000'
					color='#ffffff'></u-notice-bar>
			</view>
		</view>
		<!-- 内容区 -->
		<view class="row addpadding tableContent no-gutters" style="overflow: hidden;margin-top: .5%;">
			<!-- 概览部分 -->
			<view class="col-2 wrap-line no-gutters">
				<view class="row no-gutters col-12 time-text justify-content-center" style="height: 4%;">
					<text>设备综合指标</text>
				</view>
				<view class="col-12 no-gutters rate-content">
					<view class="col-12 row no-gutters justify-content-center">
						<text class="titleText">综合效率(OEE)</text>
					</view>
					<view class="allsize" id="zhxl">

					</view>
				</view>
				<view class="col-12 no-gutters rate-content">
					<view class="col-12 row no-gutters justify-content-center">
						<text class="titleText">良品率(Quality)</text>
					</view>
					<view class="allsize" id="lpl">

					</view>
				</view>
				<view class="col-12 no-gutters rate-content">
					<view class="col-12 row no-gutters justify-content-center">
						<text class="titleText">性能指数(Performance)</text>
					</view>
					<view class="allsize" id="xnjd">

					</view>
				</view>
				<view class="col-12 no-gutters rate-content">
					<view class="col-12 row no-gutters justify-content-center">
						<text class="titleText">可用率(Availability)</text>
					</view>
					<view class="allsize" id="sjjd">

					</view>
				</view>
			</view>
			<!-- 中间区域 -->
			<view class="col-5 addpadding wrap-line no-gutters row">
				<view class="col-12" style="height: 100%;">
					<view class="row no-gutters devinfo">
						<view class="col-6 right-border">
							<view style="height: 50%;padding: 0 10px;">
								<image class="imgsize" src="../../../../../static/img/机床.png" mode="aspectFit"></image>
							</view>
							<view class="row no-gutters" style="height: 50%;">
								<view class="col-12 row no-gutters">
									<text class="titleText">当前设备运行情况</text>
								</view>
								<view class="col-12 row no-gutters justify-content-center align-self-center">
									<button type="default"
										class="statusBtn">{{ item.SY_STATUS == '1' ? '待机' : item.SY_STATUS == '2' ? '生产' : '停机' }}</button>
								</view>
							</view>
						</view>
						<view class="col-6">
							<view class="col-12 row no-gutters">
								<text class="titleText">{{ devInfo.FNAME }}</text>
							</view>
							<view class="col-12 row no-gutters"
								style="border-bottom: 1px solid #17A281;padding-bottom: 1%;">
								<view class="col-12 row no-gutters">
									<text class="smallText">设备编码: {{ devInfo.FCODE }}</text>
								</view>

							</view>
							<!-- <view class="col-12 row no-gutters" style="margin-top: 2%;">
									<view class="col-6 row no-gutters justify-content-around" style="background-color: #004A36;">
										<text class="smallText">当日模次:{{ item.BENUM_TODAY }}</text>
									</view>
								</view> -->
							<view class="col-12 row no-gutters" style="margin-top: 2%;">
								<view class="row col-12 no-gutters" style="border: 1px solid #17A281;">
									<view class="col-12 row no-gutters info_text">
										<view class="col-5 delatepadding">
											<text>设备类型：</text>
										</view>
										<view class="col-7 over_text">
											{{ devInfo.FTYPENAME }}
										</view>
									</view>
								</view>
							</view>
							<view class="col-12 row no-gutters" style="margin-top: 5%;">
								<view class="row col-12 no-gutters" style="border: 1px solid #17A281;">
									<view class="col-12 row no-gutters info_text">
										<view class="col-5 delatepadding">
											<text>生产模具：</text>
										</view>
										<view class="col-7 over_text">
											{{ item.FMOLD_NAME }}
										</view>
									</view>
								</view>
							</view>
							<view class="col-12 row no-gutters" style="margin-top: 5%;">
								<view class="row col-12 no-gutters" style="border: 1px solid #17A281;">
									<view class="col-12 row no-gutters info_text">
										<view class="col-5 delatepadding">
											<text>模具编码：</text>
										</view>
										<view class="col-7 over_text">
											{{ item.FMOLD_CODE }}
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="row no-gutters list_content">
						<view class="row col-12 no-gutters produce_title">
							<view class="col-9 row no-gutters">
								<u-icon name="grid-fill" color="#89FAF7" size="8"></u-icon>
								<text class="align-self-center" style="margin-left: 1%;">设备实时生产概览</text>
							</view>
							<view class="col-3 row no-gutters">
								<view class="sta_circle align-self-center"
									style="background-color: #69CDF7;box-shadow: 0px 0px 5px 3px #69CDF7;">

								</view>
								<text class="align-self-center"
									style="margin-left: 5%;">生产任务：{{ productList.length }}</text>
							</view>
						</view>
						<view class="row col-12 no-gutters produce_content">
							<view class="col-12 produce_wrapper">
								<view class="row no-gutters col-12" style="padding: 2% 2%;" v-for="ele in productList"
									:key="ele.FJOB_NO">
									<view class="row col-12 no-gutters produce_list"
										style="border: 1px solid #17A281;padding: 1% 1%;">
										<view class="row no-gutters col-10">
											<view class="col-6 row no-gutters">
												<view class="col-5 delatepadding">
													<text style="color: #85FAF6;">工单编码：</text>
												</view>
												<view class="col-7 over_text">
													{{ ele.FJOB_NO }}
												</view>
											</view>
											<view class="col-6 row no-gutters">
												<view class="col-5 delatepadding">
													<text style="color: #85FAF6;">物料编码：</text>
												</view>
												<view class="col-7 over_text">
													{{ ele.FPRD_NO }}
												</view>
											</view>
											<view class="col-6 row no-gutters" style="margin-top: 2%;">
												<view class="col-5 delatepadding">
													<text style="color: #85FAF6;">产品名称：</text>
												</view>
												<view class="col-7 over_text">
													{{ ele.FPRD_NAME }}
												</view>
											</view>
											<view class="col-6 row no-gutters" style="margin-top: 2%;">
												<view class="col-5 delatepadding">
													<text style="color: #85FAF6;">任务进度：</text>
												</view>
												<view class="col-5 over_text">
													<u-line-progress :percent="+ele.rate" :show-percent="false"
														height="5" fontSize="0.23"
														:active-color="60 > 100 ? '#19be6b':'#1890FF'">
													</u-line-progress>
												</view>
												<view class="col-2 row no-gutters justify-content-center">
													{{ ele.rate }}%
												</view>
											</view>
										</view>
										<view class="row no-gutters col-2 align-self-center justify-content-center">
											<button type="default"
												:style="{backgroundColor: ele.JOB_STATUS == '1' ? '#28A745' : '#b1b1b1' }"
												class="produce_Btn">{{ ele.JOB_STATUS == '1' ? '在产' : '待产' }}</button>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 右侧区域 -->
			<view class="col-5 addpadding wrap-line no-gutters row">
				<view class="col-12">
					<view class="row no-gutters right_top">
						<view class="col-12 row no-gutters right_top_height">
							<view class="col-12 row no-gutters right_top_height">
								<view class="col-4 align-self-center row no-gutters justify-content-center">
									<u-icon name="grid-fill" color="#89FAF7" size="8"></u-icon>
									<text class="align-self-center" style="margin-left: 1%;">今日设备状态概览</text>
								</view>
								<view class="col-8 align-content-center row no-gutters justify-content-center">
									<view class="col">
										<view class="statu-btn"
											style="margin: 0 5px;background-color: rgba(39, 185, 75, 0.75);">
											<!-- <image src="../../../../../static/img/领料.png" mode="scaleToFill" class="ic-sb"></image> -->
											<text style="margin: 0 5px;">生产</text>
											<text>{{ workTime || '0H' }}</text>
										</view>
									</view>
									<view class="col">
										<view class="statu-btn"
											style="margin: 0 5px;background-color: rgba(255, 212, 0, 0.8);">
											<!-- <image src="../../../../../static/img/领料.png" mode="scaleToFill" class="ic-sb"></image> -->
											<text style="margin: 0 5px;">待机</text>
											<text>{{ waitTime || '0H' }}</text>
										</view>
									</view>
									<view class="col">
										<view class="statu-btn"
											style="margin: 0 5px;background-color: rgba(241, 241, 241, 0.6);">
											<!-- <image src="../../../../../static/img/领料.png" mode="scaleToFill" class="ic-sb"></image> -->
											<text style="margin: 0 5px;">停机</text>
											<text>{{ stopTime || '0H' }}</text>
										</view>
									</view>
								</view>
							</view>
							<view class="col-12 row no-gutters right_top_height">
								<view class="progress col-12" style="height: 15px;font-size: .15rem;">
									<view class="progress-bar" role="progressbar"
										:style="{width: ele.Percent,backgroundColor: ele.BackgroundCloer || '#d9d9d9'}"
										:aria-valuenow="ele.Percent" v-for="ele in gldata" :key="ele.Order"
										aria-valuemin="0" aria-valuemax="100"></view>
								</view>
								<view class="col-12 row no-gutters justify-content-around" style="color: #FFFFFF;">
									<view class="col row justify-content-start">
										<text>00:00</text>
									</view>
									<view class="col row justify-content-start">
										<text>04:00</text>
									</view>
									<view class="col row justify-content-start">
										<text>08:00</text>
									</view>
									<view class="col row justify-content-start">
										<text>12:00</text>
									</view>
									<view class="col row justify-content-start">
										<text>16:00</text>
									</view>
									<view class="col row justify-content-start">
										<text>20:00</text>
									</view>
									<view class="col row justify-content-start">
										<text>24:00</text>
									</view>
								</view>
							</view>
						</view>
						<view class="col-12 no-gutters right_top_height" style="height: 75%;">
							<view class="col-4 align-self-center row no-gutters justify-content-center"
								style="height: 10%;">
								<u-icon name="grid-fill" color="#89FAF7" size="8"></u-icon>
								<text class="align-self-center" style="margin-left: 1%;">今日待机原因时长</text>
							</view>
							<!-- <view class="col-12 row no-gutters">
									<view class="col-3  row no-gutters justify-content-around" style="padding: 1%;" 
										v-for="item in reasonList" :key="item.id">
										<view class="col-12 reason_wrap row no-gutters">
											<view class="circle_bg align-self-center">
												<text>{{ item.count }}</text>
											</view>
											<view class="col-6 small-text over_text">
												{{ item.name }}
											</view>
											<view class="col time_content over_text">
												<text>{{ `${item.time}h` }}</text>
											</view>
										</view>
									</view>
								</view> -->
							<view class="col-12 row no-gutters" style="height: 90%;">
								<view style="width: 100%;height: 100%;" id="reasonCharts">

								</view>
							</view>
						</view>
					</view>
					<view class="row no-gutters right_down">
						<view class="row col-12 no-gutters list_title">
							<view class="col-9 row no-gutters">
								<u-icon name="grid-fill" color="#89FAF7" size="8"></u-icon>
								<text class="align-self-center" style="margin-left: 1%;">今日设备日志</text>
							</view>
						</view>
						<view class="row col-12 no-gutters produce_content">
							<dv-scroll-board :config="recordList" />
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var timer = null; //创建一个定时器
	var getINFOtimer = null;
	var zhxlChartObj = null; //综合效率chart对象
	var lplChartObj = null; //良品率chart对象
	var xnjdChartObj = null; //性能稼动率chart对象
	var sjjdChartObj = null; //时间稼动率chart对象
	var reasonChartsObj = null; //原因列表chart对象
	export default {
		data() {
			return {
				titleObj: {},
				LOGO: "",
				nowTime: "",
				nowDay: "",
				week: "",
				toastList: [], // 消息列表
				toastString: "", //消息字符串
				isToastShow: 'noToast',
				devInfo: {}, //设备信息对象
				productList: [], //派工单任务数组
				gldata: [], //状态概览数组
				workTime: "",
				stopTime: '',
				waitTime: "",
				recordList: null, //设备操作记录列表
				reasonList: [], //原因列表
			}
		},
		onLoad(option) {
			//获取设备信息
			// const res = uni.getSystemInfoSync();
			//  this.sb = res.windowWidth;

			const item = JSON.parse(decodeURIComponent(option.item));
			console.log(item);
			this.item = item;
			this.titleObj = item.titleObj;
			//从路径中获取看板标题等信息
			// if (option.ele) {
			// 	const item = JSON.parse(decodeURIComponent(option.ele));
			// 	this.titleObj = item;
			// }
			// try {
			// 	this.LOGO = this.basePath + this.titleObj.FLOGO;
			// } catch (e) {
			// 	//TODO handle the exception
			// 	this.LOGO = "";
			// }
			// console.log(this.LOGO);
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
				// this.week = "星期" + "日一二三四五六".charAt(time.getDay());
				this.nowTime = getNow(hours) + ':' + getNow(minutes) + ":" + getNow(seconds);
			}, 1000);
		},
		onShow() {
			zhxlChartObj = null; //综合效率chart对象
			lplChartObj = null; //良品率chart对象
			xnjdChartObj = null; //性能稼动率chart对象
			sjjdChartObj = null; //时间稼动率chart对象
			reasonChartsObj = null;
			this.getSBdata();
			this.getToast();
			getINFOtimer = setInterval(() => {
				this.getSBdata();
			}, (this.titleObj.FREFTIME * 1000 || 30000));
		},
		onHide() {
			clearInterval(timer);
			clearInterval(getINFOtimer);
		},
		methods: {
			//点击返回按钮
			backBtn() {
				clearInterval(timer);
				clearInterval(getINFOtimer);
				uni.navigateBack({
					delta: 1
				});
			},
			//获取顶部滚动消息
			getToast() {
				uni.request({
					url: this.basePath + '/APP/aBN!getNotice.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
						cjcode: uni.getStorageSync('UserInfo').DEPTCODE,
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						if (res.data.IsSuccess) {
							if (_self.newtoaList[0] == "") {
								_self.toastList = res.data.Data;
							} else {
								_self.newtoaList.forEach((ele, i) => {
									if (ele != _self.toastList[i].NOTICE_TITLE) {
										_self.toastList = res.data.Data;
										return;
									}
								});
							}
						} else {
							this.isToastShow = 'noToast';
						}
					},
				});
			},
			getSBdata() {
				let newPro = new Promise((resolve) => {
					resolve();
				});
				newPro.then(() => {
					this.drawCircle();
				});
				this.getDevInfo(); //获取设备信息
				this.getProductList(); //获取单台设备生产列表
				this.getZTGL(); //获取设备状态概览
				this.getDevRecord(); //获取设备操作记录
			},
			drawCircle() {
				try {
					this.item.OEE = parseInt(this.item.OEE);
					this.item.YIELD_RATE = parseInt(this.item.YIELD_RATE);
					this.item.PO_RATE = parseInt(this.item.PO_RATE);
					this.item.TO_RATE = parseInt(this.item.TO_RATE);
					this.drawZHXL(+this.item.OEE); //综合效率
					this.drawLPL(+this.item.YIELD_RATE); //良品率
					this.drawXNJD(+this.item.PO_RATE); //性能指数
					this.drawSJJD(+this.item.TO_RATE); //可用率
				} catch (e) {
					//TODO handle the exception
				}


			},
			/**
			 * @description 获取设备硬件信息
			 */
			getDevInfo() {
				this.devInfo = [];
				uni.request({
					url: this.basePath + '/APP/device!getDevice.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
						devcode: this.item.FDEVCODE
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						if (res.data.IsSuccess) {
							this.devInfo = res.data.Data[0];
						}
					},
				});
			},
			/**
			 * @description 获取设备生产列表
			 */
			getProductList() {
				this.productList = [];
				uni.request({
					url: this.basePath + '/APP/kanban!devProData.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
						devcode: this.item.FDEVCODE
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						if (res.data.IsSuccess) {
							this.productList = res.data.Data[0].detail;
							this.productList.forEach((ele, index) => {
								ele.rate = ((ele.FACT_QTY / ele.FJOB_QTY) * 100).toFixed(1);
							});
						}
					},
				});
			},
			/**
			 * @description 获取设备状态概览
			 */
			getZTGL() {
				this.gldata = [];
				uni.request({
					url: this.basePath + '/APP/kanban!devMonitorStatusSingle.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
						devcode: this.item.FDEVCODE,
						day: 1,
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						if (res.data.IsSuccess) {
							const targetArr = res.data.Data[0].stadata[0].devsta.split(' ');
							const reg = /(\d+)\.(\d+)H/g;
							const tempArr = res.data.Data[0].stadata[0].devsta.match(reg);
							targetArr.forEach((ele, index) => {
								let title = ele.substring(0, 2);
								if (title == '生产') {
									this.workTime = tempArr[index];
								} else if (title == '停机') {
									this.stopTime = tempArr[index];
								} else if (title == '待机') {
									this.waitTime = tempArr[index];
								}
							});
							this.gldata = res.data.Data[0].stadata[0].stadetail;
						}
					},
				});
			},
			getDevRecord() {
				this.recordList = {};
				this.reasonList = [];
				uni.request({
					url: this.basePath + '/APP/jobReport!getDevstaRecord.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
						devcode: this.item.FDEVCODE,
						day: 1,
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {

						if (res.data.IsSuccess) {
							let newArray = [];
							let reasonName = [],
								reasonNum = {};
							res.data.Data.forEach((ele, index) => {
								let temp = [];
								temp.push(ele.STA_NAME, ele.START_TIME, ele.END_TIME, ele.STATUS_TIME,
									ele.FABNORMAL_NAME);
								newArray.push(temp);
								//上面是处理列表数据，下面是统计原因数据
								if (ele.SY_STATUS == "1") {
									if (!reasonNum[ele.FABNORMAL_NAME]) {
										reasonNum[ele.FABNORMAL_NAME] = {
											seconds: ele.STATUS_SECS,
											count: 1
										};
										reasonName.push({
											name: ele.FABNORMAL_NAME,
											id: ele.FID
										});
									} else {
										reasonNum[ele.FABNORMAL_NAME].seconds = reasonNum[ele
											.FABNORMAL_NAME].seconds + ele.STATUS_SECS;
										reasonNum[ele.FABNORMAL_NAME].count++;
									}
								}

							});
							this.recordList = {
								header: ['操作类型', '开始时间', '结束时间', '持续时间', '原因'],
								data: newArray,
								index: false,
								columnWidth: [200, 200, 200, 200, 200],
								align: ['center', 'center', 'center', 'center', 'center'],
								rowNum: 10,
								headerBGC: '#1D395F',
								headerHeight: 45,
								oddRowBGC: 'rgba(10, 29, 50, 0.8)',
								evenRowBGC: 'rgba(10, 29, 50, 0.8)',
							};
							reasonName.forEach((ele, index) => {
								let time = Math.floor(reasonNum[ele.name].seconds / 60);
								if (time > 0) {
									this.reasonList.push({
										name: ele.name,
										time: time,
										id: ele.id,
										count: reasonNum[ele.name].count,
										value: time,
									})
								}

							});
							this.drawReasonCharts(this.reasonList);
						}
					},
				});
			},
			drawReasonCharts(targetArr) {
				const dom = document.querySelector('#reasonCharts');
				if (!reasonChartsObj) {
					reasonChartsObj = this.$echarts.init(dom);
				}
				var option = {
					tooltip: {
						trigger: 'item',
					},
					legend: {
						orient: 'horizontal',
						left: 'auto',
						textStyle: {
							color: "#ffffff"
						},
					},
					series: [{
						name: '异常原因',
						type: 'pie',
						radius: '50%',
						data: targetArr,
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)',
							},
						},
						label: { //饼图图形上的文本标签
							show: true,
							position: 'outside', //标签的位置
							fontWeight: 300,
							fontSize: 16, //文字的字体大小
							color: "#ffffff",
							formatter: '{b} {c}分钟'
						}
					}]
				};
				reasonChartsObj.setOption(option);
			},
			/**
			 * @description 画综合效率方法
			 * @param {String | Number} data 
			 */
			drawZHXL(data) {
				console.log('zhxl:' + data);
				const dom = document.querySelector('#zhxl');
				if (!zhxlChartObj) {
					zhxlChartObj = this.$echarts.init(dom);
				}
				let option = {
					series: [{
						name: '综合效率',
						type: 'pie',
						radius: ['70%', '90%'],
						avoidLabelOverlap: false,
						emphasis: {
							label: {
								show: true,
								fontSize: '40',
								fontWeight: 'bold'
							}
						},
						labelLine: {
							show: false
						},
						data: [{
							value: data,
							name: '综合效率'
						}],

						label: {
							show: true,
							color: "rgba(255, 255, 255, 1)",
							fontSize: 18,
							position: 'center',
							formatter: `{c}%`,
						},
						itemStyle: {
							color: "#16DFBB"
						}
					}]
				};
				zhxlChartObj.setOption(option);
			},
			/**
			 * @description 画良品率方法
			 * @param {String | Number} data 
			 */
			drawLPL(data) {
				const dom = document.querySelector('#lpl');
				if (!lplChartObj) {
					lplChartObj = this.$echarts.init(dom);
				}
				let option = {
					series: [{
						name: '良品率',
						type: 'pie',
						radius: ['70%', '90%'],
						avoidLabelOverlap: false,
						emphasis: {
							label: {
								show: true,
								fontSize: '40',
								fontWeight: 'bold'
							}
						},
						labelLine: {
							show: false
						},
						data: [{
							value: data,
							name: '良品率'
						}],

						label: {
							show: true,
							color: "rgba(255, 255, 255, 1)",
							fontSize: 18,
							position: 'center',
							formatter: `{c}%`,
						},
						itemStyle: {
							color: "#DF822F"
						}
					}]
				};
				lplChartObj.setOption(option);
			},
			/**
			 * @description 画性能稼动率方法
			 * @param {String | Number} data 
			 */
			drawXNJD(data) {
				const dom = document.querySelector('#xnjd');
				if (!xnjdChartObj) {
					xnjdChartObj = this.$echarts.init(dom);
				}
				let option = {
					series: [{
						name: '性能稼动率',
						type: 'pie',
						radius: ['70%', '90%'],
						avoidLabelOverlap: false,
						emphasis: {
							label: {
								show: true,
								fontSize: '40',
								fontWeight: 'bold'
							}
						},
						labelLine: {
							show: false
						},
						data: [{
							value: data,
							name: '性能稼动率'
						}],

						label: {
							show: true,
							color: "rgba(255, 255, 255, 1)",
							fontSize: 18,
							position: 'center',
							formatter: `{c}%`,
						},
						itemStyle: {
							color: "#E7D639"
						}
					}]
				};
				xnjdChartObj.setOption(option);
			},
			/**
			 * @description 画时间稼动率方法
			 * @param {String | Number} data 
			 */
			drawSJJD(data) {
				console.log('sjjd:' + data);
				console.log(sjjdChartObj);
				const dom = document.querySelector('#sjjd');
				if (!sjjdChartObj) {
					sjjdChartObj = this.$echarts.init(dom);
				}
				let option = {
					series: [{
						name: '时间稼动率',
						type: 'pie',
						radius: ['70%', '90%'],
						avoidLabelOverlap: false,
						emphasis: {
							label: {
								show: true,
								fontSize: '40',
								fontWeight: 'bold'
							}
						},
						labelLine: {
							show: false
						},
						data: [{
							value: data,
							name: '时间稼动率'
						}],

						label: {
							show: true,
							color: "rgba(255, 255, 255, 1)",
							fontSize: 18,
							position: 'center',
							formatter: `{c}%`,
						},
						itemStyle: {
							color: "#F15D61"
						}
					}]
				};
				sjjdChartObj.setOption(option);
			}
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

	.tableContent {
		width: 100%;
		height: 94%;
	}

	.tdContent {
		width: 100%;
	}

	.bottom-Content {
		height: 5%;
		width: 100%;
		position: absolute;
		bottom: 0;
	}

	.dele-padding {
		padding: 0;
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

	.tdSize {
		font-size: .3rem;
	}

	.yddiv {
		width: 100%;
		height: 88%;
	}

	.toastTitle {
		font-size: .3rem;
		width: 100%;
	}

	.titleDec {
		width: 150px;
		height: 50px;
	}

	.addpadding {
		padding: 0 .5%;
	}

	.deletepadding {
		padding: 0;
	}

	.shapeRed {
		background: linear-gradient(-135deg, transparent 20px, rgba(255, 212, 0, 0.8) 0, #C99A7A);
		/* margin: 0 .5%; */
	}

	.shapeGreen {
		background: linear-gradient(-135deg, transparent 20px, rgba(39, 185, 75, 0.75) 0, #116125);
		/* margin: 0 .5%; */
	}

	.shapeGray {
		background: linear-gradient(-135deg, transparent 20px, rgba(241, 241, 241, 0.5) 0, #999AA4);
		/* margin: 0 .5%; */

	}

	.Content-title {
		font-size: .25rem;
		color: #fff;
		font-weight: bold;
		padding: 0 1%;
		height: 100%;
		width: 100%;
		margin: 1% 0;
	}

	.Content-text {
		font-size: .2rem;
		color: #fff;
		padding: 0 1%;
		height: 100%;
		width: 100%;
		margin: .05% 0;
	}

	.delatepadding {
		padding: 0;
	}

	.list-label {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.setHeight {
		height: 31%;
	}

	.statu-btn {
		padding: 5px 0px;
		line-height: 1.5;
		font-size: .19rem;
		color: #FFFFFF;
		text-align: center;
		border-radius: 10%;
	}

	.wrap-line {
		height: 95%;
		width: 100%;
		/* border: 1px solid #255ABE; */
		overflow: hidden;
	}

	.charttitle {
		font-size: .18rem !important;
		color: #FFFFFF;
		overflow: hidden;
	}

	.ic-sb {
		width: 16px;
		height: 16px;
		vertical-align: text-bottom;
	}

	/* 右侧设备概览样式 */
	.time-text {
		color: #85FAF6;
		font-size: .3rem;
	}

	.small-text {
		color: #85FAF6;
		font-size: .2rem;
	}

	.rate-content {
		background-color: #001D3A;
		/* border: 1px solid #00468C; */
		height: 24%;
	}

	.allsize {
		width: 100%;
		height: 83%;
	}

	.titleText {
		font-size: .25rem;
		color: #FFFFFF;
	}

	.info_text {
		font-size: .2rem;
		color: #FFFFFF;
	}

	.smallText {
		font-size: .2rem;
		color: #FFFFFF;
	}

	.devinfo {
		background-image: linear-gradient(to top left, #155344, #25A28A);
		/* 自右下向左上渐变 */
		border: 1px solid #00468C;
		height: 30%;
		padding: 10px 0px 10px 0px;
	}

	/* 模拟淘宝实现中间小竖线 */
	.right-border {
		border-right: 1px solid #17A281;
		display: inline-block;
		margin-right: 0px;
		padding: 0px 0px 0px 0px;
		height: 100%;
	}

	.imgsize {
		width: 100%;
		height: 100%;
	}

	.statusBtn {
		background-color: #004A36;
		width: 70%;
		color: #FFFFFF;
		padding: 0 15%;
		border-radius: 10%;
		font-size: .5rem;
	}

	.sta_circle {
		height: 13px;
		width: 13px;
		border-radius: 50%;
		background-color: green;
		box-shadow: 0px 0px 5px 3px green;
	}

	.list_content {
		background-color: #001D3A;
		margin-top: 2%;
		height: 68.5%;
	}

	.produce_title {
		height: 10%;
		background-image: linear-gradient(to right, #125BCD, #5F58FC);
		padding: 0 5%;
		color: #89FAF7;
		font-size: .25rem;
	}

	.produce_content {
		height: 90%;
		font-size: .2rem;
		overflow: scroll;
	}

	.produce_wrapper {
		border: 1px solid #044369;
	}

	.produce_list {
		color: #FFFFFF;
	}

	.produce_Btn {
		/* background-color: #004A36; */
		color: #FFFFFF;
		padding: 5% 15%;
		border-radius: 10%;
		font-size: .3rem;
	}

	/* 右侧样式区域 */
	.right_top {
		background-color: #001D3A;
		/* border: 1px solid #00468C; */
		height: 50%;
		padding: 10px 10px 10px 10px;
	}

	.right_down {
		background-color: #001D3A;
		margin-top: 2%;
		height: 48.5%;
	}

	.right_top_height {
		height: 25%;
		color: #89FAF7;
		font-size: .25rem;
	}

	.reason_wrap {
		background-color: #044369;
		margin: 1% 0 0 0;
		padding: 3% 3%;
	}

	.circle_bg {
		background-color: #F76B6B;
		border-radius: 50%;
		height: 20px;
		width: 20px;
		text-align: center;
		line-height: 20px;
		font-size: .1rem;
		color: #FFFFFF;
	}

	.small-text {
		font-size: .2rem;
		margin: 0 2px;
	}

	.time_content {
		background-color: #02A7F0;
		border-radius: .2rem;
		color: #FFFFFF;
		font-size: .2rem;
		text-align: center;
	}

	.list_title {
		height: 10%;
		padding: 0 5%;
		color: #89FAF7;
		font-size: .25rem;
	}

	@media screen and (max-width: 1000px) {
		.circle_bg {
			background-color: #F76B6B;
			border-radius: 50%;
			height: 15px;
			width: 15px;
			text-align: center;
			line-height: 15px;
			font-size: .1rem;
			color: #FFFFFF;
		}
	}
</style>
