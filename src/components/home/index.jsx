import React, {Component} from 'react';
import './index.less';
// import withCheckLogin from '@conts/with-check-login';


//装饰器语法规定后面必须跟类
// @withCheckLogin
class Home extends Component {
    render() {
        return (
            <div className="home">
                欢迎使用硅谷后台管理系统~~
            </div>
        )
    }

}
export default Home;