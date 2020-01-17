<template>
  <div>
    <TableMain :apiFun="getlist" :columns="columns" :loading="loading" :tableData="tableData" :total="total">
      <template v-slot:star_name="{row, column, index}">
        <span>{{row.star_name}}</span>
      </template>
    </TableMain>
  </div>
</template>

<script>
import starApi from '../../api/star';
import TableMain from '../../components/TableMain';

export default {
  components: {
    TableMain,
  },
  data() {
    return {
      columns: [
        {
          label: '网址',
          prop: 'url',
          width: 110,
          render: (h, params) => {
            const ret = h(
              'el-button',
              {
                props: {
                  type: 'text',
                },
                on: {
                  click: () => {
                    window.open(params.row.url);
                  },
                },
              },
              params.row.url,
            );
            return ret;
          },
        },
        {
          label: '星座名',
          width: 60,
          slot: 'star_name',
        },
        {
          label: '日期类型',
          width: 60,
          prop: 'day_type',
        },
        {
          label: '运势类型',
          width: 60,
          prop: 'fortune_type',
        },
        {
          label: '描述',
          width: 200,
          prop: 'des_text',
        },
        {
          label: '创建日期',
          prop: 'date',
        },
        {
          label: '创建时间',
          prop: 'creat_time',
        },
        {
          label: '操作',
          width: 40,
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
                      this.goItem(params.row);
                    },
                  },
                },
                '详情',
              ),
            ]);
            return ret;
          },
        },
      ],
      tableData: [],
      total: 0,
      loading: false,
    };
  },
  mounted() {
    // this.getlist();
  },
  methods: {
    getlist(page, size) {
      this.loading = true;
      console.log(page, size);
      starApi.star(page, size).then((res) => {
        const data = res.data.result;
        this.tableData = data.data;
        this.total = data.total;
        this.loading = false;
      });
    },
    dataUpdate() {},
    goItem(row) {
      this.$router.push({ name: 'TestItem', params: { id: row.id } });
    },
  },
};
</script>
