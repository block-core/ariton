"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[2320],{62320:(F,c,a)=>{a.r(c),a.d(c,{DashboardComponent:()=>b});var p=a(10467),t=a(93953),l=a(99327),h=a(96354),C=a(60177),_=a(16195),s=a(59115),m=a(99213),d=a(88834),e=a(25596),u=a(18498),D=a(31439),M=a(36815),O=a(34635);const P=()=>["/introduction"];function v(n,E){if(1&n){const o=t.RV6();t.j41(0,"mat-card")(1,"mat-card-header")(2,"mat-card-title"),t.EFF(3,"Read the introduction"),t.k0s(),t.j41(4,"mat-card-subtitle"),t.EFF(5,"New to Ariton (alpha)? Check out the introduction."),t.k0s()(),t.j41(6,"mat-card-actions")(7,"button",5),t.EFF(8,"READ INTRODUCTION"),t.k0s(),t.j41(9,"button",6),t.bIt("click",function(){t.eBV(o);const i=t.XpG();return t.Njj(i.hideIntroduction())}),t.EFF(10,"HIDE"),t.k0s()()()}2&n&&(t.R7$(7),t.Y8G("routerLink",t.lJ4(1,P)))}function g(n,E){if(1&n&&(t.j41(0,"mat-grid-tile",4)(1,"mat-card",7)(2,"mat-card-header")(3,"mat-card-title"),t.EFF(4),t.j41(5,"button",8)(6,"mat-icon"),t.EFF(7,"more_vert"),t.k0s()(),t.j41(8,"mat-menu",9,0)(10,"button",10),t.EFF(11,"Expand"),t.k0s(),t.j41(12,"button",10),t.EFF(13,"Remove"),t.k0s()()()(),t.j41(14,"mat-card-content",11)(15,"div"),t.EFF(16,"Card Content Here"),t.k0s()()()()),2&n){const o=E.$implicit,r=t.sdS(9);t.Y8G("colspan",o.cols)("rowspan",o.rows),t.R7$(4),t.SpI(" ",o.title," "),t.R7$(),t.Y8G("matMenuTriggerFor",r)}}let b=(()=>{class n{constructor(o){this.identity=o,this.breakpointObserver=(0,t.WQX)(l.QP),this.appService=(0,t.WQX)(D.d),this.layout=(0,t.WQX)(M.Y),this.cards=this.breakpointObserver.observe(l.Rp.Handset).pipe((0,h.T)(({matches:r})=>r?[{title:"Card 1",cols:1,rows:1},{title:"Card 2",cols:1,rows:1},{title:"Card 3",cols:1,rows:1},{title:"Card 4",cols:1,rows:1}]:[{title:"Card 1",cols:2,rows:1},{title:"Card 2",cols:1,rows:1},{title:"Card 3",cols:1,rows:2},{title:"Card 4",cols:1,rows:1}])),this.layout.resetActions()}ngOnInit(){return(0,p.A)(function*(){})()}hideIntroduction(){this.appService.state().hidden.introduction=!0,this.appService.saveState()}static#t=this.\u0275fac=function(r){return new(r||n)(t.rXU(O.K))};static#a=this.\u0275cmp=t.VBU({type:n,selectors:[["app-dashboard"]],standalone:!0,features:[t.aNF],decls:8,vars:3,consts:[["menu","matMenu"],[1,"grid-container"],[1,"mat-h1"],["cols","2","rowHeight","350px"],[3,"colspan","rowspan"],["mat-button","",3,"routerLink"],["mat-button","",3,"click"],[1,"dashboard-card"],["mat-icon-button","","aria-label","Toggle menu",1,"more-button",3,"matMenuTriggerFor"],["xPosition","before"],["mat-menu-item",""],[1,"dashboard-card-content"]],template:function(r,i){1&r&&(t.j41(0,"div",1)(1,"h1",2),t.EFF(2,"Dashboard"),t.k0s(),t.DNE(3,v,11,2,"mat-card"),t.j41(4,"mat-grid-list",3),t.Z7z(5,g,17,4,"mat-grid-tile",4,t.fX1),t.nI1(7,"async"),t.k0s()()),2&r&&(t.R7$(3),t.vxM(i.appService.state().hidden.introduction?-1:3),t.R7$(2),t.Dyx(t.bMT(7,1,i.cards)))},dependencies:[C.Jj,_.Fe,_.B_,_.NS,s.Cn,s.kk,s.fb,s.Cp,m.m_,m.An,d.Hl,d.$z,d.iY,e.Hu,e.RN,e.YY,e.m2,e.MM,e.Lc,e.dh,u.iI,u.Wk],styles:[".grid-container[_ngcontent-%COMP%]{margin:20px}.dashboard-card[_ngcontent-%COMP%]{position:absolute;inset:15px}.more-button[_ngcontent-%COMP%]{position:absolute;top:5px;right:10px}.dashboard-card-content[_ngcontent-%COMP%]{text-align:center}"]})}return n})()}}]);