/*
  根据prevState和action来生成newState
 */

//combineEwducers整合多个函数，暴露出去的是一个对象

import {combineReducers } from "redux";

import {SAVE_USER} from "./action-types";

//初始化数据
const initUser={
    user:{},
    token:''
};

function user(prevState = initUser,action) {
    switch (action.type) {
        case SAVE_USER:
            return action.data;
        default:
            return prevState;
    }
}

export default combineReducers({
    user
})