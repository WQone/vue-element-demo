<template>
  <div class="CusMarquee">
    <div :style="`transform: translateY(${-transformY}px);transition: ${duration}s ease-in 0s`" class="marquee-content">
      <div :key="j" class="marquee-list-ul" v-for="j in 2">
        <p :key="item" class="marquee-list-li" v-for="item in listLength">{{item}}分的</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    setInterval(() => {
      if (this.listLength * 21 <= this.transformY) {
        this.duration = 0;
        this.transformY = 0;
        this.activeIndex = 0;
      } else {
        this.duration = this.defaultOption.duration;
        this.transformY += this.defaultOption.singleHeight;
        this.activeIndex += 1;
      }
    }, 1000);
  },
  props: {
    defaultOption: {
      type: [Object],
      default() {
        return {
          listLength: 10, // 数据list
          singleHeight: 21, // 每次向上距离px
          duration: 0.5, // 动画秒数
        };
      },
    },
  },
  data() {
    return {
      listLength: this.defaultOption.listLength,
      transformY: 0,
      duration: this.defaultOption.duration,
      activeIndex: 0,
    };
  },
  methods: {},
};
</script>
<style scoped lang="scss">
.CusMarquee {
  height: 200px;
  width: 500px;
  margin: auto;
  overflow: hidden;
  background: green;
  .marquee-content {
    .marquee-list-ul {
      overflow: hidden;
      .marquee-list-li {
      }
    }
  }
}
</style>
