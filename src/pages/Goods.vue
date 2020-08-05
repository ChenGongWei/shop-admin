<template>
  <!-- 商品管理 -->
  <div class="wrap">
    <!-- 添加按钮 -->
    <el-button type="primary">添加</el-button>
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 1000px" row-key="id">
      <el-table-column prop="firstcatename" label="一级分类" width="150"></el-table-column>

      <el-table-column prop="secondcatename" label="二级分类"></el-table-column>

      <el-table-column prop="goodsname" label="商品名称"></el-table-column>

      <el-table-column prop="price" label="销售价格"></el-table-column>

      <el-table-column prop="market_price" label="市场价格"></el-table-column>

      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 1" type="success">启用</el-button>
          <el-button v-else-if="scope.row.status == 2" type="danger">禁用</el-button>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      :current-page.sync="curIndex"
    ></el-pagination>
  </div>
</template>

<script>
// 富文本编辑器
import E from "wangeditor";

export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          first: "手机通讯",
          second: "手机",
          name: "小米10",
          nowprice: 3999,
          preprice: 3999,
          types: ["success", "启用"],
        },

        {
          id: 2,
          first: "电脑办公",
          second: "笔记本",
          name: "联想小新",
          nowprice: 4499,
          preprice: 4699,
          types: ["success", "启用"],
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
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
  },
  // 获取初始数据
  mounted() {
    this.http.get("/api/goodscount").then((res) => {
      if (res.code == 200) {
        // console.log(res);
        this.total = res.list[0].total;
        this.http
          .get("/api/goodslist", {
            size: this.pageSize,
            page: this.curIndex,
          })
          .then((res) => {
            if (res.code == 200) {
              console.log(res);
              this.tableData = res.list || [];
            }
          });
      } else {
        this.$message("访问权限受限，请登录");
      }
    });
  },
  watch: {
    // 监听页码变化
    curIndex(idx) {
      var size = this.pageSize;
      this.http
        .get("/api/goodslist", {
          size,
          page: idx,
        })
        .then((res) => {
          if (res.code == 200) {
            this.tableData = res.list || [];
          }
        });
      console.log(idx);
    },
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