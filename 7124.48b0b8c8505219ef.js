"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[7124],{22465:(j,I,n)=>{n.d(I,{K:()=>P});var v=n(10467),t=n(93953),O=n(36899),y=n(54087),M=n(15251),l=n(71943),h=n(63104),D=n(12978),T=n(7146);let P=(()=>{class R{constructor(){this.requests=(0,t.vPA)([]),this.friends=(0,t.vPA)([]),this.identity=(0,t.WQX)(O.K),this.connection=(0,t.WQX)(D.K),this.app=(0,t.WQX)(y.d)}createRequest(a){var r=this;return(0,v.A)(function*(){const c=yield l.l6.create({type:"FriendshipCredential",issuer:r.identity.did,subject:a,data:null});console.log("VC:",c);const p=yield r.identity.activeAgent().identity.get({didUri:r.identity.did}),_=yield c.sign({did:p.did});return console.log("VC JWT:",_),{record:(yield r.connection.request(a,{app:"friends",title:"I want to be your friend.",vc:_},D.X.Friend)).record}})()}accept(a){var r=this;return(0,v.A)(function*(){const c=a.data.vc;if(!c)throw new Error("The incoming VC is missing.");if(console.log("signedVcJwt:",c),!c)return;try{yield l.l6.verify({vcJwt:c})}catch(B){return void console.error("Error verifying VC:",B)}const p=l.l6.parseJwt({vcJwt:c}),_=p.issuer;if(p.issuer!=a.record.author)return void console.error("VC issuer is different than data record author");console.log("Friend request validated");const m=yield l.l6.create({type:h.eE.friendship,issuer:r.identity.did,subject:_,data:{vc:c}});console.log("TWO WAY VC:",m);const i=yield r.identity.activeAgent().identity.get({didUri:r.identity.did}),u=yield m.sign({did:i.did});console.log("TWO WAY VC JWT:",u);const{record:d}=yield r.identity.web5.dwn.records.create({data:u,message:{schema:h.eE.friendship,dataFormat:h.eE.format,published:!1}});console.log("TWO WAY VC RECORD:",d),d.send(r.identity.did);const s={title:a.data.title,vc:u,app:"friends"},g={type:D.X.Credential};console.log("SENDING FRIEND REQUEST TO TARGET:",_);const{status:F,record:W}=yield r.identity.web5.dwn.records.create({data:s,store:!1,message:{tags:g,recipient:_,protocol:T.Q.protocol,protocolPath:"request",schema:T.Q.types.request.schema,dataFormat:T.Q.types.request.dataFormats[0]}});console.log("Request create status:",F);const{status:A}=yield W.send(_);return console.log("SENT TO TARGET!!!",A),r.app.openSnackBar(202!==A.code?`Friend request failed.Code: ${A.code}, Details: ${A.detail}.`:"Friend request accepted"),{record:W,data:s,id:W.id}})()}reject(a){var r=this;return(0,v.A)(function*(){console.log("Rejecting request:",a);const c=a.record.recipient==r.identity.did?a.record.author:a.record.recipient;console.log("Target DID:",c),console.log("this.identity.did:",r.identity.did),console.log("entry.record.recipient:",a.record.recipient),console.log("entry.record.author:",a.record.author);const{status:p}=yield a.record.delete(),{status:_}=yield a.record.send(c);console.log("Delete status:",p),console.log("deleteSendStatus:",_),r.requests.update(m=>m.filter(i=>i!==a))})()}processFriends(){var a=this;return(0,v.A)(function*(){var{records:r}=yield a.identity.web5.dwn.records.query({message:{filter:{protocol:h.iU.uri,schema:M.Q.types.credential.schema,dataFormat:M.Q.types.credential.dataFormats[0]}}});console.log("VC Records:",r);for(const c of r){console.log("Record:",c);const p=yield c.data.json();console.log("JSON:",p);try{yield l.l6.verify({vcJwt:p.vc})}catch(u){console.error("Error verifying VC:",u),console.log("THIS REQUEST SHOULD BE DELETED FROM DWN",c.id)}const _=l.l6.parseJwt({vcJwt:p.vc});console.log("PARSED INVCOMING VC:",_),console.log("vc.issuer === this.identity.did:",_.issuer===a.identity.did);const{record:m}=yield a.identity.web5.dwn.records.create({data:p.vc,message:{schema:h.eE.friendship,dataFormat:h.eE.format,published:!1}});console.log("TWO WAY VC RECORD:",m);const{status:i}=yield m.send(a.identity.did);console.log("Record sent:",i,m),yield c?.delete()}})()}loadFriends(){var a=this;return(0,v.A)(function*(){var{records:r}=yield a.identity.web5.dwn.records.query({message:{filter:{schema:h.eE.friendship,dataFormat:h.eE.format}}});if(console.log("Friend VCs:"),console.log(r),a.friends.set([]),r)for(const _ of r){let m=yield _.data.text(),i=l.l6.parseJwt({vcJwt:m}),u=i.issuer;i.issuer==a.identity.did&&(u=l.l6.parseJwt({vcJwt:i.vcDataModel.credentialSubject.vc}).issuer);let d={record:_,data:{did:u}};a.friends.update(s=>[...s,d]),console.log("All friends:",a.friends())}})()}static#t=this.\u0275fac=function(r){return new(r||R)};static#e=this.\u0275prov=t.jDH({token:R,factory:R.\u0275fac,providedIn:"root"})}return R})()},97124:(j,I,n)=>{n.d(I,{$:()=>S});var v=n(10467),t=n(93953),O=n(12978),y=n(54087),M=n(60177),l=n(25596),h=n(88834),D=n(99213),T=n(30046),P=n(32231),R=n(87289),L=n(36899),a=n(22465),r=n(35291);function c(o,E){1&o&&t.EFF(0," people ")}function p(o,E){1&o&&t.EFF(0," connect_without_contact ")}function _(o,E){1&o&&t.EFF(0," Friend Request ")}function m(o,E){1&o&&t.EFF(0," Connect Request ")}function i(o,E){1&o&&(t.j41(0,"div",3),t.EFF(1,"You have sent friend request to this user. Waiting for their response."),t.k0s())}function u(o,E){1&o&&t.EFF(0," This user wants to be your friend, do you accept? This will give them access to send you sharing requets, such as shared Tasks, collabrative apps and more. ")}function d(o,E){if(1&o&&(t.EFF(0," This is a data sharing request. Do you want to accept? "),t.j41(1,"p"),t.EFF(2," App: "),t.j41(3,"span",2),t.EFF(4),t.k0s(),t.nrm(5,"br"),t.EFF(6),t.k0s()),2&o){const e=t.XpG(3);t.R7$(4),t.JRh(e.entry.data.app),t.R7$(2),t.SpI("Title: ",e.entry.data.title," ")}}function s(o,E){1&o&&t.EFF(0," Shared Credential. This will be automatically processed. ")}function g(o,E){1&o&&t.nrm(0,"br")}function F(o,E){if(1&o&&(t.j41(0,"div",3),t.DNE(1,u,1,0)(2,d,7,2,"p")(3,s,1,0)(4,g,1,0,"br"),t.k0s()),2&o){const e=t.XpG(2);t.R7$(),t.vxM("friend"==e.entry.record.tags.type?1:"data"==e.entry.record.tags.type?2:"credential"==e.entry.record.tags.type?3:4)}}function W(o,E){if(1&o&&t.nrm(0,"app-profile-header",4),2&o){const e=t.XpG(2);t.Y8G("did",e.entry.record.recipient)}}function A(o,E){if(1&o&&t.nrm(0,"app-profile-header",4),2&o){const e=t.XpG(2);t.Y8G("did",e.entry.record.author)}}function B(o,E){}function b(o,E){if(1&o){const e=t.RV6();t.j41(0,"button",5),t.EFF(1,"PENDING"),t.k0s(),t.EFF(2,"\xa0 "),t.j41(3,"button",6),t.bIt("click",function(){t.eBV(e);const f=t.XpG(3);return t.Njj(f.reject(f.entry))}),t.EFF(4,"CANCEL"),t.k0s()}if(2&o){const e=t.XpG(3);t.Y8G("disabled",!0),t.R7$(3),t.Y8G("disabled",e.entry.loading)}}function U(o,E){if(1&o){const e=t.RV6();t.j41(0,"button",7),t.bIt("click",function(){t.eBV(e);const f=t.XpG(3);return t.Njj(f.accept(f.entry))}),t.EFF(1,"ACCEPT"),t.k0s(),t.EFF(2,"\xa0 "),t.j41(3,"button",6),t.bIt("click",function(){t.eBV(e);const f=t.XpG(3);return t.Njj(f.reject(f.entry))}),t.EFF(4,"DELETE"),t.k0s(),t.EFF(5,"\xa0 "),t.j41(6,"button",6),t.bIt("click",function(){t.eBV(e);const f=t.XpG(3);return t.Njj(f.block(f.entry))}),t.EFF(7,"BLOCK"),t.k0s()}if(2&o){const e=t.XpG(3);t.Y8G("disabled",e.entry.loading),t.R7$(3),t.Y8G("disabled",e.entry.loading),t.R7$(3),t.Y8G("disabled",e.entry.loading)}}function G(o,E){if(1&o&&(t.j41(0,"mat-card-actions"),t.DNE(1,b,5,2)(2,U,8,3),t.k0s()),2&o){const e=t.XpG(2);t.R7$(),t.vxM("out"==e.entry.direction?1:2)}}function K(o,E){if(1&o&&(t.j41(0,"mat-card",0)(1,"mat-card-header")(2,"mat-icon",1),t.DNE(3,c,1,0)(4,p,1,0),t.k0s(),t.j41(5,"mat-card-title"),t.DNE(6,_,1,0)(7,m,1,0),t.k0s(),t.j41(8,"mat-card-subtitle"),t.EFF(9,"Type: "),t.j41(10,"span",2),t.EFF(11),t.k0s(),t.EFF(12),t.nI1(13,"ago"),t.k0s()(),t.j41(14,"mat-card-content"),t.DNE(15,i,2,0,"div",3)(16,F,5,1,"div",3)(17,W,1,1,"app-profile-header",4)(18,A,1,1,"app-profile-header",4),t.k0s(),t.DNE(19,B,0,0)(20,G,3,1,"mat-card-actions"),t.k0s()),2&o){const e=t.XpG();t.R7$(3),t.vxM("friend"==e.entry.record.tags.type?3:4),t.R7$(3),t.vxM("friend"==e.entry.record.tags.type?6:7),t.R7$(5),t.JRh(e.entry.record.tags.type),t.R7$(),t.SpI(" (",t.bMT(13,7,e.entry.record.dateCreated),")"),t.R7$(3),t.vxM("out"==e.entry.direction?15:16),t.R7$(2),t.vxM("out"==e.entry.direction?17:18),t.R7$(2),t.vxM("credential"==e.entry.record.tags.type?19:20)}}let S=(()=>{class o{constructor(){this.entry=void 0,this.connection=(0,t.WQX)(O.K),this.friend=(0,t.WQX)(a.K),this.identity=(0,t.WQX)(L.K),this.app=(0,t.WQX)(y.d)}deleteConnection(e){e.loading=!0,this.connection.deleteConnection(e)}accept(e){var C=this;return(0,v.A)(function*(){e.loading=!0,console.log("Accepting connection request",e),e.data.did=e.record.author;const N=e.record.tags.type;if(N==O.X.Friend){const x=yield C.friend.accept(e);e.data.vc=x?.data.vc,e.data.recordId=x?.id}const X=yield C.connection.create(e,N);if(console.log("Connection Entry that was made: ",X),yield C.connection.deleteRequest(e),N==O.X.Data&&(console.log("ACCEPTING DATA CONNECTION:",e),"tasks"==e.data.app)){console.log("ACEPTING TASKS CONNECTION:",e),console.log("DID DWN to read from:",e.data.did),console.log("RID DWN to read from:",e.data.recordId);const{record:x,status:k}=yield C.identity.web5.dwn.records.read({from:e.data.did,message:{protocolRole:"collaborator",filter:{protocolPath:"list",recordId:e.data.recordId}}});console.log("STATUS FROM READING RECORD EXTERNALLY:",k),console.log("RECORD FROM CONNECTION ACCEPT:",x),x.import();const{records:V,status:w}=yield C.identity.web5.dwn.records.query({from:e.data.did,message:{protocolRole:"collaborator",filter:{protocol:r.Q.protocol,protocolPath:"list"}}});console.log("STATUS FROM READING RECORDS EXTERNALLY:",V),console.log("RECORD FROM STATUS RECORDS:",w)}})()}block(e){var C=this;return(0,v.A)(function*(){e.loading=!0,console.log("Blocking user",e);const f=yield C.connection.block(e.record.author);console.log("Block result: ",f)})()}reject(e){e.loading=!0,this.connection.deleteRequest(e)}static#t=this.\u0275fac=function(C){return new(C||o)};static#e=this.\u0275cmp=t.VBU({type:o,selectors:[["app-request"]],inputs:{entry:"entry"},standalone:!0,features:[t.aNF],decls:1,vars:1,consts:[["appearance","outlined",1,"card-notification"],["inline","true","mat-card-avatar","",1,"card-icon"],[1,"capitalize"],[1,"notification-description"],[3,"did"],["mat-flat-button","",3,"disabled"],["mat-button","",3,"click","disabled"],["mat-flat-button","",3,"click","disabled"]],template:function(C,f){1&C&&t.DNE(0,K,21,9,"mat-card",0),2&C&&t.vxM(f.entry?0:-1)},dependencies:[R.w,P.g,M.MD,l.Hu,l.RN,l.YY,l.QG,l.m2,l.MM,l.Lc,l.dh,h.Hl,h.$z,D.m_,D.An,T.iI],styles:[".card-icon[_ngcontent-%COMP%]{font-size:3em}.card-notification[_ngcontent-%COMP%]{margin-bottom:1em}.notifications-title[_ngcontent-%COMP%]{display:flex;width:100%}.notifications-card[_ngcontent-%COMP%]{max-width:600px;width:100%}.card-notification[_ngcontent-%COMP%]   mat-card-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:100%}.notification-description[_ngcontent-%COMP%]{margin-bottom:1em}"]})}return o})()},87289:(j,I,n)=>{n.d(I,{w:()=>m});var v=n(10467),t=n(93953),O=n(36899),y=n(25596),M=n(21698),l=n(345),h=n(789),D=n(58075),T=n(14823),P=n(30046);const R=i=>["/profile",i];function L(i,u){if(1&i&&(t.nrm(0,"img",0),t.nI1(1,"safeResourceUrl")),2&i){const d=t.XpG();t.Y8G("routerLink",t.eq3(4,R,d.did()))("src",t.bMT(1,2,d.data().avatar),t.B4B)}}function a(i,u){if(1&i&&t.nrm(0,"img",1),2&i){const d=t.XpG();t.Y8G("routerLink",t.eq3(2,R,d.did()))("src","/avatar-placeholder.png",t.B4B)}}function r(i,u){if(1&i&&t.EFF(0),2&i){let d;const s=t.XpG(2);t.SpI(" (",null==(d=s.data().profile)?null:d.title,") ")}}function c(i,u){if(1&i&&(t.j41(0,"a",3),t.EFF(1),t.DNE(2,r,1,1),t.k0s()),2&i){let d,s;const g=t.XpG();t.Y8G("routerLink",t.eq3(3,R,g.did())),t.R7$(),t.SpI("",null==(d=g.data().profile)?null:d.name," "),t.R7$(),t.vxM(null!=(s=g.data().profile)&&s.title?2:-1)}}function p(i,u){if(1&i&&t.EFF(0),2&i){let d;const s=t.XpG(2);t.SpI(" (",null==(d=s.data().profile)?null:d.title,") ")}}function _(i,u){if(1&i&&(t.j41(0,"em")(1,"a",3),t.EFF(2,"No name set "),t.DNE(3,p,1,1),t.k0s()()),2&i){let d;const s=t.XpG();t.R7$(),t.Y8G("routerLink",t.eq3(2,R,s.did())),t.R7$(2),t.vxM(null!=(d=s.data().profile)&&d.title?3:-1)}}let m=(()=>{class i{constructor(){this.identity=(0,t.WQX)(O.K),this.profile=(0,t.WQX)(M.p),this.sanitizer=(0,t.WQX)(l.up),this.did=t.hFB.required(),this.data=(0,t.vPA)({})}ngAfterViewInit(){var d=this;return(0,v.A)(function*(){if(d.did()){let s=yield d.profile.loadProfile(d.did());d.data.set(s)}})()}static#t=this.\u0275fac=function(s){return new(s||i)};static#e=this.\u0275cmp=t.VBU({type:i,selectors:[["app-profile-header"]],inputs:{did:[1,"did"]},standalone:!0,features:[t.aNF],decls:10,vars:9,consts:[["mat-card-avatar","","onerror","this.src='/avatar-placeholder.png';this.onerror='';",1,"profile-thumbnail",3,"routerLink","src"],["mat-card-avatar","",1,"profile-thumbnail",3,"routerLink","src"],[1,"profile-header-title"],[3,"routerLink"],[1,"profile-header-subtitle"],[3,"routerLink","matTooltip"]],template:function(s,g){if(1&s&&(t.DNE(0,L,2,6,"img",0)(1,a,1,4,"img",1),t.j41(2,"div")(3,"div",2),t.DNE(4,c,3,5,"a",3)(5,_,4,4,"em"),t.k0s(),t.j41(6,"div",4)(7,"a",5),t.EFF(8),t.nI1(9,"did"),t.k0s()()()),2&s){let F;t.vxM(g.data().avatar?0:1),t.R7$(4),t.vxM(null!=(F=g.data().profile)&&F.name?4:5),t.R7$(3),t.Y8G("routerLink",t.eq3(7,R,g.did()))("matTooltip",g.did()),t.R7$(),t.JRh(t.bMT(9,5,g.did()))}},dependencies:[P.iI,P.Wk,T.uc,T.oV,y.Hu,y.QG,h.d,D.k],styles:[".profile-thumbnail[_ngcontent-%COMP%]{cursor:pointer;border-radius:50%;margin-right:1em}a[_ngcontent-%COMP%]{text-decoration:none}a[_ngcontent-%COMP%]:hover{text-decoration:underline}[_nghost-%COMP%]{display:flex}.profile-header-title[_ngcontent-%COMP%]{font-size:1.4em}.profile-header-subtitle[_ngcontent-%COMP%]{font-size:1em}"]})}return i})()}}]);