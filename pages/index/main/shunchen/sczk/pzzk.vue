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
								<col width='10%'>
								<col>
								<col>
								<col>
								<col>
								<col>
								<col>
								<col>
								<col>
								<col v-for="(item,index) in BLname" :key="index">
							</colgroup>
							<tr style="height: 100%;">
								<th  class="charttitle">
									生产日期
								</th>
								<th class="charttitle">
									{{ SCDay }}
								</th>
								<th  class="charttitle">
									班次
								</th>
								<th class="charttitle">
									{{ className }}
								</th>
								<th colspan="5" class="charttitle">
									
								</th>
								<th :colspan="BLname.length" class="charttitle">
									不良现象
								</th>
							</tr>
							<tr style="height: 100%;" class="charttitle"> 
								<td>产品名称</td>
								<td>颜色</td>
								<td>上挂数</td>
								<td>下挂合格数</td>
								<td>直行率</td>
								<td>打磨数</td>
								<td>抛光数</td>
								<td>报废数</td>
								<td>掉线数</td>
								<td v-for="(item,index) in BLname" :key="item + index">{{ item }}</td>
								
							</tr>
							<tr style="height: 100%;" class="charttitle" v-for="(scItem,index) in SCListdata" :key="scItem[0] + index">
								<td>{{ scItem[0] }}</td>
								<td>{{ scItem[1] }}</td>
								<td>{{ scItem[3] }}</td>
								<td>{{ scItem[4] }}</td>
								<td>{{ scItem[5] }}%</td>
								<td>{{ scItem[6] }}</td>
								<td>{{ scItem[7] }}</td>
								<td>{{ scItem[8] }}</td>
								<td>{{ scItem[9] }}</td>
								<td v-for="(blItem,i) in BLListdata[index]" :key="blItem + '' + i">{{ blItem }}</td>
								
							</tr>
						</table>
					</view>
			</view>
			<view class="row no-gutters col-12 wrap-line">
				<view class="col-12 no-gutters" style="padding-right: .5%;height: 100%;">
					<view class="row col-12 no-gutters produce_title" style="height: 8%;">
						<view class="col-12 row no-gutters justify-content-center">
							<u-icon name="grid-fill" color="#89FAF7" size="8"></u-icon>
							<text class="align-self-center" style="margin-left: 1%;">5#喷涂产品直行率</text>
						</view>
					</view>
					<view class="row no-gutters tableDetail col-12" style="height: 92%;">
						<view class="col-12" id="downLeftCharts" style="height: 100%;">
								
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
	var Leftfirst = null;
	var Rightfirst = null;
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
				BLListdata:[],
				SCListdata:[],
				BLname:[],
				className:"",
				SCDay:"",
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
		},
		onHide() {
			clearInterval(timer);
			clearInterval(getINFOtimer);
		},
		onShow() {
			getINFOtimer = setInterval(() => {
				this.getInfo();
			}, (this.titleObj.FREFTIME * 1000 || 30000));
		},
		methods: {
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
				this.BLListdata = [];
				this.SCListdata = [];
				this.BLname = [];
				this.className = "";
				//判断时间是否大于10点，否则请求前一天的数据
				let hour = time.getHours();
				if(hour <= 10){
					let tempTime = time.getTime() - 3600 * 10 * 1000;
					time = new Date(tempTime);
				}
				this.SCDay = time.getFullYear() + '年' + (time.getMonth() + 1) + '月' + time.getDate() + '日';
				uni.request({
					url: this.basePath + '/APP/kanban!flameplatingQualityStatus.action',
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
							this.BLListdata = res.data.Data["不良项数量"];
							this.SCListdata = res.data.Data["生产数据"];
							this.BLname = res.data.Data["不良项名称"];
							this.className = res.data.Data["班次"];
							this.drawLeft();
							// this.drawRight();
						} else {
				
						}
					},
				});
			},
			drawLeft(){
				//处理数据
				let Name = [],
					Rate = [];
				this.SCListdata.forEach((ele, index)=>{
					Name.push(ele[0].slice(0, 5));
					Rate.push(ele[5]);
				});
				
				const dom = document.querySelector('#downLeftCharts');
				if (!Leftfirst) {
					Leftfirst = this.$echarts.init(dom);
				};
				let option = {
					grid: {
						top: '10%',
						left: '10%',
						right: '8%',
						bottom: '10%',
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross',
							crossStyle: {
								color: '#999'
							}
						}
					},
					xAxis: {
						type: 'category',
						data: Name,
						axisLabel: {
							interval: 0, //默认是auto,设置为0，则全部显示X轴
							color: '#fff',
							fontSize: 12,
						},
					},
					yAxis: {
						type: 'value',
						name: '直行率',
						axisLabel: {
							color: '#fff',
							formatter: '{value} %'
						},
					},
					series: [
						{
							data: Rate,
							type: 'bar',
							colorBy: 'data',
							label: {
								show: true,
								position: 'top',
								color: '#fff',
							  },
						}
				  ]
				};
				Leftfirst.setOption(option);
			},
			drawRight(){
				const dom = document.querySelector('#downRightCharts');
				if (!Rightfirst) {
					Rightfirst = this.$echarts.init(dom);
				};
				//处理数据
				let Name = [],
					seriesList = [],
					tempArr = [];
				this.SCListdata.forEach((item, i)=>{
					Name.push(item[0]);
				});
				this.BLListdata.forEach((item, i)=>{
					seriesList.push({
						name: Name[i],
						type: 'line',
						data: item
					});
				});
				

				console.log(tempArr)
				let option = {
				  tooltip: {
				  	trigger: 'axis',
				  	axisPointer: {
				  		type: 'cross',
				  		crossStyle: {
				  			color: '#999'
				  		}
				  	}
				  },
				  legend: {
					data: Name,
					 textStyle: {
					      color: '#fff',
					    }
				  },
				  grid: {
					top: '10%',
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				  },
				  xAxis: {
					type: 'category',
					boundaryGap: false,
					data: this.BLname,
					axisLabel: {
						interval: 0, //默认是auto,设置为0，则全部显示X轴
						color: '#fff',
						fontSize: 12,
					},
					
				  },
				  yAxis: {
					type: 'value',
					axisLabel: {
						color: '#fff',
					},
				  },
				  series: seriesList
				};
				Rightfirst.setOption(option);
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
	.tableContent {
		width: 100%;
		height: 92%;
	}
	.titltTime {
	    font-size: .2rem;
	    text-align: right;
	}
	.upContent {
		height: 55%;
		overflow: scroll;
	}
	.charttitle {
		font-size: .2rem !important;
		color: #FFFFFF;
		overflow: hidden;
	}
	.table_del{
		width: 100%;
		text-align: center;
		background-color: transparent;
	}
	.wrap-line {
		margin-top: .1%;
		height: 45%;
		overflow: scroll;
		border: 1px solid #255ABE;
	}
	
	.produce_title {
		height: 10%;
		background-image: linear-gradient(to right, #125BCD, #5F58FC);
		padding: 0 2%;
		color: #89FAF7;
		font-size: .25rem;
		text-align: center;
	}
	.produce_title2 {
		height: 10%;
		background-image: linear-gradient(to right, #5F58FC, #125BCD);
		padding: 0 2%;
		color: #89FAF7;
		font-size: .25rem;
		text-align: center;
	}
</style>

