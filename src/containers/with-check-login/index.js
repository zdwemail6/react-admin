import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';



//定义一个高价组件来做登录验证功能

function withCheckLogin(WrappedComponent) {

    return connect(
        (state) => ({token:state.user.token}),
        null
    )(class extends Component{
        static displayName = `CheckLogin(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

        render() {
            /*
        登录校验
          1. 判断当前地址是否是 /login
             如果用户登录过， 跳转到 /
             如果用户没有登录过， 不变
          2. 判断当前地址是否是 /
            如果用户登录过， 不变
             如果用户没有登录过， 跳转到 /login
       */
            //当前路径
            const {token,...rest} = this.props;
            const { location : {pathname}} = rest;

            /*if (pathname === '/login'){
                if (token){
                    return <Redirect to='/'/>
                }
            }else {
                    if (!token){
                        return <Redirect to='/login'/>
                    }
            }*/
            if (pathname ==='/login' && token) return <Redirect to='/'/>;
            if (pathname !== '/login' && !token) return <Redirect to='/login'/>;

           return<WrappedComponent {...rest}/>;
        }
    })
}
            export default withCheckLogin;