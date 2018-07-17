<template>
  <div>
    <p class="cardList_title">API名称 - 详情</p>
    <div class="create-body form-text" :style="formHeight">
      <el-card class="box-card" shadow="never">
        <div slot="header" class="clearfix">
          <i class="el-icon-edit"></i>
          <span>基础信息</span>
        </div>
        <div class="text item">
          <el-form ref="form" :model="form" label-width="130px" class="w-text">
            <el-col :span="12">
              <el-form-item label="数据分组：">
                <p>哈哈哈哈</p>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="API名称：">
                <p>企业工商信息API</p>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="接入模式：">
                <p>哈哈哈哈</p>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="接入形式：">
                <p>哈哈哈哈</p>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
      </el-card>
      <el-card class="box-card" shadow="never" style="margin-top:15px;">
        <div slot="header" class="clearfix">
          <i class="el-icon-edit"></i>
          <span>计费方式</span>
        </div>
        <div class="text item">
          <el-form ref="form" :model="form" label-width="130px"  class="w-text">
            <el-col :span="12">
              <el-form-item label="接入模式：">
                <p>哈哈哈哈</p>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="接入形式：">
                <p>哈哈哈哈</p>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
      </el-card>
      <el-card class="box-card" shadow="never" style="margin-top:15px;">
        <div slot="header" class="clearfix">
          <i class="el-icon-edit"></i>
          <span>请求基础定义</span>
        </div>
        <div class="text item">
          <el-form ref="form" :model="form" label-width="130px"  class="w-text">
            <el-col :span="12">
              <el-form-item label="协议：">
                <p>哈哈哈哈</p>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="请求地址：">
                <p>哈哈哈哈</p>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
      </el-card>
      <el-card class="box-card" shadow="never" style="margin-top:15px;">
        <div slot="header" class="clearfix">
          <i class="el-icon-edit"></i>
          <span>后端服务参数</span>
        </div>
        <div class="text item">
          <el-form ref="form" :model="form" label-width="130px">
            <el-table :data="form.tableData" border style="width: 100%" header-cell-class-name="tb-bg">
              <el-table-column prop="n1" label="修改顺序" width="180">
              </el-table-column>
              <el-table-column prop="n2" label="参数名" width="180">
              </el-table-column>
              <el-table-column prop="n3" label="参数位置">
              </el-table-column>
              <el-table-column prop="n4" label="类型">
              </el-table-column>
              <el-table-column prop="n5" label="必填">
              </el-table-column>
              <el-table-column prop="n6" label="默认值">
              </el-table-column>
              <el-table-column prop="n7" label="示例">
              </el-table-column>
              <el-table-column prop="n8" label="描述">
              </el-table-column>
            </el-table>
          </el-form>
        </div>
      </el-card>
      <el-card class="box-card" shadow="never" style="margin-top:15px;">
        <div slot="header" class="clearfix">
          <i class="el-icon-edit"></i>
          <span>常量参数</span>
        </div>
        <div class="text item">
          <el-form ref="form" :model="form" label-width="130px">
            <el-table :data="form.tableData" border style="width: 100%" header-cell-class-name="tb-bg">
              <el-table-column prop="n1" label="修改顺序" width="180">
              </el-table-column>
              <el-table-column prop="n2" label="参数名" width="180">
              </el-table-column>
              <el-table-column prop="n3" label="参数位置">
              </el-table-column>
              <el-table-column prop="n4" label="类型">
              </el-table-column>
              <el-table-column prop="n5" label="必填">
              </el-table-column>
              <el-table-column prop="n6" label="默认值">
              </el-table-column>
              <el-table-column prop="n7" label="示例">
              </el-table-column>
              <el-table-column prop="n8" label="描述">
              </el-table-column>
            </el-table>
          </el-form>
        </div>
      </el-card>
      <el-card class="box-card" shadow="never" style="margin-top:15px;">
        <div slot="header" class="clearfix">
          <i class="el-icon-edit"></i>
          <span>返回结果</span>
        </div>
        <div class="text item">
          <el-form ref="form" :model="form" label-width="130px"  class="w-text">
            <el-col :span="12">
              <el-form-item label="协议：">
                <p>哈哈哈哈</p>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="请求地址：">
                <p>哈哈哈哈</p>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
      </el-card>
      <el-card class="box-card" shadow="never" style="margin-top:15px;">
        <div slot="header" class="clearfix">
          <i class="el-icon-edit"></i>
          <span>错误码定义</span>
        </div>
        <div class="text item">
          <el-form ref="form" :model="form" label-width="130px">
            <el-table :data="form.tableData" border style="width: 100%" header-cell-class-name="tb-bg">
              <el-table-column prop="n1" label="修改顺序" width="180">
              </el-table-column>
              <el-table-column prop="n2" label="参数名" width="180">
              </el-table-column>
              <el-table-column prop="n3" label="参数位置">
              </el-table-column>
              <el-table-column prop="n4" label="类型">
              </el-table-column>
              <el-table-column prop="n5" label="必填">
              </el-table-column>
              <el-table-column prop="n6" label="默认值">
              </el-table-column>
              <el-table-column prop="n7" label="示例">
              </el-table-column>
              <el-table-column prop="n8" label="描述">
              </el-table-column>
            </el-table>
          </el-form>
        </div>
      </el-card>
    </div>
    <div class="btn">
      <el-button plain @click="goBack">返回列表</el-button>
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
  },
  data() {
    return {
      formHeight: `height: ${window.tableCustom.tableHeight(['. el-steps--simple', '.btn', 190])}px;`, // 表单高度
      form: {},
    };
  },
  methods: {
    // 返回
    goBack() {
      this.$router.push({ path: '/ApiList' });
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

<style scoped>
.form-text .el-form-item {
  margin-bottom: 0px;
}
.form-text .w-text{
  padding: 20px;
}
</style>

