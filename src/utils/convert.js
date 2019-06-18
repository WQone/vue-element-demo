/* eslint-disable */
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


export default {
  convertDate,
  convertDateOther,
};
