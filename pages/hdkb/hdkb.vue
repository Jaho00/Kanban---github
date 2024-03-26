<template>
	<view id="data-view">
	 <dv-full-screen-container>
		 <view class="row align-items-center" style="background-color: #052D84;color: #ffffff;">
			<view class="col align-self-center" style="font-size: .25rem;" @click="returnBack">
			</view> 
			<view class="col pageTitle align-self-center">
					<text>耗电分析</text>
			</view>
			<view class="col titltTime"></view>
		 </view>
	   <dv-border-box-2 class="main-container">
			<view class="row content-wrapper justify-content-around">
				<view class="col-6 row addbgcolor" style="height: 100%;">
					<view class="col-12 box-title">
						每日耗电
					</view>
					<view class="col-12" style="height:80%;">
						<dv-charts :option="MRHDoption" />
					</view>
				</view>
				<view class="col-6 row addbgcolor" style="height: 100%;margin-left: 1%;">
					<view class="col-12 box-title">
						车间耗电对比
					</view>
					<view class="col-12" style="height:80%;">
						<dv-charts :option="ZHNHoption" />
					</view>
				</view>
			</view>
			<view class="row content-wrapper justify-content-around">
				<view class="col-12 deletemargin deletepadding">
					<dv-scroll-board :config="ZHNHlistoption" />
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
				ZHNHoption:{
					series: [
					  {
						type: 'pie',
						radius: '50%',
						// roseSort: false,
						data: [
						  { name: '车间一', value: 483 },
						  { name: '车间二', value: 502 },
						  { name: '车间三', value: 340 },
						  { name: '车间四', value: 559 },
						  { name: '车间五', value: 532 },
						  { name: '车间六', value: 498 },
						  { name: '车间七', value: 294 },
						  { name: '车间八', value: 603 },
						],
						insideLabel: {
						  show: true
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
				MRHDoption:{
				  title: {
					text: ''
				  },
				  xAxis: {
					name: '时间',
					data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
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
					name: '耗电量',
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
				  series: [
					{
					  data: [120, 223, 190, 210, 350, 420, 398],
					  type: 'bar',
					  gradient: {
						color: ['#37a2da', '#67e0e3']
					  }
					}
				  ]
				},
				ZHNHlistoption: {
					header: ['设备名称','设备编号', '电耗占比','运行时长(h)','电耗(kw*h)'],
					data: [
						['设备一','CP00234','50%','10','483'],
						['设备二','CP00235','60%','17','502'],
						['设备三','CP00237','69%','18','340'],
						['设备四','CP00228','76%','16','559'],
						['设备五','CP00236','48%','18','532'],
						['设备六','CP00253','57%','16','498'],
						['设备七','CP00233','25%','16','294'],
						['设备八','CP00249','57%','17','603'],
					],
					index: true,
					columnWidth: [50],
					align: ['center','center','center','center','center','center','center','center','center'],
					rowNum: 7,
					headerBGC: '#1981f6',
					headerHeight: 45,
					oddRowBGC: 'rgba(0, 44, 81, 0.8)',
					evenRowBGC: 'rgba(10, 29, 50, 0.8)',
				},
			}
		},
		onLoad() {
			_self = this;
		},
		methods: {
			

			
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
	.deletemargin{
		margin:0;
	}
	.deletepadding{
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
