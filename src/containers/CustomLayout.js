import React from 'react';
import { Layout, Menu } from 'antd';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import * as actions from '../store/actions/auth';

import $ from 'jquery';

import { menuKeys } from "../constants"

const { Header, Content, Footer } = Layout;

class CustomLayout extends React.Component {

  state = {
    menuKey: ''
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
    return (

      <Layout className="layout">
      <Header>
      
        <Menu id="Menu" theme="dark" mode="horizontal" selectedKeys={[this.state.menuKey]}>
        {
            // if authenticated = true we show logout 
            this.props.isAuthenticated ? 
            [<Menu.Item key={menuKeys.GREETING} disabled style={{color:"white"}}>
              Hello, {localStorage.getItem('username')}
            </Menu.Item>,
            <Menu.Item key={menuKeys.LOGOUT} onClick={() => {this.changeMenuKey(menuKeys.LOGOUT); this.props.logout();}} style={{ float:'right' }}>
              Logout
            </Menu.Item>,
            <Menu.Item key={menuKeys.LIST} onClick={() => this.changeMenuKey(menuKeys.LIST)}>
              <Link to="/">List</Link>
            </Menu.Item>,
            <Menu.Item key={menuKeys.GENERATOR} onClick={() => this.changeMenuKey(menuKeys.GENERATOR)}>
              <Link to="/gen/">Generator</Link>
            </Menu.Item>]
            :
            <Menu.Item key={menuKeys.LOGIN} style={{ float:'right' }} onClick={() => this.changeMenuKey(menuKeys.LOGIN)}>
              <Link to="/login/">Login</Link>
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



const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(actions.logout())
    }
  }
}

export default withRouter(connect(null, mapDispatchToProps)(CustomLayout));

  