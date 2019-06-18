const geoCoordMap = {
  广东: [114.5435, 22.5439],
  上海: [121.4648, 31.2891],
  新疆: [87.9236, 43.5883],
  甘肃: [103.5901, 36.3043],
  北京: [115.7551, 39.6539],
  江苏: [118.8062, 31.9208],
  广西: [108.479, 23.1152],
  江西: [116.0046, 28.6633],
  安徽: [117.29, 32.0581],
  内蒙古: [111.4124, 40.4901],
  黑龙江: [127.642464, 46.756967],
  天津: [117.4219, 39.4189],
  山西: [112.3352, 37.9413],
  四川: [103.9526, 30.7617],
  西藏: [91.1865, 30.1465],
  云南: [102.9199, 25.4663],
  浙江: [119.5313, 29.8773],
  湖北: [114.3896, 30.6628],
  辽宁: [123.1238, 42.1216],
  山东: [117.1582, 36.8701],
  海南: [110.3893, 19.8516],
  河北: [114.4995, 38.1006],
  福建: [119.4543, 25.9222],
  青海: [101.4038, 36.8207],
  陕西: [109.1162, 34.2004],
  贵州: [106.6992, 26.7682],
  河南: [113.4668, 34.6234],
  重庆: [107.7539, 30.1904],
  宁夏: [106.3586, 38.1775],
  吉林: [125.8154, 44.2584],
  湖南: [113.0823, 28.2568],
  台湾: [121.524871, 25.042184],
  香港: [121.524871, 25.042184],
  澳门: [121.524871, 25.042184],
  南海诸岛: [121.524871, 25.042184],
};

const convertData = (data) => {
  const ret = [];
  for (let i = 0; i < data.length; i += 1) {
    const item = data[i];
    if (item.value) {
      ret.push({
        ...item,
        value: [...geoCoordMap[item.name], item.value],
      });
    }
  }
  return ret;
};

const mapOption = {
  title: {
    show: false,
  },
  tooltip: {
    show: true,
    formatter: (params) => `${params.name}：${params.data.value}%`,
  },
  visualMap: [
    {
      type: 'continuous',
      show: false,
      seriesIndex: 0,
      min: 0,
      inRange: {
        color: ['#D8E1E8', '#b7d6f3', '#40a9ed', '#3598c1', '#215096'],
      },
      textStyle: {
        color: '#000',
      },
    },
    {
      type: 'piecewise',
      // text: ['预警分布'],
      // itemGap: 0,
      show: true,
      splitNumber: 4,
      seriesIndex: 1,
      itemSymbol: 'diamond',
      min: 0,
      inRange: {
        color: ['#B9E6FE', '#F4EC1D', '#FE8E0D', '#FE0908'],
      },
      itemWidth: 50,
      textStyle: {
        color: '#000',
      },
      orient: 'horizontal',
      left: 'center',
      bottom: 10,
    },
  ],
  geo: {
    map: 'china',
    roam: 'move',
    zoom: 1.15,
    top: '40',
    label: {
      normal: {
        show: false,
        textStyle: {
          color: '#333',
        },
      },
      emphasis: {
        show: false,
        textStyle: {
          color: '#333',
        },
      },
    },
    itemStyle: {
      normal: {
        areaColor: '#D8E1E8',
        borderColor: '#fff',
      },
      emphasis: {
        areaColor: '#fff464',
        borderColor: '#fff',
      },
    },
    regions: [
      {
        name: '南海诸岛',
        value: 0,
        label: {
          show: false,
        },
        itemStyle: {
          normal: {
            opacity: 0,
          },
        },
      },
    ],
  },
  series: [
    {
      name: 'mapSer',
      type: 'map',
      roam: false,
      geoIndex: 0,
    },
    {
      type: 'effectScatter',
      coordinateSystem: 'geo',
      // symbolSize: (val) => val[2] / 10,
      symbolSize: 10,
      showEffectOn: 'render',
      rippleEffect: {
        brushType: 'stroke',
      },
      hoverAnimation: true,
      label: {
        normal: {
          formatter: '{b}',
          position: 'left',
          show: true,
          color: '#000',
          fontSize: '10px',
        },
      },
      itemStyle: {
        normal: {
          shadowBlur: 10,
          shadowColor: '#333',
        },
      },
      zlevel: 1,
    },
  ],
};

const getMax = (data) => {
  let ret = 0;
  for (let i = 0; i < data.length; i += 1) {
    const item = data[i];
    if (item.value && item.value > ret) {
      ret = item.value;
    }
  }
  return ret;
};

const setOption = (data) => {
  const series = [];

  for (let i = 0; i < mapOption.series.length; i += 1) {
    const item = mapOption.series[i];

    series.push({
      ...item,
      data: i === 1 ? convertData(data[i]) : data[i],
    });
  }

  const ret = {
    ...mapOption,
    visualMap: mapOption.visualMap.map((item, index) => ({
      ...item,
      max: getMax(data[index]),
    })),
    series,
  };

  return ret;
};

export default {
  setOption,
};
