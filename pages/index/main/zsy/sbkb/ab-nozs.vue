<template>
	<view class="container-fluid setfull no-gutters">
		<dv-full-screen-container>
			<!-- 区域多选弹出层 -->
			<u-popup v-model="isCXShow" z-index="900" mode="center" height="60%" width="60%">
				<!-- 自定义头部部分 -->
				<view class="row align-items-center" style="background-color: #106FBB;color: #ffffff;height: .8rem;font-weight: bold;font-size: .2rem;">
					<view class="col-2 align-self-center" style="font-size: .25rem;" @click="hidepage">
						<image src="../../../../../static/img/back.png" mode="" style="width: 40rpx;height: 40rpx;"></image>
						</view> 
					<view class="col pageTitle align-self-center" style="text-align: center;">
						<text>选择区域</text>
					</view>	
					<view class="col-2 row justify-content-end titltTime" style="padding-right:10px;">
						<button type="button" class="btn btn-success"
							style="font-size: .25rem;border-radius: 5px;padding:5px 10px;width: 100%;"
							@click="SaveCx">保存</button>
					</view>
					<view class="col-1 row justify-content-end titltTime" style="padding-right:10px;">
					</view>
				</view>
				<view class="row no-gutters justify-content-around">
					<checkbox-group @change="checkboxChange" class="row no-gutters col-12">
						<view class="col-6 row no-gutters justify-content-around mt-1" v-for="item in newLineList" :key="item.ADDRESS_CODE">
							<label class="uni-list-cell uni-list-cell-pd row no-gutters col-10" style="margin-bottom: 0;">
								<view class="col-2">
									<checkbox :value="item.ADDRESS_CODE" :checked="item.checked" />
								</view>
								<view class="col-10" style="color: #000000;">{{item.label}}</view>
							</label>
						</view>
					</checkbox-group>
				</view>
			</u-popup>
			<view class="row align-items-center" style="color: #ffffff;" v-if="isToastShow == 'noToast'">
				<view class="col align-self-center row no-gutters" style="font-size: .2rem;">
					<view class="col-6 row no-gutters align-items-center">
						<view class="col-4 row no-gutters justify-content-center">
							<text class="yl-text">车间</text>
						</view>
						<view class="col-8">
							<!-- 下拉框模式 -->
							<xfl-select :list="tempcjList" :clearable="false" :showItemNum="11" :focusShowList="false"
								:listShow="false" :isCanInput="false" :style_Container="'height: .4rem;width:100%;'"
								:selectHideType="'independent'" @change="changecj" :initValue="cjName"
								v-if="isShowcj">
							</xfl-select>
						</view>
					</view>
					<view class="col-6 row no-gutters align-items-center justify-content-center">
						<view class="col-8 row no-gutters justify-content-center">
							<button type="button" class="btn btn-primary"
								style="font-size: .15rem;border-radius: 5px;padding:5px 10px;width: 100%;"
								@click="$u.throttle(updateOEE,2000)">更新OEE</button>
						</view>
					</view>
				</view>
				<view class="col-4 pageTitle row justify-content-center" style="font-size: .4rem;text-align: center;">
					<text style="margin: 0 5%;">{{ titleObj.FTITLE }}</text>
					<!-- <text style="margin: 0 5%;">注塑车间看板</text> -->
				</view>
				<view class="col-5 titltTime row align-items-center">
					<view class="col-7 deletepadding row no-gutters align-content-around" style="width: 100%;">

					</view>
					<view class="col-5">
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
			<view class="row addpadding tableContent no-gutters" style="overflow: hidden;margin-top: .5%;">
				<!-- 概览部分 -->
				<view class="col-3 wrap-line no-gutters">
					<view class="row no-gutters col-12 time-text justify-content-center" style="height: 5%;">
						<text>设备概览</text>
					</view>
					<view class="col-12 no-gutters rate-content">
						<!-- <view class="col-12 row no-gutters">
							<view class="col-6 small-text justify-content-center no-gutters row">
								<text>当前时间：{{ week }}</text>
							</view>
							<view class="col-6 small-text justify-content-center no-gutters row">
								<text>班次：04-15 早班</text>
							</view>
						</view> -->
						<view class="col-12 row no-gutters ybp-content">
							<view class="col-6 small-text justify-content-center no-gutters row" id="kjl">
								
							</view>
							<view class="col-6 small-text justify-content-center no-gutters row" id="Wzhxl">
								
							</view>
						</view>
						<view class="col-12 row no-gutters">
							<view class="col-3 right-border">
								<view class="row no-gutters justify-content-center">
									<text class="small-text" style="color:#FFFFFF">{{ workNum + waitNum + stopNum }}</text>
								</view>
								<view class="row no-gutters justify-content-center">
									<text class="small-text" style="color:#02A7F0">设备总数</text>
								</view>
							</view>
							<view class="col-3 right-border">
								<view class="row no-gutters justify-content-center">
									<text class="small-text" style="color:#FFFFFF">{{workNum}}</text>
								</view>
								<view class="row no-gutters justify-content-center">
									<text class="small-text" style="color:#28CC7B">运行</text>
								</view>
							</view>

							<view class="col-3 right-border">
								<view class="row no-gutters justify-content-center">
									<text class="small-text" style="color:#FFFFFF">{{ waitNum }}</text>
								</view>
								<view class="row no-gutters justify-content-center">
									<text class="small-text" style="color:#FFB538">待机</text>
								</view>
							</view>
							<view class="col-3 right-border">
								<view class="row no-gutters justify-content-center">
									<text class="small-text" style="color:#FFFFFF">{{ stopNum }}</text>
								</view>
								<view class="row no-gutters justify-content-center">
									<text class="small-text" style="color:#AEB8C3">离线</text>
								</view>
							</view>
						</view>
					</view>
					<view class="row no-gutters col-12 time-text justify-content-center" style="height: 5%;">
						<text>异常情况</text>
					</view>
					<view class="col-12 no-gutters produce-content" style="overflow: scroll;">
						<u-table class="scrollList GXtableHeight" style="width: 100%;overflow: hidden;" bg-color="transparent" color="#FFFFFF" border-color="#052D84">
							 <u-tr v-for="(item,index) in BJList" :key="index" class="GxTrHeight">
								 <u-td width="20%" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" class="charttitle">
									 {{ item.DEVCODE }}
								 </u-td>
								<u-td class="charttitle">
									 {{ item.MESSAGE }}
								</u-td>
							 </u-tr>	
						</u-table>
					</view>
					<view class="row no-gutters col-12 time-text justify-content-center" style="height: 5%;">
						<text>今日综合效率概览</text>
					</view>
					<view class="col-12 no-gutters allrate-content" id="zhxlgl">

					</view>
				</view>
				<!-- 列表区域 -->
				<view class="col-9 row no-gutters tdContent align-content-start">
					<view class="addpadding setHeight" v-for="item in showdataList" :key="item.id">
						<view class="row no-gutters" :class="item.SY_STATUS  == 3 ? 'shapeGray' : item.SY_STATUS == 2 ? 'shapeGreen' : 'shapeRed'"
						 @click="openPage(item)">
							<view class="row Content-title no-gutters">
								<view class="col-7 list-label">
									{{item.FDEVNAME}}
								</view>
								<view class="col-5 delatepadding text-right">
									<!-- {{ item.OEE }}% -->
								</view>
							</view>
							<view class="row Content-text no-gutters" v-for="(ele) in labelArr" :key="ele.valuename">
								<view class="col-12 delatepadding over_text">
									<text>{{ ele.labelname }}：{{ item[ele.valuename] }}{{ ele.labelname == "OEE" ? "%" : "" }}</text>
								</view>
							</view>
							<view class="row Content-text no-gutters">
								<view style="background-color: #fff; width: 100%; height: .2rem; border-radius: .2rem;">
								<view :class="getTextStyle(item.FCOMP_RATE)" style="float: left;border-radius: .2rem; height: 100%;">	
								</view>
								<view style="font-size: .15rem; font-weight: normal; color: #0fac01;letter-spacing:1px; text-align: right; margin-right: 1%;">{{item.FDEVCODE}}</view>										
								</view>	
							</view>
						</view>
					</view>
				</view>

				<view class="row no-gutters bottom-Content">
					<view class="col-10" style="text-align: center;">

					</view>
					<view class="col-1" style="text-align: center;">
						<uni-pagination show-icon="true" :total="dataList.length" pageSize="25" :current="nowCurrent" @change="changPage"></uni-pagination>
					</view>

				</view>
			</view>
		</dv-full-screen-container>
	</view>
