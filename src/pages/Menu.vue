<template>
  <!-- 菜单管理 -->
  <div class="wrap">
    <!-- 添加按钮 -->
    <el-button type="primary">添加</el-button>
    <!-- 表格 -->
    <el-table
      :data="tableData"
      border
      style="width: 850px"
      row-key="id"
      :expand-row-keys="['1']"
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="name" label="名称" width="180"></el-table-column>
      <el-table-column prop="icon" label="图标">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="types" label="类型">
        <template slot-scope="scope">
          <el-button :type="scope.row.types[0]">{{scope.row.types[1]}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="order" label="排序" width="50"></el-table-column>
      <el-table-column prop="address" label="菜单URL" width="150"></el-table-column>
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
          name: "系统设置",
          icon: "el-icon-setting",
          types: ["primary", "目录"],
          order: 0,
          children: [
            {
              id: 11,
              name: "菜单管理",
              types: ["success", "菜单"],
              address: "/menu",
            },
            {
              id: 12,
              name: "角色管理",
              types: ["success", "菜单"],
              address: "/role",
            },
            {
              id: 13,
              name: "管理员管理",
              types: ["success", "菜单"],
              address: "/user",
            },
          ],
        },
        {
          id: 2,
          name: "商城管理",
          icon: "el-icon-s-goods",
          types: ["primary", "目录"],
          order: 1,
          children: [
            {
              id: 21,
              name: "商品分类",
              types: ["success", "菜单"],
              address: "/category",
            },
            {
              id: 22,
              name: "商品规格",
              types: ["success", "菜单"],
              address: "/specs",
            },
            {
              id: 23,
              name: "商品管理",
              types: ["success", "菜单"],
              address: "/goods",
            },
            {
              id: 24,
              name: "会员管理",
              types: ["success", "菜单"],
              address: "/member",
            },
            {
              id: 25,
              name: "轮播图管理",
              types: ["success", "菜单"],
              address: "/banner",
            },
            {
              id: 26,
              name: "秒杀活动",
              types: ["success", "菜单"],
              address: "/seckill",
            },
          ],
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