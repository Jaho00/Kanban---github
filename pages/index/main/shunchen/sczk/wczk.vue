<template>
	<view class="setfull">
		<view class="row align-items-center" style="background-color: #1890FF;color: #ffffff;"
			v-if="isToastShow == 'noToast'">
			<view class="col row align-items-center align-self-center">
				<image :src="LOGO" mode="aspectFit" style="width: 100px;height: 50px;margin-left: 5%;"></image>
				<text style="margin-left:10%;font-size: .2rem;line-height: 2.5;"
					v-show="titleObj.FCOMPANY == '' ? false : true">{{ titleObj.FCOMPANY }}</text>
	
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
				<u-notice-bar class="toastTitle" mode="horizontal" :volume-icon="false" :volume-size="20" :speed="25"
					:font-size="20" :padding="0" type='none' :is-circular="true" :list="newtoaList" bg-color='#000000'
					color='#ffffff'></u-notice-bar>
			</view>
		</view>
		<!-- 内容区 -->
		<view class="row tableContent no-gutters" style="overflow: hidden;margin-top: .5%;">
			<view class="row no-gutters col-12 upContent">
					<view class="col-12 row no-gutters align-items-start">
						<table border="1" class="table_del">
							<colgroup>
								<!-- <col width='10%'> -->
								<col width='15%'>
								<col width='9%'>
								<col width='9%'>
								<col>
								<col>
								<col>
								<col>
								<col>
								<col>
								<col>
								<col>
								
							</colgroup>
							<tr style="height: 100%;">
								<th  class="charttitle">
									班次
								</th>
								<th class="charttitle">
									{{ className }}
								</th>
								<th colspan="9" class="charttitle">
									{{ nowDay }}5#喷涂线生产计划完成状况
								</th>
								
							</tr>
							<tr style="height: 100%;" class="charttitle"> 
								<td>计划生产产品</td>
								<td>颜色</td>
								<td>任务单号</td>
								<td>计划上挂数</td>
								<td>计划上挂时间</td>
								<td>实际上挂数</td>
								<td>实际上挂时间</td>
								<td>实际下挂数</td>
								<td>计划是否延误</td>
								<td>计划延误时间</td>
								<td>计划达成率</td>
							</tr>
						</table>
					</view>
					<view class="col-12 row no-gutters align-items-start GDContentHeight" style="height: 91%;overflow: auto;">
						<table border="1" class="table_del" style="table-layout:fixed;">
							<colgroup>
								<!-- <col width='10%'> -->
								<col width='15%'>
								<col width='9%'>
								<col width='9%'>
								<col>
								<col>
								<col>
								<col>
								<col>
								<col>
								<col>
								<col>
								
							</colgroup>
							
							<tr class="charttitle GdTrHeight" v-for="(item,index) in Listdata" :key="index">
								<td class="over_text1">{{ item.PRD_NAME }}</td>
								<td class="over_text1">{{ item.SPEC }}</td>
								<td class="over_text1">{{ item.FMO }}</td>
								<td class="over_text1">{{ item.NEED_QTY }}</td>
								<td class="over_text1">{{ item.PST }}</td>
								<td class="over_text1">{{ item.PI_QTY }}</td>
								<td class="over_text1">{{ item.ONLINE_TIME }}</td>
								<td class="over_text1">{{ item.FWORK_QTY }}</td>
								<td>{{ item.ISDELAYED == "1" ? '是' : '否' }}</td>
								<td class="over_text1">{{ item.DELAYED_TIME }}</td>
								<td class="over_text1">{{ item.COMP_RATE }}%</td>
							</tr>
						</table>
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
	var gdTimer = null; //滚动计时器
	var first = null;
	export default {
		data() {
			return {
				thStyle: {
					'backgroundColor': 'transparent',
					color: "#ffffff",
					fontSize: '14px'
				},
				titleObj: {},
				LOGO: "",
				nowTime: "",
				nowDay: "",
				year: '',
				month: '',
				toastList: [], // 消息列表
				toastString: "", //消息字符串
				isToastShow: 'noToast',
				Listdata:[],
				className:"",
				showBG: 0,
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
			this.getBC();
		},
		onHide() {
			clearInterval(timer);
			clearInterval(getINFOtimer);
			clearInterval(gdTimer);
		},
		onShow() {
			getINFOtimer = setInterval(() => {
				this.getInfo();
			}, (this.titleObj.FREFTIME * 1000 || 30000));
		},
		methods: {
			getBC(){
				const time = new Date().toLocaleTimeString();
				let result = uni.request({
					url: this.basePath + '/APP/jobReport!getShiftsForTime.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
						usercode: uni.getStorageSync('UserInfo').USERCODE,
						cjcode:  this.titleObj.FDATAPERMCODE, //车间编码
						cxcode: "", //产线编码
						cTime: time
					},
					method: 'POST',
					header:{
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					}
				});
				result.then((data)=>{
					if(data[1].data.IsSuccess){
						this.className = data[1].data.Data.FNAME;
					}
				});
			},
			getHeight(){
				setTimeout(() => {
					 this.rowHeight = document.getElementsByClassName('GdTrHeight')[0].clientHeight;
					console.log(`行高：${this.rowHeight}`);
				}, 300);
			},
			isnextGD(){
				this.showBG++;
				//如果下一条大于工单列表长度，则从第一条开始,此时需要结束函数，不需要再判断是否滚动
				if(this.showBG > this.Listdata.length - 1){
					document.getElementsByClassName('GDContentHeight')[0].scrollTop = 0;
					this.showBG = 0;
					return;
				}
				//如果没大于，则判断是否需要滚动
				const GDContent = document.getElementsByClassName('GDContentHeight')[0];
					const ListdataHeight = GDContent.clientHeight;
					const scrollTop = GDContent.scrollTop;
					const ListdataOffsetHeight = GDContent.scrollHeight;
					console.log(`能见高度：${ListdataHeight},超出高度：${scrollTop},表格总高度：${ListdataOffsetHeight}`);
				if(ListdataHeight >= ListdataOffsetHeight){
					return;
				}else if(ListdataHeight + scrollTop < ListdataOffsetHeight){
					this.setWLAnimation(this.rowHeight, 1000, GDContent);
				}else if((ListdataHeight + scrollTop) == ListdataOffsetHeight){
					return;
				}
			},
			//物料列表运动函数
			setWLAnimation(detaY, time, dom){
				// dom.scrollTop += detaY;
				const target =  dom.scrollTop + detaY;
				$(dom).animate({scrollTop: target}, 1000);
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
			getInfo(){
				var time = new Date();
				this.Listdata = [];
				//判断时间是否大于10点，否则请求前一天的数据
				let hour = time.getHours();
				if(hour <= 10){
					let tempTime = time.getTime() - 3600 * 10 * 1000;
					time = new Date(tempTime);
				}
				uni.request({
					url: this.basePath + '/APP/kanban!flameplatingProdCompStatus.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
						year: time.getFullYear(),
						month: time.getMonth() + 1,
						day: time.getDate(),
						dataperm: this.titleObj.FDATAPERMCODE
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						if (res.data.IsSuccess) {
							this.Listdata = res.data.Data;
							this.getHeight();
						} else {
				
						}
					},
				});
				//获取完工单，再设置滚动函数
				gdTimer = setInterval(function() {
					this.isnextGD();
				}.bind(this), 5000);
			},	
		}
	}
</script>
252704
<style>
	.setfull {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		background-image: url(../../../../../components/datav/img/bg.png);
		background-size: 100% 100%;
	}
	.tableContent {
		width: 100%;
		height: 92%;
	}
	.titltTime {
	    font-size: .2rem;
	    text-align: right;
	}
	.upContent {
		height: 100%;
		overflow: scroll;
	}
	.charttitle {
		font-size: .25rem !important;
		color: #FFFFFF;
		overflow: hidden;
	}
	.table_del{
		width: 100%;
		text-align: center;
		background-color: transparent;
	}
	.over_text1{
		overflow: hidden!important;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>

