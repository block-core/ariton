"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[9603],{79603:(F,c,o)=>{o.r(c),o.d(c,{TableComponent:()=>E});var i=o(9159),d=o(96695),l=o(2042),u=o(45024),p=o(96354),f=o(57786),g=o(7673);const C=[{id:1,name:"Hydrogen"},{id:2,name:"Helium"},{id:3,name:"Lithium"},{id:4,name:"Beryllium"},{id:5,name:"Boron"},{id:6,name:"Carbon"},{id:7,name:"Nitrogen"},{id:8,name:"Oxygen"},{id:9,name:"Fluorine"},{id:10,name:"Neon"},{id:11,name:"Sodium"},{id:12,name:"Magnesium"},{id:13,name:"Aluminum"},{id:14,name:"Silicon"},{id:15,name:"Phosphorus"},{id:16,name:"Sulfur"},{id:17,name:"Chlorine"},{id:18,name:"Argon"},{id:19,name:"Potassium"},{id:20,name:"Calcium"}];class S extends u.qS{constructor(){super(),this.data=C}connect(){if(this.paginator&&this.sort)return(0,f.h)((0,g.of)(this.data),this.paginator.page,this.sort.sortChange).pipe((0,p.T)(()=>this.getPagedData(this.getSortedData([...this.data]))));throw Error("Please set the paginator and sort on the data source before connecting.")}disconnect(){}getPagedData(a){return this.paginator?a.splice(this.paginator.pageIndex*this.paginator.pageSize,this.paginator.pageSize):a}getSortedData(a){return this.sort&&this.sort.active&&""!==this.sort.direction?a.sort((n,s)=>{const r="asc"===this.sort?.direction;switch(this.sort?.active){case"name":return h(n.name,s.name,r);case"id":return h(+n.id,+s.id,r);default:return 0}}):a}}function h(e,a,n){return(e<a?-1:1)*(n?1:-1)}var t=o(93953);const T=()=>[5,10,20];function D(e,a){1&e&&(t.j41(0,"th",10),t.EFF(1,"Id"),t.k0s())}function b(e,a){if(1&e&&(t.j41(0,"td",11),t.EFF(1),t.k0s()),2&e){const n=a.$implicit;t.R7$(),t.JRh(n.id)}}function v(e,a){1&e&&(t.j41(0,"th",10),t.EFF(1,"Name"),t.k0s())}function w(e,a){if(1&e&&(t.j41(0,"td",11),t.EFF(1),t.k0s()),2&e){const n=a.$implicit;t.R7$(),t.JRh(n.name)}}function y(e,a){1&e&&t.nrm(0,"tr",12)}function R(e,a){1&e&&t.nrm(0,"tr",13)}let E=(()=>{class e{constructor(){this.dataSource=new S,this.displayedColumns=["id","name"]}ngAfterViewInit(){this.dataSource.sort=this.sort,this.dataSource.paginator=this.paginator,this.table.dataSource=this.dataSource}static#t=this.\u0275fac=function(s){return new(s||e)};static#e=this.\u0275cmp=t.VBU({type:e,selectors:[["app-table"]],viewQuery:function(s,r){if(1&s&&(t.GBs(d.iy,5),t.GBs(l.B4,5),t.GBs(i.Zl,5)),2&s){let m;t.mGM(m=t.lsd())&&(r.paginator=m.first),t.mGM(m=t.lsd())&&(r.sort=m.first),t.mGM(m=t.lsd())&&(r.table=m.first)}},standalone:!0,features:[t.aNF],decls:12,vars:7,consts:[["paginator",""],[1,"mat-elevation-z8"],["mat-table","","matSort","","aria-label","Elements",1,"full-width-table"],["matColumnDef","id"],["mat-header-cell","","mat-sort-header","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","name"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["aria-label","Select page",3,"length","pageIndex","pageSize","pageSizeOptions"],["mat-header-cell","","mat-sort-header",""],["mat-cell",""],["mat-header-row",""],["mat-row",""]],template:function(s,r){1&s&&(t.j41(0,"div",1)(1,"table",2),t.qex(2,3),t.DNE(3,D,2,0,"th",4)(4,b,2,1,"td",5),t.bVm(),t.qex(5,6),t.DNE(6,v,2,0,"th",4)(7,w,2,1,"td",5),t.bVm(),t.DNE(8,y,1,0,"tr",7)(9,R,1,0,"tr",8),t.k0s(),t.nrm(10,"mat-paginator",9,0),t.k0s()),2&s&&(t.R7$(8),t.Y8G("matHeaderRowDef",r.displayedColumns),t.R7$(),t.Y8G("matRowDefColumns",r.displayedColumns),t.R7$(),t.Y8G("length",r.dataSource.data.length)("pageIndex",0)("pageSize",10)("pageSizeOptions",t.lJ4(6,T)))},dependencies:[i.tP,i.Zl,i.tL,i.ji,i.cC,i.YV,i.iL,i.KS,i.$R,i.YZ,i.NB,d.Ou,d.iy,l.NQ,l.B4,l.aE],styles:[".full-width-table[_ngcontent-%COMP%]{width:100%}"]})}return e})()}}]);