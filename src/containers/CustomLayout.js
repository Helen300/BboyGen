import React from 'react';
import { Layout, Menu } from 'antd';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import * as actions from '../store/actions/auth';

import $ from 'jquery';

const { Header, Content, Footer } = Layout;


class CustomLayout extends React.Component {

  state = {
      activeTab: ["1"],
  }

 /* componentWillReceiveProps(newProps) {
    console.log('~~~~~', newProps.isAuthenticated);
    if (newProps.isAuthenticated) {
      this.setState({
        activeTab: ["2"],
      })
    $('#itemList').click();
    document.getElementsByClassName('ant-menu-item-selected')[0].click();

    }
    else {
      this.setState({
        activeTab: ["1"],
      })
    }

  } */


  render () {
    return (

      <Layout className="layout">
      <Header>
      
        <Menu id="Menu" theme="dark" mode="horizontal" defaultSelectedKeys={["2"]} style={{ float:'left' }}>
        {
            // if authenticated = true we show logout 
            this.props.isAuthenticated ? 
            <Menu.Item key="0" disabled style={{color:"white"}}>
              Hello, {localStorage.getItem('username')}
            </Menu.Item>
            :
            null
        }

       {
          // if authenticated = true we show logout 
          this.props.isAuthenticated ? 

           <Menu.Item key="1" onClick={this.props.logout}>
            Logout
          </Menu.Item>

          :

          // else not authenticated 

          <Menu.Item key="1" >
            <Link to="/login/">Login</Link>
          </Menu.Item>
       }


       {
          // if authenticated = true we show logout 
          this.props.isAuthenticated ? 

            <Menu.Item key="2">
              <Link to="/">List</Link>
            </Menu.Item>

          :

          null
        }

        {
          // if authenticated = true we show logout 
          this.props.isAuthenticated ? 

            <Menu.Item key="3" onClick={() => this.setState({activeTab:["3"]})}><Link to="/gen/">Generator</Link></Menu.Item>

          :

          null
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

  