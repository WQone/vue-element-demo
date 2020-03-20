<template>
  <div class="find">
    <div class="content" v-if="message.length">
      <div class="btnS">
        <el-button @click="clearSearch" class="clearBtn">重置</el-button>
        <el-button @click="onSearch" class="searchBtn" type="primary">查询</el-button>
      </div>
      <div class="searchContentBox">
        <el-row>
          <div :data-name="item.key" :key="(item.key).toString()" v-for="(item, index) in message">
            <el-col :lg="8" :span="12">
              <div class="searchct">
                <div :class="['searchLabel', item.required ? 'is-required' : '']">{{item.label}}</div>
                <div class="searchInput">
                  <!-- 下拉选择，0 单选 -->
                  <span v-if="item.type === 0">
                    <el-select :filterable="item.filterable" :placeholder="item.placeholder" @change="((val)=>{findSelect(item.key, val, item.type, item.clearKeyIndex)})" @keyup.enter.native="onSearch" class="searchSelect" clearable v-model="selectList[index]">
                      <el-option :key="index" :label="i.label" :placeholder="item.placeholder || '请选择'" :value="i.value" v-for="(i, index) in item.selects"></el-option>
                    </el-select>
                  </span>
                  <!-- 日期多选1-key字符串 或者 5-key数组 -->
                  <span v-if="item.type === 1 || item.type === 5">
                    <el-date-picker :end-placeholder="item.dateType === 'datetimerange' ? '结束日期时间' : '结束日期'" :picker-options="item.pickerOptions" :start-placeholder="item.dateType === 'datetimerange' ? '开始日期时间' : '开始日期'" :type="item.dateType || 'daterange'" :value-format="item.dateType === 'datetimerange' ? 'yyyy-MM-dd HH:mm:ss' : 'yyyy-MM-dd'" @change="((val)=>{findSelect(item.key, val, item.type)})" @keyup.enter.native="onSearch" range-separator="至" unlink-panels v-model="daterangeValue[index]"></el-date-picker>
                  </span>
                  <!-- 输入框2 -->
                  <span v-if="item.type === 2">
                    <el-input :placeholder="item.placeholder || '请输入'" @keyup.enter.native="onSearch" clearable v-model.trim="input[index]">
                      <template slot="append" v-if="item.append">{{item.append}}</template>
                    </el-input>
                  </span>
                  <!-- 日期单选3--dateType类型 -->
                  <span v-if="item.type === 3">
                    <el-date-picker :end-placeholder="item.endPlaceholder" :picker-options="item.pickerOptions" :placeholder="item.placeholder || '请选择'" :start-placeholder="item.startPlaceholder" :type="item.dateType || 'date'" :value-format="item.dateFormat || 'yyyy-MM-dd'" @change="((val)=>{findSelect(item.key, val, item.type)})" @keyup.enter.native="onSearch" clearable range-separator="至" v-model="dateValue[index]"></el-date-picker>
                  </span>
                  <!-- 日期多选4--不联动 -->
                  <span class="picker_two" v-if="item.type === 4">
                    <el-col :span="11">
                      <el-date-picker :placeholder="item.startplaceholder ? item.startplaceholder : '选择开始日期'" :type="item.dateType ? item.dateType : 'date'" :value-format="item.valueFormat ? item.valueFormat : 'yyyy-MM-dd'" @keyup.enter.native="onSearch" clearable v-model.trim="dataDate[item.key[0]]"></el-date-picker>
                    </el-col>
                    <el-col :span="2" class="line">至</el-col>
                    <el-col :span="11">
                      <el-date-picker :placeholder="item.endplaceholder ? item.endplaceholder : '选择结束日期'" :type="item.dateType ? item.dateType : 'date'" :value-format="item.valueFormat ? item.valueFormat : 'yyyy-MM-dd'" @keyup.enter.native="onSearch" clearable v-model.trim="dataDate[item.key[1]]"></el-date-picker>
                    </el-col>
                  </span>
                  <!-- 下拉选择，6多选 -->
                  <span v-if="item.type === 6">
                    <span class="searchselect-more">
                      <el-input :placeholder="item.placeholder || '请选择'" :value="input[index]" class="searchselect-more-input"></el-input>
                      <el-select :class="['searchSelect', 'searchselect-more-select']" :filterable="false" :placeholder="item.placeholder" @change="((val)=>{getMore(val, item.selects, index)})" clearable multiple v-model="selectListMore[index]">
                        <el-option :key="index" :label="i.label" :placeholder="item.placeholder || '请选择'" :value="i.value" v-for="(i, index) in item.selects"></el-option>
                      </el-select>
                    </span>
                  </span>
                </div>
              </div>
            </el-col>
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  created() {},
  activated() {},
  mounted() {},
  props: {
    defaultValue: {
      default() {
        return {};
      },
    },
    message: {
      default() {
        return [];
      },
    },
    defaultAjax: {
      default() {
        return 0;
      },
    },
  },
  watch: {
    defaultAjax: {
      handler(info) {
        this.$nextTick(() => {
          this.defaultSet();
        });
      },
      // immediate: true,
      // deep: true, // 深度监听
    },
  },
  data() {
    return {
      input: [],
      selectList: [], // 搜索值
      selectValue: {},
      daterangeValue: [], // 日期段
      dateValue: [], // 单个日期
      dataDate: {}, //  时间段合并
      selectListMore: [],
    };
  },
  methods: {
    // 查询
    onSearch() {
      this.selectValue = {};
      for (let i = 0; i < this.message.length; i += 1) {
        let a = '';
        if (
          this.input[i] !== '' || (typeof this.selectList[i] !== 'undefined' && this.selectList[i] !== '' && this.selectList[i].length)
        ) {
          // 下拉单选0
          if (this.message[i].type === 0) {
            a = this.selectList[i];
          }
          if (this.message[i].type === 2) {
            a = this.input[i];
          }
        }
        // 下拉多选6
        if (this.message[i].type === 6) {
          a = this.selectListMore[i] ? this.selectListMore[i].toString() : this.selectListMore[i];
        }
        // 日期 - 单个日期
        if (this.message[i].type === 3) {
          if (this.dateValue[i]) {
            a = this.dateValue[i];
          }
        }
        // 日期key不为数组
        if (this.message[i].type === 1) {
          a = this.daterangeValue[i];
        }
        // 日期多选5-当key为数组格式
        if (this.message[i].type === 5 && this.message[i].key) {
          for (let n = 0; n < this.message[i].key.length; n += 1) {
            a = this.daterangeValue[i] ? this.daterangeValue[i][n] : undefined;
            this.selectValue[this.message[i].key[n]] = a;
          }
        } else if (this.message[i].type === 4 && this.message[i].key) {
          for (let n = 0; n < this.message[i].key.length; n += 1) {
            a = this.dataDate[this.message[i].key[n]];
            this.selectValue[this.message[i].key[n]] = a;
          }
        } else {
          this.selectValue[this.message[i].key] = a;
        }
        // 验证必填
        let isTrue = true;
        if (
          this.message[i].type !== 4 && this.message[i].type !== 5 && this.selectValue[this.message[i].key] !== 0 && !this.selectValue[this.message[i].key] && this.message[i].required
        ) {
          isTrue = false;
        }
        if (
          (this.message[i].type === 4 || this.message[i].type === 5) && this.message[i].required
        ) {
          for (let n = 0; n < this.message[i].key.length; n += 1) {
            if (
              !this.selectValue[this.message[i].key[n]] && this.selectValue[this.message[i].key[n]] !== 0
            ) {
              isTrue = false;
            }
          }
        }
        if (!isTrue) {
          this.$message.warning(
            `${this.message[i].label.substr(
              0,
              this.message[i].label.length - 1,
            )}为必选项， 请输入后再进行查询操作！`,
          );
          return;
        }
      }

      this.$emit('data-search', this.selectValue, '查询');
    },
    // 文本框默认值
    defaultSet() {
      for (let i = 0; i < this.message.length; i += 1) {
        const defaults = this.defaultValue[this.message[i].key];
        if (this.message[i].type === 0) {
          this.$set(this.selectList, i, defaults);
        }
        if (this.message[i].type === 6) {
          const ab = !defaults && defaults !== 0 ? defaults : defaults.split(',');
          this.$set(this.selectListMore, i, ab);
          this.getMore(ab, this.message[i].selects, i);
        }
        if (this.message[i].type === 1) {
          this.$set(this.daterangeValue, i, defaults);
        }
        if (this.message[i].type === 2) {
          this.$set(this.input, i, defaults);
        }
        if (this.message[i].type === 3) {
          this.$set(this.dateValue, i, defaults);
        }
        if (this.message[i].type === 4) {
          for (let n = 0; n < this.message[i].key.length; n += 1) {
            this.$set(
              this.dataDate,
              this.message[i].key[n],
              this.defaultValue[this.message[i].key[n]],
            );
          }
        }
        if (this.message[i].type === 5) {
          let arr = [];
          for (let n = 0; n < this.message[i].key.length; n += 1) {
            if (this.defaultValue[this.message[i].key[n]]) {
              arr.push(this.defaultValue[this.message[i].key[n]]);
            } else {
              arr = [];
              break;
            }
          }
          this.$set(this.daterangeValue, i, arr);
        }
      }
    },
    // 重置
    clearSearch() {
      for (let i = 0; i < this.message.length; i += 1) {
        if (this.message[i].type === 0) {
          this.$set(this.selectList, i, null);
        }
        if (this.message[i].type === 6) {
          this.$set(this.input, i, undefined);
          this.$set(this.selectListMore, i, null);
        }
        if (this.message[i].type === 1) {
          this.$set(this.daterangeValue, i, []);
        }
        if (this.message[i].type === 2) {
          this.$set(this.input, i, undefined);
        }
        if (this.message[i].type === 3) {
          this.$set(this.dateValue, i, undefined);
        }
        if (this.message[i].type === 5 && this.message[i].key) {
          this.$set(this.daterangeValue, i, []);
          for (let n = 0; n < this.message[i].key.length; n += 1) {
            this.selectValue[this.message[i].key[n]] = undefined;
          }
        } else if (this.message[i].type === 4 && this.message[i].key) {
          this.$set(this, 'dataDate', {});
          for (let n = 0; n < this.message[i].key.length; n += 1) {
            this.selectValue[this.message[i].key[n]] = undefined;
          }
        } else {
          this.selectValue[this.message[i].key] = undefined;
        }
        this.findSelect(
          this.message[i].key,
          undefined,
          this.message[i].type,
          this.message[i].clearKeyIndex,
        );
      }
      this.$emit('data-search', this.selectValue, '重置');
    },
    getMore(val = [], selects, index) {
      let str = '';
      for (let i = 0; i < selects.length; i += 1) {
        const item = selects[i];
        if (val.indexOf(item.value) > -1) {
          str += `${item.label}、`;
        }
      }
      if (!val.length) this.$set(this.selectListMore, index, undefined);
      this.$set(this.input, index, str);
    },
    // 下拉选择
    findSelect(key, val, type, clearKeyIndex) {
      switch (type) {
        case 0:
          if (clearKeyIndex && clearKeyIndex.length) {
            for (let i = 0; i < clearKeyIndex.length; i += 1) {
              this.$set(this.selectList, clearKeyIndex[i], undefined);
            }
          }
          this.$emit('find-select', key, val);
          break;
        case 3:
          this.$emit('date-select', key, val);
          break;
        case 1:
        case 5:
          this.$emit('daterange-select', key, val);
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.find {
  position: relative;
  z-index: 10;
  /deep/.el-select.searchSelect {
    width: 100%;
  }

  /deep/.el-select.searchSelect .el-input {
    width: 100%;
  }

  /deep/ .el-select.searchSelect .el-input .el-input__inner {
    width: 100%;
    opacity: 1;
  }

  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
  .el-icon-white:before {
    content: '';
  }

  /deep/.el-icon-close:hover {
    cursor: pointer;
    color: #8391a5;
  }
  /deep/ .el-range-editor.el-input__inner {
    width: 100%;
  }
  .picker_two {
    .el-col {
      margin-top: 0;
    }
    .line {
      text-align: center;
      line-height: 36px;
    }
  }
  .btnS {
    margin-top: 10px;
    position: absolute;
    right: 0;
    overflow: hidden;
  }

  .searchBtn {
    float: right;
    margin-left: 0.08rem;
  }
  .clearBtn {
    float: right;
    margin-left: 0.08rem;
  }
  .searchContentBox {
    padding-right: 1.5rem;
  }

  .el-row {
    padding-bottom: 0.1rem;
  }

  .el-col {
    margin-top: 0.1rem;
  }

  .searchct {
    min-width: 265px;
    max-width: 420px;
    position: relative;
    display: flex;
  }

  .searchLabel {
    line-height: 36px;
    box-sizing: border-box;
    font-size: 13px;
    color: #323232;
    &.is-required::before {
      content: '*';
      color: #f56c6c;
      margin-right: 4px;
    }
  }

  .searchInput {
    flex: 1;
    position: relative;
    padding-left: 10px;
    padding-right: 20px;
    box-sizing: border-box;
  }

  input::-ms-input-placeholder {
    font-size: 12px;
    color: rgb(131, 142, 165);
  }

  input::-webkit-input-placeholder {
    font-size: 12px;
    color: rgb(131, 142, 165);
  }

  input::-moz-input-placeholder {
    font-size: 12px;
    color: rgb(131, 142, 165);
  }

  input::placeholder {
    font-size: 12px;
    color: rgb(131, 142, 165);
  }
  &:after {
    content: '.';
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }

  /deep/.searchselect-more {
    width: 100%;
    overflow: hidden;
    position: relative;
    display: block;
    .el-select__tags {
      max-width: 10000px !important;
      // width: 10000px;
    }

    .el-select__tags .el-tag {
      display: none;
    }

    .searchselect-more-input {
      position: absolute;
      top: 0;
      left: 0;
      input {
        text-overflow: ellipsis;
      }
    }

    .searchselect-more-select {
      display: block;
      width: 100%;
      height: 36px;
      overflow: hidden;
    }
    .el-select .el-input .el-input__inner {
      background: rgba(0, 0, 0, 0);
    }
  }
}
</style>
