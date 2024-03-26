<template>
	<view class="container-fluid full">
		 <dv-full-screen-container>
		<view class="">
			<u-toast ref="uToast" />
		</view>
		<view class="full">
			<swiper class="allScrean" :circular="circular" :indicator-color="indicatorColor" :indicator-active-color="indicatorActiveColor" :indicator-dots="indicatorDots" :autoplay="autoplay" 
				:interval="interval" :duration="duration" @change="changItem" >
				<!-- 第一块设备总看板 -->
				 <swiper-item>
					<view class="swiper-item setheight">
						<view class="container-fluid setfull no-gutters">
							<dv-full-screen-container>
								<!-- 区域多选弹出层 -->
								<u-popup v-model="isCXShow" z-index="900" mode="center" height="60%" width="60%">
									<!-- 自定义头部部分 -->
									<view class="row align-items-center" style="background-color: #106FBB;color: #ffffff;height: .8rem;font-weight: bold;font-size: .2rem;">
										<view class="col-2 align-self-center" style="font-size: .25rem;" @click="hidepage">
											<image src="../../../../../static/img/back.png" mode="" style="width: 40rpx;height: 40rpx;"></image>
											</view> 
										<view class="col pageTitle align-self-center" style="text-align: center;">
											<text>选择区域</text>
										</view>	
										<view class="col-2 row justify-content-end titltTime" style="padding-right:10px;">
											<button type="button" class="btn btn-success"
												style="font-size: .25rem;border-radius: 5px;padding:5px 10px;width: 100%;"
												@click="SaveCx">保存</button>
										</view>
										<view class="col-1 row justify-content-end titltTime" style="padding-right:10px;">
										</view>
									</view>
									<view class="row no-gutters justify-content-around">
										<checkbox-group @change="checkboxChange" class="row no-gutters col-12">
											<view class="col-6 row no-gutters justify-content-around mt-1" v-for="item in newLineList" :key="item.ADDRESS_CODE">
												<label class="uni-list-cell uni-list-cell-pd row no-gutters col-10" style="margin-bottom: 0;">
													<view class="col-2">
														<checkbox :value="item.ADDRESS_CODE" :checked="item.checked" />
													</view>
													<view class="col-10" style="color: #000000;">{{item.label}}</view>
												</label>
											</view>
										</checkbox-group>
									</view>
								</u-popup>
								<view class="row align-items-center" style="color: #ffffff;" v-if="isToastShow == 'noToast'">
									<view class="col align-self-center row no-gutters" style="font-size: .2rem;">
										<view class="col-6 row no-gutters align-items-center">
											<view class="col-4 row no-gutters justify-content-center">
												<text class="yl-text">车间</text>
											</view>
											<view class="col-8">
												<!-- 下拉框模式 -->
												<xfl-select :list="tempcjList" :clearable="false" :showItemNum="11" :focusShowList="false"
													:listShow="false" :isCanInput="false" :style_Container="'height: .4rem;width:100%;'"
													:selectHideType="'independent'" @change="changecj" :initValue="cjName"
													v-if="isShowcj">
												</xfl-select>
											</view>
										</view>
										<!-- <view class="col-6 row no-gutters align-items-center">
											<view class="col-4 row no-gutters justify-content-center">
												<text class="yl-text">区域</text>
											</view>
											<view class="col-8">
												<input type="text" class="titleText border" style="background-color: #FFFFFF;color: #000000;" disabled v-model="CXobj.name" @click="chooseCX">
											</view>
										</view> -->
									</view>
									<view class="col-4 pageTitle row justify-content-center" style="font-size: .4rem;text-align: center;">
										<text style="margin: 0 5%;">{{ titleObj.FTITLE }}</text>
										<!-- <text style="margin: 0 5%;">注塑车间看板</text> -->
									</view>
									<view class="col-5 titltTime row align-items-center">
										<view class="col-7 deletepadding row no-gutters align-content-around" style="width: 100%;">
						
										</view>
										<view class="col-5">
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
										<u-notice-bar class="toastTitle" mode="horizontal" :volume-icon="false" :volume-size="20" :speed="25" :font-size="20"
										 :padding="0" type='none' :is-circular="true" :list="newtoaList" bg-color='#000000' color='#ffffff'></u-notice-bar>
									</view>
								</view>
								<!-- 内容区 -->
								<view class="row addpadding tableContent no-gutters" style="overflow: hidden;margin-top: .5%;">
									<!-- 概览部分 -->
									<view class="col-3 wrap-line no-gutters">
										<view class="row no-gutters col-12 time-text justify-content-center" style="height: 5%;">
											<text>设备概览</text>
										</view>
										<view class="col-12 no-gutters" style="height: 35%;">
											<!-- <view class="col-12 row no-gutters">
												<view class="col-6 small-text justify-content-center no-gutters row">
													<text>当前时间：{{ week }}</text>
												</view>
												<view class="col-6 small-text justify-content-center no-gutters row">
													<text>班次：04-15 早班</text>
												</view>
											</view> -->
											<view class="col-12 row no-gutters ybp-content">
												<view class="col-6 small-text justify-content-center no-gutters row" id="kjl">
													
												</view>
												<view class="col-6 small-text justify-content-center no-gutters row" id="Wzhxl">
													
												</view>
											</view>
											<view class="col-12 row no-gutters">
												<view class="col-3 right-border">
													<view class="row no-gutters justify-content-center">
														<text class="small-text" style="color:#FFFFFF">{{ workNum + waitNum + stopNum }}</text>
													</view>
													<view class="row no-gutters justify-content-center">
														<text class="small-text" style="color:#02A7F0">设备总数</text>
													</view>
												</view>
												<view class="col-3 right-border">
													<view class="row no-gutters justify-content-center">
														<text class="small-text" style="color:#FFFFFF">{{workNum}}</text>
													</view>
													<view class="row no-gutters justify-content-center">
														<text class="small-text" style="color:#28CC7B">运行</text>
													</view>
												</view>
						
												<view class="col-3 right-border">
													<view class="row no-gutters justify-content-center">
														<text class="small-text" style="color:#FFFFFF">{{ waitNum }}</text>
													</view>
													<view class="row no-gutters justify-content-center">
														<text class="small-text" style="color:#FFB538">待机</text>
													</view>
												</view>
												<view class="col-3 right-border">
													<view class="row no-gutters justify-content-center">
														<text class="small-text" style="color:#FFFFFF">{{ stopNum }}</text>
													</view>
													<view class="row no-gutters justify-content-center">
														<text class="small-text" style="color:#AEB8C3">离线</text>
													</view>
												</view>
											</view>
										</view>
										<view class="row no-gutters col-12 time-text justify-content-center" style="height: 5%;">
											<text>异常情况</text>
										</view>
										<view class="col-12 no-gutters produce-content" style="overflow: scroll;">
											<u-table class="scrollList GXtableHeight" style="width: 100%;overflow: hidden;" bg-color="transparent" color="#FFFFFF" border-color="#052D84">
												 <u-tr v-for="(item,index) in BJList" :key="index" class="GxTrHeight">
													 <u-td width="20%" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" class="charttitle">
														 {{ item.DEVCODE }}
													 </u-td>
													<u-td class="charttitle">
														 {{ item.MESSAGE }}
													</u-td>
													 <u-td class="charttitle">
														 {{ item.CURRTIME }}
													 </u-td>
												 </u-tr>	
											</u-table>
										</view>
										<view class="row no-gutters col-12 time-text justify-content-center" style="height: 5%;">
											<text>今日综合效率概览</text>
										</view>
										<view class="col-12 no-gutters allrate-content" id="zhxlgl">
						
										</view>
									</view>
									<!-- 列表区域 -->
									<view class="col-9 row no-gutters tdContent align-content-start">
										<view class="addpadding setHeight" v-for="item in showdataList" :key="item.id">
											<view class="row no-gutters" :class="item.SY_STATUS  == 3 ? 'shapeGray' : item.SY_STATUS == 2 ? 'shapeGreen' : 'shapeRed'" >
												<view class="row Content-title no-gutters">
													<view class="col-7 list-label">
														{{item.FDEVNAME}}
													</view>
													<view class="col-5 delatepadding text-right">
														<!-- {{ item.OEE }}% -->
													</view>
												</view>
												<view class="row Content-text no-gutters" v-for="(ele) in labelArr" :key="ele.valuename">
													<view class="col-12 delatepadding over_text">
														<text>{{ ele.labelname }}：{{ item[ele.valuename] }}</text>
													</view>
												</view>
												<view class="row Content-text no-gutters">
													<u-line-progress :percent="item.FCOMP_RATE" :show-percent="true" style="height: .2rem;" fontSize="0.2" :active-color="item.FCOMP_RATE > 100 ? '#FA3534':'#19be6b'"></u-line-progress>
												</view>
											</view>
										</view>
									</view>
						
									<view class="row no-gutters bottom-Content">
										<view class="col-10" style="text-align: center;">
						
										</view>
										<view class="col-1" style="text-align: center;">
											<uni-pagination show-icon="true" :total="dataList.length" pageSize="25" :current="nowCurrent" @change="changPage"></uni-pagination>
										</view>
						
									</view>
								</view>
							</dv-full-screen-container>
						</view>
					</view>
				</swiper-item>
				<!-- 根据循环生成单机台看板 -->
				<swiper-item v-for="(jtObj, index) in listData" :key="jtObj.FDEVCODE">
					<view class="swiper-item setheight" v-if="jtObj.devInfo">
						<view class="container-fluid setfull no-gutters">
							<view class="row align-items-center" style="color: #ffffff;" v-if="isToastShow == 'noToast'">
								<view class="col row align-items-center align-self-center">
									<image :src="LOGO" mode="aspectFit" style="width: 100px;height: 40px;margin-left: 5%;"></image>
									<text style="margin-left:10%;height:50px;font-size: .2rem;line-height: 2.5;" v-show="titleObj.FCOMPANY == '' ? false : true">{{ titleObj.FCOMPANY }}</text>
							
								</view>
								<view class="col-3 pageTitle row justify-content-center" style="font-size: .4rem;text-align: center;">
									<text style="margin: 0 5%;">机台实时看板</text>
									<!-- <text style="margin: 0 5%;">注塑车间看板</text> -->
								</view>
								<view class="col-3 titltTime row justify-content-end">
									<view class="col-9 deletepadding row no-gutters justify-content-end" style="width: 100%;">
										<view class="col deletepadding">
											<!-- <view class="statu-btn" style="margin: 0 5px;background-color: rgba(39, 185, 75, 0.75);">
												<image src="../../../../../static/img/领料.png" mode="scaleToFill" class="ic-sb"></image>
												<text style="margin: 0 5px;">生产工艺</text>
											</view> -->
										</view>
										<view class="col-6 deletepadding">
											
										</view>
									</view>
								</view>
								<view class="col-2 titltTime row align-items-center">
									<view class="col-1 deletepadding row no-gutters align-content-around" style="width: 100%;">
							
									</view>
									<view class="col-11">
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
									<u-notice-bar class="toastTitle" mode="horizontal" :volume-icon="false" :volume-size="20" :speed="25" :font-size="20"
									 :padding="0" type='none' :is-circular="true" :list="newtoaList" bg-color='#000000' color='#ffffff'></u-notice-bar>
								</view>
							</view>
							<!-- 内容区 -->
							<view class="row addpadding tableContent no-gutters" style="overflow: hidden;margin-top: .5%;">
								<!-- 概览部分 -->
								<view class="col-2 wrap-line no-gutters">
									<view class="row no-gutters col-12 time-text justify-content-center" style="height: 4%;">
										<text>设备综合指标</text>
									</view>
									<view class="col-12 no-gutters rate-content">
										<view class="col-12 row no-gutters justify-content-center">
											<text class="titleText">综合效率(OEE)</text>
										</view>
										<view class="allsize justify-content-center row no-gutters" id="zhxl">
											<dv-decoration-9 class="dvContent">{{ jtObj.OEE }}%</dv-decoration-9>
										</view>
									</view>
									<view class="col-12 no-gutters rate-content">
										<view class="col-12 row no-gutters justify-content-center">
											<text class="titleText">良品率(Quality)</text>
										</view>
										<view class="allsize justify-content-center row no-gutters" id="lpl">
											<dv-decoration-9 class="dvContent">{{ jtObj.YIELD_RATE }}%</dv-decoration-9>
										</view>
									</view>
									<view class="col-12 no-gutters rate-content">
										<view class="col-12 row no-gutters justify-content-center">
											<text class="titleText">性能指数(Performance)</text>
										</view>
										<view class="allsize justify-content-center row no-gutters" id="xnjd">
											<dv-decoration-9 class="dvContent">{{ jtObj.PO_RATE }}%</dv-decoration-9>
										</view>
									</view>
									<view class="col-12 no-gutters rate-content">
										<view class="col-12 row no-gutters justify-content-center">
											<text class="titleText">可用率(Availability)</text>
										</view>
										<view class="allsize justify-content-center row no-gutters" id="sjjd">
											<dv-decoration-9 class="dvContent">{{ jtObj.TO_RATE }}%</dv-decoration-9>
										</view>
									</view>
								</view>
								<!-- 中间区域 -->
								<view class="col-5 addpadding wrap-line no-gutters row">
									<view class="col-12" style="height: 100%;">
										<view class="row no-gutters devinfo">
											<view class="col-6 right-border" style="height: 100%;">
												<!-- <view style="width: 100%; height: 100%;">
													 <video style="width: 100%; height: 100%;" :src="jtObj.devInfo.videoURL"
														 :autoplay="true" controls></video>
												</view> -->
												<view style="height: 50%;padding: 0 10px;">
													<image class="imgsize" :src="jtObj.devInfo.videoURL" mode="aspectFit"></image>
												</view>
												<view class="row no-gutters" style="height: 50%;">
													<view class="col-12 row no-gutters">
														<text class="titleText">当前设备运行情况</text>
													</view>
													<view class="col-12 row no-gutters justify-content-center align-self-center">
														<button type="default" class="statusBtn">{{ jtObj.SY_STATUS == '1' ? '待机' : jtObj.SY_STATUS == '2' ? '生产' : '停机' }}</button>
													</view>
												</view>
											</view>
											<view class="col-6">
												<view class="col-12 row no-gutters">
													<text class="titleText">{{ jtObj.devInfo.FNAME }}</text>
												</view>
												<view class="col-12 row no-gutters" style="border-bottom: 1px solid #17A281;padding-bottom: 1%;">
													<view class="col-12 row no-gutters">
														<text class="smallText">设备编码: {{ jtObj.devInfo.FCODE }}</text>
													</view>
												</view>
												<view class="col-12 row no-gutters" style="margin-top: 2%;">
													<view class="row col-12 no-gutters" style="border: 1px solid #17A281;">
														<view class="col-12 row no-gutters info_text">
															<view class="col-5 delatepadding">
																<text>设备类型：</text>
															</view>
															<view class="col-7 over_text">
																{{ jtObj.devInfo.FTYPENAME }}
															</view>
														</view>
													</view>
												</view>
												<view class="col-12 row no-gutters" style="margin-top: 5%;">
													<view class="row col-12 no-gutters" style="border: 1px solid #17A281;">
														<view class="col-12 row no-gutters info_text">
															<view class="col-5 delatepadding">
																<text>生产模具：</text>
															</view>
															<view class="col-7 over_text">
																{{ jtObj.FMOLD_NAME }}
															</view>
														</view>
													</view>
												</view>
												<view class="col-12 row no-gutters" style="margin-top: 5%;">
													<view class="row col-12 no-gutters" style="border: 1px solid #17A281;">
														<view class="col-12 row no-gutters info_text">
															<view class="col-5 delatepadding">
																<text>模具编码：</text>
															</view>
															<view class="col-7 over_text">
																{{ jtObj.FMOLD_CODE }}
															</view>
														</view>
													</view>
												</view>
											</view>
										</view>
										<view class="row no-gutters list_content">
											<view class="row col-12 no-gutters produce_title">
												<view class="col-9 row no-gutters">
													<u-icon name="grid-fill" color="#89FAF7" size="8"></u-icon>
													<text class="align-self-center" style="margin-left: 1%;">设备实时生产概览</text>
												</view>
												<view class="col-3 row no-gutters">
													<view class="sta_circle align-self-center" style="background-color: #69CDF7;box-shadow: 0px 0px 5px 3px #69CDF7;">
								
													</view>
													<text class="align-self-center" style="margin-left: 5%;">生产任务：{{ jtObj.productList.length }}</text>
												</view>
											</view>
											<view class="row col-12 no-gutters produce_content">
												<view class="col-12 produce_wrapper">
													<view class="row no-gutters col-12" style="padding: 2% 2%;" v-for="ele in jtObj.productList" :key="ele.FJOB_NO">
														<view class="row col-12 no-gutters produce_list" style="border: 1px solid #17A281;padding: 1% 1%;">
															<view class="row no-gutters col-10">
																<view class="col-6 row no-gutters">
																	<view class="col-5 delatepadding">
																		<text style="color: #85FAF6;">工单编码：</text>
																	</view>
																	<view class="col-7 over_text">
																		{{ ele.FJOB_NO }}
																	</view>
																</view>
																<view class="col-6 row no-gutters">
																	<view class="col-5 delatepadding">
																		<text style="color: #85FAF6;">物料编码：</text>
																	</view>
																	<view class="col-7 over_text">
																		{{ ele.FPRD_NO }}
																	</view>
																</view>
																<view class="col-6 row no-gutters" style="margin-top: 2%;">
																	<view class="col-5 delatepadding">
																		<text style="color: #85FAF6;">产品名称：</text>
																	</view>
																	<view class="col-7 over_text">
																		{{ ele.FPRD_NAME }}
																	</view>
																</view>
																<view class="col-6 row no-gutters" style="margin-top: 2%;">
																	<view class="col-5 delatepadding">
																		<text style="color: #85FAF6;">任务进度：</text>
																	</view>
																	<view class="col-5 over_text">
																		<u-line-progress :percent="+ele.rate" :show-percent="false" height="5" fontSize="0.23" :active-color="60 > 100 ? '#19be6b':'#1890FF'"></u-line-progress>
																	</view>
																	<view class="col-2 row no-gutters justify-content-center">
																		{{ ele.rate }}%
																	</view>
																</view>
															</view>
															<view class="row no-gutters col-2 align-self-center justify-content-center">
																<button type="default" :style="{backgroundColor: ele.JOB_STATUS == '1' ? '#28A745' : '#b1b1b1' }" class="produce_Btn">{{ ele.JOB_STATUS == '1' ? '在产' : '待产' }}</button>
															</view>
														</view>
													</view>
												</view>
											</view>
										</view>
									</view>
								</view>
								<!-- 右侧区域 -->
								<view class="col-5 addpadding wrap-line no-gutters row">
									<view class="col-12" style="height: 100%;">
										<view class="row no-gutters right_top">
											<view class="col-12 row no-gutters right_top_height">
												<view class="col-12 row no-gutters right_top_height">
													<view class="col-4 align-self-center row no-gutters justify-content-center">
														<u-icon name="grid-fill" color="#89FAF7" size="8"></u-icon>
														<text class="align-self-center" style="margin-left: 1%;">今日设备状态概览</text>
													</view>
													<view class="col-8 align-content-center row no-gutters justify-content-center">
														<view class="col">
															<view class="statu-btn" style="margin: 0 5px;background-color: rgba(39, 185, 75, 0.75);">
																<!-- <image src="../../../../../static/img/领料.png" mode="scaleToFill" class="ic-sb"></image> -->
																<text style="margin: 0 5px;">生产</text>
																<text>{{ jtObj.workTime || '0H' }}</text>
															</view>
														</view>
														<view class="col">
															<view class="statu-btn" style="margin: 0 5px;background-color: rgba(255, 212, 0, 0.8);">
																<!-- <image src="../../../../../static/img/领料.png" mode="scaleToFill" class="ic-sb"></image> -->
																<text style="margin: 0 5px;">待机</text>
																<text>{{ jtObj.waitTime || '0H' }}</text>
															</view>
														</view>
														<view class="col">
															<view class="statu-btn" style="margin: 0 5px;background-color: rgba(241, 241, 241, 0.6);">
																<!-- <image src="../../../../../static/img/领料.png" mode="scaleToFill" class="ic-sb"></image> -->
																<text style="margin: 0 5px;">停机</text>
																<text>{{ jtObj.stopTime || '0H' }}</text>
															</view>
														</view>
													</view>
												</view>
												<view class="col-12 row no-gutters right_top_height">
													<view class="progress col-12" style="height: 15px;font-size: .15rem;">
														<view class="progress-bar" role="progressbar" :style="{width: ele.Percent,backgroundColor: ele.BackgroundCloer || '#d9d9d9'}" :aria-valuenow="ele.Percent"
														v-for="ele in jtObj.gldata" :key="ele.Order" aria-valuemin="0" aria-valuemax="100"></view>
													</view>
													<view class="col-12 row no-gutters justify-content-around" style="color: #FFFFFF;">
														<view class="col row justify-content-center">
															<text>00:00</text>
														</view>
														<view class="col row justify-content-center">
															<text>04:00</text>
														</view>
														<view class="col row justify-content-center">
															<text>08:00</text>
														</view>
														<view class="col row justify-content-center">
															<text>12:00</text>
														</view>
														<view class="col row justify-content-center">
															<text>18:00</text>
														</view>
														<view class="col row justify-content-center">
															<text>24:00</text>
														</view>
													</view>
												</view>
											</view>
											<view class="col-12 no-gutters right_top_height">
												<view class="col-4 align-self-center row no-gutters justify-content-center">
													<u-icon name="grid-fill" color="#89FAF7" size="8"></u-icon>
													<text class="align-self-center" style="margin-left: 1%;">今日停机原因时长</text>
												</view>
												<view class="col-12 row no-gutters">
													<view class="col-3  row no-gutters justify-content-around" style="padding: 1%;" 
														v-for="item in jtObj.reasonList" :key="item.id">
														<view class="col-12 reason_wrap row no-gutters">
															<view class="circle_bg align-self-center">
																<text>{{ item.count }}</text>
															</view>
															<view class="col-6 small-text over_text">
																{{ item.name }}
															</view>
															<view class="col time_content over_text">
																<text>{{ `${item.time}h` }}</text>
															</view>
														</view>
													</view>
												</view>
											</view>
										</view>
										<view class="row no-gutters right_down">
											<view class="row col-12 no-gutters list_title">
												<view class="col-9 row no-gutters">
													<u-icon name="grid-fill" color="#89FAF7" size="8"></u-icon>
													<text class="align-self-center" style="margin-left: 1%;">50模次生产周期图</text>
												</view>
											</view>
											<view class="row col-12 no-gutters produce_content">
												<!-- <dv-scroll-board :config="recordList" /> -->
												<view style="height: 100%; width: 100%;" :id="`zqt${index}`">
													
												</view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
			</dv-full-screen-container>
	</view>
