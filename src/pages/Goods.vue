<template>
  <!-- 商品管理 -->
  <div class="wrap">
    <!-- 添加按钮 -->
    <el-button type="primary">添加</el-button>
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 1000px" row-key="id">
      <el-table-column prop="first" label="一级分类" width="150"></el-table-column>

      <el-table-column prop="second" label="二级分类"></el-table-column>

      <el-table-column prop="first" label="商品名称"></el-table-column>

      <el-table-column prop="nowprice" label="销售价格"></el-table-column>

      <el-table-column prop="preprice" label="市场价格"></el-table-column>

      <el-table-column prop="types" label="状态">
        <template slot-scope="scope">
          <el-button :type="scope.row.types[0]">{{scope.row.types[1]}}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row.id)">删除</el-button>
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