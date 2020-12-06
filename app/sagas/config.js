import {all, put, takeEvery, delay} from 'redux-saga/effects';
import url from 'url';
import * as actionTypes from '@actions/actionTypes';
import * as api from '@api';
import {SettingModel} from '@models';
import {BaseSetting} from '@config';

export function* onSetup(action) {
  const urlObject = url.parse(
    [BaseSetting.protocol, action.domain].join('://'),
  );
  yield put({type: actionTypes.SAVE_URL, url: urlObject});
  yield delay(250);
  yield put({type: actionTypes.FETCH_HOME});
  try {
    const response = yield api.getSetting();
    if (response.success) {
      const setting = new SettingModel(response.data);
      yield put({type: actionTypes.SAVE_SETTING, setting});
    }
  } catch (error) {}
  if (action.user) {
    yield put({type: actionTypes.VALID_TOTEN, callback: action.callback});
  } else {
    action.callback?.();
  }
}

function* watchSetup() {
  yield takeEvery(actionTypes.SETUP_CONFIG, onSetup);
}

export default function* configSagas() {
  yield all([watchSetup()]);
}
