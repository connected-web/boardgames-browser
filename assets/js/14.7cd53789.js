(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{337:function(e,t,a){e.exports="undefined"!=typeof window?window.localStorage:new(0,a(341).LocalStorage)("./temp/localStorage")},338:function(e,t,a){"use strict";var r=a(34),n=a(9),s=a(2),o=a(190),u=a(189),i=a(8),c=a(30),l=a(112),d=a(191),p=a(83),f=a(21),g=a(55),v=a(187),m=a(192),h=a(84),b=a(188),y=a(3),w=b.UNSUPPORTED_Y,x=Math.min,R=[].push,_=s(/./.exec),k=s(R),A=s("".slice);o("split",(function(e,t,a){var s;return s="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(e,a){var s=f(c(this)),o=void 0===a?4294967295:a>>>0;if(0===o)return[];if(void 0===e)return[s];if(!u(e))return n(t,s,e,o);for(var i,l,d,p=[],g=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"")+(e.sticky?"y":""),m=0,b=new RegExp(e.source,g+"g");(i=n(h,b,s))&&!((l=b.lastIndex)>m&&(k(p,A(s,m,i.index)),i.length>1&&i.index<s.length&&r(R,p,v(i,1)),d=i[0].length,m=l,p.length>=o));)b.lastIndex===i.index&&b.lastIndex++;return m===s.length?!d&&_(b,"")||k(p,""):k(p,A(s,m)),p.length>o?v(p,0,o):p}:"0".split(void 0,0).length?function(e,a){return void 0===e&&0===a?[]:n(t,this,e,a)}:t,[function(t,a){var r=c(this),o=null==t?void 0:g(t,e);return o?n(o,t,r,a):n(s,f(r),t,a)},function(e,r){var n=i(this),o=f(e),u=a(s,n,o,r,s!==t);if(u.done)return u.value;var c=l(n,RegExp),g=n.unicode,v=(n.ignoreCase?"i":"")+(n.multiline?"m":"")+(n.unicode?"u":"")+(w?"g":"y"),h=new c(w?"^(?:"+n.source+")":n,v),b=void 0===r?4294967295:r>>>0;if(0===b)return[];if(0===o.length)return null===m(h,o)?[o]:[];for(var y=0,R=0,_=[];R<o.length;){h.lastIndex=w?0:R;var I,S=m(h,w?A(o,R):o);if(null===S||(I=x(p(h.lastIndex+(w?R:0)),o.length))===y)R=d(o,R,g);else{if(k(_,A(o,y,R)),_.length===b)return _;for(var U=1;U<=S.length-1;U++)if(k(_,S[U]),_.length===b)return _;R=y=I}}return k(_,A(o,y)),_}]}),!!y((function(){var e=/(?:)/,t=e.exec;e.exec=function(){return t.apply(this,arguments)};var a="ab".split(e);return 2!==a.length||"a"!==a[0]||"b"!==a[1]})),w)},339:function(e,t,a){"use strict";a(186);var r=a(85);a(29),a(338),a(82),a(193),a(6);var n=function(e){var t=decodeURI(e);if("string"==typeof t)return(t.split("?")[1]||"").split("#")[0].split("&").map((function(e){return e.split("=")})).reduce((function(e,t){var a=Object(r.a)(t,2),n=a[0],s=a[1];return n&&(e[n]=s),e}),{})},s=a(337),o=a.n(s),u={boardgamesApiUrl:"https://boardgames-api.calisaurus.net",boardgamesSamApiUrl:"https://nn58gn0krl.execute-api.eu-west-2.amazonaws.com/Prod",params:{},lastDateCode:!1};function i(){var e,t,a=function(){var e;try{e=JSON.parse(o.a.getItem("sharedModel")||"{}")}catch(e){console.log("Invalid stored state found:",e.message)}return e||{}}();Object.assign(u,a),"undefined"!=typeof document&&(u.params=n(document.location)),null!==(e=u.params)&&void 0!==e&&e.dateCode&&(u.lastDateCode=u.params.dateCode),t=JSON.stringify(u),o.a.setItem("sharedModel",t)}u.boardgamesApiUrlStatus="".concat(u.boardgamesApiUrl,"/api/status"),u.boardgamesSamApiUrlStatus="".concat(u.boardgamesSamApiUrl,"/status"),i();t.a={update:i,state:u,getAuthHeaders:function(){var e=void 0!==o.a?o.a:{getItem:function(){return"Local"}};return{"calisaurus-user":e.getItem("api-user-name"),"calisaurus-user-api-key":e.getItem("api-user-key")}}}},350:function(e,t,a){"use strict";a(113),a(35),a(6),a(82),a(29),a(86),a(195);var r=a(364);a(356).c.add(r.a),t.a=function(){return Object.keys(r.a).map((function(e){return e.replace(/([a-z])([A-Z])/g,"$1-$2").toLocaleLowerCase().replace("fa-","").replace("xray","x-ray").replace("hsquare","h-square").replace("icursor","i-cursor").replace("stopwatch20","stopwatch-20")})).filter((function(e){return!["font-awesome-logo-full","ad"].includes(e)}))}},419:function(e,t,a){},499:function(e,t,a){"use strict";a(419)},526:function(e,t,a){"use strict";a.r(t);var r=a(56),n=(a(111),a(348)),s=a.n(n),o=a(339),u=(a(350),o.a.state.boardgamesSamApiUrl),i={data:function(){return{sharedModel:o.a,status:"Loading data...",message:""}},mounted:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",e.listPlayRecords());case 1:case"end":return t.stop()}}),t)})))()},methods:{listPlayRecords:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var a,r,n,i,c,l;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,a="".concat(u,"/playrecords/list"),r={headers:o.a.getAuthHeaders()},t.next=5,s.a.get(a,r);case 5:n=t.sent,i=n.data,e.status=i,t.next=15;break;case 10:t.prev=10,t.t0=t.catch(0),c=t.t0.response||{},l=c.data,e.message=l.message||"Unable to load status: ".concat(t.t0.message),e.status=l;case 15:case"end":return t.stop()}}),t,null,[[0,10]])})))()},removePlayRecord:function(e){var t=this;return Object(r.a)(regeneratorRuntime.mark((function a(){var r,n,i,c;return regeneratorRuntime.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,r="".concat(u,"/playrecords/delete"),n={headers:o.a.getAuthHeaders(),data:{keypath:e}},a.next=5,s.a.delete(r,n);case 5:return i=a.sent,c=i.data,console.log("Delete",e,c),a.abrupt("return",t.listPlayRecords());case 11:a.prev=11,a.t0=a.catch(0),t.message=data.message||"Unable to remove play record: ".concat(a.t0.message);case 14:case"end":return a.stop()}}),a,null,[[0,11]])})))()}}},c=(a(499),a(54)),l=Object(c.a)(i,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("p",[e._v("Here is the full list of play records available on the Board Games SAM API:")]),e._v(" "),e.status.playRecords?a("div",[e._l(e.status.playRecords,(function(t){return a("div",{key:t.key,staticClass:"play record"},[a("pre",[a("code",[e._v(e._s(t))])]),e._v(" "),a("button",{staticClass:"trash",on:{click:function(a){return e.removePlayRecord(t.key)}}},[a("icon",{attrs:{icon:"trash"}}),e._v(" "),a("label",[e._v("Remove Play Record")])],1)])})),e._v(" "),0===e.status.playRecords.length?a("pre",[a("code",[e._v("No play records found")])]):e._e()],2):a("pre",[a("code",[e._v(e._s(e.status))])]),e._v(" "),a("p",[e._v(e._s(e.message))])])}),[],!1,null,"9bbd6e6c",null);t.default=l.exports}}]);