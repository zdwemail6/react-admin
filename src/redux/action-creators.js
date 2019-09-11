/*
  包含n个 生产action对象工厂函数 模块
*/
import {SAVE_USER} from "./action-types";
//因为发请求需要跳转，所以不能在这里面发,只保存数据


//保存用户数据

export const saveUser = (user) =>({type:SAVE_USER, data:user});