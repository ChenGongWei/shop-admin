<template>
  <!-- 布局容器 -->
  <el-container class="layout_container">
    <!-- 侧边导航 -->
    <el-aside>
      <SideBar />
    </el-aside>
    <el-container>
      <!-- 顶部 -->
      <el-header>
        <span>admin</span>
        <!-- 下拉菜单 -->
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-setting"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <!-- 内容容器 -->
      <el-main>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator="/" v-show="navseen">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 内容主体 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import SideBar from "../components/common/SideBar";

export default {
  components: {
    SideBar,
  },
  data() {
    return {
      navseen: false,
      titleList: {
        "/menu": "菜单管理",
        "/role": "角色管理",
        "/user": "管理员管理",
        "/category": "商品分类",
        "/specs": "商品规格",
        "/goods": "商品管理",
        "/member": "会员管理",
        "/banner": "轮播图管理",
        "/seckill": "秒杀活动",
      },
      title: "",
    };
  },
  watch: {
    $route(route) {
      if (route.path != "/index") {
        this.navseen = true;
        this.title = this.titleList[route.path];
      } else {
        this.navseen = false;
      }
    },
  },
};
</script>

<style>
/* 布局容器 */
.layout_container {
  height: 100%;
}
/* 侧边导航 */
.el-aside {
  width: 151px !important;
}
/* 顶部 */
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: right;
  line-height: 60px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  height: 100%;
}
</style>