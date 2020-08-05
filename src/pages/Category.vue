<template>
  <!-- 商品分类 -->
  <div class="wrap">
    <!-- 添加按钮 -->
    <el-button type="primary" @click="handleAdd">添加</el-button>
    <!-- 表格 -->
    <el-table
      :data="tableData"
      border
      style="width: 540px"
      row-key="id"
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="catename" label="分类名称" width="180"></el-table-column>

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
    <el-dialog :title="tip+'分类'" :visible.sync="dialogFormVisible">
      <el-form :model="form" status-icon :rules="rules">
        <el-form-item label="分类级别" :label-width="formLabelWidth">
          <el-select v-model="region" @change="changeTab">
            <el-option label="顶级分类" value="顶级分类"></el-option>
            <el-option
              v-for="item in category"
              :label="item.catename"
              :value="item.catename"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="catename" label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="form.catename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item v-show="disId == 2" required label="图片" :label-width="formLabelWidth">
          <el-upload
            action="#"
            list-type="picture-card"
            :multiple="false"
            :on-change="handleChange"
            :auto-upload="false"
          >
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
              <!-- <img
                class="el-upload-list__item-thumbnail"
                :src="form.img ? ('http://localhost:3000'+form.img).replice('undefined','') : file.url"
              />-->
              <img class="el-upload-list__item-thumbnail" :src="file.url" />
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                  <i class="el-icon-zoom-in"></i>
                </span>
              </span>
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
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
      dialogImageUrl: "",
      dialogVisible: false,
      tableData: [
        {
          id: 1,
          name: "家用电器",
          types: ["success", "启用"],
          children: [
            {
              id: 11,
              name: "电器1",
              types: ["success", "启用"],
            },
            {
              id: 12,
              name: "电器2",
              types: ["success", "启用"],
            },
            {
              id: 13,
              name: "电器3",
              types: ["success", "启用"],
            },
          ],
        },
        {
          id: 2,
          name: "手机通讯",
          types: ["success", "启用"],
          children: [
            {
              id: 21,
              name: "手机1",
              types: ["success", "启用"],
            },
            {
              id: 22,
              name: "手机2",
              types: ["success", "启用"],
            },
            {
              id: 23,
              name: "手机3",
              types: ["success", "启用"],
            },
          ],
        },
        {
          id: 3,
          name: "电脑办公",
          types: ["success", "启用"],
          children: [
            {
              id: 31,
              name: "电脑1",
              types: ["success", "启用"],
            },
            {
              id: 32,
              name: "电脑2",
              types: ["success", "启用"],
            },
            {
              id: 33,
              name: "电脑3",
              types: ["success", "启用"],
            },
          ],
        },
        {
          id: 4,
          name: "家居",
          types: ["success", "启用"],
        },
        {
          id: 5,
          name: "服装",
          types: ["success", "启用"],
        },
      ],
      category: [], // 一级分类
      region: "顶级分类", // 分类级别
      disId: 1, // 所属级别
      dialogFormVisible: false, // 弹框是否显示
      tip: "添加", // 对话框类型
      form: {
        pid: "", // 上级分类编号
        catename: "", // 商品分类名称
        img: "", // 图片(文件，一般用于二级分类)
        status: true, //状态1正常2禁用
      },
      rules: {
        catename: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" },
        ],
      },
      formLabelWidth: "100px",
    };
  },
  methods: {
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 获取一级分类
    getCategory() {
      this.http.get("/api/catelist?pid=0").then((res) => {
        this.category = res.list;
      });
    },
    // 改变分类级别
    changeTab(e) {
      if (e == "顶级分类") {
        this.pid = 0;
        this.disId = 1;
      } else {
        this.form.pid = this.category.filter((item) => item.catename == e)[0][
          "id"
        ];
        this.disId = 2;
        this.img = "";
      }
    },
    // 添加分类
    handleAdd() {
      this.tip = "添加";
      this.form = {
        pid: "", // 上级分类编号
        catename: "", // 商品分类名称
        img: "", // 图片(文件，一般用于二级分类)
        status: true, //状态1正常2禁用
      };
      this.dialogFormVisible = true;
    },
    // 编辑分类
    handleEdit(index, id) {
      this.http.get("/api/cateinfo", { id }).then((res) => {
        if (res.code == 200) {
          this.tip = "编辑";
          this.form = res.list;
          this.form.id = id;
          this.form.status = res.list.status == 1 ? true : false;
          if (res.list.pid == 0) {
            this.region = "顶级分类";
            this.disId = 1;
          } else {
            this.region = this.category.filter(
              (item) => item.id == res.list.pid
            )[0]["catename"];
            this.disId = 2;
          }
          console.log(Boolean(this.form.img));
          this.dialogFormVisible = true;
        }
      });
    },
    // 提交表单
    handleSubmit() {
      let url = "";
      if (this.tip == "添加") {
        url = "/api/cateadd";
      } else if (this.tip == "编辑") {
        url = "/api/cateedit";
      }
      this.form.status = this.form.status ? 1 : 2;

      // 1 实例化表单对象，被上上传的数据的容器
      var data = new FormData();

      // 2.遍历数据对象，向容器中添加需要上传的数据

      for (let item in this.form) {
        // 但被遍历的属性 是 img ,说明 需要添加上传文件的形象
        data.append(item, this.form[item]);
      }
      // 3.提交数据
      this.axios({
        method: "post",
        url,
        data,
        // 改写请求头
        headers: {
          // 上传类型包含文件
          "Content-Type": "multipart/form-data",
          // 身份验证
          Authorization: sessionStorage.getItem("token"),
        },
      }).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          this.$message({
            message: res.data.msg,
            type: "success",
          });
          // 重新获取分类列表
          this.http.get("/api/catelist?istree=1").then((res) => {
            this.tableData = res.list || [];
            // 获取一级分类
            this.getCategory();
          });
          this.dialogFormVisible = false;
        } else {
          this.$message({
            message: res.data.msg,
            type: "error",
          });
        }
      });
    },
    // 删除分类
    handleDelete(index, id) {
      this.$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.http.post("/api/catedelete", { id }).then((res) => {
            if (res.code == 200) {
              this.$message({
                message: res.msg,
                type: "success",
              });
              // 重新获取分类列表
              this.http.get("/api/catelist?istree=1").then((res) => {
                this.tableData = res.list || [];
                // 获取一级分类
                this.getCategory();
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
    // 文件状态改变
    handleChange(file) {
      this.form.img = file.raw;
    },
  },
  mounted() {
    this.http.get("/api/catelist?istree=1").then((res) => {
      if (res.code == 200) {
        this.tableData = res.list || [];
        // 获取一级分类
        this.getCategory();
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