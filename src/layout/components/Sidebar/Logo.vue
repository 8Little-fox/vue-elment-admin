<!--
 * @Author: your name
 * @Date: 2021-01-02 12:35:33
 * @LastEditTime: 2021-01-03 19:57:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-elment-admin\src\layout\components\Sidebar\Logo.vue
-->
<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="SIDEBARLOGOFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img src="./logo.png" class="sidebar-logo-small" />
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/" tag="div">
        <img class="sidebar-logo" src="./logo.png" />
        <span class="sidebar-title">{{ PAGETITLE }}</span>
      </router-link>
    </transition>
  </div>
</template>

<script>
import { PAGETITLE } from "@/../my-config";
export default {
  name: "SIDEBARLOGO",
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      PAGETITLE: PAGETITLE
    };
  }
};
</script>

<style
  lang="scss"
  scoped
>
.SIDEBARLOGOFade-enter-active {
  transition: opacity 1.5s;
}

.SIDEBARLOGOFade-enter,
.SIDEBARLOGOFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  /* background-color: #fff; */
  line-height: 160px;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    & .sidebar-logo {
      width: 34px;
      height: 34px;
      margin-right: 30px;
    }

    & .sidebar-logo-small {
      width: 32px;
      height: 32px;
      vertical-align: middle;
    }

    & .sidebar-title {
      margin: 0;
        color: #ffffff;

      font-weight: 500;
      line-height: 50px;
      font-size: 16px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    height: 51px;
    line-height: 51px;
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
