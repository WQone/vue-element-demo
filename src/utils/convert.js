/**
 * 公共转换js
 */

//  获取数组最小值
const getArrayMin = (arr) => {
  let min = 0;
  const length = arr.length;
  if (length) {
    min = arr[0];
    for (let i = 0; i < arr.length; i += 1) {
      const item = arr[i];
      if (item < min) {
        min = item;
      }
    }
  }
  return min;
};

//  获取数组最大值
const getArrayMax = (arr) => {
  let max = 0;
  const length = arr.length;
  if (length) {
    max = arr[0];
    for (let i = 0; i < arr.length; i += 1) {
      const item = arr[i];
      if (item > max) {
        max = item;
      }
    }
  }
  return max;
};

//  根据字符串数组转出其中对应的内容+编码
const convertString = (str, base) => {
  if (base && str) {
    const arr = str.split(',');
    let ret = '';
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i] !== '') {
        if (i !== 0) {
          ret += '，';
        }
        ret += `${base[arr[i]]}/${arr[i]}`;
      }
    }
    if (ret && ret !== 'undefined') {
      return ret;
    }
  }
  return '';
};

//  根据字符串数组转出其中对应的 数组
const convertArr = (str) => {
  if (str) {
    const arr = str.split(',');
    for (let i = 0; i < arr.length; i += 1) {
      if (!isNaN(parseInt(arr[i], 0))) {
        arr[i] = parseInt(arr[i], 0);
      }
    }
    return arr;
  }
  return [];
};

//  根据编码数组转出数组id
const convertArrId = (arr, base) => {
  const ret = arr;
  for (let i = 0; i < ret.length; i += 1) {
    if (!isNaN(parseInt(base[ret[i]], 0))) {
      ret[i] = parseInt(base[ret[i]], 0);
    }
  }
  return ret;
};

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

//  转出 YYYY 年 MM 月 DD日 的时间格式
const convertDateNew = (date, type) => {
  let dd = new Date(date);
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
  return `${dd.getFullYear()} 年 ${m} 月 ${d} 日`;
};

//  涉及到被转义的文本转json
const getJSON = (str) => {
  if (!str) {
    return [];
  }
  let ret = '';
  const fn = (s) => {
    if (typeof s === 'string') {
      try {
        const retstr = JSON.parse(s);
        ret = retstr;
        fn(retstr);
      } catch (error) {
        ret = s;
      }
    }
  };
  fn(str);
  return ret;
};

/**
 * 接受文本，往里面插入想要的文本
 * @param {*} data 进行转换的文本
 * @param {*} num 隔多少位数插入
 * @param {*} str 插入的参数
 */
const stringAdd = (data, num, str) => {
  const dataString = data.toString();
  const remainder = dataString.length / num;
  let ret = dataString.substr(0, num);
  for (let i = 0; i < remainder; i += 1) {
    if (i + 1 < remainder) {
      ret += str + dataString.substr((i + 1) * num, num);
    }
  }
  return ret;
};

//  json字符串转json，否则还是返回字符串
const toJSON = (str) => {
  let ret = '';
  try {
    ret = JSON.parse(str);
  } catch (error) {
    ret = str;
  }
  if (ret === null) {
    return '';
  }
  return ret;
};

//  将数字转成两位小数，如果为空或者NaN，返回''
const toPrice = (str) => {
  const a = parseFloat(str);
  if (isNaN(a) || (!a && a !== 0)) {
    return '';
  }
  return a.toFixed(4);
};


//  将html转成canvas
const htmlToCanvas = (html, ctx) => {
  // const data = 'data:image/svg+xml,' +
  const data =
    '<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000">' +
    '<foreignObject width="100%" height="100%">' +
    `<div xmlns="http://www.w3.org/1999/xhtml">${html}</div>` +
    '</foreignObject>' +
    '</svg>';
  // const img = new Image();
  // img.src = data;
  const DOMURL = self.URL || self.webkitURL || self;
  const img = new Image();
  const svg = new Blob([data], {
    type: 'image/svg+xml;charset=utf-8',
  });
  const url = DOMURL.createObjectURL(svg);
  return url;
  // return data;
};

/**
 * 将canvas转成img
 * 支持图片与文本
 */
