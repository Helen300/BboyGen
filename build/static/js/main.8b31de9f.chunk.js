(this.webpackJsonpbboyapp=this.webpackJsonpbboyapp||[]).push([[0],{155:function(e,t,n){e.exports=n(322)},322:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(8),l=n.n(o),i=n(10),c=n(11),s=n(13),u=n(12),m=n(37),p=n(17),h=n(9),d=n(16),f=n.n(d),v=n(57),g=n(32),y=n(325),b=n(326),E=function(e){Object(s.a)(n,e);var t=Object(u.a)(n);function n(){return Object(i.a)(this,n),t.apply(this,arguments)}return Object(c.a)(n,[{key:"render",value:function(){return r.a.createElement(b.a,{title:r.a.createElement("a",{href:"/moves/".concat(this.props.move.id,"/")},this.props.move.name)})}}]),n}(r.a.Component),O=function(e){Object(s.a)(n,e);var t=Object(u.a)(n);function n(){return Object(i.a)(this,n),t.apply(this,arguments)}return Object(c.a)(n,[{key:"render",value:function(){return r.a.createElement(y.b,{itemLayout:"horizontal",dataSource:this.props.data,renderItem:function(e){return r.a.createElement(y.b.Item,null,r.a.createElement(E,{move:e}))}})}}]),n}(r.a.Component),j=n(324),k=n(327),w=n(100),T=function(e){Object(s.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(i.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).onFinish=function(t,n,a,r,o){console.log(t);var l=t.move;t.type;switch(f.a.defaults.headers={"Content-Type":"application/json",Authorization:e.props.token},n){case"post":return f.a.post("/api/",{name:l}).then((function(e){return console.log(e)}),r()).catch((function(e){return console.err(e)}));case"put":return f.a.put("/api/".concat(a,"/"),{name:l}).then((function(e){return console.log(e)})).catch((function(e){return console.err(e)}))}},e}return Object(c.a)(n,[{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement(j.a,{onFinish:function(t){return e.onFinish(t,e.props.requestType,e.props.moveID,e.props.action,e.props.moves)}},r.a.createElement(j.a.Item,{name:"move",rules:[{required:!0}],label:"Name of Move"},r.a.createElement(k.a,{placeholder:"Name your move"})),r.a.createElement(j.a.Item,{name:"type",label:"Type of Move"},r.a.createElement(k.a,{placeholder:"Choose your type of move"})),r.a.createElement(j.a.Item,null,r.a.createElement(w.a,{type:"primary",htmlType:"submit"},this.props.btnText))))}}]),n}(r.a.Component),I=Object(p.b)((function(e){return{token:e.token}}))(T),A=n(153),C=n(146),S=n(329),D=n(330),x={labelCol:{xs:{span:24},sm:{span:4}},wrapperCol:{xs:{span:24},sm:{span:20}}},F={wrapperCol:{xs:{span:24,offset:0},sm:{span:20,offset:4}}},P=function(e){Object(s.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(i.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).onFinish=function(t,n,a,r){console.log("Received values of form:",t),f.a.defaults.headers={"Content-Type":"application/json",Authorization:e.props.token},console.log(t.moves);var o=t.moves;console.log(o),console.log("current moves",r);var l=r.concat(o);console.log("new moves",l),a(l);var i,c=Object(C.a)(o.entries());try{for(c.s();!(i=c.n()).done;){var s=Object(A.a)(i.value,2),u=(s[0],s[1]);switch(n){case"post":return f.a.post("/api/",{name:u}).then((function(e){return console.log(e)})).catch((function(e){return console.err(e)}))}}}catch(m){c.e(m)}finally{c.f()}},e}return Object(c.a)(n,[{key:"render",value:function(){var e=this;return r.a.createElement(j.a,Object.assign({name:"dynamic_form_item"},F,{onFinish:function(t){return e.onFinish(t,e.props.requestType,e.props.action,e.props.currMoves)}}),r.a.createElement(j.a.List,{name:"moves"},(function(e,t){var n=t.add,a=t.remove;return r.a.createElement("div",null,e.map((function(t,n){return r.a.createElement(j.a.Item,Object.assign({},0===n?x:F,{label:0===n?"Creating Moves":"",required:!1,key:t.key}),r.a.createElement(j.a.Item,Object.assign({},t,{validateTrigger:["onChange","onBlur"],rules:[{required:!0,whitespace:!0,message:"Please input the name of a move or delete this field."}],noStyle:!0}),r.a.createElement(k.a,{placeholder:"Name of Move",style:{width:"60%"}})),e.length>0?r.a.createElement(S.a,{className:"dynamic-delete-button",style:{margin:"0 8px"},onClick:function(){a(t.name)}}):null)})),r.a.createElement(j.a.Item,null,r.a.createElement(w.a,{type:"dashed",onClick:function(){n()},style:{width:"60%"}},r.a.createElement(D.a,null)," Add field")))})),r.a.createElement(j.a.Item,null,r.a.createElement(w.a,{type:"primary",htmlType:"submit"},this.props.btnText)))}}]),n}(r.a.Component),U=Object(p.b)((function(e){return{token:e.token}}))(P),_=function(e){Object(s.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(i.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={moves:[]},e}return Object(c.a)(n,[{key:"updateMoves",value:function(e){console.log("updating state"),this.setState({moves:e})}},{key:"handler",value:function(e){var t=this;console.log("updating page with new moves"),f.a.get("/api/").then((function(e){t.setState({moves:e.data}),console.log("printing data",e.data)}))}},{key:"componentWillReceiveProps",value:function(e){var t=this;console.log(e),e.token&&(f.a.defaults.headers={"Content-Type":"application/json",Authorization:e.token},f.a.get("/api/").then((function(e){t.setState({moves:e.data}),console.log("printing data",e.data)})))}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(v.a,null,r.a.createElement(g.a,{span:12},r.a.createElement(O,{data:this.state.moves})),r.a.createElement(g.a,{span:12},r.a.createElement(U,{requestType:"post",btnText:"Create",action:this.updateMoves.bind(this),currMoves:this.state.moves}))),r.a.createElement("br",null),r.a.createElement(I,{requestType:"post",moveID:null,btnText:"Create",moves:this.state.moves,action:this.handler.bind(this)}))}}]),n}(r.a.Component),q=Object(p.b)((function(e){return{token:e.token}}))(_),L=function(e){Object(s.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(i.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={move:{}},e.handleDelete=function(t){if(null!==e.props.token){var n=e.props.match.params.moveID;f.a.defaults.headers={"Content-Type":"application/json",Authorization:e.props.token},console.log("deleting move with ID: ",n),f.a.delete("/api/".concat(n,"/")),e.props.history.push("/")}},e}return Object(c.a)(n,[{key:"componentWillReceiveProps",value:function(e){var t=this;if(console.log(e),e.token){f.a.defaults.headers={"Content-Type":"application/json",Authorization:e.token};var n=this.props.match.params.moveID;console.log("moveID",n),f.a.get("/api/".concat(n,"/")).then((function(e){t.setState({move:e.data,moveID:n})}))}}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(b.a,{title:this.state.move.name},r.a.createElement("p",null,this.state.move.id)),r.a.createElement("form",{onSubmit:this.handleDelete},r.a.createElement(w.a,{type:"danger",htmlType:"submit"},"Delete")))}}]),n}(r.a.Component),H=Object(p.b)((function(e){return{token:e.token}}))(L),M=n(138),N=function(e){return{type:"AUTH_SUCCESS",token:e}},R=function(e){return{type:"AUTH_FAIL",error:e}},z=function(){return localStorage.removeItem("token"),localStorage.removeItem("expirationDate"),{type:"AUTH_LOGOUT"}},W=function(e){return function(t){setTimeout((function(){t(z())}),1e3*e)}},B=function(e){Object(s.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(i.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).onFinish=function(t){console.log("Trying to login with:",t),e.props.onAuth(t.username,t.password),e.props.history.push("/")},e.onFinishFailed=function(e){console.log("Failed:",e)},e}return Object(c.a)(n,[{key:"render",value:function(){var e=null;return this.props.error&&(e=r.a.createElement("p",null,this.props.error.message)),r.a.createElement("div",null,e,this.props.loading?r.a.createElement(M.a,null):r.a.createElement(j.a,{onFinish:this.onFinish,onFinishFailed:this.onFinishFailed},r.a.createElement(j.a.Item,{label:"Username",name:"username",rules:[{required:!0,message:"Please input your username!"}]},r.a.createElement(k.a,null)),r.a.createElement(j.a.Item,{label:"Password",name:"password",rules:[{required:!0,message:"Please input your password!"}]},r.a.createElement(k.a.Password,null)),r.a.createElement(j.a.Item,null,r.a.createElement(w.a,{type:"primary",htmlType:"submit"},"Login"),r.a.createElement("span",{style:{marginLeft:"0.5em"}},"OR"),r.a.createElement(m.c,{style:{marginLeft:"0.5em"},to:"/signup/"},"Sign Up"))))}}]),n}(r.a.Component),G=Object(p.b)((function(e){return{loading:e.loading,error:e.error}}),(function(e){return{onAuth:function(t,n){return e(function(e,t){return function(n){n({type:"AUTH_START"}),f.a.post("http://127.0.0.1:8000/rest-auth/login/",{username:e,password:t}).then((function(e){var t=e.data.key,a=new Date((new Date).getTime()+36e5);localStorage.setItem("token",t),localStorage.setItem("expirationDate",a),n(N(t)),n(W(3600))})).catch((function(e){n(R(e))}))}}(t,n))}}}))(B),J=n(151),V=n(331),X=function(e){Object(s.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(i.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).onFinish=function(t){console.log("Received values of form: ",t),e.props.onAuth(t.username,t.email,t.password,t.confirm),e.props.history.push("/")},e}return Object(c.a)(n,[{key:"render",value:function(){return r.a.createElement(j.a,{name:"register",onFinish:this.onFinish,scrollToFirstError:!0},r.a.createElement(j.a.Item,{name:"username",label:r.a.createElement("span",null,"Username\xa0",r.a.createElement(J.a,{title:"Choose a username."},r.a.createElement(V.a,null))),rules:[{required:!0,message:"Please input a username!",whitespace:!0}]},r.a.createElement(k.a,null)),r.a.createElement(j.a.Item,{name:"email",label:"E-mail",rules:[{type:"email",message:"The input is not valid E-mail!"},{required:!0,message:"Please input your E-mail!"}]},r.a.createElement(k.a,null)),r.a.createElement(j.a.Item,{name:"password",label:"Password",rules:[{required:!0,message:"Please input your password!"}],hasFeedback:!0},r.a.createElement(k.a.Password,null)),r.a.createElement(j.a.Item,{name:"confirm",label:"Confirm Password",dependencies:["password"],hasFeedback:!0,rules:[{required:!0,message:"Please confirm your password!"},function(e){var t=e.getFieldValue;return{validator:function(e,n){return n&&t("password")!==n?Promise.reject("The two passwords that you entered do not match!"):Promise.resolve()}}}]},r.a.createElement(k.a.Password,null)),r.a.createElement(j.a.Item,null,r.a.createElement(w.a,{type:"primary",htmlType:"submit"},"Signup")))}}]),n}(r.a.Component),K=Object(p.b)((function(e){return{loading:e.loading,error:e.error}}),(function(e){return{onAuth:function(t,n,a,r){return e(function(e,t,n,a){return function(r){r({type:"AUTH_START"}),f.a.post("http://127.0.0.1:8000/rest-auth/registration/",{username:e,email:t,password1:n,password2:a}).then((function(e){var t=e.data.key,n=new Date((new Date).getTime()+36e5);localStorage.setItem("token",t),localStorage.setItem("expirationDate",n),r(N(t)),r(W(3600))})).catch((function(e){r(R(e))}))}}(t,n,a,r))}}}))(X),$=function(){return r.a.createElement("div",null,r.a.createElement(h.a,{exact:!0,path:"/",component:q}),r.a.createElement(h.a,{exact:!0,path:"/moves/:moveID/",component:H}),r.a.createElement(h.a,{exact:!0,path:"/login/",component:G}),r.a.createElement(h.a,{exact:!0,path:"/signup/",component:K}))},Q=(n(319),n(323)),Y=n(328),Z=Q.a.Header,ee=Q.a.Content,te=Q.a.Footer,ne=function(e){Object(s.a)(n,e);var t=Object(u.a)(n);function n(){return Object(i.a)(this,n),t.apply(this,arguments)}return Object(c.a)(n,[{key:"render",value:function(){return r.a.createElement(Q.a,{className:"layout"},r.a.createElement(Z,null,r.a.createElement("div",{className:"logo",style:{width:"120px",height:"31px",background:"rgba(255, 255, 255, 0.2)",margin:"16px 24px 16px 0",float:"left"}}),r.a.createElement(Y.a,{theme:"dark",mode:"horizontal",defaultSelectedKeys:["2"],style:{float:"left"}},this.props.isAuthenticated?r.a.createElement(Y.a.Item,{key:"1",onClick:this.props.logout},"Logout"):r.a.createElement(Y.a.Item,{key:"1"},r.a.createElement(m.b,{to:"/login/"},"Login")),r.a.createElement(Y.a.Item,{key:"2"},r.a.createElement(m.b,{to:"/"},"List")),r.a.createElement(Y.a.Item,{key:"3"},r.a.createElement(m.b,{to:"/"},"Generator")))),r.a.createElement(ee,{style:{padding:"0 50px"}},r.a.createElement("div",{className:"site-layout-content",style:{background:"#fff",padding:"24px",minHeight:"280px"}},this.props.children)),r.a.createElement(te,{style:{textAlign:"center"}},"Ant Design \xa92018 Created by Ant UED"))}}]),n}(r.a.Component),ae=Object(h.e)(Object(p.b)(null,(function(e){return{logout:function(){return e(z())}}}))(ne)),re=function(e){Object(s.a)(n,e);var t=Object(u.a)(n);function n(){return Object(i.a)(this,n),t.apply(this,arguments)}return Object(c.a)(n,[{key:"componentDidMount",value:function(){this.props.onTryAutoSignup()}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(m.a,null,r.a.createElement(ae,this.props,r.a.createElement($,null))))}}]),n}(a.Component),oe=Object(p.b)((function(e){return{isAuthenticated:null!=e.token}}),(function(e){return{onTryAutoSignup:function(){return e((function(e){var t=localStorage.getItem("token");if(void 0==t)e(z());else{var n=new Date(localStorage.getItem("expirationDate"));n<=new Date?e(z()):(e(N(t)),e(W((n.getTime()-(new Date).getTime())/1e3)))}}))}}}))(re);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var le=n(55),ie=n(149),ce=n(101),se=function(e,t){return Object(ce.a)(Object(ce.a)({},e),t)},ue={token:null,error:null,loading:!1},me=function(e,t){return se(e,{error:null,loading:!0})},pe=function(e,t){return se(e,{token:t.token,error:null,loading:!1})},he=function(e,t){return se(e,{error:t.error,loading:!1})},de=function(e,t){return se(e,{token:null})},fe=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ue,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"AUTH_START":return me(e);case"AUTH_SUCCESS":return pe(e,t);case"AUTH_FAIL":return he(e,t);case"AUTH_LOGOUT":return de(e);default:return e}},ve=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||le.c,ge=Object(le.d)(fe,ve(Object(le.a)(ie.a))),ye=r.a.createElement(p.a,{store:ge},r.a.createElement(oe,null));l.a.render(ye,document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[155,1,2]]]);
//# sourceMappingURL=main.8b31de9f.chunk.js.map