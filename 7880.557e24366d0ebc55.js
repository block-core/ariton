"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[7880],{17880:(f,_,i)=>{i.r(_),i.d(_,{AccountComponent:()=>h});var r=i(10467),t=i(54438),l=i(88834),p=i(25596),s=i(30046),m=i(37064),E=i(36815),y=i(52778),d=i(14823);function A(c,C){if(1&c){const n=t.RV6();t.j41(0,"h1"),t.EFF(1),t.k0s(),t.j41(2,"p",0),t.EFF(3),t.k0s(),t.j41(4,"p")(5,"button",1),t.bIt("click",function(){t.eBV(n);const o=t.XpG();return t.Njj(o.activateAccount())}),t.EFF(6,"Activate account"),t.k0s(),t.EFF(7," \xa0 "),t.j41(8,"button",2),t.bIt("click",function(){t.eBV(n);const o=t.XpG();return t.Njj(o.backupAccount())}),t.EFF(9,"Backup Account"),t.k0s()(),t.j41(10,"p"),t.nrm(11,"br"),t.j41(12,"button",3),t.bIt("click",function(){t.eBV(n);const o=t.XpG();return t.Njj(o.deleteAccount())}),t.EFF(13,"Delete Account"),t.k0s()()}if(2&c){const n=t.XpG();t.R7$(),t.JRh(n.currentIdentity.metadata.name),t.R7$(),t.Y8G("matTooltip",n.currentIdentity.did.uri),t.R7$(),t.JRh(n.currentIdentity.did.uri)}}let h=(()=>{class c{constructor(n){var e=this;this.route=n,this.identity=(0,t.WQX)(m.K),this.layout=(0,t.WQX)(E.Y),this.app=(0,t.WQX)(y.d),this.router=(0,t.WQX)(s.Ix),this.layout.marginOn(),(0,t.QZP)((0,r.A)(function*(){e.app.initialized()&&e.route.params.subscribe(function(){var o=(0,r.A)(function*(u){const a=u.id,v=yield e.identity.activeAgent().identity.get({didUri:a});e.currentIdentity=v});return function(u){return o.apply(this,arguments)}}())}))}activateAccount(){var n=this;return(0,r.A)(function*(){n.identity.did=n.currentIdentity.did.uri,n.router.navigate(["/profile",n.identity.did])})()}backupAccount(){var n=this;return(0,r.A)(function*(){const e=yield n.currentIdentity?.export();if(e){const o=new Blob([JSON.stringify(e)],{type:"application/json"}),u=URL.createObjectURL(o),a=document.createElement("a");a.href=u,a.download="portableIdentity.json",document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(u)}})()}deleteAccount(){var n=this;return(0,r.A)(function*(){yield n.identity.activeAgent().identity.delete({didUri:n.currentIdentity.did.document.id}),n.router.navigate(["/accounts"])})()}static{this.\u0275fac=function(e){return new(e||c)(t.rXU(s.nX))}}static{this.\u0275cmp=t.VBU({type:c,selectors:[["app-account"]],standalone:!0,features:[t.aNF],decls:1,vars:1,consts:[[1,"ellipsis",3,"matTooltip"],["mat-flat-button","",3,"click"],["mat-button","",3,"click"],["mat-flat-button","",1,"warning-button",3,"click"]],template:function(e,o){1&e&&t.DNE(0,A,14,3),2&e&&t.vxM(o.currentIdentity?0:-1)},dependencies:[p.Hu,l.Hl,l.$z,d.uc,d.oV]})}}return c})()}}]);