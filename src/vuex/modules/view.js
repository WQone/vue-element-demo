const state = {
  form1: {},
  form2: {
    b1: [],
    tableData: [],
  },
  form3: {
    tableData: [],
    tableDataM: [],
  },
  form4: {
    tableData: [],
  },
};

// getters
const getters = {
  getForm1: (state) => state.form1,
  getForm2: (state) => state.form2,
  getForm3: (state) => state.form3,
  getForm4: (state) => state.form4,
};

// mutations
const mutations = {
  form1(state, data) {
    state.form1 = data;
  },
  form2(state, data) {
    state.form2 = data;
  },
  form3(state, data) {
    state.form3 = data;
  },
  form4(state, data) {
    state.form4 = data;
  },
  ClearForm(state) {
    console.log(1, state);
    state.form1 = {};
    state.form2 = {};
    state.form3 = {};
    state.form4 = {};
    console.log(2, state);
  },
};

const actions = {
  ClearForm({ commit }) {
    commit('ClearForm');
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
