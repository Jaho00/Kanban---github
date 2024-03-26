<template>
	<view class="setfull">
		<view class="">
			<u-toast ref="uToast" />
		</view>
		<view class="row align-items-center" style="background-color: #1890FF;color: #ffffff;"
			v-if="isToastShow == 'noToast'">
			<view class="col row align-items-center align-self-center">
				<image :src="LOGO" mode="aspectFit" style="width: 100px;height: 50px;margin-left: 5%;"></image>
				<text style="margin-left:10%;font-size: .2rem;line-height: 2.5;"
					v-show="titleObj.FCOMPANY == '' ? false : true">{{ titleObj.FCOMPANY }}</text>

			</view>
			<view class="col-4 pageTitle row justify-content-center" style="font-size: .4rem;text-align: center;">
				<text style="margin: 0 5%;">{{ titleObj.FTITLE }}</text>
			</view>
			<view class="col titltTime row align-items-center">
				<view class="col-6 row no-gutters align-items-center" style="width: 100%;">
					<view class="col-4 row no-gutters justify-content-center">
						<text class="yl-text">时间：</text>
					</view>
					<view class="col-8" style="text-align: left;">
						<picker mode="date" fields="month" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
							<view class="uni-input">{{date}}</view>
						</picker>
					</view>
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
		<view class="row tableContent no-gutters" style="overflow: hidden;">
			<view class="row no-gutters col-12 upContent">
				
					<view class="boxarea row no-gutters justify-content-center align-items-center">
						<table border="1" class="table_del" style="table-layout:fixed;width: 100%;">
							<colgroup>
								<col>
								<col width="5%">
								<col v-for="item in Listdata.DAY">
								
							</colgroup>
							<tr class="charttitle">
								<td class="over_text1">LINE</td>
								<td class="over_text1">TANGGAL</td>
								<td class="over_text1" v-for="item in Listdata.DAY">{{ item }}</td>
							</tr>
						</table>
						<view style="height: 97%;overflow: auto;" class="col-12">
							<view>
								<table border="1" class="table_del" style="table-layout:fixed;width: 100%;">
									<colgroup>
										<col>
										<col width="5%">
										<col v-for="item in Listdata.DAY">
										
									</colgroup>
									<template v-for="(listItem,index) in Listdata.LIST">
										<tr class="charttitle">
											<td rowspan="5">{{ listItem.LINE }}</td>
											<td class="over_text1">PLAN</td>
											<td class="over_text1" v-for="item in listItem.PLAN">{{ item }}</td>
										</tr>
										<tr class="charttitle">
											
											<td class="over_text1">ACT</td>
											<td class="over_text1" v-for="item in listItem.ACT">{{ item }}</td>
										</tr>
										<tr class="charttitle">
											
											<td class="over_text1">%</td>
											<td class="over_text1" v-for="item in listItem['%']">{{ item }}</td>
										</tr>
										<tr class="charttitle">
											
											<td class="over_text1">UPH</td>
											<td class="over_text1" v-for="item in listItem['UPH']">{{ item }}</td>
										</tr>
										<tr class="charttitle">
											
											<td class="over_text1">OPR</td>
											<td class="over_text1" v-for="item in listItem['OPR']">{{ item }}</td>
										</tr>
										<!-- <tr class="charttitle">
											
											<td class="over_text1">DOWNTIME1</td>
											<td class="over_text1" v-for="item in listItem.DOWNTIME1">{{ item }}</td>
										</tr>
										<tr class="charttitle">
											
											<td class="over_text1">DOWNTIME2</td>
											<td class="over_text1" v-for="item in listItem.DOWNTIME2">{{ item }}</td>
										</tr>
										<tr class="charttitle">
											
											<td class="over_text1">DOWNTIME3</td>
											<td class="over_text1" v-for="item in listItem.DOWNTIME3">{{ item }}</td>
										</tr> -->
									</template>
									
								</table>
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
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				date: currentDate,
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
				Listdata: {
					DAY:[],
					LIST:[]
				},
			}
		},
		
		onLoad(option) {
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
			
		},
		
		
		onHide() {
			clearInterval(timer);
			clearInterval(getINFOtimer);
		},
		onShow() {
			getINFOtimer = setInterval(() => {
				// this.getInfo();
			}, (this.titleObj.FREFTIME * 1000 || 30000));
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate({
						format: true
					})
			}
		},
		methods: {
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				}
				month = month > 9 ? month : '0' + month;
				return `${year}-${month}`;
			},
			bindDateChange: function(e) {
				this.date = e.detail.value;
				this.getInfo();
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
				this.Listdata = {
					DAY:[],
					LIST:[]
				};
				console.log("deptcode",uni.getStorageSync('UserInfo').DEPTCODE)
				// console.log("车间数据",time) ,
				uni.request({
					url: this.basePath + '/APP/kanban!dailyProdStatusForLine.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
						// deptcode: uni.getStorageSync('UserInfo').DEPTCODE,
						deptcode: this.titleObj.FDATAPERMCODE,
						
						year: this.date.split("-")[0],
						month: this.date.split("-")[1],
						 
						// deptcode: '001.02.002',
						// year: '2023',
						// month: '3'
					},
					
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						
						if (res.data.IsSuccess) {
							console.log(res.data.Data);
							this.Listdata = res.data.Data;
						} else {
							this.$refs.uToast.show({
								title: res.data.message,
								type: 'error',
								duration: '2300'
							})
						}
					},
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
	.titltTime {
	    font-size: .2rem;
	    text-align: right;
	}
	.tableContent {
		width: 100%;
		height: 92%;
	}
	
	.upContent {
		height: 100%;
		overflow: scroll;
	}

	.boxarea {
		margin:0;
		color: #FFFFFF;
		width: 100%;
		height: 98%;

	}

	.charttitle {
		font-size: .13rem !important;
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

	.scrollList {
		height: 100%;
		width: 100%;
	}


	.produce_title {
		height: 10%;
		background-image: linear-gradient(to right, #125BCD, #5F58FC);
		padding: 0 2%;
		color: #89FAF7;
		font-size: .25rem;
		text-align: center;
	}
	.uni-input{
		height: 100^;
		padding: 15rpx 25rpx;
		line-height:100%;
		font-size:28rpx;
		background:#FFF;
		color: #000000;
		flex: 1;
	}
</style>
