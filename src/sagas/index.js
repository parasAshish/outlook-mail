import { put, takeLatest, all, call } from 'redux-saga/effects';
import { GET_INBOX_MESSAGES, INBOX_RECEIVED, GET_SPAM_MESSAGES, SPAM_RECEIVED, UPDATE_MESSAGE, INBOX, SPAM, FLAG_MESSAGE, UNREAD_MESSAGE, DELETE_MESSAGE, GET_CUSTOM_MESSAGES, CUSTOM_RECEIVED, CUSTOM_FOLDER, GET_DELETED_MESSAGES, DELETED_RECEIVED, GET_INBOX_FLAGGED_MESSAGES } from '../constants/AppConstants';
import inboxData from '../assets/inbox.json';

function* fetchInbox(action) {
  yield put({ type: INBOX_RECEIVED, inboxData: action.payload, });
}

function* fetchSpam(action) {
  yield put({ type: SPAM_RECEIVED, spamData: action.payload, });
}

function* fetchCustom(action) {
  yield put({ type: CUSTOM_RECEIVED, customData: action.payload, });
}

function* fetchDeleted(action) {
  yield put({ type: DELETED_RECEIVED, deletedData: action.payload, });
}

function* deleteMessage(action) {
  const newData = action.payload.filter(msgObj => msgObj.mId !== action.selectedMessage.mId);
  if (action.messageType === INBOX) {
    yield put({ type: INBOX_RECEIVED, inboxData: newData, });
  } else if (action.messageType === SPAM) {
    yield put({ type: SPAM_RECEIVED, spamData: newData, });
  } else if (action.messageType === CUSTOM_FOLDER) {
    yield put({ type: CUSTOM_RECEIVED, customData: newData, });
  }
  const finalDeletedData = Object.assign(action.deletedData, []);
  finalDeletedData.push(action.selectedMessage);
  yield put({ type: DELETED_RECEIVED, deletedData: finalDeletedData, });
}

function* updateMessage(action) {
  let newData = [];
  if (action.messageActionType === FLAG_MESSAGE) {
    newData = [];
    newData = action.payload.map(msgObj => {
      if (msgObj.mId === action.mId) {
        msgObj.isFlag = !msgObj.isFlag;
      }
      return msgObj;
    });
  } else {
    newData = [];
    newData = action.payload.map(msgObj => {
      if (msgObj.mId === action.mId) {
        msgObj.unread = false;
      }
      return msgObj;
    });
  }
  if (action.messageType === INBOX) {
    yield put({ type: INBOX_RECEIVED, inboxData: newData, });
  } else if (action.messageType === SPAM) {
    yield put({ type: SPAM_RECEIVED, spamData: newData, });
  } else if (action.messageType === CUSTOM_FOLDER) {
    yield put({ type: CUSTOM_RECEIVED, customData: newData, });
  } else {
    yield put({ type: DELETED_RECEIVED, deletedData: newData, });
  }
}

function* getFlaggedMessages(action) {
  yield put({ type: INBOX_RECEIVED, inboxData, });
}

function* actionWatcher() {
  yield takeLatest(GET_INBOX_MESSAGES, fetchInbox);
  yield takeLatest(GET_SPAM_MESSAGES, fetchSpam);
  yield takeLatest(GET_CUSTOM_MESSAGES, fetchCustom);
  yield takeLatest(GET_DELETED_MESSAGES, fetchDeleted);

  yield takeLatest(UPDATE_MESSAGE, updateMessage);
  yield takeLatest(DELETE_MESSAGE, deleteMessage);
  yield takeLatest(GET_INBOX_FLAGGED_MESSAGES, getFlaggedMessages);
}

export default function* rootSaga() {
  yield all([
    actionWatcher(),
  ]);
}
