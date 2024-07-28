"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[7380],{37380:(y,f,n)=>{n.r(f),n.d(f,{ProfileEditComponent:()=>I});var _=n(10467),t=n(93953),l=n(89417),c=n(88834),u=n(25596),E=n(99213),p=n(99631),P=n(5951),g=n(82798),h=n(34635),v=n(22312),C=n(18498),F=n(39434),M=n(55619),b=n(83475),s=n(53719);function k(r,m){1&r&&(t.j41(0,"mat-error"),t.EFF(1,"Title is "),t.j41(2,"strong"),t.EFF(3,"required"),t.k0s()())}function O(r,m){1&r&&(t.j41(0,"mat-error"),t.EFF(1,"Status is "),t.j41(2,"strong"),t.EFF(3,"required"),t.k0s()())}function D(r,m){1&r&&(t.j41(0,"mat-error"),t.EFF(1,"Bio is "),t.j41(2,"strong"),t.EFF(3,"required"),t.k0s()())}function j(r,m){1&r&&(t.j41(0,"mat-error"),t.EFF(1,"Location is "),t.j41(2,"strong"),t.EFF(3,"required"),t.k0s()())}function T(r,m){if(1&r){const o=t.RV6();t.j41(0,"div",15)(1,"mat-form-field",6),t.nrm(2,"input",19),t.k0s(),t.j41(3,"button",20),t.bIt("click",function(){const a=t.eBV(o).$index,i=t.XpG();return t.Njj(i.removeLink(a))}),t.j41(4,"mat-icon"),t.EFF(5,"clear"),t.k0s()()()}if(2&r){const o=m.$index;t.R7$(2),t.Y8G("formControlName",o)}}let I=(()=>{class r{get links(){return this.form.get("links")}constructor(){var o=this;this.fb=(0,t.WQX)(l.ok),this.identity=(0,t.WQX)(h.K),this.profileService=(0,t.WQX)(F.p),this.router=(0,t.WQX)(C.Ix),this.data=(0,t.vPA)({}),this.form=this.fb.group({name:null,title:[null,l.k0.required],status:[null],bio:[null],location:[null],avatar:[""],links:this.fb.array([this.fb.control("")])}),this.navigation=(0,t.WQX)(M.o),(0,t.QZP)((0,_.A)(function*(){if(o.identity.initialized()){const e=yield o.profileService.loadProfile(o.identity.did);o.data.set(e),o.updateForm(e.profile),o.form.patchValue({avatar:e.avatar})}}))}back(){this.navigation.back()}updateForm(o){console.log("Patching form with:",o),this.form.patchValue({name:o.name,title:o.title,bio:o.bio,status:o.status,location:o.location})}addLink(){this.links.push(this.fb.control(""))}upload(o,e){var a=this;return(0,_.A)(function*(){if(o){if(console.log(e),e){console.log("UPDATING IMAGE!!!!");const{status:i,updatedRecord:d}=yield e.update({published:!0,data:o});return console.log("Update profile status:",i,d),d}{const{record:i}=yield a.identity.web5.dwn.records.create({data:o,message:{protocol:v.ME.uri,protocolPath:"avatar",dataFormat:"image/png",tags:{module:"profile"}}});return i}}console.log("No image to upload.")})()}ngOnInit(){}removeLink(o){this.links.removeAt(o)}onSubmit(){var o=this;return(0,_.A)(function*(){const e={name:o.form.value.name,title:o.form.value.title,bio:o.form.value.bio,status:o.form.value.status,location:o.form.value.location};if(o.data().record){const{status:a,record:i}=yield o.data().record.update({published:!0,data:e});console.log("Update profile status:",a,i)}else{const{status:a,record:i}=yield o.identity.web5.dwn.records.create({data:e,message:{protocol:v.ME.uri,protocolPath:"profile",dataFormat:"application/json"}});console.log("Save profile status:",a,i)}yield o.upload(o.form.controls.avatar.value,o.data().avatarRecord),o.router.navigate(["/profile",o.identity.did])})()}static#t=this.\u0275fac=function(e){return new(e||r)};static#o=this.\u0275cmp=t.VBU({type:r,selectors:[["app-edit"]],standalone:!0,features:[t.aNF],decls:47,vars:7,consts:[["name",""],["title",""],["bio",""],["novalidate","",3,"ngSubmit","formGroup"],["formControlName","avatar"],[1,"form-card"],[1,"full-width"],["matInput","","placeholder","Name","maxlength","200","formControlName","name"],["matInput","","placeholder","Title","formControlName","title"],["matInput","","placeholder","Status","formControlName","status"],["maxlength","300","matInput","","placeholder","Bio","formControlName","bio"],["align","end"],["matInput","","placeholder","Location","formControlName","location"],["matSuffix",""],["formArrayName","links"],[1,"link-input"],["mat-stroked-button","","type","button",3,"click"],["mat-button","","type","button",3,"click"],["mat-flat-button","","color","primary","type","submit",3,"disabled"],["matInput","","type","text","placeholder","Enter link (URL)",3,"formControlName"],["mat-icon-button","","type","button",3,"click"]],template:function(e,a){if(1&e){const i=t.RV6();t.j41(0,"form",3),t.bIt("ngSubmit",function(){return t.eBV(i),t.Njj(a.onSubmit())}),t.nrm(1,"app-avatar",4),t.j41(2,"mat-card",5)(3,"mat-card-content")(4,"mat-form-field",6)(5,"mat-label"),t.EFF(6,"Name"),t.k0s(),t.nrm(7,"input",7,0),t.k0s(),t.j41(9,"mat-form-field",6)(10,"mat-label"),t.EFF(11,"Title"),t.k0s(),t.nrm(12,"input",8,1),t.DNE(14,k,4,0,"mat-error"),t.k0s(),t.j41(15,"mat-form-field",6)(16,"mat-label"),t.EFF(17,"Status"),t.k0s(),t.nrm(18,"input",9),t.DNE(19,O,4,0,"mat-error"),t.k0s(),t.j41(20,"mat-form-field",6)(21,"mat-label"),t.EFF(22,"Bio"),t.k0s(),t.nrm(23,"textarea",10,2),t.DNE(25,D,4,0,"mat-error"),t.j41(26,"mat-hint",11),t.EFF(27),t.k0s()(),t.j41(28,"mat-form-field",6)(29,"mat-label"),t.EFF(30,"Location"),t.k0s(),t.nrm(31,"input",12),t.DNE(32,j,4,0,"mat-error"),t.j41(33,"mat-icon",13),t.EFF(34,"place"),t.k0s()(),t.j41(35,"div",14),t.Z7z(36,T,6,1,"div",15,t.fX1),t.k0s(),t.j41(38,"button",16),t.bIt("click",function(){return t.eBV(i),t.Njj(a.addLink())}),t.j41(39,"mat-icon"),t.EFF(40,"add_link"),t.k0s(),t.EFF(41," Add Link"),t.k0s()(),t.j41(42,"mat-card-actions",11)(43,"button",17),t.bIt("click",function(){return t.eBV(i),t.Njj(a.back())}),t.EFF(44,"Cancel"),t.k0s(),t.j41(45,"button",18),t.EFF(46,"Save"),t.k0s()()()()}if(2&e){const i=t.sdS(24);t.Y8G("formGroup",a.form),t.R7$(14),t.vxM(a.form.controls.title.hasError("required")?14:-1),t.R7$(5),t.vxM(a.form.controls.status.hasError("required")?19:-1),t.R7$(6),t.vxM(a.form.controls.bio.hasError("required")?25:-1),t.R7$(2),t.SpI("",i.value.length," / 300"),t.R7$(5),t.vxM(a.form.controls.location.hasError("required")?32:-1),t.R7$(4),t.Dyx(a.links.controls),t.R7$(9),t.Y8G("disabled",a.form.invalid)}},dependencies:[b.f,p.fS,p.fg,s.rl,s.nJ,s.MV,s.TL,s.yw,c.Hl,c.$z,c.iY,g.Ve,E.m_,E.An,P.Wk,u.Hu,u.RN,u.YY,u.m2,l.X1,l.qT,l.me,l.BC,l.cb,l.tU,l.j4,l.JD,l.v8],styles:[".full-width[_ngcontent-%COMP%]{width:100%}.form-card[_ngcontent-%COMP%]{margin-top:1em}.link-input[_ngcontent-%COMP%]{display:flex;align-items:baseline}.link-input[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-left:.4em}mat-card-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-left:1em}form[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;flex-direction:column}"]})}return r})()}}]);