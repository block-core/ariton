(self.webpackChunkapp=self.webpackChunkapp||[]).push([[888],{50888:(D,s,r)=>{"use strict";r.r(s),r.d(s,{ProfileComponent:()=>Y});var i=r(10467),t=r(93953),e=r(88834),n=r(71997),o=r(99213),a=r(59115),c=r(18498),l=r(39434),u=r(96850),p=r(34635),M=r(78013),f=r(75351),g=r(68314);let I=(()=>{class y{constructor(A){this.data=A}ngAfterViewInit(){const A=document.querySelector("canvas");g.mo(A,this.data.did,E=>{E&&console.error("Error generating QR code: ",E)})}static#t=this.\u0275fac=function(E){return new(E||y)(t.rXU(f.Vh))};static#e=this.\u0275cmp=t.VBU({type:y,selectors:[["app-qrcode-dialog"]],standalone:!0,features:[t.aNF],decls:2,vars:0,consts:[["qrCanvas",""]],template:function(E,L){1&E&&t.nrm(0,"canvas",null,0)}})}return y})();var k=r(31439),U=r(60177),B=r(9183),R=r(69371),F=r(37413),T=r(36815),v=r(345);const _=y=>["/app","chat",y],h=()=>["edit"];function P(y,O){if(1&y&&(t.nrm(0,"img",2),t.nI1(1,"safeResourceUrl")),2&y){const A=t.XpG(2);t.Y8G("src",t.bMT(1,1,A.data().avatar),t.B4B)}}function C(y,O){1&y&&t.nrm(0,"img",3)}function d(y,O){if(1&y&&(t.j41(0,"span"),t.EFF(1),t.k0s()),2&y){const A=t.XpG(2);t.R7$(),t.SpI("(",A.data().profile.title,")")}}function N(y,O){1&y&&(t.nrm(0,"mat-divider"),t.j41(1,"button",8)(2,"mat-icon"),t.EFF(3,"edit"),t.k0s(),t.j41(4,"span"),t.EFF(5,"Edit Profile"),t.k0s()()),2&y&&(t.R7$(),t.Y8G("routerLink",t.lJ4(1,h)))}function w(y,O){1&y&&(t.j41(0,"mat-icon",16),t.EFF(1,"badge"),t.k0s(),t.j41(2,"span",17),t.EFF(3,"About"),t.k0s())}function m(y,O){if(1&y&&(t.j41(0,"mat-icon"),t.EFF(1,"event"),t.k0s(),t.j41(2,"span"),t.EFF(3),t.k0s()),2&y){const A=t.XpG(2);t.R7$(3),t.JRh(A.data().profile.birthDate)}}function S(y,O){if(1&y&&(t.j41(0,"mat-icon"),t.EFF(1,"place"),t.k0s(),t.j41(2,"span"),t.EFF(3),t.k0s()),2&y){const A=t.XpG(2);t.R7$(3),t.JRh(A.data().profile.location)}}function b(y,O){if(1&y&&(t.j41(0,"mat-icon"),t.EFF(1,"event"),t.k0s(),t.j41(2,"span"),t.EFF(3),t.k0s()),2&y){const A=t.XpG(2);t.R7$(3),t.JRh(A.data().profile.status)}}function z(y,O){if(1&y&&(t.j41(0,"mat-icon"),t.EFF(1,"link"),t.k0s(),t.j41(2,"span"),t.EFF(3),t.k0s()),2&y){const A=t.XpG(2);t.R7$(3),t.JRh(A.data().profile.links)}}function H(y,O){1&y&&(t.j41(0,"mat-icon",16),t.EFF(1,"diversity_2"),t.k0s(),t.j41(2,"span",17),t.EFF(3,"Communities"),t.k0s())}function Q(y,O){1&y&&(t.j41(0,"mat-icon",16),t.EFF(1,"folder_shared"),t.k0s(),t.j41(2,"span",17),t.EFF(3,"Data"),t.k0s())}function $(y,O){if(1&y){const A=t.RV6();t.j41(0,"div",1),t.DNE(1,P,2,3,"img",2)(2,C,1,0,"img",3),t.j41(3,"div",4)(4,"h1"),t.EFF(5),t.DNE(6,d,2,1,"span"),t.k0s(),t.j41(7,"span",5),t.EFF(8),t.k0s()(),t.nrm(9,"div",6),t.j41(10,"div")(11,"button",7)(12,"mat-icon"),t.EFF(13,"more_vert"),t.k0s()(),t.j41(14,"mat-menu",null,0)(16,"button",8)(17,"mat-icon"),t.EFF(18,"chat_bubble"),t.k0s(),t.j41(19,"span"),t.EFF(20,"Message"),t.k0s()(),t.j41(21,"button",9),t.bIt("click",function(){t.eBV(A);const L=t.XpG();return t.Njj(L.addFriend(L.data().did))}),t.j41(22,"mat-icon"),t.EFF(23,"person_add"),t.k0s(),t.j41(24,"span"),t.EFF(25,"Add Friend"),t.k0s()(),t.DNE(26,N,6,2),t.nrm(27,"mat-divider"),t.j41(28,"button",9),t.bIt("click",function(){t.eBV(A);const L=t.XpG();return t.Njj(L.copyDID(L.data().did))}),t.j41(29,"mat-icon"),t.EFF(30,"content_copy"),t.k0s(),t.j41(31,"span"),t.EFF(32,"Copy DID"),t.k0s()(),t.j41(33,"button",9),t.bIt("click",function(){t.eBV(A);const L=t.XpG();return t.Njj(L.showQR(L.data().did))}),t.j41(34,"mat-icon"),t.EFF(35,"qr_code"),t.k0s(),t.j41(36,"span"),t.EFF(37,"Show QR"),t.k0s()(),t.j41(38,"button",9),t.bIt("click",function(){t.eBV(A);const L=t.XpG();return t.Njj(L.shareProfile(L.data().did))}),t.j41(39,"mat-icon"),t.EFF(40,"send"),t.k0s(),t.j41(41,"span"),t.EFF(42,"Share Profile"),t.k0s()(),t.nrm(43,"mat-divider"),t.j41(44,"button",10)(45,"mat-icon"),t.EFF(46,"block"),t.k0s(),t.j41(47,"span"),t.EFF(48,"Block"),t.k0s()()()()(),t.j41(49,"div",11)(50,"mat-tab-group")(51,"mat-tab"),t.DNE(52,w,4,0,"ng-template",12),t.j41(53,"div",13)(54,"div",14),t.DNE(55,m,4,1)(56,S,4,1)(57,b,4,1)(58,z,4,1),t.k0s(),t.j41(59,"div",15),t.EFF(60),t.k0s()()(),t.j41(61,"mat-tab"),t.DNE(62,H,4,0,"ng-template",12),t.EFF(63," Not implemented yet. "),t.k0s(),t.j41(64,"mat-tab"),t.DNE(65,Q,4,0,"ng-template",12),t.EFF(66," Not implemented yet. "),t.k0s()()()}if(2&y){const A=t.sdS(15),E=t.XpG();t.R7$(),t.vxM(E.data().avatar?1:2),t.R7$(4),t.SpI(" ",E.data().profile.name," "),t.R7$(),t.vxM(E.data().profile.title?6:-1),t.R7$(2),t.JRh(E.data().did),t.R7$(3),t.Y8G("matMenuTriggerFor",A),t.R7$(5),t.Y8G("routerLink",t.eq3(12,_,E.data().did)),t.R7$(10),t.vxM(E.data().did===E.identity.did?26:-1),t.R7$(29),t.vxM(E.data().profile.birthDate?55:-1),t.R7$(),t.vxM(E.data().profile.location?56:-1),t.R7$(),t.vxM(E.data().profile.status?57:-1),t.R7$(),t.vxM(E.data().profile.links&&E.data().profile.links.length>0?58:-1),t.R7$(2),t.SpI(" ",E.profileService.selected().bio," ")}}function X(y,O){1&y&&t.nrm(0,"mat-spinner")}let Y=(()=>{class y{ngOnDestroy(){URL.revokeObjectURL(this.avatarSrc)}constructor(A,E,L){this.dialog=A,this.sanitizer=E,this.route=L,this.profileService=(0,t.WQX)(l.p),this.identity=(0,t.WQX)(p.K),this.app=(0,t.WQX)(k.d),this.layout=(0,t.WQX)(T.Y),this.data=(0,t.vPA)(void 0),this.avatarSrc=null,this.layout.marginOn(),(0,t.QZP)(()=>{this.app.initialized()&&this.route.paramMap.subscribe(G=>{const j=G.get("id");j&&(console.log("USER ID SET!!",j),this.loadUserProfile(j))})})}ngOnInit(){return(0,i.A)(function*(){})()}loadData(){return(0,i.A)(function*(){})()}addFriend(A){var E=this;return(0,i.A)(function*(){console.log("TARGET DID 1:",E.profileService.selected().did),console.log("TARGET DID 2:",E.profileService.current().did),console.log("AUTHOR DID:",E.identity.did),console.log("INPUT DID:",A);const L=yield F.l6.create({type:"FriendshipCredential",issuer:E.identity.did,subject:A,data:null});console.log("VC:",L);const G=yield E.identity.activeAgent().identity.get({didUri:E.identity.did}),j=yield L.sign({did:G.did});console.log("VC JWT:",j);const{status:V,record:J}=yield E.identity.web5.dwn.records.create({data:{message:"I want to be your friend.",vc:j},message:{recipient:A,protocol:R.Q.protocol,protocolPath:"request",schema:R.Q.types.request.schema,dataFormat:R.Q.types.request.dataFormats[0]}});console.log("Request create status:",V);const{status:K}=yield J.send(A);E.app.openSnackBar(202!==K.code?`Friend request failed.Code: ${K.code}, Details: ${K.detail}.`:"Friend request sent")})()}loadUserProfile(A){var E=this;return(0,i.A)(function*(){const L=yield E.profileService.loadProfile(A);E.data.set(L),console.log(L),console.log("PROFILE SET!!!")})()}copyDID(A){var E=this;return(0,i.A)(function*(){try{yield navigator.clipboard.writeText(A),E.app.openSnackBar("DID copied to clipboard")}catch(L){console.error("Failed to copy: ",L)}})()}showQR(A){this.dialog.open(I,{data:{did:A}})}shareProfile(A){var E=this;return(0,i.A)(function*(){const G=document.location.href;try{yield navigator.share({title:"SondreB (Voluntaryist)",url:G,text:"Check out this profile on Ariton"}),E.app.openSnackBar("Thanks for sharing!")}catch(V){E.app.openSnackBar(`Couldn't share ${V}`)}})()}static#t=this.\u0275fac=function(E){return new(E||y)(t.rXU(f.bZ),t.rXU(v.up),t.rXU(c.nX))};static#e=this.\u0275cmp=t.VBU({type:y,selectors:[["app-profile"]],standalone:!0,features:[t.aNF],decls:2,vars:1,consts:[["menuProfile","matMenu"],[1,"profile-header"],["onerror","this.src='/avatar-placeholder.png';this.onerror='';",1,"profile-header-icon",3,"src"],["src","/avatar-placeholder.png",1,"profile-header-icon"],[1,"profile-header-text"],[1,"ellipsis"],[1,"spacer"],["mat-icon-button","",3,"matMenuTriggerFor"],["mat-menu-item","",3,"routerLink"],["mat-menu-item","",3,"click"],["disabled","true","mat-menu-item",""],[1,"profile-content"],["mat-tab-label",""],[1,"about-tab-container"],[1,"profile-items"],[1,"profile-bio"],[1,"example-tab-icon"],[1,"hide-small"]],template:function(E,L){1&E&&t.DNE(0,$,67,14)(1,X,1,0,"mat-spinner"),2&E&&t.vxM(L.data()?0:1)},dependencies:[f.hM,M.d,u.RI,u.ES,u.mq,u.T8,o.m_,o.An,e.Hl,e.iY,a.Cn,a.kk,a.fb,a.Cp,c.Wk,n.w,n.q,U.MD,B.D6,B.LG],styles:[".profile-header[_ngcontent-%COMP%]{display:flex;gap:1em;align-items:center}.profile-header-icon[_ngcontent-%COMP%]{border-radius:50%;width:128px}h1[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-weight:300}.spacer[_ngcontent-%COMP%]{flex:1 1 auto}h1[_ngcontent-%COMP%]{margin:0;padding:0}.example-tab-icon[_ngcontent-%COMP%]{margin-right:8px}.profile-content[_ngcontent-%COMP%]{margin-top:.4em}.about-tab-container[_ngcontent-%COMP%]{padding:1em}.profile-items[_ngcontent-%COMP%]{display:flex;align-items:center}.profile-items[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{display:inline-block;margin-left:.2em;margin-right:1em}.profile-bio[_ngcontent-%COMP%]{margin-top:1em}.profile-header-text[_ngcontent-%COMP%]{width:100%}@media (max-width: 959.98px){.profile-header[_ngcontent-%COMP%]{gap:.2em;flex-direction:column}}"]})}return y})()},80243:D=>{"use strict";var s={single_source_shortest_paths:function(r,i,t){var e={},n={};n[i]=0;var a,c,l,u,p,f,o=s.PriorityQueue.make();for(o.push(i,0);!o.empty();)for(l in u=(a=o.pop()).cost,p=r[c=a.value]||{})p.hasOwnProperty(l)&&(f=u+p[l],(typeof n[l]>"u"||n[l]>f)&&(n[l]=f,o.push(l,f),e[l]=c));if(typeof t<"u"&&typeof n[t]>"u"){var k=["Could not find a path from ",i," to ",t,"."].join("");throw new Error(k)}return e},extract_shortest_path_from_predecessor_list:function(r,i){for(var t=[],e=i;e;)t.push(e),e=r[e];return t.reverse(),t},find_path:function(r,i,t){var e=s.single_source_shortest_paths(r,i,t);return s.extract_shortest_path_from_predecessor_list(e,t)},PriorityQueue:{make:function(r){var e,i=s.PriorityQueue,t={};for(e in r=r||{},i)i.hasOwnProperty(e)&&(t[e]=i[e]);return t.queue=[],t.sorter=r.sorter||i.default_sorter,t},default_sorter:function(r,i){return r.cost-i.cost},push:function(r,i){this.queue.push({value:r,cost:i}),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return 0===this.queue.length}}};D.exports=s},68314:(D,s,r)=>{const t=r(72836),e=r(89460),n=r(7030),o=r(56511);function a(c,l,u,p,M){const f=[].slice.call(arguments,1),g=f.length,I="function"==typeof f[g-1];if(!I&&!t())throw new Error("Callback required as last argument");if(!I){if(g<1)throw new Error("Too few arguments provided");return 1===g?(u=l,l=p=void 0):2===g&&!l.getContext&&(p=u,u=l,l=void 0),new Promise(function(k,U){try{const B=e.create(u,p);k(c(B,l,p))}catch(B){U(B)}})}if(g<2)throw new Error("Too few arguments provided");2===g?(M=u,u=l,l=p=void 0):3===g&&(l.getContext&&typeof M>"u"?(M=p,p=void 0):(M=p,p=u,u=l,l=void 0));try{const k=e.create(u,p);M(null,c(k,l,p))}catch(k){M(k)}}s.mo=a.bind(null,n.render),a.bind(null,n.renderToDataURL),a.bind(null,function(c,l,u){return o.render(c,u)})},72836:D=>{D.exports=function(){return"function"==typeof Promise&&Promise.prototype&&Promise.prototype.then}},96214:(D,s,r)=>{const i=r(19089).getSymbolSize;s.getRowColCoords=function(e){if(1===e)return[];const n=Math.floor(e/7)+2,o=i(e),a=145===o?26:2*Math.ceil((o-13)/(2*n-2)),c=[o-7];for(let l=1;l<n-1;l++)c[l]=c[l-1]-a;return c.push(6),c.reverse()},s.getPositions=function(e){const n=[],o=s.getRowColCoords(e),a=o.length;for(let c=0;c<a;c++)for(let l=0;l<a;l++)0===c&&0===l||0===c&&l===a-1||c===a-1&&0===l||n.push([o[c],o[l]]);return n}},1018:(D,s,r)=>{const i=r(91677),t=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function e(n){this.mode=i.ALPHANUMERIC,this.data=n}e.getBitsLength=function(o){return 11*Math.floor(o/2)+o%2*6},e.prototype.getLength=function(){return this.data.length},e.prototype.getBitsLength=function(){return e.getBitsLength(this.data.length)},e.prototype.write=function(o){let a;for(a=0;a+2<=this.data.length;a+=2){let c=45*t.indexOf(this.data[a]);c+=t.indexOf(this.data[a+1]),o.put(c,11)}this.data.length%2&&o.put(t.indexOf(this.data[a]),6)},D.exports=e},84662:D=>{function s(){this.buffer=[],this.length=0}s.prototype={get:function(r){const i=Math.floor(r/8);return 1==(this.buffer[i]>>>7-r%8&1)},put:function(r,i){for(let t=0;t<i;t++)this.putBit(1==(r>>>i-t-1&1))},getLengthInBits:function(){return this.length},putBit:function(r){const i=Math.floor(this.length/8);this.buffer.length<=i&&this.buffer.push(0),r&&(this.buffer[i]|=128>>>this.length%8),this.length++}},D.exports=s},35941:D=>{function s(r){if(!r||r<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=r,this.data=new Uint8Array(r*r),this.reservedBit=new Uint8Array(r*r)}s.prototype.set=function(r,i,t,e){const n=r*this.size+i;this.data[n]=t,e&&(this.reservedBit[n]=!0)},s.prototype.get=function(r,i){return this.data[r*this.size+i]},s.prototype.xor=function(r,i,t){this.data[r*this.size+i]^=t},s.prototype.isReserved=function(r,i){return this.reservedBit[r*this.size+i]},D.exports=s},54969:(D,s,r)=>{const i=r(91677);function t(e){this.mode=i.BYTE,this.data="string"==typeof e?(new TextEncoder).encode(e):new Uint8Array(e)}t.getBitsLength=function(n){return 8*n},t.prototype.getLength=function(){return this.data.length},t.prototype.getBitsLength=function(){return t.getBitsLength(this.data.length)},t.prototype.write=function(e){for(let n=0,o=this.data.length;n<o;n++)e.put(this.data[n],8)},D.exports=t},23677:(D,s,r)=>{const i=r(47424),t=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],e=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];s.getBlocksCount=function(o,a){switch(a){case i.L:return t[4*(o-1)+0];case i.M:return t[4*(o-1)+1];case i.Q:return t[4*(o-1)+2];case i.H:return t[4*(o-1)+3];default:return}},s.getTotalCodewordsCount=function(o,a){switch(a){case i.L:return e[4*(o-1)+0];case i.M:return e[4*(o-1)+1];case i.Q:return e[4*(o-1)+2];case i.H:return e[4*(o-1)+3];default:return}}},47424:(D,s)=>{s.L={bit:1},s.M={bit:0},s.Q={bit:3},s.H={bit:2},s.isValid=function(t){return t&&typeof t.bit<"u"&&t.bit>=0&&t.bit<4},s.from=function(t,e){if(s.isValid(t))return t;try{return function r(i){if("string"!=typeof i)throw new Error("Param is not a string");switch(i.toLowerCase()){case"l":case"low":return s.L;case"m":case"medium":return s.M;case"q":case"quartile":return s.Q;case"h":case"high":return s.H;default:throw new Error("Unknown EC Level: "+i)}}(t)}catch{return e}}},76269:(D,s,r)=>{const i=r(19089).getSymbolSize;s.getPositions=function(n){const o=i(n);return[[0,0],[o-7,0],[0,o-7]]}},26254:(D,s,r)=>{const i=r(19089),n=i.getBCHDigit(1335);s.getEncodedBits=function(a,c){const l=a.bit<<3|c;let u=l<<10;for(;i.getBCHDigit(u)-n>=0;)u^=1335<<i.getBCHDigit(u)-n;return 21522^(l<<10|u)}},66686:(D,s)=>{const r=new Uint8Array(512),i=new Uint8Array(256);(function(){let e=1;for(let n=0;n<255;n++)r[n]=e,i[e]=n,e<<=1,256&e&&(e^=285);for(let n=255;n<512;n++)r[n]=r[n-255]})(),s.log=function(e){if(e<1)throw new Error("log("+e+")");return i[e]},s.exp=function(e){return r[e]},s.mul=function(e,n){return 0===e||0===n?0:r[i[e]+i[n]]}},83264:(D,s,r)=>{const i=r(91677),t=r(19089);function e(n){this.mode=i.KANJI,this.data=n}e.getBitsLength=function(o){return 13*o},e.prototype.getLength=function(){return this.data.length},e.prototype.getBitsLength=function(){return e.getBitsLength(this.data.length)},e.prototype.write=function(n){let o;for(o=0;o<this.data.length;o++){let a=t.toSJIS(this.data[o]);if(a>=33088&&a<=40956)a-=33088;else{if(!(a>=57408&&a<=60351))throw new Error("Invalid SJIS character: "+this.data[o]+"\nMake sure your charset is UTF-8");a-=49472}a=192*(a>>>8&255)+(255&a),n.put(a,13)}},D.exports=e},3361:(D,s)=>{s.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};function i(t,e,n){switch(t){case s.Patterns.PATTERN000:return(e+n)%2==0;case s.Patterns.PATTERN001:return e%2==0;case s.Patterns.PATTERN010:return n%3==0;case s.Patterns.PATTERN011:return(e+n)%3==0;case s.Patterns.PATTERN100:return(Math.floor(e/2)+Math.floor(n/3))%2==0;case s.Patterns.PATTERN101:return e*n%2+e*n%3==0;case s.Patterns.PATTERN110:return(e*n%2+e*n%3)%2==0;case s.Patterns.PATTERN111:return(e*n%3+(e+n)%2)%2==0;default:throw new Error("bad maskPattern:"+t)}}s.isValid=function(e){return null!=e&&""!==e&&!isNaN(e)&&e>=0&&e<=7},s.from=function(e){return s.isValid(e)?parseInt(e,10):void 0},s.getPenaltyN1=function(e){const n=e.size;let o=0,a=0,c=0,l=null,u=null;for(let p=0;p<n;p++){a=c=0,l=u=null;for(let M=0;M<n;M++){let f=e.get(p,M);f===l?a++:(a>=5&&(o+=a-5+3),l=f,a=1),f=e.get(M,p),f===u?c++:(c>=5&&(o+=c-5+3),u=f,c=1)}a>=5&&(o+=a-5+3),c>=5&&(o+=c-5+3)}return o},s.getPenaltyN2=function(e){const n=e.size;let o=0;for(let a=0;a<n-1;a++)for(let c=0;c<n-1;c++){const l=e.get(a,c)+e.get(a,c+1)+e.get(a+1,c)+e.get(a+1,c+1);(4===l||0===l)&&o++}return 3*o},s.getPenaltyN3=function(e){const n=e.size;let o=0,a=0,c=0;for(let l=0;l<n;l++){a=c=0;for(let u=0;u<n;u++)a=a<<1&2047|e.get(l,u),u>=10&&(1488===a||93===a)&&o++,c=c<<1&2047|e.get(u,l),u>=10&&(1488===c||93===c)&&o++}return 40*o},s.getPenaltyN4=function(e){let n=0;const o=e.data.length;for(let c=0;c<o;c++)n+=e.data[c];return 10*Math.abs(Math.ceil(100*n/o/5)-10)},s.applyMask=function(e,n){const o=n.size;for(let a=0;a<o;a++)for(let c=0;c<o;c++)n.isReserved(c,a)||n.xor(c,a,i(e,c,a))},s.getBestMask=function(e,n){const o=Object.keys(s.Patterns).length;let a=0,c=1/0;for(let l=0;l<o;l++){n(l),s.applyMask(l,e);const u=s.getPenaltyN1(e)+s.getPenaltyN2(e)+s.getPenaltyN3(e)+s.getPenaltyN4(e);s.applyMask(l,e),u<c&&(c=u,a=l)}return a}},91677:(D,s,r)=>{const i=r(80377),t=r(99359);s.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},s.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},s.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},s.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},s.MIXED={bit:-1},s.getCharCountIndicator=function(o,a){if(!o.ccBits)throw new Error("Invalid mode: "+o);if(!i.isValid(a))throw new Error("Invalid version: "+a);return a>=1&&a<10?o.ccBits[0]:a<27?o.ccBits[1]:o.ccBits[2]},s.getBestModeForData=function(o){return t.testNumeric(o)?s.NUMERIC:t.testAlphanumeric(o)?s.ALPHANUMERIC:t.testKanji(o)?s.KANJI:s.BYTE},s.toString=function(o){if(o&&o.id)return o.id;throw new Error("Invalid mode")},s.isValid=function(o){return o&&o.bit&&o.ccBits},s.from=function(o,a){if(s.isValid(o))return o;try{return function e(n){if("string"!=typeof n)throw new Error("Param is not a string");switch(n.toLowerCase()){case"numeric":return s.NUMERIC;case"alphanumeric":return s.ALPHANUMERIC;case"kanji":return s.KANJI;case"byte":return s.BYTE;default:throw new Error("Unknown mode: "+n)}}(o)}catch{return a}}},96628:(D,s,r)=>{const i=r(91677);function t(e){this.mode=i.NUMERIC,this.data=e.toString()}t.getBitsLength=function(n){return 10*Math.floor(n/3)+(n%3?n%3*3+1:0)},t.prototype.getLength=function(){return this.data.length},t.prototype.getBitsLength=function(){return t.getBitsLength(this.data.length)},t.prototype.write=function(n){let o,a,c;for(o=0;o+3<=this.data.length;o+=3)a=this.data.substr(o,3),c=parseInt(a,10),n.put(c,10);const l=this.data.length-o;l>0&&(a=this.data.substr(o),c=parseInt(a,10),n.put(c,3*l+1))},D.exports=t},81744:(D,s,r)=>{const i=r(66686);s.mul=function(e,n){const o=new Uint8Array(e.length+n.length-1);for(let a=0;a<e.length;a++)for(let c=0;c<n.length;c++)o[a+c]^=i.mul(e[a],n[c]);return o},s.mod=function(e,n){let o=new Uint8Array(e);for(;o.length-n.length>=0;){const a=o[0];for(let l=0;l<n.length;l++)o[l]^=i.mul(n[l],a);let c=0;for(;c<o.length&&0===o[c];)c++;o=o.slice(c)}return o},s.generateECPolynomial=function(e){let n=new Uint8Array([1]);for(let o=0;o<e;o++)n=s.mul(n,new Uint8Array([1,i.exp(o)]));return n}},89460:(D,s,r)=>{const i=r(19089),t=r(47424),e=r(84662),n=r(35941),o=r(96214),a=r(76269),c=r(3361),l=r(23677),u=r(86289),p=r(91252),M=r(26254),f=r(91677),g=r(22868);function R(h,P,C){const d=h.size,N=M.getEncodedBits(P,C);let w,m;for(w=0;w<15;w++)m=1==(N>>w&1),h.set(w<6?w:w<8?w+1:d-15+w,8,m,!0),h.set(8,w<8?d-w-1:w<9?15-w-1+1:15-w-1,m,!0);h.set(d-8,8,1,!0)}function _(h,P,C,d){let N;if(Array.isArray(h))N=g.fromArray(h);else{if("string"!=typeof h)throw new Error("Invalid data");{let z=P;if(!z){const H=g.rawSplit(h);z=p.getBestVersionForData(H,C)}N=g.fromString(h,z||40)}}const w=p.getBestVersionForData(N,C);if(!w)throw new Error("The amount of data is too big to be stored in a QR Code");if(P){if(P<w)throw new Error("\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: "+w+".\n")}else P=w;const m=function T(h,P,C){const d=new e;C.forEach(function(b){d.put(b.mode.bit,4),d.put(b.getLength(),f.getCharCountIndicator(b.mode,h)),b.write(d)});const m=8*(i.getSymbolTotalCodewords(h)-l.getTotalCodewordsCount(h,P));for(d.getLengthInBits()+4<=m&&d.put(0,4);d.getLengthInBits()%8!=0;)d.putBit(0);const S=(m-d.getLengthInBits())/8;for(let b=0;b<S;b++)d.put(b%2?17:236,8);return function v(h,P,C){const d=i.getSymbolTotalCodewords(P),w=d-l.getTotalCodewordsCount(P,C),m=l.getBlocksCount(P,C),b=m-d%m,z=Math.floor(d/m),H=Math.floor(w/m),Q=H+1,$=z-H,X=new u($);let Y=0;const y=new Array(m),O=new Array(m);let A=0;const E=new Uint8Array(h.buffer);for(let J=0;J<m;J++){const K=J<b?H:Q;y[J]=E.slice(Y,Y+K),O[J]=X.encode(y[J]),Y+=K,A=Math.max(A,K)}const L=new Uint8Array(d);let j,V,G=0;for(j=0;j<A;j++)for(V=0;V<m;V++)j<y[V].length&&(L[G++]=y[V][j]);for(j=0;j<$;j++)for(V=0;V<m;V++)L[G++]=O[V][j];return L}(d,h,P)}(P,C,N),S=i.getSymbolSize(P),b=new n(S);return function I(h,P){const C=h.size,d=a.getPositions(P);for(let N=0;N<d.length;N++){const w=d[N][0],m=d[N][1];for(let S=-1;S<=7;S++)if(!(w+S<=-1||C<=w+S))for(let b=-1;b<=7;b++)m+b<=-1||C<=m+b||h.set(w+S,m+b,S>=0&&S<=6&&(0===b||6===b)||b>=0&&b<=6&&(0===S||6===S)||S>=2&&S<=4&&b>=2&&b<=4,!0)}}(b,P),function k(h){const P=h.size;for(let C=8;C<P-8;C++){const d=C%2==0;h.set(C,6,d,!0),h.set(6,C,d,!0)}}(b),function U(h,P){const C=o.getPositions(P);for(let d=0;d<C.length;d++){const N=C[d][0],w=C[d][1];for(let m=-2;m<=2;m++)for(let S=-2;S<=2;S++)h.set(N+m,w+S,-2===m||2===m||-2===S||2===S||0===m&&0===S,!0)}}(b,P),R(b,C,0),P>=7&&function B(h,P){const C=h.size,d=p.getEncodedBits(P);let N,w,m;for(let S=0;S<18;S++)N=Math.floor(S/3),w=S%3+C-8-3,m=1==(d>>S&1),h.set(N,w,m,!0),h.set(w,N,m,!0)}(b,P),function F(h,P){const C=h.size;let d=-1,N=C-1,w=7,m=0;for(let S=C-1;S>0;S-=2)for(6===S&&S--;;){for(let b=0;b<2;b++)if(!h.isReserved(N,S-b)){let z=!1;m<P.length&&(z=1==(P[m]>>>w&1)),h.set(N,S-b,z),w--,-1===w&&(m++,w=7)}if(N+=d,N<0||C<=N){N-=d,d=-d;break}}}(b,m),isNaN(d)&&(d=c.getBestMask(b,R.bind(null,b,C))),c.applyMask(d,b),R(b,C,d),{modules:b,version:P,errorCorrectionLevel:C,maskPattern:d,segments:N}}s.create=function(P,C){if(typeof P>"u"||""===P)throw new Error("No input text");let N,w,d=t.M;return typeof C<"u"&&(d=t.from(C.errorCorrectionLevel,t.M),N=p.from(C.version),w=c.from(C.maskPattern),C.toSJISFunc&&i.setToSJISFunction(C.toSJISFunc)),_(P,N,d,w)}},86289:(D,s,r)=>{const i=r(81744);function t(e){this.genPoly=void 0,this.degree=e,this.degree&&this.initialize(this.degree)}t.prototype.initialize=function(n){this.degree=n,this.genPoly=i.generateECPolynomial(this.degree)},t.prototype.encode=function(n){if(!this.genPoly)throw new Error("Encoder not initialized");const o=new Uint8Array(n.length+this.degree);o.set(n);const a=i.mod(o,this.genPoly),c=this.degree-a.length;if(c>0){const l=new Uint8Array(this.degree);return l.set(a,c),l}return a},D.exports=t},99359:(D,s)=>{const r="[0-9]+";let t="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";t=t.replace(/u/g,"\\u");const e="(?:(?![A-Z0-9 $%*+\\-./:]|"+t+")(?:.|[\r\n]))+";s.KANJI=new RegExp(t,"g"),s.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),s.BYTE=new RegExp(e,"g"),s.NUMERIC=new RegExp(r,"g"),s.ALPHANUMERIC=new RegExp("[A-Z $%*+\\-./:]+","g");const n=new RegExp("^"+t+"$"),o=new RegExp("^"+r+"$"),a=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");s.testKanji=function(l){return n.test(l)},s.testNumeric=function(l){return o.test(l)},s.testAlphanumeric=function(l){return a.test(l)}},22868:(D,s,r)=>{const i=r(91677),t=r(96628),e=r(1018),n=r(54969),o=r(83264),a=r(99359),c=r(19089),l=r(80243);function u(B){return unescape(encodeURIComponent(B)).length}function p(B,R,F){const T=[];let v;for(;null!==(v=B.exec(F));)T.push({data:v[0],index:v.index,mode:R,length:v[0].length});return T}function M(B){const R=p(a.NUMERIC,i.NUMERIC,B),F=p(a.ALPHANUMERIC,i.ALPHANUMERIC,B);let T,v;return c.isKanjiModeEnabled()?(T=p(a.BYTE,i.BYTE,B),v=p(a.KANJI,i.KANJI,B)):(T=p(a.BYTE_KANJI,i.BYTE,B),v=[]),R.concat(F,T,v).sort(function(h,P){return h.index-P.index}).map(function(h){return{data:h.data,mode:h.mode,length:h.length}})}function f(B,R){switch(R){case i.NUMERIC:return t.getBitsLength(B);case i.ALPHANUMERIC:return e.getBitsLength(B);case i.KANJI:return o.getBitsLength(B);case i.BYTE:return n.getBitsLength(B)}}function U(B,R){let F;const T=i.getBestModeForData(B);if(F=i.from(R,T),F!==i.BYTE&&F.bit<T.bit)throw new Error('"'+B+'" cannot be encoded with mode '+i.toString(F)+".\n Suggested mode is: "+i.toString(T));switch(F===i.KANJI&&!c.isKanjiModeEnabled()&&(F=i.BYTE),F){case i.NUMERIC:return new t(B);case i.ALPHANUMERIC:return new e(B);case i.KANJI:return new o(B);case i.BYTE:return new n(B)}}s.fromArray=function(R){return R.reduce(function(F,T){return"string"==typeof T?F.push(U(T,null)):T.data&&F.push(U(T.data,T.mode)),F},[])},s.fromString=function(R,F){const v=function I(B){const R=[];for(let F=0;F<B.length;F++){const T=B[F];switch(T.mode){case i.NUMERIC:R.push([T,{data:T.data,mode:i.ALPHANUMERIC,length:T.length},{data:T.data,mode:i.BYTE,length:T.length}]);break;case i.ALPHANUMERIC:R.push([T,{data:T.data,mode:i.BYTE,length:T.length}]);break;case i.KANJI:R.push([T,{data:T.data,mode:i.BYTE,length:u(T.data)}]);break;case i.BYTE:R.push([{data:T.data,mode:i.BYTE,length:u(T.data)}])}}return R}(M(R,c.isKanjiModeEnabled())),_=function k(B,R){const F={},T={start:{}};let v=["start"];for(let _=0;_<B.length;_++){const h=B[_],P=[];for(let C=0;C<h.length;C++){const d=h[C],N=""+_+C;P.push(N),F[N]={node:d,lastCount:0},T[N]={};for(let w=0;w<v.length;w++){const m=v[w];F[m]&&F[m].node.mode===d.mode?(T[m][N]=f(F[m].lastCount+d.length,d.mode)-f(F[m].lastCount,d.mode),F[m].lastCount+=d.length):(F[m]&&(F[m].lastCount=d.length),T[m][N]=f(d.length,d.mode)+4+i.getCharCountIndicator(d.mode,R))}}v=P}for(let _=0;_<v.length;_++)T[v[_]].end=0;return{map:T,table:F}}(v,F),h=l.find_path(_.map,"start","end"),P=[];for(let C=1;C<h.length-1;C++)P.push(_.table[h[C]].node);return s.fromArray(function g(B){return B.reduce(function(R,F){const T=R.length-1>=0?R[R.length-1]:null;return T&&T.mode===F.mode?(R[R.length-1].data+=F.data,R):(R.push(F),R)},[])}(P))},s.rawSplit=function(R){return s.fromArray(M(R,c.isKanjiModeEnabled()))}},19089:(D,s)=>{let r;const i=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];s.getSymbolSize=function(e){if(!e)throw new Error('"version" cannot be null or undefined');if(e<1||e>40)throw new Error('"version" should be in range from 1 to 40');return 4*e+17},s.getSymbolTotalCodewords=function(e){return i[e]},s.getBCHDigit=function(t){let e=0;for(;0!==t;)e++,t>>>=1;return e},s.setToSJISFunction=function(e){if("function"!=typeof e)throw new Error('"toSJISFunc" is not a valid function.');r=e},s.isKanjiModeEnabled=function(){return typeof r<"u"},s.toSJIS=function(e){return r(e)}},80377:(D,s)=>{s.isValid=function(i){return!isNaN(i)&&i>=1&&i<=40}},91252:(D,s,r)=>{const i=r(19089),t=r(23677),e=r(47424),n=r(91677),o=r(80377),c=i.getBCHDigit(7973);function u(f,g){return n.getCharCountIndicator(f,g)+4}function p(f,g){let I=0;return f.forEach(function(k){const U=u(k.mode,g);I+=U+k.getBitsLength()}),I}s.from=function(g,I){return o.isValid(g)?parseInt(g,10):I},s.getCapacity=function(g,I,k){if(!o.isValid(g))throw new Error("Invalid QR Code version");typeof k>"u"&&(k=n.BYTE);const R=8*(i.getSymbolTotalCodewords(g)-t.getTotalCodewordsCount(g,I));if(k===n.MIXED)return R;const F=R-u(k,g);switch(k){case n.NUMERIC:return Math.floor(F/10*3);case n.ALPHANUMERIC:return Math.floor(F/11*2);case n.KANJI:return Math.floor(F/13);default:return Math.floor(F/8)}},s.getBestVersionForData=function(g,I){let k;const U=e.from(I,e.M);if(Array.isArray(g)){if(g.length>1)return function M(f,g){for(let I=1;I<=40;I++)if(p(f,I)<=s.getCapacity(I,g,n.MIXED))return I}(g,U);if(0===g.length)return 1;k=g[0]}else k=g;return function l(f,g,I){for(let k=1;k<=40;k++)if(g<=s.getCapacity(k,I,f))return k}(k.mode,k.getLength(),U)},s.getEncodedBits=function(g){if(!o.isValid(g)||g<7)throw new Error("Invalid QR Code version");let I=g<<12;for(;i.getBCHDigit(I)-c>=0;)I^=7973<<i.getBCHDigit(I)-c;return g<<12|I}},7030:(D,s,r)=>{const i=r(47077);s.render=function(o,a,c){let l=c,u=a;typeof l>"u"&&(!a||!a.getContext)&&(l=a,a=void 0),a||(u=function e(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}()),l=i.getOptions(l);const p=i.getImageWidth(o.modules.size,l),M=u.getContext("2d"),f=M.createImageData(p,p);return i.qrToImageData(f.data,o,l),function t(n,o,a){n.clearRect(0,0,o.width,o.height),o.style||(o.style={}),o.height=a,o.width=a,o.style.height=a+"px",o.style.width=a+"px"}(M,u,p),M.putImageData(f,0,0),u},s.renderToDataURL=function(o,a,c){let l=c;return typeof l>"u"&&(!a||!a.getContext)&&(l=a,a=void 0),l||(l={}),s.render(o,a,l).toDataURL(l.type||"image/png",(l.rendererOpts||{}).quality)}},56511:(D,s,r)=>{const i=r(47077);function t(o,a){const c=o.a/255,l=a+'="'+o.hex+'"';return c<1?l+" "+a+'-opacity="'+c.toFixed(2).slice(1)+'"':l}function e(o,a,c){let l=o+a;return typeof c<"u"&&(l+=" "+c),l}s.render=function(a,c,l){const u=i.getOptions(c),p=a.modules.size,M=a.modules.data,f=p+2*u.margin,g=u.color.light.a?"<path "+t(u.color.light,"fill")+' d="M0 0h'+f+"v"+f+'H0z"/>':"",I="<path "+t(u.color.dark,"stroke")+' d="'+function n(o,a,c){let l="",u=0,p=!1,M=0;for(let f=0;f<o.length;f++){const g=Math.floor(f%a),I=Math.floor(f/a);!g&&!p&&(p=!0),o[f]?(M++,f>0&&g>0&&o[f-1]||(l+=p?e("M",g+c,.5+I+c):e("m",u,0),u=0,p=!1),g+1<a&&o[f+1]||(l+=e("h",M),M=0)):u++}return l}(M,p,u.margin)+'"/>',B='<svg xmlns="http://www.w3.org/2000/svg" '+(u.width?'width="'+u.width+'" height="'+u.width+'" ':"")+'viewBox="0 0 '+f+" "+f+'" shape-rendering="crispEdges">'+g+I+"</svg>\n";return"function"==typeof l&&l(null,B),B}},47077:(D,s)=>{function r(i){if("number"==typeof i&&(i=i.toString()),"string"!=typeof i)throw new Error("Color should be defined as hex string");let t=i.slice().replace("#","").split("");if(t.length<3||5===t.length||t.length>8)throw new Error("Invalid hex color: "+i);(3===t.length||4===t.length)&&(t=Array.prototype.concat.apply([],t.map(function(n){return[n,n]}))),6===t.length&&t.push("F","F");const e=parseInt(t.join(""),16);return{r:e>>24&255,g:e>>16&255,b:e>>8&255,a:255&e,hex:"#"+t.slice(0,6).join("")}}s.getOptions=function(t){t||(t={}),t.color||(t.color={});const n=t.width&&t.width>=21?t.width:void 0;return{width:n,scale:n?4:t.scale||4,margin:typeof t.margin>"u"||null===t.margin||t.margin<0?4:t.margin,color:{dark:r(t.color.dark||"#000000ff"),light:r(t.color.light||"#ffffffff")},type:t.type,rendererOpts:t.rendererOpts||{}}},s.getScale=function(t,e){return e.width&&e.width>=t+2*e.margin?e.width/(t+2*e.margin):e.scale},s.getImageWidth=function(t,e){const n=s.getScale(t,e);return Math.floor((t+2*e.margin)*n)},s.qrToImageData=function(t,e,n){const o=e.modules.size,a=e.modules.data,c=s.getScale(o,n),l=Math.floor((o+2*n.margin)*c),u=n.margin*c,p=[n.color.light,n.color.dark];for(let M=0;M<l;M++)for(let f=0;f<l;f++){let g=4*(M*l+f),I=n.color.light;M>=u&&f>=u&&M<l-u&&f<l-u&&(I=p[a[Math.floor((M-u)/c)*o+Math.floor((f-u)/c)]?1:0]),t[g++]=I.r,t[g++]=I.g,t[g++]=I.b,t[g]=I.a}}}}]);