<template>
	<view class="container-fluid setfull">
		<dv-full-screen-container>
			<view class="row align-items-center" style=" color: #ffffff; "
				v-if="isToastShow == 'noToast'">
				<view class="col-3 row no-gutters align-items-center">
					<view class="col-4 row no-gutters justify-content-center">
						<text class="yl-text">车间</text>
					</view>
					<view class="col-4">
						<!-- 下拉框模式 -->
						<xfl-select :list="tempcjList" :clearable="false" :showItemNum="11" :focusShowList="false"
							:listShow="false" :isCanInput="false" :style_Container="'height: .4rem;width:100%;'"
							:selectHideType="'independent'" @change="changecj" :initValue="cjName"
							v-if="isShowcj">
						</xfl-select>
					</view>
				</view>
				<view class="col-4 pageTitle row justify-content-center" style="font-size: .4rem;text-align: center;">
					<text style="margin: 0 5%;">川东{{CJobj.name}}</text>
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
				<view class="col-3 pageTitle row justify-content-center" style="font-size: .3rem;text-align: center;">
					<!-- <dv-decoration-8 style="width:70px;height:50px;" /> -->
					<text style="margin: 0 5%;">{{ titleObj.FTITLE }}</text>
					<!-- <dv-decoration-8 :reverse="true" style="width:70px;height:50px;" /> -->
				</view>
				<view class="col titltTime row align-items-center">
					<u-notice-bar class="toastTitle" mode="horizontal" :volume-icon="false" :volume-size="20"
						:speed="25" :font-size="20" :padding="0" type='none' :is-circular="true" :list="newtoaList"
						bg-color='#000000' color='#ffffff'></u-notice-bar>
				</view>
			</view>
			<!-- 表格内容区 -->
			<view class="row addpadding" style="overflow: hidden;height: 100%;">
				<view class="col-9 row no-gutters" style="height: 100%;">
					
					<view class="col-12">
						<view class="col-12" style="width: 100%;overflow: hidden; color:#fff; font-size: .2rem; margin: 2% 3%;">
							<text style="float: left;">计划总数量：{{total}}</text>
							<view style="width: 50%; float: left; height: 20px; background-color: #fff; margin:10px 8%; position: relative; border-radius:20px">
							<view :style="totalStyle()" style="position: absolute; background-color: #0fa251; height: 100%; border-radius: 20px;"></view>	
							<view style="width: 40px; height: 40px; border-radius:20px; background-color: #14cb67; position: relative; top:-10px; float: left; left: -2%;"></view>
							<view style="width: 40px; height: 40px; border-radius:20px; background-color: #14cb67; position: relative; top:-10px;float: left; left: 17%;"></view>
							<view style="width: 40px; height: 40px; border-radius:20px; background-color: #14cb67; position: relative; top:-10px;float: left; left: 36%;"></view>
							<view style="width: 40px; height: 40px; border-radius:20px; background-color: #14cb67; position: relative; top:-10px;float: left; left: 55%;"></view>
							<view style="width: 40px; height: 40px; border-radius:20px; background-color: #14cb67; position: relative; top:-10px;float: left; left: 74%;"></view>
																									
							</view>
							<text style="float: left;">完工总数量：{{work}}</text>
							
						</view>
					<u-table font-size="28" style="color: #fff; border: none;background-color: rgba(0, 122, 210, 0); line-height: 50px; ">
						<u-tr style="border: none;">
							<u-th width="10%" style="border:1px solid #fff;padding: 0;font-size: .2rem;background-color: rgba(0, 122, 210, 0);  color: #fff;">
								工单编号
							</u-th>
							<u-th width="10%" style="border:1px solid #fff;padding: 0;font-size: .2rem;background-color: rgba(0, 122, 210, 0);  color: #fff;">
								料号
							</u-th>
							<u-th width="20%" style="border:1px solid #fff;padding: 0;font-size: .2rem;background-color: rgba(0, 122, 210, 0);  color: #fff;">
								料名
							</u-th>
							<u-th width="6%" style="border:1px solid #fff;padding: 0;font-size: .2rem;background-color: rgba(0, 122, 210, 0);  color: #fff;">
								计划产量
							</u-th>
							<u-th width="18%" style="border:1px solid #fff;padding: 0;font-size: .2rem;background-color: rgba(0, 122, 210, 0);  color: #fff;">
								开工时间
							</u-th>							
							<u-th width="6%" style="border:1px solid #fff;padding: 0;font-size: .2rem;background-color: rgba(0, 122, 210, 0);  color: #fff;">
								完工数量
							</u-th>
							<u-th width="30%" style="border:1px solid #fff;padding: 0;font-size: .2rem;background-color: rgba(0, 122, 210, 0);  color: #fff;">
								进度
							</u-th>
						</u-tr>
						<u-tr style="border: none;" v-for="(item,index) in displayedItems" :key="index">
							<u-td width="10%" style="border:1px solid #fff;padding: 0;font-size:.2rem;background-color: rgba(0, 122, 210, 0);  color: #fff;">
								{{item.FBILLNO}}
							</u-td>
							<u-td width="10%" style="border:1px solid #fff;padding: 0;font-size: .2rem;background-color: rgba(0, 122, 210, 0);  color: #fff;">
								{{item.ITEM_CODE}}
							</u-td>
							<u-td width="20%" style="border:1px solid #fff;padding: 0;font-size: .2rem;background-color: rgba(0, 122, 210, 0);  color: #fff;">
								{{item.ITEM_NAME}}
							</u-td>
							<u-td width="6%" style="border:1px solid #fff;padding: 0;font-size: .2rem;background-color: rgba(0, 122, 210, 0);  color: #fff;">
								{{item.FQTY}}
							</u-td>
							<u-td width="18%" style="border:1px solid #fff;padding: 0;font-size: .2rem;background-color: rgba(0, 122, 210, 0);  color: #fff;">
								{{item.FSTARTDATE}}
							</u-td>
							<u-td width="6%" style="border:1px solid #fff;padding: 0;font-size: .2rem;background-color: rgba(0, 122, 210, 0);  color: #fff;">
								{{item.FREALQTY}}
							</u-td>
							<u-td width="30%" style="border:1px solid #fff;padding: 0;font-size: .2rem;background-color: rgba(0, 122, 210, 0);  color: #fff;">
								<view style="width: 75%; height: 20px; background-color: #fff; border-radius:20px;margin: 0 5%;">
									<view :style="getTextStyle(item)" style="background-color: #14cb67; height: 100%; border-radius: 20px;"></view>
								</view >
								<view style="width: 10%; position: absolute; right: -2%; color: #fff;">{{((item.FREALQTY / item.FQTY)*100).toFixed(2)}}%</view>
							</u-td>
						</u-tr>
						</u-table>
						</view>
				</view>
				<view class="col row no-gutters ml-1 charttitle"
					style="font-size: .2rem;text-align: center;height: 100%;">
					<view class="col-12 no-gutters" style="background-color: rgba(0, 122, 210, 0);  border:1px solid #fff;height: 25%;">
						<text style="color: #FFFFFF;font-size: .3rem;">今天不良统计</text>
						<canvas canvas-id="myCanvas" style="width: 100%;height: 100%;"></canvas>
					</view>
					<view class="col-12 no-gutters" style="background-color: rgba(0, 122, 210, 0); border:1px solid #fff;height: 25%;">
						<text style="color: #FFFFFF;font-size: .3rem;">本月不良统计</text>
						<canvas canvas-id="myCanvass" style="width: 100%;height: 100%;"></canvas>
					</view>
					<view class="col-12 no-gutters" style="background-color: rgba(0, 122, 210, 0);  border:1px solid #fff; height: 50%;">
						<text style="color: #FFFFFF;font-size: .3rem;">十五天交货达成率</text>
						<canvas canvas-id="myCanvaszhu" id="BFPie" style="width: 100%;height: 100%;"></canvas>
					</view>
				</view>
			</view>
