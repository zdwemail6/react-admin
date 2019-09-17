import React, {Component} from 'react'
import { Menu,Icon } from 'antd';

//用来获得三大属性
import { withRouter, Link } from 'react-router-dom';
import {withTranslation} from 'react-i18next';
import { connect } from 'react-redux';
import {setTitle} from "@redux/action-creators";

import menus from '@config/menus';

const { SubMenu } = Menu;

@connect(
    null,
    { setTitle }
)
@withTranslation()
@withRouter
 class LeftNav extends Component {

     createItem=(menu)=>{
        return <Menu.Item key={menu.key}>
            <Link to={menu.key}>
                <Icon type={menu.icon} />
                <span>{this.props.t(menu.title)}</span>
            </Link>
        </Menu.Item>
     };

     createMenu=()=>{
         return menus.map((menu) => {
             //判断是否是二级菜单
             if (menu.children){
                return <SubMenu
                    key={menu.key}
                    title={
                        <span>
                  <Icon type={menu.icon} />
                  <span>{this.props.t(menu.title)}</span>
                </span>
                    }
                >
                    {
                        menu.children.map((cMenu)=>{
                        return this.createItem(cMenu);
                    })
                    }
                </SubMenu>
             } else {
                 //判断是否是一级菜单
                 return  this.createItem(menu);
             }
         })
     };

     //遍历刷新后二级菜单打开显示高亮
    findOpenKeys = (pathname) => {
        for (let i=0; i < menus.length; i++){
            const menu =menus[i];
            if (menu.children) {
                for (let j = 0;j <menu.children.length; j++){
                    const cMenu = menu.children[j];
                    if (cMenu.key === pathname){
                        return menu.key;
                    }
                }
            }

        }
    };

    findTitle = (pathname) => {
        for (let i = 0; i < menus.length; i++){
            const menu = menus[i];
            if (menu.children){
                for (let j=0; j<menu.children.length;j++){
                    const cMenu = menu.children[j];
                    if (cMenu.key === pathname){
                        return cMenu.title;
                    }
                }
            }else {
                if (menu.key === pathname){
                    return menu.title;
                }
            }
        }
    };

    select = ({key}) => {
        const title = this.findTitle(key);
        this.props.setTitle(title);
    };

    componentDidMount() {
        const { location : {pathname} } = this.props;
        const title = this.findTitle(pathname);
        this.props.setTitle(title);
    }

    render() {
        //根据路径显示高亮
        const { pathname } =this.props.location;
        // console.log(pathname);
        const menus=this.createMenu();

        const openKeys = this.findOpenKeys(pathname);

        return (
            <div>

                {/*主体颜色   默认高亮选中  下拉样式*/}
                <Menu
                    theme="dark"
                      defaultSelectedKeys={[pathname]}
                      defaultOpenKeys={[openKeys]}
                      mode="inline"
                      onSelect={this.select}
                >
                    {
                        menus
                    }

                </Menu>
            </div>
        )
    }

}
export default LeftNav;