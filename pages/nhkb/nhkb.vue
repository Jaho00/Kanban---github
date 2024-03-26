<template>
	<view id="data-view">
	 <dv-full-screen-container>
		 <view class="row align-items-center" style="background-color: #052D84;color: #ffffff;">
			<view class="col align-self-center" style="font-size: .25rem;" @click="returnBack">
			</view> 
			<view class="col pageTitle align-self-center">
					<text>能耗看板</text>
			</view>
			<view class="col titltTime"></view>
		 </view>
	   <dv-border-box-2 class="main-container">
			<view class="row content-wrapper justify-content-around">
				<view class="col-8 row addbgcolor" style="height: 100%;">
					
					<view class="col-12 box-title">
						月度耗能分布
					</view>
					<view class="col-4" style="height:80%;">
						<dv-charts :option="ZHNHoption" />
					</view>
					<view class="col-8" style="">
						<dv-scroll-board :config="ZHNHlistoption" />
					</view>
				</view>
				<view class="col-4" style="height: 100%;margin-left: 1%;">
					<view class="row delatemargin" style="width: 100%;height: 100%;background-color: red;">
						<view class="col-12 row delatemargin" style="height: 50%;background-color: #01C0C8;">
							<view class="col-6 row align-items-center delatepadding delatemargin">
								<text class="col-12" style="font-size: 1rem;">{{ nowTime }}</text>
								<text class="col-12" style="font-size: .3rem;">{{ nowDay }}</text>
								<text class="col-12" style="font-size: .3rem;">{{ nowWeek }}</text>
							</view>
							<view class="col-6 row align-items-center delatepadding delatemargin">
								<view class="col-12 row align-items-center delatepadding delatemargin" style="background-color: #00ABB2;height: 30%;">
									<text class="col" style="font-size: .2rem;">风向描述 &nbsp;&nbsp;  {{tqxx.winddirection}} &nbsp;&nbsp; {{tqxx.windpower}}级</text>
								</view>
								<view class="col-12 row align-items-center delatepadding delatemargin" style="background-color: #00ABB2;height: 30%;">
									<text class="col" style="font-size: .2rem;">室外温度 &nbsp; {{tqxx.temperature}}℃ 相对湿度 &nbsp; {{tqxx.humidity}}</text>
								</view>
							</view>
						</view>
						<view class="col-12 row delatemargin delatepadding"style="height: 50%;background-color: #2F3D58;">
							<view class="col-5 row delatemargin delatepadding" style="height: 100%;">
								<view class="col-12 row align-items-center delatemargin delatepadding" style="height: 50%;text-align: center;border-right:1px solid #009AA1">
									<text class="col-12" style="font-size: .5rem;"> 25.06 </text>
									<text class="col-12" style="font-size: .2rem;"> 对标节能率% </text>
									<text class="col-12" style="font-size: .1rem;">基准：2017年能耗数据</text>
								</view>
								<view class="col-12 row align-items-center delatemargin delatepadding" style="height: 50%;text-align: center;border-top:1px solid #009AA1;border-right:1px solid #009AA1">
									<text class="col-12" style="font-size: .5rem;"> 88.00 </text>
									<text class="col-12" style="font-size: .2rem;"> 碳减排累计量% </text>
								</view>
							</view>
							<view class="col-7 delatepadding">
								<view class="col-12 " style="height: 10%;font-size: .2rem;">
									节能量
								</view>
								<dv-capsule-chart :config="jnl" style="width:100%;height:90%" />
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="row content-wrapper delatemargin">
				<view class="col-5" style="height: 80%;">
					<view class="col-12 box-title" style="height: 15%;">
						历史能效指标
					</view>
					<dv-border-box-8>
						<dv-scroll-board :config="DayPZJKoption" />
					</dv-border-box-8>
				</view>
				<view class="col-7" style="height: 73%;">
					<view class="col-12 box-title" style="height: 15%;">
						实时耗能趋势
					</view>
					<view class="row delatemargin justify-content-end">
						<button class="typeBtn" :class="chartType == 'water' ? 'activeBtn': ''" type="default" @click="changeType('water',0)">水</button>
						<button class="typeBtn" :class="chartType == 'cable' ? 'activeBtn': ''" type="default" @click="changeType('cable',1)">电</button>
						<button class="typeBtn" :class="chartType == 'cng' ? 'activeBtn': ''" type="default" @click="changeType('cng',2)">燃气</button>
					</view>
					<dv-border-box-2 v-if="chartType == 'water'">
						<dv-charts :option="waterOption" />
					</dv-border-box-2>
					<dv-border-box-2 v-else-if="chartType == 'cable'">
						<dv-charts  :option="cableOption" />
					</dv-border-box-2>
					<dv-border-box-2 v-else="chartType == 'cng'">
						<dv-charts :option="cngOption" />
					</dv-border-box-2>
				</view>
			</view>
		</dv-border-box-2>	
	</dv-full-screen-container>
	</view> 
