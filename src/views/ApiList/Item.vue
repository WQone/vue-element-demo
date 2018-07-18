<template>
  <div>
    <p class="cardList_title">{{Info.apiName}} - 详情</p>
    <div class="create-body form-text" :style="formHeight">
      <el-card class="box-card" shadow="never">
        <div slot="header" class="clearfix">
          <i class="el-icon-setting"></i>
          <span>基础信息</span>
        </div>
        <div class="text item">
          <el-form ref="Info" :model="Info" label-width="150px" class="w-text">
            <el-col :span="12" :lg="12">
              <el-form-item label="数据分组：">
                <p>{{Info.groupId}}</p>
              </el-form-item>
            </el-col>
            <el-col :span="12" :pull="5" :lg="12">
              <el-form-item label="API名称：">
                <p>{{Info.apiName}}</p>
              </el-form-item>
            </el-col>
            <el-col :span="12" :lg="12">
              <el-form-item label="接入模式：">
                <p>{{Info.accessPattern}}</p>
              </el-form-item>
            </el-col>
            <el-col :span="12" :pull="5" :lg="12">
              <el-form-item label="接入形式：">
                <p>{{Info.accessMode}}</p>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
      </el-card>
      <el-card class="box-card" shadow="never" style="margin-top:15px;">
        <div slot="header" class="clearfix">
          <i class="el-icon-setting"></i>
          <span>计费方式</span>
        </div>
        <div class="text item">
          <el-form ref="Info" :model="Info" label-width="150px" class="w-text">
            <el-col :span="12">
              <el-form-item label="计费模式：">
                <p>{{Info.accessMode}}</p>
              </el-form-item>
            </el-col>
            <el-col :span="12" :pull="5">
              <el-form-item label="单笔金额（元）：">
                <p>{{Info.accessMode}}</p>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
      </el-card>
      <el-card class="box-card" shadow="never" style="margin-top:15px;">
        <div slot="header" class="clearfix">
          <i class="el-icon-setting"></i>
          <span>请求基础定义</span>
        </div>
        <div class="text item">
          <el-form label-width="150px" class="w-text">
            <el-col :span="12">
              <el-form-item label="协议：">
                <p>{{requestConfig.protocol}}</p>
              </el-form-item>
            </el-col>
            <el-col :span="12" :pull="5">
              <el-form-item label="请求地址：">
                <p>{{requestConfig.address}}</p>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Http Method：">
                <p>{{requestConfig.httpMethod}}</p>
              </el-form-item>
            </el-col>
            <el-col :span="12" :pull="5">
              <el-form-item label="入参请求模式：">
                <p>{{requestConfig.accessMode}}</p>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
      </el-card>
      <el-card class="box-card" shadow="never" style="margin-top:15px;">
        <div slot="header" class="clearfix">
          <i class="el-icon-setting"></i>
          <span>后端服务参数</span>
        </div>
        <div class="text item">
          <el-form ref="Info" :model="Info" label-width="150px">
            <el-table :data="Info.tableData" border style="width: 100%" header-cell-class-name="tb-bg">
              <el-table-column prop="n1" label="修改顺序">
              </el-table-column>
              <el-table-column prop="name" label="参数名">
              </el-table-column>
              <el-table-column prop="location" label="参数位置">
              </el-table-column>
              <el-table-column prop="type" label="类型">
              </el-table-column>
              <el-table-column prop="required" label="必填">
              </el-table-column>
              <el-table-column prop="defaultValue" label="默认值">
              </el-table-column>
              <el-table-column prop="demoValue" label="示例">
              </el-table-column>
              <el-table-column prop="description" label="描述">
              </el-table-column>
            </el-table>
          </el-form>
        </div>
      </el-card>
      <el-card class="box-card" shadow="never" style="margin-top:15px;">
        <div slot="header" class="clearfix">
          <i class="el-icon-setting"></i>
          <span>常量参数</span>
        </div>
        <div class="text item">
          <el-form ref="Info" :model="Info" label-width="150px">
            <el-table :data="Info.tableData" border style="width: 100%" header-cell-class-name="tb-bg">
              <el-table-column prop="n1" label="修改顺序">
              </el-table-column>
              <el-table-column prop="name" label="参数名">
              </el-table-column>
              <el-table-column prop="location" label="参数位置">
              </el-table-column>
              <el-table-column prop="type" label="类型">
              </el-table-column>
              <el-table-column prop="required" label="必填">
              </el-table-column>
              <el-table-column prop="defaultValue" label="默认值">
              </el-table-column>
              <el-table-column prop="demoValue" label="示例">
              </el-table-column>
              <el-table-column prop="description" label="描述">
              </el-table-column>
            </el-table>
          </el-form>
        </div>
      </el-card>
      <el-card class="box-card" shadow="never" style="margin-top:15px;">
        <div slot="header" class="clearfix">
          <i class="el-icon-setting"></i>
          <span>返回结果</span>
        </div>
        <div class="text item">
          <el-form ref="Info" :model="Info" label-width="150px" class="w-text">
            <el-col :span="12">
              <el-form-item label="返回类型：">
                <p>{{Info.accessMode}}</p>
              </el-form-item>
            </el-col>
            <el-col :span="12" :pull="5">
              <el-form-item label="返回结果示例：">
                <p>{{Info.accessMode}}</p>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="失败返回结果示例：">
                <p>{{Info.accessMode}}</p>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
      </el-card>
      <el-card class="box-card" shadow="never" style="margin-top:15px;">
        <div slot="header" class="clearfix">
          <i class="el-icon-setting"></i>
          <span>错误码定义</span>
        </div>
        <div class="text item">
          <el-form ref="Info" :model="Info" label-width="150px">
            <el-table :data="Info.tableData" border style="width: 100%" header-cell-class-name="tb-bg">
              <el-table-column prop="n1" label="修改顺序">
              </el-table-column>
              <el-table-column prop="name" label="参数名">
              </el-table-column>
              <el-table-column prop="location" label="参数位置">
              </el-table-column>
              <el-table-column prop="type" label="类型">
              </el-table-column>
              <el-table-column prop="required" label="必填">
              </el-table-column>
              <el-table-column prop="defaultValue" label="默认值">
              </el-table-column>
              <el-table-column prop="demoValue" label="示例">
              </el-table-column>
              <el-table-column prop="description" label="描述">
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
import baseApi from '../../api/base';
import menu from '../../utils/menu';

export default {
  created() {
    this.getInfo(this.$route.query.id);
    console.log('this.$route.query', this.$route.query);
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
      Info: {},
      requestConfig: {},
    };
  },
  methods: {
    getInfo(id) {
      baseApi.getInfo(id).then((res) => {
        if (res.data.code === '0') {
          const arr = menu.typeArr.filter((item) => item.id === res.data.data.groupId);
          res.data.data.groupId = arr[0].name;
          this.requestConfig = res.data.data.requestConfig;
          this.Info = res.data.data;
        }
        console.log(7, this.Info, res.data.data);
      });
    },
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
.form-text .w-text {
  padding: 20px;
}
.box-card {
  margin-bottom: 40px;
}
</style>

