<template>
  <div class="left-chart-1">
    <div class="lc1-header">销售订单</div>
    <div class="lc1-details">订单总数<span>167</span></div>
    <dv-capsule-chart class="lc1-chart" :config="config" />
    <dv-decoration-2 style="height:10px;" />
  </div>
</template>

<script>
export default {
  name: 'LeftChart1',
  data () {
    return {
      config: {
        data: [
          {
            name: '订单总数',
            value: 167
          },
          {
            name: '已完成订单数',
            value: 67
          },
          {
            name: '大于100万的订单数',
            value: 123
          },
          {
            name: '老客户订单数',
            value: 55
          },
          {
            name: '其他',
            value: 98
          }
        ],
        colors: ['#00baff', '#3de7c9', '#fff', '#ffc530', '#469f4b'],
        unit: '单'
      }
    }
  }
}
</script>

<style lang="less">
.left-chart-1 {
  width: 100%;
  height: 37%;
  display: flex;
  flex-grow: 0;
  flex-direction: column;

  .lc1-header {
    text-align: center;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: .35rem;
    margin-bottom: 20px;
  }

  .lc1-details {
    height: 50px;
    font-size: .2rem;
    display: flex;
    align-items: center;
    text-indent: 20px;

    span {
      color: #096dd9;
      font-weight: bold;
      font-size: .4rem;
      margin-left: 20px;
    }
  }

  .lc1-chart {
    flex: 1;
  }
}
</style>
