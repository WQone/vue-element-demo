<template>
  <div>
    <el-table :border="border" :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column :key="index" :label="column.label" :min-width="column.width" :prop="column.prop" :show-overflow-tooltip="column.tooltip" v-for="(column, index) in columns" >
        <template slot-scope="scope">
          <MyRender :render="column.render" :row="scope.row" v-if="column.render"></MyRender>
          <slot :column="column" :index="scope.$index" :name="column.slot" :row="scope.row" v-else-if="column.slot"></slot>
          <span v-else>{{scope.row[column.prop]}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="paging">
      <el-pagination :current-page="page" :layout="lessType?'total, prev, pager, next' : 'total, sizes, prev, pager, next, jumper'" :page-size="size" :page-sizes="[10, 20, 40, 60]" :style="lessType?'':'float:right'" :total="total" @current-change="pageChange" @size-change="sizeChange"></el-pagination>
    </div>
  </div>
</template>

<script>
import MyRender from './MyRender';

export default {
  components: {
    MyRender,
  },
  mounted() {
  },
  computed: {},
  data() {
    return {
    };
  },
  props: {
    border: {
      type: [Boolean],
      default() {
        return false;
      },
    },
    接口数据
    tableData: {
      type: [Array],
      default() {
        return [];
      },
    },
    // 表格
    columns: {
      type: [Array],
      default() {
        return [];
      },
    },
    lessType: {
      type: Boolean,
      default: false,
    },
    page: {
      type: Number,
      default: 10,
    },
    size: {
      type: Number,
      default: 10,
    },
    total: {
      type: Number,
      default: 0,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    // 条目数切换
    sizeChange(size) {
      this.$emit('size-change', 1, size);
    },
    // 页码切换
    pageChange(val) {
      this.$emit('update:page', val);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