</template>

<script>
	var _self = null;
	var timer = null; //创建一个定时器
	var getINFOtimer = null;
	var kjlChart = null; //创建一个开机率的echarts对象，来判断是否存在
	var zhxlChart = null; //综合效率echarts对象
	var zhxlglChart = null; //综合效率概览折线图
	var zqtChartObj = null;
	export default {
		data() {
			return {
				indicatorDots: false,  //是否显示小圆点
				indicatorColor: "#ffffff",
				bottomRight:'bottomRight',
				indicatorActiveColor: "#F40",
				autoplay: true,			//是否自动播放
				interval: 15000,			//自动间隔时间
				duration: 10000,				//滑动动画时长
				circular: true,  		//衔接滑动
				showIndex: 0,
				//第一块看板的参数
				titleObj: {},
				LOGO: "",
				nowTime: "",
				nowDay: "",
				week:"",
				toastList: [], // 消息列表
				toastString: "", //消息字符串
				isToastShow: 'noToast',
				isfirst: true,
				chartFontSize: "",
				dataList: [],
				showdataList: [],
				nowCurrent: 1, //当前显示第几页
				workNum: 0, //生产机台数
				waitNum: 0, //待机机台数
				stopNum: 0, //停机机台数
				BJList: [], //报警信息列表
				kjl: 0, //开机率
				cjList: [],
				tempcjList: [],
				CJobj: {
					name: "",
					code: "",
				},
				cxList: [],
				tempcxList: [],
				CXobj: {
					name: "",
					code: "",
				},
				isShowcj: false,
				isShowcx: false,
				isCXShow: false, //是否显示产线选择模块
				cjName:"",
				NameList:[],
				labelArr: [],
				//结束
				listData:[],
			}
		},
		computed: {
			newLineList(){
				this.cxList.forEach((ele, index)=>{
					ele.label = ele.ADDRESS_NAME;
					ele.value = index;
				});
				return this.cxList;				
			},
		},
		onLoad(option) {
			_self = this;
			
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
				// this.week = "星期" + "日一二三四五六".charAt(time.getDay());
				this.nowTime = getNow(hours) + ':' + getNow(minutes) + ":" + getNow(seconds);
			}, 1000);
		},
		onShow() {
			this.tempcjList = [];
			this.getTableList();
			this.getCJ();
			this.getToast();
			getINFOtimer = setInterval(() => {
				this.getSBdata();
			}, (this.titleObj.FREFTIME * 1000 || 30000));
		},
		onHide() {
			clearInterval(timer);
			clearInterval(getINFOtimer);
		},
		methods: {
			// 切换看板
			changItem(event){
				this.showIndex = event.detail.current;
			},
			//获取看板数据
			getSBdata() {
				this.listData = [];
				uni.request({
					url: this.basePath + '/APP/kanban!devMonitorForZS.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
						dataperm: this.CJobj.code, //车间权限
						addrperm: this.CXobj.code, //区域权限
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						if (res.data.IsSuccess) {
							this.dataList = res.data.Data;
							//计算机台数
							this.workNum = 0;
							this.waitNum = 0;
							this.stopNum = 0;
							this.dataList.forEach((ele, index) => {
								if(index <= 4){
									ele.SY_STATUS == 3 ? this.stopNum++ : ele.SY_STATUS == 2 ? this.workNum++ : this.waitNum++;
									window[`zqtChartObj${index}`] = null;
									this.listData.push(ele);
									this.drawCircle(ele, index);
									this.getDevInfo(ele, index); //获取设备信息
									this.getProductList(ele, index); //获取单台设备生产列表
									this.getZTGL(ele, index); //获取设备状态概览
									this.getDevRecord(ele, index); //获取设备操作记录
								}
							});
							//计算开机率，不用拼接百分号
							this.kjl = Math.floor((this.workNum / this.dataList.length) * 100);
							//设置显示的字段
							this.setTableName();
							let min = (this.nowCurrent - 1) * 25;
							let max = this.nowCurrent * 25;
							this.showdataList = this.dataList.slice(min, max);
							this.drawKJL(this.kjl);
						}
					},
				});
				uni.request({
					url: this.basePath + '/APP/device!getDevOEE.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
						fdate: "",
						dataperm: this.CJobj.code, //车间权限
						addrperm: this.CXobj.code, //区域权限
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						if (res.data.IsSuccess) {
							this.drawZHXL(res.data.Data.OEE_SUM[0].OEE);
							this.drawGL(res.data.Data.OEE_TIMES);
						}
					},
				});
				uni.request({
					url: this.basePath + '/APP/kanban!devAlert.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
						dataperm: this.CJobj.code, //车间权限
						addrperm: this.CXobj.code, //区域权限
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						if (res.data.IsSuccess) {
							this.BJList = res.data.Data;
						}
					},
				});
			},
			//今日综合效率概览
			drawGL(Datalist){
				if(Datalist.length == 0){
					return;
				}
				let xAixdata = [],
					seriesdata = [];
				Datalist.forEach((ele, index) =>{
					xAixdata.push(ele.TIMES_NAME);
					seriesdata.push(ele.OEE);
				});
				const dom = document.querySelector('#zhxlgl');
				if(!zhxlglChart) {
					zhxlglChart = this.$echarts.init(dom);
				}
				const option = {
					grid: {
						x: 40,
						x2: 10,
						y: 15,
						y2:35
					},
					 xAxis: {
					        type: 'category',
					        data: xAixdata,
							axisLabel: {
								color: '#fff',
								interval: 0,
								fontSize: 10,
								rotate: 45
							},
							axisTick: {
							      interval: 0
							    }
					    },
					    yAxis: {
					        type: 'value',
							axisLabel: {
								formatter: '{value}%',
								color: '#fff',
							},
							min: 0,
							max:100,
					    },
					    series: [{
					        data: seriesdata,
					        type: 'line'
					    }]
				};
				
				// 使用刚指定的配置项和数据显示图表。
				zhxlglChart.setOption(option);
			},
			//画综合效率仪表盘
			drawZHXL(data){
				const dom = document.querySelector('#Wzhxl');
				if(!zhxlChart) {
					zhxlChart = this.$echarts.init(dom);
				}
				const option = {
					 series: [{
							radius: "85%", //控制仪表盘大小，默认是75%
					        type: 'gauge',
					        axisLine: {
					            lineStyle: {
					                width: 10,
					                color: [
					                    [0.3, '#67e0e3'],
					                    [0.7, '#37a2da'],
					                    [1, '#fd666d']
					                ]
					            }
					        },
					        pointer: {
					            itemStyle: {
					                color: 'auto'
					            }
					        },
					        axisTick: {
					            distance: -10,
					            length: 8,
					            lineStyle: {
					                color: '#fff',
					                width: 2
					            }
					        },
					        splitLine: {
					            distance: -10,
					            length: 10,
					            lineStyle: {
					                color: '#fff',
					                width: 4
					            }
					        },
					        axisLabel: {
					            color: 'inherit',
					            distance: 20,
					            fontSize: 8
					        },
					        detail: {
					            valueAnimation: false,
								 offsetCenter: [0, '95%'],
					             formatter: '综合效率: {value}%',
					            color: 'inherit',
								fontSize: 12,
					        },
					        data: [{
					            value: data
					        }]
					    }]
				};
				// 使用刚指定的配置项和数据显示图表。
				zhxlChart.setOption(option);
			},
			//画开机率仪表盘
			drawKJL(data) {
				const dom = document.querySelector('#kjl');
				if(!kjlChart) {
					kjlChart = this.$echarts.init(dom);
				}
				const option = {
					 series: [{
						  radius: "85%",
					        type: 'gauge',
					        axisLine: {
					            lineStyle: {
					                width: 10,
					                color: [
					                    [0.3, '#67e0e3'],
					                    [0.7, '#37a2da'],
					                    [1, '#fd666d']
					                ]
					            }
					        },
					        pointer: {
					            itemStyle: {
					                color: 'auto'
					            }
					        },
					        axisTick: {
					            distance: -10,
					            length: 8,
					            lineStyle: {
					                color: '#fff',
					                width: 2
					            }
					        },
					        splitLine: {
					            distance: -10,
					            length: 10,
					            lineStyle: {
					                color: '#fff',
					                width: 4
					            }
					        },
					        axisLabel: {
					            color: 'inherit',
					            distance: 20,
					            fontSize: 8
					        },
					        detail: {
					            valueAnimation: true,
								 offsetCenter: [0, '95%'],
					             formatter: '运行情况: {value}%',
					            color: 'inherit',
								fontSize: 12,
					        },
					        data: [{
					            value: data
					        }]
					    }]
				};
				// 使用刚指定的配置项和数据显示图表。
				kjlChart.setOption(option);
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
			//点击翻页按钮
			changPage(e) {
				this.nowCurrent = e.current;
				let min = (e.current - 1) * 25;
				let max = e.current * 25;
				this.showdataList = this.dataList.slice(min, max);
			},
			//获取车间列表
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
						if (result.data.IsSuccess) {
							result.data.Data.forEach((ele) => {
								this.tempcjList.push({
									value: ele.DEPTNAME
								})
							});
							this.tempcjList.push({value: '所有车间'});
							this.cjList = result.data.Data;
							if(uni.getStorageSync('zsInfo')){
								console.log(uni.getStorageSync('zsInfo'));
								const value = JSON.parse(uni.getStorageSync('zsInfo'));
								console.log(value)
								if (value.CJobj.name) {
									if(value.CXobj.code.indexOf(',') == -1){
										this.cjName = value.CXobj.name;
									}else{
										this.cjName = value.CJobj.name;
									}
									this.CJobj = value.CJobj;
									this.CXobj = value.CXobj;
									this.getSBdata();
								}else{
									this.cjName = result.data.Data[0].DEPTNAME;
									this.CJobj = {
										name: result.data.Data[0].DEPTNAME,
										code: result.data.Data[0].DEPTCODE,
									};
									this.getNewCX(); //获取产线列表
									
								}
							}else{
								this.cjName = result.data.Data[0].DEPTNAME;
								this.CJobj = {
									name: result.data.Data[0].DEPTNAME,
									code: result.data.Data[0].DEPTCODE,
								};
								this.getNewCX(); //获取产线列表
								
							}
							this.getCX(); //获取待选列表
						} else {
							
						}
					}
				})
			},
			//获取所有区域列表
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
							result.data.Data.forEach((ele) => {
								this.tempcjList.push({
									value: ele.ADDRESS_NAME
								})
							});
							this.cxList = result.data.Data;
							this.isShowcj = true;
						} else {
							
						}
					}
				})
			},
			//选择车间
			changecj({
				newVal,
				oldVal,
				index
			}) {
				let setFalse = true;
				this.nowCurrent = 1;
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
						this.getSBdata(); //获取产线列表
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
							this.getSBdata();
							this.isShowcj = true;
						} else {
							
						}
					}
				})
			},
			//选择区域
			changecx({
				newVal,
				oldVal,
				index
			}) {
				//newVal 当前选中的值   index 当前选中的值的id  oldVal 上一次选中的值
				this.cxList.forEach((ele, index) => {
					if (ele.ADDRESS_NAME == newVal) {
						this.CXobj = {
							name: ele.ADDRESS_NAME,
							code: ele.ADDRESS_CODE
						};
					}
				});
				this.getSBdata();
			},
			//显示选择产线组件
			chooseCX(){
				this.isCXShow = true;
			},
			hidepage(){
				this.isCXShow = false;
			},
			SaveCx(){
				let NametempArr = [],
					CodetempArr = [];
				this.newLineList.forEach((ele, index)=>{
					if(ele.checked){
						CodetempArr.push(ele.ADDRESS_CODE);
						NametempArr.push(ele.ADDRESS_NAME);
					}
				});
				this.CXobj = {
					name: NametempArr.join(','),
					code: CodetempArr.join(','),
				};
				this.getSBdata();
				this.isCXShow = false;
			},
			checkboxChange(e){
				var items = this.newLineList,
					values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if(values.includes(item.ADDRESS_CODE)){
						this.$set(item,'checked',true)
					}else{
						this.$set(item,'checked',false)
					}
				}
			},
			getTableList(){
				this.NameList = [];
				uni.request({
					url: this.basePath + '/APP/kanban!getKBField.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
						kbcode: "ab-sbkb", //车间代码
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (result) => {
						if (result.data.IsSuccess) {
							this.NameList = result.data.Data;
						} else {
							
						}
					}
				})
			},
			setTableName(){
				this.labelArr = [];
				this.NameList.forEach((target, i)=>{
					if(i < 5){
						this.labelArr.push({
							labelname: target.FIELD_NAME,
							valuename: target.FIELD_CODE
						});
					}
				});
			},
			drawCircle(ele, index){
				this.listData[index].OEE = (+this.listData[index].OEE).toFixed(2);
				this.listData[index].YIELD_RATE = (+this.listData[index].YIELD_RATE).toFixed(2);
				this.listData[index].PO_RATE = (+this.listData[index].PO_RATE).toFixed(2);
				this.listData[index].TO_RATE = (+this.listData[index].TO_RATE).toFixed(2);
				this.getzqtData(index);
			},
			getzqtData(index){
				uni.request({
					url: this.basePath + '/APP/kanban!getTechData200ForXinlc.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
						devcode: this.listData[index].FDEVCODE
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						if (res.data.IsSuccess) {
							this.drawZQT(res.data.Data, index);
						}
					},
				});
			},
			drawZQT(target, index){
				const dom = document.querySelector(`#zqt${index}`);
				if (!window[`zqtChartObj${index}`]) {
					window[`zqtChartObj${index}`] = this.$echarts.init(dom);
				}
				let series = [];
				let legend = [];
				//处理正式数据
				// for( var ele in target){
				// 	if(ele.indexOf('option') != -1){
				// 		series.push({
				// 			name: target[ele].name,
				// 			type: 'line',
				// 			data: target[ele].data.splice(0,50),
				// 		});
				// 		legend.push(target[ele].name);
				// 	}
					
				// }
				// 使用测试数据
				const data = [["1", 116], ["2", 129], ["3", 135], ["4", 86], ["5", 73], ["6", 85], ["7", 73], ["8", 68], ["9", 92], ["10", 130], ["11", 245], 
								["12", 139], ["13", 115], ["14", 111], ["15", 309], ["16", 206], ["17", 137], ["18", 128], ["19", 85], ["20", 94], ["21", 71], 
								["22", 106], ["23", 84], ["24", 93], ["25", 85], ["26", 73], ["27", 83], ["28", 125], ["29", 107], ["30", 82], ["31", 44], ["32", 72],
								["33", 106], ["34", 107], ["35", 66], ["36", 91], ["37", 92], ["38", 113], ["39", 107], ["40", 131], ["41", 111], ["42", 64], ["43", 69],
								["44", 88], ["45", 77], ["46", 83], ["47", 111], ["48", 57], ["49", 55], ["50", 60]];
				const dateList = data.map(function (item) {
				  return item[0];
				});
				const valueList = data.map(function (item) {
					let aod = Math.random();
					if(aod > 0.5){
						return 60 + Math.random() * 10
					}else{
						return 60 - Math.random() * 5
					}
				});
				const vlist = data.map(function (item) {
					let aod = Math.random();
					if(aod > 0.5){
						return 20 + Math.random() * 10
					}else{
						return 20 - Math.random() * 5
					}
				});
				series.push({
					name: "计划生产周期",
					type: 'line',
					data: valueList,
				});
				series.push({
					name: "实际生产周期",
					type: 'line',
					data: vlist,
				});
				var option = {
				  tooltip: {
				    trigger: 'axis'
				  },
				  legend: {
				    // data: legend,
					data: ["计划生产周期", "实际生产周期"],
					textStyle: {
						color: '#fff',
					}
				  },
				  grid: {
				    left: '1%',
				    right: '1%',
				    bottom: '3%',
				    containLabel: true
				  },
				  xAxis: {
				    type: 'category',
				    boundaryGap: false,
					data: dateList,
					axisLabel: {
						interval: "auto", //默认是auto,设置为0，则全部显示X轴
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
				  series: series
				};
				window[`zqtChartObj${index}`].setOption(option);
			},
			getDevInfo(ele ,index){
				this.listData[index].devInfo = [];
				uni.request({
					url: this.basePath + '/APP/device!getDevice.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
						devcode: ele.FDEVCODE
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						if (res.data.IsSuccess) {
							this.listData[index].devInfo = res.data.Data[0];
							if(this.listData[index].devInfo.FDEVPHOTO){
								let tempObj = JSON.parse(this.listData[index].devInfo.FDEVPHOTO);
								if(tempObj.length > 0){
									this.listData[index].devInfo.videoURL = this.basePath + tempObj[0].path;
								}else{
									this.listData[index].devInfo.videoURL = ""
								}
							}else{
								this.listData[index].devInfo.videoURL = ""
							}
							
						}
					},
				});
			},
			/**
			 * @description 获取设备生产列表
			 */
			getProductList(ele ,index){
				this.listData[index].productList = [];
				uni.request({
					url: this.basePath + '/APP/kanban!devProData.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
						devcode: ele.FDEVCODE
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						if (res.data.IsSuccess) {
							this.listData[index].productList = res.data.Data[0].detail;
							this.listData[index].productList.forEach((ele, index)=>{
								ele.rate = ((ele.FACT_QTY / ele.FJOB_QTY) * 100).toFixed(1);
							});
						}
					},
				});
			},
			/**
			 * @description 获取设备状态概览
			 */
			getZTGL(ele ,index){
				this.listData[index].gldata = [];
				uni.request({
					url: this.basePath + '/APP/kanban!devMonitorStatusSingle.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
						devcode: ele.FDEVCODE,
						day: 1,
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						if (res.data.IsSuccess) {
							const targetArr = res.data.Data[0].stadata[0].devsta.split(' ');
							const reg = /(\d+)\.(\d+)H/g;
							const tempArr = res.data.Data[0].stadata[0].devsta.match(reg);
							targetArr.forEach((ele, index)=>{
								let title = ele.substring(0,2);
								if(title == '生产'){
									this.listData[index].workTime = tempArr[index];
								}else if(title == '停机'){
									this.listData[index].stopTime = tempArr[index];
								}else if(title == '待机'){
									this.listData[index].waitTime = tempArr[index];
								}
							});
							this.listData[index].gldata = res.data.Data[0].stadata[0].stadetail;
						}
					},
				});
			},
			getDevRecord(ele ,index){
				this.listData[index].recordList = {};
				this.listData[index].reasonList = [];
				uni.request({
					url: this.basePath + '/APP/jobReport!getDevstaRecord.action',
					data: {
						zhid: uni.getStorageSync('UserInfo').ZHID,
						devcode: ele.FDEVCODE,
						day: 1,
					},
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						if (res.data.IsSuccess) {
							let newArray = [];
							let reasonName = [],
								reasonNum = {};
							res.data.Data.forEach((ele, index) => {
								let temp = [];
								temp.push(ele.STA_NAME ,ele.START_TIME ,ele.END_TIME ,ele.STATUS_TIME ,ele.FABNORMAL_NAME );
								newArray.push(temp);
								//上面是处理列表数据，下面是统计原因数据
								if(!reasonNum[ele.FABNORMAL_NAME]){
									reasonNum[ele.FABNORMAL_NAME] = {seconds:ele.STATUS_SECS, count:1};
									reasonName.push({name:ele.FABNORMAL_NAME,id:ele.FID});
								}else{
									reasonNum[ele.FABNORMAL_NAME].seconds = reasonNum[ele.FABNORMAL_NAME].seconds + ele.STATUS_SECS;
									reasonNum[ele.FABNORMAL_NAME].count++;
								}
							});
							console.log(reasonName);
							this.recordList = {
								header: ['操作类型','开始时间', '结束时间','持续时间','原因'],
								data: newArray,
								index: false,
								columnWidth: [200, 200, 200,200,200],
								align: ['center','center','center','center','center'],
								rowNum: 10,
								headerBGC: '#1D395F',
								headerHeight: 45,
								oddRowBGC: 'rgba(10, 29, 50, 0.8)',
								evenRowBGC: 'rgba(10, 29, 50, 0.8)',
							};
							reasonName.forEach((ele, i)=>{
								let time = Math.floor(reasonNum[ele.name].seconds / 3600);
								if(i <= 8){
									this.listData[index].reasonList.push({
										 name: ele.name,
										 time: time,
										 id: ele.id,
										 count: reasonNum[ele.name].count
									})
								}
								
							});
							
						}
					},
				});
			},
		}
	}