<!-- 			<view class="row addpadding mt-1 tableContent tableHeight" style="overflow: hidden;">
				<view class="col-9" style="width: 100%;overflow: hidden;height: 10%;border: 1px solid #052D84;">
					<view>
						<u-table style="width: 100%;" bg-color="transparent" color="#FFFFFF" border-color="#052D84"
							:th-style="thStyle" fontSize='36'>
							<u-tr>
								<u-th width="30%" class="charttitle">
									工序名称
								</u-th>
								<u-th class="charttitle">
									任务数
								</u-th>
								<u-th class="charttitle">
									合格数
								</u-th>
								<u-th class="charttitle">
									不良数
								</u-th>
								<u-th class="charttitle">
									次品数
								</u-th>
								<u-th class="charttitle">
									报废数
								</u-th>
								<u-th class="charttitle">
									工序进度
								</u-th>
							</u-tr>
						</u-table>
					</view>
				</view>
				<view class="col charttitle ml-1" style="height: 10%;font-size: .3rem;text-align: center;">
					不良原因
				</view>
				<view class="col-9" style="width: 100%;overflow: hidden;height: 90%;border: 1px solid #052D84;">
					<view class="" :animation="animationData">
						<u-table class="scrollList GXtableHeight" style="width: 100%;overflow: hidden;"
							bg-color="transparent" color="#FFFFFF" border-color="#052D84">
							<u-tr v-for="(item,index) in GXList" :key="item.FID" class="GxTrHeight">
								<u-td width="30%" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"
									class="charttitle">
									{{ item.FWORKNAME }}
								</u-td>
								<u-td class="charttitle">
									{{ item.TASK_QTY }}
								</u-td>
								<u-td class="charttitle">
									{{ item.QUA_QTY }}
								</u-td>
								<u-td class="charttitle">
									{{ item.BAD_QTY }}
								</u-td>
								<u-td class="charttitle">
									{{ item.SUB_QTY }}
								</u-td>
								<u-td class="charttitle">
									{{ item.CRAP_QTY }}
								</u-td>
								<u-td class="charttitle">
									{{ ((item.WORK_QTY / item.TASK_QTY)*100).toFixed(2)+'%' }}
								</u-td>
							</u-tr>
						</u-table>
					</view>
				</view>
				<view class="row" style="height: 89%;width: 23%;">
					<view class="col-12" style="height: 90%;margin-left: 7%;">
						<canvas canvas-id="canvasPie" id="canvasPie" style="width: 100%;height: 100%;"
							class="charts blyyDiv"></canvas>
					</view>
				</view>
			</view> -->

			<!-- <view class="row addpadding" style="height: 29%;">
				<view class="col-9 dele-padding" style="height: 100%;">
					<view style="width: 100%;text-align: center;font-size: .3rem;color:#FFFFFF">
						
					</view>
					<view id="JRSCJD" class="charts yddiv"></view>
				</view>
				<view class="col row no-gutters ml-1 charttitle"
					style="font-size: .3rem;text-align: center;height: 100%;">
					<view class="col-12 no-gutters" style="background-image: linear-gradient(rgba(0, 122, 210, 1), rgba(3, 72, 124,1)); border:1px solid #fff;height: 100%;">
						<text style="color: #FFFFFF;font-size: .2rem;">三天交货达成率</text>
						<canvas canvas-id="BFPie" id="BFPie" style="width: 100%;height: 100%;"
							class="charts bfyyDiv"></canvas>
					</view>
				</view>
			</view> -->
		</dv-full-screen-container>
	</view>
