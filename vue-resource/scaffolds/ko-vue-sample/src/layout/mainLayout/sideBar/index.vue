<template>
    <el-menu
      :default-active="activeIndex"
      :default-openeds="openeds"
      class="side-nav">
       <side-item v-for="nav in navData" :key="nav.name" :nav="nav"/>
    </el-menu>
</template>
<script>
import SideItem from "./sideItem";
export default {
  components: { SideItem },
  props: ["navData"],
  mounted() {},
  watch: {
    $route: function(to, from) {
      this.setItem();
    }
  },
  data() {
    let curPath = this.$router.currentRoute.path;
    return {
      activeIndex: curPath,
      openeds: curPath.match(/\/\w*/g)
    };
  },

  methods: {
    setItem() {
      let curPath = this.$router.currentRoute.path;
      this.activeIndex = curPath;
      this.openeds = curPath.match(/\/\w*/g);
    }
  }
};
</script>
<style lang="scss">
.side-nav {
  text-align: left;
  .iconfont {
    font-size: 18px;
    margin-right: 5px;
  }
  .el-menu-item,
  .el-submenu__title {
    height: 40px !important;
    line-height: 40px !important;
  }
}
</style>



