function et(s,a){for(var y=0;y<a.length;y++){const p=a[y];if(typeof p!="string"&&!Array.isArray(p)){for(const _ in p)if(_!=="default"&&!(_ in s)){const h=Object.getOwnPropertyDescriptor(p,_);h&&Object.defineProperty(s,_,h.get?h:{enumerable:!0,get:()=>p[_]})}}}return Object.freeze(Object.defineProperty(s,Symbol.toStringTag,{value:"Module"}))}function rt(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}var P={exports:{}},r={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var z;function nt(){if(z)return r;z=1;var s=Symbol.for("react.transitional.element"),a=Symbol.for("react.portal"),y=Symbol.for("react.fragment"),p=Symbol.for("react.strict_mode"),_=Symbol.for("react.profiler"),h=Symbol.for("react.consumer"),w=Symbol.for("react.context"),R=Symbol.for("react.forward_ref"),T=Symbol.for("react.suspense"),A=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),W=Symbol.for("react.activity"),N=Symbol.iterator;function Z(t){return t===null||typeof t!="object"?null:(t=N&&t[N]||t["@@iterator"],typeof t=="function"?t:null)}var b={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},H=Object.assign,L={};function m(t,e,o){this.props=t,this.context=e,this.refs=L,this.updater=o||b}m.prototype.isReactComponent={},m.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")},m.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function I(){}I.prototype=m.prototype;function M(t,e,o){this.props=t,this.context=e,this.refs=L,this.updater=o||b}var x=M.prototype=new I;x.constructor=M,H(x,m.prototype),x.isPureReactComponent=!0;var Y=Array.isArray;function O(){}var i={H:null,A:null,T:null,S:null},q=Object.prototype.hasOwnProperty;function S(t,e,o){var n=o.ref;return{$$typeof:s,type:t,key:e,ref:n!==void 0?n:null,props:o}}function Q(t,e){return S(t.type,e,t.props)}function j(t){return typeof t=="object"&&t!==null&&t.$$typeof===s}function X(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(o){return e[o]})}var U=/\/+/g;function $(t,e){return typeof t=="object"&&t!==null&&t.key!=null?X(""+t.key):e.toString(36)}function J(t){switch(t.status){case"fulfilled":return t.value;case"rejected":throw t.reason;default:switch(typeof t.status=="string"?t.then(O,O):(t.status="pending",t.then(function(e){t.status==="pending"&&(t.status="fulfilled",t.value=e)},function(e){t.status==="pending"&&(t.status="rejected",t.reason=e)})),t.status){case"fulfilled":return t.value;case"rejected":throw t.reason}}throw t}function C(t,e,o,n,u){var c=typeof t;(c==="undefined"||c==="boolean")&&(t=null);var f=!1;if(t===null)f=!0;else switch(c){case"bigint":case"string":case"number":f=!0;break;case"object":switch(t.$$typeof){case s:case a:f=!0;break;case g:return f=t._init,C(f(t._payload),e,o,n,u)}}if(f)return u=u(t),f=n===""?"."+$(t,0):n,Y(u)?(o="",f!=null&&(o=f.replace(U,"$&/")+"/"),C(u,e,o,"",function(tt){return tt})):u!=null&&(j(u)&&(u=Q(u,o+(u.key==null||t&&t.key===u.key?"":(""+u.key).replace(U,"$&/")+"/")+f)),e.push(u)),1;f=0;var d=n===""?".":n+":";if(Y(t))for(var l=0;l<t.length;l++)n=t[l],c=d+$(n,l),f+=C(n,e,o,c,u);else if(l=Z(t),typeof l=="function")for(t=l.call(t),l=0;!(n=t.next()).done;)n=n.value,c=d+$(n,l++),f+=C(n,e,o,c,u);else if(c==="object"){if(typeof t.then=="function")return C(J(t),e,o,n,u);throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.")}return f}function k(t,e,o){if(t==null)return t;var n=[],u=0;return C(t,n,"","",function(c){return e.call(o,c,u++)}),n}function V(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(o){(t._status===0||t._status===-1)&&(t._status=1,t._result=o)},function(o){(t._status===0||t._status===-1)&&(t._status=2,t._result=o)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var D=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},F={map:k,forEach:function(t,e,o){k(t,function(){e.apply(this,arguments)},o)},count:function(t){var e=0;return k(t,function(){e++}),e},toArray:function(t){return k(t,function(e){return e})||[]},only:function(t){if(!j(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};return r.Activity=W,r.Children=F,r.Component=m,r.Fragment=y,r.Profiler=_,r.PureComponent=M,r.StrictMode=p,r.Suspense=T,r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=i,r.__COMPILER_RUNTIME={__proto__:null,c:function(t){return i.H.useMemoCache(t)}},r.cache=function(t){return function(){return t.apply(null,arguments)}},r.cacheSignal=function(){return null},r.cloneElement=function(t,e,o){if(t==null)throw Error("The argument must be a React element, but you passed "+t+".");var n=H({},t.props),u=t.key;if(e!=null)for(c in e.key!==void 0&&(u=""+e.key),e)!q.call(e,c)||c==="key"||c==="__self"||c==="__source"||c==="ref"&&e.ref===void 0||(n[c]=e[c]);var c=arguments.length-2;if(c===1)n.children=o;else if(1<c){for(var f=Array(c),d=0;d<c;d++)f[d]=arguments[d+2];n.children=f}return S(t.type,u,n)},r.createContext=function(t){return t={$$typeof:w,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null},t.Provider=t,t.Consumer={$$typeof:h,_context:t},t},r.createElement=function(t,e,o){var n,u={},c=null;if(e!=null)for(n in e.key!==void 0&&(c=""+e.key),e)q.call(e,n)&&n!=="key"&&n!=="__self"&&n!=="__source"&&(u[n]=e[n]);var f=arguments.length-2;if(f===1)u.children=o;else if(1<f){for(var d=Array(f),l=0;l<f;l++)d[l]=arguments[l+2];u.children=d}if(t&&t.defaultProps)for(n in f=t.defaultProps,f)u[n]===void 0&&(u[n]=f[n]);return S(t,c,u)},r.createRef=function(){return{current:null}},r.forwardRef=function(t){return{$$typeof:R,render:t}},r.isValidElement=j,r.lazy=function(t){return{$$typeof:g,_payload:{_status:-1,_result:t},_init:V}},r.memo=function(t,e){return{$$typeof:A,type:t,compare:e===void 0?null:e}},r.startTransition=function(t){var e=i.T,o={};i.T=o;try{var n=t(),u=i.S;u!==null&&u(o,n),typeof n=="object"&&n!==null&&typeof n.then=="function"&&n.then(O,D)}catch(c){D(c)}finally{e!==null&&o.types!==null&&(e.types=o.types),i.T=e}},r.unstable_useCacheRefresh=function(){return i.H.useCacheRefresh()},r.use=function(t){return i.H.use(t)},r.useActionState=function(t,e,o){return i.H.useActionState(t,e,o)},r.useCallback=function(t,e){return i.H.useCallback(t,e)},r.useContext=function(t){return i.H.useContext(t)},r.useDebugValue=function(){},r.useDeferredValue=function(t,e){return i.H.useDeferredValue(t,e)},r.useEffect=function(t,e){return i.H.useEffect(t,e)},r.useEffectEvent=function(t){return i.H.useEffectEvent(t)},r.useId=function(){return i.H.useId()},r.useImperativeHandle=function(t,e,o){return i.H.useImperativeHandle(t,e,o)},r.useInsertionEffect=function(t,e){return i.H.useInsertionEffect(t,e)},r.useLayoutEffect=function(t,e){return i.H.useLayoutEffect(t,e)},r.useMemo=function(t,e){return i.H.useMemo(t,e)},r.useOptimistic=function(t,e){return i.H.useOptimistic(t,e)},r.useReducer=function(t,e,o){return i.H.useReducer(t,e,o)},r.useRef=function(t){return i.H.useRef(t)},r.useState=function(t){return i.H.useState(t)},r.useSyncExternalStore=function(t,e,o){return i.H.useSyncExternalStore(t,e,o)},r.useTransition=function(){return i.H.useTransition()},r.version="19.2.5",r}var B;function ot(){return B||(B=1,P.exports=nt()),P.exports}var E=ot();const ut=rt(E),Rt=et({__proto__:null,default:ut},[E]);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const st=s=>s.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),ct=s=>s.replace(/^([A-Z])|[\s-_]+(\w)/g,(a,y,p)=>p?p.toUpperCase():y.toLowerCase()),G=s=>{const a=ct(s);return a.charAt(0).toUpperCase()+a.slice(1)},K=(...s)=>s.filter((a,y,p)=>!!a&&a.trim()!==""&&p.indexOf(a)===y).join(" ").trim(),it=s=>{for(const a in s)if(a.startsWith("aria-")||a==="role"||a==="title")return!0};/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var ft={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const at=E.forwardRef(({color:s="currentColor",size:a=24,strokeWidth:y=2,absoluteStrokeWidth:p,className:_="",children:h,iconNode:w,...R},T)=>E.createElement("svg",{ref:T,...ft,width:a,height:a,stroke:s,strokeWidth:p?Number(y)*24/Number(a):y,className:K("lucide",_),...!h&&!it(R)&&{"aria-hidden":"true"},...R},[...w.map(([A,g])=>E.createElement(A,g)),...Array.isArray(h)?h:[h]]));/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=(s,a)=>{const y=E.forwardRef(({className:p,..._},h)=>E.createElement(at,{ref:h,iconNode:a,className:K(`lucide-${st(G(s))}`,`lucide-${s}`,p),..._}));return y.displayName=G(s),y};/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pt=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],gt=v("arrow-right",pt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yt=[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}]],kt=v("book-open",yt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lt=[["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2",key:"1nb95v"}],["line",{x1:"8",x2:"16",y1:"6",y2:"6",key:"x4nwl0"}],["line",{x1:"16",x2:"16",y1:"14",y2:"18",key:"wjye3r"}],["path",{d:"M16 10h.01",key:"1m94wz"}],["path",{d:"M12 10h.01",key:"1nrarc"}],["path",{d:"M8 10h.01",key:"19clt8"}],["path",{d:"M12 14h.01",key:"1etili"}],["path",{d:"M8 14h.01",key:"6423bh"}],["path",{d:"M12 18h.01",key:"mhygvu"}],["path",{d:"M8 18h.01",key:"lrp35t"}]],wt=v("calculator",lt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ht=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]],Tt=v("calendar",ht);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _t=[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]],At=v("chart-column",_t);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dt=[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]],Mt=v("chevron-left",dt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vt=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"M9 9h.01",key:"1q5me6"}],["path",{d:"M15 15h.01",key:"lqbp3k"}]],xt=v("circle-percent",vt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Et=[["rect",{width:"7",height:"7",x:"3",y:"3",rx:"1",key:"1g98yp"}],["rect",{width:"7",height:"7",x:"14",y:"3",rx:"1",key:"6d4xhi"}],["rect",{width:"7",height:"7",x:"14",y:"14",rx:"1",key:"nxv5o0"}],["rect",{width:"7",height:"7",x:"3",y:"14",rx:"1",key:"1bb6yr"}]],Ot=v("layout-grid",Et);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mt=[["path",{d:"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",key:"1sd12s"}]],St=v("message-circle",mt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ct=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]],jt=v("refresh-cw",Ct);export{gt as A,kt as B,Mt as C,Ot as L,St as M,Rt as R,E as a,Tt as b,xt as c,jt as d,At as e,wt as f,rt as g,ot as r};
