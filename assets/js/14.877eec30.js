(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{337:function(t,e,n){"use strict";var r=n(83);n(29),n(338),n(82),n(186),n(6);var a=function(t){var e=decodeURI(t);if("string"==typeof e)return(e.split("?")[1]||"").split("#")[0].split("&").map((function(t){return t.split("=")})).reduce((function(t,e){var n=Object(r.a)(e,2),a=n[0],i=n[1];return a&&(t[a]=i),t}),{})},i={boardgamesApiUrl:"https://boardgames-api.calisaurus.net",boardgamesSamApiUrl:"https://nn58gn0krl.execute-api.eu-west-2.amazonaws.com/Prod",params:{}};function u(){"undefined"!=typeof document&&(i.params=a(document.location))}i.boardgamesApiUrlStatus="".concat(i.boardgamesApiUrl,"/api/status"),i.boardgamesSamApiUrlStatus="".concat(i.boardgamesSamApiUrl,"/status"),u();e.a={update:u,state:i,getAuthHeaders:function(){var t="undefined"!=typeof localStorage?localStorage:{getItem:function(){return"Local"}};return{"calisaurus-user":t.getItem("api-user-name"),"calisaurus-user-api-key":t.getItem("api-user-key")}}}},338:function(t,e,n){"use strict";var r=n(35),a=n(10),i=n(2),u=n(191),s=n(190),o=n(8),l=n(30),c=n(113),d=n(192),p=n(84),f=n(21),g=n(57),h=n(187),m=n(193),v=n(86),b=n(188),x=n(3),w=b.UNSUPPORTED_Y,y=Math.min,I=[].push,U=i(/./.exec),C=i(I),S=i("".slice);u("split",(function(t,e,n){var i;return i="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(t,n){var i=f(l(this)),u=void 0===n?4294967295:n>>>0;if(0===u)return[];if(void 0===t)return[i];if(!s(t))return a(e,i,t,u);for(var o,c,d,p=[],g=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),m=0,b=new RegExp(t.source,g+"g");(o=a(v,b,i))&&!((c=b.lastIndex)>m&&(C(p,S(i,m,o.index)),o.length>1&&o.index<i.length&&r(I,p,h(o,1)),d=o[0].length,m=c,p.length>=u));)b.lastIndex===o.index&&b.lastIndex++;return m===i.length?!d&&U(b,"")||C(p,""):C(p,S(i,m)),p.length>u?h(p,0,u):p}:"0".split(void 0,0).length?function(t,n){return void 0===t&&0===n?[]:a(e,this,t,n)}:e,[function(e,n){var r=l(this),u=null==e?void 0:g(e,t);return u?a(u,e,r,n):a(i,f(r),e,n)},function(t,r){var a=o(this),u=f(t),s=n(i,a,u,r,i!==e);if(s.done)return s.value;var l=c(a,RegExp),g=a.unicode,h=(a.ignoreCase?"i":"")+(a.multiline?"m":"")+(a.unicode?"u":"")+(w?"g":"y"),v=new l(w?"^(?:"+a.source+")":a,h),b=void 0===r?4294967295:r>>>0;if(0===b)return[];if(0===u.length)return null===m(v,u)?[u]:[];for(var x=0,I=0,U=[];I<u.length;){v.lastIndex=w?0:I;var k,A=m(v,w?S(u,I):u);if(null===A||(k=y(p(v.lastIndex+(w?I:0)),u.length))===x)I=d(u,I,g);else{if(C(U,S(u,x,I)),U.length===b)return U;for(var R=1;R<=A.length-1;R++)if(C(U,A[R]),U.length===b)return U;I=x=k}}return C(U,S(u,x)),U}]}),!!x((function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var n="ab".split(t);return 2!==n.length||"a"!==n[0]||"b"!==n[1]})),w)},479:function(t,e,n){"use strict";n.r(e);var r=n(55),a=(n(111),n(337)),i={data:function(){return{dateCode:!1}},beforeMount:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a.a.update(),n=a.a.state.params.dateCode,t.$data.dateCode=n;case 3:case"end":return e.stop()}}),e)})))()}},u=n(54),s=Object(u.a)(i,(function(){var t=this.$createElement,e=this._self._c||t;return this.$data.dateCode?e("BoardGameGrid",{attrs:{dateCode:this.$data.dateCode}}):e("BoardGameGridList")}),[],!1,null,null,null);e.default=s.exports}}]);