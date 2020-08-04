<template>
  <!-- 菜单管理 -->
  <div class="wrap">
    <!-- 添加按钮 -->
    <el-button type="primary" @click="handleAdd">添加</el-button>
    <!-- 菜单表格 -->
    <el-table
      :data="menuArr"
      border
      style="width: 850px"
      row-key="id"
      :expand-row-keys="['1']"
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="title" label="名称" width="180"></el-table-column>

      <el-table-column prop="icon" label="图标">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>

      <el-table-column prop="type" label="类型">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.type==1">目录</el-tag>
          <el-tag v-else-if="scope.row.type==2" type="success">菜单</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="url" label="菜单URL" width="150"></el-table-column>

      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 对话框 -->
    <el-dialog :title="tip+'菜单'" :visible.sync="dialogFormVisible">
      <el-form :model="form" status-icon :rules="rules">
        <el-form-item label="菜单级别" :label-width="formLabelWidth">
          <el-select v-model="region" @change="changeTab">
            <el-option label="顶级菜单" value="顶级菜单"></el-option>
            <el-option v-for="item in menus" :label="item.title" :value="item.title" :key="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="title" label="菜单名称" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item v-show="disId == 2" label="菜单图标" :label-width="formLabelWidth">
          <el-input v-model="form.icon" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-radio v-model="form.type" :disabled="disId == 1" :label="1">目录</el-radio>
          <el-radio v-model="form.type" :disabled="disId == 2" :label="2">菜单</el-radio>
        </el-form-item>

        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch v-model="form.status"></el-switch>
        </el-form-item>

        <el-form-item v-show="disId == 1" required label="菜单URL" :label-width="formLabelWidth">
          <el-input v-model="form.url" autocomplete="off"></el-input>
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
      menuArr: [], // 展示的所有菜单
      menus: [], // 一级菜单
      dialogFormVisible: false, // 弹框是否显示
      tip: "添加", // 对话框类型
      region: "顶级菜单", // 菜单级别
      disId: 2, // 禁用的单选按钮
      form: {
        // 表单相关内容
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        status: true,
        url: "",
      },
      rules: {
        title: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" },
        ],
      },
      formLabelWidth: "100px",
    };
  },
  methods: {
    // 获取一级菜单
    getMenus() {
      this.http.get("/api/menulist?pid=0").then((res) => {
        this.menus = res.list;
      });
    },
    // 改变菜单级别
    changeTab(e) {
      if (e == "顶级菜单") {
        this.pid = 0;
        this.form.type = 1;
        this.disId = 2;
        this.url = "";
      } else {
        this.form.pid = this.menus.filter((item) => item.title == e)[0]["id"];
        this.form.type = 2;
        this.disId = 1;
        this.icon = "";
      }
    },
    // 显示菜单添加
    handleAdd() {
      this.tip = "添加";
      this.region = "顶级菜单";
      this.disId = 2;
      this.form = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        status: true,
        url: "",
      };
      this.dialogFormVisible = true;
    },
    // 显示菜单编辑
    handleEdit(index, id) {
      this.http.get("/api/menuinfo", { id }).then((res) => {
        if (res.code == 200) {
          // this.getMenus();
          this.tip = "编辑";
          this.form = res.list;
          this.form.id = id;
          if (res.list.pid == 0) {
            this.region = "顶级菜单";
            this.disId = 2;
          } else {
            this.region = this.menus.filter(
              (item) => item.id == res.list.pid
            )[0]["title"];
            this.disId = 1;
          }
          this.form.status = res.list.status == 1 ? true : false;
          this.dialogFormVisible = true;
        } else {
          this.$message({
            message: res.msg,
            type: "error",
          });
        }
      });
    },
    // 提交表单
    handleSubmit() {
      let url = "";
      if (this.tip == "添加") {
        url = "/api/menuadd";
      } else if (this.tip == "编辑") {
        url = "/api/menuedit";
      }
      this.form.status = this.form.status ? 1 : 2;
      this.http.post(url, this.form).then((res) => {
        if (res.code == 200) {
          this.$message({
            message: res.msg,
            type: "success",
          });
          // 重新获取菜单列表
          this.http.get("/api/menulist?istree=1").then((res) => {
            this.menuArr = res.list || [];
          });
          this.getMenus();
          this.dialogFormVisible = false;
        } else {
          this.$message({
            message: res.msg,
            type: "error",
          });
        }
      });
    },
    // 删除菜单
    handleDelete(index, id) {
      this.$confirm("此操作将永久删除该菜单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.http.post("/api/menudelete", { id }).then((res) => {
            if (res.code == 200) {
              this.$message({
                message: res.msg,
                type: "success",
              });
              // 重新获取菜单列表
              this.http.get("/api/menulist?istree=1").then((res) => {
                this.menuArr = res.list || [];
              });
              this.getMenus();
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
    this.http.get("/api/menulist?istree=1").then((res) => {
      if (res.code == 200) {
        this.menuArr = res.list || [];
        this.getMenus();
      } else if (res.code == 403) {
        this.$message(res.msg);
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