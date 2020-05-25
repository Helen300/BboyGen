(this.webpackJsonpbboyapp=this.webpackJsonpbboyapp||[]).push([[0],{150:function(e,t,n){e.exports=n(319)},319:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(8),l=n.n(o),c=n(13),i=n(14),u=n(16),s=n(15),m=n(31),p=n(34),h=n(10),d=n(29),f=n.n(d),g=n(323),v=function(e){Object(u.a)(n,e);var t=Object(s.a)(n);function n(){return Object(c.a)(this,n),t.apply(this,arguments)}return Object(i.a)(n,[{key:"render",value:function(){return r.a.createElement(g.b,{itemLayout:"horizontal",dataSource:this.props.data,renderItem:function(e){return r.a.createElement(g.b.Item,null,r.a.createElement(g.b.Item.Meta,{title:r.a.createElement("a",{href:"/".concat(e.id)},e.name),description:e.id}))}})}}]),n}(r.a.Component),E=n(322),y=n(325),b=n(47),O=function(e){Object(u.a)(n,e);var t=Object(s.a)(n);function n(){var e;Object(c.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).onFinish=function(e,t,n,a,r){console.log(e);var o=e.move;e.type;switch(t){case"post":return f.a.post("http://127.0.0.1:8000/api/",{name:o}).then((function(e){return console.log(e)}),a()).catch((function(e){return console.err(e)}));case"put":return f.a.put("http://127.0.0.1:8000/api/".concat(n,"/"),{name:o}).then((function(e){return console.log(e)})).catch((function(e){return console.err(e)}))}},e}return Object(i.a)(n,[{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement(E.a,{onFinish:function(t){return e.onFinish(t,e.props.requestType,e.props.moveID,e.props.action,e.props.moves)}},r.a.createElement(E.a.Item,{name:"move",rules:[{required:!0}],label:"Name of Move"},r.a.createElement(y.a,{placeholder:"Name your move"})),r.a.createElement(E.a.Item,{name:"type",label:"Type of Move"},r.a.createElement(y.a,{placeholder:"Choose your type of move"})),r.a.createElement(E.a.Item,null,r.a.createElement(b.a,{type:"primary",htmlType:"submit"},this.props.btnText))))}}]),n}(r.a.Component),w=function(e){Object(u.a)(n,e);var t=Object(s.a)(n);function n(){var e;Object(c.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={moves:[]},e}return Object(i.a)(n,[{key:"handler",value:function(e){var t=this;console.log("updating page with new moves"),f.a.get("http://localhost:8000/api/").then((function(e){t.setState({moves:e.data}),console.log("printing data",e.data)}))}},{key:"componentDidMount",value:function(){var e=this;f.a.get("http://localhost:8000/api/").then((function(t){e.setState({moves:t.data}),console.log("printing data",t.data)}))}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(v,{data:this.state.moves}),r.a.createElement("br",null),r.a.createElement("h2",null,"Create a Move"),r.a.createElement(O,{requestType:"post",moveID:null,btnText:"Create",moves:this.state.moves,action:this.handler.bind(this)}))}}]),n}(r.a.Component),j=n(324),I=function(e){Object(u.a)(n,e);var t=Object(s.a)(n);function n(){var e;Object(c.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={move:{}},e.handleDelete=function(t){var n=e.props.match.params.moveID;console.log("deleting move with ID: ",n),f.a.delete("http://127.0.0.1:8000/api/".concat(n,"/")),e.props.history.push("/")},e}return Object(i.a)(n,[{key:"componentDidMount",value:function(){var e=this,t=this.props.match.params.moveID;console.log("moveID",t),f.a.get("http://127.0.0.1:8000/api/".concat(t)).then((function(n){e.setState({move:n.data,moveID:t})}))}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(j.a,{title:this.state.move.name},r.a.createElement("p",null,this.state.move.id)),r.a.createElement("form",{onSubmit:this.handleDelete},r.a.createElement(b.a,{type:"danger",htmlType:"submit"},"Delete")))}}]),n}(r.a.Component),T=n(132),k=function(e){return{type:"AUTH_SUCCESS",token:e}},A=function(e){return{type:"AUTH_FAIL",error:e}},S=function(){return localStorage.removeItem("token"),localStorage.removeItem("expirationDate"),{type:"AUTH_LOGOUT"}},D=function(e){return function(t){setTimeout((function(){t(S())}),1e3*e)}},F=function(e){Object(u.a)(n,e);var t=Object(s.a)(n);function n(){var e;Object(c.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).onFinish=function(t){console.log("Trying to login with:",t),e.props.onAuth(t.username,t.password),e.props.history.push("/")},e.onFinishFailed=function(e){console.log("Failed:",e)},e}return Object(i.a)(n,[{key:"render",value:function(){var e=null;return this.props.error&&(e=r.a.createElement("p",null,this.props.error.message)),r.a.createElement("div",null,e,this.props.loading?r.a.createElement(T.a,null):r.a.createElement(E.a,{onFinish:this.onFinish,onFinishFailed:this.onFinishFailed},r.a.createElement(E.a.Item,{label:"Username",name:"username",rules:[{required:!0,message:"Please input your username!"}]},r.a.createElement(y.a,null)),r.a.createElement(E.a.Item,{label:"Password",name:"password",rules:[{required:!0,message:"Please input your password!"}]},r.a.createElement(y.a.Password,null)),r.a.createElement(E.a.Item,null,r.a.createElement(b.a,{type:"primary",htmlType:"submit"},"Login"),r.a.createElement("span",{style:{marginLeft:"0.5em"}},"OR"),r.a.createElement(m.c,{style:{marginLeft:"0.5em"},to:"/signup/"},"Sign Up"))))}}]),n}(r.a.Component),x=Object(p.b)((function(e){return{loading:e.loading,error:e.error}}),(function(e){return{onAuth:function(t,n){return e(function(e,t){return function(n){n({type:"AUTH_START"}),f.a.post("http://127.0.0.1:8000/rest-auth/login/",{username:e,password:t}).then((function(e){var t=e.data.key,a=new Date((new Date).getTime()+36e5);localStorage.setItem("token",t),localStorage.setItem("expirationDate",a),n(k(t)),n(D(3600))})).catch((function(e){n(A(e))}))}}(t,n))}}}))(F),C=n(148),U=n(327),_=function(e){Object(u.a)(n,e);var t=Object(s.a)(n);function n(){var e;Object(c.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).onFinish=function(t){console.log("Received values of form: ",t),e.props.onAuth(t.username,t.email,t.password,t.confirm),e.props.history.push("/")},e}return Object(i.a)(n,[{key:"render",value:function(){return r.a.createElement(E.a,{name:"register",onFinish:this.onFinish,scrollToFirstError:!0},r.a.createElement(E.a.Item,{name:"username",label:r.a.createElement("span",null,"Username\xa0",r.a.createElement(C.a,{title:"Choose a username."},r.a.createElement(U.a,null))),rules:[{required:!0,message:"Please input a username!",whitespace:!0}]},r.a.createElement(y.a,null)),r.a.createElement(E.a.Item,{name:"email",label:"E-mail",rules:[{type:"email",message:"The input is not valid E-mail!"},{required:!0,message:"Please input your E-mail!"}]},r.a.createElement(y.a,null)),r.a.createElement(E.a.Item,{name:"password",label:"Password",rules:[{required:!0,message:"Please input your password!"}],hasFeedback:!0},r.a.createElement(y.a.Password,null)),r.a.createElement(E.a.Item,{name:"confirm",label:"Confirm Password",dependencies:["password"],hasFeedback:!0,rules:[{required:!0,message:"Please confirm your password!"},function(e){var t=e.getFieldValue;return{validator:function(e,n){return n&&t("password")!==n?Promise.reject("The two passwords that you entered do not match!"):Promise.resolve()}}}]},r.a.createElement(y.a.Password,null)),r.a.createElement(E.a.Item,null,r.a.createElement(b.a,{type:"primary",htmlType:"submit"},"Signup")))}}]),n}(r.a.Component),P=Object(p.b)((function(e){return{loading:e.loading,error:e.error}}),(function(e){return{onAuth:function(t,n,a,r){return e(function(e,t,n,a){return function(r){r({type:"AUTH_START"}),f.a.post("http://127.0.0.1:8000/rest-auth/registration/",{username:e,email:t,password1:n,password2:a}).then((function(e){var t=e.data.key,n=new Date((new Date).getTime()+36e5);localStorage.setItem("token",t),localStorage.setItem("expirationDate",n),r(k(t)),r(D(3600))})).catch((function(e){r(A(e))}))}}(t,n,a,r))}}}))(_),L=function(){return r.a.createElement("div",null,r.a.createElement(h.a,{exact:!0,path:"/",component:w}),r.a.createElement(h.a,{exact:!0,path:"/moves/:moveID/",component:I}),r.a.createElement(h.a,{exact:!0,path:"/login/",component:x}),r.a.createElement(h.a,{exact:!0,path:"/signup/",component:P}))},H=(n(314),n(321)),q=n(96),M=n(326),N=H.a.Header,R=H.a.Content,G=H.a.Footer,z=function(e){Object(u.a)(n,e);var t=Object(s.a)(n);function n(){return Object(c.a)(this,n),t.apply(this,arguments)}return Object(i.a)(n,[{key:"render",value:function(){return r.a.createElement(H.a,{className:"layout"},r.a.createElement(N,null,r.a.createElement("div",{className:"logo",style:{width:"120px",height:"31px",background:"rgba(255, 255, 255, 0.2)",margin:"16px 24px 16px 0",float:"left"}}),r.a.createElement(q.a,{theme:"dark",mode:"horizontal",defaultSelectedKeys:["2"],style:{float:"left"}},this.props.isAuthenticated?r.a.createElement(q.a.Item,{key:"1",onClick:this.props.logout},"Logout"):r.a.createElement(q.a.Item,{key:"1"},r.a.createElement(m.b,{to:"/login/"},"Login")),r.a.createElement(q.a.Item,{key:"2"},r.a.createElement(m.b,{to:"/"},"List")),r.a.createElement(q.a.Item,{key:"3"},r.a.createElement(m.b,{to:"/"},"Generator")))),r.a.createElement(R,{style:{padding:"0 50px"}},r.a.createElement(M.a,{style:{margin:"16px 0"}},r.a.createElement(M.a.Item,null,"Home"),r.a.createElement(M.a.Item,null,r.a.createElement(m.b,null,"List")),r.a.createElement(M.a.Item,null,r.a.createElement(m.b,null,"App"))),r.a.createElement("div",{className:"site-layout-content",style:{background:"#fff",padding:"24px",minHeight:"280px"}},this.props.children)),r.a.createElement(G,{style:{textAlign:"center"}},"Ant Design \xa92018 Created by Ant UED"))}}]),n}(r.a.Component),B=Object(h.e)(Object(p.b)(null,(function(e){return{logout:function(){return e(S())}}}))(z)),J=function(e){Object(u.a)(n,e);var t=Object(s.a)(n);function n(){return Object(c.a)(this,n),t.apply(this,arguments)}return Object(i.a)(n,[{key:"componentDidMount",value:function(){this.props.onTryAutoSignup()}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(m.a,null,r.a.createElement(B,this.props,r.a.createElement(L,null))))}}]),n}(a.Component),V=Object(p.b)((function(e){return{isAuthenticated:null!=e.token}}),(function(e){return{onTryAutoSignup:function(){return e((function(e){var t=localStorage.getItem("token");if(void 0==t)e(S());else{var n=new Date(localStorage.getItem("expirationDate"));n<=new Date?e(S()):(e(k(t)),e(D((n.getTime()-(new Date).getTime())/1e3)))}}))}}}))(J);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var W=n(54),X=n(146),K=n(97),$=function(e,t){return Object(K.a)(Object(K.a)({},e),t)},Q={token:null,error:null,loading:!1},Y=function(e,t){return $(e,{error:null,loading:!0})},Z=function(e,t){return $(e,{token:t.token,error:null,loading:!1})},ee=function(e,t){return $(e,{error:t.error,loading:!1})},te=function(e,t){return $(e,{token:null})},ne=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Q,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"AUTH_START":return Y(e);case"AUTH_SUCCESS":return Z(e,t);case"AUTH_FAIL":return ee(e,t);case"AUTH_LOGOUT":return te(e);default:return e}},ae=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||W.c,re=Object(W.d)(ne,ae(Object(W.a)(X.a))),oe=r.a.createElement(p.a,{store:re},r.a.createElement(V,null));l.a.render(oe,document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[150,1,2]]]);
//# sourceMappingURL=main.0806a1c1.chunk.js.map