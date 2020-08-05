<template>
  <!-- 管理员管理 -->
  <div class="wrap">
    <!-- 添加按钮 -->
    <el-button type="primary" @click="handleAdd">添加</el-button>
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 800px" row-key="id">
      <el-table-column prop="uid" label="用户编号" width="180"></el-table-column>

      <el-table-column prop="rolename" label="角色" width="180"></el-table-column>

      <el-table-column prop="username" label="用户名"></el-table-column>

      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 1" type="success">启用</el-button>
          <el-button v-else-if="scope.row.status == 2" type="danger">禁用</el-button>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row.uid)">编辑</el-button>
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
    <el-dialog :title="tip+'管理员'" :visible.sync="dialogFormVisible">
      <el-form :model="form" status-icon :rules="rules">
        <el-form-item label="角色" required :label-width="formLabelWidth">
          <el-select v-model="form.roleid">
            <el-option v-for="item in roles" :label="item.rolename" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="username" label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="password" label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
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
        // {
        //   id: 1,
        //   uid: "asdfafae-123fqw-2efqw-fq-23d23d",
        //   role: "系统管理员",
        //   uname: "admin",
        //   types: ["success", "启用"],
        // },
        // {
        //   id: 2,
        //   uid: "asdfafae-123fqw-2efqw-fq-23d23d",
        //   role: "客服专员",
        //   uname: "jack",
        //   types: ["success", "启用"],
        // },
        // {
        //   id: 3,
        //   uid: "asdfafae-123fqw-2efqw-fq-23d23d",
        //   role: "客服专员",
        //   uname: "tom",
        //   types: ["success", "启用"],
        // },
      ],
      roles: [], // 角色列表
      total: 0, // 总数
      pageSize: 5, // 每页条数
      curIndex: 1, // 当前页
      dialogFormVisible: false, // 弹框是否显示
      tip: "添加", // 对话框类型
      form: {
        roleid: "", //角色编号
        username: "", //管理员名称
        password: "", //密码
        status: true, //状态1正常2禁用
      },
      rules: {
        username: [
          { required: true, message: "请输入管理员名称", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
      },
      formLabelWidth: "100px",
    };
  },
  methods: {
    // 获取角色列表
    getRoles() {
      this.http.get("/api/rolelist").then((res) => {
        if (res.code == 200) {
          this.roles = res.list || [];
          // console.log(this.roles);
        } else {
          this.$message("访问权限受限，请登录");
        }
      });
    },
    // 添加管理员
    handleAdd() {
      this.tip = "添加";
      this.form = {
        roleid: "",
        username: "",
        password: "",
        status: true,
      };
      this.dialogFormVisible = true;
    },
    // 编辑管理员
    handleEdit(index, uid) {
      // console.log(uid);
      this.http.get("/api/userinfo", { uid }).then((res) => {
        // console.log(res);
        if (res.code == 200) {
          // console.log(res);
          this.tip = "编辑";
          this.form = res.list;
          this.form.password = "";
          this.form.status = res.list.status == 1 ? true : false;
          this.dialogFormVisible = true;
          // console.log(this.form);
        }
      });
    },
    // 提交表单
    handleSubmit() {
      let url = "";
      if (this.tip == "添加") {
        url = "/api/useradd";
      } else if (this.tip == "编辑") {
        url = "/api/useredit";
      }
      this.form.status = this.form.status ? 1 : 2;
      this.http.post(url, this.form).then((res) => {
        if (res.code == 200) {
          this.$message({
            message: res.msg,
            type: "success",
          });
          // 重新获取管理员列表
          this.http.get("/api/usercount").then((res) => {
            this.total = res.list[0].total;
            this.http
              .get("/api/userlist", {
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
    // 删除管理员
    handleDelete(index, id) {
      this.$confirm("此操作将永久删除该管理员, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.http.post("/api/userdelete", { id }).then((res) => {
            if (res.code == 200) {
              this.$message({
                message: res.msg,
                type: "success",
              });
              // 重新获取管理员列表
              this.http.get("/api/usercount").then((res) => {
                this.total = res.list[0].total;
                this.http
                  .get("/api/userlist", {
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
  mounted() {
    this.http.get("/api/usercount").then((res) => {
      if (res.code == 200) {
        this.total = res.list[0].total;
        this.http
          .get("/api/userlist", {
            size: this.pageSize,
            page: this.curIndex,
          })
          .then((res) => {
            if (res.code == 200) {
              console.log(res);
              this.tableData = res.list || [];
              this.getRoles();
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
      // if (idx * this.pageSize > this.total) {
      //   size = this.total - (idx - 1) * this.pageSize;
      // }
      this.http
        .get("/api/userlist", {
          size,
          page: idx,
        })
        .then((res) => {
          if (res.code == 200) {
            this.tableData = res.list || [];
          }
        });
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
/* .el-pagination {
  text-align: right;
} */
</style>