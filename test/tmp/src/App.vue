<template>
  <div class="app-wrap">
    <div style="width: 100px; height: 100px">
      <img src="@/assets/img/author.jpg" width="100" alt="" />
    </div>
    <div>
      <router-link to="/"> 点击跳转首页 </router-link>
    </div>
    <div>
      <router-link to="/login"> 点击跳转login </router-link>
    </div>
    <div>
      <router-link to="/about"> 点击跳转about </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  components: {},
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.app-wrap {
  .pinia-info {
    background-color: pink;
    padding: 10px;
  }
}
</style>
