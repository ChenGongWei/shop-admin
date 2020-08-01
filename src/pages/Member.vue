<template>
  <!-- 会员管理 -->
  <div class="wrap">
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 700px" row-key="id">
      <el-table-column prop="name" label="职称" width="150"></el-table-column>

      <el-table-column prop="tel" label="手机号"></el-table-column>

      <el-table-column prop="time" label="注册日期"></el-table-column>

      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row.id)">编辑</el-button>
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
          name: "小U",
          tel: "18138438287",
          time: "2020-07-30 17:51",
        },
        {
          id: 2,
          name: "小明",
          tel: "18138438287",
          time: "2020-07-28 17:51",
        },
        {
          id: 3,
          name: "小张",
          tel: "18138438287",
          time: "2020-08-01 17:51",
        },
      ],
    };
  },
  methods: {
    handleEdit(index, row) {
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