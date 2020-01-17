<template>
  <div class="my-outbox">
    <div class="my-inbox" ref="box">
      <template v-for="i in 2">
        <div :key="`${index}${i}`" class="my-list" v-for="(item,index) in sendVal">
          {{item.place}}
          <span class="my-uname">{{item.name}}</span>刚刚购买了产品
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'marquee-x',
  props: {
    sendVal: {
      type: Array,
      default() {
        return [
          {
            place: '来自烟台市的',
            name: '许先生',
          },
          {
            place: '来自东莞市的',
            name: '曹先生',
          },
          {
            place: '来自郑州市的',
            name: '邹女士',
          },
          {
            place: '来自海口市的',
            name: '戚先生',
          },
          {
            place: '来自南京市的',
            name: '陈先生',
          },
          {
            place: '来自金华市的',
            name: '吴先生',
          },
          {
            place: '来自泉州市的',
            name: '卫先生',
          },
          {
            place: '来自哈尔滨市的',
            name: '钱先生',
          },
          {
            place: '来自成都市的',
            name: '尤先生',
          },
          {
            place: '来自惠州市的',
            name: '张先生',
          },
          {
            place: '来自宁波市的',
            name: '喻女士',
          },
        ];
      },
    },
  },
  data() {
    return {};
  },
  mounted() {
    const that = this;
    const target = this.$refs.box;
    let initLeft = 0;
    setInterval(() => {
      initLeft += 1;
      if (initLeft >= target.offsetWidth / 2) {
        initLeft = 0;
      }
      target.style = `transform: translateX(-${initLeft}px)`;
    }, 16);
  },
};
</script>

<style lang="scss" scoped>
.my-outbox {
  color: #d7bc8d;
  overflow: hidden;
  height: 35px;
  background: #422b02;
  position: relative;
  .my-inbox {
    white-space: nowrap;
    position: absolute;
    font-size: 0;
    .my-list {
      margin-right: 25px;
      display: inline-block;
      font-size: 13px;
      height: 35px;
      line-height: 35px;
      .my-uname {
        color: #ff8900;
      }
    }
  }
}
</style>
