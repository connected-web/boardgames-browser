(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{382:function(e,a,t){},431:function(e,a,t){"use strict";t(382)},476:function(e,a,t){"use strict";t.r(a);var s={data:function(){return{apiUsername:"",apiKey:"",message:""}},methods:{handleSubmit:function(){localStorage.setItem("api-user-name",this.apiUsername),localStorage.setItem("api-user-key",this.apiKey),this.message="API Key for "+this.apiUsername+" stored on this device."},clearCredentials:function(){this.apiUsername="",this.apiKey="",localStorage.removeItem("api-user-name"),localStorage.removeItem("api-user-key"),this.message="Local credentials have been cleared from this device."}},mounted:function(){this.apiUsername=localStorage.getItem("api-user-name"),this.apiKey=localStorage.getItem("api-user-key"),this.apiUsername&&(this.message="Found user credentials for "+this.apiUsername+" on this device.")}},i=(t(431),t(54)),r=Object(i.a)(s,(function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",[t("p",[e._v("Use this form to register this device using your Board Games Tracker API key.")]),e._v(" "),t("div",{staticClass:"form-inputs"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.apiUsername,expression:"apiUsername"}],attrs:{placeholder:"Type your username"},domProps:{value:e.apiUsername},on:{input:function(a){a.target.composing||(e.apiUsername=a.target.value)}}}),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.apiKey,expression:"apiKey"}],attrs:{placeholder:"Type your API key"},domProps:{value:e.apiKey},on:{input:function(a){a.target.composing||(e.apiKey=a.target.value)}}})]),e._v(" "),t("p",{staticClass:"message"},[e._v(e._s(e.message))]),e._v(" "),t("p",{staticClass:"buttons"},[t("button",{on:{click:e.handleSubmit}},[e._v("Store Credentials")]),e._v(" "),t("button",{on:{click:e.clearCredentials}},[e._v("Clear Credentials from this Device")])])])}),[],!1,null,"0c7995f2",null);a.default=r.exports}}]);