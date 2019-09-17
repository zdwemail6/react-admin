import Home from '../components/home';
import Category from '../containers/category';

const routes = [
    {

        path:'/',
        exact: true,
        component:Home
    },
    {
        path:'/category',
        exact:true,
        component:Category

    }
];
export default routes;