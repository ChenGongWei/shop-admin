<template>
  <!-- 角色管理 -->
  <div class="wrap">
    <!-- 添加按钮 -->
    <el-button type="primary" @click="handleAdd">添加</el-button>
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 540px" row-key="id">
      <el-table-column prop="rolename" label="名称" width="180"></el-table-column>

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
    <!-- 对话框 -->
    <el-dialog :title="tip+'角色'" :visible.sync="dialogFormVisible">
      <el-form :model="form" status-icon :rules="rules">
        <el-form-item prop="rolename" label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>

        <!-- <el-form-item label="角色权限" :label-width="formLabelWidth">
       
          <el-input v-model="form.menus" autocomplete="off"></el-input>
        </el-form-item>-->

        <el-form-item label="角色权限" :label-width="formLabelWidth">
          <el-checkbox-group v-for="item in menuList" v-model="form.menus" :key="item.id">
            <el-checkbox :label="item.id" @change="handleFirstChange(item.id)">{{item.title}}</el-checkbox>
            <br />
            <el-checkbox
              v-for="child in item.children"
              :label="child.id"
              :key="child.id"
              v-show="form.menus.includes(item.id)"
              @change="con"
            >{{child.title}}</el-checkbox>
          </el-checkbox-group>
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
      menuList: [],
      tableData: [
        // {
        //   id: 1,
        //   name: "系统管理员",
        //   types: ["success", "启用"],
        // },
        // {
        //   id: 2,
        //   name: "客服专员",
        //   types: ["success", "启用"],
        // },
      ],
      dialogFormVisible: false, // 弹框是否显示
      tip: "添加", // 对话框类型
      form: {
        rolename: "", //角色名称
        menus: [], //角色权限
        status: true, //状态1正常2禁用
      },
      rules: {
        rolename: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" },
        ],
      },
      formLabelWidth: "100px",
    };
  },
  methods: {
    // 点击一级菜单时触发
    handleFirstChange(id) {
      // 取消该一级菜单选中状态 则该一级菜单下所有子菜单全部取消选中
      if (!this.form.menus.includes(id)) {
        let list = this.menuList.filter((item) => item.id == id)[0].children;

        list.forEach((item) => {
          if (this.form.menus.indexOf(item.id) != -1) {
            this.form.menus.splice(this.form.menus.indexOf(item.id), 1);
          }
        });
      }

      console.log(this.form.menus);
    },
    con() {
      console.log(this.form.menus);
    },
    // 获取菜单列表
    getMenus() {
      this.http.get("/api/menulist?istree=1").then((res) => {
        this.menuList = res.list || [];
        // this.menus.forEach((item) => this.checkedCities.push([]));
        // console.log(this.checkedCities);
      });
    },
    // 添加角色
    handleAdd() {
      this.tip = "添加";
      this.form = {
        rolename: "",
        menus: [],
        status: true,
      };
      this.dialogFormVisible = true;
    },
    // 编辑角色
    handleEdit(index, id) {
      this.http.get("/api/roleinfo", { id }).then((res) => {
        if (res.code == 200) {
          this.tip = "编辑";
          this.form = res.list;
          this.form.id = id;
          this.form.status = res.list.status == 1 ? true : false;
          // 权限
          this.form.menus = res.list.menus
            .split(",")
            .map((item) => Number(item));
          this.dialogFormVisible = true;
          console.log(res);
        }
      });
    },
    // 提交表单
    handleSubmit() {
      let url = "";
      if (this.tip == "添加") {
        url = "/api/roleadd";
      } else if (this.tip == "编辑") {
        url = "/api/roleedit";
      }
      this.form.status = this.form.status ? 1 : 2;
      console.log(this.form);
      this.http.post(url, this.form).then((res) => {
        // console.log(res);
        if (res.code == 200) {
          this.$message({
            message: res.msg,
            type: "success",
          });
          // 重新获取角色列表
          this.http.get("/api/rolelist").then((res) => {
            this.tableData = res.list || [];
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
    // 删除角色
    handleDelete(index, id) {
      this.$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.http.post("/api/roledelete", { id }).then((res) => {
            if (res.code == 200) {
              this.$message({
                message: res.msg,
                type: "success",
              });
              // 重新获取角色列表
              this.http.get("/api/rolelist").then((res) => {
                this.tableData = res.list || [];
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
    this.http.get("/api/rolelist").then((res) => {
      if (res.code == 200) {
        this.tableData = res.list || [];
        this.getMenus();
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