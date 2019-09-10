import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom';

import routes from './config/routes';

class App extends Component {
    render() {
        return <Router>
            {/*<Switch>*/}
            {/*  <R  oute path="/" exact component={Home}/>*/}
            {/*  <Route path="/login" exact component={Login}/>*/}
            {/*</Switch>*/}

            {
                routes.map((route,index)=>{
                    //return <Route path={route.path} exact={route.exact} component={route.component}/>

                    return <Route {...route} key={index}/>
                })
            }

        </Router>

    }

}
export default App;