</template>



<script>
	var _self;
	export default {
		data() {
			return {
				DayCLFXoption : {
				  title: {
				    text: '日产量分析',
					style: {
					  fill: '#fff',
					  fontSize: 17,
					  fontWeight: 'bold',
					  textAlign: 'center',
					  textBaseline: 'bottom'
					}
				  },
				  xAxis: {
				    name: '',
				    data: [],
					nameTextStyle: {
					  fill: '#fff',
					  fontSize: 10,
					  textAlign: 'center',
					},
					axisLabel:{
						style: {
						  stroke: '#fff',
						  lineWidth: .5
						}
					},
					axisTick:{
						style: {
						  stroke: '#fff',
						  lineWidth: 1
						}
					},
					axisLine:{
						style: {
						  stroke: '#fff',
						  lineWidth: 1
						}
					},
				  },
				  yAxis: {
				    name: '销售额',
				    data: 'value',
					nameTextStyle: {
					  fill: '#fff',
					  fontSize: 10
					},
					axisLabel:{
						style: {
						  stroke: '#fff',
						  lineWidth: .5
						}
					},
					axisLine:{
						style: {
						  stroke: '#fff',
						  lineWidth: 1
						}
					},
				  },
				  series: [
				    {
				      data: [],
				      type: 'bar',
				      gradient: {
				        color: ['#37a2da', '#67e0e3']
				      }
				    }
				  ]
				},
				ZHNHlistoption: {
					header: ['用能区域','电(kwh)', '燃气(m³)','燃油(kg)','综合耗能(kgce)','水(t)'],
					data: [
						['一号楼','234','550','560','483','620'],
						['二号楼','235','560','547','502','496'],
						['三号楼','237','569','568','340','548'],
						['四号楼','228','576','556','559','498'],
						['五号楼','236','548','568','532','340'],
						['六号楼','253','557','576','498','502'],
						['七号楼','233','525','536','294','568'],
						['八号楼','249','557','587','603','560'],
					],
					index: true,
					columnWidth: [50, 100, 100,100],
					align: ['center','center','center','center','center','center','center','center','center'],
					rowNum: 7,
					headerBGC: '#1981f6',
					headerHeight: 45,
					oddRowBGC: 'rgba(0, 44, 81, 0.8)',
					evenRowBGC: 'rgba(10, 29, 50, 0.8)',
				},
				DayPZJKoption: {
					header: ['','2017年', '2018年','2019年','2020年'],
					data: [
						['综合总能耗(tce)','8829','9740','7024','9402'],
						['人均综合能耗(tce/人)','8240','8992','7205','9932'],
						['单位面积能耗(tce/㎡)','8593','7925','7390','9953'],
						['总用水(t)','9201','10925','7022','8914'],
						['人均用水(t)','9522','9563','7013','9291'],
						
					],
					index: false,
					columnWidth: [200],
					align: ['center','center','center','center','center','center','center','center','center'],
					rowNum: 5,
					headerBGC: '#1981f6',
					headerHeight: 45,
					oddRowBGC: 'rgba(0, 44, 81, 0.8)',
					evenRowBGC: 'rgba(10, 29, 50, 0.8)'
				},
				ZHNHoption:{
					series: [
					  {
						type: 'pie',
						radius: '50%',
						// roseSort: false,
						data: [
						  { name: '一号楼', value: 483 },
						  { name: '二号楼', value: 502 },
						  { name: '三号楼', value: 340 },
						  { name: '四号楼', value: 559 },
						  { name: '五号楼', value: 532 },
						  { name: '六号楼', value: 498 },
						  { name: '七号楼', value: 294 },
						  { name: '八号楼', value: 603 },
						],
						insideLabel: {
						  show: false
						},
						outsideLabel: {
						  formatter: '{name} {percent}%',
						  labelLineEndLength: 20,
						  style: {
							fill: '#fff'
						  },
						  labelLineStyle: {
							stroke: '#fff'
						  }
						},
					  }
					],
					
				},
				DayBLYYFXoption:{
					series: [
					  {
						type: 'pie',
						radius: '50%',
						roseSort: false,
						data: [
						  { name: '变色', value: 50 },
						  { name: '错位', value: 25 },
						  { name: '变形', value: 30 },
						  { name: '桥通', value: 15 },
						  { name: '划痕', value: 45 },
						  { name: '刮花', value: 25 },
						  { name: '料花', value: 6 },
						  { name: '批锋', value: 22 },
						],
						insideLabel: {
						  show: false
						},
						outsideLabel: {
						  formatter: '{name} {percent}%',
						  labelLineEndLength: 20,
						  style: {
							fill: '#fff'
						  },
						  labelLineStyle: {
							stroke: '#fff'
						  }
						},
						roseType: true
					  }
					],
					color: ['#da2f00', '#fa3600', '#ff4411', '#ff724c', '#541200', '#801b00', '#a02200', '#5d1400', '#b72700']
				},
				waterOption:{
				  title: {
					text: ''
				  },
				  legend: {
					data: ['能耗', '产量'],
					textStyle: {
					  fontFamily: 'Arial',
					  fontSize: 13,
					  fill: '#fff'
					}
				  },
				  xAxis: {
					name: '',
					data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
					axisLabel:{
						style: {
						  stroke: '#fff',
						  lineWidth: .5
						}
					},
				  },
				  yAxis: [
				      {
						name: '总用量',
						data: 'value',
						axisLabel:{
							style: {
							  stroke: '#fff',
							  lineWidth: .5
							}
						},
						axisLine:{
							style: {
							  stroke: '#fff',
							  lineWidth: 1
							}
						},
						nameTextStyle: {
						  fill: '#fff',
						  fontSize: 20
						}
				      },
				      {
				        name: '产量',
				        data: 'value',
				        position: 'right',
				        max: 20000,
				        splitLine: {
				          show: false
				        },
						axisLabel:{
							style: {
							  stroke: '#fff',
							  lineWidth: .5
							}
						},
						axisLine:{
							style: {
							  stroke: '#fff',
							  lineWidth: 1
							}
						},
						nameTextStyle: {
						  fill: '#fff',
						  fontSize: 20
						}
				      }
				    ],
				  series: [
					{
					  name: '能耗',
					  data: [1300, 2420, 3400, 5200, 4200, 5230, 4985],
					  type: 'line',
					  lineStyle: {
						  lineDash: [5, 5]
						}
					},
					{
					  name: '产量',
					  data: [1200, 2230, 1900, 2100, 3500, 4200, 3985],
					  type: 'bar',
					  gradient: {
						color: ['rgba(103, 224, 227, .6)', 'rgba(103, 224, 227, .1)']
					  },
					  barStyle: {
						stroke: 'rgba(103, 224, 227, 1)'
					  }
					},
				  ]
				},
				cableOption:{
				  title: {
					text: ''
				  },
				  legend: {
					data: ['能耗', '产量'],
					textStyle: {
					  fontFamily: 'Arial',
					  fontSize: 13,
					  fill: '#fff'
					}
				  },
				  xAxis: {
					name: '',
					data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
					axisLabel:{
						style: {
						  stroke: '#fff',
						  lineWidth: .5
						}
					},
				  },
				  yAxis: [
				      {
						name: '总用量',
						data: 'value',
						axisLabel:{
							style: {
							  stroke: '#fff',
							  lineWidth: .5
							}
						},
						axisLine:{
							style: {
							  stroke: '#fff',
							  lineWidth: 1
							}
						},
						nameTextStyle: {
						  fill: '#fff',
						  fontSize: 20
						}
				      },
				      {
				        name: '产量',
				        data: 'value',
				        position: 'right',
				        max: 20000,
				        splitLine: {
				          show: false
				        },
						axisLabel:{
							style: {
							  stroke: '#fff',
							  lineWidth: .5
							}
						},
						axisLine:{
							style: {
							  stroke: '#fff',
							  lineWidth: 1
							}
						},
						nameTextStyle: {
						  fill: '#fff',
						  fontSize: 20
						}
				      }
				    ],
				  series: [
					{
					  name: '能耗',
					  data: [1500, 2569, 2444, 3922, 4000, 5200, 4566],
					  type: 'line',
					  lineStyle: {
						  lineDash: [5, 5]
						}
					},
					{
					  name: '产量',
					  data: [1200, 2230, 1900, 2100, 3500, 4200, 3985],
					 type: 'bar',
					 gradient: {
						color: ['rgba(103, 224, 227, .6)', 'rgba(103, 224, 227, .1)']
					 },
					 barStyle: {
						stroke: 'rgba(103, 224, 227, 1)'
					 }
					},
				  ]
				},
				cngOption:{
				  title: {
					text: ''
				  },
				  legend: {
					data: ['能耗', '产量'],
					textStyle: {
					  fontFamily: 'Arial',
					  fontSize: 13,
					  fill: '#fff'
					}
				  },
				  xAxis: {
					name: '',
					data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
					axisLabel:{
						style: {
						  stroke: '#fff',
						  lineWidth: .5
						}
					},
				  },
				  yAxis: [
				      {
						name: '总用量',
						data: 'value',
						axisLabel:{
							style: {
							  stroke: '#fff',
							  lineWidth: .5
							}
						},
						axisLine:{
							style: {
							  stroke: '#fff',
							  lineWidth: 1
							}
						},
						nameTextStyle: {
						  fill: '#fff',
						  fontSize: 20
						}
				      },
				      {
				        name: '产量',
				        data: 'value',
				        position: 'right',
				        max: 20000,
				        splitLine: {
				          show: false
				        },
						axisLabel:{
							style: {
							  stroke: '#fff',
							  lineWidth: .5
							}
						},
						axisLine:{
							style: {
							  stroke: '#fff',
							  lineWidth: 1
							}
						},
						nameTextStyle: {
						  fill: '#fff',
						  fontSize: 20
						}
				      }
				    ],
				  series: [
					{
					  name: '能耗',
					  data: [1823, 2520, 2400, 3440, 4200, 4930, 5125],
					  type: 'line',
					  lineStyle: {
						  lineDash: [5, 5]
						}
					},
					{
					  name: '产量',
					  data: [1200, 2230, 1900, 2100, 3500, 4200, 3985],
					 type: 'bar',
					 gradient: {
						color: ['rgba(103, 224, 227, .6)', 'rgba(103, 224, 227, .1)']
					 },
					 barStyle: {
						stroke: 'rgba(103, 224, 227, 1)'
					 }
					},
				  ]
				},
				jnl:{
				  data: [
					{
					  name: '用电节约量',
					  value: 1678
					},
					{
					  name: '用水节约量',
					  value: 1235
					},
					{
					  name: '用气节约量',
					  value: 986
					},
					{
					  name: '用煤节约量',
					  value: 756
					},

				  ],
				  colors: ['#e062ae', '#fb7293', '#e690d1', '#32c5e9', '#96bfff'],
				  unit: '单位',
				  showValue: true
				},
				nowDay: "",
				nowTime:"",
				nowWeek:"",
				wd:"",
				sd:"",
				pm:"",
				chartType:'water',
				typeIndex:0,
				city: '',
				cityCODE:'',
				tqxx:{},
			}
		},
		onLoad() {
			_self = this;
			this.getInfo();
		},
		methods: {
			// 数据请求后,需要手动刷新
			updateHandler (config) {
			  // _self.DaySCJKoption.data = { ..._self.DaySCJKoption.data }
			  _self[config] = { ..._self[config] }
			},
			getInfo(){
				setInterval(()=>{
					 var time = new Date();
					 var month = time.getMonth() + 1;
					 var hours = time.getHours();
					 var seconds = time.getSeconds();
					 var minutes =time.getMinutes();
					 //判断是否在前面加0
					function getNow(s) {
						return s < 10 ? '0' + s: s;
					}
					var a = new Array("日", "一", "二", "三", "四", "五", "六");  
					var week = time.getDay();  
					this.nowWeek = '星期' + a[week];  
					this.nowDay = time.getFullYear() + '年' + month + '月' + time.getDate() + '日';
					this.nowTime = getNow(hours)+':'+getNow(minutes);
				},1000);
				setInterval(()=>{
					if(this.typeIndex == 0){
						this.chartType = 'water';
						this.typeIndex++;
					}else if(this.typeIndex == 1){
						this.chartType = 'cable';
						this.typeIndex++;
					}else if(this.typeIndex == 2){
						this.chartType = 'cng';
						this.typeIndex = 0;
					}
					
				},10000);
				
				this.getreport();
			},
			getreport(){
				uni.request({
					url: 'https://restapi.amap.com/v3/ip?parameters',
					data: {
						key:'dc525ef1d80cea5365b4b11cf55b7bfa'
					},
					method: 'GET',
					success:(res)=>{
						this.city = res.data.city;
						this.cityCODE = res.data.adcode;
						this.getdata();
					},
				});
				
			},
			getdata(){
				uni.request({
					url: 'https://restapi.amap.com/v3/weather/weatherInfo',
					data: {
						key:'dc525ef1d80cea5365b4b11cf55b7bfa',
						city: this.cityCODE,
						
					},
					method: 'GET',
					success:(res)=>{
						this.tqxx = res.data.lives[0];
						
					},
				});
			},
			changeType(target,index){
				this.typeIndex = index;
				this.chartType = target;
			},
		}
	}
