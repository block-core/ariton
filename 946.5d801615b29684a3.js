"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[946],{50946:(W,f,n)=>{n.r(f),n.d(f,{AppsComponent:()=>K});var t=n(54438),_=n(65571),M=n(99213),v=n(99631),O=n(53719),c=n(89417),C=n(60177),d=n(2042),m=n(96695),o=n(9159),s=n(25596),E=n(88834),g=n(30046),D=n(30450),P=n(55911),R=n(16195),y=n(59115),A=n(36815);const u=a=>["/app",a],T=()=>[5,10,20];function U(a,i){if(1&a&&(t.j41(0,"mat-card",11)(1,"mat-card-header")(2,"mat-card-title")(3,"a",12),t.EFF(4),t.k0s()()(),t.nrm(5,"br")(6,"img",13),t.j41(7,"mat-card-content",14),t.nrm(8,"br"),t.j41(9,"p"),t.EFF(10),t.k0s()(),t.j41(11,"div",15)(12,"mat-card-actions",16)(13,"button",17),t.EFF(14,"OPEN"),t.k0s()()()()),2&a){const e=i.$implicit;t.R7$(3),t.Y8G("routerLink",t.eq3(5,u,e.id)),t.R7$(),t.JRh(e.title),t.R7$(2),t.Y8G("src",e.imageUrl,t.B4B),t.R7$(4),t.JRh(e.description),t.R7$(3),t.Y8G("routerLink",t.eq3(7,u,e.id))}}function b(a,i){if(1&a&&(t.j41(0,"div",8),t.DNE(1,U,15,9,"mat-card",10),t.k0s()),2&a){const e=t.XpG();t.R7$(),t.Y8G("ngForOf",e.cards())}}function w(a,i){1&a&&(t.j41(0,"th",27),t.EFF(1,"Icon"),t.k0s())}function k(a,i){if(1&a&&(t.j41(0,"td",28),t.nrm(1,"img",29),t.k0s()),2&a){const e=i.$implicit;t.R7$(),t.Y8G("src",e.imageUrl,t.B4B)}}function B(a,i){1&a&&(t.j41(0,"th",27),t.EFF(1,"Name"),t.k0s())}function x(a,i){if(1&a&&(t.j41(0,"td",28),t.EFF(1),t.k0s()),2&a){const e=i.$implicit;t.R7$(),t.JRh(e.title)}}function F(a,i){1&a&&(t.j41(0,"th",27),t.EFF(1,"Description"),t.k0s())}function I(a,i){if(1&a&&(t.j41(0,"td",28),t.EFF(1),t.k0s()),2&a){const e=i.$implicit;t.R7$(),t.JRh(e.description)}}function L(a,i){1&a&&t.nrm(0,"tr",30)}function j(a,i){1&a&&t.nrm(0,"tr",31),2&a&&t.Y8G("routerLink",t.eq3(1,u,i.$implicit.id))}function S(a,i){if(1&a&&(t.j41(0,"div",9)(1,"table",18),t.qex(2,19),t.DNE(3,w,2,0,"th",20)(4,k,2,1,"td",21),t.bVm(),t.qex(5,22),t.DNE(6,B,2,0,"th",20)(7,x,2,1,"td",21),t.bVm(),t.qex(8,23),t.DNE(9,F,2,0,"th",20)(10,I,2,1,"td",21),t.bVm(),t.DNE(11,L,1,0,"tr",24)(12,j,1,3,"tr",25),t.k0s(),t.nrm(13,"p")(14,"p")(15,"mat-paginator",26,0),t.k0s()),2&a){const e=t.XpG();t.R7$(11),t.Y8G("matHeaderRowDef",e.displayedColumns),t.R7$(),t.Y8G("matRowDefColumns",e.displayedColumns),t.R7$(3),t.Y8G("length",e.cards().length)("pageIndex",0)("pageSize",10)("pageSizeOptions",t.lJ4(6,T))}}let K=(()=>{class a{constructor(e){this.router=e,this.search=new c.MJ(""),this.cards=(0,t.vPA)([]),this.viewStyle=(0,t.geq)("card"),this.checked=(0,t.geq)(!1),this.layout=(0,t.WQX)(A.Y),this.displayedColumns=["imageUrl","title","description"],this.layout.marginOn(),(0,t.QZP)(()=>{"table"===this.viewStyle()&&setTimeout(()=>{this.table.dataSource=this.cards(),console.log("DATA SOURCE SEt ON TABLE!!!")})}),(0,t.QZP)(()=>{console.log(`The checked is: ${this.checked()})`)})}open(e){this.router.navigate(["community",e])}ngAfterViewInit(){const e=[];e.push({title:"Chat",id:"chat",description:"Send private messages to other users.",imageUrl:"/icons/apps/chat.jpg"}),e.push({title:"Files",id:"files",description:"Upload and share files stored on your DWeb node.",imageUrl:"/icons/apps/files.jpg"}),e.push({title:"Notes",id:"notes",description:"Manage your private and shared notes.",imageUrl:"/icons/apps/notes.jpg"}),e.push({title:"Tasks",id:"tasks",description:"Manage your private and shared tasks.",imageUrl:"/icons/apps/tasks.jpg"}),e.push({title:"Text",id:"text",description:"Keep your inspiration going with this text editor. Use it to write and share your thoughts.",imageUrl:"/icons/apps/text.jpg"}),e.push({title:"Issuer",id:"issuer",description:"Generic Credential Issuer app.",imageUrl:"/icons/apps/issuer.webp"}),e.push({title:"Voluntaryist Covenant",id:"voluntaryist-covenant",description:"The covenant is based on the natural rights of self-ownership, non-aggression, and property rights. Use this app to sign the covenant and store the credential.",imageUrl:"https://static.wixstatic.com/media/b8788b_e8db1fae306c4f4d95423ae5861f8fb3~mv2.png/v1/fill/w_128,h_128,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/World_Voluntaryist_Organisation-removebg-preview.png"}),e.push({title:"Player",id:"player",description:"Player for listening to music, watching videos and podcasts.",imageUrl:"/icons/apps/player.jpg"}),e.push({title:"Known Customer Credential",id:"kcc",description:"Allows issuance of Known Customer Credential (KCC) to users that includes evidence from their KYC verification.",imageUrl:"/icons/apps/kcc.webp"}),this.cards.set(e)}static{this.\u0275fac=function(l){return new(l||a)(t.rXU(g.Ix))}}static{this.\u0275cmp=t.VBU({type:a,selectors:[["app-apps"]],viewQuery:function(l,r){if(1&l&&(t.GBs(m.iy,5),t.GBs(d.B4,5),t.GBs(o.Zl,5)),2&l){let p;t.mGM(p=t.lsd())&&(r.paginator=p.first),t.mGM(p=t.lsd())&&(r.sort=p.first),t.mGM(p=t.lsd())&&(r.table=p.first)}},inputs:{viewStyle:[1,"viewStyle"],checked:[1,"checked"]},outputs:{viewStyle:"viewStyleChange",checked:"checkedChange"},standalone:!0,features:[t.aNF],decls:11,vars:2,consts:[["paginator",""],[1,"toolbar-actions","margin-bottom"],[1,"flex"],[1,"toolbar-spacer"],["type","search","placeholder","Filter apps",1,"search-input"],["hideSingleSelectionIndicator","true",3,"ngModelChange","ngModel"],["value","card"],["value","table"],[1,"container","responsive-grid"],[1,"mat-elevation-z8"],["class","app-card",4,"ngFor","ngForOf"],[1,"app-card"],[1,"link",3,"routerLink"],["mat-card-image","",1,"app-card-image",3,"src"],[1,"app-card-content"],[1,"app-card-footer"],[1,"full-width-actions"],["mat-button","",1,"full-width-button",3,"routerLink"],["mat-table","","matSort","","aria-label","Elements",1,"full-width-table"],["matColumnDef","imageUrl"],["mat-header-cell","","mat-sort-header","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","title"],["matColumnDef","description"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","","class","clickable-row",3,"routerLink",4,"matRowDef","matRowDefColumns"],["aria-label","Select page",3,"length","pageIndex","pageSize","pageSizeOptions"],["mat-header-cell","","mat-sort-header",""],["mat-cell",""],["alt","Icon",1,"app-table-image",3,"src"],["mat-header-row",""],["mat-row","",1,"clickable-row",3,"routerLink"]],template:function(l,r){1&l&&(t.j41(0,"mat-card",1)(1,"mat-card-content",2)(2,"span",3),t.nrm(3,"input",4),t.k0s(),t.j41(4,"mat-button-toggle-group",5),t.mxI("ngModelChange",function(h){return t.DH7(r.viewStyle,h)||(r.viewStyle=h),h}),t.j41(5,"mat-button-toggle",6),t.EFF(6,"Cards"),t.k0s(),t.j41(7,"mat-button-toggle",7),t.EFF(8,"Table"),t.k0s()()()(),t.DNE(9,b,2,1,"div",8)(10,S,17,7,"div",9)),2&l&&(t.R7$(4),t.R50("ngModel",r.viewStyle),t.R7$(5),t.vxM("card"==r.viewStyle()?9:10))},dependencies:[_.Vg,_.ec,_.pc,M.m_,v.fS,O.RG,c.X1,c.BC,C.MD,C.Sq,E.Hl,E.$z,s.Hu,s.RN,s.YY,s.m2,s.MM,s.kF,s.dh,o.tP,o.Zl,o.tL,o.ji,o.cC,o.YV,o.iL,o.KS,o.$R,o.YZ,o.NB,m.Ou,m.iy,d.NQ,d.B4,d.aE,D.mV,c.YN,c.vS,P.s5,R.Fe,y.Cn,g.iI,g.Wk],styles:[".responsive-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:1em}.grid-container[_ngcontent-%COMP%]{margin:20px}.dashboard-card[_ngcontent-%COMP%]{position:absolute;inset:0}.clickable-row[_ngcontent-%COMP%]{cursor:pointer}.clickable-row[_ngcontent-%COMP%]:hover{background-color:var(--mat-app-text-color);color:var(--mat-app-background-color)}.app-card-image[_ngcontent-%COMP%]{background-color:#fff;width:100%;height:200px;object-fit:contain;object-position:center}.app-table-image[_ngcontent-%COMP%]{width:24px;height:24px;background-color:#fff}.app-card[_ngcontent-%COMP%]{display:flex;flex-direction:column;height:100%}.app-card-content[_ngcontent-%COMP%]{flex-grow:1}.app-card-footer[_ngcontent-%COMP%]{display:flex;justify-content:flex-start}.full-width-actions[_ngcontent-%COMP%]{width:100%;display:flex}.full-width-button[_ngcontent-%COMP%]{flex-grow:1}"]})}}return a})()}}]);