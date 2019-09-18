import Home from '../components/home';
import Category from '../containers/category';
import Product from "../containers/product";
import SaveUpdate from '../containers/product/save-update';

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

    },
    {
        path:'/product',
        exact:true,
        component:Product
    },
    {
        path:'/product/saveupdate',
        exact:true,
        component:SaveUpdate
    }
];
export default routes;