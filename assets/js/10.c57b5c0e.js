(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{337:function(e,t,r){"use strict";var a=r(34),n=r(9),s=r(2),u=r(189),o=r(188),c=r(8),i=r(30),l=r(112),d=r(190),p=r(83),f=r(21),g=r(55),v=r(186),h=r(191),m=r(84),b=r(187),y=r(3),x=b.UNSUPPORTED_Y,w=Math.min,R=[].push,_=s(/./.exec),k=s(R),A=s("".slice);u("split",(function(e,t,r){var s;return s="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(e,r){var s=f(i(this)),u=void 0===r?4294967295:r>>>0;if(0===u)return[];if(void 0===e)return[s];if(!o(e))return n(t,s,e,u);for(var c,l,d,p=[],g=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"")+(e.sticky?"y":""),h=0,b=new RegExp(e.source,g+"g");(c=n(m,b,s))&&!((l=b.lastIndex)>h&&(k(p,A(s,h,c.index)),c.length>1&&c.index<s.length&&a(R,p,v(c,1)),d=c[0].length,h=l,p.length>=u));)b.lastIndex===c.index&&b.lastIndex++;return h===s.length?!d&&_(b,"")||k(p,""):k(p,A(s,h)),p.length>u?v(p,0,u):p}:"0".split(void 0,0).length?function(e,r){return void 0===e&&0===r?[]:n(t,this,e,r)}:t,[function(t,r){var a=i(this),u=null==t?void 0:g(t,e);return u?n(u,t,a,r):n(s,f(a),t,r)},function(e,a){var n=c(this),u=f(e),o=r(s,n,u,a,s!==t);if(o.done)return o.value;var i=l(n,RegExp),g=n.unicode,v=(n.ignoreCase?"i":"")+(n.multiline?"m":"")+(n.unicode?"u":"")+(x?"g":"y"),m=new i(x?"^(?:"+n.source+")":n,v),b=void 0===a?4294967295:a>>>0;if(0===b)return[];if(0===u.length)return null===h(m,u)?[u]:[];for(var y=0,R=0,_=[];R<u.length;){m.lastIndex=x?0:R;var U,I=h(m,x?A(u,R):u);if(null===I||(U=w(p(m.lastIndex+(x?R:0)),u.length))===y)R=d(u,R,g);else{if(k(_,A(u,y,R)),_.length===b)return _;for(var P=1;P<=I.length-1;P++)if(k(_,I[P]),_.length===b)return _;R=y=U}}return k(_,A(u,y)),_}]}),!!y((function(){var e=/(?:)/,t=e.exec;e.exec=function(){return t.apply(this,arguments)};var r="ab".split(e);return 2!==r.length||"a"!==r[0]||"b"!==r[1]})),x)},338:function(e,t,r){"use strict";var a=r(85);r(29),r(337),r(82),r(192),r(6);var n=function(e){var t=decodeURI(e);if("string"==typeof t)return(t.split("?")[1]||"").split("#")[0].split("&").map((function(e){return e.split("=")})).reduce((function(e,t){var r=Object(a.a)(t,2),n=r[0],s=r[1];return n&&(e[n]=s),e}),{})},s={boardgamesApiUrl:"https://boardgames-api.calisaurus.net",boardgamesSamApiUrl:"https://nn58gn0krl.execute-api.eu-west-2.amazonaws.com/Prod",params:{}};function u(){"undefined"!=typeof document&&(s.params=n(document.location))}s.boardgamesApiUrlStatus="".concat(s.boardgamesApiUrl,"/api/status"),s.boardgamesSamApiUrlStatus="".concat(s.boardgamesSamApiUrl,"/status"),u();t.a={update:u,state:s,getAuthHeaders:function(){var e="undefined"!=typeof localStorage?localStorage:{getItem:function(){return"Local"}};return{"calisaurus-user":e.getItem("api-user-name"),"calisaurus-user-api-key":e.getItem("api-user-key")}}}},354:function(e,t,r){"use strict";r(113),r(35),r(6),r(82),r(29),r(86),r(195);var a=r(359);r(355).c.add(a.a),t.a=function(){return Object.keys(a.a).map((function(e){return e.replace(/([a-z])([A-Z])/g,"$1-$2").toLocaleLowerCase().replace("fa-","").replace("xray","x-ray").replace("hsquare","h-square").replace("icursor","i-cursor").replace("stopwatch20","stopwatch-20")})).filter((function(e){return!["font-awesome-logo-full","ad"].includes(e)}))}},408:function(e,t,r){},494:function(e,t,r){"use strict";r(408)},517:function(e,t,r){"use strict";r.r(t);var a=r(56),n=(r(111),r(340)),s=r.n(n),u=r(338),o=(r(354),u.a.state.boardgamesSamApiUrl),c={data:function(){return{sharedModel:u.a,status:"Loading data...",message:""}},mounted:function(){var e=this;return Object(a.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",e.listPlayRecords());case 1:case"end":return t.stop()}}),t)})))()},methods:{listPlayRecords:function(){var e=this;return Object(a.a)(regeneratorRuntime.mark((function t(){var r,a,n,c,i,l;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,r="".concat(o,"/playrecords/list"),a={headers:u.a.getAuthHeaders()},t.next=5,s.a.get(r,a);case 5:n=t.sent,c=n.data,e.status=c,t.next=15;break;case 10:t.prev=10,t.t0=t.catch(0),i=t.t0.response||{},l=i.data,e.message=l.message||"Unable to load status: ".concat(t.t0.message),e.status=l;case 15:case"end":return t.stop()}}),t,null,[[0,10]])})))()},removePlayRecord:function(e){var t=this;return Object(a.a)(regeneratorRuntime.mark((function r(){var a,n,c,i;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,a="".concat(o,"/playrecords/delete"),n={headers:u.a.getAuthHeaders(),data:{keypath:e}},r.next=5,s.a.delete(a,n);case 5:return c=r.sent,i=c.data,console.log("Delete",e,i),r.abrupt("return",t.listPlayRecords());case 11:r.prev=11,r.t0=r.catch(0),t.message=data.message||"Unable to remove play record: ".concat(r.t0.message);case 14:case"end":return r.stop()}}),r,null,[[0,11]])})))()}}},i=(r(494),r(54)),l=Object(i.a)(c,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("p",[e._v("Here is the full list of play records available on the Board Games SAM API:")]),e._v(" "),e.status.playRecords?r("div",[e._l(e.status.playRecords,(function(t){return r("div",{key:t.key,staticClass:"play record"},[r("pre",[r("code",[e._v(e._s(t))])]),e._v(" "),r("button",{staticClass:"trash",on:{click:function(r){return e.removePlayRecord(t.key)}}},[r("icon",{attrs:{icon:"trash"}}),e._v(" "),r("label",[e._v("Remove Play Record")])],1)])})),e._v(" "),0===e.status.playRecords.length?r("pre",[r("code",[e._v("No play records found")])]):e._e()],2):r("pre",[r("code",[e._v(e._s(e.status))])]),e._v(" "),r("p",[e._v(e._s(e.message))])])}),[],!1,null,"70db011c",null);t.default=l.exports}}]);