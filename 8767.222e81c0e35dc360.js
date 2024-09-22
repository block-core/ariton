"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[8767],{48767:(H,f,n)=>{n.r(f),n.d(f,{CommunitiesComponent:()=>Q});var t=n(93953),u=n(65571),C=n(99213),y=n(99631),F=n(53719),c=n(89417),S=n(60177),d=n(2042),p=n(96695),r=n(9159),m=n(25596),v=n(88834),x=n(45024),j=n(96354),R=n(57786),k=n(7673);class E extends x.qS{constructor(){super()}connect(){if(this.paginator&&this.sort)return(0,R.h)((0,k.of)(this.data),this.paginator.page,this.sort.sortChange).pipe((0,j.T)(()=>this.getPagedData(this.getSortedData([...this.data]))));throw Error("Please set the paginator and sort on the data source before connecting.")}disconnect(){}getPagedData(o){return this.paginator?o.splice(this.paginator.pageIndex*this.paginator.pageSize,this.paginator.pageSize):o}getSortedData(o){return this.sort&&this.sort.active&&""!==this.sort.direction?o.sort((i,a)=>{const s="asc"===this.sort?.direction;switch(this.sort?.active){case"name":return b(i.name,a.name,s);case"id":return b(+i.id,+a.id,s);default:return 0}}):o}}function b(e,o,i){return(e<o?-1:1)*(i?1:-1)}var h=n(30046),D=n(30450),w=n(55911),T=n(54087),M=n(79703);const $=()=>["/communities","create"],I=()=>[5,10,20];function z(e,o){if(1&e){const i=t.RV6();t.j41(0,"mat-card")(1,"mat-card-header")(2,"mat-card-title"),t.EFF(3),t.k0s()(),t.nrm(4,"br")(5,"img",11),t.j41(6,"mat-card-content"),t.nrm(7,"br"),t.j41(8,"p"),t.EFF(9),t.k0s()(),t.j41(10,"mat-card-actions")(11,"button",12),t.bIt("click",function(){t.eBV(i);const s=t.XpG(2);return t.Njj(s.open("did:dht:my6nm5s1n9xmuuh5yixe668k7xbkmmuddzatn1fojzgdg5f5to8y"))}),t.EFF(12,"JOIN"),t.k0s(),t.j41(13,"button",12),t.bIt("click",function(){t.eBV(i);const s=t.XpG(2);return t.Njj(s.open("did:dht:my6nm5s1n9xmuuh5yixe668k7xbkmmuddzatn1fojzgdg5f5to8y"))}),t.EFF(14,"PREVIEW"),t.k0s()()()}if(2&e){const i=o.$implicit;t.R7$(3),t.SpI("",i.name," "),t.R7$(2),t.Y8G("src",i.thumbnail,t.B4B),t.R7$(4),t.SpI(" ",i.description," ")}}function G(e,o){if(1&e&&(t.j41(0,"div",9),t.Z7z(1,z,15,3,"mat-card",null,t.fX1),t.k0s()),2&e){const i=t.XpG();t.R7$(),t.Dyx(i.cards())}}function N(e,o){1&e&&(t.j41(0,"th",22),t.EFF(1,"Id"),t.k0s())}function B(e,o){if(1&e&&(t.j41(0,"td",23),t.EFF(1),t.k0s()),2&e){const i=o.$implicit;t.R7$(),t.JRh(i.id)}}function P(e,o){1&e&&(t.j41(0,"th",22),t.EFF(1,"Name"),t.k0s())}function V(e,o){if(1&e&&(t.j41(0,"td",23),t.EFF(1),t.k0s()),2&e){const i=o.$implicit;t.R7$(),t.JRh(i.name)}}function Y(e,o){1&e&&(t.j41(0,"th",22),t.EFF(1,"Description"),t.k0s())}function J(e,o){if(1&e&&(t.j41(0,"td",23),t.EFF(1),t.k0s()),2&e){const i=o.$implicit;t.R7$(),t.JRh(i.description)}}function O(e,o){1&e&&t.nrm(0,"tr",24)}function X(e,o){1&e&&t.nrm(0,"tr",25)}function L(e,o){if(1&e&&(t.j41(0,"div",10)(1,"table",13),t.qex(2,14),t.DNE(3,N,2,0,"th",15)(4,B,2,1,"td",16),t.bVm(),t.qex(5,17),t.DNE(6,P,2,0,"th",15)(7,V,2,1,"td",16),t.bVm(),t.qex(8,18),t.DNE(9,Y,2,0,"th",15)(10,J,2,1,"td",16),t.bVm(),t.DNE(11,O,1,0,"tr",19)(12,X,1,0,"tr",20),t.k0s(),t.nrm(13,"mat-paginator",21,0),t.k0s()),2&e){const i=t.XpG();t.R7$(11),t.Y8G("matHeaderRowDef",i.displayedColumns),t.R7$(),t.Y8G("matRowDefColumns",i.displayedColumns),t.R7$(),t.Y8G("length",i.dataSource.data.length)("pageIndex",0)("pageSize",10)("pageSizeOptions",t.lJ4(6,I))}}let Q=(()=>{class e{constructor(i){this.router=i,this.search=new c.MJ(""),this.dataSource=new E,this.cards=(0,t.vPA)([]),this.app=(0,t.WQX)(T.d),this.layout=(0,t.WQX)(M.Y),this.images=["nature","sky","grass","mountains","rivers","glacier","forest"],this.viewStyle=(0,t.geq)("card"),this.checked=(0,t.geq)(!1),this.displayedColumns=["name","description"],this.layout.marginOn(),(0,t.QZP)(()=>{setTimeout(()=>{this.table&&(this.dataSource.sort=this.sort,this.dataSource.paginator=this.paginator,this.table.dataSource=this.dataSource)})}),(0,t.QZP)(()=>{console.log(`The checked is: ${this.checked()})`)});const a=[];for(let s=0;s<this.images.length;s++)a.push({id:"id1",name:`Community ${s+1}`,description:"This is a description of community. We are a great community with many members.",thumbnail:`https://picsum.photos/seed/${this.images[s]}x/200/300`,private:!1,visibility:"public",type:"generic",features:{discussion:!0,members:!0,events:!0,media:!0,files:!0},apps:["events","media","files"]});a.push({id:"id1",name:"Craft Knitting",description:"Join the craft knitting community to share amazing patterns and socialize with other knitters.",thumbnail:"https://www.studioknitsf.com/wp-content/uploads/2021/02/thumbnails-pattern-book-2021.jpg.webp",private:!1,visibility:"public",type:"generic",features:{discussion:!0,members:!0,events:!0,media:!0,files:!0},apps:["events","media","files"]}),a.push({id:"id1",name:"Montenegro Liberterian Festival 2024",description:"Join the MTLFest 2024 community group.",thumbnail:"https://optim.tildacdn.one/tild3333-6237-4666-b532-336530656464/-/resize/600x/-/format/webp/FMF_Yellow_Circle.png",private:!1,visibility:"public",type:"generic",features:{discussion:!0,members:!0,events:!0,media:!0,files:!0},apps:["events","media","files"]}),a.push({id:"id1",name:"Montelibero",description:"Free Society Project Europe.",thumbnail:"https://montelibero.org/wp-content/uploads/2023/04/fspe_logo_3-05-200.png",private:!1,visibility:"public",type:"generic",features:{discussion:!0,members:!0,events:!0,media:!0,files:!0},apps:["events","media","files"]}),a.push({id:"id1",name:"Liberstad",description:"The Free City of Liberstad",thumbnail:"https://free-communities.org/wp-content/uploads/2023/10/liberstad-flag-10.23.webp",private:!1,visibility:"public",type:"generic",features:{discussion:!0,members:!0,events:!0,media:!0,files:!0},apps:["events","media","files"]}),this.cards.set(a),this.dataSource.data=a}open(i){this.router.navigate(["community",i])}ngOnInit(){this.layout.resetActions()}ngAfterViewInit(){}static#t=this.\u0275fac=function(a){return new(a||e)(t.rXU(h.Ix))};static#e=this.\u0275cmp=t.VBU({type:e,selectors:[["app-communities"]],viewQuery:function(a,s){if(1&a&&(t.GBs(p.iy,5),t.GBs(d.B4,5),t.GBs(r.Zl,5)),2&a){let l;t.mGM(l=t.lsd())&&(s.paginator=l.first),t.mGM(l=t.lsd())&&(s.sort=l.first),t.mGM(l=t.lsd())&&(s.table=l.first)}},inputs:{viewStyle:[1,"viewStyle"],checked:[1,"checked"]},outputs:{viewStyle:"viewStyleChange",checked:"checkedChange"},standalone:!0,features:[t.aNF],decls:15,vars:4,consts:[["paginator",""],[1,"toolbar-actions","margin-bottom"],[1,"flex"],["type","button","mat-button","",3,"routerLink"],[1,"toolbar-spacer"],["type","search","placeholder","Filter communities",1,"search-input"],["hideSingleSelectionIndicator","true",3,"ngModelChange","ngModel"],["value","card"],["value","table"],[1,"container","responsive-grid"],[1,"mat-elevation-z8"],["mat-card-image","",3,"src"],["mat-button","",3,"click"],["mat-table","","matSort","","aria-label","Elements",1,"full-width-table"],["matColumnDef","id"],["mat-header-cell","","mat-sort-header","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","name"],["matColumnDef","description"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["aria-label","Select page",3,"length","pageIndex","pageSize","pageSizeOptions"],["mat-header-cell","","mat-sort-header",""],["mat-cell",""],["mat-header-row",""],["mat-row",""]],template:function(a,s){1&a&&(t.j41(0,"mat-card",1)(1,"mat-card-content",2)(2,"button",3)(3,"mat-icon"),t.EFF(4,"add"),t.k0s(),t.EFF(5," Create "),t.k0s(),t.j41(6,"span",4),t.nrm(7,"input",5),t.k0s(),t.j41(8,"mat-button-toggle-group",6),t.mxI("ngModelChange",function(g){return t.DH7(s.viewStyle,g)||(s.viewStyle=g),g}),t.j41(9,"mat-button-toggle",7),t.EFF(10,"Cards"),t.k0s(),t.j41(11,"mat-button-toggle",8),t.EFF(12,"Table"),t.k0s()()()(),t.DNE(13,G,3,0,"div",9)(14,L,15,7,"div",10)),2&a&&(t.R7$(2),t.Y8G("routerLink",t.lJ4(3,$)),t.R7$(6),t.R50("ngModel",s.viewStyle),t.R7$(5),t.vxM("card"==s.viewStyle()?13:14))},dependencies:[h.iI,h.Wk,u.Vg,u.ec,u.pc,C.m_,C.An,y.fS,F.RG,c.X1,c.BC,S.MD,v.Hl,v.$z,m.Hu,m.RN,m.YY,m.m2,m.MM,m.kF,m.dh,r.tP,r.Zl,r.tL,r.ji,r.cC,r.YV,r.iL,r.KS,r.$R,r.YZ,r.NB,p.Ou,p.iy,d.NQ,d.B4,d.aE,D.mV,c.YN,c.vS,w.s5],styles:[".search-input[_ngcontent-%COMP%]{width:100%}img[_ngcontent-%COMP%]{width:100%;height:200px;object-fit:cover}.responsive-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:24px}"]})}return e})()}}]);