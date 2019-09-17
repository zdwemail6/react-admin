import React, {Component} from 'react';
import { Card, Button, Icon, Table, Modal} from "antd";
import {connect} from 'react-redux';
import {getCategories,addCategory} from'@redux/action-creators';
import AddCategoryForm from './add-category-form';
import UpdateCategoryForm from './update-category-form';




@connect(
    (state) =>({categories: state.categories}),
    {getCategories, addCategory}
)
class Category extends Component {
    state={
        isShowAddCategoryModal:false,
        isShowUpdateCategoryModal: false
    };

    addCategoryForm = React.createRef();

    columns = [
        {
            title: '品类名称',
            dataIndex: 'name',
        },
        {
            title: '操作',
            dataIndex: 'operation',
            render: () =>{
                return <div>
                    <Button type='link' onClick={this.showUpdateCategoryModal}>修改分类</Button>
                    <Button type='link'>删除分类 </Button>
                </div>
            }
        }
    ];

    showUpdateCategoryModal = () =>{
        this.setState({
            isShowUpdateCategoryModal: true
        })
    };

    componentDidMount() {
        //发送请求，请求分类数据，更新redux状态
        this.props.getCategories();
    }

    switchModal = (key,value) =>{
        return () => {
            this.setState({
                [key]:value
            })}
    };

    addCategory = () =>{
        //校验表单
        //可以拿到组件的实例对象
        console.log('111');
        this.addCategoryForm.current.validateFields((err,values) => {
            if (!err){
                //表单校验通过
                this.props.addCategory(values.categoryName);
                //清空表单
                this.addCategoryForm.current.resetFields();
                //隐藏对话框
                this.setState({
                    isShowAddCategoryModal:false,
                    isShowUpdateCategoryModal:false

                })
            }
        })
    };

    updateCategory = () =>{

    };



    render() {
        /*const columns = [
            {
                title: '品类名称',
                dataIndex: 'name',
            },
            {
                title: '操作',
                dataIndex: 'operation',
                render: () =>{
                    return <div>
                        <Button type='link'>修改分类</Button>
                        <Button type='link'>删除分类 </Button>
                    </div>
                }
            }
        ];*/

        /*const data = [
            {
                key: '1',
                name: 'John Brown',
            },
            {
                key: '2',
                name: 'Jim Green',
            },
            {
                key: '3',
                name: 'Joe Black',
            },
            {
                key: '4',
                name: 'Jon Cool'
            }
        ];*/

        const {categories} =this.props;
        const {isShowAddCategoryModal,isShowUpdateCategoryModal}=this.state;
        return (
            <Card title='分类列表' extra={<Button type='primary' onClick={this.switchModal('isShowAddCategoryModal',true)}><Icon type='plus'/>分类列表</Button>}>
                <Table
                    columns={this.columns}
                    dataSource={categories}
                    bordered
                    rowKey="_id"
                    pagination={{
                        showQuickJumper:true,
                        showSizeChanger:true,
                        pageSizeOptions:['3','6','9','12'],
                        defaultPageSize:3
                    }}
                />
                <Modal
                    visible={isShowAddCategoryModal}
                    title='添加分类'
                    onOk={this.addCategory}
                    okText='确认'
                    cancelText='取消'
                    width={300}
                    onCancel={this.switchModal('isShowAddCategoryModal',false)}
                >
                <AddCategoryForm ref={this.addCategoryForm} />
                </Modal>


                <Modal
                    visible={isShowUpdateCategoryModal}
                    title='修改分类'
                    onOk={this.updateCategory}
                    okText='确认'
                    cancelText='取消'
                    width={300}
                    onCancel={this.switchModal('isShowUpdateCategoryModal',false)}
                >
                    <UpdateCategoryForm ref={this.addCategoryForm} />
                </Modal>
            </Card>
        )
    }

}

export default Category;