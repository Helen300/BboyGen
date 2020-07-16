import React from 'react';
import { Layout, Menu } from 'antd';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import * as actions from '../store/actions/auth';

import $ from 'jquery';

import { menuKeys } from "../constants"
import "../css/containers/CustomLayout.css"


import { withAuth0 } from '@auth0/auth0-react';

const { Header, Content, Footer } = Layout;

class CustomLayout extends React.Component {

  state = {
    menuKey: ''
  }

  componentDidMount() {
      if (typeof window !== 'undefined') {
          this.setState({
            menuKey: localStorage.getItem('menuKey')
          })
          window.addEventListener('storage', this.updateMenuKey)
      }
  }

  componentWillUnmount(){
      if (typeof window !== 'undefined') {
          window.removeEventListener('storage', this.updateMenuKey)
      }
  }

  updateMenuKey() {
    this.setState({
      menuKey: localStorage.getItem('menuKey')
    })
  }

  componentWillReceiveProps() {
    this.setState({
      menuKey: localStorage.getItem('menuKey')
    })
  }

  changeMenuKey = (newKey) => {
    this.setState({
      menuKey: newKey
    })
    localStorage.setItem('menuKey', newKey)
  }

  render () {
    const { user, error, getAccessTokenSilently, isAuthenticated, loginWithRedirect, logout } = this.props.auth0;
    const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin,
    });
    console.log(isAuthenticated);
    console.log('AUTHOOOOO', this.props.auth0);
    console.log(getAccessTokenSilently);

    return (

      <Layout className="layout">
      <Header>
      
        <Menu id="Menu" theme="dark" mode="horizontal" selectedKeys={[this.state.menuKey]}>
        {
            // if authenticated = true we show logout 
            isAuthenticated ? 
            [<Menu.Item key={menuKeys.GREETING} disabled style={{color:"white"}}>
              Hello, {user['given_name']}
            </Menu.Item>,
            <Menu.Item key={menuKeys.LOGOUT} onClick={() => {this.changeMenuKey(menuKeys.LOGOUT); logoutWithRedirect();}} style={{ float:'right' }}>
              <Link>Logout</Link>
            </Menu.Item>,
            <Menu.Item key={menuKeys.LIST} onClick={() => this.changeMenuKey(menuKeys.LIST)}>
              <Link to="/">List</Link>
            </Menu.Item>,
            <Menu.Item key={menuKeys.GENERATOR} onClick={() => this.changeMenuKey(menuKeys.GENERATOR)}>
              <Link to="/gen/">Generator</Link>
            </Menu.Item>,
            <Menu.Item key={menuKeys.TRAINING} onClick={() => this.changeMenuKey(menuKeys.TRAINING)}>
              <Link to="/training/">Training</Link>
            </Menu.Item>]
            :
            <Menu.Item key={menuKeys.LOGIN} style={{ float:'right' }} onClick={() => {this.changeMenuKey(menuKeys.LIST); loginWithRedirect();}}>
              <Link>Login</Link>
            </Menu.Item>
        }

        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content"
          style={{ background: '#fff', padding: '24px', minHeight: '50em' }}>
            {/* class based takes this. */}
            {this.props.children}
          </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
    );
  }
}



export default withAuth0(CustomLayout);

  