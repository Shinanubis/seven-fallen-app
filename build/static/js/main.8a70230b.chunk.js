(this["webpackJsonpseven-fallen-app"]=this["webpackJsonpseven-fallen-app"]||[]).push([[0],{35:function(e,t,n){},36:function(e,t,n){},37:function(e,t,n){},38:function(e,t,n){},39:function(e,t,n){},45:function(e,t,n){},46:function(e,t,n){},47:function(e,t,n){},48:function(e,t,n){},51:function(e,t,n){},52:function(e,t,n){"use strict";n.r(t);var c=n(1),s=n(2),i=n(23),o=n.n(i),a=(n(35),n(9)),r=(n(36),n(37),function(e){var t=e.classes;return Object(c.jsx)("footer",{className:t,children:e.children})}),l=function(e){return Object(c.jsx)("header",{className:"header",children:e.children})},u=(n(38),function(e){return Object(c.jsx)("main",{id:"main",children:e.children})}),j=n(12),b=n(13),m=n(8),d=n(19),O=n(25),_=n(26);n(39);var h=function(e){var t=e.classes,n=(e.logged,{item__1:!1,item__2:!1,item__3:!1,item__4:!1}),i=Object(s.useState)(n),o=Object(a.a)(i,2),r=o[0],l=o[1],u=function(e){e.persist();var t=e.currentTarget.id;l(n),l((function(e){return Object(b.a)(Object(b.a)({},e),{},Object(j.a)({},t,!0))}))};return Object(s.useEffect)((function(){l(Object(b.a)(Object(b.a)({},r),{},Object(j.a)({},"item__2",!0)))}),[]),Object(c.jsx)("nav",{className:t,children:Object(c.jsxs)("ul",{className:"menu",children:[Object(c.jsx)("div",{className:"menu__bubble"}),Object(c.jsx)("li",{id:"item__1",className:r.item__1?"menu__item move-up":"menu__item",onClick:u,children:Object(c.jsx)(m.b,{className:"menu__link",to:"/profile",children:Object(c.jsx)(d.b,{className:"menu__icon"})})}),Object(c.jsx)("li",{id:"item__2",className:r.item__2?"menu__item move-up":"menu__item",onClick:u,children:Object(c.jsx)(m.b,{id:"item__2",className:"menu__link",to:"/decks",children:Object(c.jsx)(d.a,{className:"menu__icon"})})}),Object(c.jsx)("li",{id:"item__3",className:r.item__3?"menu__item move-up":"menu__item",onClick:u,children:Object(c.jsx)(m.b,{className:"menu__link",to:"/subscribe",children:Object(c.jsx)(O.a,{className:"menu__icon"})})}),Object(c.jsx)("li",{id:"item__4",className:r.item__4?"menu__item move-up":"menu__item",onClick:u,children:Object(c.jsx)(m.b,{className:"menu__link",to:"/gamers",children:Object(c.jsx)(_.a,{className:"menu__icon"})})})]})})},x=(n(45),n(3));var f=function(e){var t=e.pages;return Object(c.jsx)(x.d,{children:t.map((function(e,t){var n,s,i;return Object(c.jsx)(x.b,{exact:null!==(n=e.exact)&&void 0!==n?n:e.exact,strict:null!==(s=e.strict)&&void 0!==s?s:e.strict,path:null!==(i=e.path)&&void 0!==i?i:e.path,render:function(t){return Object(c.jsx)(e.component,{})}},t)}))})},p=function(e){var t=e.classes,n=e.bgcolor,s=e.color,i=e.size,o=e.onClick,a=e.text;return Object(c.jsx)("button",{type:"button",className:t,style:{backgroundColor:n,color:s,width:i},onClick:function(e){return o(e)},children:a})},g=function(e){var t=Object(x.g)();return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)(p,{classes:"btn",text:"Connexion",onClick:function(e){return function(e,n){e.preventDefault(),t.push(n)}(e,"/login")}}),Object(c.jsx)(p,{classes:"btn",text:"Subscribe",onClick:function(){}})]})},v=function(){return Object(c.jsx)("h1",{style:{color:"black"},children:"Hey i'm DecksPage"})},N=function(){return Object(c.jsx)("h1",{style:{color:"black"},children:"Hey i'm cards page"})},k=function(){return Object(c.jsx)("h1",{style:{color:"black"},children:"Hey i'm ProfilePage"})},y=function(){return Object(c.jsx)("h1",{style:{color:"black"},children:"Hey i'm Gamers page"})};n(46);var C=function(){return Object(c.jsx)("h1",{className:"title",style:{color:"black"},children:"404 - Not found"})},w=(n(47),n(27)),E=n.n(w),S=(n(48),n(28)),H=n(14),L=n.n(H);L.a.config();var P=function(e){return e.bgcolor,Object(c.jsx)(c.Fragment,{children:Object(c.jsx)(E.a,{cssClass:"btn btn__social fb-color",appId:"126500632746860",autoLoad:!1,fields:"name,email,picture",onClick:function(){console.log("Clicked")},callback:function(e){return console.log(e)},textButton:"",icon:Object(c.jsx)(S.a,{className:"icons facebook__icon"})})})},B=(n(51),function(e){return Object(c.jsx)("button",{style:{backgroundColor:e.bgcolor},className:"btn btn__social",children:e.children})}),D=n(20),F=n(29),I=Object(s.createContext)();L.a.config();var J=function(e){var t=Object(s.useState)(""),n=Object(a.a)(t,2),i=n[0],o=n[1],r=Object(s.useState)(""),l=Object(a.a)(r,2),u=l[0],j=l[1],b=Object(s.useState)(null),m=Object(a.a)(b,2),d=m[0],O=(m[1],Object(x.g)()),_=function(e){o(e.target.value)},h=function(e){j(e.target.value)};return Object(c.jsx)(I.Consumer,{children:function(e){return Object(c.jsxs)("form",{className:"form",onSubmit:function(t){return e.setLogin(t,O.push)},children:[Object(c.jsx)("h2",{className:"form--title",children:"Login"}),Object(c.jsx)("input",{className:"form--input",id:"email",name:"email",type:"text",placeholder:"Enter your username ...",onChange:_,onBlur:_,value:i}),Object(c.jsx)("input",{id:"password",className:"form--input",name:"password",type:"password",placeholder:"Enter your password ...",onChange:h,onBlur:h,value:u}),Object(c.jsx)("button",{className:"btn btn__submit",type:"submit",children:"Envoyer"}),d?Object(c.jsx)(x.a,{to:{pathname:d}}):"",Object(c.jsx)("h2",{className:"form--separator",children:Object(c.jsx)("span",{className:"form--separator-text",children:"ou"})}),Object(c.jsxs)("ul",{className:"social__icons--list",children:[Object(c.jsx)("li",{children:Object(c.jsx)(P,{bgcolor:"#3b5998"})}),Object(c.jsx)("li",{children:Object(c.jsx)(B,{bgcolor:"#C94130",children:Object(c.jsx)(D.b,{className:"icons google__icon"})})}),Object(c.jsx)("li",{children:Object(c.jsx)(B,{bgcolor:"#050708",children:Object(c.jsx)(D.a,{className:"icons apple__icon"})})}),Object(c.jsx)("li",{children:Object(c.jsx)(B,{bgcolor:"#60A5E5",children:Object(c.jsx)(F.a,{className:"icons twitter__icon"})})})]})]})}})};var z=function(){var e=Object(s.useState)(!1),t=Object(a.a)(e,2),n=t[0],i=t[1],o=(document.documentElement,.01*window.innerHeight),j=[{exact:!0,path:"/",component:g},{strict:!0,path:"/login",component:J},{strict:!0,path:"/profile",component:k},{strict:!0,path:"/decks",component:v},{strict:!0,path:"/subscribe",component:N},{strict:!0,path:"/gamers",component:y},{component:C}];return Object(c.jsxs)(I.Provider,{value:{pages:j,login:n,setLogin:function(e,t){e.preventDefault(),t("/decks"),i(!0)}},children:[window.addEventListener("load",(function(e){document.documentElement.style.setProperty("--vh","".concat(o,"px"))})),Object(c.jsxs)(m.a,{basename:"/",children:[Object(c.jsx)(l,{}),Object(c.jsx)(u,{children:Object(c.jsx)(f,{pages:j,state:n,login:function(){return i(!1)}})}),Object(c.jsx)(r,{classes:n?"footer":"footer h-0",children:Object(c.jsx)(h,{classes:n?"navbar":"navbar move-down fade-out",logged:n})})]})]})};o.a.render(Object(c.jsx)(z,{}),document.getElementById("root"))}},[[52,1,2]]]);
//# sourceMappingURL=main.8a70230b.chunk.js.map