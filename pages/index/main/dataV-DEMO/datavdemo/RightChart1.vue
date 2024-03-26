<template>
  <div class="right-chart-1">
    <div class="rc1-header">当天生产情况</div>

    <div class="rc1-chart-container">
      <div class="left">
        <div class="number">123</div>
        <div>工单总数</div>
      </div>

      <dv-capsule-chart class="right" :config="config" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'RightChart1',
  data () {
    return {
      config: {
        data: [
          {
            name: '工单总数',
            value: 123
          },
          {
            name: '已完工工单',
            value: 66
          },
          {
            name: '未完成工单',
            value: 72
          },
          {
            name: '不良数',
            value: 25
          },
          {
            name: '延期生产数',
            value: 99
          }
        ],
        unit: '件'
      }
    }
  }
}
</script>

<style lang="less">
.right-chart-1 {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .rc1-header {
    font-size: .2rem;
    font-weight: bold;
    height: 30px;
    line-height: 30px;
  }

  .rc1-chart-container {
    flex: 1;
    display: flex;
  }

  .left {
    width: 30%;
    font-size: .18rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .number {
      font-size: .4rem;
      color: #096dd9;
      font-weight: bold;
      margin-bottom: 30px;
    }
  }

  .right {
    flex: 1;
    padding-bottom: 20px;
    padding-right: 20px;
    box-sizing: border-box;
  }
}
</style>
