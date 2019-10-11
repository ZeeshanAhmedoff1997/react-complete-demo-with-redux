import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { Upload, Button,Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { logoutUser } from '../actions/users';

const { Header, Sider, Content } = Layout;
import './styles.css';
class AdminLayout extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  logout = () => {
    console.log('logout button is clicked');
    // const { logoutUser } = this.props;
    this.props.logoutUser();
  }
  render() {
    return (
      <Layout style={{ height: '100vh' }}>
        <Sider 
           trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="0">
              <Icon type="home" />
              <span>Home</span>
            </Menu.Item>
            <Menu.Item key="1">
              <Icon type="user" />
              <span>User Panel</span>
              <Link to="/">
                User    
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
            <Icon type="shop" />
              <span>Item Panel</span>
              <Link to="/items">
                Items    
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
            <Icon type="setting" />
              <span>Setting</span>
            </Menu.Item>
            <Menu.Item key="4" onClick={this.logout}>
            <Icon type="logout" />
              <span>Log out</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Tangerine" />
            <p className="w3-tangerine">Admin Panel</p>
          </Header>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => {
    return dispatch(logoutUser());
  }
});

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(AdminLayout);
