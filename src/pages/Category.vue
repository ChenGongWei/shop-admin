<template>
  <!-- 商品分类 -->
  <div class="wrap">
    <!-- 添加按钮 -->
    <el-button type="primary">添加</el-button>
    <!-- 表格 -->
    <el-table
      :data="tableData"
      border
      style="width: 540px"
      row-key="id"
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="name" label="分类名称" width="180"></el-table-column>

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