<template>
  <div class="map-page">
    <ul class="map-page-top">
      <li class="map-page-top-option all-button">All Property Types</li>
      <li class="map-page-top-option thirdD-button">
        <span :class="['map-page-top-option-round', { 'choose-td': isThird }]"
          >3d</span
        >
        <span :class="['map-page-top-option-round', { 'choose-td': !isThird }]"
          >3d</span
        >
      </li>
      <li class="map-page-top-option filter-button" @click.stop="showFilters">
        Filters
      </li>
    </ul>
    <div class="map-page-content">
      <ul class="map-page-content-select">
        <li class="map-page-content-option for-sale">For Sale</li>
        <li class="map-page-content-option sold">Sold</li>
        <li class="map-page-content-option de-listed">De-listed</li>
      </ul>
      <GMapMap
        :center="center"
        :zoom="14"
        map-type-id="terrain"
        style="width: 100vw"
        :options="{
          zoomControl: false,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: false,
        }"
      >
        <GMapMarker
          :key="`${m.id}-${index}`"
          v-for="(m, index) in markers"
          :position="m.location"
          :label="1"
        />
      </GMapMap>
    </div>
    <Filters
      v-if="isShowFilters"
      @showFilters="showFilters"
      :isShowFilters="isShowFilters"
    />
    <div :class="['map-page-popup', { 'show-popup': isShowResults }]">
      <p>已完成过滤</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, ref } from 'vue';

import { markers } from './mapData';

import Filters from './filters/index.vue';

const center = { lat: 49.2079917, lng: -122.9140894 };
let isShowFilters = ref<boolean>(false);
let isShowResults = ref<boolean>(false);
let isThird = ref<boolean>(false);
let timer: any = undefined;
const showFilters = (event:MouseEvent) => {
  isShowFilters.value = !isShowFilters.value;
  if (!isShowFilters.value) {
    isShowResults.value = true;
    timer = setTimeout(() => {
      isShowResults.value = false;
    }, 1000);
  }
};
onBeforeUnmount(() => {
  clearTimeout(timer);
});
</script>

<style lang="scss" scoped>
.map-page {
  height: 100%;
}
.map-page-top {
  background-color: rgba(40, 163, 179, 1);
  width: 100%;
  display: flex;
  align-items: center;
  justify-items: center;
  justify-content: space-between;
  font-size: vm(14);
  height: vm(50);
  padding: 0 vm(16);
}
.map-page-top-option {
  border: vm(1) solid #fff;
  color: #fff;
  height: vm(30);
  line-height: vm(30);
  border-radius: vm(33);
  text-align: center;
  font-size: vm(14);
  &::after {
    float: right;
    content: '';
    width: 0px;
    height: 0px;
    border-width: vm(4.3);
    border-style: solid;
    border-color: rgba(255, 255, 255, 0.5) transparent transparent transparent;
    margin-right: vm(7);
    margin-top: vm(14);
  }
}
.all-button {
  width: vm(150);
}
.thirdD-button {
  width: vm(110);
}
.filter-button {
  width: vm(70);
  touch-action: none
}
.map-page-content {
  width: 100%;
  height: calc(100% - vm(49));
  position: relative;
}
.map-page-top-option-round {
  display: inline-block;
  line-height: vm(28);
  &:last-child {
    margin-left: vm(8);
  }
  &::before {
    display: inline-block;
    content: '';
    width: vm(11);
    height: vm(11);
    border-radius: 50%;
    border: vm(1) solid #ffffff;
    box-shadow: 0px 0px vm(4) rgba(0, 0, 0, 0.25);
    margin-right: vm(5);
    transform: translateY(vm(1));
  }
}
.choose-td {
  &::before {
    background-color: #413e6d;
  }
}
.map-page-content-select {
  position: absolute;
  display: flex;
  top: vm(16);
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  color: #fff;
}
.map-page-content-option {
  height: vm(38);
  line-height: vm(38);
  font-size: vm(16);
  text-align: center;
}
.for-sale {
  width: vm(96);
  background: #28a3b3;
  mix-blend-mode: normal;
  box-shadow: 0px vm(5) vm(25) rgba(55, 58, 64, 0.144475);
  border-radius: vm(6) 0 0 vm(6);
}
.sold {
  width: vm(67);
  background: #413e6d;
  mix-blend-mode: normal;
}
.de-listed {
  width: vm(108);
  background: #ffffff;
  mix-blend-mode: normal;
  box-shadow: 0px 5px 25px 1px rgba(55, 58, 64, 0.144475);
  border-radius: 0 vm(6) vm(6) 0;
  color: #808080;
}
.map-page-popup {
  position: fixed;
  top: -100%;
  left: 50%;
  transform: translateX(-50%);
  max-width: 80%;
  max-height: 80%;
  padding: vm(10) vm(30);
  min-width: vm(150);
  min-height: vm(50);
  text-align: center;
  border-radius: vm(8);
  overflow-x: hidden;
  overflow-y: auto;
  background: #fff;
  color: $theme_color;
  font-size: vm(15);
  transition: top ease-in 0.3s;
  display: flex;
  align-items: center;
  justify-items: center;
  justify-content: center;
  z-index: 20;
  &.show-popup {
    top: vm(100);
  }
}
</style>

<style lang="scss">
.vue-map-container,
.vue-map {
  height: calc(100%);
}
</style>
