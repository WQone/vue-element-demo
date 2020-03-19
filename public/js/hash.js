/* eslint-disable */
self.importScripts('/spark-md5.min.js');

self.onmessage = (e) => {
  const blobSlice = // eslint-disable-line
        File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
  const { file } = e.data;
  const chunkSize = 2 * 1024 * 1024; // 切片的大小
  const chunks = Math.ceil(file.size / chunkSize);
  let currentChunk = 0;
  const fileReader = new FileReader();
  const spark = new SparkMD5.ArrayBuffer();
  const loadNext = () => {
    const start = currentChunk * chunkSize;
    const end = start + chunkSize >= file.size ? file.size : start + chunkSize;
    fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
  };
  fileReader.onload = (e) => {
    spark.append(e.target.result);
    currentChunk += 1;
    if (currentChunk < chunks) {
      loadNext();
    } else {
      const result = spark.end();
      const sparkMd5 = new SparkMD5();
      sparkMd5.append(result);
      sparkMd5.append(file.name);
      const hexHash = sparkMd5.end();
      self.postMessage(hexHash);
      self.close();
    }
  };
  fileReader.onerror = () => {
    console.warn('文件读取失败！');
  };
  loadNext();
};