</script>

<style>
	.full{
		  width: 100%;
		    position: absolute;
			top: 0;
		    bottom: 0;
		    left: 0px;
		    margin: 0;
	}
	.allScrean{
		display: block;
		height: 100%;
	}
	.setheight{
		height: 100%;
	}
	/* 第一块看板样式 */
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
	}
	
	.bottom-Content {
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
	
	.deletepadding {
		padding: 0;
	}
	
	.shapeRed {
		background: linear-gradient(-135deg, transparent 0px, rgba(255, 212, 0, 0.8) 0, #C99A7A);
		/* margin: 0 .5%; */
	}
	
	.shapeGreen {
		background: linear-gradient(-135deg, transparent 0px, rgba(39, 185, 75, 0.75) 0, #116125);
		/* margin: 0 .5%; */
	}
	
	.shapeGray {
		background: linear-gradient(-135deg, transparent 0px, rgba(241, 241, 241, 0.5) 0, #999AA4);
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
		font-size: .16rem;
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
	
	.setHeight {
		height: 18.5%;
		width: 20%!important;
	}
	
	.statu-btn {
		padding: 5px 0px;
		line-height: 1.5;
		font-size: .19rem;
		text-align: center;
		border-radius: 10%;
	}
	
	.wrap-line {
		height: 93%;
		border: 1px solid #255ABE;
	}
	
	.charttitle {
		font-size: .18rem !important;
		color: #FFFFFF;
		overflow: hidden;
	}
	
	.ic-sb {
		width: 24px;
		height: 24px;
		vertical-align: sub;
	}
	
	/* 右侧设备概览样式 */
	.time-text {
		color: #85FAF6;
		font-size: .3rem;
	}
	
	.small-text {
		color: #85FAF6;
		font-size: .25rem;
	}
	
	.rate-content {
		background-color: #001D3A;
		/* border: 1px solid #00468C; */
		height: 24%;
	}
	
	/* 机台详情左侧样式 */
	.allsize {
		width: 100%;
		height: 83%;
	}
	
	.titleText {
		font-size: .25rem;
		color: #FFFFFF;
	}
	
	.info_text {
		font-size: .2rem;
		color: #FFFFFF;
	}
	
	.smallText {
		font-size: .2rem;
		color: #FFFFFF;
	}
	
	.devinfo {
		background-image: linear-gradient(to top left, #155344, #25A28A);
		/* 自右下向左上渐变 */
		border: 1px solid #00468C;
		height: 30%;
		padding: 10px 0px 10px 0px;
	}
	.imgsize {
		width: 100%;
		height: 100%;
	}
	
	.statusBtn {
		background-color: #004A36;
		width: 70%;
		color: #FFFFFF;
		padding: 0 15%;
		border-radius: 10%;
		font-size: .5rem;
	}
	
	.sta_circle {
		height: 13px;
		width: 13px;
		border-radius: 50%;
		background-color: green;
		box-shadow: 0px 0px 5px 3px green;
	}
	
	.list_content {
		background-color: #001D3A;
		margin-top: 2%;
		height: 68.5%;
	}
	
	.produce_title {
		height: 10%;
		background-image: linear-gradient(to right, #125BCD, #5F58FC);
		padding: 0 5%;
		color: #89FAF7;
		font-size: .25rem;
	}
	
	.produce_content {
		height: 90%;
		font-size: .2rem;
		overflow: scroll;
	}
	
	.produce_wrapper {
		border: 1px solid #044369;
	}
	
	.produce_list {
		color: #FFFFFF;
	}
	
	.produce_Btn {
		/* background-color: #004A36; */
		color: #FFFFFF;
		padding: 5% 15%;
		border-radius: 10%;
		font-size: .3rem;
	}
	
	/* 右侧样式区域 */
	.right_top {
		background-color: #001D3A;
		/* border: 1px solid #00468C; */
		height: 30%;
		padding: 10px 10px 10px 10px;
	}
	
	.right_down {
		background-color: #001D3A;
		margin-top: 2%;
		height: 68.5%;
	}
	
	.right_top_height {
		height: 50%;
		color: #89FAF7;
		font-size: .25rem;
	}
	
	.reason_wrap {
		background-color: #044369;
		margin: 1% 0 0 0;
		padding: 3% 3%;
	}
	
	.circle_bg {
		background-color: #F76B6B;
		border-radius: 50%;
		height: 20px;
		width: 20px;
		text-align: center;
		line-height: 20px;
		font-size: .1rem;
		color: #FFFFFF;
	}
	
	
	.time_content {
		background-color: #02A7F0;
		border-radius: .2rem;
		color: #FFFFFF;
		font-size: .2rem;
		text-align: center;
	}
	
	.list_title {
		height: 10%;
		padding: 0 5%;
		color: #89FAF7;
		font-size: .25rem;
	}
	.dvContent{
		width:80%;
		height:100%;
		color: #FFFFFF;
		font-weight: bold;
		font-size: .35rem;
	}
	/* 结束 */
	.produce-content {
		background-color: #001D3A;
		border: 1px solid #00468C;
		height: 20%;
	}
	
	.allrate-content {
		background-color: #001D3A;
		border: 1px solid #00468C;
		height: 30%;
	}
	
	/* .right-border::after{
		 content: "";
		  position: absolute;
		  height: 50%;
		  width: 1px;
		  background: #00468C;
		  right: 0;
		  top: 35%;
	} */
	/* 模拟淘宝实现中间小竖线 */
	.right-border {
		border-right: 1px solid #00468C;
		display: inline-block;
		margin-right: 0px;
		padding: 0px 0px 0px 3px;
	}
	
	.ybp-content {
		height: 75%;
	}
	
	
	@media screen and (max-width: 1300px) {
		.titleDec {
			width: 100px;
			height: 35px;
		}
	
		.ic-sb {
			width: 20px;
			height: 20px;
			vertical-align: sub;
		}
		.circle_bg {
			background-color: #F76B6B;
			border-radius: 50%;
			height: 15px;
			width: 15px;
			text-align: center;
			line-height: 15px;
			font-size: .1rem;
			color: #FFFFFF;
		}
	}
	/* 结束 */
</style>
