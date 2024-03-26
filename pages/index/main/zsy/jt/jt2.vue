<template>
	<view class="container-fluid setfull no-gutters">
		<dv-full-screen-container>
			<view class="row align-items-center" style="color: #ffffff;">
				<view class="col row align-items-center align-self-center">
					<image :src="item.LOGO"  mode="aspectFit" style="width: 100px;height: 50px;margin-left: 5%;"></image>
					<text style="margin-left:10%;height:50px;font-size: .2rem;line-height: 2.5;" v-show="titleObj.FCOMPANY == '' ? false : true">{{ titleObj.FCOMPANY }}</text>
					
				</view>
				<view class="col-4 pageTitle row justify-content-center" style="font-size: .4rem;text-align: center;">
					<text style="margin: 0 5%;">机台实时看板</text>
					<!-- <text style="margin: 0 5%;">注塑车间看板</text> -->
				</view>
				<view class="col-6 titltTime row justify-content-end">
					<view class="col-9 deletepadding row no-gutters justify-content-end" style="width: 100%;">
						<view class="col-3 deletepadding">
							<!-- <view class="statu-btn" style="margin: 0 5px;background-color: rgba(39, 185, 75, 0.75);">
								<image src="../../../../../static/img/领料.png" mode="scaleToFill" class="ic-sb"></image>
								<text style="margin: 0 5px;">生产工艺</text>
							</view> -->
						</view>
						<view class="col-3 deletepadding">
							<view class="statu-btn" style="background-color: rgba(24, 57, 104, 0.6);" @click="backBtn">
								<image src="../../../../../static/img/领料.png" mode="scaleToFill" class="ic-sb"></image>
								<text style="margin: 0 5px;">返回</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 内容区 -->
			<view class="row addpadding tableContent no-gutters" style="overflow: hidden;margin-top: .5%;">
				<view class="col-4 row no-gutters tdContent align-content-start">
					<view class="col-12 addpadding setHeight">
						<view class="row no-gutters" :class="item.SY_STATUS  == 3 ? 'shapeGray' : item.SY_STATUS == 2 ? 'shapeGreen' : 'shapeRed'">
							<view class="row Content-title no-gutters">
								<view class="col-4 list-label">
									{{item.FDEVNAME}}
								</view>
								<view class="col-6 list-label">
									<!-- {{item.zt}} -->
								</view>
								<view class="col-2 delatepadding">
									
								</view>
							</view>
							<view class="row Content-text no-gutters">
								<view class="col-2 delatepadding">
									<text>产品名称：</text>
								</view>
								<view class="col-8 list-label">
									{{item.FPRD_NAME}}
								</view>
							</view>
							<view class="row Content-text no-gutters">
								<view class="col-2 delatepadding">
									<text>派工单号：</text>
								</view>
								<view class="col-8 list-label">
									{{item.pgd}}
								</view>
							</view>
							<view class="row Content-text no-gutters">
								<view class="col-2 delatepadding">
									<text>物料编号：</text>
								</view>
								<view class="col-8 list-label">
									{{item.FPRD_NO}}
								</view>
							</view>
							<view class="row Content-text no-gutters">
								<view class="col-2 delatepadding">
									<text>模具编号：</text>
								</view>
								<view class="col-8 list-label">
									{{item.FMOLD_NO}}
								</view>
							</view>
							<view class="row Content-text no-gutters">
								<view class="col-2 delatepadding">
									<text>模次(P/R)：</text>
								</view>
								<view class="col-8 list-label">
									{{item.FJOB_BENUM}} / {{item.FACT_BENUM}} 
								</view>
							</view>
							<view class="row Content-text no-gutters">
								<view class="col-2 delatepadding">
									<text>周期(P/R)：</text>
								</view>
								<view class="col-8 list-label">
									{{item.FPRODCYCLE_STD}} / {{item.FPRODCYCLE_FCT}} 
								</view>
							</view>
							<view class="row Content-text no-gutters">
								<view class="col-2 delatepadding">
									<text>产量(P/R)：</text>
								</view>
								<view class="col-8 list-label">
									{{item.FJOB_QTY}} / {{item.FQUA_QTY}} 
								</view>
							</view>
							<view class="row Content-text no-gutters">
								<view class="col-2 delatepadding">
									<text>心跳：</text>
								</view>
								<view class="col-8 list-label">
									{{item.HEARTBEATTIME}}
								</view>
							</view>
							<view class="row Content-text no-gutters" style="padding-bottom: 2%;">
								<u-line-progress :percent="item.FCOMP_RATE" :show-percent="true" height="10" fontSize="0.23" :active-color="item.FCOMP_RATE > 100 ? '#FA3534':'#19be6b'"></u-line-progress>
							</view>
						</view>
					</view>
					<view class="left_right">
						<view class="lpl">
							<em>100 <i>%</i></em>
							<label>良品率</label>
						</view>
						<view class="tjsc">
							<em>0 <i>分</i></em>
							<label>当日停机</label>
						</view>
					</view>
					<view class="col-12 add_border" style="height: 65%;margin-top: 2%;overflow: hidden;">
						<view class="row no-gutters justify-content-center" style="background-color: #1D395F;border-bottom: solid 1px #2A82E4;">
							<text style="color: #FFFFFF;font-size: .3rem;">当前机台生产计划列表</text>
						</view>
						<dv-scroll-board :config="scjh" />
					</view>
				</view>
				<view class="col-8 row no-gutters tdContent align-content-start addpadding">
					<view class="col-12 addpadding add_border"  style="height: 31%;">
						<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts downDiv" style="width: 100%;height: 100%;"></canvas>
					</view>
					<view class="col add_border" style="height: 65%;margin-top: 1%;margin-right: 0.5%;overflow: hidden;">
						<view class="row no-gutters justify-content-center" style="background-color: #1D395F;border-bottom: solid 1px #2A82E4;">
							<text style="color: #FFFFFF;font-size: .3rem;">当日停机记录</text>
						</view>
						<dv-scroll-board :config="tjjl" />
					</view>
					<view class="col add_border" style="height: 65%;margin-top: 1%;margin-left: 0.5%;overflow: hidden;">
						<view class="row no-gutters justify-content-center" style="background-color: #1D395F;border-bottom: solid 1px #2A82E4;">
							<text style="color: #FFFFFF;font-size: .3rem;">当前派工单次品记录</text>
						</view>
						<dv-scroll-board :config="cpjl" />
					</view>
				</view>	
			</view>
		</dv-full-screen-container>
	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js'; //引入ucharts图表组件
	var _self = null;
	var timer = null; //创建一个定时器
	var getINFOtimer = null;
	var canvasLineA = null; 
	import socket from '@/js_sdk/plus-websocket/index.js'
	export default {
		data() {
			return {
				titleObj: {},
				LOGO: "",
				isfirst: true,
				chartFontSize: "",
				dataList:[],
				showdataList:[],
				item:{},   //从路径中获取对象
				
				nowCurrent: 1,  //当前显示第几页
				workNum:0,  //生产机台数
				waitNum:0,	//待机机台数
				stopNum:0,	//停机机台数
				BJList:[], //报警信息列表
				kjl:0 , //开机率
				scjh:{}, //生产机会列表
				tjjl:{}, //停机记录
				cpjl:{}, //次品记录
				mc:{
					categories: [],
					series: []
				},
				downDiv:{},
			}
		},
		onLoad(option) {
			_self = this;
			const item = JSON.parse(decodeURIComponent(option.item));
			console.log(item);
			this.item = item;
			this.getSBdata();
		},
		onShow() {
			getINFOtimer = setInterval(()=>{
				// this.getSBdata();
			},(this.titleObj.FREFTIME * 1000 || 30000));
		},
		onHide() {
			clearInterval(timer);
			clearInterval(getINFOtimer);
		},
		mounted() {
			getINFOtimer = setInterval(()=>{
				// this.getSBdata();
			},(this.titleObj.FREFTIME * 1000 || 30000));
		},
		methods: {
			//获取看板数据
			getSBdata(){
				uni.request({
					url: this.basePath + '/APP/kanban!devProData.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
						devcode: this.item.FDEVCODE,  //设备编码
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						if (res.data.IsSuccess) {
							//当前机台生产计划数据处理
							let newArray = [];
							res.data.Data[0].detail.forEach((ele, index) => {
								let temp = [];
								temp.push(ele.FJOB_NO,ele.FPRD_NAME,ele.FMOLD_NO,ele.FPLAN_BEGINTIME);
								newArray.push(temp);
							});
							this.scjh = {
								header: ['派工单号','产品名称', '模具编号','派工日期'],
								data: newArray,
								index: false,
								columnWidth: [200, 200, 200,200],
								align: ['center','center','center','center'],
								rowNum: 10,
								headerBGC: '#1D395F',
								headerHeight: 45,
								oddRowBGC: 'rgba(10, 29, 50, 0.8)',
								evenRowBGC: 'rgba(10, 29, 50, 0.8)',
							}
							//停机记录数据处理
							let TJArray = [];
							res.data.Data[1].detail.forEach((ele, index) => {
								let temp = [];
								temp.push(ele.FABNORMAL,ele.STOPTIME,ele.FLAUNCHTIME,ele.SOLVETIME);
								TJArray.push(temp);
							});
							this.tjjl = {
								header: ['原因','停机时长', '开始时间','结束时间'],
								data: TJArray,
								index: false,
								columnWidth: [200, 200, 200,200],
								align: ['center','center','center','center'],
								rowNum: 10,
								headerBGC: '#1D395F',
								headerHeight: 45,
								oddRowBGC: 'rgba(10, 29, 50, 0.8)',
								evenRowBGC: 'rgba(10, 29, 50, 0.8)',
							};
							//次品记录数据处理
							let CPArray = [];
							res.data.Data[2].detail.forEach((ele, index) => {
								let temp = [];
								temp.push(ele.FBADITEM_NAME,ele.FQTY ,ele.SY_CREATETIME ,ele.SY_CREATEUSERNAME );
								CPArray.push(temp);
							});
							this.cpjl = {
								header: ['次品原因','次品数量', '录入时间','录入人'],
								data: CPArray,
								index: false,
								columnWidth: [200, 200, 200,200],
								align: ['center','center','center','center'],
								rowNum: 10,
								headerBGC: '#1D395F',
								headerHeight: 45,
								oddRowBGC: 'rgba(10, 29, 50, 0.8)',
								evenRowBGC: 'rgba(10, 29, 50, 0.8)',
							};
							//模次数据处理
							let tempBZ = [];  //标准周期
							let tempSJSC = [];	//实际生产周期
							let tempSJCX = [];	//实际成型周期
							let count = 0;
							res.data.Data[3].detail.forEach((ele, index) => {
								if(index == count * 8 + 1){
									this.mc.categories.push(index); //横坐标
									tempBZ.push(ele.FPRODCYCLE_STD);
									tempSJSC.push(ele.FPRODCYCLE_FAC);
									tempSJCX.push(ele.FMOLDCYCLE_FAC);
									count++;
								}
								
							});
							this.mc.series.push({
								name: '标准周期',
								data: tempBZ,
								// color: '#000000'
							}, {
								name: '实际生产周期',
								data: tempSJSC
							}, {
								name: '实际成型周期',
								data: tempSJCX
							}); //纵坐标
							this.drawLine("canvasLineA", this.mc);
						}
					},
				});
				
			},
			//点击返回按钮
			backBtn(){
				uni.navigateBack({
				    delta: 1
				});
			},
			drawLine(canvasId,chartData){
				setTimeout(() => {
					let downDiv = uni.createSelectorQuery().in(this).select(".downDiv");
					downDiv.fields({
						size: true,
						scrollOffset: true
					}, data => {
						this.downDiv = {
							height: data.height,
							width: data.width
						};
						canvasLineA = new uCharts({
							$this: _self,
							canvasId: canvasId,
							type: 'line',
							fontSize:11,
							legend:{show:true,fontColor:'#ffffff'},
							dataLabel:false,
							dataPointShape:true,
							background:'#FFFFFF',
							pixelRatio:1,
							animation: true,
							categories: chartData.categories,
							series: chartData.series,
							xAxis: {
								type:'grid',
								gridColor:'#ffffff',
								gridType:'dash',
								dashLength:8,
								fontColor: '#ffffff',
								disableGrid: true
							},
							yAxis: {
								gridType:'solid',
								gridColor:'#cccccc',
								splitNumber:5,
								data:[
									{
										fontColor:'#FFFFFF',
										disabled:false,	
									}
								],
							},
							dataLabel: false,
							width: _self.downDiv.width,
							height: _self.downDiv.height,
							extra: {
								line:{
									type: 'straight'
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
		height: 100%;
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
		padding: 5px 10px;
		line-height: 1.5;
		font-size: .19rem;
		text-align: center;
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
	.left_right{
		position: absolute;
		right: 5%;
		top: 1%;
	}
	.lpl {
	    width: 100px;
	    height: 100px;
	    text-align: center;
	    padding: 10px 0 0;
	    border-radius: 100%;
	    border: 5px solid rgba(17, 173, 108, 0.8);
	    margin-bottom: 10px;
		font-size: .2rem;
		color: #FFFFFF;
	}
	.tjsc {
	    width: 100px;
	    height: 100px;
	    text-align: center;
	    padding: 10px 0 0;
	    border-radius: 100%;
	    border: 5px solid rgba(158, 158, 158, 0.8);
		font-size: .2rem;
		color: #FFFFFF;
	}
	.left_right em {
	    color: #fff;
	    display: block;
	    font-size: 20px;
		font-style: normal;
	}
	.add_border {
		border: 1px solid #2A82E4;
	}
	em i {
	   font-style: normal;
	}
	@media screen and (max-width: 1300px) {
		.titleDec {
			width: 100px;
			height: 35px;
		}
		.lpl {
		    width: 80px;
		    height: 80px;
		    text-align: center;
		    padding: 10px 0 0;
		    border-radius: 100%;
		    border: 5px solid rgba(17, 173, 108, 0.8);
		    margin-bottom: 10px;
			font-size: .2rem;
			color: #FFFFFF;
		}
		.tjsc {
		    width: 80px;
		    height: 80px;
		    text-align: center;
		    padding: 10px 0 0;
		    border-radius: 100%;
		    border: 5px solid rgba(158, 158, 158, 0.8);
			font-size: .2rem;
			color: #FFFFFF;
		}
		.ic-sb{
			width: 18px;
			height: 18px;
			vertical-align: sub;
		}
	}
</style>
