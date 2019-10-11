import React from 'react';
import { Layout, Menu, Breadcrumb, Icon, Dropdown } from 'antd';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { logoutUser } from '../actions/admin';

import './Layout.css';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class AdminLayout extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
    localStorage.setItem('isSideBarCollapsed', collapsed);
  }

  logout = () => {
    const { logoutUser } = this.props;
    logoutUser();
  }

  render() {
    const { collapsed } = this.state;
    const { children, user } = this.props;

    return (
      <Layout style={{ height: '100vh' }}>
        <Sider
          collapsible
          collapsed={localStorage.getItem('isSideBarCollapsed') == "true"}
          onCollapse={this.onCollapse}
        >
          <div className="app-layout-logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            
            <SubMenu key="sub0" title={<span><Icon type="user" /><span>{user.name}</span></span>}>
              <Menu.Item key="0" onClick={this.logout}><Icon type="logout" /><span>Logout</span></Menu.Item>
            </SubMenu>

            <Menu.Item key="1">
              <Link to="/users">
                <Icon type="table" />
                <span>Users</span>
              </Link>
            </Menu.Item>

            <Menu.Item key="2">
              <Link to="/items">
                <Icon type="shopping-cart" />
                <span>Items</span>
              </Link>
            </Menu.Item>

            <Menu.Item key="3">
              <Link to="/all-items">
                <Icon type="table" />
                <span>Items Grid</span>
              </Link>
            </Menu.Item>

          </Menu>
        </Sider>
        <Layout>
          <Content>
            { children }
          </Content>
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

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(withRouter(AdminLayout));
