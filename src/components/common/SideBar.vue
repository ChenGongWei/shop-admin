<template>
  <!-- 侧边导航 -->
  <el-menu
    default-active="2-1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#242c34"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item>后台管理系统</el-menu-item>

    <!-- 首页 -->
    <el-menu-item index="1">
      <i class="el-icon-s-home"></i>
      <!-- <span slot="title"> -->
      <router-link to="/" tag="span" slot="title">首页</router-link>
      <!-- </span> -->
    </el-menu-item>

    <el-submenu v-for="menu in tablist" :index="menu.id" :key="menu.id">
      <template slot="title">
        <i :class="menu.icon"></i>
        <span slot="title">{{ menu.text }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item v-for="item in menu.children" :index="item.id" :key="item.id">
          <router-link :to="item.url" tag="span">{{ item.text }}</router-link>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>

    <!-- 系统设置 -->
    <!-- <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span slot="title">系统设置</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="2-1">菜单管理</el-menu-item>
        <el-menu-item index="2-2">角色管理</el-menu-item>
        <el-menu-item index="2-3">管理员管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>-->

    <!-- 产品管理 -->
    <!-- <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-s-goods"></i>
        <span slot="title">产品管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="3-1">菜单管理</el-menu-item>
        <el-menu-item index="3-2">角色管理</el-menu-item>
        <el-menu-item index="3-3">管理员管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>-->

    <!-- 商城管理 -->
    <!-- <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-s-goods"></i>
        <span slot="title">商城管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="3-1">商品分类</el-menu-item>
        <el-menu-item index="3-2">商品规格</el-menu-item>
        <el-menu-item index="3-3">商品管理</el-menu-item>
        <el-menu-item index="3-4">会员管理</el-menu-item>
        <el-menu-item index="3-5">轮播图管理</el-menu-item>
        <el-menu-item index="3-6">秒杀活动</el-menu-item>
      </el-menu-item-group>
    </el-submenu>-->
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      tablist: [
        {
          id: "2",
          text: "系统设置",
          icon: "el-icon-setting",
          children: [
            {
              id: "2-1",
              text: "菜单管理",
              url: "/menu",
            },
            {
              id: "2-2",
              text: "角色管理",
              url: "/role",
            },
            {
              id: "2-3",
              text: "管理员管理",
              url: "/user",
            },
          ],
        },
        {
          id: "3",
          text: "商城管理",
          icon: "el-icon-s-goods",
          children: [
            {
              id: "3-1",
              text: "商品分类",
              url: "/category",
            },
            {
              id: "3-2",
              text: "商品规格",
              url: "/specs",
            },
            {
              id: "3-3",
              text: "商品管理",
              url: "/goods",
            },
            {
              id: "3-4",
              text: "会员管理",
              url: "/member",
            },
            {
              id: "3-5",
              text: "轮播图管理",
              url: "/banner",
            },
            {
              id: "3-6",
              text: "秒杀活动",
              url: "/seckill",
            },
          ],
        },
      ],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
  },
};
</script>

<style>
.el-menu-vertical-demo {
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
}
.el-submenu .el-menu-item {
  min-width: 180px;
}
</style>