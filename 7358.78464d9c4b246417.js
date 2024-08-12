"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[7358],{64109:(V,F,_)=>{_.d(F,{Dc:()=>j,Hy:()=>X,NL:()=>c,Sz:()=>m,XW:()=>P,a$:()=>M,aI:()=>K,kZ:()=>I,s3:()=>S,xn:()=>u});var f=_(45024),r=_(74402),E=_(21413),N=_(84412),x=_(7673),C=(_(96697),_(5964),_(56977)),b=_(96354),A=_(23294),s=_(93953),B=_(28203);class T{constructor(){this.expansionModel=new f.CB(!0)}toggle(o){this.expansionModel.toggle(this._trackByValue(o))}expand(o){this.expansionModel.select(this._trackByValue(o))}collapse(o){this.expansionModel.deselect(this._trackByValue(o))}isExpanded(o){return this.expansionModel.isSelected(this._trackByValue(o))}toggleDescendants(o){this.expansionModel.isSelected(this._trackByValue(o))?this.collapseDescendants(o):this.expandDescendants(o)}collapseAll(){this.expansionModel.clear()}expandDescendants(o){let e=[o];e.push(...this.getDescendants(o)),this.expansionModel.select(...e.map(t=>this._trackByValue(t)))}collapseDescendants(o){let e=[o];e.push(...this.getDescendants(o)),this.expansionModel.deselect(...e.map(t=>this._trackByValue(t)))}_trackByValue(o){return this.trackBy?this.trackBy(o):o}}class P extends T{constructor(o,e,t){super(),this.getLevel=o,this.isExpandable=e,this.options=t,this.options&&(this.trackBy=this.options.trackBy)}getDescendants(o){const t=[];for(let a=this.dataNodes.indexOf(o)+1;a<this.dataNodes.length&&this.getLevel(o)<this.getLevel(this.dataNodes[a]);a++)t.push(this.dataNodes[a]);return t}expandAll(){this.expansionModel.select(...this.dataNodes.map(o=>this._trackByValue(o)))}}const I=new s.nKC("CDK_TREE_NODE_OUTLET_NODE");let M=(()=>{class i{constructor(e,t){this.viewContainer=e,this._node=t}static#e=this.\u0275fac=function(t){return new(t||i)(s.rXU(s.c1b),s.rXU(I,8))};static#t=this.\u0275dir=s.FsC({type:i,selectors:[["","cdkTreeNodeOutlet",""]],standalone:!0})}return i})();class w{constructor(o){this.$implicit=o}}let m=(()=>{class i{constructor(e){this.template=e}static#e=this.\u0275fac=function(t){return new(t||i)(s.rXU(s.C4Q))};static#t=this.\u0275dir=s.FsC({type:i,selectors:[["","cdkTreeNodeDef",""]],inputs:{when:[0,"cdkTreeNodeDefWhen","when"]},standalone:!0})}return i})(),c=(()=>{class i{get dataSource(){return this._dataSource}set dataSource(e){this._dataSource!==e&&this._switchDataSource(e)}constructor(e,t){this._differs=e,this._changeDetectorRef=t,this._onDestroy=new E.B,this._levels=new Map,this.viewChange=new N.t({start:0,end:Number.MAX_VALUE})}ngOnInit(){this._dataDiffer=this._differs.find([]).create(this.trackBy)}ngOnDestroy(){this._nodeOutlet.viewContainer.clear(),this.viewChange.complete(),this._onDestroy.next(),this._onDestroy.complete(),this._dataSource&&"function"==typeof this._dataSource.disconnect&&this.dataSource.disconnect(this),this._dataSubscription&&(this._dataSubscription.unsubscribe(),this._dataSubscription=null)}ngAfterContentChecked(){const e=this._nodeDefs.filter(t=>!t.when);this._defaultNodeDef=e[0],this.dataSource&&this._nodeDefs&&!this._dataSubscription&&this._observeRenderChanges()}_switchDataSource(e){this._dataSource&&"function"==typeof this._dataSource.disconnect&&this.dataSource.disconnect(this),this._dataSubscription&&(this._dataSubscription.unsubscribe(),this._dataSubscription=null),e||this._nodeOutlet.viewContainer.clear(),this._dataSource=e,this._nodeDefs&&this._observeRenderChanges()}_observeRenderChanges(){let e;(0,f.y4)(this._dataSource)?e=this._dataSource.connect(this):(0,r.A)(this._dataSource)?e=this._dataSource:Array.isArray(this._dataSource)&&(e=(0,x.of)(this._dataSource)),e&&(this._dataSubscription=e.pipe((0,C.Q)(this._onDestroy)).subscribe(t=>this.renderNodeChanges(t)))}renderNodeChanges(e,t=this._dataDiffer,a=this._nodeOutlet.viewContainer,h){const p=t.diff(e);p&&(p.forEachOperation((y,R,k)=>{if(null==y.previousIndex)this.insertNode(e[k],k,a,h);else if(null==k)a.remove(R),this._levels.delete(y.item);else{const Q=a.get(R);a.move(Q,k)}}),this._changeDetectorRef.detectChanges())}_getNodeDef(e,t){return 1===this._nodeDefs.length?this._nodeDefs.first:this._nodeDefs.find(h=>h.when&&h.when(t,e))||this._defaultNodeDef}insertNode(e,t,a,h){const p=this._getNodeDef(e,t),y=new w(e);y.level=this.treeControl.getLevel?this.treeControl.getLevel(e):typeof h<"u"&&this._levels.has(h)?this._levels.get(h)+1:0,this._levels.set(e,y.level),(a||this._nodeOutlet.viewContainer).createEmbeddedView(p.template,y,t),u.mostRecentTreeNode&&(u.mostRecentTreeNode.data=e)}static#e=this.\u0275fac=function(t){return new(t||i)(s.rXU(s._q3),s.rXU(s.gRc))};static#t=this.\u0275cmp=s.VBU({type:i,selectors:[["cdk-tree"]],contentQueries:function(t,a,h){if(1&t&&s.wni(h,m,5),2&t){let p;s.mGM(p=s.lsd())&&(a._nodeDefs=p)}},viewQuery:function(t,a){if(1&t&&s.GBs(M,7),2&t){let h;s.mGM(h=s.lsd())&&(a._nodeOutlet=h.first)}},hostAttrs:["role","tree",1,"cdk-tree"],inputs:{dataSource:"dataSource",treeControl:"treeControl",trackBy:"trackBy"},exportAs:["cdkTree"],standalone:!0,features:[s.aNF],decls:1,vars:0,consts:[["cdkTreeNodeOutlet",""]],template:function(t,a){1&t&&s.eu8(0,0)},dependencies:[M],encapsulation:2})}return i})(),u=(()=>{class i{get role(){return"treeitem"}set role(e){this._elementRef.nativeElement.setAttribute("role",e)}static#e=this.mostRecentTreeNode=null;get data(){return this._data}set data(e){e!==this._data&&(this._data=e,this._setRoleFromData(),this._dataChanges.next())}get isExpanded(){return this._tree.treeControl.isExpanded(this._data)}get level(){return this._tree.treeControl.getLevel?this._tree.treeControl.getLevel(this._data):this._parentNodeAriaLevel}constructor(e,t){this._elementRef=e,this._tree=t,this._destroyed=new E.B,this._dataChanges=new E.B,this._changeDetectorRef=(0,s.WQX)(s.gRc),i.mostRecentTreeNode=this,this.role="treeitem"}ngOnInit(){this._parentNodeAriaLevel=function v(i){let o=i.parentElement;for(;o&&!D(o);)o=o.parentElement;return o?o.classList.contains("cdk-nested-tree-node")?(0,s.Udg)(o.getAttribute("aria-level")):0:-1}(this._elementRef.nativeElement),this._elementRef.nativeElement.setAttribute("aria-level",`${this.level+1}`),this._tree.treeControl.expansionModel.changed.pipe((0,b.T)(()=>this.isExpanded),(0,A.F)()).subscribe(()=>{this._changeDetectorRef.markForCheck()})}ngOnDestroy(){i.mostRecentTreeNode===this&&(i.mostRecentTreeNode=null),this._dataChanges.complete(),this._destroyed.next(),this._destroyed.complete()}focus(){this._elementRef.nativeElement.focus()}_setRoleFromData(){this.role="treeitem"}static#t=this.\u0275fac=function(t){return new(t||i)(s.rXU(s.aKT),s.rXU(c))};static#s=this.\u0275dir=s.FsC({type:i,selectors:[["cdk-tree-node"]],hostAttrs:[1,"cdk-tree-node"],hostVars:1,hostBindings:function(t,a){2&t&&s.BMQ("aria-expanded",a.isExpanded)},inputs:{role:"role"},exportAs:["cdkTreeNode"],standalone:!0})}return i})();function D(i){const o=i.classList;return!(!o?.contains("cdk-nested-tree-node")&&!o?.contains("cdk-tree"))}let S=(()=>{class i extends u{constructor(e,t,a){super(e,t),this._differs=a}ngAfterContentInit(){this._dataDiffer=this._differs.find([]).create(this._tree.trackBy);const e=this._tree.treeControl.getChildren(this.data);Array.isArray(e)?this.updateChildrenNodes(e):(0,r.A)(e)&&e.pipe((0,C.Q)(this._destroyed)).subscribe(t=>this.updateChildrenNodes(t)),this.nodeOutlet.changes.pipe((0,C.Q)(this._destroyed)).subscribe(()=>this.updateChildrenNodes())}ngOnInit(){super.ngOnInit()}ngOnDestroy(){this._clear(),super.ngOnDestroy()}updateChildrenNodes(e){const t=this._getNodeOutlet();e&&(this._children=e),t&&this._children?this._tree.renderNodeChanges(this._children,this._dataDiffer,t.viewContainer,this._data):this._dataDiffer.diff([])}_clear(){const e=this._getNodeOutlet();e&&(e.viewContainer.clear(),this._dataDiffer.diff([]))}_getNodeOutlet(){const e=this.nodeOutlet;return e&&e.find(t=>!t._node||t._node===this)}static#e=this.\u0275fac=function(t){return new(t||i)(s.rXU(s.aKT),s.rXU(c),s.rXU(s._q3))};static#t=this.\u0275dir=s.FsC({type:i,selectors:[["cdk-nested-tree-node"]],contentQueries:function(t,a,h){if(1&t&&s.wni(h,M,5),2&t){let p;s.mGM(p=s.lsd())&&(a.nodeOutlet=p)}},hostAttrs:[1,"cdk-nested-tree-node"],exportAs:["cdkNestedTreeNode"],standalone:!0,features:[s.Jv_([{provide:u,useExisting:i},{provide:I,useExisting:i}]),s.Vt3]})}return i})();const G=/([A-Za-z%]+)$/;let K=(()=>{class i{get level(){return this._level}set level(e){this._setLevelInput(e)}get indent(){return this._indent}set indent(e){this._setIndentInput(e)}constructor(e,t,a,h){this._treeNode=e,this._tree=t,this._element=a,this._dir=h,this._destroyed=new E.B,this.indentUnits="px",this._indent=40,this._setPadding(),h&&h.change.pipe((0,C.Q)(this._destroyed)).subscribe(()=>this._setPadding(!0)),e._dataChanges.subscribe(()=>this._setPadding())}ngOnDestroy(){this._destroyed.next(),this._destroyed.complete()}_paddingIndent(){const e=this._treeNode.data&&this._tree.treeControl.getLevel?this._tree.treeControl.getLevel(this._treeNode.data):null,t=null==this._level?e:this._level;return"number"==typeof t?`${t*this._indent}${this.indentUnits}`:null}_setPadding(e=!1){const t=this._paddingIndent();if(t!==this._currentPadding||e){const a=this._element.nativeElement,h=this._dir&&"rtl"===this._dir.value?"paddingRight":"paddingLeft",p="paddingLeft"===h?"paddingRight":"paddingLeft";a.style[h]=t||"",a.style[p]="",this._currentPadding=t}}_setLevelInput(e){this._level=isNaN(e)?null:e,this._setPadding()}_setIndentInput(e){let t=e,a="px";if("string"==typeof e){const h=e.split(G);t=h[0],a=h[1]||a}this.indentUnits=a,this._indent=(0,s.Udg)(t),this._setPadding()}static#e=this.\u0275fac=function(t){return new(t||i)(s.rXU(u),s.rXU(c),s.rXU(s.aKT),s.rXU(B.dS,8))};static#t=this.\u0275dir=s.FsC({type:i,selectors:[["","cdkTreeNodePadding",""]],inputs:{level:[2,"cdkTreeNodePadding","level",s.Udg],indent:[0,"cdkTreeNodePaddingIndent","indent"]},standalone:!0,features:[s.GFd]})}return i})(),X=(()=>{class i{constructor(e,t){this._tree=e,this._treeNode=t,this.recursive=!1}_toggle(e){this.recursive?this._tree.treeControl.toggleDescendants(this._treeNode.data):this._tree.treeControl.toggle(this._treeNode.data),e.stopPropagation()}static#e=this.\u0275fac=function(t){return new(t||i)(s.rXU(c),s.rXU(u))};static#t=this.\u0275dir=s.FsC({type:i,selectors:[["","cdkTreeNodeToggle",""]],hostBindings:function(t,a){1&t&&s.bIt("click",function(p){return a._toggle(p)})},inputs:{recursive:[2,"cdkTreeNodeToggleRecursive","recursive",s.L39]},standalone:!0,features:[s.GFd]})}return i})(),j=(()=>{class i{static#e=this.\u0275fac=function(t){return new(t||i)};static#t=this.\u0275mod=s.$C({type:i});static#s=this.\u0275inj=s.G2t({})}return i})()},47358:(V,F,_)=>{_.d(F,{d6:()=>b,jH:()=>M,lQ:()=>P,pO:()=>U,yF:()=>B,yI:()=>A,yj:()=>w,zw:()=>m});var f=_(64109),r=_(93953),E=_(86600),N=_(45024),x=_(84412),O=_(57786),L=_(96697),C=_(96354);let b=(()=>{class n extends f.xn{constructor(d,l,c){super(d,l),this.disabled=!1,this.tabIndex=Number(c)||0}ngOnInit(){super.ngOnInit()}ngOnDestroy(){super.ngOnDestroy()}static#e=this.\u0275fac=function(l){return new(l||n)(r.rXU(r.aKT),r.rXU(f.NL),r.kS0("tabindex"))};static#t=this.\u0275dir=r.FsC({type:n,selectors:[["mat-tree-node"]],hostAttrs:[1,"mat-tree-node"],inputs:{disabled:[2,"disabled","disabled",r.L39],tabIndex:[2,"tabIndex","tabIndex",d=>null==d?0:(0,r.Udg)(d)]},exportAs:["matTreeNode"],standalone:!0,features:[r.Jv_([{provide:f.xn,useExisting:n}]),r.GFd,r.Vt3]})}return n})(),A=(()=>{class n extends f.Sz{static#e=this.\u0275fac=(()=>{let d;return function(c){return(d||(d=r.xGo(n)))(c||n)}})();static#t=this.\u0275dir=r.FsC({type:n,selectors:[["","matTreeNodeDef",""]],inputs:{when:[0,"matTreeNodeDefWhen","when"],data:[0,"matTreeNode","data"]},standalone:!0,features:[r.Jv_([{provide:f.Sz,useExisting:n}]),r.Vt3]})}return n})(),B=(()=>{class n extends f.aI{get level(){return this._level}set level(d){this._setLevelInput(d)}get indent(){return this._indent}set indent(d){this._setIndentInput(d)}static#e=this.\u0275fac=(()=>{let d;return function(c){return(d||(d=r.xGo(n)))(c||n)}})();static#t=this.\u0275dir=r.FsC({type:n,selectors:[["","matTreeNodePadding",""]],inputs:{level:[2,"matTreeNodePadding","level",r.Udg],indent:[0,"matTreeNodePaddingIndent","indent"]},standalone:!0,features:[r.Jv_([{provide:f.aI,useExisting:n}]),r.GFd,r.Vt3]})}return n})(),T=(()=>{class n{constructor(d,l){this.viewContainer=d,this._node=l}static#e=this.\u0275fac=function(l){return new(l||n)(r.rXU(r.c1b),r.rXU(f.kZ,8))};static#t=this.\u0275dir=r.FsC({type:n,selectors:[["","matTreeNodeOutlet",""]],standalone:!0,features:[r.Jv_([{provide:f.a$,useExisting:n}])]})}return n})(),P=(()=>{class n extends f.NL{constructor(){super(...arguments),this._nodeOutlet=void 0}static#e=this.\u0275fac=(()=>{let d;return function(c){return(d||(d=r.xGo(n)))(c||n)}})();static#t=this.\u0275cmp=r.VBU({type:n,selectors:[["mat-tree"]],viewQuery:function(l,c){if(1&l&&r.GBs(T,7),2&l){let u;r.mGM(u=r.lsd())&&(c._nodeOutlet=u.first)}},hostAttrs:["role","tree",1,"mat-tree"],exportAs:["matTree"],standalone:!0,features:[r.Jv_([{provide:f.NL,useExisting:n}]),r.Vt3,r.aNF],decls:1,vars:0,consts:[["matTreeNodeOutlet",""]],template:function(l,c){1&l&&r.eu8(0,0)},dependencies:[T],styles:[".mat-tree{display:block;background-color:var(--mat-tree-container-background-color)}.mat-tree-node,.mat-nested-tree-node{color:var(--mat-tree-node-text-color);font-family:var(--mat-tree-node-text-font);font-size:var(--mat-tree-node-text-size);font-weight:var(--mat-tree-node-text-weight)}.mat-tree-node{display:flex;align-items:center;flex:1;word-wrap:break-word;min-height:var(--mat-tree-node-min-height)}.mat-nested-tree-node{border-bottom-width:0}"],encapsulation:2})}return n})(),U=(()=>{class n extends f.Hy{static#e=this.\u0275fac=(()=>{let d;return function(c){return(d||(d=r.xGo(n)))(c||n)}})();static#t=this.\u0275dir=r.FsC({type:n,selectors:[["","matTreeNodeToggle",""]],inputs:{recursive:[0,"matTreeNodeToggleRecursive","recursive"]},standalone:!0,features:[r.Jv_([{provide:f.Hy,useExisting:n}]),r.Vt3]})}return n})(),M=(()=>{class n{static#e=this.\u0275fac=function(l){return new(l||n)};static#t=this.\u0275mod=r.$C({type:n});static#s=this.\u0275inj=r.G2t({imports:[f.Dc,E.yE,E.yE]})}return n})();class w{constructor(g,d,l,c){this.transformFunction=g,this.getLevel=d,this.isExpandable=l,this.getChildren=c}_flattenNode(g,d,l,c){const u=this.transformFunction(g,d);if(l.push(u),this.isExpandable(u)){const v=this.getChildren(g);v&&(Array.isArray(v)?this._flattenChildren(v,d,l,c):v.pipe((0,L.s)(1)).subscribe(D=>{this._flattenChildren(D,d,l,c)}))}return l}_flattenChildren(g,d,l,c){g.forEach((u,v)=>{let D=c.slice();D.push(v!=g.length-1),this._flattenNode(u,d+1,l,D)})}flattenNodes(g){let d=[];return g.forEach(l=>this._flattenNode(l,0,d,[])),d}expandFlattenedNodes(g,d){let l=[],c=[];return c[0]=!0,g.forEach(u=>{let v=!0;for(let D=0;D<=this.getLevel(u);D++)v=v&&c[D];v&&l.push(u),this.isExpandable(u)&&(c[this.getLevel(u)+1]=d.isExpanded(u))}),l}}class m extends N.qS{get data(){return this._data.value}set data(g){this._data.next(g),this._flattenedData.next(this._treeFlattener.flattenNodes(this.data)),this._treeControl.dataNodes=this._flattenedData.value}constructor(g,d,l){super(),this._treeControl=g,this._treeFlattener=d,this._flattenedData=new x.t([]),this._expandedData=new x.t([]),this._data=new x.t([]),l&&(this.data=l)}connect(g){return(0,O.h)(g.viewChange,this._treeControl.expansionModel.changed,this._flattenedData).pipe((0,C.T)(()=>(this._expandedData.next(this._treeFlattener.expandFlattenedNodes(this._flattenedData.value,this._treeControl)),this._expandedData.value)))}disconnect(){}}}}]);