<template>
  <div class="paging">
    <el-pagination background :style="lessType?'':'float:right'" @size-change="sizeChange" @current-change="pageChange" :current-page="page" :page-sizes="[10, 20, 40, 60]" :page-size="size" :layout="lessType?'total, prev, pager, next' : 'total, sizes, prev, pager, next, jumper'" :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  methods: {
    // 条目数切换
    sizeChange(size) {
      this.$emit('size-change', 1, size);
    },
    // 页码切换
    pageChange(val) {
      this.$emit('page-change', val);
    },
  },
  props: {
    // 页面类型 -- 为true时不包含条目数切换和页码跳转
    lessType: {
      type: Boolean,
      default: false,
    },
    page: {
      type: Number,
      default: 1,
    },
    size: {
      type: Number,
      default: 10,
    },
    total: {
      type: Number,
      default: 10,
    },
    totalPages: {
      type: Number,
      default: 0,
    },
  },
};
</script>
