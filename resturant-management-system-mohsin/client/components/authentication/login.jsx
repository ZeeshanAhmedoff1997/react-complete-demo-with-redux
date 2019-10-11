import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Link } from 'react-router-dom';

import 'antd/dist/antd.css';
 import './index.css'

 import { connect } from 'react-redux'
 import { loginUser } from '../../actions/users'

class loginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values.email  , values.password);
        const {email,password} = values;
        this.props.loginUser({email  , password});
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>

        <Form onSubmit={this.handleSubmit} className="login-form">
          <br />
          <h1 className="h">Please Login here!</h1>
          <br /><br />
          <Form.Item className="login-form-item">
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />,
            )}
          </Form.Item>

          <Form.Item className="login-form-item">
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>

          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>Remember me</Checkbox>)}
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or <Link to="/register">register now!</Link>
          </Form.Item>
          
        </Form>
      </div>
    );
  }
}

const LoginForm = Form.create({ name: 'normal_login' })(loginForm);

const mapDispatchToProps = (dispatch) => ({
    loginUser: ({email,password}) => dispatch( loginUser({email,password}) )
}) 

const mapStateToProps = (state) => ({ 
    // users: state.user, 
})

export default connect(mapStateToProps , mapDispatchToProps)(LoginForm) ;
          