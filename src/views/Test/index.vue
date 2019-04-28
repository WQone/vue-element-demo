<template>
  <div>
    <TableMain :columns="columns" :page.sync="page" :size="size" :tableData="tableData" :total="total" @update:page="pageChange" apiPath="pageItem">
      <template v-slot:wu="{row, column, index}">
        <span>{{index}}{{row.url}}</span>
      </template>
      <template v-slot:qian>sss</template>
    </TableMain>
  </div>
</template>

<script>
import TableMain from '../../components/TableMain';

export default {
  components: {
    TableMain,
  },
  data() {
    return {
      columns: [
        {
          label: '授权网站',
          prop: 'word',
          render: (h, params) => {
            const ret = h(
              'el-button',
              {
                props: {
                  type: 'text',
                },
                on: {
                  click: () => {
                    console.log(params.row);
                    this.dataUpdate(params.row);
                  },
                },
              },
              params.row.word,
            );
            return ret;
          },
        },
        {
          label: '账号',
          prop: 'name',
        },
        {
          label: '日期',
          prop: 'datetime',
        },
        {
          label: '年龄',
          prop: 'age',
        },
        {
          label: '年龄',
          slot: 'wu',
        },
        {
          label: '年龄',
          slot: 'qian',
        },
        {
          label: '操作',
          prop: 'remark',
          render: (h, params) => {
            const ret = h('p', [
              h(
                'el-button',
                {
                  props: {
                    type: 'text',
                  },
                  on: {
                    click: () => {
                      console.log(params.row);
                      this.dataUpdate(params.row);
                    },
                  },
                },
                '修改',
              ),
              h(
                'el-button',
                {
                  props: {
                    type: 'text',
                  },
                  on: {
                    click: () => {
                      this.dataDelete(params.row);
                    },
                  },
                },
                '删除',
              ),
            ]);
            return ret;
          },
        },
      ],
      tableData: [{ name: 1, age: 2 }, { name: 6, age: 7 }],
      page: 1,
      size: 10,
      total: 30,
    };
  },
  methods: {
    pageChange(val) {
      console.log(this.page);
    },
    dataUpdate() {},
    dataDelete() {},
  },
};
</script>
