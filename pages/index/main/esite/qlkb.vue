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
		<view class="row no-gutters" style="height: 93%;" @mouseenter="stopInterval" @mouseleave="startInterval">
			<view class="col-5 addpadding" style="height: 100%;">
				<view class="borderSize tableHeight">
					<u-table style="width: 100%;height: 4.5%;" bg-color="transparent" color="#FFFFFF" border-color="#052D84" :th-style="thStyle">
						<u-tr>
							<u-th class="charttitle">
								订单号
							</u-th>
							<u-th class="charttitle">
								品名
							</u-th>
							<u-th width="30%" class="charttitle">
								规格
							</u-th>
							<u-th class="charttitle">
								工单数量
							</u-th>
							<u-th class="charttitle">
								欠数
							</u-th>
						</u-tr>
					</u-table>
					<view style="height: 96%;overflow: auto;" class="GDContentHeight">
						<view class="GDtableHeight">
							<u-table class="scrollList tableHeight" style="width: 100%;" bg-color="transparent" color="#FFFFFF" border-color="#052D84">
								<u-tr v-for="(item,index) in GDList" :key="item.FID" class="GdTrHeight" :style="{backgroundColor: showBG === index ? '#01A3F6':'inherit'}">
									<u-td class="over_text charttitle">
										{{ item.FCO }}
									</u-td>
									<u-td class="over_text charttitle">
										{{ item.PRD_NAME }}
									</u-td>
									<u-td width="30%" class="charttitle over_text">
										{{ item.SPEC }}
									</u-td>
									<u-td class="charttitle">
										{{ item.NEED_QTY }}
									</u-td>
									<u-td class="charttitle">
										{{ item.NFN_QTY }}
									</u-td>
								</u-tr>
							</u-table>
						</view>
					</view>
				</view>
			</view>
			<view class="col-7 addpadding" style="height: 100%;">
				<view class="borderSize">
					<u-table style="width: 100%;height: 4.5%;" bg-color="transparent" color="#FFFFFF" border-color="#052D84" :th-style="thStyle"
					 fontSize='36'>
						<u-tr>
							<u-th class="charttitle over_text">
								物料名称
							</u-th>
							<u-th class="charttitle over_text">
								物料编码
							</u-th>
							<u-th width="30%" class="charttitle">
								规格
							</u-th>
							<u-th class="charttitle">
								需求数量
							</u-th>
							<u-th class="charttitle">
								欠料数量
							</u-th>
							<u-th class="charttitle">
								确认交期
							</u-th>
							<u-th class="charttitle">
								采购状态
							</u-th>
						</u-tr>
					</u-table>
					<view style="height: 96%;overflow: auto;" class="GXContentHeight">
						<view class="GXtableHeight">
							<u-table style="width: 100%;" bg-color="transparent" color="#FFFFFF"
							 border-color="#052D84">
								<u-tr v-for="(item,index) in GXList" :key="item.FID" class="GxTrHeight">
									<u-td class="charttitle over_text">
										{{ item.PartDesc }}
									</u-td>
									<u-td class="charttitle over_text">
										{{ item.PartNum }}
									</u-td>
									<u-td width="30%" class="charttitle over_text">
										{{ item.PartSpec }}
									</u-td>
									<u-td class="charttitle">
										{{ item.DueQty }}
									</u-td>
									<u-td class="charttitle">
										{{ item.LackQty }}
									</u-td>
									<u-td class="charttitle">
										{{ item.DelDate }}
									</u-td>
									<u-td class="charttitle">
										{{ item.PurSta == 1 ? '制单中' : item.PurSta == 2 ? '已确认' : item.PurSta == 3 ? '送货中' : item.PurSta == 4 ? '已完成' : "" }}
									</u-td>
								</u-tr>
							</u-table>
						</view>
						
					</view>
				</view>
			</view>
		</view>
		<!-- </dv-full-screen-container> -->
	</view>
</template>

