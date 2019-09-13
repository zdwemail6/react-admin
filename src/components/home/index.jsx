import React, {Component} from 'react';
import withCheckLogin from '@conts/with-check-login';


//装饰器语法规定后面必须跟类
@withCheckLogin
class Home extends Component {
    render() {
        return (
            <div>
                Home
            </div>
        )
    }

}
export default Home;