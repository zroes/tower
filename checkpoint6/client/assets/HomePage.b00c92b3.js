import{_ as v,i as u,b as p,d as g,c as o,a as t,F as l,r as i,j as m,l as h,P as w,o as s,t as f,e as E,A as _,g as b}from"./index.602168d1.js";const y={setup(){const r=u("");async function a(){try{await m.getTowerEvents()}catch(e){h.error(e),w.error(e.message)}}return p(()=>{a()}),{types:["concert","convention","sport","digital"],towerEvents:g(()=>r.value?_.towerEvents.filter(e=>e.type==r.value):_.towerEvents),changeFilter(e){r.value=e}}}},x={class:"row justify-content-center m-0"},C={class:"col-7"},k={class:"row justify-content-between m-3"},F={class:"col text-center"},P={class:"col text-center"},j=["onClick"],B={class:"row m-3"},S={class:"col m-3 bg-darkish p-2 rounded elevation-5"};function A(r,a,e,c,H,N){const d=b("EventCard");return s(),o(l,null,[t("div",x,[t("div",C,[t("div",k,[t("div",F,[t("button",{onClick:a[0]||(a[0]=n=>c.changeFilter("")),class:"btn btn-light px-4"},"all")]),(s(!0),o(l,null,i(c.types,n=>(s(),o("div",P,[t("button",{onClick:T=>c.changeFilter(n),class:"btn btn-light px-4"},f(n),9,j)]))),256))])])]),t("div",B,[(s(!0),o(l,null,i(c.towerEvents,n=>(s(),o("div",S,[E(d,{towerEvent:n},null,8,["towerEvent"])]))),256))])],64)}const $=v(y,[["render",A],["__scopeId","data-v-8cb7e716"]]);export{$ as default};
