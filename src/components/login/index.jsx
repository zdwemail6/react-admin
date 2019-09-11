import React, {Component} from 'react'
import { Form, Icon, Input, Button, message} from 'antd';
// import axios from 'axios';
import { reqLogin } from '../../api';

import {connect} from 'react-redux';
import {saveUser} from "../../redux/action-creators";

import logo from './logo.png';
import './index.less'

//Form组件有一个方法叫做create调用了两次，是一个高阶组件，第二次传组件，这个高阶组件就是为了传递form属性
@connect(
    null,
    {saveUser}
)

@Form.create()
class Login extends Component {

    /**
     * validator表示自定义表单校验
     * @param rule 包含表单项字段
     * @param value 表单项的值
     * @param callback 当callback传参时，说明校验失败，并提示传入参数。 当callback没有参数，说明校验成功
     */
    validator = (rule, value, callback)=>{
        const name = rule.field === 'username' ? '用户名' : '密码';

        if (!value){
            return callback(`请输入${name}`);
        }
        if (value.length<3){
            return callback(`${name}长度必须大于3位`);
        }
        if (value.length>13){
            return callback(`${name}长度必须小于13位`);
        }
        const reg = /^[a-zA-Z0-9_]{3,13}$/;
        if (!reg.test(value)) {
            return callback(`${name}只能包含英文、数字和下划线`);
        }

        callback(); //callback必须调用不能省略
    };



    //    登录

        login = (e) =>{
            e.preventDefault();
            //validateFields: 校验表单
            //error 校验错误 失败就是{包含错误信息}
            //校验通过 null
            //value  表示所有表单项的值
            this.props.form.validateFields((error,values) =>{
                if (!error){
                    //获取表单项的值
                    const{username,password} = values;

                    /*// 发送请求，请求登录
        /*
          发送请求，遇见了跨域问题：（当前服务器是3000，要访问的服务器5000）
          解决：
            1. jsonp 现在不适用
            2. cors 修改服务器代码
            3. proxy 服务器代理模式 （正向代理）
              正向代理
              反向代理（nginx）

              "proxy": "http://localhost:5000" 开启代理服务器

              http://localhost:5000 --> 就是目标服务器地址

              工作原理：
                1. 浏览器发送请求给代理服务器（这时候因为端口号一致，所以没有跨域问题）
                2. 代理服务器将请求转发给目标服务器（因为服务器和服务器直接通信，没有跨域问题）
                3. 目标服务器返回响应给代理服务器
                4. 代理服务器返回响应给浏览器
              缺点：
                1. 只能用于开发环境，不能用于上线环境*/



                    //发送请求登录
                    //1.先引入
                    //2.发送请求
                    /*axios.post('http://localhost:3000/api/login',{username,password})  //请求参数返回的是一个promise对象
                        .then(({data})=>{
                            //判断status的值  是否登录成功
                            //response中返回了许多数据  其中response.data代表的是返回体的数据
                            //代表请求成功
                            if (data.status ===0){
                                //message返回的是一个弹框
                                message.success('登录成功~');

                                //保存用户数据  不能保存在组件内部，不然只有组件内部能用  保存在redux中
                                //持久化存储 localStorage/sessionstorage 回话存储,浏览器一关，内容就会被清空



                                this.props.saveUser(data.data);

                                //跳转到 / 路由
                                this.props.history.replace('/');
                            }else {
                                //登录失败  msg代表用户名或密码错误
                                message.error(data.msg);
                            }
                        })
                        .catch((error)=>{
                            message.error('未知错误，请联系管理员');
                        })
                        .finally(() => {
                            //不管成功，失败都会触发清空密码
                            this.props.form.resetFields(['password']);
                        })*/

                    reqLogin(username,password)
                        .then((result) => {
                            //登陆成功
                            message.success('登录成功');
                            // 保存用户数据  redux  localStorage / sessionStorage
                            this.props.saveUser(result);
                            // 跳转到 / 路由
                            this.props.history.replace('/');
                        })
                        .catch(() => {
                            //清空密码
                            this.props.form.resetFields(['password']);
                        })
                }
            })
        };

    render() {
        //提取一个专门用来做表单校验的方法,调用两次，第一次传规则，第二次传组件
        const {getFieldDecorator} = this.props.form;

        return (
            <div className='login'>
                <header className='login-header'>
                    <img src={logo} alt="logo"/>
                    <h1>React项目：后台管理系统</h1>
                </header>
                <section className='login-section'>
                    <h3>用户登录</h3>
                    <Form onSubmit={this.login}>
                        <Form.Item>
                            {
                                getFieldDecorator(
                                    //getFieldDecorator穿两个参数，第一次传表单的内个key值，第二个参数传规则
                                    'username',
                                    {
                                        rules:[
                                           /* {required:true,message:'请输入用户名'},
                                            {min:3,message:'用户名长度必须大于3位'},
                                            {max:13,message:'用户名长度必须小于13位'},
                                            pattern:表示正则校验的参数
                                            { pattern: /^[a-zA-Z0-9_]{3,13}$/, message: '用户名只能包含英文、数字和下划线'},*/
                                            {validator:this.validator}
                                        ]
                                    }
                                )(<Input prefix={<Icon type='user'/>} placeholder='用户名'/>)
                            }

                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator(
                                    'password',
                                    {
                                        rules: [
                                            {
                                                //定义在this上为了使代码不重复创建，为了更好的复用
                                                validator: this.validator
                                            }
                                        ]
                                    }
                                )(<Input prefix={<Icon type='lock'/>} type='password' placeholder='密码'/>)
                            }
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className='login-btn'>登录</Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }

}

export default Login;