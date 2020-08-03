<template>
  <!-- 首页 -->
  <div class="wrap">
    <div class="head">
      <div class="left">
        <div class="title">商品总览</div>
        <ul class="contain">
          <li>
            <p class="num">100</p>
            <p class="txt">已下架</p>
          </li>
          <li>
            <p class="num">400</p>
            <p class="txt">已上架</p>
          </li>
          <li>
            <p class="num">50</p>
            <p class="txt">库存紧张</p>
          </li>
          <li>
            <p class="num">500</p>
            <p class="txt">已下架</p>
          </li>
        </ul>
      </div>
      <div class="right">
        <div class="title">用户总览</div>
        <ul class="contain">
          <li>
            <p class="num">100</p>
            <p class="txt">今日新增</p>
          </li>
          <li>
            <p class="num">200</p>
            <p class="txt">昨日新增</p>
          </li>
          <li>
            <p class="num">100</p>
            <p class="txt">本月新增</p>
          </li>
          <li>
            <p class="num">5000</p>
            <p class="txt">会员总数</p>
          </li>
        </ul>
      </div>
    </div>
    <!-- <el-row :gutter="20">
      <el-col :span="12">
        <div class="grid-content bg-purple">12</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">12</div>
      </el-col>
    </el-row>-->
    <el-row style="margin-left:20px">
      <el-col :span="24">
        <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
        <div id="main"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from "echarts";

export default {
  data() {
    return {
      datalist: [
        {
          name: "近一周订单数量",
          type: "line",
          data: [300, 400, 250, 440, 600, 570, 660],
          // areaStyle: {},
        },
        // {
        //   name: "一周banan销量",
        //   type: "line",
        //   data: [600, 400, 200, 0, 200, 400, 600],
        //   areaStyle: {},
        // },
      ],
    };
  },
  methods: {
    drawLine(id) {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = echarts.init(document.getElementById(id));
      // 使用指定的配置项和数据显示图表。
      this.myChart.setOption({
        // 图表标题
        title: {
          // text: "销量",
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        // 提示信息
        tooltip: {
          // 提示信息触发时机
          trigger: "axis",
        },
        // 图例 多组数据时需要
        legend: {
          data: ["近一周订单数量"],
        },
        // x轴设置 分类
        xAxis: {
          // 分类
          type: "category",
          // 刻度
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          // x轴 两端留白
          boundaryGap: false,
        },
        // y轴设置 显示数据
        yAxis: {
          type: "value",
        },
        // 输入数据，每一个对象就是一组数据
        series: this.datalist,
        // 颜色
        // color: ["#f00", "#e9eef3"],
      });
    },
  },
  mounted() {
    this.drawLine("main");
  },
};
</script>

<style scoped>
.wrap {
  height: 100%;
}
.head {
  margin: 30px auto;
  min-width: 700px;
  max-width: 1200px;
  display: flex;
  justify-content: space-around;
}
.left,
.right {
  width: 45%;
  border: 1px solid #000;
}
.title {
  line-height: 50px;
  padding-left: 10px;
  background-color: #fff;
}
.contain {
  list-style-type: none;
  height: 120px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.num,
.txt {
  line-height: 30px;
  text-align: center;
}
.num {
  color: #e06969;
}

.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}

#main {
  width: 700px;
  height: 400px;
  /* border: 1px solid #ccc; */
}
</style>