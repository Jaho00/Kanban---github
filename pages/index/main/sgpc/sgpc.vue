<template>
	<view class="container-fluid setfull">
		<view class="row align-items-center" style="background-color: #000000;color: #ffffff;">
			<view class="col row align-items-center align-self-center">
				<image :src="LOGO" mode="scaleToFill" style="width: 50px;height: 50px;margin-left: 5%;"></image>
				<dv-decoration-11 style="width:50%;height:50px;font-size: .2rem;margin-left: 25%;" v-show="titleObj.FCOMPANY == '' ? false : true">{{ titleObj.FCOMPANY }}</dv-decoration-11>
			</view> 
			<view class="col-6 pageTitle row justify-content-center" style="font-size: .5rem;text-align: center;">
					<dv-decoration-8 style="width:150px;height:50px;" />
					<text style="margin: 0 5%;">{{ titleObj.FTITLE }}</text>
					<dv-decoration-8 :reverse="true" style="width:150px;height:50px;" />
			</view>
			<view class="col titltTime row align-items-center">
				<view class="col-6" style="width: 100%;">
					<dv-decoration-11 style="width:100%;height:50px;" v-show="titleObj.FSYSTEM == '' ? false : true">{{ titleObj.FSYSTEM }}</dv-decoration-11>
				</view>
				<view class="col-6">
					<text style="display: block;text-align: center;">{{ nowDay }}</text>
					<text style="display: block;text-align: center;">{{ nowTime }}</text>
				</view>		
			</view>
		</view>
		<view class="row" style="height: 90%;">
			<view class="col-12" style="height: 49%;">
				<view class="row">
					<u-table style="width: 100%;" bg-color="transparent" border-color="#052D84"
								:th-style="thStyle">
						 <u-tr>
							 <u-th width="100%" style="text-align: center;">
								{{ todayDate }} - {{ BCFirst }}
							 </u-th>
						 </u-tr>
						 <u-tr>
							 <u-th width="7%" class="charttitle">
								机台
							 </u-th>
							 <u-th v-for="(item, index) in todayFirst" :key="item.FID" class="overhide charttitle">
								{{ item.DEVICE }}
							 </u-th>
						 </u-tr>
						 <u-tr>
							 <u-th width="7%" class="charttitle">
								内容
							 </u-th>
							 <u-th v-for="(item, index) in todayFirst" :key="item.FID" class="overhide charttitle">
								{{ item.WORK_CONTENT }}
							 </u-th>
						 </u-tr>
						 <u-tr>
							 <u-th width="7%" class="charttitle">
								人员
							 </u-th>
							 <u-th v-for="(item, index) in todayFirst" :key="item.FID" class="overhide charttitle">
								{{ item.OPERATORS_NAME }}
							 </u-th>
						 </u-tr>
					</u-table>
				</view>
				<view class="row" v-show="isShowTwo">
					<u-table style="width: 100%;margin-top: 1%;" bg-color="transparent" border-color="#052D84"
								:th-style="thStyle">
						 <u-tr>
							 <u-th width="100%" style="text-align: center;">
								{{ todayDate }} - {{ BCSecond }}
							 </u-th>
						 </u-tr>
						 <u-tr>
							 <u-th width="7%" class="charttitle">
								机台
							 </u-th>
							 <u-th v-for="(item, index) in todaySecond" :key="item.FID" class="overhide charttitle">
								{{ item.DEVICE }}
							 </u-th>
						 </u-tr>
						 <u-tr>
							 <u-th width="7%" class="charttitle">
								内容
							 </u-th>
							 <u-th v-for="(item, index) in todaySecond" :key="item.FID" class="overhide charttitle">
								{{ item.WORK_CONTENT }}
							 </u-th>
						 </u-tr>
						 <u-tr>
							 <u-th width="7%" class="charttitle">
								人员
							 </u-th>
							 <u-th v-for="(item, index) in todaySecond" :key="item.FID" class="overhide charttitle">
								{{ item.OPERATORS_NAME }}
							 </u-th>
						 </u-tr>
					</u-table>
				</view>
			</view>
			<view class="col-12" style="height: 49%;margin-top: 1%;">
				<view class="row">
					<u-table style="width: 100%;margin-top: 1%;" bg-color="transparent" border-color="#052D84"
								:th-style="thStyle">
						 <u-tr>
							 <u-th width="100%" style="text-align: center;">
								 {{ tomorrowDate }} - {{ BCFirst }}
							 </u-th>
						 </u-tr>
						 <u-tr>
							 <u-th width="7%" class="charttitle">
								机台
							 </u-th>
							 <u-th v-for="(item, index) in tomorrowFirst" :key="item.FID" class="overhide charttitle">
								{{ item.DEVICE }}
							 </u-th>
						 </u-tr>
						 <u-tr>
							 <u-th width="7%" class="charttitle">
								内容
							 </u-th>
							 <u-th v-for="(item, index) in tomorrowFirst" :key="item.FID" class="overhide charttitle">
								{{ item.WORK_CONTENT }}
							 </u-th>
						 </u-tr>
						 <u-tr>
							 <u-th width="7%" class="charttitle">
								人员
							 </u-th>
							 <u-th v-for="(item, index) in tomorrowFirst" :key="item.FID" class="overhide charttitle">
								{{ item.OPERATORS_NAME }}
							 </u-th>
						 </u-tr>
					</u-table>
				</view>
				<view class="row" v-show="isShowTwo">
					<u-table style="width: 100%;margin-top: 1%;" bg-color="transparent" border-color="#052D84"
								:th-style="thStyle">
						 <u-tr>
							 <u-th width="100%" style="text-align: center;">
								  {{ tomorrowDate }} - {{ BCSecond }}
							 </u-th>
						 </u-tr>
						 <u-tr>
							 <u-th width="7%" class="charttitle">
								机台
							 </u-th>
							 <u-th v-for="(item, index) in tomorrowSecond" :key="item.FID" class="overhide charttitle">
								{{ item.DEVICE }}
							 </u-th>
						 </u-tr>
						 <u-tr>
							 <u-th width="7%" class="charttitle">
								内容
							 </u-th>
							 <u-th v-for="(item, index) in tomorrowSecond" :key="item.FID" class="overhide charttitle">
								{{ item.WORK_CONTENT }}
							 </u-th>
						 </u-tr>
						 <u-tr>
							 <u-th width="7%" class="charttitle">
								人员
							 </u-th>
							 <u-th v-for="(item, index) in tomorrowSecond" :key="item.FID" class="overhide charttitle">
								{{ item.OPERATORS_NAME }}
							 </u-th>
						 </u-tr>
					</u-table>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var _self = null;
	var timer = null; 
	var getINFOtimer = null; 
	export default {
		data() {
			return {
				thStyle:{'backgroundColor':'transparent',color:"#ffffff",fontSize:'24px'},
				titleObj:{},
				LOGO:"",
				nowTime:"",
				nowDay:"",
				todayList:[],
				tomorrowList:[],
				todayDate:"",
				tomorrowDate:"",
				BCList:[],
				isShowTwo: false
			}
		},
		computed:{
			BCFirst(){
				if(this.BCList.length > 0){
					let t = this.BCList[0].SHIFTS_NAME ? this.BCList[0].SHIFTS_NAME : ""
					return t;
				}
			},
			BCSecond(){
				if(this.BCList.length > 1){
					let t = this.BCList[1].SHIFTS_NAME ? this.BCList[1].SHIFTS_NAME : ""
					return t;
				}
			},
			todayFirst(){
				if(this.BCList.length > 0){
					let t = this.todayList.first;
					return t;
				}
			},
			todaySecond(){
				if(this.BCList.length > 1){
					let t = [];
					try{
						t = this.todayList.second;
					}catch(e){
						//TODO handle the exception
					}
					return t;
				}
			},
			tomorrowFirst(){
				if(this.BCList.length > 0){
					let t = [];
					try{
						t = this.tomorrowList.first;
					}catch(e){
						//TODO handle the exception
					}
					return t;
				}
			},
			tomorrowSecond(){
				if(this.BCList.length > 1){
					let t = [];
					try{
						t = this.tomorrowList.second;
					}catch(e){
						//TODO handle the exception
					}
					return t;
				}
			}
		},
		onHide() {
			clearInterval(timer);
			clearInterval(getINFOtimer);
		},
		onShow(){
			// getINFOtimer = setInterval(()=>{
			// 	this.getInfo(this.todayDate);
			// 	this.getInfo(this.tomorrowDate);
			// },(this.titleObj.FREFTIME * 1000 || 30000));
			timer = setInterval(()=>{
				 var time = new Date();
				 var month = time.getMonth() + 1;
				 var hours = time.getHours();
				 var seconds = time.getSeconds();
				 var minutes =time.getMinutes();
				 //判断是否在前面加0
				function getNow(s) {
					return s < 10 ? '0' + s: s;
				}
				this.nowDay = time.getFullYear() + '年' + month + '月' + time.getDate() + '日';
				this.nowTime = getNow(hours)+':'+getNow(minutes)+":"+getNow(seconds);
			},1000);
		},
		onLoad(option) {
			_self = this;
			//从路径中获取看板标题等信息
			const item = JSON.parse(decodeURIComponent(option.ele));
			this.titleObj = item;
			console.log(this.titleObj);
			console.log(uni.getStorageSync('UserInfo'));
			try{
				this.LOGO =this.basePath +  item.FLOGO.split('*')[0];
			}catch(e){
				//TODO handle the exception
				this.LOGO = "";
			}
			this.getToday();
			this.getInfo(this.todayDate, 'today');
			this.getInfo(this.tomorrowDate, 'tomorrow');
		},
		methods: {
			getToday(){
				 var time = new Date();
				 var month = time.getMonth() + 1;
				 //判断是否在前面加0
				function getNow(s) {
					return s < 10 ? '0' + s: s;
				}
				var tomorrow = new Date(time.getTime() + 24*60*60*1000);
				this.tomorrowDate = tomorrow.getFullYear()+"-" + getNow((tomorrow.getMonth()+1)) + "-" + getNow(tomorrow.getDate());
				this.todayDate = time.getFullYear() + '-' + getNow(month) + '-' +  getNow(time.getDate());
			},
			getInfo(date, type){
				console.log(this.titleObj);
				 uni.request({
				 	url: this.basePath +'/APP/kanban!manualPlan.action',
				 	data: {
				 		zhid: uni.getStorageSync('UserInfo').ZHID,
						cjcode: this.titleObj.FDATAPERMCODE,
						plandate: date,
				 	},
				 	method: 'POST',
				 	header: {
				 		'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
				 	},
				 	success:(res)=>{
				 		if(res.data.IsSuccess){
							let first = [];
							let second = [];
							let bctwo = "";
							const bcone = res.data.Data[0].SHIFTS[0].SHIFTS_NAME;
							if(res.data.Data[0].SHIFTS.length > 1){
								_self.isShowTwo = true;
								bctwo = res.data.Data[0].SHIFTS[1].SHIFTS_NAME;
							}
				 			if(type === 'today'){
								res.data.Data[0].PLAN.forEach((ele, index)=>{
									if(ele.SHIFTS_NAME == bcone){
										first.push(ele);
									}else if(ele.SHIFTS_NAME == bctwo){
										second.push(ele);
									}
								});
								_self.todayList = {first:first, second:second};
								_self.BCList = res.data.Data[0].SHIFTS;
							}else if(type === 'tomorrow'){
								res.data.Data[0].PLAN.forEach((ele, index)=>{
									if(ele.SHIFTS_NAME == bcone){
										first.push(ele);
									}else if(ele.SHIFTS_NAME == bctwo){
										second.push(ele);
									}
								});
								_self.tomorrowList = {first:first, second:second};
							}
				 		}
				 	},
				 });
			},
		}
	}
</script>

<style>
/* 	*{
		margin: 0;
		padding: 0;
	} */
	.container-fluid{
		padding: 0;
	}
	.container-fluid .row{
		padding: 0;
		margin: 0;
	} 
	.container-fluid .row > [class*="col-"]{
		padding: 0;
		margin: 0;
	}	
	/* 以上是模拟通配符的样式 */
	.setfull{
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		background-image: url(../../../../components/datav/img/bg.png);
		background-size: 100% 100%;
	}
	.addbg{
		background-image: url(../../../../static/img/titleBG.jpg);
		background-size: 100% 100%;
	}
	.dele-padding{
		padding: 0;
	}
	.titltTime{
		font-size: .2rem;
		text-align: right;
	}
	.charttitle{
		font-size: .3rem!important;
		color: #FFFFFF;
	}
	.overhide{
		overflow:hidden;
		text-overflow:ellipsis;
		white-space:nowrap;
		
	}
</style>
