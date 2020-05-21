import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {Link} from 'react-router-dom';

const { Header, Content, Footer } = Layout;

const CustomLayout = (props) => {
  return (

    <Layout className="layout">
    <Header>
      <div className="logo"
      style={{ width: '120px', height: '31px', background: 'rgba(255, 255, 255, 0.2)', margin: '16px 24px 16px 0', float: 'left' }}/>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} style={{ float:'left' }}>
        <Menu.Item key="1">Login</Menu.Item>
        <Menu.Item key="2">List</Menu.Item>
        <Menu.Item key="3">Generator</Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        {/* link is like an anchor tag, takes you to defined location'*/}
        <Breadcrumb.Item><Link to='/'>Home</Link></Breadcrumb.Item>
        <Breadcrumb.Item><Link>List</Link></Breadcrumb.Item>
        <Breadcrumb.Item><Link>App</Link></Breadcrumb.Item>
      </Breadcrumb>
        <div className="site-layout-content"
        style={{ background: '#fff', padding: '24px', minHeight: '280px' }}>
          {props.children}
        </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>
  );

}

export default CustomLayout;
  