<!--
 * @Author: your name
 * @Date: 2021-01-02 12:35:33
 * @LastEditTime: 2021-01-03 19:11:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-elment-admin\src\layout\components\AppMain.vue
-->
<template>
  <section class="app-main">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
    <BackToTop
      :custom-style="myBackToTopStyle"
      :visibility-height="100"
      :back-position="0"
      transition-name="fade"
    />
  </section>
</template>

<script>
import BackToTop from "@c/BackToTop";
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
export default {
  name: "AppMain",
  data() {
    return {
      myBackToTopStyle: {
        right: "50px",
        bottom: "50px",
        width: "40px",
        height: "40px",
        "border-radius": "4px",
        "line-height": "45px", // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
        background: "#e7eaf1" // 按钮的背景颜色 The background color of the button
      }
    };
  },
  components: {
    BackToTop,
    Breadcrumb,
    Hamburger
  },
  computed: {
    key() {
      return this.$route.path;
    },
    ...mapGetters(["sidebar"])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    }
  }
};
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  /*padding: 10px;*/
}

.fixed-header + .app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
.hamburger-container {
  line-height: 46px;
  height: 100%;
  float: left;
  cursor: pointer;
  transition: background 0.3s;
  
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }
}
</style>
