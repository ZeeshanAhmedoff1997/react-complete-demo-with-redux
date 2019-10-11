import React from 'react';
import { Layout } from 'antd';
import './Layout.css';

class EmptyLayout extends React.Component {

  render() {
    const { children } = this.props;

    return (
      <Layout style={{ height: '100vh' }}>
        { children }
      </Layout>
    );
  }
}

export default EmptyLayout;