<script>
	//#ifdef H5  
		import $ from '@/static/js/jquery-3.3.1.js'  
	//#endif
	var getINFOtimer = null; //创建一个定时器
	var timer = null;
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
				thStyle: {
					'backgroundColor': 'transparent',
					color: "#ffffff",
					fontSize: '24px'
				},
				GDList: [], //工单列表
				GXList: [], //物料列表
				//计算滚动用的参数
				rowHeight: 0, //工序列表每行高度
				GdTrHeight: 0, //工单列表每行高度
				tableHeight: 0, //工单表格总高度
				showBG: 0,
				gdTop: 0,
				WLanimationData:{},  //工序的动画对象
				GDanimate:{},		//	工单的动画对象
				GDanimation: null,  //	工单的动画
				stopTime: false, //判断是否停止计时器
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
			clearInterval(timer);
		},
		onShow() {
			var animation = uni.createAnimation({
				duration: 1000,
				timingFunction: 'linear',
			})
			this.WLanimation = animation;
			getINFOtimer = setInterval(() => {
				this.getInfo();
				this.getToast();
			}, (this.titleObj.FREFTIME * 1000 || 30000));
			console.log(`刷新时间：${this.titleObj.FREFTIME}`);
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
			getHeight(){
				setTimeout(() => {
					 this.rowHeight = document.getElementsByClassName('GdTrHeight')[0].clientHeight;
					 this.tableHeight = document.getElementsByClassName('tableHeight')[0].clientHeight;
					
					console.log(`表格高度：${this.tableHeight},行高：${this.rowHeight}`);
				}, 300);
			},
			getInfo() {
				clearInterval(timer);
				//获取工单列表数据
				uni.request({
					url: this.basePath + '/APP/kanban!woForFuture.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						
						if (res.data.IsSuccess) {
							this.GDList = res.data.Data;
							if (this.showBG === 0) {
								this.getWLinfo(); //获取物料列表
							}
							this.getHeight();
						} else {

						}
					},
				});
				if(this.stopTime){
					return;
				}
				//获取完工单，再设置滚动函数
				timer = setInterval(function() {
					this.scrollGX();
				}.bind(this), 5000);
			},
			//鼠标进入，停止
			stopInterval(){
				this.stopTime = true;
				clearInterval(timer);
				console.log(`停止：${this.stopTime}`);
			},
			//鼠标移出，启动
			startInterval(){
				this.stopTime = false;
				timer = setInterval(function() {
					this.scrollGX();
				}.bind(this), 3000);
				console.log(`启动：${this.stopTime}`)
			},
			//物料滚动
			scrollGX() {
				if(this.GDList.length == 0){
					return;
				}
						const WLContent = document.getElementsByClassName('GXContentHeight')[0];
						const wllistHeight = WLContent.clientHeight;
						const scrollTop = WLContent.scrollTop;
						const wllistOffsetHeight = WLContent.scrollHeight;
					if(wllistHeight >= wllistOffsetHeight){
						this.isnextGD();
						this.getWLinfo();
					}else if(wllistHeight + scrollTop < wllistOffsetHeight){
						this.setWLAnimation(this.rowHeight, 1000, WLContent);
					}else if((wllistHeight + scrollTop) == wllistOffsetHeight){
						WLContent.scrollTop = 0;
						this.isnextGD();
						this.getWLinfo();
					}
			},
			isnextGD(){
				this.showBG++;
				//如果下一条大于工单列表长度，则从第一条开始,此时需要结束函数，不需要再判断是否滚动
				if(this.showBG > this.GDList.length - 1){
					document.getElementsByClassName('GDContentHeight')[0].scrollTop = 0;
					this.showBG = 0;
					return;
				}
				//如果没大于，则判断是否需要滚动
				const GDContent = document.getElementsByClassName('GDContentHeight')[0];
					const GDlistHeight = GDContent.clientHeight;
					const scrollTop = GDContent.scrollTop;
					const GDlistOffsetHeight = GDContent.scrollHeight;
					console.log(`能见高度：${GDlistHeight},超出高度：${scrollTop},表格总高度：${GDlistOffsetHeight}`);
				if(GDlistHeight >= GDlistOffsetHeight){
					return;
				}else if(GDlistHeight + scrollTop < GDlistOffsetHeight){
					this.setWLAnimation(this.rowHeight, 1000, GDContent);
				}else if((GDlistHeight + scrollTop) == GDlistOffsetHeight){
					return;
				}
			},
			//物料列表运动函数
			setWLAnimation(detaY, time, dom){
				// dom.scrollTop += detaY;
				const target =  dom.scrollTop + detaY;
				$(dom).animate({scrollTop: target}, 1000);
			},
			//根据工单号获取物料信息
			getWLinfo() {
				if(this.GDList.length == 0){
					return;
				}
				const wlPro = uni.request({
					url: this.basePath + '/APP/kanban!lackmtlForWo.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
						fmo: this.GDList[this.showBG].FMO,
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
				});
				wlPro.then((res) => {
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
							if (this.newtoaList[0] == "") {
								this.toastList = res.data.Data;
							} else {
								this.newtoaList.forEach((ele, i) => {
									if (ele != this.toastList[i].NOTICE_TITLE) {
										this.toastList = res.data.Data;
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
		height: 90%;
	}

	.addpadding {
		padding: .5% .5%;
	}

	.addborder {
		border: 1px solid #044c8b;
	}

	.borderSize {
		width: 100%;
		height: 100%;
		border: 1px solid #044c8b;
	}

	@media screen and (max-width: 1000px) {
		.titleDec {
			width: 100px;
			height: 35px;
		}
	}
</style>
