import React from 'react'
import axios from 'axios'
// STYLING AND COMPONENTS TYPE STUFF 
import { Layout, Menu } from 'antd'
import { menuKeys, tabNames } from "../constants"

import "../css/containers/CustomLayout.css"

// AUTH0 and REQUEST STUFF
import { getCookie } from "../utils/getCookie"
import { withAuth0 } from '@auth0/auth0-react'
import { Link, withRouter } from 'react-router-dom'
// import { connect } from 'react-redux'
// import * as actions from '../store/actions/auth'

const { Header, Content, Footer } = Layout;

class CustomLayout extends React.Component {

  state = {
    menuKey: ''
  }

  componentDidMount() {
    const { user, error, isAuthenticated} = this.props.auth0
    
    if (isAuthenticated && user != null) {
      localStorage.setItem('userId', user['sub'])
    }

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
    const { user, error, isAuthenticated} = this.props.auth0
    
    if (isAuthenticated && user != null) {
      localStorage.setItem('userId', user['sub'])
    }

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


  authLogin () {
    const { user, error, isAuthenticated, loginWithRedirect } = this.props.auth0
    // call login 
    loginWithRedirect(); 
    
  }

  authLogout() {
    const { user, error, isAuthenticated, logout } = this.props.auth0
    console.log('user id - ', localStorage.getItem('userId'))
    logout({
        returnTo: window.location.origin,
    });
    localStorage.removeItem('userId')

  }


  checkUserProfile () {
    const { user, error, isAuthenticated } = this.props.auth0

    const csrftoken = getCookie('csrftoken')
    var apiUrl = '/api/userprofiles/'.concat(user['sub'])
    apiUrl = apiUrl.concat('/')
    axios.get(apiUrl)
    .then(res => {
      console.log(res.data);
      if (res.data != null) {
        return true
      }
    })
    .catch(error => {
      console.error(error)
      console.log('DOES NOT EXIST')
      var testProbs = {}
      var uni = 1 / (tabNames.length - 1)
      testProbs[tabNames[1]] = [uni, uni, uni, uni]
      testProbs[tabNames[2]] = [uni, uni, uni, uni]
      testProbs[tabNames[3]] = [uni, uni, uni, uni]
      testProbs[tabNames[4]] = [uni, uni, uni, uni]
      var initDurations = {}
      initDurations.types = {
        [tabNames[1]]: 2,
        [tabNames[2]]: 2,
        [tabNames[3]]: 2,
        [tabNames[4]]: 2
      }
      initDurations.moves = {}
      var newProbs = {"typeProbs": testProbs, "reverseProb": 0.5}
      axios.defaults.headers = {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken
      }
      axios.post('/api/userprofiles/', {
        // the data that gets posted 
          username: user['email'],
          email: user['email'],
          userId: user['sub'], 
          moveList: [],
          setList: [],
          probs: newProbs,
          durations: initDurations
      })
    })
    return true
  }


  render () {
    const { user, error, isAuthenticated, logout } = this.props.auth0
    if (user != null) {
      localStorage.setItem('userId', user['sub'])
    }
    return (

      <Layout className="layout">
      <Header>
      
        <Menu id="Menu" theme="dark" mode="horizontal" selectedKeys={[this.state.menuKey]}>
        {
            // if authenticated = true we show logout 
            isAuthenticated && this.checkUserProfile() ? 
            [<Menu.Item key={menuKeys.GREETING} disabled style={{color:"white"}}>
              Hello, {user['given_name'] != null ? user['given_name'] : user['nickname']}
            </Menu.Item>,
            <Menu.Item key={menuKeys.LOGOUT} onClick={() => {this.changeMenuKey(menuKeys.LOGOUT); this.authLogout();}} style={{ float:'right' }}>
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
            <Menu.Item key={menuKeys.LOGIN} style={{ float:'right' }} onClick={() => {this.changeMenuKey(menuKeys.LIST); this.authLogin();}}>
              <Link>Login/Signup</Link>
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