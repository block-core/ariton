"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[8487],{8487:(X,x,i)=>{i.r(x),i.d(x,{AppsComponent:()=>Q});var t=i(93953),u=i(65571),b=i(99213),w=i(99631),c=i(53719),m=i(89417),f=i(60177),p=i(2042),C=i(96695),r=i(9159),l=i(25596),v=i(88834),A=i(45024),R=i(96354),T=i(57786),$=i(7673);const j=[{id:1,name:"Hydrogen"},{id:2,name:"Helium"},{id:3,name:"Lithium"},{id:4,name:"Beryllium"},{id:5,name:"Boron"},{id:6,name:"Carbon"},{id:7,name:"Nitrogen"},{id:8,name:"Oxygen"},{id:9,name:"Fluorine"},{id:10,name:"Neon"},{id:11,name:"Sodium"},{id:12,name:"Magnesium"},{id:13,name:"Aluminum"},{id:14,name:"Silicon"},{id:15,name:"Phosphorus"},{id:16,name:"Sulfur"},{id:17,name:"Chlorine"},{id:18,name:"Argon"},{id:19,name:"Potassium"},{id:20,name:"Calcium"}];class k extends A.qS{constructor(){super(),this.data=j}connect(){if(this.paginator&&this.sort)return(0,T.h)((0,$.of)(this.data),this.paginator.page,this.sort.sortChange).pipe((0,R.T)(()=>this.getPagedData(this.getSortedData([...this.data]))));throw Error("Please set the paginator and sort on the data source before connecting.")}disconnect(){}getPagedData(o){return this.paginator?o.splice(this.paginator.pageIndex*this.paginator.pageSize,this.paginator.pageSize):o}getSortedData(o){return this.sort&&this.sort.active&&""!==this.sort.direction?o.sort((n,s)=>{const a="asc"===this.sort?.direction;switch(this.sort?.active){case"name":return M(n.name,s.name,a);case"id":return M(+n.id,+s.id,a);default:return 0}}):o}}function M(e,o,n){return(e<o?-1:1)*(n?1:-1)}var F=i(18498),P=i(30450),D=i(55911),S=i(16195),h=i(59115),E=i(99327);const g=()=>["/app","chat"],G=()=>[5,10,20];function O(e,o){if(1&e&&(t.j41(0,"mat-grid-tile",13)(1,"mat-card",16)(2,"mat-card-header")(3,"mat-card-title"),t.EFF(4),t.j41(5,"button",17)(6,"mat-icon"),t.EFF(7,"more_vert"),t.k0s()(),t.j41(8,"mat-menu",18,0)(10,"button",19),t.EFF(11,"Install"),t.k0s(),t.j41(12,"button",19),t.EFF(13,"Preview"),t.k0s()()()(),t.j41(14,"mat-card-content",20)(15,"div"),t.EFF(16),t.k0s()()()()),2&e){const n=o.$implicit,s=t.sdS(9);t.Y8G("colspan",n.cols)("rowspan",n.rows),t.R7$(4),t.SpI(" ",n.title," "),t.R7$(),t.Y8G("matMenuTriggerFor",s),t.R7$(5),t.Y8G("routerLink",t.lJ4(7,g)),t.R7$(2),t.Y8G("routerLink",t.lJ4(8,g)),t.R7$(4),t.JRh(n.description)}}function I(e,o){if(1&e&&(t.j41(0,"mat-card")(1,"mat-card-header")(2,"mat-card-title"),t.EFF(3),t.k0s()(),t.nrm(4,"br")(5,"img",21),t.j41(6,"mat-card-content"),t.nrm(7,"br"),t.j41(8,"p"),t.EFF(9),t.k0s()(),t.j41(10,"mat-card-actions")(11,"button",22),t.EFF(12,"INSTALL"),t.k0s(),t.j41(13,"button",22),t.EFF(14,"PREVIEW"),t.k0s()()()),2&e){const n=o.$implicit;t.R7$(3),t.SpI("",n.title," "),t.R7$(2),t.Y8G("src",n.imageUrl,t.B4B),t.R7$(4),t.SpI(" ",n.description," "),t.R7$(2),t.Y8G("routerLink",t.lJ4(5,g)),t.R7$(2),t.Y8G("routerLink",t.lJ4(6,g))}}function Y(e,o){if(1&e&&(t.j41(0,"mat-grid-list",12),t.Z7z(1,O,17,9,"mat-grid-tile",13,t.fX1),t.nI1(3,"async"),t.k0s(),t.j41(4,"div",14),t.DNE(5,I,15,7,"mat-card",15),t.k0s()),2&e){const n=t.XpG();t.R7$(),t.Dyx(t.bMT(3,1,n.cardsHighlighted)),t.R7$(4),t.Y8G("ngForOf",n.cards())}}function N(e,o){1&e&&(t.j41(0,"th",31),t.EFF(1,"Id"),t.k0s())}function B(e,o){if(1&e&&(t.j41(0,"td",32),t.EFF(1),t.k0s()),2&e){const n=o.$implicit;t.R7$(),t.JRh(n.id)}}function H(e,o){1&e&&(t.j41(0,"th",31),t.EFF(1,"Name"),t.k0s())}function L(e,o){if(1&e&&(t.j41(0,"td",32),t.EFF(1),t.k0s()),2&e){const n=o.$implicit;t.R7$(),t.JRh(n.name)}}function J(e,o){1&e&&t.nrm(0,"tr",33)}function z(e,o){1&e&&t.nrm(0,"tr",34)}function V(e,o){if(1&e&&(t.j41(0,"div",11)(1,"table",23),t.qex(2,24),t.DNE(3,N,2,0,"th",25)(4,B,2,1,"td",26),t.bVm(),t.qex(5,27),t.DNE(6,H,2,0,"th",25)(7,L,2,1,"td",26),t.bVm(),t.DNE(8,J,1,0,"tr",28)(9,z,1,0,"tr",29),t.k0s(),t.nrm(10,"mat-paginator",30,1),t.k0s()),2&e){const n=t.XpG();t.R7$(8),t.Y8G("matHeaderRowDef",n.displayedColumns),t.R7$(),t.Y8G("matRowDefColumns",n.displayedColumns),t.R7$(),t.Y8G("length",n.dataSource.data.length)("pageIndex",0)("pageSize",10)("pageSizeOptions",t.lJ4(6,G))}}let Q=(()=>{class e{constructor(n){this.router=n,this.search=new m.MJ(""),this.dataSource=new k,this.cards=(0,t.vPA)([]),this.images=["nature","sky","grass","mountains","rivers","glacier","forest","streams","rain","clouds"],this.viewStyle=(0,t.geq)("card"),this.checked=(0,t.geq)(!1),this.displayedColumns=["id","name"],this.breakpointObserver=(0,t.WQX)(E.QP),this.cardsHighlighted=this.breakpointObserver.observe(E.Rp.Handset).pipe((0,R.T)(({matches:a})=>a?[{title:"Friends",cols:1,rows:1,description:"Connect with your friends and connections."},{title:"Chat",cols:1,rows:1,description:"Chat with your friends or community groups"},{title:"File Sharing",cols:1,rows:1,description:"Share files with friends and communities."},{title:"Tasks",cols:1,rows:1,description:"Manage tasks, either alone or with friends or communities."}]:[{title:"Friends",cols:2,rows:1,description:"Connect with your friends and connections."},{title:"Chat",cols:1,rows:1,description:"Chat with your friends or community groups"},{title:"File Sharing",cols:1,rows:2,description:"Share files with friends and communities."},{title:"Tasks",cols:1,rows:1,description:"Manage tasks, either alone or with friends or communities."}])),(0,t.QZP)(()=>{setTimeout(()=>{this.table&&(this.dataSource.sort=this.sort,this.dataSource.paginator=this.paginator,this.table.dataSource=this.dataSource)})}),(0,t.QZP)(()=>{console.log(`The checked is: ${this.checked()})`)});const s=[];for(let a=0;a<this.images.length;a++)s.push({title:`App ${a+1}`,description:"This is a description of app. Add this app to your community.",imageUrl:`https://picsum.photos/seed/${this.images[a]}x/200/300`});this.cards.set(s)}open(n){this.router.navigate(["community",n])}ngAfterViewInit(){}static#t=this.\u0275fac=function(s){return new(s||e)(t.rXU(F.Ix))};static#e=this.\u0275cmp=t.VBU({type:e,selectors:[["app-apps"]],viewQuery:function(s,a){if(1&s&&(t.GBs(C.iy,5),t.GBs(p.B4,5),t.GBs(r.Zl,5)),2&s){let d;t.mGM(d=t.lsd())&&(a.paginator=d.first),t.mGM(d=t.lsd())&&(a.sort=d.first),t.mGM(d=t.lsd())&&(a.table=d.first)}},inputs:{viewStyle:[1,"viewStyle"],checked:[1,"checked"]},outputs:{viewStyle:"viewStyleChange",checked:"checkedChange"},standalone:!0,features:[t.aNF],decls:16,vars:2,consts:[["menu","matMenu"],["paginator",""],[1,"toolbox"],[1,"toolbox-left"],[1,"search-input"],["matInput","","placeholder","Filter communities..."],["matSuffix",""],[1,"toolbox-right"],["hideSingleSelectionIndicator","true",3,"ngModelChange","ngModel"],["value","card"],["value","table"],[1,"mat-elevation-z8"],["cols","2","rowHeight","350px"],[3,"colspan","rowspan"],[1,"container","responsive-grid"],[4,"ngFor","ngForOf"],[1,"dashboard-card"],["mat-icon-button","","aria-label","Toggle menu",1,"more-button",3,"matMenuTriggerFor"],["xPosition","before"],["mat-menu-item","",3,"routerLink"],[1,"dashboard-card-content"],["mat-card-image","",3,"src"],["mat-button","",3,"routerLink"],["mat-table","","matSort","","aria-label","Elements",1,"full-width-table"],["matColumnDef","id"],["mat-header-cell","","mat-sort-header","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","name"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["aria-label","Select page",3,"length","pageIndex","pageSize","pageSizeOptions"],["mat-header-cell","","mat-sort-header",""],["mat-cell",""],["mat-header-row",""],["mat-row",""]],template:function(s,a){1&s&&(t.j41(0,"div",2)(1,"div",3)(2,"mat-form-field",4)(3,"mat-label"),t.EFF(4,"Search"),t.k0s(),t.nrm(5,"input",5),t.j41(6,"mat-icon",6),t.EFF(7,"search"),t.k0s()()(),t.j41(8,"div",7)(9,"mat-button-toggle-group",8),t.mxI("ngModelChange",function(y){return t.DH7(a.viewStyle,y)||(a.viewStyle=y),y}),t.j41(10,"mat-button-toggle",9),t.EFF(11,"Cards"),t.k0s(),t.j41(12,"mat-button-toggle",10),t.EFF(13,"Table"),t.k0s()()()(),t.DNE(14,Y,6,3)(15,V,12,7,"div",11)),2&s&&(t.R7$(9),t.R50("ngModel",a.viewStyle),t.R7$(5),t.vxM("card"==a.viewStyle()?14:15))},dependencies:[u.Vg,u.ec,u.pc,b.m_,b.An,w.fS,w.fg,c.rl,c.nJ,c.yw,c.RG,m.X1,m.BC,f.MD,f.Sq,f.Jj,v.Hl,v.$z,v.iY,l.Hu,l.RN,l.YY,l.m2,l.MM,l.kF,l.dh,r.tP,r.Zl,r.tL,r.ji,r.cC,r.YV,r.iL,r.KS,r.$R,r.YZ,r.NB,C.Ou,C.iy,p.NQ,p.B4,p.aE,P.mV,m.YN,m.vS,D.s5,S.Fe,S.B_,S.NS,h.Cn,h.kk,h.fb,h.Cp,F.iI,F.Wk],styles:[".toolbox[_ngcontent-%COMP%]{display:flex;gap:1em;align-items:baseline}.toolbox-left[_ngcontent-%COMP%]{flex-grow:2}.tooblox-right[_ngcontent-%COMP%]{flex-grow:1}.search-input[_ngcontent-%COMP%]{width:100%}.container[_ngcontent-%COMP%]{padding:24px}img[_ngcontent-%COMP%]{width:100%;height:200px;object-fit:cover}.responsive-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:24px}.grid-container[_ngcontent-%COMP%]{margin:20px}.dashboard-card[_ngcontent-%COMP%]{position:absolute;inset:15px}.more-button[_ngcontent-%COMP%]{position:absolute;top:5px;right:10px}.dashboard-card-content[_ngcontent-%COMP%]{text-align:center}"]})}return e})()}}]);