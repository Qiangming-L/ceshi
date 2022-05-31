type RoomParkData = {
  Bedrooms: Array<string>;
  Bathroom: string;
  Parking: string;
  Interval: string;
  [key: string]: Array<string> | string;
};

type State = {
  filters: RoomParkData;
};

export default {
  namespaced: true,
  state: <State>{
    filters: {
      Bedrooms: [],
      Bathroom: '',
      Parking: '',
      Search: '',
      Interval: '$0 ~ $4,000,000',
    },
  },
  mutations: {
    updateFilters(state: State, val: RoomParkData) {
      Object.assign(state.filters, val);
    },
  },
  actions: {},
  getters: {
    format(state: State) {
      return state.filters;
    },
  },
};
