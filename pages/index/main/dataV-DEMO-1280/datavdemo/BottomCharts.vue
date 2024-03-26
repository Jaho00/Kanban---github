<template>
  <div class="bottom-charts">
    <div class="bc-chart-item">
      <div class="bcci-header">材料混合</div>
      <dv-active-ring-chart :config="config1" />
      <Label-Tag :config="labelConfig" />
    </div>
    <dv-decoration-2 class="decoration-1" :reverse="true" style="width:5px;" />

    <div class="bc-chart-item">
      <div class="bcci-header">干燥</div>
      <dv-active-ring-chart :config="config2" />
      <Label-Tag :config="labelConfig" />
    </div>

    <dv-decoration-2 class="decoration-2" :reverse="true" style="width:5px;" />

    <div class="bc-chart-item">
      <div class="bcci-header">自动分选</div>
      <dv-active-ring-chart :config="config3" />
      <Label-Tag :config="labelConfig" />
    </div>

    <dv-decoration-2 class="decoration-3" :reverse="true" style="width:5px;" />

    <div class="bc-chart-item">
      <div class="bcci-header">包装</div>
      <dv-active-ring-chart :config="config4" />
      <Label-Tag :config="labelConfig" />
    </div>

  </div>
</template>

<script>
import LabelTag from './LabelTag'

export default {
  name: 'BottomCharts',
  components: {
    LabelTag
  },
  data () {
    return {
      config1: {
        data: [
          {
            name: '综合效率',
            value: 356
          },
          {
            name: '良品率',
            value: 215
          },
          {
            name: '性能指数',
            value: 90
          },
          {
            name: '可用率',
            value: 317
          }
        ],
        color: ['#00baff', '#3de7c9', '#fff', '#ffc530', '#469f4b'],
        radius: '80%',
        activeRadius: '80%',
		digitalFlopStyle: {
		  fontSize: 13,
		  fill: '#fff'
		}
      },

      config2: {
        data: [
          {
            name: '综合效率',
            value: 615
          },
          {
            name: '良品率',
            value: 322
          },
          {
            name: '性能指数',
            value: 198
          },
          {
            name: '可用率',
            value: 80
          }
        ],
        color: ['#00baff', '#3de7c9', '#fff', '#ffc530', '#469f4b'],
        radius: '80%',
        activeRadius: '80%',
		digitalFlopStyle: {
		  fontSize: 13,
		  fill: '#fff'
		}
      },

      config3: {
        data: [
          {
            name: '综合效率',
            value: 452
          },
          {
            name: '良品率',
            value: 512
          },
          {
            name: '性能指数',
            value: 333
          },
          {
            name: '可用率',
            value: 255
          }
        ],
        color: ['#00baff', '#3de7c9', '#fff', '#ffc530', '#469f4b'],
        radius: '80%',
        activeRadius: '80%',
        digitalFlopStyle: {
          fontSize: 13,
		  fill: '#fff'
		}
      },

      config4: {
        data: [
          {
            name: '综合效率',
            value: 156
          },
          {
            name: '良品率',
            value: 415
          },
          {
            name: '性能指数',
            value: 90
          },
          {
            name: '可用率',
            value: 210
          }
        ],
        color: ['#00baff', '#3de7c9', '#fff', '#ffc530', '#469f4b'],
        radius: '80%',
        activeRadius: '80%',
        digitalFlopStyle: {
          fontSize: 13,
		  fill: '#fff'
		}
      },

      labelConfig: {
        data: ['综合效率', '良品率', '性能指数', '可用率']
      }
    }
  }
}
</script>

<style lang="less">
.bottom-charts {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;

  .bc-chart-item {
    width: 25%;
    height: 100%;
    padding-top: 20px;
    box-sizing: border-box;
  }

  .bcci-header {
    height: 30px;
    text-align: center;
    line-height: 30px;
    font-size: .2rem;
  }

  .dv-active-ring-chart {
    height: calc(~"100% - 20px");
  }

  .label-tag {
    height: 30px;
  }

  .active-ring-name {
    font-size: 18px !important;
  }

  .decoration-1, .decoration-2, .decoration-3 {
    display: absolute;
    left: 0%;
  }
}
</style>
