(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{349:function(e,t,n){e.exports="undefined"!=typeof window?window.localStorage:new(0,n(353).LocalStorage)("./temp/localStorage")},350:function(e,t,n){"use strict";var a=n(33),r=n(11),i=n(2),s=n(195),o=n(194),u=n(8),l=n(32),d=n(116),c=n(196),p=n(86),g=n(18),f=n(57),h=n(192),m=n(197),v=n(87),b=n(193),w=n(3),x=b.UNSUPPORTED_Y,C=Math.min,I=[].push,y=i(/./.exec),S=i(I),U=i("".slice);s("split",(function(e,t,n){var i;return i="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(e,n){var i=g(l(this)),s=void 0===n?4294967295:n>>>0;if(0===s)return[];if(void 0===e)return[i];if(!o(e))return r(t,i,e,s);for(var u,d,c,p=[],f=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"")+(e.sticky?"y":""),m=0,b=new RegExp(e.source,f+"g");(u=r(v,b,i))&&!((d=b.lastIndex)>m&&(S(p,U(i,m,u.index)),u.length>1&&u.index<i.length&&a(I,p,h(u,1)),c=u[0].length,m=d,p.length>=s));)b.lastIndex===u.index&&b.lastIndex++;return m===i.length?!c&&y(b,"")||S(p,""):S(p,U(i,m)),p.length>s?h(p,0,s):p}:"0".split(void 0,0).length?function(e,n){return void 0===e&&0===n?[]:r(t,this,e,n)}:t,[function(t,n){var a=l(this),s=null==t?void 0:f(t,e);return s?r(s,t,a,n):r(i,g(a),t,n)},function(e,a){var r=u(this),s=g(e),o=n(i,r,s,a,i!==t);if(o.done)return o.value;var l=d(r,RegExp),f=r.unicode,h=(r.ignoreCase?"i":"")+(r.multiline?"m":"")+(r.unicode?"u":"")+(x?"g":"y"),v=new l(x?"^(?:"+r.source+")":r,h),b=void 0===a?4294967295:a>>>0;if(0===b)return[];if(0===s.length)return null===m(v,s)?[s]:[];for(var w=0,I=0,y=[];I<s.length;){v.lastIndex=x?0:I;var k,A=m(v,x?U(s,I):s);if(null===A||(k=C(p(v.lastIndex+(x?I:0)),s.length))===w)I=c(s,I,f);else{if(S(y,U(s,w,I)),y.length===b)return y;for(var O=1;O<=A.length-1;O++)if(S(y,A[O]),y.length===b)return y;I=w=k}}return S(y,U(s,w)),y}]}),!!w((function(){var e=/(?:)/,t=e.exec;e.exec=function(){return t.apply(this,arguments)};var n="ab".split(e);return 2!==n.length||"a"!==n[0]||"b"!==n[1]})),x)},351:function(e,t,n){"use strict";n(191);var a=n(88);n(31),n(350),n(85),n(198),n(7);var r=function(e){var t=decodeURI(e);if("string"==typeof t)return(t.split("?")[1]||"").split("#")[0].split("&").map((function(e){return e.split("=")})).reduce((function(e,t){var n=Object(a.a)(t,2),r=n[0],i=n[1];return r&&(e[r]=i),e}),{})},i=n(349),s=n.n(i),o={boardgamesApiUrl:"https://boardgames-api.calisaurus.net",boardgamesSamApiUrl:"https://nn58gn0krl.execute-api.eu-west-2.amazonaws.com/Prod",params:{},lastDateCode:!1};function u(){var e,t,n=function(){var e;try{e=JSON.parse(s.a.getItem("sharedModel")||"{}")}catch(e){console.log("Invalid stored state found:",e.message)}return e||{}}();Object.assign(o,n),"undefined"!=typeof document&&(o.params=r(document.location)),null!==(e=o.params)&&void 0!==e&&e.dateCode&&(o.lastDateCode=o.params.dateCode),t=JSON.stringify(o),s.a.setItem("sharedModel",t)}o.boardgamesApiUrlStatus="".concat(o.boardgamesApiUrl,"/api/status"),o.boardgamesSamApiUrlStatus="".concat(o.boardgamesSamApiUrl,"/status"),u();t.a={update:u,state:o,getAuthHeaders:function(){var e=void 0!==s.a?s.a:{getItem:function(){return"Local"}};return{"calisaurus-user":e.getItem("api-user-name"),"calisaurus-user-api-key":e.getItem("api-user-key")}}}},526:function(e,t,n){"use strict";n.r(t);var a=n(58),r=(n(115),n(351)),i={data:function(){return{dateCode:!1}},beforeMount:function(){var e=this;return Object(a.a)(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:r.a.update(),n=r.a.state.params.dateCode,e.dateCode=n;case 3:case"end":return t.stop()}}),t)})))()}},s=n(56),o=Object(s.a)(i,(function(){var e=this.$createElement,t=this._self._c||e;return this.dateCode?t("BoardGameGrid",{attrs:{dateCode:this.dateCode}}):t("BoardGameGridList")}),[],!1,null,null,null);t.default=o.exports}}]);