import React from 'react'
import axios from 'axios'
// STYLING AND COMPONENTS TYPE STUFF 
import { Layout, Menu } from 'antd'
import { menuKeys, tabNames } from "../constants"
import BaseRouter from '../routes'

import "../css/containers/CustomLayout.css"

// AUTH0 and REQUEST STUFF
import { getCookie } from "../utils/getCookie"
import { withAuth0 } from '@auth0/auth0-react'
import { Link, withRouter } from 'react-router-dom'
import { Spin } from 'antd';

// import { connect } from 'react-redux'
// import * as actions from '../store/actions/auth'

const { Header, Content, Footer } = Layout;

class CustomLayout extends React.Component {

  state = {
    menuKey: '', 
    userExists: false, 
    hideSomeButtons: false
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
        window.addEventListener('resize', this.updateWindowWidth);
    }
  }

  componentWillUnmount(){
      if (typeof window !== 'undefined') {
          window.removeEventListener('storage', this.updateMenuKey)
          window.removeEventListener('resize', this.updateWindowWidth)
      }
  }

  updateWindowWidth() {
    if(window.innerWidth < 800){
      this.setState({
        hideSomeButtons: true
      })
    } else {
      this.setState({
        hideSomeButtons: false
      })
    }
  }

  constructor(props) {
    super(props)
    this.updateWindowWidth = this.updateWindowWidth.bind(this)
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
    loginWithRedirect()
  }

  authLogout() {
    const { user, error, isAuthenticated, logout } = this.props.auth0
    logout({
        returnTo: window.location.origin,
    });
    localStorage.removeItem('userId')

  }

  createUserProfile(user) {
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
    const csrftoken = getCookie('csrftoken')
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
    .then(res => {
      this.setState({
        userExists: true
      })
    })
  }

  checkUserProfile () {
    const { user, error, isAuthenticated } = this.props.auth0
    if (user === null) {
      return
    }
    var apiUrl = '/api/userprofiles/'.concat(user['sub'])
    apiUrl = apiUrl.concat('/')
    axios.get(apiUrl)
    .then(res => {
      this.setState({
        userExists: true
      })
    })
    .catch(error => {
      this.createUserProfile(user)
    })
  }

  render () {
    const { user, error, isAuthenticated, logout, isLoading } = this.props.auth0
    if (error) {
      return <div>Oops... {error.message}</div>;
    }
    if(isAuthenticated && !this.state.userExists) {
      this.checkUserProfile()
      localStorage.setItem('userId', user['sub'])
    }
    if (isLoading || (isAuthenticated && !this.state.userExists)) {
      return <div style={{ right: "50%", bottom: "50%", transform: "translate(50%,50%)", position: "absolute"}}>
                <Spin tip="Bboy Generating..." size="large" />
             </div>;
    }

    return (
      <Layout className="layout">
      <Header>
      
        <Menu id="Menu" theme="dark" mode="horizontal" selectedKeys={[this.state.menuKey]}>
        {
            // if authenticated = true we show logout 
            isAuthenticated ? 
            [
            !this.state.hideSomeButtons ?
            <Menu.Item key={menuKeys.GREETING} style={{cursor: "default"}}>
              Hello, {user['given_name'] != null ? user['given_name'] : user['nickname']}
            </Menu.Item>
            :
            null
            ,
            !this.state.hideSomeButtons ?
            <Menu.Item key={"Logo"} class="Logo" style={{cursor: "default", float:"left", paddingLeft: 0, paddingRight: 0}}>
              <img src={ require('../img/Logo.png') } style={{ height: 50, width:"auto" }}/>
            </Menu.Item>
            :
            null
            ,
            <Menu.Item key={menuKeys.LOGOUT} onClick={() => {this.changeMenuKey(menuKeys.LOGOUT); this.authLogout();}} style={{ float:'right' }}>
              <Link>Logout</Link>
            </Menu.Item>,
            // don't show this button when width is too small
            !this.state.hideSomeButtons ?
            <Menu.Item key={"Feedback"} onClick={() => window.open("https://forms.gle/3vdQAjVWtsxDVyvK6", "_blank")} style={{ float:'right' }}>
              <Link>Feedback</Link>
            </Menu.Item>
            :
            null
            ,
            <Menu.Item key={menuKeys.LIST} onClick={() => this.changeMenuKey(menuKeys.LIST)}>
              <Link to="/">List</Link>
            </Menu.Item>,
            <Menu.Item key={menuKeys.GENERATOR} onClick={() => this.changeMenuKey(menuKeys.GENERATOR)}>
              <Link to="/gen/">Generator</Link>
            </Menu.Item>,
            <Menu.Item key={menuKeys.TRAINING} onClick={() => this.changeMenuKey(menuKeys.TRAINING)}>
              <Link to="/training/">Training</Link>
            </Menu.Item>,
            ]
            :
            [
            <Menu.Item key={"Logo"} style={{cursor: "default", float:"left", paddingLeft: 0, paddingRight: 0}}>
              <img src={ require('../img/Logo.png') } style={{ height: 50, width:"auto" }}/>
            </Menu.Item>,
            <Menu.Item key={menuKeys.LOGIN} style={{ float:'right' }} onClick={() => {this.authLogin();}}>
              <Link>Login</Link>
            </Menu.Item>
            ]
        }

        </Menu>
      </Header>
      <Content className="Content">
          <div className="site-layout-content"
          style={{ background: '#fff', padding: '3%', height: '100%' }}>
            {/* class based takes this. */}
            {this.props.children}
          </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>{/*Ant Design ©2018 Created by Ant UED*/}</Footer>
    </Layout>
    );
  }
}



export default withAuth0(CustomLayout);