const canvasToImg = (canvas, config, data, callback) => {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //  没传参直接canvas有什么就抛什么出去
  if (data && data.length > 0) {
    //  根据index排序，从小到大
    const dataArr = data;
    for (let i = 0; i < dataArr.length; i += 1) {
      const itemI = dataArr[i];
      for (let j = 0; j < dataArr.length; j += 1) {
        const itemJ = dataArr[j];
        const indexI = itemI.index || 0;
        const indexJ = itemJ.index || 0;
        if (indexI < indexJ) {
          const s = dataArr[i];
          dataArr[i] = dataArr[j];
          dataArr[j] = s;
        }
      }
    }

    //  画图片 传图片地址
    const toCanvas = (i) => {
      if (i === dataArr.length) {
        callback(canvas.toDataURL());
        return false;
      }
      const d = dataArr[i];
      switch (d.type) {
        case 'image':
          {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.src = d.src;
            img.width = d.width || 0;
            img.height = d.height || 0;
            img.onload = () => {
              //  canvas画图片
              if (img.width || img.height) {
                ctx.drawImage(img, d.x || 0, d.y || 0, img.width, img.height);
              } else {
                ctx.drawImage(img, d.x || 0, d.y || 0);
              }
              toCanvas(i + 1);
            };
            img.src = img.src;
          }
          break;
        case 'text':
          ctx.font = d.font || '20px  Microsoft YaHei ';
          ctx.textBaseline = 'top';
          ctx.fillStyle = d.style || '#000000';
          if (d.width) {
            ctx.fillText(d.text, d.x || 0, d.y || 0, d.width);
          } else {
            ctx.fillText(d.text, d.x || 0, d.y || 0);
          }
          toCanvas(i + 1);
          break;
        default:
          toCanvas(i + 1);
          break;
      }
      return false;
    };

    toCanvas(0);
  } else {
    callback(canvas.toDataURL());
  }
};

//  base64转成blob文件，用于上传
const baseToBlob = (data) => {
  try {
    //  去掉url的头，并转换为byte
    const bytes = window.atob(data.split(',')[1]);

    //  处理异常,将ascii码小于0的转换为大于0
    const buffer = new ArrayBuffer(bytes.length);
    const ua = new Uint8Array(buffer);
    for (let i = 0; i < bytes.length; i += 1) {
      ua[i] = bytes.charCodeAt(i);
    }

    return {
      status: 0,
      result: new Blob([buffer], {
        type: 'image/png',
      }),
    };
  } catch (e) {
    return {
      status: 20000,
      result: e.message,
    };
  }
};

const isIE = () => {
  if (window.navigator.userAgent.indexOf('MSIE') >= 1 || 'ActiveXObject' in window) {
    //    如果是ie
    return true;
  }
  return false;
};

/**
 * {"2017-10-30":12920,"2017-10-31":89055}
 * 之类的格式转成
 * [{
 *  date: '2017-10-30',
 *  value: 12920
 * }, {
 *  date: '2017-10-31',
 *  value: 12920
 * }] 之类的格式
 * type 类型
 * desc 或者不传 时间倒序
 * asc  时间正序
 * 应该基本够用的了吧
 */
const dateSort = (dateArr, type) => {
  const dateStringArr = Object.keys(dateArr);
  const dateTimeArr = [];
  const data = [];
  dateStringArr.forEach((item, i) => {
    const reg = new RegExp(/(\d{4})-(\d{2})-(\d{2}).(\d{2}):(\d{2}):(\d{2})/);
    let dd = new Date(item);
    if (reg.test(item)) {
      dd = new Date(dateTime(item));
    }
    dateTimeArr[i] = dd.getTime();
    data[i] = {
      date: dateStringArr[i],
      value: dateArr[dateStringArr[i]],
    };
  });

  for (let i = 0; i < dateTimeArr.length; i += 1) {
    for (let j = 0; j < dateTimeArr.length; j += 1) {
      const itemI = dateTimeArr[i];
      const dataI = data[i];
      const itemJ = dateTimeArr[j];
      const dataJ = data[j];
      switch (type) {
        case 'asc':
          if (itemJ > itemI) {
            dateTimeArr[j] = itemI;
            dateTimeArr[i] = itemJ;
            data[j] = dataI;
            data[i] = dataJ;
          }
          break;
        case 'desc':
        default:
          if (itemJ < itemI) {
            dateTimeArr[j] = itemI;
            dateTimeArr[i] = itemJ;
            data[j] = dataI;
            data[i] = dataJ;
          }
          break;
      }
    }
  }
  return data;
};


//  获取dom元素与屏幕的相对X，Y
const getClient = (el, X, Y) => {
  const XX = X || 0;
  const YY = Y || 0;
  if (!el.offsetParent) {
    return {
      X: XX || el.offsetLeft,
      Y: YY || el.offsetTop,
    };
  }
  return getClient(el.offsetParent, XX + el.offsetLeft, YY + el.offsetTop);
};

export default {
  getArrayMin, // 获取数组最小值
  getArrayMax, //  获取数组最大值

  convertString,
  stringAdd,
  convertArr,
  convertArrId,
  convertDate,
  convertDateOther,
  convertDateNew,
  getJSON,
  toJSON,
  dateTime,
  toPrice,
  htmlToCanvas,
  canvasToImg,
  baseToBlob,
  isIE,
  dateSort,
  getClient, //  获取dom元素与屏幕的相对X，Y
};
