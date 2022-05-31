<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script lang="ts" setup>
import { defineProps, ref } from "vue";

const props = defineProps({
  iconClass: {
    type: String,
    required: true,
  },
  className: { type: String },
});

const iconName = ref<string>(`#icon-${props.iconClass}`);
const svgClass = ref<string>(
  props.className ? `svg-icon ${props.className}` : "svg-icon"
);
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>

