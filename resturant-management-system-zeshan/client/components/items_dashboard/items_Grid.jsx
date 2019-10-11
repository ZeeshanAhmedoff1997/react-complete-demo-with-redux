
import React from 'react';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { addItem,deleteItem } from '../../actions/items';
import './items-Grid.css'
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
        //this.props.addItem(values);
        const itemId="5d57f94853c694e71c85ad9e"
        this.props.deleteItem(itemId);
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
      <Form {...formItemLayout} onSubmit={this.handleSubmit} className="login-form">


        <Form.Item className="form-item" 
          label={"Item Name"}
        >
          {getFieldDecorator('itemName', {
            rules: [{ required: true, message: 'Please input item Name!', whitespace: true }],
          })(<Input />)}
        </Form.Item>

        <Form.Item className="form-item" label="Item Price">
          {getFieldDecorator('itemPrice',{
            rules: [{ required: true, message: 'Please input item Price!', whitespace: true }],
          })(<Input  prefix="US" suffix="$"/>)}
        </Form.Item>
        <Form.Item className="form-item" 
          label={"details"}
        >
          {getFieldDecorator('details', {
            rules: [{ required: false, message: 'Please input details of the item', whitespace: true }],
          })(<Input />)}
        </Form.Item>
        <Form.Item className="form-item" 
          label={"Upload Item"}
        >
          {getFieldDecorator('imageUrl', {
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
            Add item
          </Button>
        </Form.Item>
      </Form>
      </div>
    );
  }
}
const ItemGrid = Form.create({ name: 'register' })(itemGrid);

const mapDispatchToProps = (dispatch) => ({
  addItem: (inputObj) => dispatch( addItem(inputObj) ),
  deleteItem: (inputID) => dispatch( deleteItem(inputID))
})
const mapStateToProps = (state) => ({
  
})
export default connect(mapStateToProps , mapDispatchToProps)(ItemGrid) ;