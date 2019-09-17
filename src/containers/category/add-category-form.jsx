import React, {Component} from 'react'
import {Form,Input} from "antd";

@Form.create()
class AddCategoryForm extends Component {


    render() {
        //做表单校验
        const {getFieldDecorator} =this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };

        return <Form>
            <Form.Item label='分类名称'>
                {
                    getFieldDecorator(
                        'categoryName', {
                            rules: [
                                {
                                    required:true, message:'请输入分类名称~'
                                }
                            ]
                        }
                    )(
                        <Input placeholder='请输入分类名称'/>
                    )

                }
            </Form.Item>
        </Form>
    }

}

export default AddCategoryForm;