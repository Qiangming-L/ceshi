<template>
  <div class="filters-popup">
    <div
      :class="['filters-popup-main', { 'show-filters': showFiltersAnimation }]"
    >
      <h2 class="filters-popup-main-title">Filters</h2>
      <div :class="['filters-popup-content']">
        <div class="filters-popup-price">
          <h3 class="filters-popup-title price">Price range</h3>
          <p class="filters-popup-interval">{{ filtersDate.Interval }}</p>
          <slider />
        </div>
        <div class="filters-popup-description">
          <h3 class="filters-popup-title description">
            Description Contains Keywords
          </h3>
          <label
            class="filters-popup-description-serch"
            for="descriptionKeywords"
          >
            <input
              id="descriptionKeywords"
              type="text"
              placeholder="Waterfront, Pool, Fireplace..."
              v-model="filtersDate.Search"
            />
          </label>
        </div>
        <div class="filters-popup-select Bedrooms" @click="chooseRoomPark">
          <RoomPark
            :filtersDate="filtersDate"
            filtersDateType="Bedrooms"
            :optionArray="['0', '1', '2', '3', '4', '5+']"
          />
        </div>
        <div class="filters-popup-select Bathroom" @click="chooseRoomPark">
          <RoomPark
            :filtersDate="filtersDate"
            filtersDateType="Bathroom"
            :optionArray="['1+', '2+', '3+', '4+', '5+']"
          />
        </div>
        <div class="filters-popup-select Parking" @click="chooseRoomPark">
          <RoomPark
            :filtersDate="filtersDate"
            filtersDateType="Parking"
            :optionArray="['1+', '2+', '3+', '4+', '5+']"
          />
        </div>
      </div>
      <div class="filters-popup-footer">
        <span @click="clearAll"> Clear </span>
        <span @click="showFilters"> Apply </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup="{ props, context }">
import {
  defineEmits,
  defineProps,
  reactive,
  computed,
  ref,
  onBeforeUnmount,
} from 'vue';

import { useStore } from '../../store/index';

import RoomPark from './roomPark/index.vue';
import slider from '../slider/index.vue';

import { RoomParkData } from './type';

const store = useStore();

type Props = {
  isShowFilters: boolean;
};
const props = defineProps<Props>();
const emit = defineEmits(['showFilters']);

let filtersDate = reactive<RoomParkData>(
  JSON.parse(JSON.stringify(store.state.map.filters))
);
let _show = ref<boolean>(false);
let timer: any = undefined;

const showFiltersAnimation = computed(() => {
  if (props.isShowFilters) {
    timer = setTimeout(() => {
      _show.value = true;
    }, 10);
  } else {
    _show.value = false;
  }
  return _show.value;
});
const chooseRoomPark = (event: MouseEvent): void => {
  const { className, innerText } = event.target as HTMLLIElement;
  if (className.indexOf('filters-popup-select-li') < 0) return;
  const _className = className.split(' ');
  if (_className && _className.length > 1) {
    if (_className.includes('Bedrooms')) {
      if (_className.includes('any')) {
        filtersDate.Bedrooms = [];
      } else {
        filtersDate.Bedrooms.push(innerText);
      }
    } else {
      if (_className.includes('any')) {
        filtersDate[_className[_className.length - 1]] = '';
      } else {
        filtersDate[_className[1]] = innerText;
      }
    }
  }
};
const clearAll = () => {
  Object.assign(filtersDate, {
    Bedrooms: [],
    Bathroom: '',
    Parking: '',
    Search: '',
  });
};
const showFilters = () => {
  store.commit('map/updateFilters', filtersDate);
  emit('showFilters');
};
onBeforeUnmount(() => {
  clearTimeout(timer);
});
</script>

<style scoped lang="scss">
.filters-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.filters-popup-main {
  position: absolute;
  bottom: -100%;
  width: 100%;
  height: calc(100% - vm(180));
  background-color: #fff;
  box-shadow: 0px vm(-1) vm(15) rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(27.1828px);
  border-radius: vm(10) vm(13) 0 0;
  padding: vm(30) vm(17);
  transition: bottom 0.18s;
  &.show-filters {
    bottom: 0;
  }
}
.filters-popup-main-title {
  height: vm(27);
  line-height: vm(27);
  width: 100%;
  text-align: center;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: vm(18);
  margin-bottom: vm(20);
}
::-webkit-scrollbar {
  width: vm(2);
  background-color: rgba(0, 0, 0, 0.1);
}
::-webkit-scrollbar-track {
  border-radius: vm(2);
}
::-webkit-scrollbar-thumb {
  border-radius: vm(2);
  background-color: $theme_color;
}
.filters-popup-content {
  max-height: calc(100% - vm(90) - vm(27));
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: vm(16);
}
.filters-popup-title {
  font-weight: 600;
  font-size: vm(18);
  line-height: vm(27);
  color: #333333;
  mix-blend-mode: normal;
}
.filters-popup-interval {
  line-height: vm(24);
  font-size: vm(16);
  margin: vm(17) 0 vm(24);
}
.filters-popup-description {
  border-top: vm(1) solid #e2e2e2;
  border-bottom: vm(1) solid #e2e2e2;
  padding: vm(16) 0;
  margin: vm(17) auto vm(16);
}
.filters-popup-title.description {
  margin-bottom: vm(16);
}
.filters-popup-description-serch {
  display: inline-block;
  width: 100%;
  height: vm(47);
  input {
    display: inline-block;
    width: 100%;
    height: vm(47);
    line-height: vm(47);
    border: vm(1) solid rgba(0, 0, 0, 0.1);
    border-radius: vm(5);
    padding-left: vm(10);
  }
}
.filters-popup-select {
  margin-bottom: vm(16);
  padding-bottom: vm(16);
  border-bottom: vm(1) solid #e2e2e2;
  &:last-child {
    margin-bottom: 0;
  }
}
.filters-popup-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: vm(90);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.0001) 0%,
    #ffffff 27.77%
  );
  text-align: right;
  color: $theme_color;
  padding-top: vm(16);
  box-shadow: 0 -20px 40px -1px rgba(255, 255, 255, 1);
  background-color: #fff;
  span {
    font-weight: 600;
    font-size: vm(16);
    line-height: vm(24);
    touch-action: none;
  }
  span:last-child {
    margin-right: vm(30);
    margin-left: vm(40);
  }
}
</style>
