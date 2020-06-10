import React from 'react';
import { Layout, Menu } from 'antd';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import * as actions from '../store/actions/auth';

import $ from 'jquery';

const { Header, Content, Footer } = Layout;
const menuKeys = ['Greeting', 'Logout', 'List', 'Generator', 'Login'];

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
            [<Menu.Item key={menuKeys[0]} disabled style={{color:"white"}}>
              Hello, {localStorage.getItem('username')}
            </Menu.Item>,
            <Menu.Item key={menuKeys[1]} onClick={() => {this.changeMenuKey(menuKeys[1]); this.props.logout();}} style={{ float:'right' }}>
              Logout
            </Menu.Item>,
            <Menu.Item key={menuKeys[2]} onClick={() => this.changeMenuKey(menuKeys[2])}>
              <Link to="/">List</Link>
            </Menu.Item>,
            <Menu.Item key={menuKeys[3]} onClick={() => this.changeMenuKey(menuKeys[3])}>
              <Link to="/gen/">Generator</Link>
            </Menu.Item>]
            :
            <Menu.Item key={menuKeys[4]} style={{ float:'right' }} onClick={() => this.changeMenuKey(menuKeys[4])}>
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

  