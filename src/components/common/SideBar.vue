<template>
  <!-- 侧边导航 -->
  <el-menu
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#242c34"
    text-color="#fff"
    active-text-color="#ffd04b"
    :unique-opened="true"
    :router="true"
  >
    <el-menu-item>后台管理系统</el-menu-item>

    <!-- 首页 -->
    <el-menu-item index="/index">
      <i class="el-icon-s-home"></i>
      <span slot="title">首页</span>
      <!-- <router-link to="/index" tag="span" slot="title">首页</router-link> -->
    </el-menu-item>

    <!-- <el-submenu v-for="menu in tablist" :index="menu.id" :key="menu.id">
      <template slot="title">
        <i :class="menu.icon"></i>
        <span slot="title">{{ menu.text }}</span>
      </template>
      
      <el-menu-item-group>
        <el-menu-item v-for="item in menu.children" :index="item.id" :key="item.id">
          <router-link :to="item.url" tag="span">{{ item.text }}</router-link>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>-->

    <el-submenu v-for="menu in menus" :key="menu.id" :index="menu.id+''">
      <template slot="title">
        <i :class="menu.icon"></i>
        <span slot="title">{{ menu.title }}</span>
      </template>
      <!-- 二级菜单 -->
      <el-menu-item-group>
        <el-menu-item v-for="item in menu.children" :index="item.url" :key="item.id">
          <!-- <router-link :to="item.url" tag="div">{{ item.title }}</router-link> -->
          <span>{{ item.title }}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
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
      menus: [],
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
  mounted() {
    this.menus = JSON.parse(sessionStorage.getItem("list")).menus;
    // console.log(this.menus);
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