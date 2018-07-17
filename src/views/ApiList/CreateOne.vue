<template>
  <div>
    <el-steps :active="0" simple finish-status="success">
      <el-step title="基本信息"></el-step>
      <el-step title="定义API请求"></el-step>
      <el-step title="定义API后端服务"></el-step>
      <el-step title="定义返回结果"></el-step>
    </el-steps>
    <div class="create-body" :style="formHeight">
      <el-card class="box-card" shadow="never">
        <div slot="header" class="clearfix">
          <i class="el-icon-edit"></i>
          <span>名称及描述</span>
        </div>
        <div class="text item card-body">
          <el-form ref="form" :model="form" label-width="130px">
            <el-form-item label="数据分组">
              <el-select v-model="form.a1" placeholder="请选择数据分组">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="API名称">
              <el-input v-model="form.a2"></el-input>
            </el-form-item>
            <el-form-item label="接入模式">
              <el-radio-group v-model="form.a3">
                <el-radio label="实时接入"></el-radio>
                <el-radio label="离线接入"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="接入形式">
              <el-select v-model="form.a4" placeholder="请选择接入形式">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="接入类型">
              <el-select v-model="form.a5" placeholder="请选择接入类型">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="描述">
              <el-input type="textarea" v-model="form.a6"></el-input>
            </el-form-item>
            <el-form-item label="厂商名称">
              <el-input v-model="form.d7"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
      <el-card class="box-card" shadow="never" style="margin-top:15px;">
        <div slot="header" class="clearfix">
          <i class="el-icon-edit"></i>
          <span>计费方式</span>
        </div>
        <div class="text item card-body">
          <el-form ref="form" :model="form" label-width="130px">
            <el-form-item label="计费模式">
              <el-select v-model="form.a8" placeholder="请选择数据分组">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="单笔金额">
              <el-input v-model="form.a9"></el-input>
              <p>金额根据计费模式自动切换</p>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
    <div class="btn">
      <el-button type="primary" @click="toNext">下一步</el-button>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.tableHeightRun();
    window.onresize = () => {
      this.tableHeightRun();
    };
  },
  mounted() {
    this.getLocal();
  },
  data() {
    return {
      formHeight: `height: ${window.tableCustom.tableHeight(['. el-steps--simple', '.btn', 190])}px;`, // 表单高度
      form: {},
    };
  },
  methods: {
    // 获取本地存储数据
    getLocal() {
      const base = window.sessionStorage.getItem('form1');
      if (base && base !== '{}') {
        this.form = this.convert.getJSON(base);
        console.log(787, this.form);
      }
    },
    // 下一步
    toNext() {
      window.sessionStorage.setItem('form1', JSON.stringify(this.form));
      this.$router.push({ path: '/CreateTwo' });
    },
    //  计算表格高度
    tableHeightRun() {
      const tableHeightFun = () => {
        this.formHeight = `height: ${window.tableCustom.tableHeight(['. el-steps--simple', '.btn', 190])}px;`;
      };
      setTimeout(tableHeightFun, 0);
    },
  },
};
</script>
