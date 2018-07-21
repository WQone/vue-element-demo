// const data = {
//   status: 200,
//   code: 0,
//   message: null,
//   result: [
//     { ifDefault: 1, pattern: 0, name: '测试项目1224', id: 2 },
//     { ifDefault: 0, pattern: 0, name: '测试项目1226', id: 5 },
//     { ifDefault: 0, pattern: 0, name: '测试项目1225', id: 4 },
//     { ifDefault: 0, pattern: 0, name: '测试项目1226', id: 7 },
//     { ifDefault: 0, pattern: 0, name: '测试项目1227', id: 12 },
//   ],
// };

const render = (s, n) => {
  let ret = '';
  for (let i = 0; i < n; i += 1) {
    ret += s;
  }
  return ret;
};

const JSONfmatter = (str) => {
  let jsonString = '';
  if (typeof str === 'object') {
    jsonString = JSON.stringify(str);
  }

  let ret = '';
  let space = 0;
  const count = 4; //  缩进空格数

  const s = '&nbsp;';
  jsonString = jsonString.split('');
  for (let i = 0; i < jsonString.length; i += 1) {
    const item = jsonString[i];
    if (/({|\[)/.test(item)) {
      space += count;
      ret += `${item}<br />${render(s, space)}`;
    } else if (/(}|\]|,)/.test(item)) {
      if (/(,)/.test(item)) {
        ret += `${item}<br />${render(s, space)}`;
      } else if (jsonString[i + 1] && !/(,)/.test(jsonString[i + 1])) {
        if (/(}|\])/.test(jsonString[i + 1])) {
          ret += `<br />${render(s, space - count)}${item}`;
        } else {
          ret += `${item}<br />${render(s, space - count)}`;
        }
      } else if (jsonString[i + 1] && /(,)/.test(jsonString[i + 1])) {
        ret += `<br />${render(s, space - count)}${item}`;
      } else if (!jsonString[i + 1]) {
        ret += `<br />${item}`;
      } else {
        ret += `${item}`;
      }
      if (/(}|\])/.test(jsonString[i])) {
        space -= count;
      }
    } else {
      ret += item;
    }
  }
  return ret;
};

// const html = JSONfmatter(data);

// document.body.innerHTML = html;

export default JSONfmatter;