</template>

<script>
	var _self = null;
	var timer = null; //创建一个定时器
	var getINFOtimer = null;
	var kjlChart = null; //创建一个开机率的echarts对象，来判断是否存在
	var zhxlChart = null; //综合效率echarts对象
	var zhxlglChart = null; //综合效率概览折线图
	// import socket from '@/js_sdk/plus-websocket/index.js'
	export default {
		data() {
			return {
				titleObj: {},
				LOGO: "",
				nowTime: "",
				nowDay: "",
				week:"",
				toastList: [], // 消息列表
				toastString: "", //消息字符串
				isToastShow: 'noToast',
				isfirst: true,
				chartFontSize: "",
				dataList: [],
				showdataList: [],
				nowCurrent: 1, //当前显示第几页
				workNum: 0, //生产机台数
				waitNum: 0, //待机机台数
				stopNum: 0, //停机机台数
				BJList: [], //报警信息列表
				kjl: 0, //开机率
				cjList: [],
				tempcjList: [],
				CJobj: {
					name: "",
					code: "",
				},
				cxList: [],
				tempcxList: [],
				CXobj: {
					name: "",
					code: "",
				},
				isShowcj: false,
				isShowcx: false,
				isCXShow: false, //是否显示产线选择模块
				cjName:"",
				NameList:[],
				labelArr: [],
				today:"",
			}
		},
		computed: {
			newLineList(){
				this.cxList.forEach((ele, index)=>{
					ele.label = ele.ADDRESS_NAME;
					ele.value = index;
				});
				return this.cxList;				
			},
		},
		onLoad(option) {
			_self = this;
			
			//获取设备信息
			// const res = uni.getSystemInfoSync();
			//  this.sb = res.windowWidth;
			//从路径中获取看板标题等信息
			if (option.ele) {
				const item = JSON.parse(decodeURIComponent(option.ele));
				this.titleObj = item;
			}
			try {
				this.LOGO = this.basePath + this.titleObj.FLOGO;
			} catch (e) {
				//TODO handle the exception
				this.LOGO = "";
			}
			console.log(this.LOGO);
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
				this.today = time.getFullYear() + '-' + month + '-' + time.getDate();
				// this.week = "星期" + "日一二三四五六".charAt(time.getDay());
				this.nowTime = getNow(hours) + ':' + getNow(minutes) + ":" + getNow(seconds);
			}, 1000);
		},
		onShow() {
			this.tempcjList = [];
			this.getTableList();
			this.getCJ();
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
			getTextStyle(item){
				 if(item<100){
					 return { width: item*100 + '%',
							backgroundColor: '#FA3534',
							height: '100%;'};
				 }else{
					 return { width: '100%' ,
							  height: '100%;',
							  backgroundColor: '#19be6b',
							  };
				 }				 
			},
			//获取看板数据
			getSBdata() {
				uni.request({
					url: this.basePath + '/APP/kanban!devMonitorForStd.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
						dataperm: this.CJobj.code, //车间权限
						addrperm: this.CXobj.code, //区域权限
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						if (res.data.IsSuccess) {
							this.dataList = res.data.Data;
							//计算机台数
							this.workNum = 0;
							this.waitNum = 0;
							this.stopNum = 0;
							this.dataList.forEach((ele, index) => {
								ele.SY_STATUS == 3 ? this.stopNum++ : ele.SY_STATUS == 2 ? this.workNum++ : this.waitNum++;
							});
							//计算开机率，不用拼接百分号
							this.kjl = Math.floor((this.workNum / this.dataList.length) * 100);
							//设置显示的字段
							this.setTableName();
							let min = (this.nowCurrent - 1) * 25;
							let max = this.nowCurrent * 25;
							this.showdataList = this.dataList.slice(min, max);
							this.drawKJL(this.kjl);
						}
					},
				});
				uni.request({
					url: this.basePath + '/APP/device!getDevOEE.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
						fdate: "",
						dataperm: this.CJobj.code, //车间权限
						addrperm: this.CXobj.code, //区域权限
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						if (res.data.IsSuccess) {
							this.drawZHXL(res.data.Data.OEE_SUM[0].OEE);
							this.drawGL(res.data.Data.OEE_TIMES);
						}
					},
				});
				uni.request({
					url: this.basePath + '/APP/kanban!devAlert.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
						dataperm: this.CJobj.code, //车间权限
						addrperm: this.CXobj.code, //区域权限
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						if (res.data.IsSuccess) {
							this.BJList = res.data.Data;
						}
					},
				});
			},
			//今日综合效率概览
			drawGL(Datalist){
				if(Datalist.length == 0){
					return;
				}
				let xAixdata = [],
					seriesdata = [];
				Datalist.forEach((ele, index) =>{
					xAixdata.push(ele.TIMES_NAME);
					seriesdata.push(ele.OEE);
				});
				const dom = document.querySelector('#zhxlgl');
				if(!zhxlglChart) {
					zhxlglChart = this.$echarts.init(dom);
				}
				const option = {
					grid: {
						x: 40,
						x2: 10,
						y: 15,
						y2:35
					},
					 xAxis: {
					        type: 'category',
					        data: xAixdata,
							axisLabel: {
								color: '#fff',
								interval: 0,
								fontSize: 10,
								rotate: 45
							},
							axisTick: {
							      interval: 0
							    }
					    },
					    yAxis: {
					        type: 'value',
							axisLabel: {
								formatter: '{value}%',
								color: '#fff',
							},
							min: 0,
							max:100,
					    },
					    series: [{
					        data: seriesdata,
					        type: 'line'
					    }]
				};
				
				// 使用刚指定的配置项和数据显示图表。
				zhxlglChart.setOption(option);
			},
			//画综合效率仪表盘
			drawZHXL(data){
				const dom = document.querySelector('#Wzhxl');
				if(!zhxlChart) {
					zhxlChart = this.$echarts.init(dom);
				}
				const option = {
					 series: [{
							radius: "85%", //控制仪表盘大小，默认是75%
					        type: 'gauge',
					        axisLine: {
					            lineStyle: {
					                width: 10,
					                color: [
					                    [0.3, '#67e0e3'],
					                    [0.7, '#37a2da'],
					                    [1, '#fd666d']
					                ]
					            }
					        },
					        pointer: {
					            itemStyle: {
					                color: 'auto'
					            }
					        },
					        axisTick: {
					            distance: -10,
					            length: 8,
					            lineStyle: {
					                color: '#fff',
					                width: 2
					            }
					        },
					        splitLine: {
					            distance: -10,
					            length: 10,
					            lineStyle: {
					                color: '#fff',
					                width: 4
					            }
					        },
					        axisLabel: {
					            color: 'inherit',
					            distance: 20,
					            fontSize: 8
					        },
					        detail: {
					            valueAnimation: false,
								 offsetCenter: [0, '95%'],
					             formatter: '综合效率: {value}%',
					            color: 'inherit',
								fontSize: 12,
					        },
					        data: [{
					            value: data
					        }]
					    }]
				};
				// 使用刚指定的配置项和数据显示图表。
				zhxlChart.setOption(option);
			},
			//画开机率仪表盘
			drawKJL(data) {
				const dom = document.querySelector('#kjl');
				if(!kjlChart) {
					kjlChart = this.$echarts.init(dom);
				}
				const option = {
					 series: [{
						  radius: "85%",
					        type: 'gauge',
					        axisLine: {
					            lineStyle: {
					                width: 10,
					                color: [
					                    [0.3, '#67e0e3'],
					                    [0.7, '#37a2da'],
					                    [1, '#fd666d']
					                ]
					            }
					        },
					        pointer: {
					            itemStyle: {
					                color: 'auto'
					            }
					        },
					        axisTick: {
					            distance: -10,
					            length: 8,
					            lineStyle: {
					                color: '#fff',
					                width: 2
					            }
					        },
					        splitLine: {
					            distance: -10,
					            length: 10,
					            lineStyle: {
					                color: '#fff',
					                width: 4
					            }
					        },
					        axisLabel: {
					            color: 'inherit',
					            distance: 20,
					            fontSize: 8
					        },
					        detail: {
					            valueAnimation: true,
								 offsetCenter: [0, '95%'],
					             formatter: '开机率: {value}%',
					            color: 'inherit',
								fontSize: 12,
					        },
					        data: [{
					            value: data
					        }]
					    }]
				};
				// 使用刚指定的配置项和数据显示图表。
				kjlChart.setOption(option);
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
			//点击翻页按钮
			changPage(e) {
				this.nowCurrent = e.current;
				let min = (e.current - 1) * 25;
				let max = e.current * 25;
				this.showdataList = this.dataList.slice(min, max);
			},
			openPage(ele) {
				ele.LOGO = this.LOGO;
				ele.titleObj = this.titleObj;
				if(this.titleObj.FCOMPANY.indexOf('心里') == -1){
					uni.navigateTo({
					    // url: '/pages/index/main/zsy/jt/jt?item=' + encodeURIComponent(JSON.stringify(ele))
						url: '/pages/index/main/zsy/jt-one/jt-one?item=' + encodeURIComponent(JSON.stringify(ele))
					});
				}else{
					uni.navigateTo({
					    // url: '/pages/index/main/zsy/jt/jt?item=' + encodeURIComponent(JSON.stringify(ele))
						url: '/pages/index/main/zsy/jt-one/animate-one?item=' + encodeURIComponent(JSON.stringify(ele))
					});
				}
				
			},
			//获取车间列表
			getCJ() {
				this.cjList = [];
			
				uni.request({
					url: this.basePath + '/APP/jobReport!getWorkShopForUsercode.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
						usercode: uni.getStorageSync('UserInfo').USERCODE,

					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (result) => {
						if (result.data.IsSuccess) {
							result.data.Data.forEach((ele) => {
								this.tempcjList.push({
									value: ele.DEPTNAME
								})
							});
							this.tempcjList.push({value: '所有车间'});
							this.cjList = result.data.Data;
							if(uni.getStorageSync('zsInfo')){
								console.log(uni.getStorageSync('zsInfo'));
								const value = JSON.parse(uni.getStorageSync('zsInfo'));
								console.log(value)
								if (value.CJobj.name) {
									if(value.CXobj.code.indexOf(',') == -1){
										this.cjName = value.CXobj.name;
										
									}else{
										this.cjName = value.CJobj.name;
									}
									this.CJobj = value.CJobj;
									this.CXobj = value.CXobj;
									this.getSBdata();
								}else{
									this.cjName = result.data.Data[0].DEPTNAME;
									this.CJobj = {
										name: result.data.Data[0].DEPTNAME,
										code: result.data.Data[0].DEPTCODE,
									};
									this.getNewCX(); //获取产线列表
									
								}
							}else{
								this.cjName = result.data.Data[0].DEPTNAME;
								this.CJobj = {
									name: result.data.Data[0].DEPTNAME,
									code: result.data.Data[0].DEPTCODE,
								};
								this.getNewCX(); //获取产线列表
								
							}
							this.getCX(); //获取待选列表
						} else {
							
						}
					}
				})
			},
			//获取所有区域列表
			getCX() {
				this.cxList = [];
				this.tempcxList = [];
				let codeStr = [];
				this.cjList.forEach((ele, index) => {
					codeStr.push(ele.DEPTCODE);
				});
				uni.request({
					url: this.basePath + '/APP/jobReport!getRegionForWS.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
						wscode: codeStr.join(','), //车间代码
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (result) => {
						if (result.data.IsSuccess) {
							result.data.Data.forEach((ele) => {
								this.tempcjList.push({
									value: ele.ADDRESS_NAME
								})
							});
							this.cxList = result.data.Data;
							this.isShowcj = true;
						} else {
							
						}
					}
				})
			},
			//选择车间
			changecj({
				newVal,
				oldVal,
				index
			}) {
				let setFalse = true;
				this.nowCurrent = 1;
				this.cxList.forEach((ele) =>{
					if(ele.ADDRESS_NAME == newVal){
						this.CJobj = {
							name: ele.FDEPTNAME,
							code: ele.FDEPTCODE,
						};
						this.CXobj = {
							name: ele.ADDRESS_NAME,
							code: ele.ADDRESS_CODE
						}
						this.getSBdata(); //获取产线列表
						setFalse = false;
						uni.setStorage({
							key: 'zsInfo',
							data: JSON.stringify({
								CJobj: this.CJobj,
								CXobj: this.CXobj
							}),
							success: function () {
								
							}
						});
					}
					
				});
				if(!setFalse){
					return;
				}
				if(newVal == '所有车间'){
					let codeStr = [];
					this.cjList.forEach((ele, index) => {
						codeStr.push(ele.DEPTCODE);
					});
					this.CJobj = {
						name: '所有车间',
						code: codeStr.join(','),
					};
				}else{
					//newVal 当前选中的值   index 当前选中的值的id  oldVal 上一次选中的值
					this.cjList.forEach((ele, index) => {
						if (ele.DEPTNAME == newVal) {
							this.CJobj = {
								name: ele.DEPTNAME,
								code: ele.DEPTCODE,
							};
						}
					});
				}
				
				this.getNewCX(); //获取产线列表
			},
			getNewCX(){
				uni.request({
					url: this.basePath + '/APP/jobReport!getRegionForWS.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
						wscode: this.CJobj.code, //车间代码
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (result) => {
						if (result.data.IsSuccess) {
							let nameStr = [],
								codeStr = [];
							result.data.Data.forEach((ele) => {
								nameStr.push(ele.ADDRESS_NAME);
								codeStr.push(ele.ADDRESS_CODE);
							});
							this.CXobj = {
								name: nameStr.join(','),
								code: codeStr.join(','),
							};
							uni.setStorage({
								key: 'zsInfo',
								data: JSON.stringify({
									CJobj: this.CJobj,
									CXobj: this.CXobj
								}),
								success: function () {
									
								}
							});
							this.getSBdata();
							this.isShowcj = true;
						} else {
							
						}
					}
				})
			},
			//选择区域
			changecx({
				newVal,
				oldVal,
				index
			}) {
				//newVal 当前选中的值   index 当前选中的值的id  oldVal 上一次选中的值
				this.cxList.forEach((ele, index) => {
					if (ele.ADDRESS_NAME == newVal) {
						this.CXobj = {
							name: ele.ADDRESS_NAME,
							code: ele.ADDRESS_CODE
						};
					}
				});
				this.getSBdata();
			},
			//显示选择产线组件
			chooseCX(){
				this.isCXShow = true;
			},
			hidepage(){
				this.isCXShow = false;
			},
			SaveCx(){
				let NametempArr = [],
					CodetempArr = [];
				this.newLineList.forEach((ele, index)=>{
					if(ele.checked){
						CodetempArr.push(ele.ADDRESS_CODE);
						NametempArr.push(ele.ADDRESS_NAME);
					}
				});
				this.CXobj = {
					name: NametempArr.join(','),
					code: CodetempArr.join(','),
				};
				this.getSBdata();
				this.isCXShow = false;
			},
			checkboxChange(e){
				var items = this.newLineList,
					values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if(values.includes(item.ADDRESS_CODE)){
						this.$set(item,'checked',true)
					}else{
						this.$set(item,'checked',false)
					}
				}
			},
			getTableList(){
				this.NameList = [];
				uni.request({
					url: this.basePath + '/APP/kanban!getKBField.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
						kbcode: this.titleObj.FCODE, //车间代码
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (result) => {
						if (result.data.IsSuccess) {
							this.NameList = result.data.Data;
						} else {
							
						}
					}
				})
			},
			setTableName(){
				this.labelArr = [];
				this.NameList.forEach((target, i)=>{
					if(i < 5){
						this.labelArr.push({
							labelname: target.FIELD_NAME,
							valuename: target.FIELD_CODE
						});
					}
				});
			},
			updateOEE(){
				uni.showLoading({
					title: '更新中'
				});
				uni.request({
					url: this.basePath + '/APP/device!updateDevOEE.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
						sdate: this.today,
						edate: this.today
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (result) => {
						if(result.data.IsSuccess){
							uni.hideLoading();
							uni.showToast({
								title: '更新完成',
								duration: 1000
							});
						}else{
							uni.hideLoading();
							uni.showToast({
								title: result.data.message,
								duration: 1000
							});
						}
						
					}
				})
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
		background: linear-gradient(-135deg, transparent 0px, rgba(255, 212, 0, 0.8) 0, #C99A7A);
		/* margin: 0 .5%; */
	}

	.shapeGreen {
		background: linear-gradient(-135deg, transparent 0px, rgba(39, 185, 75, 0.75) 0, #116125);
		/* margin: 0 .5%; */
	}

	.shapeGray {
		background: linear-gradient(-135deg, transparent 0px, rgba(241, 241, 241, 0.5) 0, #999AA4);
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
		font-size: .16rem;
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
		height: 18.5%;
		width: 20%!important;
	}

	.statu-btn {
		padding: 5px 0px;
		line-height: 1.5;
		font-size: .19rem;
		text-align: center;
		border-radius: 10%;
	}

	.wrap-line {
		height: 93%;
		border: 1px solid #255ABE;
	}

	.charttitle {
		font-size: .18rem !important;
		color: #FFFFFF;
		overflow: hidden;
	}

	.ic-sb {
		width: 24px;
		height: 24px;
		vertical-align: sub;
	}

	/* 右侧设备概览样式 */
	.time-text {
		color: #85FAF6;
		font-size: .3rem;
	}

	.small-text {
		color: #85FAF6;
		font-size: .25rem;
	}

	.rate-content {
		background-color: #001D3A;
		border: 1px solid #00468C;
		height: 35%;
	}

	.produce-content {
		background-color: #001D3A;
		border: 1px solid #00468C;
		height: 20%;
	}

	.allrate-content {
		background-color: #001D3A;
		border: 1px solid #00468C;
		height: 30%;
	}

	/* .right-border::after{
		 content: "";
		  position: absolute;
		  height: 50%;
		  width: 1px;
		  background: #00468C;
		  right: 0;
		  top: 35%;
	} */
	/* 模拟淘宝实现中间小竖线 */
	.right-border {
		border-right: 1px solid #00468C;
		display: inline-block;
		margin-right: 0px;
		padding: 0px 0px 0px 3px;
	}

	.ybp-content {
		height: 75%;
	}

	@media screen and (max-width: 1300px) {
		.titleDec {
			width: 100px;
			height: 35px;
		}

		.ic-sb {
			width: 20px;
			height: 20px;
			vertical-align: sub;
		}
	}
</style>

