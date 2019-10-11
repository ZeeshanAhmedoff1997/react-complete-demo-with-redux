
import React from 'react';
import 'antd/dist/antd.css';
import {
  Form,
  Input,
  Select,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

class registrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Here FrontEnd recieves values from Form : ', values);
        this.props.adduser(values);
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
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

    const roleSelector = getFieldDecorator('role', {
        initialValue: 'admin',
    })(
    <Select style={{ width: 400 }}>
        <Option value="admin">Admin</Option>
        <Option value="customer">Customer</Option>
        <Option value="rider">Rider</Option>
    </Select>,
    );    
    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>


        <Form.Item className="form-item" 
          label={"Full Name"}
        >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input your Full Name!', whitespace: true }],
          })(<Input />)}
        </Form.Item>

        <Form.Item className="form-item" label="E-mail">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          })(<Input />)}
        </Form.Item>


        <Form.Item className="form-item" label="Password" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input.Password />)}
        </Form.Item>


        <Form.Item className="form-item" label="Confirm Password" hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item>


        <Form.Item className="form-item" label="Role">
          {getFieldDecorator('role', {
            rules: [],
          })(<Input addonBefore={roleSelector}   />)}
        </Form.Item>  


        <Form.Item className="form-item" label="Phone Number">
          {getFieldDecorator('contact', {
            rules: [{ required: true, message: 'Please input your Phone Number!' }],
          })(<Input  /> )}
        </Form.Item>
        
        
        <Form.Item className="form-item" 
          label={"Shipping Address"}
        >
          {getFieldDecorator('shippingAddress', {
            rules: [{ required: false, message: 'Please input your Shipping Address if you are a Customer!', whitespace: true }],
          })(<Input />)}
        </Form.Item>
        

        <Form.Item className="form-item" 
          label={"Availability Status"}
        >
          {getFieldDecorator('availabilityStatus', {
            rules: [{ required: false, message: 'Please input your Availability Status!' }],
          })(<Input />)}
        </Form.Item>


        <Form.Item className="form-item" {...tailFormItemLayout}>
          {getFieldDecorator('agreement', {
            valuePropName: 'checked',
          })(
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>,
          )}
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
const RegistrationForm = Form.create({ name: 'register' })(registrationForm);

export default RegistrationForm