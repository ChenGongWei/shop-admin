<template>
  <!-- 会员管理 -->
  <div class="wrap">
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 700px" row-key="id">
      <el-table-column prop="nickname" label="昵称" width="150"></el-table-column>

      <el-table-column prop="phone" label="手机号"></el-table-column>

      <el-table-column prop="addtime" label="注册日期"></el-table-column>

      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row.id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          name: "小U",
          tel: "18138438287",
          time: "2020-07-30 17:51",
        },
        {
          id: 2,
          name: "小明",
          tel: "18138438287",
          time: "2020-07-28 17:51",
        },
        {
          id: 3,
          name: "小张",
          tel: "18138438287",
          time: "2020-08-01 17:51",
        },
      ],
      total: 0, // 总数
      pageSize: 5, // 每页条数
      curIndex: 1, // 当前页数
      dialogFormVisible: false, // 弹框是否显示
      tip: "添加", // 对话框类型
      form: {},
      formLabelWidth: "100px",
    };
  },
  methods: {
    // 根据时间戳获取日期
    getDate(time) {
      let date = new Date(Number(time));
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      let d = date.getDate();
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
  },
  // 获取初始数据
  mounted() {
    this.http.get("/api//membercount").then((res) => {
      if (res.code == 200) {
        // console.log(res);
        this.total = res.list[0].total;
        this.http
          .get("/api/memberlist", {
            size: this.pageSize,
            page: this.curIndex,
          })
          .then((res) => {
            if (res.code == 200) {
              // this.tableData = res.list || [];
            }
          });
      } else {
        this.$message("访问权限受限，请登录");
      }
    });
  },
};
</script>

<style scoped>
.wrap {
  margin-top: 20px;
}
.is-plain {
  font-size: 12px;
}
</style>