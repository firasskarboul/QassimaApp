import * as actionTypes from '@actions/actionTypes';

const initialState = {
  url: null,
  setting: null,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.SAVE_URL:
      return {
        ...state,
        url: action.url,
      };
    case actionTypes.SAVE_SETTING:
      return {
        ...state,
        setting: action.setting,
      };
    default:
      return state;
  }
};
