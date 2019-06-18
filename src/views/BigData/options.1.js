const mapOption = {
  title: {
    text: '青海市',
    left: 'center',
    textStyle: {},
    padding: [30, 10, 10, 10],
  },
  tooltip: {
    trigger: 'item',
  },
  visualMap: {
    show: true,
    min: 0,
    max: 200,
    left: 'left',
    top: 'bottom',
    text: ['高', '低'], // 文本，默认为数值文本
    calculable: true,
    seriesIndex: [1],
    inRange: {
      color: ['#00467F', '#A5CC82'], // 蓝绿
    },
  },
  series: [
    {
      type: 'map',
      mapType: '青海市',
      label: {
        normal: {
          show: true,
          textStyle: {
            color: '#fff',
          },
        },
        emphasis: {
          textStyle: {
            color: '#000',
          },
        },
      },
      roam: true,
      itemStyle: {
        normal: {
          areaColor: 'rgba(58, 95, 158, 1)',
          // borderColor: 'transparent',
          borderColor: 'rgba(147, 235, 248, 1)',
          borderWidth: 1,
        },
        emphasis: {
          areaColor: '#389BB7',
          borderWidth: 0,
        },
      },
      animation: false,
      data: [
        { name: '玉树藏族自治区', value: 177 },
        { name: '玉树藏族自治区', value: 42 },
        { name: '玉树藏族自治区', value: 102 },
        { name: '玉树藏族自治区', value: 81 },
        { name: '内蒙古', value: 47 },
        { name: '辽宁', value: 67 },
        { name: '吉林', value: 82 },
        { name: '黑龙江', value: 66 },
        { name: '上海', value: 24 },
      ],
    },
  ],
};

const setMapOption = () => {
  const ret = {
    ...mapOption,
  };
  return ret;
};

export default {
  setMapOption,
};
