<template>
  <div class="my-outbox" ref="outbox">
    <div class="my-inbox" ref="movebox">
      <template v-for="i in 2">
        <template v-if="i !== 1 || (i === 1 && isShow)">
          <div :key="`${index}${i}`" class="my-listbox" v-for="(item,index) in sendVal">
            <div class="my-title">
              {{item.name}}
              <text class="my-utel">{{item.mobile}}</text>
              <text class="my-addr">{{item.place}}</text>
            </div>
            <div class="my-content">{{item.content}}</div>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'marquee-y',
  props: {
    sendVal: {
      type: Array,
      default() {
        return [
          {
            name: '冯先生',
            mobile: '170****8441',
            place: '重庆',
            content:
              '从小跟着奶奶长大，她信了一辈子的佛了，我从以前的出了事都会拜佛到今天的每日一拜，已经是一种信仰了，只要多积德行善，下一世咱还是条好汉。',
          },
          {
            name: '姜女士',
            mobile: '180****2717',
            place: '包头',
            content: '第三世的我是只萌萌的小白兔，果然兔兔那么可爱，千万不能吃兔兔。╮(๑•́ ₃•̀๑)╭',
          },
          {
            name: '曹女士',
            mobile: '171****5347',
            place: '辽阳',
            content:
              '稀里糊涂点进来，还以为跟三生三世十里桃花一个性质的电视剧呢0.0，不过这个真的好准，我小时候和青年时代算的就跟结果说的一模一样。',
          },
          {
            name: '魏先生',
            mobile: '151****3555',
            place: '无锡',
            content:
              '以前总听说因果循环报应不爽，但一直不明白是啥意思，看了我前四世的身份后我终于明白了，真实，简直太真实了。',
          },
        ];
      },
    },
  },
  data() {
    return {
      isShow: true,
    };
  },
  mounted() {
    const moveTarget = this.$refs.movebox;
    const outbox = this.$refs.outbox;
    if (outbox.offsetHeight > moveTarget.offsetHeight / 2) {
      this.isShow = false;
      return;
    }
    let initTop = 0;
    setInterval(() => {
      initTop += 1;
      if (initTop >= moveTarget.offsetHeight / 2) {
        initTop = 0;
      }
      moveTarget.style = `transform: translateY(-${initTop}px)`;
    }, 16);
  },
};
</script>

<style lang="scss" scoped>
.my-outbox {
  color: #fee7b1;
  height: 300px;
  margin: 20px;
  background: #fee7b1;
  overflow: hidden;
  border: 2px solid #c46302;
  .my-inbox {
    margin: 0 45px;
    .my-listbox {
      padding: 20px 0;
      font-size: 18px;
      border-bottom: 1px solid #c7beb1;
      .my-title {
        color: #db7000;
        margin-bottom: 10px;
        clear: both;
        overflow: hidden;
        .my-utel {
          font-size: 16px;
          margin-left: 20px;
        }
        .my-addr {
          font-size: 16px;
          float: right;
        }
      }
      .my-content {
        text-align: justify;
        word-break: break-all;
        font-size: 14px;
        color: #53565d;
      }
    }
  }
}
</style>