</template>
<script>
	import uCharts from '@/components/u-charts/u-charts.js'; //引入ucharts图表组件
	import globalData from '../../../../util/golbalData.js';

	var _self = null;
	var timer = null; //创建一个定时器
	var getINFOtimer = null;
	var canvaLineA = null;
	var canvaPie = null;
	var canvaRing = null;
	var BFPie = null;
	var JRSCJDChart = null;
	var canva = null;
	var zhu = null;
	export default {
		data() {
			return {
				thStyle: {
					'backgroundColor': 'transparent',
					color: "#ffffff",
					fontSize: '24px'
				},
				DayPZJKoption: [],
				DayBLYYFXoption: {},
				Monthoption: {},
				animationData: {}, //工序的动画对象
				GDanimate: {}, //	工单的动画对象
				animation: null, //工序的动画
				GDanimation: null, //	工单的动画
				isTop0: 0,
				ListLength: 0,
				titleObj: {},
				LOGO: "",
				nowTime: "",
				nowDay: "",
				GxTrHeight: 0, //工序列表每行高度
				GdTrHeight: 0, //工单列表每行高度
				tableHeight: 0, //工单表格总高度
				GXtableHeight: 0, //工序表格总高度
				showBG: 0,
				GXList: [], //工序列表
				gdTop: 0,
				zhlplData: "",
				zhlplDiv: "", //综合良品率宽高
				blyyDiv: "",
				RingSize: "",
				ydDIV: "",
				toastList: [], // 消息列表
				toastString: "", //消息字符串
				isToastShow: 'noToast',
				isfirst: true,
				chartFontSize: "",
				count: 0,
				ishglshow: false,
				pieChartConfig: {},
				refreshDataInterval:'',
				itemsPerPage: 14,//显示多少数据
				currentPage: 1, //翻页
				maxVisiblePages: 3,
				nextPagelist:'',
				gjList:[],
				bydlist:[],
				cjList:[],
				tempcjList:[],
				cxList:[],
				CXobj:[],
				CJobj:[],
				isShowcj: false,
				total:'',
				work:'',
			}
		},
		  // onReady() {
		  //   // 在页面准备好之后初始化饼状图配置
		  //   this.initPieChart();
		  // },
		computed: {
			
			newtoaList() {
				let arr = [];
				let str = "";
				this.toastList.forEach((ele, index) => {
					str += (index + 1) + '、' + ele.NOTICE_TITLE;
				});
				arr.push(str);
				if (arr.length > 0) {
					this.isToastShow = 'yesToast';
				} else {
					this.isToastShow = 'noToast';
				}
				return arr;
			},
			totalPages() {
			  return Math.ceil(this.bydlist.length / this.itemsPerPage);
			},
			    displayedItems() {
			      const start = (this.currentPage - 1) * this.itemsPerPage;
			      const end = start + this.itemsPerPage;
			      return this.bydlist.slice(start, end);
			    },
				    visiblePages() {
				      const startPage = Math.max(1, this.currentPage - Math.floor(this.maxVisiblePages / 2));
				      const endPage = Math.min(this.totalPages, startPage + this.maxVisiblePages - 1);
				      const pages = [];
				      for (let i = startPage; i <= endPage; i++) {
				        pages.push(i);
				      }
				      return pages;
				    },
		},
		onLoad(option) {
			_self = this;
			//获取设备信息
			this.getCJ();
			const res = uni.getSystemInfoSync();
			this.sb = res.windowWidth;
			console.log(option)
			//从路径中获取看板标题等信息
			// const item = JSON.parse(decodeURIComponent(option.ele));
			// this.titleObj = item;
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
			this.getInfo();
			this.getToast();
			// this.DayPZJKoption = this.DayPZJKoption.concat(this.DayPZJKoption.slice(0,10));
		},
		onHide() {
			clearInterval(timer);
			clearInterval(getINFOtimer);
		},
		created() {
			getINFOtimer = setInterval(() => {
				this.getInfo();
				this.getToast();
			}, (this.titleObj.FREFTIME * 1000 || 30000));
		},
		beforeDestroy() {
		  // 在页面销毁之前清除定时器，防止内存泄漏
		  clearInterval(this.nextPagelist);
		},
		mounted() {
			this.nextPagelist = setInterval(() => {
				if(this.currentPage == this.totalPages){
					this.goToPage(1)
					 this.caigoukb()
				}else{
					this.nextPage()
				}
			},40000);
		},
		methods: {
			currentdate(a) {
				let currentDate = new Date();
				// 将输入的天数转换为整数
				let days = parseInt(a);
				// 计算目标日期
				let targetDate = new Date(currentDate.getTime() - days * 24 * 60 * 60 * 1000);
				// 格式化目标日期为 YYYY-MM-DD 格式
				let formattedDate = `${targetDate.getFullYear()}-${(targetDate.getMonth() + 1).toString().padStart(2, '0')}-${targetDate.getDate().toString().padStart(2, '0')}`;
				// 更新结果日期
				return formattedDate;
			},
			getTextStyle(item){
				 const a = item.FREALQTY / item.FQTY
				 return { width: a*100 + '%' };
			},
			totalStyle(){
				this.total = this.bydlist.reduce((total,obj)=>(total+obj.FQTY),0)
				this.work = this.bydlist.reduce((total,obj)=>(total+obj.FREALQTY),0)								
				return { width: this.work/this.total * 100 + '%' };
			},
			caigoukb(){
				
				uni.request({
					url: this.basePath + '/APP/kanban!getMoChaseInfo.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
						dataperm: this.CJobj.code,//'001.02.002',
						fwscode: '',
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {	
						console.log(res)
						if (res.data.IsSuccess) {
							this.gjList = res.data.Data
							this.bydlist = this.gjList.molist
							this.bydlist.forEach((ele)=>{
								ele.FQTY = Math.floor(ele.FQTY)
								ele.FREALQTY = Math.floor(ele.FREALQTY)
							})
							this.bydlist.sort((a, b)=>{
								const numA = a.FSTARTDATE.split('').map(char => char.charCodeAt(0)).join('')
								const numB = b.FSTARTDATE.split('').map(char => char.charCodeAt(0)).join('')
								return numA.localeCompare(numB)
							});
							
							
							this.initChart(this.gjList.bybllist);
							this.initChart(this.gjList.jtbllist);
							this.initChartzhu()
						} else {
							this.isToastShow = 'noToast';
						}
					},
				})
			},
			initChart(item) {
							  let Pie = {
							  	series: []
							  };
			        const width = 400;
			        const height = 200;	 
			        // 使用 uCharts 创建图表实例
								 for(let i = 0;i<item.length;i++)
								 {
								  Pie.series.push({
								  	name: item[i].FBADITEM_NAME+' ('+item[i].FQTY+'数)',
								  	data:  item[i].FQTY,
								  	textColor: '#ffffff',
								  },);
								  }
								  var Can = ''
								  if(item == this.gjList.bybllist){
									  Can = 'myCanvass'
								  }else{
									  Can = 'myCanvas'
								  }
			        this.chartData = {
						$this: _self,
			          canvasId: Can,
			          type: 'pie',
			         // categories: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
			          series: Pie.series,
									// series: [
									// 	  { name: 'A', data: 50 ,textColor: '#ffffff'},
									// 	  { name: 'B', data: 30 ,textColor: '#ffffff'},
									// 	  { name: 'C', data: 10 ,textColor: '#ffffff'},
									// 	],
									legend: {
										show: true,
										fontColor: '#FFFFFF',
										float: 'right',
										position: 'right',
										lineHeight: 28
									},
									duration:2000,
									extra: {
										pie: {
											offsetAngle: -45,
											ringWidth: 200	,
											ringHeight: 200,
											labelWidth: 20,
											
										}
									},
									background: '#FFFFFF',
									color:'#ffffff',
									pixelRatio: 1,
			          animation: true,
			          width:width,
			          height:height,
			        };
			       canva = new uCharts(this.chartData);
			      
			    },
								initChartzhu(){
									  let Pie = {
									  	series: []
									  };
									  const width = 450;
									  const height = 300;
									  const yes = []
									  const yyes = []
									  const bigyes = []
									  const yes15 = []
									  const yyes15 = []
									  const bigyes15 = []
									 this.gjList.jhdclist.forEach((ele, index) => {	
										 ele.FHTZ_QTY = Math.floor(ele.FHTZ_QTY)
										 ele.XS_QTY = Math.floor(ele.XS_QTY)
										 // 将毫秒转换为天数										
										 const FDATE = new Date(ele.FYQJH_DATE).getTime();										 
										 const a = Math.ceil((new Date().getTime() - FDATE) / (1000 * 60 * 60 * 24))
										 
										 if(a == 1){
											yes.push(ele)
										 }else if(a == 2){
											yyes.push(ele)
										 }else if(a == 3){
											bigyes.push(ele)
										 }										 																			
									  });
										
										yes.forEach((ele)=>{
											const FDATE = new Date(ele.FHTZ_DATE).getTime();
											const F_YQJJWCSJ = new Date(ele.XSDD_DATE).getTime();
											const timeDiff = Math.abs(FDATE - F_YQJJWCSJ);
											const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))-1;
											
											if(dayDiff<=15){
												yes15.push(ele)
											}
										})
										yyes.forEach((ele)=>{
											const FDATE = new Date(ele.FHTZ_DATE).getTime();
											const F_YQJJWCSJ = new Date(ele.XSDD_DATE).getTime();
											const timeDiff = Math.abs(FDATE - F_YQJJWCSJ);
											const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))-1;
											
											if(dayDiff<=15){
												yyes15.push(ele)
											}
										})
										bigyes.forEach((ele)=>{
											const FDATE = new Date(ele.FHTZ_DATE).getTime();
											const F_YQJJWCSJ = new Date(ele.XSDD_DATE).getTime();
											const timeDiff = Math.abs(FDATE - F_YQJJWCSJ);
											const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))-1;
											
											if(dayDiff<=15){
												bigyes15.push(ele)
											}
										})
									  Pie.series.push({
									  	name: '总数',
									  	data: [yes.length,yyes.length,bigyes.length],
									  	color: '#55ff7f',
										width: '10%',
										textColor: '#ffffff',
									  },{
									  	name: '完成要求数',
									  	data: [yes15.length,yyes15.length,bigyes15.length],
									  	color: '#ffaa00',
										width: '10%',
										textColor: '#ffffff',
									  },);
									  
									this.chartDatazhu = {
										  $this: _self,
										  canvasId: 'myCanvaszhu',
										  type: 'column',
										  categories: [
											this.currentdate(1),this.currentdate(2),this.currentdate(3)										
										  ],
										  series: Pie.series,
										  xAxis: {
										  	type: 'grid',
										  	gridColor: '#ffffff',
										  	gridType: 'dash',
										  	dashLength: 12,
										  	fontColor: '#ffffff',
										  	disableGrid: true,
											
										  },
										  yAxis: {
											fontColor: '#ffffff', 
											gridType: 'solid',
											splitNumber: 6,
											gridColor: '#cccccc',
											data: [{
												fontColor: '#FFFFFF',
												disabled: false,
												format: (val) => {
													return val.toFixed(0)
												}
											}],
										  },
											 extra: {
											 	column: {
											 		type: 'group',
											 		width: 30,
													
											 	},
											 },
											  legend: {
											  	show: true,
											  	fontColor: '#FFFFFF',
											  	float: 'center',
											  	position: 'top',
											  	lineHeight: 28
											  },
											  textColor: '#ffffff',
											  pixelRatio: 1,
									          animation: true,
									          width:width,
									          height:height,
									        };
											
									    zhu = new uCharts(this.chartDatazhu);  
				},
				//选择车间
				changecj({
					newVal,
					oldVal,
					index
				}) {
					let setFalse = true;
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
							//this.getSBdata(); //获取产线列表
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
							console.log(ele)
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
							console.log(result)
							if (result.data.IsSuccess) {
								result.data.Data.forEach((ele) => {
									this.tempcjList.push({
										value: ele.DEPTNAME
									})
								});
								this.tempcjList.push({value: '所有车间'});
								this.cjList = result.data.Data;
								if(uni.getStorageSync('zsInfo')){
									
									const value = JSON.parse(uni.getStorageSync('zsInfo'));
									console.log(value)
									if (value.CJobj.name) {
											
										this.cjName = value.CJobj.name;
										
										this.CJobj = value.CJobj;
										this.CXobj = value.CXobj;
										//this.getSBdata();
									}else{
										this.cjName = result.data.Data[0].DEPTNAME;
										this.CJobj = {
											name: result.data.Data[0].DEPTNAME,
											code: result.data.Data[0].DEPTCODE,
										};
										this.getNewCX()
										
									}
								}else{
									this.cjName = result.data.Data[0].DEPTNAME;
									this.CJobj = {
										name: result.data.Data[0].DEPTNAME,
										code: result.data.Data[0].DEPTCODE,
									};
									
									this.getNewCX()
								}
								this.getCX(); //获取待选列表
							}
						}
					})
				},
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
							
								this.cxList = result.data.Data;
								console.log(this.cxList,this.cjList)
								this.caigoukb()
								this.isShowcj = true;
							} else {
								
							}
						}
					})
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
							console.log(result)
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
								this.caigoukb()
								//this.getSBdata();
								this.isShowcj = true;
							} else {
								
							}
						}
					})
				},
			previousPage() {
			  if (this.currentPage > 1) {
			    this.currentPage--;
			  }
			},
			nextPage() {
			  if (this.currentPage < this.totalPages) {
			    this.currentPage++;
			  }
			},
			goToPage(page) {
			      this.currentPage = page;
			},
			    initPieChart() {
			      // 配置饼状图参数
			      const pieData = {
			        categories: ['分类1', '分类2', '分类3'],
			        series: [{
			          data: [30, 40, 50],
			          type: 'pie'
			        }]
			      };
			
			      // 创建uCharts实例
			      const pieChart = new uCharts({
			        $this: this.$refs.pieChart,
			        config: pieData,
			        type: 'pie'
			      });
			
			      // 将配置保存到data中，以便渲染
			      this.pieChartConfig = pieChart.getConfig();
			    },
			  
			// 数据请求后,需要手动刷新
			updateHandler(config) {
				_self[config] = {
					..._self[config]
				}
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
			getInfo() {
				clearInterval(timer);
				//this.getGD(); //获取工单监控
				//this.getTodayGD(); //获取今日生产进度
				timer = setInterval(function() {
					this.scrollGD();
					// this.setAnimation(this.isTop0 ,1000);  
				}.bind(this), 5000);
			},
			scrollGD() {
				setTimeout(() => {
					if (_self.DayPZJKoption.length > 2) {
						this.count++;
						if (this.count == _self.DayPZJKoption.length) {
							_self.gdTop = 0;
							_self.showBG = 0;
							this.count = 0;
							this.getGX(); //获取工序列表
							this.getDayBLFX(); //获取日不良监控	
							this.getHGL(); //获取日报废
							this.getGood(); //获取综合良品数据
							_self.setGDAnimation(_self.gdTop, 0);
						} else {
							_self.showBG++;
							this.getGX(); //获取工序列表
							this.getDayBLFX(); //获取日不良监控	
							this.getHGL(); //获取日报废
							this.getGood(); //获取综合良品数据
							_self.gdTop = _self.gdTop - _self.GdTrHeight;
							_self.setGDAnimation(_self.gdTop, 1000);
						}
					} else {
						return;
					}
				}, 3000);
			},
			//工单列表运动函数
			setGDAnimation(detaY, time) {
				const animation = uni.createAnimation({
					duration: time,
					timingFunction: 'linear',
				})
				this.GDanimation = animation
				_self.GDanimation.translateY(detaY).step();
				_self.GDanimate = _self.GDanimation.export();
			},
			//工序列表运动函数
			setAnimation(detaY, time) {
				const animation = uni.createAnimation({
					duration: time,
					timingFunction: 'linear',
				})
				this.animation = animation
				_self.animation.translateY(detaY).step();
				_self.animationData = _self.animation.export();
			},
			//渲染综合良品圆环
			showRing(canvasId, chartData) {
				setTimeout(() => {
					if (this.GxTrHeight == "" && this.GXList.length > 0) {
						//工序单元格高度
						let menuItem = uni.createSelectorQuery().in(this).select(".GxTrHeight");
						menuItem.fields({
							size: true,
							scrollOffset: true
						}, data => {
							this.GxTrHeight = data.height;
						}).exec();
					}
					let zhDIV = uni.createSelectorQuery().in(this).select(".zhlplDiv");
					zhDIV.fields({
						size: true,
						scrollOffset: true
					}, data => {
						this.zhlplDiv = {
							height: data.height,
							width: data.width
						};
						const currentWidth = screen.width;
						if (currentWidth >= 1920) {
							this.RingSize = 40;
						} else if (currentWidth >= 1280) {
							this.RingSize = 20;
						}
						canvaRing = new uCharts({
							$this: _self,
							canvasId: canvasId,
							type: 'ring',
							padding: [0, 0, 0, 40],
							fontSize: 11,
							legend: {
								show: true,
								fontColor: '#FFFFFF',
								float: 'right',
								position: 'right',
								lineHeight: 18
							},
							title: {
								name: _self.zhlplData[0].YieldRate + '%',
								color: '#ffffff',
								fontSize: 25,
								offsetY: 0,
							},
							subtitle: {
								name: '良品率',
								color: '#ffffff',
								fontSize: 15,
								offsetY: 0,
							},
							extra: {
								pie: {
									offsetAngle: -45,
									ringWidth: _self.RingSize,
									labelWidth: 15
								}
							},
							background: '#000000',
							pixelRatio: 1,
							series: chartData.series,
							animation: true,
							width: _self.zhlplDiv.width,
							height: _self.zhlplDiv.height,
							disablePieStroke: true,
							dataLabel: false,
						});
					}).exec();
				}, 300);
			},
			//渲染饼图
			showPie(canvasId, chartData) {
				let Pie = {
					series: []
				};
				if (chartData == null) {
					Pie.series.push({
						name: '无不良',
						data: 0
					});
				} else {
					chartData.forEach((ele, index) => {
						Pie.series.push({
							name: ele.FBADITEM_NAME,
							data: ele.FQTY,
							format(key) {
								return this.data;
							},
							textColor: '#ffffff'

						});
					});
				}
				setTimeout(() => {
					let blyyDiv = uni.createSelectorQuery().in(this).select(".blyyDiv");
					blyyDiv.fields({
						size: true,
						scrollOffset: true
					}, data => {
						this.blyyDiv = {
							height: data.height,
							width: data.width
						};
						canvaPie = new uCharts({
							$this: _self,
							canvasId: canvasId,
							padding: [0, 0, 0, 40],
							type: 'pie',
							fontSize: 11,
							legend: {
								show: true,
								fontColor: '#FFFFFF',
								float: 'right',
								position: 'right',
								lineHeight: 18
							},
							background: '#FFFFFF',
							pixelRatio: 1,
							series: Pie.series,
							animation: true,
							width: _self.blyyDiv.width,
							height: _self.blyyDiv.height,
							dataLabel: true,
							extra: {
								pie: {
									"labelWidth": 3,
									offsetAngle: -45,
								},

							},
						});
					}).exec();
				}, 300);
			},
			touchPie(e) {
				canvaPie.showToolTip(e, {
					format: function(item) {
						return item.name + ':' + item.data
					}
				});
			},
			//渲染折线图
			showLineA(canvasId, chartData) {
				if (_self.ydDIV.height) {
					canvaLineA = new uCharts({
						$this: _self,
						canvasId: canvasId,
						type: 'line',
						fontSize: 11,
						legend: {
							show: true,
							fontColor: '#ffffff'
						},
						dataLabel: false,
						dataPointShape: true,
						background: '#FFFFFF',
						pixelRatio: 1,
						categories: chartData.categories,
						series: chartData.series,
						animation: true,
						xAxis: {
							type: 'grid',
							gridColor: '#ffffff',
							gridType: 'dash',
							dashLength: 8,
							fontColor: '#ffffff',
							disableGrid: true
						},
						yAxis: {
							gridType: 'solid',
							gridColor: '#cccccc',
							splitNumber: 5,
							data: [{
								fontColor: '#FFFFFF',
								disabled: false,
							}],

							// min:10,
							// max:180,
							// format:(val)=>{return val.toFixed(0)+'元'}
						},
						width: _self.ydDIV.width,
						height: _self.ydDIV.height,
						extra: {
							line: {
								type: 'straight'
							}
						}
					});
				} else {
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
								type: 'line',
								fontSize: 11,
								legend: {
									show: true,
									fontColor: '#ffffff'
								},
								dataLabel: false,
								dataPointShape: true,
								background: '#FFFFFF',
								pixelRatio: 1,
								categories: chartData.categories,
								series: chartData.series,
								animation: true,
								xAxis: {
									type: 'grid',
									gridColor: '#ffffff',
									gridType: 'dash',
									dashLength: 8,
									fontColor: '#ffffff',
									disableGrid: true
								},
								yAxis: {
									gridType: 'solid',
									gridColor: '#cccccc',
									splitNumber: 5,
									data: [{
										fontColor: '#FFFFFF',
										disabled: false,
									}],

									// min:10,
									// max:180,
									// format:(val)=>{return val.toFixed(0)+'元'}
								},
								width: _self.ydDIV.width,
								height: _self.ydDIV.height,
								extra: {
									line: {
										type: 'straight'
									}
								}
							});
						}).exec();
					}, 300);
				}



				//这是用echarts画的柱状图
				// var byId = function(id) {
				// 	return document.getElementById(id);
				// };
				// var option = {
				// 		legend: {
				// 			data: ['蒸发量', '降水量']
				// 		},
				// 		grid: {
				// 			x: 35,
				// 			x2: 10,
				// 			y: 30,
				// 			y2: 25
				// 		},
				// 		toolbox: {
				// 			show: false,
				// 			feature: {
				// 				mark: {
				// 					show: true
				// 				},
				// 				dataView: {
				// 					show: true,
				// 					readOnly: false
				// 				},
				// 				magicType: {
				// 					show: true,
				// 					type: ['line', 'bar']
				// 				},
				// 				restore: {
				// 					show: true
				// 				},
				// 				saveAsImage: {
				// 					show: true
				// 				}
				// 			}
				// 		},
				// 		calculable: false,
				// 		xAxis: [{
				// 			type: 'category',
				// 			data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
				// 		}],
				// 		yAxis: [{
				// 			type: 'value',
				// 			splitArea: {
				// 				show: true
				// 			}
				// 		}],
				// 		series: [{
				// 			name: '蒸发量',
				// 			type: "bar",
				// 			data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
				// 		}, {
				// 			name: '降水量',
				// 			type: "bar",
				// 			data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
				// 		}]
				// 	};

				// var barChart = echarts.init(byId('barChart'));
				// barChart.setOption(option);
			},
			touchLineA(e) {
				canvaLineA.showToolTip(e, {
					format: function(item, category) {
						return category + ' ' + item.name + ':' + item.data
					}
				});
			},
			//根据工单号获取所有工序
			getGX() {
				const gxPro = uni.request({
					url: this.basePath + '/APP/kanban!progressProcTrack.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
						fmo: this.DayPZJKoption[this.showBG].FMO,
						dataperm: this.titleObj.FDATAPERMCODE,
						dwscode: this.titleObj.DWSCODE,
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
				});
				gxPro.then((res) => {
					if (res[1].data.IsSuccess) {
						try {
							this.GXList = res[1].data.Data;
						} catch (e) {
							//TODO handle the exception
							console.log('报错啦');
						}
					}
				})
			},
			//获取工单生产进度列表
			getGD() {
				const gdPro = uni.request({
					url: this.basePath + '/APP/kanban!progressWoTrack.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
						dataperm: this.titleObj.FDATAPERMCODE,
						fwscode: this.titleObj.FWSCODE,
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded', //自定义请求头信息
					},
				});
				gdPro.then((res) => {
					// console.log("工单",res);
					if (res[1].data.IsSuccess) {

						const nowTime = new Date().setHours(0, 0, 0, 0);
						const twoDaysAgo = nowTime + 2 * 24 * 3600 * 1000;
						res[1].data.Data.forEach((ele, index) => {
							const tempJQ = new Date(ele.FDELIVERY_DATE.replace(/-/g, '/')).getTime();
							if (tempJQ < nowTime) {
								ele.jqbg = '#FF0000';
							} else if (tempJQ >= nowTime && tempJQ <= twoDaysAgo) {
								ele.jqbg = '#FF6600';
							} else {
								ele.jqbg = 'transparent';
							}
						});
						this.DayPZJKoption = res[1].data.Data;
						if (this.showBG === 0) {
							this.getGX(); //获取工序列表
							this.getDayBLFX(); //获取日不良监控	
							this.getHGL(); //获取日报废
							this.getGood(); //获取综合良品数据
						}
						setTimeout(() => {
							if (this.GXList.length > 0) {
								//工序单元格高度
								let menuItem = uni.createSelectorQuery().in(this).select(".GxTrHeight");
								menuItem.fields({
									size: true,
									scrollOffset: true
								}, data => {
									this.GxTrHeight = data.height;
								}).exec();
								//工序表格总高度
								let GXtableHeight = uni.createSelectorQuery().in(this).select(
									".GXtableHeight");
								GXtableHeight.fields({
									size: true,
									scrollOffset: true
								}, data => {
									this.GXtableHeight = data.height;
								}).exec();
							} else {
								let menuItem = 0;
								let GXtableHeight = 0;
							}
							if (this.DayPZJKoption.length > 0) {
								//工单单元格高度
								let gdItem = uni.createSelectorQuery().in(this).select(".GdTrHeight");
								gdItem.fields({
									size: true,
									scrollOffset: true
								}, data => {
									this.GdTrHeight = data.height;
								}).exec();
								//工单表格总高度
								let tableHeight = uni.createSelectorQuery().in(this).select(
									".tableHeight");
								tableHeight.fields({
									size: true,
									scrollOffset: true
								}, data => {
									this.tableHeight = data.height;
								}).exec();
							} else {
								let gdItem = 0;
								let tableHeight = 0;
							}
						}, 300);
					} else {

					}
				})
			},
			//综合良品
			getGood() {
				uni.request({
					url: this.basePath + '/APP/kanban!overallYieldForWo.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
						fmo: this.DayPZJKoption[this.showBG].FMO,
						dataperm: this.titleObj.FDATAPERMCODE
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						if (res.data.IsSuccess) {
							let Ring = {
								series: []
							};
							res.data.Data.forEach((ele, index) => {
								Ring.series.push({
									name: "合格数",
									data: ele.QUA_QTY || 0
								}, {
									name: "不良数",
									data: ele.BAD_QTY || 0
								});
								ele.YieldRate = (ele.QUA_QTY + ele.BAD_QTY) == 0 ? 0 : (ele.QUA_QTY / (
									ele.QUA_QTY + ele.BAD_QTY) * 100).toFixed(
									2);
							});
							this.zhlplData = res.data.Data;
							_self.showRing("canvasRing", Ring);
						} else {

						}
					},
				});
			},
			getTodayGD() {
				uni.request({
					url: this.basePath + '/APP/kanban!progressWoTrackForDaily.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
						dataperm: this.titleObj.FDATAPERMCODE,
						fwscode: this.titleObj.FWSCODE,
						tran_date: ""
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						if (res.data.IsSuccess) {
							this.drawJRSCJD('JRSCJD', res.data.Data[0]);
						} else {

						}
					},
				});
			},
			drawJRSCJD(dom, chartData) {
				if (JRSCJDChart) {

				} else {
					JRSCJDChart = this.$echarts.init(document.getElementById(dom));
				}
				//处理数据
				let series = [];
				chartData.yAxis.forEach((ele) => {
					series.push({
						name: ele.name,
						data: ele.data,
						type: 'bar',
						stack: 'total',
						label: {
							show: true
						},
						emphasis: {
							focus: 'series'
						},
					})
				});
				var option = {
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
						}
					},
					legend: {
						textStyle:{
							color: "#ffffff"
						},
					},
					grid: {
						left: '3%',
						right: '3%',
						bottom: '4%',
						containLabel: true
					},
					xAxis: {
						type: 'value',
						axisLabel: {
							textStyle: {
								color: '#fff',
								// fontSize: 16,
							}
						}
					},
					yAxis: {
						type: 'category',
						data: chartData.data,
						axisLabel: {
							textStyle: {
								color: '#fff',
							}
						}
					},
					series: series
				};
				JRSCJDChart.setOption(option);
			},
			//日不良
			async getDayBLFX() {
				const res = await this.$myRequest({
					url: '/APP/kanban!badAnalyForWo.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
						fmo: this.DayPZJKoption[this.showBG].FMO,
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
				});

				_self.showPie("canvasPie", res.data.Data);

			},
			getHGL() {
				uni.request({
					url: this.basePath + '/APP/kanban!scrapAnalyForWo.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
						fmo: this.DayPZJKoption[this.showBG].FMO,
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						this.drawHGL('BFPie', res.data.Data);
					},
				});
			},
			drawHGL(canvasId, chartData) {
				let Pie = {
					series: []
				};
				if (chartData == null) {
					Pie.series.push({
						name: '无报废',
						data: 0,
					});
				} else {
					chartData.forEach((ele, index) => {
						Pie.series.push({
							name: ele.FSCRAP_NAME,
							data: ele.FQTY,
							format(key) {
								return this.data;
							},
							textColor: '#ffffff'
						});
					});
				}
				setTimeout(() => {
					let bfyyDiv = uni.createSelectorQuery().in(this).select(".bfyyDiv");
					bfyyDiv.fields({
						size: true,
						scrollOffset: true
					}, data => {
						this.bfyyDiv = {
							height: data.height,
							width: data.width
						};
						BFPie = new uCharts({
							$this: _self,
							canvasId: canvasId,
							padding: [0, 0, 0, 40],
							type: 'pie',
							fontSize: 11,
							legend: {
								show: true,
								fontColor: '#FFFFFF',
								float: 'right',
								position: 'right',
								lineHeight: 18
							},
							background: '#FFFFFF',
							pixelRatio: 1,
							series: Pie.series,
							animation: true,
							width: _self.bfyyDiv.width,
							height: _self.bfyyDiv.height,
							dataLabel: true,
							extra: {
								pie: {
									lableWidth: 1,
									offsetAngle: -45,
								},

							},
						});
					}).exec();
				}, 300);
			},

		}
	}
</script>

<style>
	* {
		margin: 0;
		padding: 0;
	}

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
		height: 30%;
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
		padding: 0 1%;
	}

	@media screen and (max-width: 1000px) {
		.titleDec {
			width: 100px;
			height: 35px;
		}
	}
</style>
