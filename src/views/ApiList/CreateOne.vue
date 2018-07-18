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
          <el-form ref="form" :model="form" label-width="130px" :rules="rules">
            <el-form-item label="数据分组">
              <el-select v-model="form.groupId" placeholder="请选择数据分组">
                <el-option :label="item.name" :value="item.id" v-for="item in typeArr" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="API名称">
              <el-input v-model="form.apiName" placeholder="请输入API名称"></el-input>
            </el-form-item>
            <!-- <el-form-item label="调用方法">
              <el-select v-model="form.a3" placeholder="请选择接入类型">
                <el-option value="AppKey&Appsecret"></el-option>
                <el-option value="AppCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="AppKey" v-if="form.a3==='AppKey&Appsecret'">
              <el-input v-model="form.a31" placeholder="请输入AppKey"></el-input>
            </el-form-item>
            <el-form-item label="AppSecret" v-if="form.a3==='AppKey&Appsecret'">
              <el-input v-model="form.a32" placeholder="请输入AppSecret"></el-input>
            </el-form-item>
            <el-form-item label="AppCode" v-else>
              <el-input v-model="form.a4" placeholder="请输入AppCode"></el-input>
            </el-form-item> -->
             <el-form-item label="接入模式">
              <el-radio-group v-model="form.accessPattern">
                <el-radio label="实时接入"></el-radio>
                <el-radio label="离线接入"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="接入形式">
              <el-input v-model="form.accessMode"></el-input>
            </el-form-item>
            <el-form-item label="接入类型">
              <el-input v-model="form.accessType"></el-input>
            </el-form-item>
            <el-form-item label="接口类型">
              <el-select v-model="form.a5" placeholder="请选择接口类型">
                <el-option value="restful API"></el-option>
                <el-option value="webservice"></el-option>
                <el-option value="ESB"></el-option>
                <el-option value="socket"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="描述" prop="description">
              <el-input type="textarea" v-model="form.description" :rows='4' placeholder="必填，不超过2000字符"></el-input>
            </el-form-item>
            <el-form-item label="厂商名称">
              <el-input v-model="form.factoryName" placeholder="请输入厂商名称"></el-input>
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
              <el-select v-model="form.billMode" placeholder="请选择计费模式">
                <el-option value="逐笔"></el-option>
                <el-option value="包时段"></el-option>
                <el-option value="包量"></el-option>
                <el-option value="参数模型"></el-option>
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
import menu from '../../utils/menu';

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
    // 永远return
    const returnTrue = (rule, value, callback) => callback();
    return {
      typeArr: menu.typeArr,
      formHeight: `height: ${window.tableCustom.tableHeight(['. el-steps--simple', '.btn', 200])}px;`, // 表单高度
      form: {
        // a3: 'AppKey&Appsecret',
        // a5: 'restful API',
      },
      rules: {
        description: [
          { required: true, validator: returnTrue, message: '请输入描述', trigger: 'blur' },
        ],
      },
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
        this.formHeight = `height: ${window.tableCustom.tableHeight(['. el-steps--simple', '.btn', 200])}px;`;
      };
      setTimeout(tableHeightFun, 0);
    },
  },
};
</script>
