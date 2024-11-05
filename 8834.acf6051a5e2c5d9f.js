"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[8834],{38834:(de,F,o)=>{o.r(F),o.d(F,{FriendsComponent:()=>se});var d=o(10467),e=o(54438),E=o(86600),h=o(18617),C=o(60177);let D=0;const y="mat-badge-content",b=new Set;let B=(()=>{class n{static{this.\u0275fac=function(a){return new(a||n)}}static{this.\u0275cmp=e.VBU({type:n,selectors:[["ng-component"]],standalone:!0,features:[e.aNF],decls:0,vars:0,template:function(a,i){},styles:[".mat-badge{position:relative}.mat-badge.mat-badge{overflow:visible}.mat-badge-content{position:absolute;text-align:center;display:inline-block;transition:transform 200ms ease-in-out;transform:scale(0.6);overflow:hidden;white-space:nowrap;text-overflow:ellipsis;box-sizing:border-box;pointer-events:none;background-color:var(--mat-badge-background-color, var(--mat-app-error));color:var(--mat-badge-text-color, var(--mat-app-on-error));font-family:var(--mat-badge-text-font, var(--mat-app-label-small-font));font-weight:var(--mat-badge-text-weight, var(--mat-app-label-small-weight));border-radius:var(--mat-badge-container-shape, var(--mat-app-corner-full))}.cdk-high-contrast-active .mat-badge-content{outline:solid 1px;border-radius:0}.mat-badge-above .mat-badge-content{bottom:100%}.mat-badge-below .mat-badge-content{top:100%}.mat-badge-before .mat-badge-content{right:100%}[dir=rtl] .mat-badge-before .mat-badge-content{right:auto;left:100%}.mat-badge-after .mat-badge-content{left:100%}[dir=rtl] .mat-badge-after .mat-badge-content{left:auto;right:100%}.mat-badge-disabled .mat-badge-content{background-color:var(--mat-badge-disabled-state-background-color);color:var(--mat-badge-disabled-state-text-color, var(--mat-app-on-error))}.mat-badge-hidden .mat-badge-content{display:none}.ng-animate-disabled .mat-badge-content,.mat-badge-content._mat-animation-noopable{transition:none}.mat-badge-content.mat-badge-active{transform:none}.mat-badge-small .mat-badge-content{width:var(--mat-badge-legacy-small-size-container-size, unset);height:var(--mat-badge-legacy-small-size-container-size, unset);min-width:var(--mat-badge-small-size-container-size, unset);min-height:var(--mat-badge-small-size-container-size, unset);line-height:var(--mat-badge-legacy-small-size-container-size);padding:var(--mat-badge-small-size-container-padding);font-size:var(--mat-badge-small-size-text-size);margin:var(--mat-badge-small-size-container-offset)}.mat-badge-small.mat-badge-overlap .mat-badge-content{margin:var(--mat-badge-small-size-container-overlap-offset)}.mat-badge-medium .mat-badge-content{width:var(--mat-badge-legacy-container-size, unset);height:var(--mat-badge-legacy-container-size, unset);min-width:var(--mat-badge-container-size, unset);min-height:var(--mat-badge-container-size, unset);line-height:var(--mat-badge-legacy-container-size);padding:var(--mat-badge-container-padding);font-size:var(--mat-badge-text-size, var(--mat-app-label-small-size));margin:var(--mat-badge-container-offset)}.mat-badge-medium.mat-badge-overlap .mat-badge-content{margin:var(--mat-badge-container-overlap-offset)}.mat-badge-large .mat-badge-content{width:var(--mat-badge-legacy-large-size-container-size, unset);height:var(--mat-badge-legacy-large-size-container-size, unset);min-width:var(--mat-badge-large-size-container-size, unset);min-height:var(--mat-badge-large-size-container-size, unset);line-height:var(--mat-badge-legacy-large-size-container-size);padding:var(--mat-badge-large-size-container-padding);font-size:var(--mat-badge-large-size-text-size, var(--mat-app-label-small-size));margin:var(--mat-badge-large-size-container-offset)}.mat-badge-large.mat-badge-overlap .mat-badge-content{margin:var(--mat-badge-large-size-container-overlap-offset)}"],encapsulation:2,changeDetection:0})}}return n})(),k=(()=>{class n{get color(){return this._color}set color(t){this._setColor(t),this._color=t}get content(){return this._content}set content(t){this._updateRenderedContent(t)}get description(){return this._description}set description(t){this._updateDescription(t)}constructor(t,a,i,f,re){this._ngZone=t,this._elementRef=a,this._ariaDescriber=i,this._renderer=f,this._animationMode=re,this._color="primary",this.overlap=!0,this.position="above after",this.size="medium",this._id=D++,this._isInitialized=!1,this._interactivityChecker=(0,e.WQX)(h.Z7),this._document=(0,e.WQX)(C.qQ);const u=(0,e.WQX)(e.o8S);if(!b.has(u)){b.add(u);const R=(0,e.a0P)(B,{environmentInjector:(0,e.WQX)(e.uvJ)});u.onDestroy(()=>{b.delete(u),R.destroy()})}}isAbove(){return-1===this.position.indexOf("below")}isAfter(){return-1===this.position.indexOf("before")}getBadgeElement(){return this._badgeElement}ngOnInit(){this._clearExistingBadges(),this.content&&!this._badgeElement&&(this._badgeElement=this._createBadgeElement(),this._updateRenderedContent(this.content)),this._isInitialized=!0}ngOnDestroy(){this._renderer.destroyNode&&(this._renderer.destroyNode(this._badgeElement),this._inlineBadgeDescription?.remove()),this._ariaDescriber.removeDescription(this._elementRef.nativeElement,this.description)}_isHostInteractive(){return this._interactivityChecker.isFocusable(this._elementRef.nativeElement,{ignoreVisibility:!0})}_createBadgeElement(){const t=this._renderer.createElement("span"),a="mat-badge-active";return t.setAttribute("id",`mat-badge-content-${this._id}`),t.setAttribute("aria-hidden","true"),t.classList.add(y),"NoopAnimations"===this._animationMode&&t.classList.add("_mat-animation-noopable"),this._elementRef.nativeElement.appendChild(t),"function"==typeof requestAnimationFrame&&"NoopAnimations"!==this._animationMode?this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>{t.classList.add(a)})}):t.classList.add(a),t}_updateRenderedContent(t){const a=`${t??""}`.trim();this._isInitialized&&a&&!this._badgeElement&&(this._badgeElement=this._createBadgeElement()),this._badgeElement&&(this._badgeElement.textContent=a),this._content=a}_updateDescription(t){this._ariaDescriber.removeDescription(this._elementRef.nativeElement,this.description),(!t||this._isHostInteractive())&&this._removeInlineDescription(),this._description=t,this._isHostInteractive()?this._ariaDescriber.describe(this._elementRef.nativeElement,t):this._updateInlineDescription()}_updateInlineDescription(){this._inlineBadgeDescription||(this._inlineBadgeDescription=this._document.createElement("span"),this._inlineBadgeDescription.classList.add("cdk-visually-hidden")),this._inlineBadgeDescription.textContent=this.description,this._badgeElement?.appendChild(this._inlineBadgeDescription)}_removeInlineDescription(){this._inlineBadgeDescription?.remove(),this._inlineBadgeDescription=void 0}_setColor(t){const a=this._elementRef.nativeElement.classList;a.remove(`mat-badge-${this._color}`),t&&a.add(`mat-badge-${t}`)}_clearExistingBadges(){const t=this._elementRef.nativeElement.querySelectorAll(`:scope > .${y}`);for(const a of Array.from(t))a!==this._badgeElement&&a.remove()}static{this.\u0275fac=function(a){return new(a||n)(e.rXU(e.SKi),e.rXU(e.aKT),e.rXU(h.vr),e.rXU(e.sFG),e.rXU(e.bc$,8))}}static{this.\u0275dir=e.FsC({type:n,selectors:[["","matBadge",""]],hostAttrs:[1,"mat-badge"],hostVars:20,hostBindings:function(a,i){2&a&&e.AVh("mat-badge-overlap",i.overlap)("mat-badge-above",i.isAbove())("mat-badge-below",!i.isAbove())("mat-badge-before",!i.isAfter())("mat-badge-after",i.isAfter())("mat-badge-small","small"===i.size)("mat-badge-medium","medium"===i.size)("mat-badge-large","large"===i.size)("mat-badge-hidden",i.hidden||!i.content)("mat-badge-disabled",i.disabled)},inputs:{color:[0,"matBadgeColor","color"],overlap:[2,"matBadgeOverlap","overlap",e.L39],disabled:[2,"matBadgeDisabled","disabled",e.L39],position:[0,"matBadgePosition","position"],content:[0,"matBadge","content"],description:[0,"matBadgeDescription","description"],size:[0,"matBadgeSize","size"],hidden:[2,"matBadgeHidden","hidden",e.L39]},standalone:!0,features:[e.GFd]})}}return n})(),L=(()=>{class n{static{this.\u0275fac=function(a){return new(a||n)}}static{this.\u0275mod=e.$C({type:n})}static{this.\u0275inj=e.G2t({imports:[h.Pd,E.yE,E.yE]})}}return n})();var v=o(88834),r=o(25596),_=o(99213),l=o(3902),c=o(59115),g=o(96850),z=o(34635),j=o(96084),A=o(5794),$=o(345),P=o(78013),I=o(33347),T=o(14823),p=o(30046);const G=["*"],m=n=>["/profile",n];function N(n,s){if(1&n&&e.EFF(0),2&n){let t;const a=e.XpG(2);e.SpI(" (",null==(t=a.data().profile)?null:t.title,") ")}}function X(n,s){if(1&n&&(e.j41(0,"a",0),e.EFF(1),e.DNE(2,N,1,1),e.k0s()),2&n){let t,a;const i=e.XpG();e.Y8G("routerLink",e.eq3(3,m,i.did())),e.R7$(),e.SpI("",null==(t=i.data().profile)?null:t.name," "),e.R7$(),e.vxM(null!=(a=i.data().profile)&&a.title?2:-1)}}function O(n,s){if(1&n&&e.EFF(0),2&n){let t;const a=e.XpG(2);e.SpI(" (",null==(t=a.data().profile)?null:t.title,") ")}}function S(n,s){if(1&n&&(e.j41(0,"em")(1,"a",0),e.EFF(2,"No name set "),e.DNE(3,O,1,1),e.k0s()()),2&n){let t;const a=e.XpG();e.R7$(),e.Y8G("routerLink",e.eq3(2,m,a.did())),e.R7$(2),e.vxM(null!=(t=a.data().profile)&&t.title?3:-1)}}function Y(n,s){if(1&n&&(e.nrm(0,"img",1),e.nI1(1,"safeResourceUrl")),2&n){const t=e.XpG();e.Y8G("routerLink",e.eq3(4,m,t.did()))("src",e.bMT(1,2,t.data().avatar),e.B4B)}}function Q(n,s){if(1&n&&e.nrm(0,"img",2),2&n){const t=e.XpG();e.Y8G("routerLink",e.eq3(2,m,t.did()))("src","/avatar-placeholder.png",e.B4B)}}function W(n,s){if(1&n&&(e.j41(0,"p"),e.EFF(1),e.k0s()),2&n){const t=e.XpG();e.R7$(),e.JRh(t.data().message)}}let w=(()=>{class n{constructor(){this.identity=(0,e.WQX)(z.K),this.profile=(0,e.WQX)(A.p),this.sanitizer=(0,e.WQX)($.up),this.did=e.hFB.required(),this.data=(0,e.vPA)({})}ngAfterViewInit(){var t=this;return(0,d.A)(function*(){if(t.did()){const a=yield t.profile.loadProfile(t.did());console.log(a),t.data.set(a)}})()}static{this.\u0275fac=function(a){return new(a||n)}}static{this.\u0275cmp=e.VBU({type:n,selectors:[["app-profile-card"]],inputs:{did:[1,"did"]},standalone:!0,features:[e.aNF],ngContentSelectors:G,decls:16,vars:9,consts:[[3,"routerLink"],["mat-card-image","","onerror","this.src='/avatar-placeholder.png';this.onerror='';",1,"profile-thumbnail",3,"routerLink","src"],["mat-card-image","",1,"profile-thumbnail",3,"routerLink","src"]],template:function(a,i){if(1&a&&(e.NAR(),e.j41(0,"mat-card")(1,"mat-card-header")(2,"mat-card-title"),e.DNE(3,X,3,5,"a",0)(4,S,4,4,"em"),e.k0s(),e.j41(5,"mat-card-subtitle")(6,"a",0),e.EFF(7),e.nI1(8,"did"),e.k0s()()(),e.nrm(9,"br"),e.DNE(10,Y,2,6,"img",1)(11,Q,1,4,"img",2),e.j41(12,"mat-card-content"),e.DNE(13,W,2,1,"p"),e.k0s(),e.j41(14,"mat-card-actions"),e.SdG(15),e.k0s()()),2&a){let f;e.R7$(3),e.vxM(null!=(f=i.data().profile)&&f.name?3:4),e.R7$(3),e.Y8G("routerLink",e.eq3(7,m,i.did())),e.R7$(),e.JRh(e.bMT(8,5,i.did())),e.R7$(3),e.vxM(i.data().avatar?10:11),e.R7$(3),e.vxM(i.data().message?13:-1)}},dependencies:[p.iI,p.Wk,T.uc,r.Hu,r.RN,r.YY,r.m2,r.MM,r.kF,r.Lc,r.dh,P.d,I.k],styles:[".profile-thumbnail[_ngcontent-%COMP%]{cursor:pointer}a[_ngcontent-%COMP%]{text-decoration:none}a[_ngcontent-%COMP%]:hover{text-decoration:underline}"]})}}return n})();var U=o(36815),V=o(58249),H=o(21093),Z=o(49996),q=o(71997);const x=n=>["/profile",n],M=n=>["/app","chat",n],J=()=>["/profile","did:dht:wfcf3guhgb183rbfx5r4a5u3kh9tgjnmdp75xdphyj6wbaxxym7o"];function K(n,s){1&n&&(e.j41(0,"mat-icon",9),e.EFF(1,"person"),e.k0s(),e.j41(2,"span",10),e.EFF(3,"Friends"),e.k0s())}function ee(n,s){if(1&n&&(e.j41(0,"mat-list-item")(1,"mat-icon",11),e.EFF(2,"folder"),e.k0s(),e.j41(3,"div",12)(4,"div",13),e.EFF(5),e.k0s()(),e.j41(6,"div",14)(7,"button",15)(8,"mat-icon"),e.EFF(9,"more_vert"),e.k0s()()(),e.j41(10,"mat-menu",null,1)(12,"button",16)(13,"mat-icon"),e.EFF(14,"account_circle"),e.k0s(),e.j41(15,"span"),e.EFF(16,"View Profile"),e.k0s()(),e.nrm(17,"mat-divider"),e.j41(18,"button",16)(19,"mat-icon"),e.EFF(20,"chat_bubble"),e.k0s(),e.j41(21,"span"),e.EFF(22,"Message"),e.k0s()()()()),2&n){const t=s.$implicit,a=e.sdS(11);e.R7$(5),e.JRh(t.data.did),e.R7$(2),e.Y8G("matMenuTriggerFor",a),e.R7$(5),e.Y8G("routerLink",e.eq3(4,x,t.data.did)),e.R7$(6),e.Y8G("routerLink",e.eq3(6,M,t.data.did))}}function te(n,s){if(1&n&&(e.j41(0,"app-profile-card",4)(1,"button",17),e.EFF(2,"VIEW"),e.k0s(),e.j41(3,"button",18),e.EFF(4,"MESSAGE"),e.k0s()()),2&n){const t=s.$implicit;e.Y8G("did",t.data.did),e.R7$(),e.Y8G("routerLink",e.eq3(3,x,t.data.did)),e.R7$(2),e.Y8G("routerLink",e.eq3(5,M,t.data.did))}}function ne(n,s){1&n&&(e.j41(0,"div",5)(1,"strong"),e.EFF(2,"No friends yet"),e.k0s(),e.EFF(3,", don't fret."),e.nrm(4,"br")(5,"br"),e.EFF(6,"Find some friends in real life or online, get their unique identifier or scan their QR code! "),e.nrm(7,"br")(8,"br"),e.EFF(9," Check out this "),e.j41(10,"a",19),e.EFF(11,"profile of Sondre"),e.k0s(),e.EFF(12,". "),e.k0s()),2&n&&(e.R7$(10),e.Y8G("routerLink",e.lJ4(1,J)))}function ae(n,s){if(1&n&&(e.j41(0,"mat-icon",9),e.EFF(1,"person_add"),e.k0s(),e.j41(2,"span",20),e.EFF(3,"Requests\xa0"),e.k0s()),2&n){const t=e.XpG();e.R7$(2),e.Y8G("matBadge",t.requests.length)}}function ie(n,s){1&n&&e.nrm(0,"app-request",8),2&n&&e.Y8G("entry",s.$implicit)}function oe(n,s){1&n&&e.EFF(0," No requests found. ")}let se=(()=>{class n{constructor(){var t=this;this.friends=[],this.requests=[],this.identity=(0,e.WQX)(z.K),this.friend=(0,e.WQX)(V.K),this.connection=(0,e.WQX)(H.K),this.layout=(0,e.WQX)(U.Y),this.app=(0,e.WQX)(j.d),this.layout.resetActions(),(0,e.QZP)((0,d.A)(function*(){t.app.initialized()&&t.connection.connections()&&(yield t.loadFriends())})),(0,e.QZP)((0,d.A)(function*(){t.app.initialized()&&t.connection.requests()&&(yield t.loadRequests())}))}loadRequests(){var t=this;return(0,d.A)(function*(){t.requests=t.connection.friendRequests()})()}loadFriends(){var t=this;return(0,d.A)(function*(){console.log("LOAD FRIENDS:"),console.log(t.connection.connections()),console.log(t.connection.friends()),t.friends=t.connection.friends()})()}ngOnInit(){this.layout.marginOff()}static{this.\u0275fac=function(a){return new(a||n)}}static{this.\u0275cmp=e.VBU({type:n,selectors:[["app-friends"]],standalone:!0,features:[e.aNF],decls:29,vars:2,consts:[["menu","matMenu"],["menuProfile","matMenu"],["mat-tab-label",""],[1,"container","responsive-grid"],[3,"did"],[1,"empty-list"],["xPosition","before"],["mat-menu-item",""],[3,"entry"],[1,"tab-icon"],[1,"hide-small"],["matListItemIcon",""],["matListItemContent",""],["matLine",""],["matListItemMeta",""],["mat-icon-button","",3,"matMenuTriggerFor"],["mat-menu-item","",3,"routerLink"],["mat-flat-button","",3,"routerLink"],["mat-button","",3,"routerLink"],[3,"routerLink"],["matBadgeOverlap","false",1,"hide-small",3,"matBadge"]],template:function(a,i){1&a&&(e.j41(0,"mat-tab-group")(1,"mat-tab"),e.DNE(2,K,4,0,"ng-template",2),e.j41(3,"mat-list"),e.Z7z(4,ee,23,8,"mat-list-item",null,e.fX1),e.k0s(),e.j41(6,"div",3),e.Z7z(7,te,5,7,"app-profile-card",4,e.fX1,!1,ne,13,2,"div",5),e.k0s(),e.j41(10,"mat-menu",6,0)(12,"button",7)(13,"mat-icon"),e.EFF(14,"favorite"),e.k0s(),e.j41(15,"span"),e.EFF(16,"Favorite"),e.k0s()(),e.nrm(17,"mat-divider"),e.j41(18,"button",7)(19,"mat-icon"),e.EFF(20,"person_remove"),e.k0s(),e.j41(21,"span"),e.EFF(22,"Unfriend"),e.k0s()()()(),e.j41(23,"mat-tab"),e.DNE(24,ae,4,1,"ng-template",2),e.j41(25,"div",3),e.Z7z(26,ie,1,1,"app-request",8,e.fX1,!1,oe,1,0),e.k0s()()()),2&a&&(e.R7$(4),e.Dyx(i.friends),e.R7$(3),e.Dyx(i.friends),e.R7$(19),e.Dyx(i.requests))},dependencies:[C.MD,l.Fg,l.jt,l.YE,l.ZV,q.q,l.BJ,r.Hu,v.Hl,v.$z,v.iY,g.RI,g.ES,g.mq,g.T8,_.m_,_.An,L,k,c.Cn,c.kk,c.fb,c.Cp,w,p.iI,p.Wk,Z.$],styles:[".toolbox[_ngcontent-%COMP%]{display:flex;gap:1em;align-items:baseline}.toolbox-left[_ngcontent-%COMP%]{flex-grow:2}.toolbox-right[_ngcontent-%COMP%]{flex-grow:1}.search-input[_ngcontent-%COMP%]{width:100%}.container[_ngcontent-%COMP%]{padding:24px}img[_ngcontent-%COMP%]{width:100%;height:200px;object-fit:cover}.responsive-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:24px}mat-card-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-right:.2em}.mat-badge[_ngcontent-%COMP%]{margin-left:.5em;border-color:2px solid red}.empty-list[_ngcontent-%COMP%]{display:inline-block;text-align:left}"]})}}return n})()}}]);