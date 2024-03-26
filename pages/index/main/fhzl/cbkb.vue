<template>
	<view class="setfull no-gutters">
		<view class="row align-items-center" style="background-color: #1890FF;color: #ffffff;" v-if="isToastShow == 'noToast'">
			<view class="col row align-items-center align-self-center">
				<image :src="LOGO" mode="aspectFit" style="width: 100px;height: 50px;margin-left: 5%;"></image>
				<text style="margin-left:10%;font-size: .2rem;line-height: 2.5;" v-show="titleObj.FCOMPANY == '' ? false : true">{{ titleObj.FCOMPANY }}</text>

			</view>
			<view class="col-4 pageTitle row justify-content-center" style="font-size: .4rem;text-align: center;">
				<text style="margin: 0 5%;">{{ titleObj.FTITLE }}</text>
				<!-- <text style="margin: 0 5%;">销售看板</text> -->
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
		<!-- 内容区 -->
		<view class="row tableContent no-gutters" style="overflow: hidden;margin-top: .5%;">
			<view class="col-12 row no-gutters tdContent align-content-start">
				<view class="col allsize" style="padding: 0 .2%;">
					<view class="allsize wrap-line">
						<view class="row col-12 no-gutters produce_title">
							<view class="col-9 row no-gutters">
								<u-icon name="grid-fill" color="#89FAF7" size="8"></u-icon>
								<text class="align-self-center" style="margin-left: 1%;">制造费用部门汇总</text>
							</view>
							<view class="col-3 row no-gutters">
								<text class="align-self-center" style="margin-left: 5%;">总金额：{{ departmentAmount }}</text>
							</view>
						</view>
						<view class="row no-gutters tableDetail">
							<view class="col-4 allsize">
								<view class="allsize">
									<u-table style="width: 100%;" bg-color="transparent" color="#FFFFFF" border-color="#052D84" :th-style="thStyle">
										<u-tr>
											<u-th class="charttitle">
												部门
											</u-th>
											<u-th class="charttitle">
												金额
											</u-th>
										</u-tr>
									</u-table>
									<view style="height: 86%;overflow: auto;" class="GDContentHeight">
										<view class="GDtableHeight">
											<u-table class="scrollList tableHeight" style="width: 100%;" bg-color="transparent" color="#FFFFFF" border-color="#052D84">
												<u-tr v-for="(item,index) in allot" :key="item.ALLOT_DPT" class="GdTrHeight" :style="{backgroundColor: showBG === index ? '#01A3F6':'inherit'}">
													<u-td class="over_text charttitle">
														{{ item.ALLOT_DPT }}
													</u-td>
													<u-td class="charttitle">
														{{ item.AMOUNT }}
													</u-td>
												</u-tr>
											</u-table>
										</view>
									</view>
								</view>
							</view>
							<view class="col-8" id="ALLot_Chart">
								
							</view>
						</view>
					</view>
				</view>
				<view class="col allsize" style="padding: 0 .2%;">
					<view class="allsize wrap-line">
						<view class="row col-12 no-gutters produce_title">
							<view class="col-9 row no-gutters">
								<u-icon name="grid-fill" color="#89FAF7" size="8"></u-icon>
								<text class="align-self-center" style="margin-left: 1%;">制造费用科目汇总</text>
							</view>
							<view class="col-3 row no-gutters">
								<text class="align-self-center" style="margin-left: 5%;">总金额：{{ subjectAmount }}</text>
							</view>
						</view>
						<view class="row no-gutters tableDetail">
								<view class="col-4 allsize">
									<view class="allsize">
										<u-table style="width: 100%;" bg-color="transparent" color="#FFFFFF" border-color="#052D84" :th-style="thStyle">
											<u-tr>
												<u-th class="charttitle">
													科目
												</u-th>
												<u-th class="charttitle">
													金额
												</u-th>
											</u-tr>
										</u-table>
										<view style="height: 86%;overflow: auto;" class="SUBContentHeight">
											<view>
												<u-table class="scrollList tableHeight" style="width: 100%;" bg-color="transparent" color="#FFFFFF" border-color="#052D84">
													<u-tr v-for="(item,index) in subjectList" :key="item.ITEM_CODE" class="GdTrHeight" :style="{backgroundColor: subjectShowBG === index ? '#01A3F6':'inherit'}">
														<u-td class="over_text charttitle">
															{{ item.ITEM_NAME }}
														</u-td>
														<u-td class="charttitle">
															{{ item.AMOUNT }}
														</u-td>
													</u-tr>
												</u-table>
											</view>
										</view>
									</view>
								</view>
							<view class="col-8" id="SUB_Chart">
								
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="col-12 row no-gutters tdContent">
				<view class="col allsize" style="padding: 0 .2%;">
					<view class="allsize wrap-line">
						<view class="row col-12 no-gutters produce_title">
							<view class="col-9 row no-gutters">
								<u-icon name="grid-fill" color="#89FAF7" size="8"></u-icon>
								<text class="align-self-center" style="margin-left: 1%;">{{ department }}</text>
							</view>
						</view>
						<view class="row no-gutters tableDetail">
							<view class="col-12" id="third_week">
								
							</view>
						</view>
					</view>
				</view>
				<view class="col allsize" style="padding: 0 .2%;">
					<view class="allsize wrap-line">
						<view class="row col-12 no-gutters produce_title">
							<view class="col-9 row no-gutters">
								<u-icon name="grid-fill" color="#89FAF7" size="8"></u-icon>
								<text class="align-self-center" style="margin-left: 1%;">{{ subject }}</text>
							</view>
						</view>
						<view class="row no-gutters tableDetail">
							<view class="col-12" id="fourth_week">
								
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="col-12 row no-gutters bottom_content">
				<view class="col allsize wrap-line">
					<view class="allsize wrap-line">
						<view class="row col-12 no-gutters produce_title" style="height: 12%;">
							<view class="col-9 row no-gutters">
								<u-icon name="grid-fill" color="#89FAF7" size="8"></u-icon>
								<text class="align-self-center" style="margin-left: 1%;">年度汇总</text>
							</view>
						</view>
						<view class="row no-gutters tableDetail" style="height: 88%;">
							<view class="col-12" id="monthChart">
								
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	//#ifdef H5
		import $ from '@/static/js/jquery-3.3.1.js'  
	//#endif
	var timer = null; //创建一个定时器
	var getINFOtimer = null;
	var GDtimer = null;
	//创建echarts对象
	var first = null;
	var second = null;
	var third = null;
	var fourth = null;
	var monthChart = null;
	export default {
		data() {
			return {
				thStyle: {
					'backgroundColor': 'transparent',
					color: "#ffffff",
					fontSize: '12px'
				},
				titleObj: {},
				LOGO: "",
				nowTime: "",
				nowDay: "",
				year:'',
				month:'',
				toastList: [], // 消息列表
				toastString: "", //消息字符串
				isToastShow: 'noToast',
				allot:[],
				subjectList:[],
				showBG: 0,
				subjectShowBG:0, //科目显示背景序号
				department:'', //部门名称
				departmentAmount:0,//部门汇总金额
				subject:'', //科目名称
				subjectAmount: 0, //科目汇总金额
			}
		},
		onLoad(option) {
			//获取设备信息
			// const res = uni.getSystemInfoSync();
			//  this.sb = res.windowWidth;

			//从路径中获取看板标题等信息
			if (option.ele) {
				const item = JSON.parse(decodeURIComponent(option.ele));
				this.titleObj = item;
				 this.month = new Date().getMonth();
				this.titleObj.FTITLE = `${this.month}月${this.titleObj.FTITLE}`;
			}
			try {
				this.LOGO = this.basePath + this.titleObj.FLOGO;
			} catch (e) {
				//TODO handle the exception
				this.LOGO = "";
			}
			console.log(this.LOGO);
			timer = setInterval(() => {
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
			this.getToast();
			this.getInfo();
		},
		onShow() {
			getINFOtimer = setInterval(() => {
				this.getInfo();
			}, (this.titleObj.FREFTIME * 1000 || 30000));
		},
		onHide() {
			clearInterval(timer);
			clearInterval(getINFOtimer);
			clearInterval(GDtimer);
		},
		methods: {
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
			getInfo() {
				 this.year = new Date().getFullYear();
				 this.month = new Date().getMonth();
				clearInterval(GDtimer);
				uni.request({
					url: this.basePath + '/APP/cST!MohSum.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
						year: this.year,
						month: this.month,
						// month: 7,
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						if (res.data.IsSuccess) {
							this.allot = res.data.Data[0].detail;
							this.subjectList = res.data.Data[1].detail;
							this.getHeight();
							this.department = this.allot[this.showBG].ALLOT_DPT;	//科目名称
							this.subject = this.subjectList[this.subjectShowBG].ITEM_NAME;	//部门名称
							this.departmentAmount = res.data.Data[0].amount;	//部门汇总金额
							this.subjectAmount = res.data.Data[1].amount;	//科目汇总金额
							//第一次手动渲染第一条科目和部门的echart图
							this.getdepartment(this.department);
							this.getsubject(this.subject);
							//渲染汇总图表
							this.drawFirst(this.allot);
							this.drawSecond(this.subjectList);
							//渲染年度图表
							this.drawMonth(res.data.Data[2].detail);
						}
					},
				});
				//获取完数据，再设置滚动函数
				GDtimer = setInterval(function() {
					this.isnextGD();
					this.isnextSUB();
					if(this.allot.length > 0){
						this.department = this.allot[this.showBG].ALLOT_DPT;
						this.getdepartment(this.department);
					}
					if(this.subjectList.length > 0){
						this.subject = this.subjectList[this.subjectShowBG].ITEM_NAME;
						this.getsubject(this.subject);
					}
					
					
				}.bind(this), 5000);
			},
			/**
			 * 部门表格滚动方法
			 */
			getHeight(){
				setTimeout(() => {
					 this.rowHeight = document.getElementsByClassName('GdTrHeight')[0].clientHeight;
				}, 300);
			},
			isnextGD(){
				this.showBG++;
				//如果下一条大于工单列表长度，则从第一条开始,此时需要结束函数，不需要再判断是否滚动
				if(this.showBG > this.allot.length - 1){
					document.getElementsByClassName('GDContentHeight')[0].scrollTop = 0;
					this.showBG = 0;
					return;
				}
				//如果没大于，则判断是否需要滚动
				const GDContent = document.getElementsByClassName('GDContentHeight')[0];
					const GDlistHeight = GDContent.clientHeight;
					const scrollTop = GDContent.scrollTop;
					const GDlistOffsetHeight = GDContent.scrollHeight;
				if(GDlistHeight >= GDlistOffsetHeight){
					return;
				}else if(GDlistHeight + scrollTop < GDlistOffsetHeight){
					this.setBMAnimation(this.rowHeight, 1000, GDContent);
				}else if((GDlistHeight + scrollTop) == GDlistOffsetHeight){
					return;
				}
			},
			//部门列表运动函数
			setBMAnimation(detaY, time, dom){
				// dom.scrollTop += detaY;
				const target =  dom.scrollTop + detaY;
				$(dom).animate({scrollTop: target}, 1000);
			},
			isnextSUB(){
				this.subjectShowBG++;
				//如果下一条大于工单列表长度，则从第一条开始,此时需要结束函数，不需要再判断是否滚动
				if(this.subjectShowBG > this.subjectList.length - 1){
					document.getElementsByClassName('SUBContentHeight')[0].scrollTop = 0;
					this.subjectShowBG = 0;
					return;
				}
				//如果没大于，则判断是否需要滚动
				const SUBContent = document.getElementsByClassName('SUBContentHeight')[0];
					const SUBlistHeight = SUBContent.clientHeight;
					const scrollTop = SUBContent.scrollTop;
					const SUBlistOffsetHeight = SUBContent.scrollHeight;
				if(SUBlistHeight >= SUBlistOffsetHeight){
					return;
				}else if(SUBlistHeight + scrollTop < SUBlistOffsetHeight){
					this.setBMAnimation(this.rowHeight, 1000, SUBContent);
				}else if((SUBlistHeight + scrollTop) == SUBlistOffsetHeight){
					return;
				}
			},
			/**
			 * @param {Object} name 部门名称
			 * @description  获取指定部门数据
			 */
			getdepartment(name){
				uni.request({
					url: this.basePath + '/APP/cST!ItemSumForDpt.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
						year: this.year,
						month: this.month,
						// month: 7,
						dpt: name,
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						if (res.data.IsSuccess) {
							this.drawThird(res.data.Data[0].detail);
						}
					},
				});
			},
			/**
			 * @param {Object} name 科目名称
			 * @description  获取指定科目数据
			 */
			getsubject(name){
				uni.request({
					url: this.basePath + '/APP/cST!DptSumForItem.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
						year: this.year,
						month: this.month,
						// month: 7,
						item: name,
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						if (res.data.IsSuccess) {
							this.drawFourth(res.data.Data[0].detail);
						}
					},
				});
			},
			drawFirst(options) {
				const dom = document.querySelector('#ALLot_Chart');
				if (!first) {
					first = this.$echarts.init(dom);
				};
				if (options.length == 0) {
					first.showLoading({
						text: '暂无数据...',
						color: '#c23531',
						textColor: '#ffffff',
						maskColor: 'rgba(255, 255, 255, 0)',
						zlevel: 0
					});
					return;
				}
				//数据处理
				let xAxis = [],
					money = [],
					percent = [],
					max = 0;
				options.forEach((ele) => {
					xAxis.push(ele.ALLOT_DPT);
					money.push(ele.AMOUNT);
					percent.push(ele.PERCENT_ADDUP);
					if(+ele.AMOUNT > max){
						max = +ele.AMOUNT;
					}
				});
				let option = {
					grid: {
						x: 80,
						x2: 45,
						y: 55,
						y2: 55
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross',
							crossStyle: {
								color: '#999'
							}
						}
					},
					legend: {
						data: ['金额(元)', '比例'],
						textStyle: {
							color: "rgba(255, 255, 255, 1)"
						}
					},
					xAxis: [{
						type: 'category',
						data: xAxis,
						axisPointer: {
							type: 'shadow'
						},
						axisLabel: {
							interval: 0, //默认是auto,设置为0，则全部显示X轴
							color: '#fff',
							fontSize: 12,
							rotate: 45
						},

					}],
					yAxis: [{
							type: 'value',
							name: '金额(元)',
							min: 0,
							max: max,
							interval: max / 5,
							axisLabel: {
								color: '#fff',
							},
							nameTextStyle: {
								color: '#fff',
							},
							splitLine: {
							  lineStyle: {
								color: "rgba(97, 96, 89, 1.0)"
							  }
							}
						},
						{
							type: 'value',
							name: '比例',
							min: 0,
							max: 100,
							interval: 20,
							axisLabel: {
								formatter: '{value} %',
								color: '#fff',
							},
							nameTextStyle: {
								color: '#fff',
							},
							splitLine: {
							  lineStyle: {
								color: "rgba(97, 96, 89, 1.0)"
							  }
							}
						}
					],
					series: [{
							name: '金额(元)',
							type: 'bar',
							data: money,
							label: {
								show: true,
								position: 'top',
								valueAnimation: true,
								color: '#fff',
								fontSize:'10'
							},
							
						},
						{
							name: '比例',
							type: 'line',
							yAxisIndex: 1,
							data: percent,
						}
					]
				};
				first.setOption(option);
			},
			drawSecond(options) {
				const dom = document.querySelector('#SUB_Chart');
				if (!second) {
					second = this.$echarts.init(dom);
				};
				if (options.length == 0) {
					second.showLoading({
						text: '暂无数据...',
						color: '#c23531',
						textColor: '#ffffff',
						maskColor: 'rgba(255, 255, 255, 0)',
						zlevel: 0
					});
					return;
				}
				//数据处理
				let xAxis = [],
					money = [],
					percent = [],
				max = 0;
				options.forEach((ele) => {
					xAxis.push(ele.ITEM_NAME);
					money.push(ele.AMOUNT);
					percent.push(ele.PERCENT_ADDUP);
					if(+ele.AMOUNT > max){
						max = +ele.AMOUNT;
					}
				});
				
				let option = {
					grid: {
						x: 80,
						x2: 45,
						y: 55,
						y2: 55
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross',
							crossStyle: {
								color: '#999'
							}
						}
					},
					legend: {
						data: ['金额(元)', '比例'],
						textStyle: {
							color: "rgba(255, 255, 255, 1)"
						}
					},
					xAxis: [{
						type: 'category',
						data: xAxis,
						axisPointer: {
							type: 'shadow'
						},
						axisLabel: {
							interval: 0, //默认是auto,设置为0，则全部显示X轴
							color: '#fff',
							fontSize: 12,
							rotate: 45
						},
				
					}],
					yAxis: [{
							type: 'value',
							name: '金额(元)',
							min: 0,
							max: max,
							interval: max / 5,
							axisLabel: {
								color: '#fff',
							},
							nameTextStyle: {
								color: '#fff',
							},
							splitLine: {
							  lineStyle: {
								color: "rgba(97, 96, 89, 1.0)"
							  }
							}
						},
						{
							type: 'value',
							name: '比例',
							min: 0,
							max: 100,
							interval: 20,
							axisLabel: {
								formatter: '{value} %',
								color: '#fff',
							},
							nameTextStyle: {
								color: '#fff',
							},
							splitLine: {
							  lineStyle: {
								color: "rgba(97, 96, 89, 1.0)"
							  }
							}
						}
					],
					series: [{
							name: '金额(元)',
							type: 'bar',
							data: money,
							label: {
								show: true,
								position: 'top',
								valueAnimation: true,
								color: '#fff',
								fontSize:'10'
							}
						},
						{
							name: '比例',
							type: 'line',
							yAxisIndex: 1,
							data: percent,
						}
					]
				};
				second.setOption(option);
			},
			drawThird(options) {
				const dom = document.querySelector('#third_week');
				if (!third) {
					third = this.$echarts.init(dom);
				};
				if (options.length == 0) {
					third.showLoading({
						text: '暂无数据...',
						color: '#c23531',
						textColor: '#ffffff',
						maskColor: 'rgba(255, 255, 255, 0)',
						zlevel: 0
					});
					return;
				}
				//数据处理
				let xAxis = [],
					money = [],
					percent = [],
				max = 0;
				options.forEach((ele) => {
					xAxis.push(ele.ITEM_NAME);
					money.push(ele.AMOUNT);
					percent.push(ele.PERCENT_ADDUP);
					if(+ele.AMOUNT > max){
						max = +ele.AMOUNT;
					}
				});
				let option = {
					grid: {
						x: 70,
						x2: 45,
						y: 45,
						y2: 55
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross',
							crossStyle: {
								color: '#999'
							}
						}
					},
					legend: {
						data: ['金额(元)', '比例'],
						textStyle: {
							color: "rgba(255, 255, 255, 1)"
						}
					},
					xAxis: [{
						type: 'category',
						data: xAxis,
						axisPointer: {
							type: 'shadow'
						},
						axisLabel: {
							interval: 0, //默认是auto,设置为0，则全部显示X轴
							color: '#fff',
							fontSize: 12,
							rotate: 45
						},

					}],
					yAxis: [{
							type: 'value',
							name: '金额(元)',
							min: 0,
							max: max,
							interval: max / 5,
							axisLabel: {
								color: '#fff',
							},
							nameTextStyle: {
								color: '#fff',
							},
							splitLine: {
							  lineStyle: {
								color: "rgba(97, 96, 89, 1.0)"
							  }
							}
						},
						{
							type: 'value',
							name: '比例',
							min: 0,
							max: 100,
							interval: 20,
							axisLabel: {
								formatter: '{value} %',
								color: '#fff',
							},
							nameTextStyle: {
								color: '#fff',
							},
							splitLine: {
							  lineStyle: {
								color: "rgba(97, 96, 89, 1.0)"
							  }
							}
						}
					],
					series: [{
							name: '金额(元)',
							type: 'bar',
							data: money,
							label: {
								show: true,
								position: 'top',
								valueAnimation: true,
								color: '#fff',
							}
						},
						{
							name: '比例',
							type: 'line',
							yAxisIndex: 1,
							data: percent,
						}
					]
				};
				third.setOption(option);
			},
			drawFourth(options) {
				const dom = document.querySelector('#fourth_week');
				if (!fourth) {
					fourth = this.$echarts.init(dom);
				};
				if (options.length == 0) {
					fourth.showLoading({
						text: '暂无数据...',
						color: '#c23531',
						textColor: '#ffffff',
						maskColor: 'rgba(255, 255, 255, 0)',
						zlevel: 0
					});
					return;
				}
				//数据处理
				let xAxis = [],
					money = [],
					percent = [],
				max = 0;
				options.forEach((ele) => {
					xAxis.push(ele.DPT_NAME);
					money.push(ele.AMOUNT);
					percent.push(ele.PERCENT_ADDUP);
					if(+ele.AMOUNT > max){
						max = +ele.AMOUNT;
					}
				});
				let option = {
					grid: {
						x: 70,
						x2: 45,
						y: 45,
						y2: 55
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross',
							crossStyle: {
								color: '#999'
							}
						}
					},
					legend: {
						data: ['金额(元)', '比例'],
						textStyle: {
							color: "rgba(255, 255, 255, 1)"
						}
					},
					xAxis: [{
						type: 'category',
						data: xAxis,
						axisPointer: {
							type: 'shadow'
						},
						axisLabel: {
							interval: 0, //默认是auto,设置为0，则全部显示X轴
							color: '#fff',
							fontSize: 12,
							rotate: 45
						},
				
					}],
					yAxis: [{
							type: 'value',
							name: '金额(元)',
							min: 0,
							max: max,
							interval: max / 5,
							axisLabel: {
								color: '#fff',
							},
							nameTextStyle: {
								color: '#fff',
							},
							splitLine: {
							  lineStyle: {
								color: "rgba(97, 96, 89, 1.0)"
							  }
							}
						},
						{
							type: 'value',
							name: '比例',
							min: 0,
							max: 100,
							interval: 20,
							axisLabel: {
								formatter: '{value} %',
								color: '#fff',
							},
							nameTextStyle: {
								color: '#fff',
							},
							splitLine: {
							  lineStyle: {
								color: "rgba(97, 96, 89, 1.0)"
							  }
							}
						}
					],
					series: [{
							name: '金额(元)',
							type: 'bar',
							data: money,
							label: {
								show: true,
								position: 'top',
								valueAnimation: true,
								color: '#fff',
							}
						},
						{
							name: '比例',
							type: 'line',
							yAxisIndex: 1,
							data: percent,
						}
					]
				};
				fourth.setOption(option);
			},
			drawMonth(options) {
				const dom = document.querySelector('#monthChart');
				if (!monthChart) {
					monthChart = this.$echarts.init(dom);
				};
				if (options.length == 0) {
					monthChart.showLoading({
						text: '暂无数据...',
						color: '#c23531',
						textColor: '#ffffff',
						maskColor: 'rgba(255, 255, 255, 0)',
						zlevel: 0
					});
					return;
				}
				//数据处理
				let xAxis = [],
					money = [],
					percent = [];
				options.forEach((ele) => {
					xAxis.push(ele.MONAT);
					money.push(ele.AMOUNT);
				});
				let option = {
					grid: {
						x: 65,
						x2: 20,
						y: 45,
						y2: 25
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross',
							crossStyle: {
								color: '#999'
							}
						}
					},
					legend: {
						data: ['金额(元)'],
						textStyle: {
							color: "rgba(255, 255, 255, 1)"
						}
					},
					xAxis: [{
						type: 'category',
						data: xAxis,
						axisPointer: {
							type: 'shadow'
						},
						axisLabel: {
							interval: 0, //默认是auto,设置为0，则全部显示X轴
							color: '#fff',
							fontSize: 12,
							formatter: '{value} 月',
						},
			
					}],
					yAxis: {
							type: 'value',
							name: '金额(元)',
							axisLabel: {
								color: '#fff',
							},
							nameTextStyle: {
								color: '#fff',
							},
							splitLine: {
							  lineStyle: {
								color: "rgba(97, 96, 89, 1.0)"
							  }
							}
						},
					series: [{
							name: '金额(元)',
							type: 'bar',
							data: money,
							label: {
								show: true,
								position: 'top',
								valueAnimation: true,
								color: '#fff',
							}
						}
					]
				};
				monthChart.setOption(option);
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
	}

	.addbg {
		background-image: url(../../../../static/img/titleBG.jpg);
		background-size: 100% 100%;
	}

	.tableContent {
		width: 100%;
		height: 91%;
	}

	.titltTime {
		font-size: .2rem;
		text-align: right;
	}

	.tdContent {
		width: 100%;
		padding: .2% .5%;
		height: 35%;
	}
	.bottom_content{
		width: 100%;
		padding: .2% .5%;
		height: 30%;
	}
	.wrap-line {
		border: 1px solid #255ABE;
	}

	.allsize {
		width: 100%;
		height: 100%;
	}

	.charttitle {
		font-size: .2rem !important;
		color: #FFFFFF;
		overflow: hidden;
	}
	.produce_title {
		height: 10%;
		background-image: linear-gradient(to right, #125BCD, #5F58FC);
		padding: 0 2%;
		color: #89FAF7;
		font-size: .25rem;
	}
	.tableDetail{
		width: 100%;
		height: 90%;
	}
</style>
