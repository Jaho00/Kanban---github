<template>
  <div id="data-view">
    <dv-full-screen-container>
      <div class="main-header">
        <div class="mh-left row">
			<view class="col row align-items-center align-self-center justify-content-around">
				<image :src="LOGO" mode="aspectFit" style="width: 100px;height: 50px;margin-left: 5%;"></image>
				<text style="margin-left:10%;height:60px;font-size: .3rem;"  v-show="titleObj.FCOMPANY == '' ? false : true">{{ titleObj.FCOMPANY }}</text>
			
			</view>
		</div>
        <div class="mh-middle">{{ titleObj.FTITLE }}</div>
        <div class="mh-right">
          <dv-border-box-2
            style="width: 180px; height: 60px; line-height: 60px; text-align:center;margin-left:200px;font-size: .2rem;"
          >
            综合管理平台
          </dv-border-box-2>
        </div>
      </div>

      <dv-border-box-1 class="main-container">
        <view class="border-box-content">
        	<dv-border-box-3 class="left-chart-container">
				<view class="border-box-content">
					<Left-Chart-1 />
					<Left-Chart-2 />
					<Left-Chart-3 />
				</view>
        	 
        	
        	</dv-border-box-3>
        	
        	<div class="right-main-container">
        	  <div class="rmc-top-container">
        	    <dv-border-box-3 class="rmctc-left-container">
					<view class="border-box-content">
						<Center-Cmp />
					</view>
        	    </dv-border-box-3>
        	
        	    <div class="rmctc-right-container">
        	      <dv-border-box-3 class="rmctc-chart-1">
					<view class="border-box-content">
						 <Right-Chart-1 />
					</view>
        	       
        	
        	      </dv-border-box-3>
        	
        	      <dv-border-box-4 class="rmctc-chart-2" :reverse="true">
					<view class="border-box-content">
						 <Right-Chart-2 />
					</view>
        	       
        	
        	      </dv-border-box-4>
        	    </div>
        	  </div>
        	
        	  <dv-border-box-4 class="rmc-bottom-container">
				<view class="border-box-content">
					<Bottom-Charts />
				</view>
        	    
        	
        	  </dv-border-box-4>
        	</div>
        </view>
      </dv-border-box-1>

    </dv-full-screen-container>
  </div>
</template>

<script>
import LeftChart1 from './datavdemo/LeftChart1'
import LeftChart2 from './datavdemo/LeftChart2'
import LeftChart3 from './datavdemo/LeftChart3'

import CenterCmp from './datavdemo/CenterCmp'

import RightChart1 from './datavdemo/RightChart1'
import RightChart2 from './datavdemo/RightChart2'

import BottomCharts from './datavdemo/BottomCharts'

export default {
  name: 'DataView',
  components: {
    LeftChart1,
    LeftChart2,
    LeftChart3,
    CenterCmp,
    RightChart1,
    RightChart2,
    BottomCharts
  },
  data () {
    return {
		titleObj: {},
		LOGO: "",
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
  },
}
</script>

<style lang="less" scoped>
#data-view {
  width: 100%;
  height: 100%;
  background-color: #030409;
  color: #fff;

  #dv-full-screen-container {
    background-image: url('./datavdemo/img/bg.png');
    background-size: 100% 100%;
    box-shadow: 0 0 3px blue;
    display: flex;
    flex-direction: column;
  }

  .main-header {
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    .mh-left {
      font-size: 20px;
      color: rgb(1,134,187);

      a:visited {
        color: rgb(1,134,187);
      }
    }

    .mh-middle {
      font-size: .4rem;
    }

    .mh-left, .mh-right {
      width: 30%;
	  font-size: .3rem;
    }
  }

  .main-container {
    height: calc(~"100% - 80px");
	.border{
		border: 0px!important;
	}
    .border-box-content {
      padding: 20px;
      box-sizing: border-box;
      display: flex;
    }
  }

  .left-chart-container {
    width: 22%;
    padding: 10px;
    box-sizing: border-box;

    .border-box-content {
      flex-direction: column;
    }
  }

  .right-main-container {
    width: 78%;
    padding-left: 5px;
    box-sizing: border-box;
  }

  .rmc-top-container {
    height: 65%;
    display: flex;
  }

  .rmctc-left-container {
    width: 65%;
  }

  .rmctc-right-container {
    width: 35%;
  }

  .rmc-bottom-container {
    height: 35%;
  }

  .rmctc-chart-1, .rmctc-chart-2 {
    height: 50%;
  }
}
</style>
