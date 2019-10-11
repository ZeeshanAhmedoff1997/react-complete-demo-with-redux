import React from 'react';
import { Layout } from 'antd';
import './Layout.css';

class AppLayout extends React.Component {

  render() {
    const { children } = this.props;

    return (
        <div>
            <Layout style={{ height: '100vh' }}>
                { children }
            </Layout>
        </div>
    );
  }
}

export default AppLayout;
