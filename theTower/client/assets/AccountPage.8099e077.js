import{_ as l,t as v,l as p,P as u,A as c}from"./index.e542a5f6.js";import{k as f,C as m,c as r,a as g,o,b as n,d as t,F as E,D as h,z as w,A as y,e as x}from"./vendor.a02b79d3.js";const A={name:"Account",setup(){const e=f(!0);return m(async()=>{try{await v.getMyEvents(),e.value=!1}catch(s){p.error(s),u.toast(s.message,"Error")}}),{account:r(()=>c.account),myEvents:r(()=>c.myTowerEvents)}}},d=e=>(w("data-v-6f979f76"),e=e(),y(),e),k={class:"container-fluid bg-dark"},S=d(()=>t("div",{class:"row"},[t("div",{class:"col-12"},[t("h1",{class:"text-light"},"Tower")])],-1)),I={class:"row"},P=d(()=>t("div",{class:"col-12"},[t("h4",{class:"text-success mt-3"},"Upcoming Events")],-1));function b(e,s,B,_,$,j){const i=g("Eventsattending");return o(),n("div",k,[S,t("div",I,[P,(o(!0),n(E,null,h(_.myEvents,a=>(o(),n("div",{class:"col-12",key:a.id},[x(i,{towerEvent:a.event,attendee:a},null,8,["towerEvent","attendee"])]))),128))])])}var M=l(A,[["render",b],["__scopeId","data-v-6f979f76"]]);export{M as default};