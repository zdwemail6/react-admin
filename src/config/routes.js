import Login from '../containers/login';
import Home from '../components/home';

const routes = [
    {
        path:'/login',
        exact:true,
        component:Login
    },
    {

        path:'/',
        exact: true,
        component:Home
    }
];
export default routes;