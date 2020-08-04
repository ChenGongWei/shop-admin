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

        <el-form-item label="角色权限" :label-width="formLabelWidth">
          <!-- <el-radio v-model="form.type" :disabled="disId == 1" :label="1">目录</el-radio>
          <el-radio v-model="form.type" :disabled="disId == 2" :label="2">菜单</el-radio>-->
          <el-input v-model="form.menus" autocomplete="off"></el-input>
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
        menus: "", //角色权限
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
    handleAdd() {
      this.dialogFormVisible = true;
      this.form = {
        rolename: "",
        menus: "",
        status: true,
      };
    },
    handleEdit(index, id) {
      this.http.get("/api/roleinfo", { id }).then((res) => {
        if (res.code == 200) {
          this.form = res.list;
          this.form.status = res.list.status == 1 ? true : false;
          this.dialogFormVisible = true;
        }
      });
      console.log(index, id);
    },
    handleSubmit() {
      console.log(this.form);
    },
    handleDelete(index, id) {
      console.log(index, id);
    },
  },
  mounted() {
    this.http.get("/api/rolelist").then((res) => {
      if (res.code == 200) {
        this.tableData = res.list;
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