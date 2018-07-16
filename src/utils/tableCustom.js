const tableHeight = (array) => {
  let h = 0;
  let data = [];
  if (typeof array !== 'object') {
    data = [array];
  } else {
    data = array;
  }
  for (let i = 0; i < data.length; i += 1) {
    const item = data[i];
    try {
      const $e = document.querySelector(item);
      if ($e !== null) {
        h += $e.clientHeight;
      }
    } catch (e) {
      h += parseFloat(item) || 0;
    }
  }
  return window.innerHeight - h;
};

export default {
  tableHeight,
};
