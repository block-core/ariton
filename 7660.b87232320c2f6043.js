"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[7660],{47660:(A,u,a)=>{a.r(u),a.d(u,{RolesComponent:()=>D});var s=a(10467),t=a(93953),C=a(60385),f=a(98703),g=a(60177),c=a(25596),E=a(88834),O=a(99213),P=a(30046),h=a(50296),d=a(34635),m=a(69314);function R(_,M){if(1&_){const i=t.RV6();t.j41(0,"mat-card",0)(1,"mat-card-content")(2,"p"),t.EFF(3),t.nrm(4,"br"),t.EFF(5),t.nrm(6,"br"),t.EFF(7),t.nI1(8,"ago"),t.k0s(),t.nrm(9,"app-profile-header",1),t.k0s(),t.j41(10,"mat-card-actions",2)(11,"button",3),t.bIt("click",function(){const r=t.eBV(i).$implicit,o=t.XpG();return t.Njj(o.deleteRole(r))}),t.EFF(12,"DELETE"),t.k0s()()()}if(2&_){const i=M.$implicit;t.R7$(3),t.SpI(" App: ",i.record.protocol,""),t.R7$(2),t.SpI(" Role: ",i.record.protocolPath,""),t.R7$(2),t.SpI(" Assigned: ",t.bMT(8,5,i.record.dateCreated)," "),t.R7$(2),t.Y8G("did",i.record.recipient),t.R7$(2),t.Y8G("disabled",i.loading)}}function v(_,M){1&_&&t.EFF(0," No roles found. ")}let D=(()=>{class _{constructor(){var i=this;this.app=(0,t.WQX)(h.d),this.identity=(0,t.WQX)(d.K),this.roles=(0,t.vPA)([]),(0,t.QZP)((0,s.A)(function*(){i.app.initialized()&&(yield i.loadRoles())}))}deleteRole(i){var e=this;return(0,s.A)(function*(){const r=i.record.recipient;yield i.record.delete(),i.record.send(r),i.record.send(e.identity.did),e.roles.set(e.roles().filter(o=>o.id!==i.id))})()}loadRoles(){var i=this;return(0,s.A)(function*(){const e=[],{records:r}=yield i.identity.web5.dwn.records.query({message:{filter:{tags:{role:!0}}}});for(let o of r){const n=yield o.data.json();e.push({record:o,data:n,id:o.id})}return console.log(e),i.roles.set(e),e})()}assignRole(){var i=this;return(0,s.A)(function*(){const e="did:dht:xmwcc957onoxapf4yr61trknii4jga3is4fgtfoin8zdbg9iewro",{record:n,status:l}=yield i.identity.web5.dwn.records.create({data:{},message:{tags:{role:!0},recipient:e,protocol:m.Q.protocol,protocolPath:"collaborator",schema:m.Q.types.collaborator.schema,dataFormat:m.Q.types.collaborator.dataFormats[0]}});n?.send(e),console.log("Status:",l),console.log("Record:",n)})()}static#t=this.\u0275fac=function(e){return new(e||_)};static#e=this.\u0275cmp=t.VBU({type:_,selectors:[["app-roles"]],standalone:!0,features:[t.aNF],decls:9,vars:1,consts:[["appearance","outlined",1,"role-card"],[3,"did"],[1,"full-width-actions"],["mat-button","",1,"full-width-button",3,"click","disabled"]],template:function(e,r){1&e&&(t.j41(0,"h1"),t.EFF(1,"Roles Management"),t.k0s(),t.j41(2,"mat-card")(3,"mat-card-content"),t.EFF(4,"Manage all the roles in every app that you have assigned other users on Ariton."),t.k0s()(),t.nrm(5,"br"),t.Z7z(6,R,13,7,"mat-card",0,t.fX1,!1,v,1,0)),2&e&&(t.R7$(6),t.Dyx(r.roles()))},dependencies:[C.w,f.g,g.MD,c.Hu,c.RN,c.YY,c.m2,E.Hl,E.$z,O.m_,P.iI],styles:[".card-icon[_ngcontent-%COMP%]{font-size:3em}.card-notification[_ngcontent-%COMP%]{margin-bottom:1em}.notifications-title[_ngcontent-%COMP%]{display:flex;width:100%}[_nghost-%COMP%]{display:flex;flex-direction:column;align-items:center}.notifications-card[_ngcontent-%COMP%]{max-width:600px;width:100%}.card-notification[_ngcontent-%COMP%]   mat-card-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:100%}.notification-description[_ngcontent-%COMP%]{margin-bottom:1em}.full-width-actions[_ngcontent-%COMP%]{width:100%;display:flex}.full-width-button[_ngcontent-%COMP%]{flex-grow:1}.role-card[_ngcontent-%COMP%]{margin-bottom:.5em}"]})}return _})()},60385:(A,u,a)=>{a.d(u,{w:()=>i});var s=a(10467),t=a(93953),C=a(34635),f=a(25596),g=a(39434),c=a(345),E=a(78013),O=a(33347),P=a(14823),h=a(30046);const d=e=>["/profile",e];function m(e,r){if(1&e&&(t.nrm(0,"img",0),t.nI1(1,"safeResourceUrl")),2&e){let o;const n=t.XpG();t.Y8G("routerLink",t.eq3(4,d,null==(o=n.data().profile)?null:o.did))("src",t.bMT(1,2,n.data().avatar),t.B4B)}}function R(e,r){if(1&e&&t.nrm(0,"img",1),2&e){let o;const n=t.XpG();t.Y8G("routerLink",t.eq3(2,d,null==(o=n.data().profile)?null:o.did))("src","/avatar-placeholder.png",t.B4B)}}function v(e,r){if(1&e&&t.EFF(0),2&e){let o;const n=t.XpG(2);t.SpI(" (",null==(o=n.data().profile)?null:o.title,") ")}}function D(e,r){if(1&e&&(t.j41(0,"a",3),t.EFF(1),t.DNE(2,v,1,1),t.k0s()),2&e){let o,n,l;const p=t.XpG();t.Y8G("routerLink",t.eq3(3,d,null==(o=p.data().profile)?null:o.did)),t.R7$(),t.SpI("",null==(n=p.data().profile)?null:n.name," "),t.R7$(),t.vxM(null!=(l=p.data().profile)&&l.title?2:-1)}}function _(e,r){if(1&e&&t.EFF(0),2&e){let o;const n=t.XpG(2);t.SpI(" (",null==(o=n.data().profile)?null:o.title,") ")}}function M(e,r){if(1&e&&(t.j41(0,"em")(1,"a",3),t.EFF(2,"No name set "),t.DNE(3,_,1,1),t.k0s()()),2&e){let o,n;const l=t.XpG();t.R7$(),t.Y8G("routerLink",t.eq3(2,d,null==(o=l.data().profile)?null:o.did)),t.R7$(2),t.vxM(null!=(n=l.data().profile)&&n.title?3:-1)}}let i=(()=>{class e{constructor(){this.identity=(0,t.WQX)(C.K),this.profile=(0,t.WQX)(g.p),this.sanitizer=(0,t.WQX)(c.up),this.did=t.hFB.required(),this.data=(0,t.vPA)({})}ngAfterViewInit(){var o=this;return(0,s.A)(function*(){if(o.did()){const n=yield o.profile.loadProfile(o.did());console.log(n),o.data.set(n)}})()}static#t=this.\u0275fac=function(n){return new(n||e)};static#e=this.\u0275cmp=t.VBU({type:e,selectors:[["app-profile-header"]],inputs:{did:[1,"did"]},standalone:!0,features:[t.aNF],decls:10,vars:9,consts:[["mat-card-avatar","","onerror","this.src='/avatar-placeholder.png';this.onerror='';",1,"profile-thumbnail",3,"routerLink","src"],["mat-card-avatar","",1,"profile-thumbnail",3,"routerLink","src"],[1,"profile-header-title"],[3,"routerLink"],[1,"profile-header-subtitle"],[3,"routerLink","matTooltip"]],template:function(n,l){if(1&n&&(t.DNE(0,m,2,6,"img",0)(1,R,1,4,"img",1),t.j41(2,"div")(3,"div",2),t.DNE(4,D,3,5,"a",3)(5,M,4,4,"em"),t.k0s(),t.j41(6,"div",4)(7,"a",5),t.EFF(8),t.nI1(9,"did"),t.k0s()()()),2&n){let p,T,I,F;t.vxM(l.data().avatar?0:1),t.R7$(4),t.vxM(null!=(p=l.data().profile)&&p.name?4:5),t.R7$(3),t.Y8G("routerLink",t.eq3(7,d,null==(T=l.data().profile)?null:T.did))("matTooltip",null==(I=l.data().profile)?null:I.did),t.R7$(),t.JRh(t.bMT(9,5,null==(F=l.data().profile)?null:F.did))}},dependencies:[h.iI,h.Wk,P.uc,P.oV,f.Hu,f.QG,E.d,O.k],styles:[".profile-thumbnail[_ngcontent-%COMP%]{cursor:pointer;border-radius:50%;margin-right:1em}a[_ngcontent-%COMP%]{text-decoration:none}a[_ngcontent-%COMP%]:hover{text-decoration:underline}[_nghost-%COMP%]{display:flex}.profile-header-title[_ngcontent-%COMP%]{font-size:1.4em}.profile-header-subtitle[_ngcontent-%COMP%]{font-size:1em}"]})}return e})()}}]);