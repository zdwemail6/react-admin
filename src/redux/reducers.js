/*
  根据prevState和action来生成newState
 */

//combineEwducers整合多个函数，暴露出去的是一个对象

import {combineReducers } from "redux";

function xxx(prevState = {},action) {
    switch (action.type) {
        default:
            return prevState;
    }
}

export default combineReducers({
    xxx
})