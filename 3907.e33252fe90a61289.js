"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[3907],{93907:(dt,D,l)=>{l.r(D),l.d(D,{TasksComponent:()=>lt});var m=l(10467),y=l(81391),t=l(54438),A=l(36815),p=l(50963),M=l(96084),N=l(34635),F=l(77494),R=l(60177),b=l(88834),E=l(30046),X=l(96850),T=l(99213),S=l(82765),g=l(89417),k=l(59115),G=l(71997),j=l(53719),x=l(99631),L=l(9183),$=l(25596),h=l(75351),v=l(14823);function P(s,_){if(1&s){const o=t.RV6();t.j41(0,"div",3)(1,"mat-form-field",8),t.nrm(2,"input",9),t.k0s(),t.j41(3,"button",10),t.bIt("click",function(){const e=t.eBV(o).$index,i=t.XpG();return t.Njj(i.removeLink(e))}),t.j41(4,"mat-icon"),t.EFF(5,"clear"),t.k0s()()()}if(2&s){const o=_.$index;t.R7$(2),t.Y8G("formControlName",o)}}let w=(()=>{class s{constructor(o,n){this.dialogRef=o,this.data=n,this.fb=(0,t.WQX)(g.ok),this.form=this.fb.group({collaborators:this.fb.array([])}),n.collaborators.map(e=>{this.form.controls.collaborators.push(this.fb.control(e))})}ngAfterViewInit(){}get collaborators(){return this.form.get("collaborators")}addLink(){this.collaborators.push(this.fb.control(""))}removeLink(o){this.collaborators.removeAt(o)}onSubmit(){var o=this;return(0,m.A)(function*(){const n=o.form.value.collaborators.filter(e=>e);o.data.collaborators=n})()}static{this.\u0275fac=function(n){return new(n||s)(t.rXU(h.CP),t.rXU(h.Vh))}}static{this.\u0275cmp=t.VBU({type:s,selectors:[["app-collaborator-dialog"]],standalone:!0,features:[t.aNF],decls:16,vars:3,consts:[["novalidate","",3,"ngSubmit","formGroup"],["mat-dialog-title",""],["formArrayName","collaborators"],[1,"link-input"],["mat-stroked-button","","type","button",3,"click"],["align","end"],["mat-button","","mat-dialog-close",""],["mat-flat-button","","type","submit","cdkFocusInitial","",3,"mat-dialog-close"],[1,"full-width"],["matInput","","type","text","placeholder","Enter DID",3,"formControlName"],["mat-icon-button","","type","button",3,"click"]],template:function(n,e){1&n&&(t.j41(0,"form",0),t.bIt("ngSubmit",function(){return e.onSubmit()}),t.j41(1,"h2",1),t.EFF(2),t.k0s(),t.j41(3,"mat-dialog-content")(4,"div",2),t.Z7z(5,P,6,1,"div",3,t.fX1),t.k0s(),t.j41(7,"button",4),t.bIt("click",function(){return e.addLink()}),t.j41(8,"mat-icon"),t.EFF(9,"person_add_alt"),t.k0s(),t.EFF(10," Add Collaborator "),t.k0s()(),t.j41(11,"mat-dialog-actions",5)(12,"button",6),t.EFF(13,"Cancel"),t.k0s(),t.j41(14,"button",7),t.EFF(15,"Save"),t.k0s()()()),2&n&&(t.Y8G("formGroup",e.form),t.R7$(2),t.SpI(" ",e.data.title," "),t.R7$(3),t.Dyx(e.collaborators.controls),t.R7$(9),t.Y8G("mat-dialog-close",!0))},dependencies:[R.MD,v.uc,k.Cn,T.m_,T.An,b.Hl,b.$z,b.iY,x.fS,x.fg,j.rl,h.hM,h.tx,h.BI,h.E7,h.Yi,g.YN,g.qT,g.me,g.BC,g.cb,$.Hu,g.X1,g.j4,g.JD,g.v8],styles:[".full-width[_ngcontent-%COMP%]{width:100%}.link-input[_ngcontent-%COMP%]{display:flex;align-items:baseline}.link-input[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-left:.4em}mat-card-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-left:1em}"]})}}return s})();var Q=l(95416),O=l(21093),V=l(56687);const U=s=>["/app","tasks",s],B=s=>({strikeout:s});function z(s,_){if(1&s){const o=t.RV6();t.j41(0,"button",3),t.bIt("click",function(){t.eBV(o);const e=t.XpG();return t.Njj(e.newList())}),t.j41(1,"mat-icon"),t.EFF(2,"add"),t.k0s(),t.EFF(3," New list "),t.k0s(),t.nrm(4,"br")}}function Y(s,_){if(1&s){const o=t.RV6();t.j41(0,"mat-form-field",13)(1,"input",14),t.mxI("ngModelChange",function(e){t.eBV(o);const i=t.XpG(2).$implicit;return t.DH7(i.data.title,e)||(i.data.title=e),t.Njj(e)}),t.bIt("keydown.enter",function(){t.eBV(o);const e=t.XpG(2).$implicit,i=t.XpG();return t.Njj(i.saveList(e))}),t.k0s()(),t.j41(2,"button",15),t.bIt("click",function(){t.eBV(o);const e=t.XpG(2).$implicit,i=t.XpG();return t.Njj(i.saveList(e))}),t.j41(3,"mat-icon"),t.EFF(4,"save"),t.k0s()()}if(2&s){const o=t.XpG(2).$implicit;t.R7$(),t.R50("ngModel",o.data.title)}}function W(s,_){1&s&&(t.j41(0,"button",17)(1,"mat-icon"),t.EFF(2,"folder_shared"),t.k0s()()),2&s&&t.Y8G("disabled",!0)}function H(s,_){if(1&s){const o=t.RV6();t.j41(0,"button",15),t.bIt("click",function(){t.eBV(o);const e=t.XpG(3).$implicit,i=t.XpG();return t.Njj(i.editList(e))}),t.j41(1,"mat-icon"),t.EFF(2,"edit"),t.k0s()()}}function J(s,_){if(1&s&&(t.j41(0,"a",16),t.EFF(1),t.k0s(),t.DNE(2,W,3,1,"button",17)(3,H,3,0,"button",18)),2&s){const o=t.XpG(2).$implicit,n=t.XpG();t.Y8G("routerLink",t.eq3(3,U,o.id)),t.R7$(),t.JRh(o.data.title),t.R7$(),t.vxM(o.record.author!==n.identity.did?2:3)}}function K(s,_){1&s&&t.nrm(0,"mat-spinner",8)}function Z(s,_){1&s&&(t.j41(0,"mat-icon"),t.EFF(1,"refresh"),t.k0s())}function q(s,_){1&s&&t.nrm(0,"mat-spinner",10)}function tt(s,_){if(1&s){const o=t.RV6();t.j41(0,"mat-form-field",13)(1,"input",14),t.mxI("ngModelChange",function(e){t.eBV(o);const i=t.XpG().$implicit;return t.DH7(i.data.description,e)||(i.data.description=e),t.Njj(e)}),t.bIt("keydown.enter",function(){t.eBV(o);const e=t.XpG().$implicit,i=t.XpG(2).$implicit,r=t.XpG();return t.Njj(r.saveTask(e,i))}),t.k0s()(),t.j41(2,"button",15),t.bIt("click",function(){t.eBV(o);const e=t.XpG().$implicit,i=t.XpG(2).$implicit,r=t.XpG();return t.Njj(r.saveTask(e,i))}),t.j41(3,"mat-icon"),t.EFF(4,"save"),t.k0s()()}if(2&s){const o=t.XpG().$implicit;t.R7$(),t.R50("ngModel",o.data.description)}}function ot(s,_){if(1&s&&(t.j41(0,"span",20),t.EFF(1),t.k0s()),2&s){const o=t.XpG().$implicit;t.Y8G("ngClass",t.eq3(2,B,o.data.completed)),t.R7$(),t.JRh(o.data.description)}}function et(s,_){1&s&&t.nrm(0,"mat-spinner",10)}function nt(s,_){if(1&s){const o=t.RV6();t.j41(0,"mat-checkbox",23),t.mxI("ngModelChange",function(e){t.eBV(o);const i=t.XpG().$implicit;return t.DH7(i.data.completed,e)||(i.data.completed=e),t.Njj(e)}),t.bIt("change",function(){t.eBV(o);const e=t.XpG().$implicit,i=t.XpG(2).$implicit,r=t.XpG();return t.Njj(r.saveTask(e,i))}),t.k0s()}if(2&s){const o=t.XpG().$implicit;t.R50("ngModel",o.data.completed)}}function it(s,_){if(1&s){const o=t.RV6();t.nrm(0,"mat-divider"),t.j41(1,"button",11),t.bIt("click",function(){t.eBV(o);const e=t.XpG().$implicit,i=t.XpG(2).$implicit,r=t.XpG();return t.Njj(r.deleteTask(e.record,i))}),t.j41(2,"mat-icon"),t.EFF(3,"delete"),t.k0s(),t.j41(4,"span"),t.EFF(5,"Delete"),t.k0s()()}}function st(s,_){if(1&s){const o=t.RV6();t.j41(0,"div",19),t.DNE(1,tt,5,1)(2,ot,2,4,"span",20),t.nrm(3,"div",21),t.DNE(4,et,1,0,"mat-spinner",10)(5,nt,1,1,"mat-checkbox",22),t.j41(6,"button",9)(7,"mat-icon"),t.EFF(8,"more_vert"),t.k0s()()(),t.j41(9,"mat-menu",null,1)(11,"button",11),t.bIt("click",function(){const e=t.eBV(o).$implicit,i=t.XpG(3);return t.Njj(i.editTask(e))}),t.j41(12,"mat-icon"),t.EFF(13,"edit"),t.k0s(),t.j41(14,"span"),t.EFF(15,"Edit"),t.k0s()(),t.DNE(16,it,6,0),t.k0s()}if(2&s){const o=_.$implicit,n=t.sdS(10),e=t.XpG(2).$implicit,i=t.XpG();t.Y8G("cdkDragData",o),t.R7$(),t.vxM(o.editing?1:2),t.R7$(3),t.vxM(o.loading?4:5),t.R7$(2),t.Y8G("matMenuTriggerFor",n),t.R7$(10),t.vxM(e.record.author===i.identity.did?16:-1)}}function rt(s,_){if(1&s){const o=t.RV6();t.j41(0,"div",4)(1,"h2",5),t.DNE(2,Y,5,1)(3,J,4,5),t.j41(4,"button",6),t.bIt("click",function(){t.eBV(o);const e=t.XpG().$implicit,i=t.XpG();return t.Njj(i.addTask(e))}),t.j41(5,"mat-icon"),t.EFF(6,"add_box"),t.k0s()(),t.j41(7,"button",7),t.bIt("click",function(){t.eBV(o);const e=t.XpG().$implicit,i=t.XpG();return t.Njj(i.reloadList(e))}),t.DNE(8,K,1,0,"mat-spinner",8)(9,Z,2,0,"mat-icon"),t.k0s(),t.j41(10,"button",9)(11,"mat-icon"),t.EFF(12,"more_vert"),t.k0s()(),t.DNE(13,q,1,0,"mat-spinner",10),t.j41(14,"mat-menu",null,0)(16,"button",11),t.bIt("click",function(){t.eBV(o);const e=t.XpG().$implicit,i=t.XpG();return t.Njj(i.collaboratorDialog(e))}),t.j41(17,"mat-icon"),t.EFF(18,"person_add_alt"),t.k0s(),t.j41(19,"span"),t.EFF(20,"Collaborators"),t.k0s()(),t.nrm(21,"mat-divider"),t.j41(22,"button",11),t.bIt("click",function(){t.eBV(o);const e=t.XpG().$implicit,i=t.XpG();return t.Njj(i.deleteList(e))}),t.j41(23,"mat-icon"),t.EFF(24,"delete"),t.k0s(),t.j41(25,"span"),t.EFF(26,"Delete"),t.k0s()()()(),t.j41(27,"div",12),t.bIt("cdkDropListDropped",function(e){t.eBV(o);const i=t.XpG(2);return t.Njj(i.drop(e))}),t.Z7z(28,st,17,5,null,null,t.fX1),t.k0s()()}if(2&s){const o=t.sdS(15),n=t.XpG().$implicit;t.R7$(2),t.vxM(n.editing?2:3),t.R7$(5),t.Y8G("disabled",n.loading),t.R7$(),t.vxM(n.loading?8:9),t.R7$(2),t.Y8G("matMenuTriggerFor",o),t.R7$(3),t.vxM(n.loading?13:-1),t.R7$(14),t.Y8G("cdkDropListData",n),t.R7$(),t.Dyx(n.todos)}}function at(s,_){if(1&s&&t.DNE(0,rt,30,6,"div",4),2&s){const o=_.$implicit,n=t.XpG();t.vxM(n.selectedList()&&n.selectedList()!==o.id?-1:0)}}let lt=(()=>{class s{constructor(){var o=this;this.list=[],this.layout=(0,t.WQX)(A.Y),this.app=(0,t.WQX)(M.d),this.identity=(0,t.WQX)(N.K),this.connection=(0,t.WQX)(O.K),this.route=(0,t.WQX)(E.nX),this.changeRef=(0,t.WQX)(t.gRc),this.dialog=(0,t.WQX)(h.bZ),this.snackBar=(0,t.WQX)(Q.UG),this.events=(0,t.WQX)(V.U),this.selectedList=(0,t.vPA)(null),this.selectedRecord=(0,t.vPA)(null),(0,t.QZP)((0,m.A)(function*(){o.events.taskProtocol()&&setTimeout((0,m.A)(function*(){yield o.load()}),2e3)}),{allowSignalWrites:!0}),(0,t.QZP)((0,m.A)(function*(){o.app.initialized()&&(yield o.load(),o.startAutoLoad())}),{allowSignalWrites:!0}),this.route.paramMap.subscribe(n=>{this.layout.marginOn(),this.layout.resetActions();const e=n.get("id");this.selectedList.set(e&&":id"!=e&&"home"!=e?n.get("id"):null)})}startAutoLoad(){var o=this;setInterval((0,m.A)(function*(){yield o.reloadRemoteLists()}),3e4)}getList(o){var n=this;return(0,m.A)(function*(){console.log("GET LIST: ",o.record.creator);const e={message:{filter:{contextId:o.id,protocol:p.Q.protocol,protocolPath:"list/task"}}};o.record.creator!=n.identity.did?(e.from=o.record.creator,e.message.protocolRole="list/collaborator"):e.from=n.identity.did;const{records:i}=yield n.identity.web5.dwn.records.query(e);let r=[];for(let a of i){const d=yield n.getTaskEntryFromRecord(a);r.push(d)}return r=r.sort((a,d)=>a.data.index-d.data.index),console.log("ALL TODOS:",r),r})()}getTaskEntryFromRecord(o){return(0,m.A)(function*(){const n=yield o.data.json();return{record:o,data:n,id:o.id}})()}reloadRemoteLists(){var o=this;return(0,m.A)(function*(){const n=o.list.filter(e=>e.record.author!=o.identity.did);for(let e of n)yield o.reloadList(e)})()}reloadList(o){var n=this;return(0,m.A)(function*(){const e={from:o.record.creator,message:{protocolRole:"list/collaborator",filter:{protocolPath:"list",recordId:o.record.id}}},{record:i}=yield n.identity.web5.dwn.records.read(e);if(i.deleted){const a=n.list.findIndex(c=>c.id===o.id);-1!==a&&n.list.splice(a,1);const d=yield i.import();console.log("IMPORT RESULT FROM DELETE OPEARTION:",d)}else{const a=yield i.data.json();(o={record:i,data:a,id:i.id}).todos=yield n.getList(o);const d=n.list.findIndex(c=>c.id===o.id);-1!==d?n.list[d]=o:n.list.push(o)}})()}load(){var o=this;return(0,m.A)(function*(){o.list=[];const{records:n}=yield o.identity.web5.dwn.records.query({message:{filter:{protocol:p.Q.protocol,schema:p.Q.types.list.schema},dateSort:F.U0.CreatedAscending}});for(let i of n){const r=yield i.data.json();let a={record:i,data:r,id:i.id};a.todos=yield o.getList(a),o.list.push(a)}const e=o.list.filter(i=>i.record.author!=o.identity.did);console.log("SHARED LISTS:",e);for(let i of e){console.log("LIST:",i),console.log("FROM:",i.record.creator),console.log("RECORD:",i.record.id),console.log("RECORD:",i.data.recordId);const r={from:i.record.creator,message:{protocolRole:"list/collaborator",filter:{protocolPath:"list",recordId:i.record.id}}},{record:a,status:d}=yield o.identity.web5.dwn.records.read(r);if(console.log("READ STATUS:",d),!a){if(console.log("RECORD NOT FOUND, DELETED REMOTELY?",i.record.id),404===d.code){yield i.record.delete();const c=o.list.findIndex(u=>u.id===i.id);-1!==c&&o.list.splice(c,1)}return}if(a.deleted){const c=o.list.findIndex(f=>f.id===i.id);-1!==c&&o.list.splice(c,1);const u=yield a.import();console.log("IMPORT RESULT FROM DELETE OPERATION:",u)}else if(a.dateModified!=i.record.dateModified){const c=yield a.data.json();let u={record:a,data:c,id:a.id};u.todos=yield o.getList(u);const f=o.list.findIndex(C=>C.id===u.id);-1!==f?o.list[f]=u:o.list.push(u);try{yield a.import()}catch(C){console.error("Import error, this is expected \u{1f602}\u{1f923}\u{1f972} until SDK is updated:",C)}}else console.log("NO UPDATE, RECORD IS NOT MODIFIED!!")}})()}collaboratorDialog(o){var n=this;let e={title:o.data.title,id:o.id,collaborators:o.data.collaborators};null==e.collaborators&&(e.collaborators=[]);const i=JSON.parse(JSON.stringify(e)),r=this.dialog.open(w,{data:e});return r.afterClosed().subscribe(function(){var a=(0,m.A)(function*(d){if(d){o.data.collaborators=e.collaborators;const c=new Set(i.collaborators),u=e.collaborators.filter(I=>!c.has(I)),f=e.collaborators.filter(I=>c.has(I)),{status:C}=yield o.record.update({data:o.data});console.log("Save status for list:",C),console.log("New collaborators:",u),console.log("Existing collaborators:",f),yield n.sendConnectRequests(o.record,o.data,u),n.app.openSnackBar("Sent sharing request to collaborators")}else e=i});return function(d){return a.apply(this,arguments)}}()),r.afterClosed()}sendConnectRequests(o,n,e){var i=this;return(0,m.A)(function*(){for(let r of e){const d={data:{},message:{tags:{role:!0},recipient:r,protocol:p.Q.protocol,parentContextId:o.contextId,protocolPath:"list/collaborator",schema:p.Q.types.collaborator.schema}};console.log("QUERY:",d);const{record:c,status:u}=yield i.identity.web5.dwn.records.create(d);console.log("!!!!!"),console.log("Role status:",u),console.log("Role record:",c),yield c?.send(i.identity.did);const f={recordId:o.id,app:"tasks",title:n.title};yield(yield i.connection.request(r,f,O.X.Data)).record.send(r)}})()}editList(o){o.editing=!0}saveList(o){return(0,m.A)(function*(){o.editing=!1;const{status:n}=yield o.record.update({data:o.data});console.log("Update status:",n);const{status:e}=yield o.record.send();console.log("SEND STATUS TO SELF:",e)})()}editTask(o){o.editing=!0}saveTask(o,n){var e=this;return(0,m.A)(function*(){o.editing=!1;const i={data:o.data},{status:r}=yield o.record.update(i);console.log("Update status:",r);const{status:a}=yield o.record.send();if(console.log("Send status 2: ",a),o.record.creator!=e.identity.did){console.log("SENDING TASK TO CREATOR:",o.record.creator);const{status:d}=yield o.record.send(o.record.creator);console.log("UPDATE STATUS:",d)}})()}deleteList(o){var n=this;return(0,m.A)(function*(){yield o.record.delete({prune:!0}),o.record.author!=n.identity.did&&(console.log("SENDING THE DELETE TO REMOTE USER!"),yield o.record.send(o.record.author)),n.list=n.list.filter(e=>e.id!==o.id)})()}deleteTask(o,n){return(0,m.A)(function*(){yield o.delete(),n.todos=n.todos.filter(i=>i.id!==o.id);const{status:e}=yield o.send();console.log("SEND STATUS OF DELETE:",e)})()}initializeIndices(o){o.forEach((n,e)=>{n.index=e+1})}calculateNewIndex(o,n){return(o+n)/2}addTask(o){var n=this;return(0,m.A)(function*(){o.todos||(o.todos=[]);const e={completed:!1,description:"New task...",author:n.identity.did,parentId:o.id,index:o.todos.length+1,collaborators:[]},{record:i,status:r}=yield n.identity.web5.dwn.records.create({data:e,message:{protocol:p.Q.protocol,protocolPath:"list/task",protocolRole:"list/collaborator",schema:p.Q.types.task.schema,dataFormat:p.Q.types.task.dataFormats[0],parentContextId:e.parentId}});console.log("createStatus:",r);const a=yield i?.send();if(console.log("Result self:",a?.status),o.record.author!=n.identity.did){console.log(`SENDING TASK TO AUTHOR!!! ${o.record.author}`);const c=yield i?.send(o.record.author);console.log("Send Status: ",c?.status),console.log("SENDING LIST TO COLLABORATORS!!!",o)}console.log("VALIDATE collaborator:",i);const d=yield n.getTaskEntryFromRecord(i);o.todos.push(d),console.log(o),n.changeRef.markForCheck()})()}loadRoles(){var o=this;return(0,m.A)(function*(){o.list=[];const{records:n}=yield o.identity.web5.dwn.records.query({message:{filter:{protocol:p.Q.protocol,protocolPath:"list/collaborator"},dateSort:F.U0.CreatedAscending}});console.log("ROLE RECORDS: ",n)})()}loadRemote(){var o=this;return(0,m.A)(function*(){o.list=[];const n={from:"did:dht:swboka9qm4ywhsoz19ja7gz9et9ccqhy8y88aikae1bwmfiuem3o",message:{filter:{protocol:p.Q.protocol,protocolPath:"list",schema:p.Q.types.list.schema,dataFormat:p.Q.types.list.dataFormats[0]},dateSort:F.U0.CreatedAscending}};console.log(n);const{records:e}=yield o.identity.web5.dwn.records.query(n),{record:i}=yield o.identity.web5.dwn.records.read({from:"did:dht:swboka9qm4ywhsoz19ja7gz9et9ccqhy8y88aikae1bwmfiuem3o",message:{protocolRole:"list/collaborator",filter:{recordId:"bafyreib3ivgo5vmt77w7cdg2kjyjbjfzdjw3so2yz7bd6redz7kfbsmvmi",protocol:p.Q.protocol}}});console.log("SINGLE RECORD:",i);const r=yield i.data.json();console.log("SINGLE JSON:",r),console.log("REMOTE RECORDS: ",e);for(let a of e){const d=yield a.data.json();console.log("REMOTE RECORD DATA:",d)}})()}createTests(){var o=this;return(0,m.A)(function*(){const n={type:"list",title:"New list",description:"What to do?",author:o.identity.did,collaborators:[]},{record:e,status:i}=yield o.identity.web5.dwn.records.create({data:n,message:{protocol:p.Q.protocol,protocolPath:"list",schema:p.Q.types.list.schema,dataFormat:p.Q.types.list.dataFormats[0]}});console.log("STATUS: ",i),e?.send(o.identity.did);const a={data:{},message:{tags:{role:!0},recipient:"did:dht:4jt77q3d3sjndj9drdxtdppjqegmu8zaxo8ktw8xwr5ecrsn5mby",protocol:p.Q.protocol,parentContextId:e.contextId,protocolPath:"list/collaborator",schema:p.Q.types.collaborator.schema}};console.log("QUERY:",a);const{record:d,status:c}=yield o.identity.web5.dwn.records.create(a);console.log("ROLE STATUS:",c),d?.send(o.identity.did)})()}newList(){var o=this;return(0,m.A)(function*(){const n={type:"list",title:"New list",description:"What to do?",author:o.identity.did,collaborators:[]},{record:e}=yield o.identity.web5.dwn.records.create({data:n,message:{protocol:p.Q.protocol,protocolPath:"list",protocolRole:"list/collaborator",schema:p.Q.types.list.schema,dataFormat:p.Q.types.list.dataFormats[0]}});console.log("VALIDATE collaborator:",e);const i=yield e.data.json();o.list.push({record:e,data:i,id:e.id});const{status:a}=yield e.send(o.identity.did);console.log("Send status:",a)})()}drop(o){var n=this;return(0,m.A)(function*(){console.log("DROP:",o);const e=o.item.data;e.loading=!0;const i=o.container.data;void 0===i.todos&&(i.todos=[]);const r=i.todos,d=o.previousContainer.data.todos;if(o.previousContainer===o.container){(0,y.HD)(r,o.previousIndex,o.currentIndex);const c=o.currentIndex>0?r[o.currentIndex-1].data.index:0,u=o.currentIndex<r.length-1?r[o.currentIndex+1].data.index:r.length+1;e.data.index=n.calculateNewIndex(c,u),console.log(c,u,e.data.index);const{status:f}=yield e.record.update({data:e.data});console.log("Status:",f),e.loading=!1}else{(0,y.eg)(d,r,o.previousIndex,o.currentIndex),e.data.parentId=i.id;const c=o.currentIndex>0?r[o.currentIndex-1].data.index:0,u=o.currentIndex<r.length-1?r[o.currentIndex+1].data.index:r.length+1;e.data.index=n.calculateNewIndex(c,u),console.log(c,u,e.data.index);const{record:f,status:C}=yield n.identity.web5.dwn.records.create({data:e.data,message:{protocol:p.Q.protocol,protocolPath:"list/task",schema:p.Q.types.task.schema,dataFormat:p.Q.types.task.dataFormats[0],parentContextId:e.data.parentId}});console.log("Create status:",C),yield e.record.delete(),e.record=f,e.id=f?.id,e.loading=!1}})()}static{this.\u0275fac=function(n){return new(n||s)}}static{this.\u0275cmp=t.VBU({type:s,selectors:[["app-todo"]],standalone:!0,features:[t.aNF],decls:7,vars:1,consts:[["menuListActions","matMenu"],["menuActions","matMenu"],["cdkDropListGroup",""],["mat-flat-button","",3,"click"],[1,"container"],[1,"list-header"],["mat-icon-button","","matTooltip","Add new task",3,"click"],["mat-icon-button","",3,"click","disabled"],["diameter","24"],["mat-icon-button","",3,"matMenuTriggerFor"],["diameter","20"],["mat-menu-item","",3,"click"],["cdkDropList","",1,"list",3,"cdkDropListDropped","cdkDropListData"],["subscriptSizing","dynamic"],["matInput","",3,"ngModelChange","keydown.enter","ngModel"],["mat-icon-button","",3,"click"],[1,"list-selection",3,"routerLink"],["mat-icon-button","","matTooltip","Shared with you",2,"pointer-events","all",3,"disabled"],["mat-icon-button",""],["cdkDrag","",1,"list-item",3,"cdkDragData"],[3,"ngClass"],[1,"spacer"],["color","primary",3,"ngModel"],["color","primary",3,"ngModelChange","change","ngModel"]],template:function(n,e){1&n&&(t.j41(0,"div"),t.DNE(1,z,5,0),t.j41(2,"div",2),t.Z7z(3,at,1,1,null,null,t.fX1),t.k0s(),t.nrm(5,"br")(6,"br"),t.k0s()),2&n&&(t.R7$(),t.vxM(e.selectedList()?-1:1),t.R7$(2),t.Dyx(e.list))},dependencies:[j.RG,j.rl,g.X1,g.me,g.BC,x.fS,x.fg,g.YN,g.vS,S.g7,S.So,y.T1,y.O7,y.RK,R.MD,R.YU,b.Hl,b.$z,b.iY,E.iI,E.Wk,X.RI,T.m_,T.An,k.Cn,k.kk,k.fb,k.Cp,G.w,G.q,L.D6,L.LG,v.uc,v.oV],styles:[".container[_ngcontent-%COMP%]{width:400px;max-width:100%;margin-right:1em;display:inline-block;vertical-align:top}.list[_ngcontent-%COMP%]{border:solid 1px #ccc;min-height:60px;border-radius:4px;display:block;overflow:hidden}.list-item[_ngcontent-%COMP%]{padding:20px 10px;border-bottom:solid 1px #ccc;box-sizing:border-box;cursor:move;background-color:#00000080;font-size:14px;display:flex;align-items:center}.list-header[_ngcontent-%COMP%]{display:flex;align-items:center}.list-selection[_ngcontent-%COMP%]{text-decoration:none;padding-right:.2em}.list-selection[_ngcontent-%COMP%]:hover{text-decoration:underline}.strikeout[_ngcontent-%COMP%]{text-decoration:line-through}.list-item[_ngcontent-%COMP%]:last-child{border:none}.cdk-drag-preview[_ngcontent-%COMP%]{border-radius:4px;box-shadow:0 5px 5px -3px #0003,0 8px 10px 1px #00000024,0 3px 14px 2px #0000001f}.cdk-drop-list-dragging[_ngcontent-%COMP%]   .cdk-drag[_ngcontent-%COMP%]{transition:transform .25s cubic-bezier(0,0,.2,1)}.cdk-drag-animating[_ngcontent-%COMP%]{transition:transform .3s cubic-bezier(0,0,.2,1)}.cdk-drag-placeholder[_ngcontent-%COMP%]{opacity:0}.todo-list[_ngcontent-%COMP%]{margin-bottom:1em;border:1px solid silver;padding:1em;box-sizing:border-box;cursor:pointer}.todo-list[_ngcontent-%COMP%]:hover{border:1px solid gray}"]})}}return s})()}}]);