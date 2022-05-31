<template>
  <div class="map">
    <router-view name="header"></router-view>
    <router-view></router-view>
  </div>
</template>

<script>
import { getCurrentInstance, defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const vue = getCurrentInstance(); // 获取组件store和router上下文
    return {};
  },
});
</script>
<style lang="scss">
@import url('./index.scss');
</style>
