import React from 'react';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { addItem } from '../../actions/items';
import './item.css'
import {
 Form,
 Input,
 Select,
 Checkbox,
 Button,
 AutoComplete,
 Upload,
 Icon
} from 'antd';
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
class itemGrid extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };
  
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Here FrontEnd recieves values from Form : ', values);
        this.props.addItem(values);
      }
    });
  };
  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;
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
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <div >
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Tangerine" />
        <p className="w3-tangerine">Item Panel </p>
        <Form {...formItemLayout} onSubmit={this.handleSubmit} className="form">
        
          <Form.Item className="form-item"
            label={"Name"}
          >
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Please input item Name!', whitespace: true }],
            })(<Input />)}
          </Form.Item>
        
          <Form.Item className="form-item" label="Price">
            {getFieldDecorator('price',{
              rules: [{ required: true, message: 'Please input item Price!', whitespace: true }],
            })(<Input  prefix="US" suffix="$"/>)}
          </Form.Item>
        
          <Form.Item className="form-item"
            label={"Details"}
          >
            {getFieldDecorator('details', {
              rules: [{ required: false, message: 'Please input details of the item', whitespace: true }],
            })(<Input />)}
          </Form.Item>
        
          <Form.Item className="form-item"
            label={"Image"}
          >
            {getFieldDecorator('image', {
              rules: [{ required: false}],
            })(
              <Upload >
              <Button>
                <Icon type="upload" /> Upload
              </Button>
            </Upload>)}
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Add Item
            </Button>
          </Form.Item>

        </Form>
        
        
        <br /><br /><br />

      </div>
    );
  };
};
const ItemGrid = Form.create({ name: 'item' })(itemGrid);
const mapDispatchToProps = (dispatch) => ({
  addItem: (inputObj) => dispatch( addItem(inputObj) ),
  getAllItems: () => dispatch( getAllItems())
})
const mapStateToProps = (state) => ({
})
export default connect(mapStateToProps , mapDispatchToProps)(ItemGrid) ;