<template>
  <div>
    <!--editor的div为富文本的承载容器-->
    <div :id="id"></div>
    <input accept="image/*" id="fileInput" ref="fileInput" style="display: none" type="file" />
  </div>
</template>

<script>
/* eslint-disable */
import '../../public/ueditor/ueditor.config.js';
import '../../public/ueditor/ueditor.all.js';
import '../../public/ueditor/lang/zh-cn/zh-cn.js';
export default {
  data() {
    return {
      id: Math.ceil(Math.random() * 100000) + 'editor',
      editor: null,
      dataURL: '',
    };
  },
  props: {
    disabled: {
      default: false,
    },
  },
  methods: {},
  mounted() {
    this.editor = UE.getEditor(this.id, {
      UEDITOR_HOME_URL: '/ueditor/',
      initialFrameWidth: '100%',
      initialFrameHeight: 500,
      autoClearinitialContent: true,
      focus: false,
      zIndex: 900,
      autoHeightEnabled: false, // 是否自动长高
      readonly: this.disabled, // 编辑区域是否是只读的
      enableAutoSave: false, // 去除自动保存
      indentValue: '28px',
      toolbars: [
        [
          'fullscreen',
          'source',
          '|',
          'undo',
          'redo',
          '|',
          'bold',
          'italic',
          'underline',
          'fontborder',
          'strikethrough',
          'superscript',
          'subscript',
          'removeformat',
          'formatmatch',
          '|',
          'forecolor',
          'backcolor',
          'insertorderedlist',
          'insertunorderedlist',
          'selectall',
          'cleardoc',
          '|',
          'rowspacingtop',
          'rowspacingbottom',
          'lineheight',
          '|',
          'customstyle',
          'paragraph',
          'fontfamily',
          'fontsize',
          '|',
          'indent',
          '|',
          'justifyleft',
          'justifycenter',
          'justifyright',
          'justifyjustify',
          '|',
          'touppercase',
          'tolowercase',
          '|',
          'link',
          'unlink',
          '|',
          'simpleupload',
          'insertimage',
          '|',
          'horizontal',
          'spechars',
          'wordimage',
          '|',
          'inserttable',
          'deletetable',
          'insertparagraphbeforetable',
          'insertrow',
          'deleterow',
          'insertcol',
          'deletecol',
          'mergecells',
          'mergeright',
          'mergedown',
          'splittocells',
          'splittorows',
          'splittocols',
          '|',
          'print',
          'preview',
          'custombtn',
        ],
      ],
    });
    this.editor.commands['custombtn'] = {
      execCommand: () => {
        const input = document.getElementById('fileInput');
        input.value = '';
        input.click();
        input.onchange = (e) => {
          const reader = new FileReader(); //实例化文件读取对象
          reader.readAsDataURL(e.target.files[0]); //将文件读取为 DataURL,也就是base64编码
          reader.onload = (ev) => {
            //文件读取成功完成时触发
            const dataURL = ev.target.result; //获得文件读取成功后的DataURL,也就是base64编码
            this.editor.execCommand('insertHtml', `<img src='${dataURL}' />`);
            return true;
          };
        };
      },
      queryCommandState: function() {},
    };
    this.$emit('ueditorText', this.editor);
  },
  destroyed() {},
};
</script>
<style lang="scss">
@import '../../public/ueditor/themes/default/css/ueditor.css';
</style>