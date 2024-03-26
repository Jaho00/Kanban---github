<template>
	<view class="container-fluid setfull no-gutters">
		<dv-full-screen-container>
			<view class="row align-items-center" style="color: #ffffff;" v-if="isToastShow == 'noToast'">
				<view class="col row align-items-center align-self-center">
					<image :src="LOGO" mode="aspectFit" style="width: 100px;height: 50px;margin-left: 5%;"></image>
					<text style="margin-left:10%;height:50px;font-size: .2rem;line-height: 2.5;" v-show="titleObj.FCOMPANY == '' ? false : true">{{ titleObj.FCOMPANY }}</text>
					
				</view>
				<view class="col-4 pageTitle row justify-content-center" style="font-size: .4rem;text-align: center;">
					<text style="margin: 0 5%;">{{ titleObj.FTITLE }}</text>
					<!-- <text style="margin: 0 5%;">注塑车间看板</text> -->
				</view>
				<view class="col-5 titltTime row align-items-center">
					<view class="col-9 deletepadding row no-gutters align-content-around" style="width: 100%;">
						<view class="col-3 deletepadding">
							<view class="statu-btn" style="margin: 0 5px;background-color: rgba(39, 185, 75, 0.75);">
								<image src="../../../../static/img/领料.png" mode="scaleToFill" class="ic-sb"></image>
								<text style="margin: 0 5px;">生产</text>
								<text>{{ workNum }}</text>
								<text>台</text>
							</view>
						</view>
						<view class="col-3 deletepadding">
							<view class="statu-btn" style="margin: 0 5px;background-color: rgba(255, 212, 0, 0.8);">
								<image src="../../../../static/img/领料.png" mode="scaleToFill" class="ic-sb"></image>
								<text style="margin: 0 5px;">待机</text>
								<text>{{ waitNum }}</text>
								<text>台</text>
							</view>
						</view>
						<view class="col-3 deletepadding">
							<view class="statu-btn" style="margin: 0 5px;background-color: rgba(241, 241, 241, 0.6);">
								<image src="../../../../static/img/领料.png" mode="scaleToFill" class="ic-sb"></image>
								<text style="margin: 0 5px;">停机</text>
								<text>{{ stopNum }}</text>
								<text>台</text>
							</view>
						</view>
						<view class="col-3 deletepadding">
							<view class="statu-btn" style="background-color: rgba(24, 57, 104, 0.6);">
								<image src="../../../../static/img/领料.png" mode="scaleToFill" class="ic-sb"></image>
								<text style="margin: 0 5px;">开机率</text>
								<text>{{ kjl }}</text>
								<text>%</text>
							</view>
						</view>
					</view>
					<view class="col-3">
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
				<view class="col-9 row no-gutters tdContent align-content-start">
					<view class="col-3 addpadding setHeight" v-for="item in showdataList" :key="item.id">
						<view class="row no-gutters" :class="item.SY_STATUS  == 3 ? 'shapeGray' : item.SY_STATUS == 2 ? 'shapeGreen' : 'shapeRed'" @click="openPage(item)">
							<view class="row Content-title no-gutters">
								<view class="col-4 list-label">
									{{item.FDEVNAME}}
								</view>
								<view class="col-6 list-label">
									<!-- {{item.zt}} -->
								</view>
								<view class="col-2 delatepadding">
									<u-icon :name="item.SY_STATUS  == 3 ? 'error-circle' : item.SY_STATUS == 2 ? 'checkmark-circle-fill' : 'more-circle-fill'" 
										color="#ffffff" 
										size="18"></u-icon>
								</view>
							</view>
							<view class="row Content-text no-gutters">
								<view class="col-4 delatepadding">
									<text>产品名称：</text>
								</view>
								<view class="col-8 list-label">
									{{item.FPRD_NAME}}
								</view>
							</view>
							<view class="row Content-text no-gutters">
								<view class="col-4 delatepadding">
									<text>派工单号：</text>
								</view>
								<view class="col-8 list-label">
									{{item.FJOB_NO}}
								</view>
							</view>
							<view class="row Content-text no-gutters">
								<view class="col-4 delatepadding">
									<text>物料编号：</text>
								</view>
								<view class="col-8 list-label">
									{{item.FPRD_NO}}
								</view>
							</view>
							<view class="row Content-text no-gutters">
								<view class="col-4 delatepadding">
									<text>模具编号：</text>
								</view>
								<view class="col-8 list-label">
									{{item.FMOLD_NO}}
								</view>
							</view>
							<view class="row Content-text no-gutters">
								<view class="col-4 delatepadding">
									<text>模次(P/R)：</text>
								</view>
								<view class="col-8 list-label">
									{{item.FJOB_BENUM}} / {{item.FACT_BENUM}} 
								</view>
							</view>
							<view class="row Content-text no-gutters">
								<view class="col-4 delatepadding">
									<text>周期(P/R)：</text>
								</view>
								<view class="col-8 list-label">
									{{item.FPRODCYCLE_STD}} / {{item.FPRODCYCLE_FCT}} 
								</view>
							</view>
							<view class="row Content-text no-gutters">
								<view class="col-4 delatepadding">
									<text>产量(P/R)：</text>
								</view>
								<view class="col-8 list-label">
									{{item.FJOB_QTY}} / {{item.FQUA_QTY}} 
								</view>
							</view>
							<view class="row Content-text no-gutters">
								<view class="col-4 delatepadding">
									<text>心跳：</text>
								</view>
								<view class="col-8 list-label">
									{{item.HEARTBEATTIME}}
								</view>
							</view>
							<view class="row Content-text no-gutters">
								<u-line-progress :percent="item.FCOMP_RATE" :show-percent="true" height="10" fontSize="0.23" :active-color="item.FCOMP_RATE > 100 ? '#FA3534':'#19be6b'"></u-line-progress>
							</view>
						</view>
					</view>
				</view>
				<!-- 报警信息部分 -->
				<view class="col-3 row no-gutters wrap-line">
					<u-table class="scrollList GXtableHeight" style="width: 100%;overflow: hidden;" bg-color="transparent" color="#FFFFFF" border-color="#052D84">
						 <u-tr v-for="(item,index) in BJList" :key="index" class="GxTrHeight">
							 <u-td width="20%" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" class="charttitle">
								 {{ item.DEVCODE }}
							 </u-td>
							<u-td class="charttitle">
								 {{ item.MESSAGE }}
							</u-td>
							 <u-td class="charttitle">
								 {{ item.CURRTIME }}
							 </u-td>
						 </u-tr>	
					</u-table>
				</view>
				<view class="row no-gutters bottom-Content">
					<view class="col-4" style="text-align: center;">
						
					</view>
					<view class="col-1" style="text-align: center;">
						<uni-pagination show-icon="true" :total="dataList.length" pageSize="12" current="1" @change="changPage"></uni-pagination>
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
	import socket from '@/js_sdk/plus-websocket/index.js'
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
				chartFontSize: "",
				dataList:[],
				showdataList:[],
				nowCurrent: 1,  //当前显示第几页
				workNum:0,  //生产机台数
				waitNum:0,	//待机机台数
				stopNum:0,	//停机机台数
				BJList:[], //报警信息列表
				kjl:0 , //开机率
			}
		},
		onLoad(option) {
			_self = this;
			//获取设备信息
			// const res = uni.getSystemInfoSync();
			//  this.sb = res.windowWidth;

			//从路径中获取看板标题等信息
			if(option.ele){
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
				this.nowTime = getNow(hours) + ':' + getNow(minutes) + ":" + getNow(seconds);
			}, 1000);
			this.getToast();
			this.getSBdata();
		},
		onShow() {
			this.getSBdata();
			getINFOtimer = setInterval(()=>{
				this.getSBdata();
			},(this.titleObj.FREFTIME * 1000 || 30000));
		},
		onHide() {
			clearInterval(timer);
			clearInterval(getINFOtimer);
		},
		mounted() {
			// getINFOtimer = setInterval(()=>{
			// 	this.getSBdata();
			// },(this.titleObj.FREFTIME * 1000 || 30000));
			//第一种方式
			//  var wsUrl="ws://192.168.8.77:8080/webSocketRj/SYSTEM/TES";
			// //客户端与服务端建立连接，建立连接以后，它会发出一个ws.open事件
			// var ws=new WebSocket(wsUrl);
			// //连接成功
			// ws.onopen=function(){
			// 	console.info("连接成功")
			// }
			//第二种方式
			// const SocketTaskObj = socket.connectSocket({
			// 							url: 'wss://192.168.8.77:8080/webSocketRj/SYSTEM/TES',
			// 							data() {
			// 								return {
			// 									zhid: '',
			// 									devcode: ''
			// 								};
			// 							},
			// 							header: {
			// 								'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
			// 							},
			// 							protocols: ['protocol1'],
			// 							method: 'POST'
			// 						});
			// socket.onSocketOpen(function (res) {
			//   console.log('WebSocket连接已打开！');
			// });
		},
		methods: {
			//获取看板数据
			getSBdata(){
				uni.request({
					url: this.basePath + '/APP/kanban!devMonitorForZS.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
						dataperm: this.titleObj.FDATAPERMCODE,  //车间权限
						addrperm: this.titleObj.FCXCODE,  //产线权限
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
							this.dataList.forEach((ele, index)=>{
								ele.SY_STATUS  == 3 ? this.stopNum++ : ele.SY_STATUS == 2 ? this.workNum++ : this.waitNum++;
							});
							//计算开机率，不用拼接百分号
							this.kjl = Math.floor((this.workNum / this.dataList.length) * 100);
							let min = (this.nowCurrent - 1) * 12;
							let max = this.nowCurrent * 12;
							this.showdataList = this.dataList.slice(min,max);
						}
					},
				});
				uni.request({
					url: this.basePath + '/APP/kanban!devAlert.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
						dataperm: this.titleObj.FDATAPERMCODE,  //车间权限
						addrperm: this.titleObj.FCXCODE,  //产线权限
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
			changPage(e){
				this.nowCurrent = e.current;
				let min = (e.current - 1) * 12;
				let max = e.current * 12;
				this.showdataList = this.dataList.slice(min,max);
			},
			openPage(ele){
				ele.LOGO = this.LOGO;
				ele.titleObj = this.titleObj;
				uni.navigateTo({
				    // url: '/pages/index/main/zsy/jt/jt?item=' + encodeURIComponent(JSON.stringify(ele))
					url: '/pages/index/main/zsy/jt-one/jt-one?item=' + encodeURIComponent(JSON.stringify(ele))
				});
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
		height: 94%;
	}

	.tdContent {
		width: 100%;
	}
	.bottom-Content{
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
	.deletepadding{
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
	.setHeight{
		height: 31%;
	}
	.statu-btn{
		padding: 5px 0px;
		line-height: 1.5;
		font-size: .19rem;
		text-align: center;
		border-radius: 10%;
	}
	.wrap-line{
		height: 93%;
		border: 1px solid #255ABE;
	}
	.charttitle{
		font-size: .18rem!important;
		color: #FFFFFF;
		overflow: hidden;
	}
	.ic-sb{
		width: 24px;
		height: 24px;
		vertical-align: sub;
	}
	@media screen and (max-width: 1300px) {
		.titleDec {
			width: 100px;
			height: 35px;
		}
		.ic-sb{
			width: 20px;
			height: 20px;
			vertical-align: sub;
		}
	}
</style>
