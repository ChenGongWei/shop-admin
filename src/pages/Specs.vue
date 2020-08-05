<template>
  <!-- 商品规格 -->
  <div class="wrap">
    <!-- 添加按钮 -->
    <el-button type="primary" @click="handleAdd">添加</el-button>
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 700px" row-key="id">
      <el-table-column prop="specsname" label="属性名称" width="180"></el-table-column>

      <el-table-column prop="attrs" label="属性值">
        <template slot-scope="scope">
          <el-tag v-for="(item,index) in scope.row.attrs" :key="index">{{item}}</el-tag>
          <!-- <el-tag>{{scope.row.value[0]}}</el-tag>
          <el-tag>{{scope.row.value[1]}}</el-tag>-->
        </template>
      </el-table-column>

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
    <!-- 对话框 -->
    <el-dialog :title="tip+'商品规格'" :visible.sync="dialogFormVisible">
      <el-form :model="form" status-icon>
        <el-form-item label="商品规格名称" required :label-width="formLabelWidth">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="商品规格值" required :label-width="formLabelWidth">
          <el-input v-model="form.attrs" autocomplete="off" placeholder="以英文逗号隔开"></el-input>
        </el-form-item>

        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch v-model="form.status"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          name: "颜色",
          value: ["白色", "黑色"],
          types: ["success", "启用"],
        },

        {
          id: 2,
          name: "尺寸",
          value: ["55英寸", "60英寸"],
          types: ["success", "启用"],
        },
      ],
      total: 0, // 总数
      pageSize: 5, // 每页条数
      curIndex: 1, // 当前页数
      dialogFormVisible: false, // 弹框是否显示
      tip: "添加", // 对话框类型
      form: {
        specsname: "", // 商品规格名称
        attrs: "", // 商品规格属性值
        status: true, // 状态1正常2禁用
      },
      formLabelWidth: "110px",
    };
  },
  methods: {
    // 添加商品规格
    handleAdd() {
      this.tip = "添加";
      this.form = {
        specsname: "",
        attrs: "",
        status: true,
      };
      this.dialogFormVisible = true;
    },
    // 编辑商品规格
    handleEdit(index, id) {
      // console.log(uid);
      this.http.get("/api/specsinfo", { id }).then((res) => {
        // console.log(res);
        if (res.code == 200) {
          this.tip = "编辑";
          this.form = res.list[0];
          this.form.attrs = this.form.attrs.join();
          this.form.status = res.list[0].status == 1 ? true : false;
          this.dialogFormVisible = true;
          // console.log(this.form);
        }
      });
    },
    // 提交表单
    handleSubmit() {
      let url = "";
      if (this.tip == "添加") {
        url = "/api/specsadd";
      } else if (this.tip == "编辑") {
        url = "/api/specsedit";
      }
      // this.form.attrs = this.form.attrs.split(",");
      this.form.status = this.form.status ? 1 : 2;
      console.log(this.form);
      this.http.post(url, this.form).then((res) => {
        if (res.code == 200) {
          this.$message({
            message: res.msg,
            type: "success",
          });
          // 重新获取商品规格列表
          this.http.get("/api/specscount").then((res) => {
            this.total = res.list[0].total;
            this.http
              .get("/api/specslist", {
                size: this.pageSize,
                page: this.curIndex,
              })
              .then((res) => {
                this.tableData = res.list || [];
              });
          });
          this.dialogFormVisible = false;
        } else {
          this.$message({
            message: res.msg,
            type: "error",
          });
        }
      });
    },
    // 删除商品规格
    handleDelete(index, id) {
      this.$confirm("此操作将永久删除该商品规格, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.http.post("/api/specsdelete", { id }).then((res) => {
            if (res.code == 200) {
              this.$message({
                message: res.msg,
                type: "success",
              });
              // 重新获取商品规格列表
              this.http.get("/api/specscount").then((res) => {
                this.total = res.list[0].total;
                this.http
                  .get("/api/specslist", {
                    size: this.pageSize,
                    page: this.curIndex,
                  })
                  .then((res) => {
                    this.tableData = res.list || [];
                  });
              });
            } else {
              this.$message({
                message: res.msg,
                type: "error",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  // 获取初始数据
  mounted() {
    this.http.get("/api/specscount").then((res) => {
      if (res.code == 200) {
        this.total = res.list[0].total;
        this.http
          .get("/api/specslist", {
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
        .get("/api/specslist", {
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