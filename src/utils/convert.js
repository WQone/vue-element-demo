/* eslint-disable */
import SparkMD5 from 'spark-md5';
import { Message } from 'element-ui';

/**
 * 公共转换js
 */

//  将日期时间转成时间戳格式
const dateTime = (str) => {
  if (!str) {
    return new Date();
  }
  const reg = new RegExp(/(\d{4})-(\d{2})-(\d{2}).(\d{2}):(\d{2}):(\d{2})/);
  const msg = str.match(reg);
  const yy = msg[1];
  const MM = msg[2];
  const dd = msg[3];
  const HH = msg[4];
  const mm = msg[5];
  const SS = msg[6];
  const time = new Date(`${yy}-${MM}-${dd}`).getTime() - 8 * 60 * 60 * 1000;
  const ret = time + (parseInt(HH, 0) * 60 * 60 + parseInt(mm, 0) * 60 + parseInt(SS, 0)) * 1000;
  return ret;
};

/**
 *  转出 YYYY-MM-DD 的时间格式
 *  type 什么都不传  返回 YYYY-MM-SS
 *  type === 1 YYYY-MM-DD hh:mm:ss
 *  type === 2 不是时间的会返回null
 */
const convertDate = (date, type) => {
  if (!date && type === 2) {
    return null;
  }
  const reg = new RegExp(/(\d{4})-(\d{2})-(\d{2}).(\d{2}):(\d{2}):(\d{2})/);
  let dd = new Date(date);
  if (reg.test(date)) {
    dd = new Date(dateTime(date));
  }
  if (dd.toString() === 'Invalid Date') {
    dd = new Date();
  }
  let m = (dd.getMonth() + 1).toString();
  let d = dd.getDate().toString();
  let hh = dd.getHours().toString();
  let mm = dd.getMinutes().toString();
  let ss = dd.getSeconds().toString();
  if (m.length < 2) {
    m = `0${m}`;
  }
  if (d.length < 2) {
    d = `0${d}`;
  }
  if (hh.length < 2) {
    hh = `0${hh}`;
  }
  if (mm.length < 2) {
    mm = `0${mm}`;
  }
  if (ss.length < 2) {
    ss = `0${ss}`;
  }
  if (type === 1) {
    return `${dd.getFullYear()}-${m}-${d} ${hh}:${mm}:${ss}`;
  }
  return `${dd.getFullYear()}-${m}-${d}`;
};

//  转出 YYYY/MM/DD 的时间格式
const convertDateOther = (date, type) => {
  const dd = new Date(date);
  if (dd.toString() === 'Invalid Date') {
    return null;
  }
  let m = (dd.getMonth() + 1).toString();
  let d = dd.getDate().toString();
  if (m.length < 2) {
    m = `0${m}`;
  }
  if (d.length < 2) {
    d = `0${d}`;
  }
  if (type === 1) {
    return `${dd.getFullYear()}`; // 转出年份
  }
  return `${dd.getFullYear()}/${m}/${d}`;
};

const hashFile = (file) => {
  return new Promise((resolve, reject) => {
    const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
    const chunkSize = 2 * 1024 * 1024; // 切片的大小
    const chunks = Math.ceil(file.size / chunkSize);
    let currentChunk = 0;
    const spark = new SparkMD5.ArrayBuffer();
    const fileReader = new FileReader();
    function loadNext() {
      const start = currentChunk * chunkSize;
      const end = start + chunkSize >= file.size ? file.size : start + chunkSize;
      fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
    }
    fileReader.onload = (e) => {
      spark.append(e.target.result); // Append array buffer
      currentChunk += 1;
      if (currentChunk < chunks) {
        loadNext();
      } else {
        console.log('finished loading');
        const result = spark.end();
        // 如果单纯的使用result 作为hash值的时候, 如果文件内容相同，而名称不同的时候
        // 想保留两个文件无法保留。所以把文件名称加上。
        const sparkMd5 = new SparkMD5();
        sparkMd5.append(result);
        sparkMd5.append(file.name);
        const hexHash = sparkMd5.end();
        resolve(hexHash);
      }
    };
    fileReader.onerror = () => {
      console.warn('文件读取失败！');
    };
    loadNext();
  }).catch((err) => {
    console.log(err);
  });
};

export default {
  convertDate,
  convertDateOther,
  hashFile,
};
