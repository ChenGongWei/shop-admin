<template>
  <!-- 商品规格 -->
  <div class="wrap">
    <!-- 添加按钮 -->
    <el-button type="primary">添加</el-button>
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 700px" row-key="id">
      <el-table-column prop="name" label="属性名称" width="180"></el-table-column>

      <el-table-column prop="value" label="属性值">
        <template slot-scope="scope">
          <el-tag>{{scope.row.value[0]}}</el-tag>
          <el-tag>{{scope.row.value[1]}}</el-tag>
        </template>
      </el-table-column>

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