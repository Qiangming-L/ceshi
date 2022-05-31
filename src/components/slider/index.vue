<template>
  <div class="filters-popup-slider">
    <div class="filters-popup-slider-rail"></div>
    <div class="filters-popup-slider-track" :style="sliderTrack"></div>
    <div class="filters-popup-slider-handle-one" :style="sliderOne"></div>
    <div class="filters-popup-slider-handle-two" :style="sliderTwo"></div>
  </div>
</template>
<script lang="ts" setup="{ props, context }">
const sliderTrack = {
  width: "100px",
  transform: `translateX(13px)`,
};
const sliderOne = {
  transform: `translate(13px,-50%)`,
};
const sliderTwo = {
  transform: `translate(113px,-50%)`,
};
</script>
<style lang="scss" scoped>
.filters-popup-slider {
  width: 100%;
  height: vm(18);
  padding-top: vm(8);
  position: relative;
}
.filters-popup-slider-rail {
  width: 100%;
  height: vm(2);
  background-color: #b3b3b3;
}
.filters-popup-slider-track {
  position: absolute;
  top: vm(8);
  left: 0;
  height: vm(2);
  background-color: $theme_color;
}
.filters-popup-slider-handle-one,
.filters-popup-slider-handle-two {
  position: absolute;
  top: 50%;
  left: 0;
  width: vm(18);
  height: vm(18);
  border-radius: 50%;
  background-color: #ffffff;
  box-shadow: 0px 1px 7px rgba(0, 0, 0, 0.25);
}
</style>
