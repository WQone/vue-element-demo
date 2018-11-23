<template>
  <div>a:{{form.a}} b:{{form.b}}
    <el-button @click="change('a')"></el-button>
    <el-button @click="change('b')"></el-button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      form: {
      },
      a: 'true',
      b: 'true',
    };
  },
  methods: {
    change(val) {
      this.$set(this.form, val, this.form[val] ? this.form[val] + 1 : 1);
      this[`my${val}`]();
      // this.form[val] = 1;
    },
    mya() {
      console.log('aaaaa');
    },
    myb() {
      console.log('bbbbb');
    },
  },
};
</script>
