<template>
	<view class="container-fluid setfull dele-padding">
		<!-- <dv-full-screen-container> -->
		<view class="row align-items-center" style="background-color: #1890FF;color: #ffffff;" v-if="isToastShow == 'noToast'">
			<view class="col row align-items-center align-self-center">
				<image :src="LOGO" mode="aspectFit" style="width: 100px;height: 50px;margin-left: 5%;"></image>
				<text style="margin-left:10%;font-size: .2rem;line-height: 2.5;" v-show="titleObj.FCOMPANY == '' ? false : true">{{ titleObj.FCOMPANY }}</text>

			</view>
			<view class="col-4 pageTitle row justify-content-center" style="font-size: .4rem;text-align: center;">
				<text style="margin: 0 5%;">{{ titleObj.FTITLE }}</text>
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
				<u-notice-bar class="toastTitle" mode="horizontal" :volume-icon="false" :volume-size="20" :speed="25" :font-size="20"
				 :padding="0" type='none' :is-circular="true" :list="newtoaList" bg-color='#000000' color='#ffffff'></u-notice-bar>
			</view>
		</view>
		<!-- 内容区 -->
		<view class="row no-gutters" style="height: 95%;">
			<view class="col-12" style="height: 100%;">
				<dv-scroll-board :config="listtable" />
			</view>
		</view>
		<!-- </dv-full-screen-container> -->
	</view>
</template>

<script>
	var getINFOtimer = null; //创建一个定时器
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
				listtable: {}, //表格数据
				monthBL: [], //月不良
				dayBL: [], //日不良
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
			}
		},
		onHide() {
			clearInterval(getINFOtimer);
		},
		created() {  
			getINFOtimer = setInterval(()=>{
				this.getInfo();
				this.getToast();
			},(this.titleObj.FREFTIME * 1000 || 30000));
		},
		onLoad(option) {
			//从路径中获取看板标题等信息
			const item = JSON.parse(decodeURIComponent(option.ele));
			this.titleObj = item;
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
		},
		methods: {
			getInfo() {
				//获取列表数据
				uni.request({
					url: this.basePath + '/APP/kanban!jobForFuture.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
						dataperm: this.titleObj.FDATAPERMCODE
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						if (res.data.IsSuccess) {
							let newArray = [];
							res.data.Data.forEach((ele, index) => {
								let temp = [],
									str = "";
								if(ele.LACKMTL == '未分析'){
									str = `<span style="color:#bdbab2;">${ele.LACKMTL}</span>`;
								}else if(ele.LACKMTL == '缺料'){
									str = `<span style="color:#ff0000;">${ele.LACKMTL}</span>`;
								}else if(ele.LACKMTL == '齐料'){
									str = `<span style="color:#00ff00;">${ele.LACKMTL}</span>`;
								}else{
									str = ele.LACKMTL;
								}
								temp.push(ele.FJOB_DATE,ele.FCO, ele.PRD_NAME, ele.SPEC, ele.FWORKNAME, ele.OWE_QTY, ele.FJOB_QTY, 
											ele.FOPERATORNUM, ele.SMTE,ele.PLANTIME,str, ele.FNOTE);
								newArray.push(temp);
							});
							this.listtable = {
								header: ['计划日期','订单号', '品名', '规格', '工序', '任务欠数','派工数量', '作业人数', '标准工时效率', '派工工时','缺料分析', '备注'],
								data: newArray,
								index: false,
								columnWidth: [100, 110, 150, 200],
								align: ['center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center', 'center','center', 'center'],
								rowNum: 20,
								headerBGC: '#1D395F',
								headerHeight: 40,
								oddRowBGC: '#003B51',
								evenRowBGC: 'rgba(10, 29, 50, 0.8)',
								waitTime: 5000
							}
						} else {

						}
					},
				});
			},
			
			
			//获取顶部滚动消息
			getToast(){
				uni.request({
					url: this.basePath +'/APP/aBN!getNotice.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
						cjcode: uni.getStorageSync('UserInfo').DEPTCODE,
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success:(res)=>{
						if(res.data.IsSuccess){
							if(_self.newtoaList[0] == ""){
								_self.toastList = res.data.Data;
							}else{
								_self.newtoaList.forEach((ele, i)=>{
									if(ele != _self.toastList[i].NOTICE_TITLE){
										_self.toastList = res.data.Data;
										return;
									}	
								});
							}
						}else{
							this.isToastShow = 'noToast';
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

	.addbg {
		background-image: url(../../../../static/img/titleBG.jpg);
		background-size: 100% 100%;
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

	.dele-padding {
		padding: 0;
	}

	.allsize {
		width: 100%;
		height: 100%;
	}

	.addpadding {
		padding: 1% 1%;
	}

	.addborder {
		border: 1px solid #044c8b;
	}

	@media screen and (max-width: 1000px) {
		.titleDec {
			width: 100px;
			height: 35px;
		}
	}
</style>
