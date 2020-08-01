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
  </div>
</template>

<script>
export default {};
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
</style>