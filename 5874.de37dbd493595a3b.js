"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[5874],{45874:(C,s,o)=>{o.r(s),o.d(s,{BlocksComponent:()=>O});var t=o(54438),d=o(81317),m=o(5363),E=o(60177),c=o(25596),l=o(88834),u=o(99213),r=o(30046);const p=n=>["/profile",n];function M(n,_){if(1&n){const a=t.RV6();t.j41(0,"mat-card",1)(1,"mat-card-content"),t.EFF(2),t.k0s(),t.j41(3,"mat-card-actions")(4,"button",2),t.EFF(5,"VIEW PROFILE"),t.k0s(),t.j41(6,"button",3),t.bIt("click",function(){const e=t.eBV(a).$implicit,P=t.XpG();return t.Njj(P.deleteBlock(e))}),t.EFF(7,"DELETE"),t.k0s()()()}if(2&n){const a=_.$implicit;t.R7$(2),t.SpI(" ",a.data.did," "),t.R7$(2),t.Y8G("routerLink",t.eq3(3,p,a.data.did)),t.R7$(2),t.Y8G("disabled",a.loading)}}function f(n,_){1&n&&t.EFF(0," No blocks found. ")}let O=(()=>{class n{constructor(){this.service=(0,t.WQX)(d.K),this.app=(0,t.WQX)(m.d)}deleteBlock(a){a.loading=!0,this.service.deleteBlock(a)}static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275cmp=t.VBU({type:n,selectors:[["app-blocks"]],standalone:!0,features:[t.aNF],decls:8,vars:1,consts:[[1,"notifications-card"],["appearance","outlined",1,"card-notification"],["mat-flat-button","",3,"routerLink"],["mat-button","",3,"click","disabled"]],template:function(i,e){1&i&&(t.j41(0,"h1"),t.EFF(1,"Blocks Management"),t.k0s(),t.j41(2,"mat-card",0),t.nrm(3,"mat-card-header"),t.j41(4,"mat-card-content"),t.Z7z(5,M,8,5,"mat-card",1,t.fX1,!1,f,1,0),t.k0s()()),2&i&&(t.R7$(5),t.Dyx(e.service.blocks()))},dependencies:[E.MD,c.Hu,c.RN,c.YY,c.m2,c.MM,l.Hl,l.$z,u.m_,r.iI,r.Wk],styles:[".card-icon[_ngcontent-%COMP%]{font-size:3em}.card-notification[_ngcontent-%COMP%]{margin-bottom:1em}.notifications-title[_ngcontent-%COMP%]{display:flex;width:100%}[_nghost-%COMP%]{display:flex;flex-direction:column;align-items:center}.notifications-card[_ngcontent-%COMP%]{max-width:600px;width:100%}.card-notification[_ngcontent-%COMP%]   mat-card-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:100%}.notification-description[_ngcontent-%COMP%]{margin-bottom:1em}"]})}}return n})()}}]);