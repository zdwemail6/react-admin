
const menus = [
    {
        icon:'home',
        title:'menus.home',
        key:'/'
    },
    {
        icon:'appstore',
        title:'menus.products',
        key:'/products',
        children:[

            {
                icon:'home',
                title:'menus.category',
                key:'/category'
            },
            {
                icon:'home',
                title:'menus.product',
                key:'/product'
            }
        ]
    },
    {
        icon:'user',
        title:'menus.user',
        key:'/user'
    },
    {
        icon:'pie-chart',
        title:'menus.role',
        key:'/role'
    },
    {
        icon:'pie-chart',
        title:'menus.charts',
        key:'/charts',
        children: [
            {
                icon:'pie-chart',
                title:'menus.bar',
                key:'/charts/bar'
            },
            {
                icon:'pie-chart',
                title:'menus.line',
                key:'/charts/line'
            },
            {
                icon:'pie-chart',
                title:'menus.pie',
                key:'/charts/pie'
            },
        ]
    }
];

export default menus;