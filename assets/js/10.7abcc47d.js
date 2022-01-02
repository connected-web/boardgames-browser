(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{338:function(e,t,a){"use strict";var n=a(82);a(29),a(339),a(81),a(187),a(7);var r=function(e){var t=decodeURI(e);if("string"==typeof t)return(t.split("?")[1]||"").split("#")[0].split("&").map((function(e){return e.split("=")})).reduce((function(e,t){var a=Object(n.a)(t,2),r=a[0],s=a[1];return r&&(e[r]=s),e}),{})},s={boardgamesApiUrl:"https://boardgames-api.calisaurus.net",boardgamesSamApiUrl:"https://nn58gn0krl.execute-api.eu-west-2.amazonaws.com/Prod",params:{}};function i(){s.params=r(document.location)}s.boardgamesApiUrlStatus="".concat(s.boardgamesApiUrl,"/api/status"),s.boardgamesSamApiUrlStatus="".concat(s.boardgamesSamApiUrl,"/status"),i();t.a={update:i,state:s,getAuthHeaders:function(){return{"calisaurus-user":localStorage.getItem("api-user-name"),"calisaurus-user-api-key":localStorage.getItem("api-user-key")}}}},344:function(e,t,a){var n=a(2);e.exports=n(1..valueOf)},347:function(e,t,a){"use strict";var n=a(1),r=a(0),s=a(2),i=a(56),l=a(344),o=a(348),c=a(3),u=r.RangeError,d=r.String,v=Math.floor,g=s(o),m=s("".slice),h=s(1..toFixed),f=function(e,t,a){return 0===t?a:t%2==1?f(e,t-1,a*e):f(e*e,t/2,a)},p=function(e,t,a){for(var n=-1,r=a;++n<6;)r+=t*e[n],e[n]=r%1e7,r=v(r/1e7)},_=function(e,t){for(var a=6,n=0;--a>=0;)n+=e[a],e[a]=v(n/t),n=n%t*1e7},b=function(e){for(var t=6,a="";--t>=0;)if(""!==a||0===t||0!==e[t]){var n=d(e[t]);a=""===a?n:a+g("0",7-n.length)+n}return a};n({target:"Number",proto:!0,forced:c((function(){return"0.000"!==h(8e-5,3)||"1"!==h(.9,0)||"1.25"!==h(1.255,2)||"1000000000000000128"!==h(0xde0b6b3a7640080,0)}))||!c((function(){h({})}))},{toFixed:function(e){var t,a,n,r,s=l(this),o=i(e),c=[0,0,0,0,0,0],v="",h="0";if(o<0||o>20)throw u("Incorrect fraction digits");if(s!=s)return"NaN";if(s<=-1e21||s>=1e21)return d(s);if(s<0&&(v="-",s=-s),s>1e-21)if(a=(t=function(e){for(var t=0,a=e;a>=4096;)t+=12,a/=4096;for(;a>=2;)t+=1,a/=2;return t}(s*f(2,69,1))-69)<0?s*f(2,-t,1):s/f(2,t,1),a*=4503599627370496,(t=52-t)>0){for(p(c,0,a),n=o;n>=7;)p(c,1e7,0),n-=7;for(p(c,f(10,n,1),0),n=t-1;n>=23;)_(c,1<<23),n-=23;_(c,1<<n),p(c,1,1),_(c,2),h=b(c)}else p(c,0,a),p(c,1<<-t,0),h=b(c)+g("0",o);return h=o>0?v+((r=h.length)<=o?"0."+g("0",o-r)+h:m(h,0,r-o)+"."+m(h,r-o)):v+h}})},348:function(e,t,a){"use strict";var n=a(0),r=a(56),s=a(20),i=a(30),l=n.RangeError;e.exports=function(e){var t=s(i(this)),a="",n=r(e);if(n<0||n==1/0)throw l("Wrong number of repetitions");for(;n>0;(n>>>=1)&&(t+=t))1&n&&(a+=t);return a}},391:function(e,t,a){},449:function(e,t,a){"use strict";a(391)},477:function(e,t,a){"use strict";a.r(t);var n=a(53),r=(a(58),a(347),a(34),a(7),a(81),a(190),a(111),a(342)),s=a.n(r),i=a(338).a.state.boardgamesApiUrl;function l(e){return o.apply(this,arguments)}function o(){return(o=Object(n.a)(regeneratorRuntime.mark((function e(t){var a,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a={},e.prev=1,e.next=4,s.a.get("".concat(i,"/api/boardgame/grids/byYear/").concat(t));case 4:n=e.sent,a=n.data,e.next=12;break;case 8:e.prev=8,e.t0=e.catch(1),a.title="Unable to load challenge grid: ".concat(e.t0.message),console.log("Load Boardgame Grid:",e.t0);case 12:return e.abrupt("return",a);case 13:case"end":return e.stop()}}),e,null,[[1,8]])})))).apply(this,arguments)}var c={props:["dateCode"],data:function(){return{message:"Loading data from ".concat(i),challengeGrid:{challenge:{},overview:{},sequence:{}}}},beforeMount:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,l(e.dateCode);case 2:e.$data.challengeGrid=t.sent,e.$data.message=!1;case 4:case"end":return t.stop()}}),t)})))()},computed:{gamesToPlayCountPerFamily:function(){try{return this.$data.challengeGrid.challenge.gamesToPlayCountPerFamily}catch(e){return 1}}},methods:{limit:function(e,t){return e.slice(0,t)},fmp:function(e){return(100*Math.min(e,1)).toFixed(0)+"%"},countWinner:function(e,t){var a=e.gameStats.map((function(e){return e.winner||e.coOpOutcome||"?"})).filter((function(e){return e.charAt(0).toLowerCase()===t}));return Math.min(1,a.length/this.gamesToPlayCountPerFamily)}}},u=(a(449),a(52)),d=Object(u.a)(c,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"boardgame-list"},[e.message?a("p",[e._v(e._s(e.message))]):e._e(),e._v(" "),e.$props.dateCode?a("div",[a("h2",[e._v(e._s(e.challengeGrid.title))]),e._v(" "),a("div",{staticClass:"challenge details"},[a("p",[e._v("The "),a("b",[e._v(e._s(e.challengeGrid.dateCode))]),e._v(" challenge covers games played on or between\n        "),a("b",[e._v(e._s(e.challengeGrid.challenge.startDate))]),e._v(" and "),a("b",[e._v(e._s(e.challengeGrid.challenge.endDate))]),e._v(".\n      ")]),e._v(" "),a("p",[e._v("There are "),a("b",[e._v(e._s(e.challengeGrid.challenge.gameFamiliesCount))]),e._v(" families of games that need to be played\n        "),a("b",[e._v(e._s(e.challengeGrid.challenge.gamesToPlayCountPerFamily))]),e._v(" times each to complete the challenge!\n      ")]),e._v(" "),a("p",[e._v("So far "),a("b",[e._v(e._s(e.challengeGrid.overview.gamesPlayedCount))]),e._v("\n        ("+e._s(e.fmp(e.challengeGrid.overview.gamesPlayedPercentage))+") games have been played, \n        out of a total of "),a("b",[e._v(e._s(e.challengeGrid.overview.totalGamesToPlayCount))]),e._v(".\n      ")])]),e._v(" "),a("div",{staticClass:"challenge grid"},[e._l(e.challengeGrid.grid,(function(t){return a("div",{key:t.gameFamily,staticClass:"challenge row"},[a("div",{staticClass:"game family name"},[e._v(e._s(t.gameFamily))]),e._v(" "),a("div",{staticClass:"game family progress"},[a("div",{staticClass:"play count label"},[e._v("P "+e._s(t.gamesPlayedCount))]),e._v(" "),a("div",{staticClass:"progress bar",staticStyle:{width:"100%"}},[a("div",{staticClass:"bar coop win",style:"width: "+e.fmp(e.countWinner(t,"w"))+";"}),e._v(" "),a("div",{staticClass:"bar coop lose",style:"width: "+e.fmp(e.countWinner(t,"l"))+";"}),e._v(" "),a("div",{staticClass:"bar vs other",style:"width: "+e.fmp(e.countWinner(t,"o"))+";"}),e._v(" "),a("div",{staticClass:"bar vs draw",style:"width: "+e.fmp(e.countWinner(t,"d"))+";"}),e._v(" "),a("div",{staticClass:"bar vs john",style:"width: "+e.fmp(e.countWinner(t,"j"))+";"}),e._v(" "),a("div",{staticClass:"bar vs hannah",style:"width: "+e.fmp(e.countWinner(t,"h"))+";"})])]),e._v(" "),a("div",{staticClass:"game family play stats"},e._l(e.limit(t.gameStats,e.challengeGrid.challenge.gamesToPlayCountPerFamily),(function(e){return a("GameStatBox",{key:e.game,attrs:{game:e}})})),1),e._v(" "),t.gameStats.length>e.challengeGrid.challenge.gamesToPlayCountPerFamily?a("div",{staticClass:"overplayed",attrs:{title:t.gameStats.length+" "+t.gameFamily+" games played!"}},[e._v("+")]):e._e()])})),e._v(" "),a("game-stat-key")],2),e._v(" "),a("div",{staticClass:"challenge details"},[a("p",[e._v("The available data covers "),a("b",[e._v(e._s(e.challengeGrid.sequence.daysInSequenceCount))]),e._v(" days between\n        "),a("b",[e._v(e._s(e.challengeGrid.sequence.earliestDate))]),e._v(" and "),a("b",[e._v(e._s(e.challengeGrid.sequence.latestDate))]),e._v(".")])])]):a("div",[e._m(0)])])}),[function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("No date code set - "),t("a",{attrs:{href:"./"}},[this._v("back to grids")]),this._v("?")])}],!1,null,"a9083a0e",null);t.default=d.exports}}]);