(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{340:function(t,e,a){var s=a(347).default;a(111),a(6),a(194);var r=a(342),n=a(348),o=a(341),u={};function l(t){return i.apply(this,arguments)}function i(){return(i=s(regeneratorRuntime.mark((function t(e){var a,s;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=v(e),t.next=3,_(e);case 3:return s=t.sent,t.abrupt("return",s||a);case 5:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function v(t){return c.apply(this,arguments)}function c(){return(c=s(regeneratorRuntime.mark((function t(e){var a,s,u;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,r.get(e);case 2:return a=t.sent,s=a.data,u=n(e),o.setItem(u,JSON.stringify(s)),t.abrupt("return",s);case 7:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function _(t){return p.apply(this,arguments)}function p(){return(p=s(regeneratorRuntime.mark((function t(e){var a,s,r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:a=n(e),s=o.getItem(a);try{r=JSON.parse(s)}catch(t){r=!1}return t.abrupt("return",r);case 4:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function d(){return(d=s(regeneratorRuntime.mark((function t(e){var a;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=l(e),u[e]=a,t.abrupt("return",a);case 3:case"end":return t.stop()}}),t)})))).apply(this,arguments)}var f={get:function(t){var e=u[t]||function(t){return d.apply(this,arguments)}(t);return Promise.resolve(e)}};t.exports=f},341:function(t,e,a){t.exports="undefined"!=typeof window?window.localStorage:new(0,a(349).LocalStorage)("./temp/localStorage")},344:function(t,e,a){var s=a(2);t.exports=s(1..valueOf)},346:function(t,e,a){"use strict";var s=a(1),r=a(0),n=a(2),o=a(58),u=a(344),l=a(354),i=a(3),v=r.RangeError,c=r.String,_=Math.floor,p=n(l),d=n("".slice),f=n(1..toFixed),m=function(t,e,a){return 0===e?a:e%2==1?m(t,e-1,a*t):m(t*t,e/2,a)},g=function(t,e,a){for(var s=-1,r=a;++s<6;)r+=e*t[s],t[s]=r%1e7,r=_(r/1e7)},h=function(t,e){for(var a=6,s=0;--a>=0;)s+=t[a],t[a]=_(s/e),s=s%e*1e7},y=function(t){for(var e=6,a="";--e>=0;)if(""!==a||0===e||0!==t[e]){var s=c(t[e]);a=""===a?s:a+p("0",7-s.length)+s}return a};s({target:"Number",proto:!0,forced:i((function(){return"0.000"!==f(8e-5,3)||"1"!==f(.9,0)||"1.25"!==f(1.255,2)||"1000000000000000128"!==f(0xde0b6b3a7640080,0)}))||!i((function(){f({})}))},{toFixed:function(t){var e,a,s,r,n=u(this),l=o(t),i=[0,0,0,0,0,0],_="",f="0";if(l<0||l>20)throw v("Incorrect fraction digits");if(n!=n)return"NaN";if(n<=-1e21||n>=1e21)return c(n);if(n<0&&(_="-",n=-n),n>1e-21)if(a=(e=function(t){for(var e=0,a=t;a>=4096;)e+=12,a/=4096;for(;a>=2;)e+=1,a/=2;return e}(n*m(2,69,1))-69)<0?n*m(2,-e,1):n/m(2,e,1),a*=4503599627370496,(e=52-e)>0){for(g(i,0,a),s=l;s>=7;)g(i,1e7,0),s-=7;for(g(i,m(10,s,1),0),s=e-1;s>=23;)h(i,1<<23),s-=23;h(i,1<<s),g(i,1,1),h(i,2),f=y(i)}else g(i,0,a),g(i,1<<-e,0),f=y(i)+p("0",l);return f=l>0?_+((r=f.length)<=l?"0."+p("0",l-r)+f:d(f,0,r-l)+"."+d(f,r-l)):_+f}})},350:function(t,e,a){"use strict";var s=a(1),r=a(2),n=a(25),o=a(13),u=a(22),l=a(21),i=a(3),v=a(355),c=a(38),_=a(356),p=a(357),d=a(36),f=a(358),m=[],g=r(m.sort),h=r(m.push),y=i((function(){m.sort(void 0)})),b=i((function(){m.sort(null)})),w=c("sort"),C=!i((function(){if(d)return d<70;if(!(_&&_>3)){if(p)return!0;if(f)return f<603;var t,e,a,s,r="";for(t=65;t<76;t++){switch(e=String.fromCharCode(t),t){case 66:case 69:case 70:case 72:a=3;break;case 68:case 71:a=4;break;default:a=2}for(s=0;s<47;s++)m.push({k:e+s,v:a})}for(m.sort((function(t,e){return e.v-t.v})),s=0;s<m.length;s++)e=m[s].k.charAt(0),r.charAt(r.length-1)!==e&&(r+=e);return"DGBEFHACIJK"!==r}}));s({target:"Array",proto:!0,forced:y||!b||!w||!C},{sort:function(t){void 0!==t&&n(t);var e=o(this);if(C)return void 0===t?g(e):g(e,t);var a,s,r=[],i=u(e);for(s=0;s<i;s++)s in e&&h(r,e[s]);for(v(r,function(t){return function(e,a){return void 0===a?-1:void 0===e?1:void 0!==t?+t(e,a)||0:l(e)>l(a)?1:-1}}(t)),a=r.length,s=0;s<a;)e[s]=r[s++];for(;s<i;)delete e[s++];return e}})},351:function(t,e,a){var s=a(2),r=a(18),n=Date.prototype,o=s(n.toString),u=s(n.getTime);"Invalid Date"!=String(new Date(NaN))&&r(n,"toString",(function(){var t=u(this);return t==t?o(this):"Invalid Date"}))},354:function(t,e,a){"use strict";var s=a(0),r=a(58),n=a(21),o=a(30),u=s.RangeError;t.exports=function(t){var e=n(o(this)),a="",s=r(t);if(s<0||s==1/0)throw u("Wrong number of repetitions");for(;s>0;(s>>>=1)&&(e+=e))1&s&&(a+=e);return a}},355:function(t,e,a){var s=a(186),r=Math.floor,n=function(t,e){var a=t.length,l=r(a/2);return a<8?o(t,e):u(t,n(s(t,0,l),e),n(s(t,l),e),e)},o=function(t,e){for(var a,s,r=t.length,n=1;n<r;){for(s=n,a=t[n];s&&e(t[s-1],a)>0;)t[s]=t[--s];s!==n++&&(t[s]=a)}return t},u=function(t,e,a,s){for(var r=e.length,n=a.length,o=0,u=0;o<r||u<n;)t[o+u]=o<r&&u<n?s(e[o],a[u])<=0?e[o++]:a[u++]:o<r?e[o++]:a[u++];return t};t.exports=n},356:function(t,e,a){var s=a(57).match(/firefox\/(\d+)/i);t.exports=!!s&&+s[1]},357:function(t,e,a){var s=a(57);t.exports=/MSIE|Trident/.test(s)},358:function(t,e,a){var s=a(57).match(/AppleWebKit\/(\d+)\./);t.exports=!!s&&+s[1]},508:function(t,e,a){"use strict";a.r(e);var s=a(56),r=(a(111),a(350),a(351),a(346),a(193),a(340)),n=a.n(r),o={props:{datasourceUrl:{type:String,default:""}},data:function(){return{response:null,error:""}},computed:{stats:function(){var t;return(null===(t=this.response)||void 0===t?void 0:t.data)||!1},sortedPlayRecords:function(){var t=(this.stats.gamesPlayed||[]).sort((function(t,e){var a=Date.parse(t.date);return Date.parse(e.date)-a}));return t}},methods:{pc:function(t){return(100*t).toFixed(1)+"%"}},mounted:function(){var t=this;return Object(s.a)(regeneratorRuntime.mark((function e(){var a,s;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=t.datasourceUrl;try{s=n.a.get(a),t.response={data:s}}catch(e){t.response=e.response,t.error="Unable to load ".concat(a," : ").concat(e.message)}case 2:case"end":return e.stop()}}),e)})))()}},u=a(54),l=Object(u.a)(o,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("code",{staticStyle:{display:"none"}},[t._v(t._s(t.datasourceUrl))]),t._v(" "),t.stats?a("div",[a("div",{staticClass:"stats group"},[a("h3",[t._v("Sequence")]),t._v(" "),a("stat-value",{attrs:{label:"Sequence start date"}},[t._v(t._s(t.stats.sequenceStartDate))]),t._v(" "),a("stat-value",{attrs:{label:"Sequence end date"}},[t._v(t._s(t.stats.sequenceEndDate))]),t._v(" "),a("stat-value",{attrs:{label:"Days in sequence"}},[t._v(t._s(t.stats.daysInSequence))]),t._v(" "),a("stat-value",{attrs:{label:"Days with unplayed games"}},[t._v(t._s(t.stats.daysWithUnplayedGames))])],1),t._v(" "),a("div",{staticClass:"stats group"},[a("h3",[t._v("Games played per day")]),t._v(" "),t._l(t.stats.gamesPlayedPerDay,(function(e,s){return a("stat-value",{key:"day-"+s,attrs:{label:"Day "+s}},[t._v(t._s(e))])}))],2),t._v(" "),a("div",{staticClass:"stats group"},[a("h3",[t._v("Games played")]),t._v(" "),a("stat-value",{attrs:{label:"Total games played"}},[t._v(t._s(t.stats.totalGamesPlayed))]),t._v(" "),a("stat-value",{attrs:{label:"Average games played per day"}},[t._v(t._s(t.stats.averageGamesPlayedPerDay))]),t._v(" "),a("p",[t._v("Found "+t._s(t.sortedPlayRecords.length)+" play records:")]),t._v(" "),t._l(t.sortedPlayRecords,(function(e,s){return a("p",{key:"playRecord_"+e.date+"_"+e.name+"_"+s},[a("b",[t._v(t._s(e.name))]),t._v(" "),e.date?a("stat-value",{attrs:{label:"Date"}},[t._v(t._s(e.date))]):t._e(),t._v(" "),a("stat-value",{attrs:{label:"Outcome"}},[a("game-stat-box",{attrs:{game:e,name:e.name}}),t._v(" "),a("span",[t._v(t._s(e.winner||e.coOpOutcome||"Undefined"))])],1),t._v(" "),e.notes?a("stat-value",{attrs:{label:"Notes"}},[t._v(t._s(e.notes))]):t._e()],1)}))],2),t._v(" "),a("div",{staticClass:"stats group"},[a("h3",[t._v("Most games played in a day")]),t._v(" "),t.stats.mostGamesPlayedInADay.length>1?a("p",[t._v("There were multiple days that tied for most games played in a day.")]):t._e(),t._v(" "),t._l(t.stats.mostGamesPlayedInADay,(function(e){return a("div",{key:e.date},[a("h4",[t._v(t._s(e.date))]),t._v(" "),a("ul",t._l(e.games,(function(e){return a("li",{key:"mp-"+e},[t._v(t._s(e))])})),0)])}))],2),t._v(" "),a("div",{staticClass:"stats group"},[a("h3",[t._v("Unique games played")]),t._v(" "),a("stat-value",{attrs:{label:"Unique games"}},[t._v(t._s(t.stats.uniqueGamesPlayedCount))]),t._v(" "),a("stat-value",{attrs:{label:"Unique games percent"}},[t._v(t._s(t.pc(t.stats.uniqueGamesPlayedPercentage)))]),t._v(" "),a("ul",t._l(t.stats.uniqueGamesPlayed,(function(e){return a("li",{key:"u-"+e},[t._v(t._s(e))])})),0)],1),t._v(" "),a("div",{staticClass:"stats group"},[a("h3",[t._v("Most played games")]),t._v(" "),a("ul",t._l(t.stats.mostPlayedGames,(function(e){return a("li",{key:"mpg-"+e.name},[a("stat-value",{attrs:{label:""+e.name}},[t._v(t._s(e.plays)+" play "+t._s(e.plays.length>1?"s":""))])],1)})),0)]),t._v(" "),a("div",{staticClass:"stats group"},[a("h3",[t._v("Who won the most games in this period?")]),t._v(" "),a("p",[a("b",[t._v(t._s(t.stats.mostWonGames))]),t._v(" won the most games!")])]),t._v(" "),a("div",{staticClass:"stats group"},[a("h3",[t._v("Hannah's most won games")]),t._v(" "),a("ul",t._l(t.stats.mostWonGamesHannah,(function(e){return a("li",{key:"mpg-"+e.game},[a("stat-value",{attrs:{label:""+e.game}},[t._v(t._s(e.plays)+" play "+t._s(e.plays.length>1?"s":""))])],1)})),0)]),t._v(" "),a("div",{staticClass:"stats group"},[a("h3",[t._v("John's most won games")]),t._v(" "),a("ul",t._l(t.stats.mostWonGamesJohn,(function(e){return a("li",{key:"mpg-"+e.game},[a("stat-value",{attrs:{label:""+e.game}},[t._v(t._s(e.plays)+" play "+t._s(e.plays.length>1?"s":""))])],1)})),0)]),t._v(" "),a("div",{staticClass:"stats group"},[a("h3",[t._v("Co-op Stats")]),t._v(" "),a("stat-value",{attrs:{label:"Co-op Games Played"}},[t._v(t._s(t.stats.coOpGamesPlayedCount))]),t._v(" "),a("stat-value",{attrs:{label:"Co-op Games Percentage"}},[t._v(t._s(t.pc(t.stats.coOpGamesPlayedPercentage)))]),t._v(" "),a("stat-value",{attrs:{label:"Co-op Games Win Rate"}},[t._v(t._s(t.pc(t.stats.coOpWinRate)))]),t._v(" "),a("stat-value",{attrs:{label:"Co-op Games Loss Rate"}},[t._v(t._s(t.pc(t.stats.coOpLossRate)))]),t._v(" "),a("stat-value",{attrs:{label:"Co-op Games Won"}},[t._v(t._s(t.stats.coOpGameWins))]),t._v(" "),a("stat-value",{attrs:{label:"Co-op Games Lost"}},[t._v(t._s(t.stats.coOpLossRate))])],1),t._v(" "),a("div",{staticClass:"stats group"},[a("h3",[t._v("Win Counts")]),t._v(" "),a("stat-value",{attrs:{label:"Wins by Hannah"}},[t._v(t._s(t.stats.winCountHannah))]),t._v(" "),a("stat-value",{attrs:{label:"Wins by John"}},[t._v(t._s(t.stats.winCountJohn))]),t._v(" "),a("stat-value",{attrs:{label:"Wins by Other players"}},[t._v(t._s(t.stats.winCountOther))]),t._v(" "),a("stat-value",{attrs:{label:"Drawn games"}},[t._v(t._s(t.stats.winCountDraw))])],1),t._v(" "),a("div",{staticClass:"stats group"},[a("h3",[t._v("Win Percentages")]),t._v(" "),a("stat-value",{attrs:{label:"Winnable games total"}},[t._v(t._s(t.stats.winnableGamesTotal))]),t._v(" "),a("stat-value",{attrs:{label:"Win percentage Hannah"}},[t._v(t._s(t.pc(t.stats.winPercentageHannah)))]),t._v(" "),a("stat-value",{attrs:{label:"Win percentage John"}},[t._v(t._s(t.pc(t.stats.winPercentageJohn)))]),t._v(" "),a("stat-value",{attrs:{label:"Win percentage by Other players"}},[t._v(t._s(t.pc(t.stats.winPercentageOther)))]),t._v(" "),a("stat-value",{attrs:{label:"Percentage of drawn games"}},[t._v(t._s(t.pc(t.stats.winPercentageDraw)))])],1),t._v(" "),a("pre",{staticStyle:{display:"none"}},[a("code",[t._v(t._s(t.stats))])])]):t._e(),t._v(" "),t.error?a("p",[t._v(t._s(t.error))]):t._e()])}),[],!1,null,null,null);e.default=l.exports}}]);