<template>
  <div>
    <iframe :src="`data:application/pdf;base64,${base}`" width="100%" height="500px">
    </iframe>
    <div id="baseId" ref="baseId"></div>
    <el-button @click="isShowDoc">外网打开doc</el-button>
    <el-dialog title="文档" :visible.sync="dialogVisible" width="70%">
      <div :style="heightStyle">
        <iframe :src="`http://www.xdocin.com/xdoc?_func=to&amp;_format=html&amp;_cache=1&amp;_xdoc=${docUrl}`" width="100%" height="100%" v-if="isDoc">
        </iframe>
        <iframe :src="pdfUrl" width="100%" height="100%" v-else>
        </iframe>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-button @click="isShowPdf">打开pdf</el-button>
  </div>
</template>

<script>
import 'viewerjs/dist/viewer.min.css';
import Viewer from 'viewerjs/dist/viewer.esm';
import PDFJS from 'pdfjs-dist';
import base from './base';

export default {
  data() {
    return {
      base,
      isDoc: false,
      isPdf: false,
      pdfUrl: 'https://testmv.xesimg.com/ExpCourse/image/2018/10/09/1539071754579183075997.pdf',
      docUrl: 'http://www.xdocin.com/demo/demo.docx',
      dialogVisible: false,
      $viewer: '',
    };
  },
  mounted() {
  },
  computed: {
    heightStyle() {
      return `height: ${window.innerHeight - 250}px;`;
    },
  },
  methods: {
    async isShowPdf() {
      const baseId = this.$refs.baseId;
      const mybase64 = atob(base);
      const CMAP_URL = 'https://unpkg.com/pdfjs-dist@2.0.489/cmaps/';
      const pdf = await PDFJS.getDocument({
        data: mybase64,
        cMapUrl: CMAP_URL,
        cMapPacked: true,
      }); // 返回一个pdf对象
      const pages = pdf.numPages; // 声明一个pages变量等于当前pdf文件的页数
      console.log(pdf, pages);
      for (let i = 1; i <= pages; i += 1) { // 循环页数
        const canvas = document.createElement('canvas');
        const page = await pdf.getPage(i); // 调用getPage方法传入当前循环的页数,返回一个page对象
        const scale = 1;// 缩放倍数，1表示原始大小
        const viewport = page.getViewport(scale);
        const context = canvas.getContext('2d'); // 创建绘制canvas的对象
        canvas.height = viewport.height; // 定义canvas高和宽
        canvas.width = viewport.width;
        const renderContext = {
          canvasContext: context,
          viewport,
        };
        await page.render(renderContext);

        canvas.className = 'canvas'; // 给canvas节点定义一个class名,这里我取名为canvas
        baseId.appendChild(canvas); // 插入到pdfList节点的最后
      }
      // this.dialogVisible = true;
      // this.isDoc = false;
      // this.$refs.pdfView.href = this.pdfUrl;
      // this.$viewer = new Viewer(document.getElementById('sucaihuo'), {
      //   url: 'data-original'
      // });
    },
    isShowDoc() {
      this.dialogVisible = true;
      this.isDoc = true;
    },
  },
};
</script>

<style>
.el-dialog {
  margin-top: 10vh !important;
}
.el-dialog__body {
  padding: 0px 20px;
}
</style>
