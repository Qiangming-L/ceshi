<template>
  <h3 class="filters-popup-title">
    {{ filtersDateType === 'Parking' ? 'Garage/Parking' : filtersDateType }}
  </h3>
  <ul class="filters-popup-select-ul">
    <li
      :class="[
        'filters-popup-select-li any',
        filtersDateType,
        {
          'choose-option':
            !filtersDate[filtersDateType] ||
            filtersDate[filtersDateType].length < 1,
        },
      ]"
    >
      Any
    </li>
    <li
      v-for="item in optionArray"
      :key="`${filtersDateType}-item`"
      :class="[
        'filters-popup-select-li',
        filtersDateType,
        { 'choose-option': chooseOption(`${item}`) },
      ]"
      :data-item="item"
    >
      {{ item }}
    </li>
  </ul>
</template>
<script lang="ts" setup="{ props, context }">
import { defineProps } from 'vue';

import { RoomParkData, FiltersDateType } from './type';

type Props = {
  optionArray: Array<number | string>;
  filtersDateType: FiltersDateType;
  filtersDate: RoomParkData;
};
const props = defineProps<Props>();

const chooseOption = (item: string): boolean => {
  const { filtersDateType, filtersDate } = props;
  if (typeof filtersDate[filtersDateType] === 'string') {
    return filtersDate[filtersDateType] === item;
  } else {
    return filtersDate[filtersDateType].includes(`${item}`);
  }
};
</script>

<style lang="scss" scoped>
.filters-popup-title {
  font-weight: 600;
  font-size: vm(18);
  line-height: vm(27);
  color: #333333;
  mix-blend-mode: normal;
}
.filters-popup-select-ul {
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: space-between;
  justify-items: center;
  margin-top: vm(16);
}
.filters-popup-select-li {
  padding: vm(7) vm(10);
  gap: vm(10);
  border-radius: vm(4);
  border: vm(1) solid rgba(232, 232, 232, 1);
  color: #333;
  font-size: vm(16);
  touch-action: none;
  &.choose-option {
    background-color: $theme_color;
    color: #fff;
  }
}
</style>
