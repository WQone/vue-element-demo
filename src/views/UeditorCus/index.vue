<template>
  <div class="HelloWorld">
    <Ueditor :disabled="false" @ueditorText="ueditorText"></Ueditor>
    <div @click="submit">获取html</div>
  </div>
</template>

<script>
import Ueditor from '@/components/ueditor';

export default {
  components: {
    Ueditor,
  },
  created() {},
  data() {
    return {};
  },
  methods: {
    ueditorText(value) {
      this.editor = value;
      console.log(value);
    },
    submit() {
      console.log(this.editor, this.editor.getContent());
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
