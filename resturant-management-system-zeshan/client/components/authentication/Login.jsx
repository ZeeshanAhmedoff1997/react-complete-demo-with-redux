import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './Login.css';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/users';
import { Link } from 'react-router-dom';
class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const { email , password } = values;
        this.props.loginUser({email,password});
       }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
      <h1 className="Form-heading">Login </h1>
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item className="login-form-item">
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="email"
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
        <Form.Item className="login-form-item">
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
          {/* Or <Link to='/register'>Register now!</Link> */}
        </Form.Item>
      </Form>
      </div>
    );
  }
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

const mapStateToProps = ({ user }) => ({
  fetching: user.fetching,
});

const mapDispatchToProps = (dispatch) => ({
  loginUser: ({ email, password }) => {
    return dispatch(loginUser({ email, password }));
  }
});

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(WrappedNormalLoginForm);