</script>

<style>
	#data-view {
	  width: 100%;
	  height: 100%;
	  background-color: #030409;
	  color: #fff;
	}
	#dv-full-screen-container {
	  background-image: url('../../components/datav/img/bg.png');
	  background-size: 100% 100%;
	  box-shadow: 0 0 3px blue;
	  display: flex;
	  flex-direction: column;
	}
	.main-container {
	  height: calc(~"100% - 57px");
	}
	/* 顶部样式 */
	.pageTitle {
		text-align: center;
		font-size: .4rem;
	}
	
	.titltTime {
		text-align: right;
		font-size: .4rem;
	}
	/* 内容区域样式 */
	.content-wrapper{
		height:50%;
		margin: 10px 0;
		padding: 0 25px;
	}
	.bottom-wrapper{
		height: 24%;
		width: 750rpx;
	}
	.box-title{
		height:10%;
		background-color: #2F3D58;
		font-size: .3rem;
	}
	.addbgcolor{
		background-color: #2F3D58;
	}
	.delatemargin{
		margin:0;
	}
	.delatepadding{
		padding:0;
		color: #FFFFFF;
	}
	.typeBtn{
		font-size: .3rem;
		margin: 3px 20px;
		background-color: #394660;
		color: #FFFFFF;
	}
	.activeBtn{
		background-color: #009AA1;
	}
</style>
