<template>
  <div id="app">
    <el-container>
      <el-aside v-if="!$route.meta.showNav">
        <Menu />
      </el-aside>
      <el-container>
        <el-header v-if="!$route.meta.showNav">
          <MyHeader />
          <Tabs></Tabs>
        </el-header>
        <el-main style="backgroundColor:#f0f2f5">
          <keep-alive>
            <router-view style="background-color:#fff;padding:10px" />
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import MyHeader from "@/components/MyHeader";
import Menu from "@/components/Menu";
import Tabs from "@/components/Tabs";
export default {
  components: {
    MyHeader,
    Menu,
    Tabs
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}
.el-header {
  background-color: #1890ff;
  color: #fff;
  line-height: 60px;
}

.el-aside {
  color: #fff;
  width: 201px !important;
  height: 100vh;
}
.el-main {
  padding: 20px 10px 0 10px;
  margin-top: 60px;
}
</style>
