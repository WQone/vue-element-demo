<template>
  <Table :columns="columns14" :data="getData(data, 'name')" :span-method="handleSpan" border></Table>
</template>
<script>
export default {
  data() {
    return {
      dataIndex: [],
      columns14: [
        {
          title: 'Date',
          key: 'date',
        },
        {
          title: 'Name',
          key: 'name',
        },
        {
          title: 'Age',
          key: 'age',
        },
        {
          title: 'Address',
          key: 'address',
        },
      ],
      data: [
        {
          name: 'aaa',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03',
        },
        {
          name: 'aaa',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01',
        },
        {
          name: 'aaa',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01',
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02',
        },
        {
          name: 'aaa',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03',
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04',
        },
      ],
    };
  },
  methods: {
    getData(tabledata, key) {
      const data = tabledata;
      const arr = [];
      const indexAll = [];
      for (let i = 0; i < data.length; i += 1) {
        const item = data[i];
        item.keyLen = 1;
        const index = arr.indexOf(item[key]);
        if (index > -1 && item[key] === arr[arr.length - 1]) {
          item.keyLen = 0;
          data[indexAll[indexAll.length - 1]].keyLen += 1;
        } else {
          indexAll.push(i);
          arr.push(item[key]);
        }
      }

      return data;
    },
    handleSpan({ row, column, rowIndex, columnIndex }) {
      //   if (rowIndex === 0 && columnIndex === 1) {
      //     return [3, 1];
      //   }
      //   if (rowIndex === 1 && columnIndex === 1) {
      //     return [0, 1];
      //   }
      //   if (rowIndex === 2 && columnIndex === 1) {
      //     return [0, 1];
      //   }
      if (columnIndex === 1) {
        // console.log(row.nameLen);
        return [row.keyLen, columnIndex];
      }
    },
  },
};
</script>
