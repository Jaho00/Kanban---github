<template>
	<view class="container-fluid setfull">
		<view class="">
			<u-toast ref="uToast" />
		</view>
		<dv-full-screen-container>
			<view class="row align-items-center" style="color: #ffffff;"
				v-if="isToastShow == 'noToast'">
				<view class="col row align-items-center align-self-center">
					<image :src="LOGO" mode="aspectFit" style="width: 100px;height: 50px;margin-left: 5%;"></image>
					<text style="margin-left:10%;font-size: .2rem;line-height: 2.5;"
						v-show="titleObj.FCOMPANY == '' ? false : true">{{ titleObj.FCOMPANY }}</text>

				</view>
				<view class="col-4 pageTitle row justify-content-center" style="font-size: .5rem;text-align: center;">
					<text style="margin: 0 5%;">川东采购收料跟进看板</text>
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
					
					<u-table font-size="28" style="color: #fff; border: none;background-color: rgba(0, 122, 210, 0);">
						<u-tr style="border: none;">
							<u-th width="16%" style="border:1px solid #fff;padding: 0;font-size: .2rem;background-color: rgba(0, 122, 210, 0); color: #fff;">
								收料日期
							</u-th>
							<u-th width="11%" style="border:1px solid #fff;padding: 0;font-size: .2rem;background-color: rgba(0, 122, 210, 0); color: #fff;">
								物料编号
							</u-th>
							<u-th width="9%" style="border:1px solid #fff;padding: 0;font-size: .2rem;background-color: rgba(0, 122, 210, 0); color: #fff;">
								物料名称
							</u-th>
							<u-th width="8%" style="border:1px solid #fff;padding: 0;font-size: .2rem;background-color: rgba(0, 122, 210, 0); color: #fff;">
								待检数量
							</u-th>
							<u-th width="10%" style="border:1px solid #fff;padding: 0;font-size: .2rem;background-color: rgba(0, 122, 210, 0); color: #fff;">
								未入库数量
							</u-th>
							<u-th width="4%" style="border:1px solid #fff;padding: 0;font-size: .2rem;background-color: rgba(0, 122, 210, 0); color: #fff;">
								等级
							</u-th>
							<u-th width="16%" style="border:1px solid #fff;padding: 0;font-size: .2rem;background-color: rgba(0, 122, 210, 0); color: #fff;">
								要求完成日期
							</u-th>
							<u-th  width="9%" style="border:1px solid #fff;padding: 0;font-size: .2rem;background-color: rgba(0, 122, 210, 0); color: #fff;">
								逾期时间
							</u-th>
							<u-th width="12%" style="border:1px solid #fff;padding: 0;font-size: .2rem;background-color: rgba(0, 122, 210, 0); color: #fff;">
								供应商代码
							</u-th>
							<u-th style="border:1px solid #fff;padding: 0;font-size: .2rem;background-color: rgba(0, 122, 210, 0); color: #fff;">
								采购员
							</u-th>
						</u-tr>
						<u-tr style=" " v-for="(item,index) in displayedItems" :key="index">
							<u-td width="16%" style="height: 50px;border:1px solid #fff;padding: 0;font-size: .2rem;background-color: rgba(0, 122, 210, 0); color: #fff;">
								{{item.FDATE}}
							</u-td>
							<u-td width="11%" style="border:1px solid #fff;padding: 0;font-size: .2rem;background-color: rgba(0, 122, 210, 0); color: #fff;">
								{{item.ITEM_CODE}}
							</u-td>
							<u-td width="9%" style="border:1px solid #fff;padding: 0;font-size: .2rem;background-color: rgba(0, 122, 210, 0); color: #fff;">
								{{item.ITEM_NAME}}
							</u-td>
							<u-td width="8%" style="border:1px solid #fff;padding: 0;font-size: .2rem;background-color: rgba(0, 122, 210, 0); color: #fff;">
								{{item.FACTRECEIVEQTY-item.FRECEIVEQTY-item.FRETURNQTY-item.FCSNRECEIVEQTY}}
							</u-td>
							<u-td width="10%" style="border:1px solid #fff;padding: 0;font-size: .2rem;background-color: rgba(0, 122, 210, 0); color: #fff;">
								{{item.FACTRECEIVEQTY-item.FINSTOCKQTY}}
							</u-td>
							<u-td width="4%" :style="getTextStyle(item.F_JJDJ)"
							style="border:1px solid #fff;padding: 0;font-size: .2rem;background-color: rgba(0, 122, 210, 0); color: #fff;">
								{{item.F_JJDJ}}
							</u-td>
							<u-td width="16%" style="border:1px solid #fff;padding: 0;font-size: .2rem;background-color: rgba(0, 122, 210, 0); color: #fff;">
								{{item.F_YQJJWCSJ}}
							</u-td>
							<u-td width="9%" :style="getText(item)" style="border:1px solid #fff;padding: 0;font-size: .2rem; color: #fff;">
								{{item.daycha}}	{{item.hourcha}}
							</u-td>
							<u-td width="12%" style="border:1px solid #fff;padding: 0;font-size: .2rem;background-color: rgba(0, 122, 210, 0); color: #fff;">
								{{item.FSUPPLIENO}}
							</u-td>
							<u-td style="border:1px solid #fff;padding: 0;font-size: .2rem;background-color: rgba(0, 122, 210, 0); color: #fff;">
								{{item.FPURCHASER}}
							</u-td>
						</u-tr>
						</u-table>
						<!-- <button @click="goToPage(1)" class="page">首页</button>
						<button @click="previousPage" :disabled="currentPage === 1" class="page">上一页</button>
						<button @click="nextPage" :disabled="currentPage === totalPages" class="page">下一页</button>
						<button v-for="page in visiblePages" :key="page" @click="goToPage(page)" :class="{ active: currentPage === page }" class="page">{{ page }}</button>
						<button @click="goToPage(totalPages)" class="page">尾页</button>
						第	{{currentPage}}	页	/	显示	{{itemsPerPage}}	条 -->
						</view>
				</view>
				<view class="col row no-gutters ml-1 charttitle"
					style="font-size: .3rem;text-align: center;height: 100%;">
					<view class="col-12 no-gutters" style=" border:1px solid #fff; height: 35%" >
						<text style="color: #FFFFFF;font-size: .3rem;">特别检验通知</text>
						<u-table font-size="18" style="color: #fff;margin-top: 4%; border: none; line-height: 30px;position: absolute; background-color: rgba(0, 122, 210, 0); ">
							<!-- <u-tr style="border: none;">
								<u-th style="border: none;padding: 0;font-size: .2rem;background-color: rgba(0, 122, 210, 0); color: #fff;">通知内容</u-th>
								<u-th width="25%" style="border: none;padding: 0;font-size: .2rem;background-color: rgba(0, 122, 210, 0); color: #fff;">通知时间</u-th>
								<u-th style="border: none;padding: 0;font-size: .2rem;background-color: rgba(0, 122, 210, 0); color: #fff;">要求检验完成时间</u-th>
							</u-tr> -->
							<u-tr style="border:1px solid #fff;" v-for="(item,index) in displayedItem" :key="index">
								<u-td style="border:1px solid #fff;padding: 0;font-size: .2rem;background-color: rgba(0, 122, 210, 0); color: #fff;">{{item.FIncoming}}</u-td>
								<!-- <u-td width="25%" style="border: none;padding: 0;font-size: .2rem;background-color: rgba(0, 122, 210, 0); color: #fff;">{{item.FrequiredTime}}</u-td>
								<u-td style="border: none;padding: 0;font-size: .2rem;background-color: rgba(0, 122, 210, 0); color: #fff;">{{item.ll_TZSJ}}</u-td> -->
							</u-tr>
						</u-table>
					</view>
					<view class="col-12 no-gutters" style="background-image: linear-gradient(rgba(0, 122, 210, 0), rgba(3, 72, 124,0)); border:1px solid #fff;height: 25%;">
						<text style="color: #FFFFFF;font-size: .3rem;">收料仓待检批次</text>
						<canvas canvas-id="myCanvas" style="width: 100%;height: 100%;"></canvas>
					</view>
					<view class="col-12 no-gutters" style="background-image: linear-gradient(rgba(0, 122, 210, 0), rgba(3, 72, 124,0)); border:1px solid #fff; height: 40%;">
						<text style="color: #FFFFFF;font-size: .3rem;">特急紧急待检提醒</text>
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

			<view class="row addpadding" style="height: 29%;">
				<view class="col-9 dele-padding" style="height: 100%;">
					<view style="width: 100%;text-align: center;font-size: .3rem;color:#FFFFFF">
						
					</view>
					<view id="JRSCJD" class="charts yddiv"></view>
				</view>
				<view class="col row no-gutters ml-1 charttitle"
					style="font-size: .3rem;text-align: center;height: 100%;">
					
				</view>
			</view>
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
				gjList:[],
				chartData: {},
				chartDatazhu: {},
				refreshDataInterval:'',
				itemsPerPage: 16,//显示多少数据
				currentPage: 1, //翻页
				maxVisiblePages: 3,
				itemsPerPages: 3,//显示多少数据
				currentPages: 1, //翻页
				maxVisiblePage: 3,
				nextPagelist:'',
				nextPagelists:'',
				cgList:[],
				gjLists:[],
				time:0,
			}
		},
		
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
			  return Math.ceil(this.gjList.length / this.itemsPerPage);
			},
			displayedItems() {
			  const start = (this.currentPage - 1) * this.itemsPerPage;
			  const end = start + this.itemsPerPage;
			  return this.gjList.slice(start, end);
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
			
			totalPage() {
			  return Math.ceil(this.cgList.length / this.itemsPerPages);
			},
			displayedItem() {
			  const start = (this.currentPages - 1) * this.itemsPerPages;
			  const end = start + this.itemsPerPages;
			  return this.cgList.slice(start, end);
			},
			visiblePage() {
			  const startPage = Math.max(1, this.currentPages - Math.floor(this.maxVisiblePage / 2));
			  const endPage = Math.min(this.totalPage, startPage + this.maxVisiblePage - 1);
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
			const res = uni.getSystemInfoSync();
			this.sb = res.windowWidth;
			//从路径中获取看板标题等信息
			//const item = JSON.parse(decodeURIComponent(option.ele));
			this.getList();
			this.cgkb();
			//this.titleObj = item;
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
		  //clearInterval(this.refreshDataInterval);
		  clearInterval(this.nextPagelist);
		  clearInterval(this.nextPagelists);
		},
		mounted() {
			// this.refreshDataInterval = setInterval(() => {
			//          this.getList()	
			// 		 this.cgkb()
			// }, 300000);
				this.nextPagelist = setInterval(() => {
					if(this.gjList.length != 0){
					if(this.currentPage == this.totalPages){
						this.goToPage(1)
						this.getList()
					}else{
						this.nextPage()
					}
					}else{
						this.getList()
					}
				},  40000);	
				
			// this.nextPagelist = setInterval(() => {
			// 	this.getList()
			// },300000);
			

			this.nextPagelists = setInterval(() => {
				if(this.currentPages == this.totalPage){
					this.goToPages(1)
					this.cgkb()
				}else{
					this.nextPages()
				}
			},40000);
		},
		methods: {
			cgkb(){
				uni.request({
					url: this.basePath + '/APP/kanban!getCaiGouTongzhiInfo.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						console.log(res)
						if (res.data.IsSuccess) {
							this.cgList = res.data.Data;
							this.cgList.forEach((ele)=>{
								
								var day = new Date(ele.ll_TZSJ)
								var year = day.getFullYear();
								var month = day.getMonth() + 1;
								var strDate = day.getDate();
								if (month >= 1 && month <= 9) {
									month = "0" + month;
								}
								if (strDate >= 0 && strDate <= 9) {
									strDate = "0" + strDate;
								}
								ele.ll_TZSJ = year+'-'+month+'-'+strDate
							})
						} else {
							this.isToastShow = 'noToast';
						}
					},
				})
			},
			previousPages() {
			  if (this.currentPages > 1) {
			    this.currentPages--;
			  }
			},
			nextPages() {
			  if (this.currentPages < this.totalPage) {
			    this.currentPages++;
			  }
			},
			goToPages(page) {
			      this.currentPages = page;
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
			getTextStyle(text){
				 if (text === '特急') {
					return { backgroundColor: '#8d0000' };
				  } else if (text === '紧急') {
					return { backgroundColor: 'blue' };
				  } 
			},
			getText(text){
				 const day = text.daycha.replace(/天/g, '');
				 if (text.F_JJDJ === '一般') {					 
					if(day >= 3){
						return { backgroundColor: 'rgba(255, 241, 39, 1.0)',color:'#000' };
					}
				  } else {
					  if(day){
					  	return { backgroundColor: 'rgba(210, 59, 0, 1.0)' };
					  }else{
						return { backgroundColor: 'rgba(210, 59, 0, 0)' };
					  }					
				  } 
			},
			  initChart() {	
				 let Pie = {
				   	series: []
				   };
				   const width = 400;
				   const height = 200;
				   let one = 0;
				   let two = 0;
				   let three = 0;
				   this.gjLists.forEach((ele, index) => {
					const FDATE = new Date().getTime();					
					const F_YQJJWCSJ = new Date(ele.FDATE).getTime();	
					const timeDiff = FDATE - F_YQJJWCSJ;	
					// 将毫秒转换为天数
					if(timeDiff>=0){
					const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))-1;
					var date = new Date(ele.FDATE)
					var years = date.getFullYear();
					var months = date.getMonth() + 1;
					var strDates = date.getDate();
					var mons = ''
					var strs = '' 
					if (months >= 1 && months <= 9) {
						months = "0" + months;
					}
					if (strDates >= 0 && strDates <= 9) {
						strDates = "0" + strDates;
					}
					//ele.F_YQJJWCSJ = years+'-'+months+'-'+strDates	
					//const FDATEs = year+'-'+month+'-'+strDate
					const Dater = years+'-'+months+'-'+strDates
					let lastSunday =  new Date();
					let firstSunday = new Date(Dater);
					 // 将开始日期设置为这个时间范围内的第一个星期天
					    firstSunday.setDate(firstSunday.getDate() + (7 - firstSunday.getDay()));						
					    // 计算结束日期之前的最后一个星期天
					    lastSunday.setDate(lastSunday.getDate() - lastSunday.getDay());						
					    // 计算两个星期天之间的完整周数
					    const weeks = (lastSunday.getTime() - firstSunday.getTime()) / (7 * 24 * 60 * 60 * 1000);
					
					let day = dayDiff - (Math.floor(weeks) + 1) 
					if(day == 1){
						one += 1;
					}else if(day == 2){
						two += 1;
					}else if(day >= 3){
						three += 1;
					}
					}
				   });
				   Pie.series.push({
				   	name: '待检批次数',
				   	data: [this.gjLists.length,one,two,three],
				   	color: '#03e5fe',
				 	textColor: '#ffffff',
				 	width: '50%',
				   });
				 this.chartData = {
				 	  $this: _self,
				 	  canvasId: 'myCanvas',
				 	  type: 'column',
				 	  categories: ['待检总批次','超期一天','超期两天','超期三天及以上'],
				 	  series: Pie.series,
				 	  xAxis: {
				 	  	type: 'grid',
				 	  	gridColor: '#ffffff',
				 	  	gridType: 'dash',
				 	  	dashLength: 4,
				 	  	fontColor: '#ffffff',
				 	  	disableGrid: true,
						fontSize:12,
						marginTop:4,
				 	  },
				 	  yAxis: {
				 		fontColor: '#ffffff', 
				 		gridType: 'solid',
				 		splitNumber: 5,
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
				 		 		width: 50,
				 		 	},
				 		 },
				 		  legend: {
				 		  	show: true,
				 		  	fontColor: '#FFFFFF',
				 		  	float: 'middle',
				 		  	position: 'top',
				 		  	lineHeight: 28
				 		  },
				 		  textColor: '#ffffff',
				 		  pixelRatio: 1,
				           animation: true,
				           width:width,
				           height:height,
				         };
				     new uCharts(this.chartData);  
			        
			      },
				  initChartzhu(){
					  let Pie = {
					  	series: []
					  };
					  const width = 400;
					  const height = 200;
					  let tj = 0;
					  let jj = 0;
					  let totaltj = 0;
					  let totaljj = 0;
					  this.gjList.forEach((ele, index) => {
						  if(ele.FINSPECTQTY >= ele.FACTRECEIVEQTY){
							  if(ele.F_JJDJ == '特急'){						
								  tj += 1								
							  }else if(ele.F_JJDJ == '紧急'){					 
								  jj += 1							
							  }
						  }
						  if(ele.F_JJDJ == '特急'){
							  totaltj += 1					  								
						  }else if(ele.F_JJDJ == '紧急'){					 
							  totaljj += 1							
						  }
					  });
					  Pie.series.push({
					  	name: '总需检数',
					  	data: [totaltj,totaljj],
					  	color: '#a900fe',
						textColor: '#ffffff',
						width: '50%',
					  },{
					  	name: '已检数',
					  	data: [tj,jj],
					  	color: '#ff0062',
						textColor: '#ffffff',
						width: '50%',
					  });
					this.chartDatazhu = {
						  $this: _self,
						  canvasId: 'myCanvaszhu',
						  type: 'column',
						  categories: ['特急','紧急'],
						  series: Pie.series,
						  xAxis: {
						  	type: 'grid',
						  	gridColor: '#ffffff',
						  	gridType: 'dash',
						  	dashLength: 8,
						  	fontColor: '#ffffff',
						  	disableGrid: true
						  },
						  yAxis: {
							fontColor: '#ffffff', 
							gridType: 'solid',
							splitNumber: 5,
							gridColor: '#cccccc',
							data: [{
								fontColor: '#FFFFFF',
								disabled: false,
								format: (val) => {
									return val.toFixed(0) + '数'
								}
							}],
						  },
							 extra: {
							 	column: {
							 		type: 'group',
							 		width: 50,
							 	},
							 },
							  legend: {
							  	show: true,
							  	fontColor: '#FFFFFF',
							  	float: 'middle',
							  	position: 'top',
							  	lineHeight: 28
							  },
							  textColor: '#ffffff',
							  pixelRatio: 1,
					          animation: true,
					          width:width,
					          height:height,
					        };
					    new uCharts(this.chartDatazhu);  
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
							this.getList();
							this.getGX(); //获取工序列表
							this.getDayBLFX(); //获取日不良监控	
							this.getHGL(); //获取日报废
							this.getGood(); //获取综合良品数据
							_self.setGDAnimation(_self.gdTop, 0);
						} else {
							_self.showBG++;
							this.getList();
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

			getList() {
				this.gjList = []
				const gxPro = uni.request({
					url: this.basePath + '/APP/kanban!getPurChaseInfo.action',
					//url: 'http://192.168.8.167:8080'+ '/APP/interfaceService!getPurChaseInfo.action',
					method: 'POST',
					data:{
						zhid: uni.getStorageSync('UserInfo').ZHID,
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
				});
				gxPro.then((res) => {
					if(res[1].data.Data.length != 0){
					this.gjLists = res[1].data.Data;
					this.gjLists = this.gjLists.map((item)=>{
						return{
							...item,
							daycha: '',
							hourcha:'',
						}
					})
					this.gjLists.sort((a,b)=>{
						return new Date(a.F_YQJJWCSJ) - new Date(b.F_YQJJWCSJ)
					})
					this.gjLists.forEach((ele)=>{
						let count = 0;
						const FDATE = new Date().getTime();
						
						const F_YQJJWCSJ = new Date(ele.F_YQJJWCSJ).getTime();	
						const F_DATE = new Date(ele.FDATE).getTime();
						const timeDiff = FDATE - F_YQJJWCSJ;	
						const timedate = FDATE - F_DATE;
						// 将毫秒转换为天数
						if(timeDiff>=0){
						const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))-1;
						const hourDiff = Math.ceil(timeDiff / (1000 * 60 * 60 ))-1;						
						const hour = hourDiff - dayDiff * 24
						const daydate = Math.ceil(timedate / (1000 * 60 * 60 * 24))-1;
						const hourdate = Math.ceil(timedate / (1000 * 60 * 60 ))-1;
						const hourday = hourdate - daydate * 24
						if( ele.F_JJDJ != '一般'){
							ele.daycha = dayDiff
							ele.hourcha = hour + "小时"
						}else{
							ele.daycha = daydate
							ele.hourcha = hourday + "小时"	
						}				
						var day = new Date(ele.FDATE)
						var year = day.getFullYear();
						var month = day.getMonth() + 1;
						var strDate = day.getDate();
						if (month >= 1 && month <= 9) {
							month = "0" + month;
						}
						if (strDate >= 0 && strDate <= 9) {
							strDate = "0" + strDate;
						}
						// ele.FDATE = year+'-'+month+'-'+strDate
						var date = new Date(ele.F_YQJJWCSJ)
						var years = date.getFullYear();
						var months = date.getMonth() + 1;
						var strDates = date.getDate();
						var mons = ''
						var strs = '' 
						if (months >= 1 && months <= 9) {
							months = "0" + months;
						}
						if (strDates >= 0 && strDates <= 9) {
							strDates = "0" + strDates;
						}
						//ele.F_YQJJWCSJ = years+'-'+months+'-'+strDates	
						//const FDATEs = year+'-'+month+'-'+strDate
						const Dater = years+'-'+months+'-'+strDates
						let lastSunday =  new Date();
						let firstSunday = new Date(Dater);
						 // 将开始日期设置为这个时间范围内的第一个星期天
						    firstSunday.setDate(firstSunday.getDate() + (7 - firstSunday.getDay()));						
						    // 计算结束日期之前的最后一个星期天
						    lastSunday.setDate(lastSunday.getDate() - lastSunday.getDay());						
						    // 计算两个星期天之间的完整周数
						    const weeks = (lastSunday.getTime() - firstSunday.getTime()) / (7 * 24 * 60 * 60 * 1000);
						
						ele.daycha = ele.daycha - (Math.floor(weeks) + 1) 
						
						}
						if( ele.F_JJDJ != '一般'){
							this.gjList.push(ele)
						}else if(ele.daycha >= 3){
							this.gjList.push(ele) 
						}
						if(ele.daycha == '' && ele.hourcha ==''){
							
						}else{
							ele.daycha = ele.daycha + '天'	
						}
																
					})
					if(this.gjList.length == 0){
						this.$refs.uToast.show({
							title: '无采购收料跟进进度',
							type: 'warning',
							duration: '4300'
						});
					}

					this.gjList.sort((a, b) => {
					  if (a.F_JJDJ === '特急') {
					    return -1; // 将特急放在最前面
					  } else if (b.F_JJDJ === '特急') {
					    return 1; // 将非特急放在特急之后
					  } else if (a.F_JJDJ === '紧急') {
					    return -1; // 将紧急放在非特急之前
					  } else if (b.F_JJDJ === '紧急') {
					    return 1; // 将非紧急放在紧急之后
					  } else {
					    return a.F_JJDJ.localeCompare(b.F_JJDJ); // 按照字母顺序排序其他名字
					  }
					});
					this.initChart();
					this.initChartzhu();
					}else{
						return this.$refs.uToast.show({
										title: '无采购收料跟进进度',
										type: 'warning',
										duration: '4300'
									});
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
							this.getList();
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
