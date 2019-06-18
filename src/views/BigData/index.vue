<template>
  <div class="bigdata">
    <div>{{nowtime}}</div>
    <div class="mapChart" ref="mapChart"></div>
  </div>
</template>

<script>
import convert from '../../utils/convert'; // 引入js公共方法
import echarts from '../../utils/echartsImport'; //  按需引入echarts，降低打包体积
import qinghaiData from '../../utils/qinghai.json';
import options from './options';

export default {
  mounted() {
    setInterval(() => {
      this.nowtime = convert.convertDate(new Date(), 1);
    }, 1000);
    this.mapChart = echarts.init(this.$refs.mapChart); //    地图
    this.getChart();
  },
  props: {},
  data() {
    return {
      nowtime: '',
      mapChart: null,
    };
  },
  methods: {
    getChart() {
      this.mapChart.setOption(
        options.setMapOption([
          { name: '玉树藏族自治州', value: 122 },
          { name: '海东市', value: 102 },
          { name: '海南藏族自治州', value: 82 },
          { name: '黄南藏族自治州', value: 62 },
          { name: '西宁市', value: 58 },
          { name: '果洛藏族自治州', value: 112 },
          { name: '海北藏族自治州', value: 200 },
          { name: '海西蒙古族藏族自治州', value: 50 },
        ]),
      );
    },
  },
};
</script>

<style scoped lang="scss">
.bigdata {
  background: #efefef;
  color: white;
  height: 100%;
  width: 100%;
  .mapChart {
    height: 700px;
  }
}
</style>
