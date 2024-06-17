"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[801],{72801:(Ft,z,l)=>{l.r(z),l.d(z,{DashboardComponent:()=>Et});var q=l(10467),e=l(93953),H=l(99327),tt=l(96354),S=l(60177),h=l(86600),I=l(14085),O=l(28203);const B=["*"];class it{constructor(){this.columnIndex=0,this.rowIndex=0}get rowCount(){return this.rowIndex+1}get rowspan(){const s=Math.max(...this.tracker);return s>1?this.rowCount+s-1:this.rowCount}update(s,t){this.columnIndex=0,this.rowIndex=0,this.tracker=new Array(s),this.tracker.fill(0,0,this.tracker.length),this.positions=t.map(i=>this._trackTile(i))}_trackTile(s){const t=this._findMatchingGap(s.colspan);return this._markTilePosition(t,s),this.columnIndex=t+s.colspan,new nt(this.rowIndex,t)}_findMatchingGap(s){let t=-1,i=-1;do{this.columnIndex+s>this.tracker.length?(this._nextRow(),t=this.tracker.indexOf(0,this.columnIndex),i=this._findGapEndIndex(t)):(t=this.tracker.indexOf(0,this.columnIndex),-1!=t?(i=this._findGapEndIndex(t),this.columnIndex=t+1):(this._nextRow(),t=this.tracker.indexOf(0,this.columnIndex),i=this._findGapEndIndex(t)))}while(i-t<s||0==i);return Math.max(t,0)}_nextRow(){this.columnIndex=0,this.rowIndex++;for(let s=0;s<this.tracker.length;s++)this.tracker[s]=Math.max(0,this.tracker[s]-1)}_findGapEndIndex(s){for(let t=s+1;t<this.tracker.length;t++)if(0!=this.tracker[t])return t;return this.tracker.length}_markTilePosition(s,t){for(let i=0;i<t.colspan;i++)this.tracker[s+i]=t.rowspan}}class nt{constructor(s,t){this.row=s,this.col=t}}const L=new e.nKC("MAT_GRID_LIST");let j=(()=>{class o{constructor(t,i){this._element=t,this._gridList=i,this._rowspan=1,this._colspan=1}get rowspan(){return this._rowspan}set rowspan(t){this._rowspan=Math.round((0,I.OE)(t))}get colspan(){return this._colspan}set colspan(t){this._colspan=Math.round((0,I.OE)(t))}_setStyle(t,i){this._element.nativeElement.style[t]=i}static#t=this.\u0275fac=function(i){return new(i||o)(e.rXU(e.aKT),e.rXU(L,8))};static#e=this.\u0275cmp=e.VBU({type:o,selectors:[["mat-grid-tile"]],hostAttrs:[1,"mat-grid-tile"],hostVars:2,hostBindings:function(i,n){2&i&&e.BMQ("rowspan",n.rowspan)("colspan",n.colspan)},inputs:{rowspan:"rowspan",colspan:"colspan"},exportAs:["matGridTile"],standalone:!0,features:[e.aNF],ngContentSelectors:B,decls:2,vars:0,consts:[[1,"mat-grid-tile-content"]],template:function(i,n){1&i&&(e.NAR(),e.j41(0,"div",0),e.SdG(1),e.k0s())},styles:[".mat-grid-list{display:block;position:relative}.mat-grid-tile{display:block;position:absolute;overflow:hidden}.mat-grid-tile .mat-grid-tile-header,.mat-grid-tile .mat-grid-tile-footer{display:flex;align-items:center;height:48px;color:#fff;background:rgba(0,0,0,.38);overflow:hidden;padding:0 16px;position:absolute;left:0;right:0}.mat-grid-tile .mat-grid-tile-header>*,.mat-grid-tile .mat-grid-tile-footer>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.mat-grid-tile .mat-grid-tile-header.mat-2-line,.mat-grid-tile .mat-grid-tile-footer.mat-2-line{height:68px}.mat-grid-tile .mat-grid-list-text{display:flex;flex-direction:column;flex:auto;box-sizing:border-box;overflow:hidden}.mat-grid-tile .mat-grid-list-text>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.mat-grid-tile .mat-grid-list-text:empty{display:none}.mat-grid-tile .mat-grid-tile-header{top:0}.mat-grid-tile .mat-grid-tile-footer{bottom:0}.mat-grid-tile .mat-grid-avatar{padding-right:16px}[dir=rtl] .mat-grid-tile .mat-grid-avatar{padding-right:0;padding-left:16px}.mat-grid-tile .mat-grid-avatar:empty{display:none}.mat-grid-tile-header{font-size:var(--mat-grid-list-tile-header-primary-text-size)}.mat-grid-tile-header .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-grid-tile-header .mat-line:nth-child(n+2){font-size:var(--mat-grid-list-tile-header-secondary-text-size)}.mat-grid-tile-footer{font-size:var(--mat-grid-list-tile-footer-primary-text-size)}.mat-grid-tile-footer .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-grid-tile-footer .mat-line:nth-child(n+2){font-size:var(--mat-grid-list-tile-footer-secondary-text-size)}.mat-grid-tile-content{top:0;left:0;right:0;bottom:0;position:absolute;display:flex;align-items:center;justify-content:center;height:100%;padding:0;margin:0}"],encapsulation:2,changeDetection:0})}return o})();const st=/^-?\d+((\.\d+)?[A-Za-z%$]?)+$/;class k{constructor(){this._rows=0,this._rowspan=0}init(s,t,i,n){this._gutterSize=U(s),this._rows=t.rowCount,this._rowspan=t.rowspan,this._cols=i,this._direction=n}getBaseTileSize(s,t){return`(${s}% - (${this._gutterSize} * ${t}))`}getTilePosition(s,t){return 0===t?"0":u(`(${s} + ${this._gutterSize}) * ${t}`)}getTileSize(s,t){return`(${s} * ${t}) + (${t-1} * ${this._gutterSize})`}setStyle(s,t,i){let n=100/this._cols,a=(this._cols-1)/this._cols;this.setColStyles(s,i,n,a),this.setRowStyles(s,t,n,a)}setColStyles(s,t,i,n){let a=this.getBaseTileSize(i,n);s._setStyle("rtl"===this._direction?"right":"left",this.getTilePosition(a,t)),s._setStyle("width",u(this.getTileSize(a,s.colspan)))}getGutterSpan(){return`${this._gutterSize} * (${this._rowspan} - 1)`}getTileSpan(s){return`${this._rowspan} * ${this.getTileSize(s,1)}`}getComputedHeight(){return null}}class ot extends k{constructor(s){super(),this.fixedRowHeight=s}init(s,t,i,n){super.init(s,t,i,n),this.fixedRowHeight=U(this.fixedRowHeight),st.test(this.fixedRowHeight)}setRowStyles(s,t){s._setStyle("top",this.getTilePosition(this.fixedRowHeight,t)),s._setStyle("height",u(this.getTileSize(this.fixedRowHeight,s.rowspan)))}getComputedHeight(){return["height",u(`${this.getTileSpan(this.fixedRowHeight)} + ${this.getGutterSpan()}`)]}reset(s){s._setListStyle(["height",null]),s._tiles&&s._tiles.forEach(t=>{t._setStyle("top",null),t._setStyle("height",null)})}}class at extends k{constructor(s){super(),this._parseRatio(s)}setRowStyles(s,t,i,n){this.baseTileHeight=this.getBaseTileSize(i/this.rowHeightRatio,n),s._setStyle("marginTop",this.getTilePosition(this.baseTileHeight,t)),s._setStyle("paddingTop",u(this.getTileSize(this.baseTileHeight,s.rowspan)))}getComputedHeight(){return["paddingBottom",u(`${this.getTileSpan(this.baseTileHeight)} + ${this.getGutterSpan()}`)]}reset(s){s._setListStyle(["paddingBottom",null]),s._tiles.forEach(t=>{t._setStyle("marginTop",null),t._setStyle("paddingTop",null)})}_parseRatio(s){const t=s.split(":");this.rowHeightRatio=parseFloat(t[0])/parseFloat(t[1])}}class rt extends k{setRowStyles(s,t){let a=this.getBaseTileSize(100/this._rowspan,(this._rows-1)/this._rows);s._setStyle("top",this.getTilePosition(a,t)),s._setStyle("height",u(this.getTileSize(a,s.rowspan)))}reset(s){s._tiles&&s._tiles.forEach(t=>{t._setStyle("top",null),t._setStyle("height",null)})}}function u(o){return`calc(${o})`}function U(o){return o.match(/([A-Za-z%]+)$/)?o:`${o}px`}let dt=(()=>{class o{constructor(t,i){this._element=t,this._dir=i,this._gutter="1px"}get cols(){return this._cols}set cols(t){this._cols=Math.max(1,Math.round((0,I.OE)(t)))}get gutterSize(){return this._gutter}set gutterSize(t){this._gutter=`${t??""}`}get rowHeight(){return this._rowHeight}set rowHeight(t){const i=`${t??""}`;i!==this._rowHeight&&(this._rowHeight=i,this._setTileStyler(this._rowHeight))}ngOnInit(){this._checkCols(),this._checkRowHeight()}ngAfterContentChecked(){this._layoutTiles()}_checkCols(){}_checkRowHeight(){this._rowHeight||this._setTileStyler("1:1")}_setTileStyler(t){this._tileStyler&&this._tileStyler.reset(this),this._tileStyler="fit"===t?new rt:t&&t.indexOf(":")>-1?new at(t):new ot(t)}_layoutTiles(){this._tileCoordinator||(this._tileCoordinator=new it);const t=this._tileCoordinator,i=this._tiles.filter(a=>!a._gridList||a._gridList===this),n=this._dir?this._dir.value:"ltr";this._tileCoordinator.update(this.cols,i),this._tileStyler.init(this.gutterSize,t,this.cols,n),i.forEach((a,r)=>{const m=t.positions[r];this._tileStyler.setStyle(a,m.row,m.col)}),this._setListStyle(this._tileStyler.getComputedHeight())}_setListStyle(t){t&&(this._element.nativeElement.style[t[0]]=t[1])}static#t=this.\u0275fac=function(i){return new(i||o)(e.rXU(e.aKT),e.rXU(O.dS,8))};static#e=this.\u0275cmp=e.VBU({type:o,selectors:[["mat-grid-list"]],contentQueries:function(i,n,a){if(1&i&&e.wni(a,j,5),2&i){let r;e.mGM(r=e.lsd())&&(n._tiles=r)}},hostAttrs:[1,"mat-grid-list"],hostVars:1,hostBindings:function(i,n){2&i&&e.BMQ("cols",n.cols)},inputs:{cols:"cols",gutterSize:"gutterSize",rowHeight:"rowHeight"},exportAs:["matGridList"],standalone:!0,features:[e.Jv_([{provide:L,useExisting:o}]),e.aNF],ngContentSelectors:B,decls:2,vars:0,template:function(i,n){1&i&&(e.NAR(),e.j41(0,"div"),e.SdG(1),e.k0s())},styles:[".mat-grid-list{display:block;position:relative}.mat-grid-tile{display:block;position:absolute;overflow:hidden}.mat-grid-tile .mat-grid-tile-header,.mat-grid-tile .mat-grid-tile-footer{display:flex;align-items:center;height:48px;color:#fff;background:rgba(0,0,0,.38);overflow:hidden;padding:0 16px;position:absolute;left:0;right:0}.mat-grid-tile .mat-grid-tile-header>*,.mat-grid-tile .mat-grid-tile-footer>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.mat-grid-tile .mat-grid-tile-header.mat-2-line,.mat-grid-tile .mat-grid-tile-footer.mat-2-line{height:68px}.mat-grid-tile .mat-grid-list-text{display:flex;flex-direction:column;flex:auto;box-sizing:border-box;overflow:hidden}.mat-grid-tile .mat-grid-list-text>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.mat-grid-tile .mat-grid-list-text:empty{display:none}.mat-grid-tile .mat-grid-tile-header{top:0}.mat-grid-tile .mat-grid-tile-footer{bottom:0}.mat-grid-tile .mat-grid-avatar{padding-right:16px}[dir=rtl] .mat-grid-tile .mat-grid-avatar{padding-right:0;padding-left:16px}.mat-grid-tile .mat-grid-avatar:empty{display:none}.mat-grid-tile-header{font-size:var(--mat-grid-list-tile-header-primary-text-size)}.mat-grid-tile-header .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-grid-tile-header .mat-line:nth-child(n+2){font-size:var(--mat-grid-list-tile-header-secondary-text-size)}.mat-grid-tile-footer{font-size:var(--mat-grid-list-tile-footer-primary-text-size)}.mat-grid-tile-footer .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-grid-tile-footer .mat-line:nth-child(n+2){font-size:var(--mat-grid-list-tile-footer-secondary-text-size)}.mat-grid-tile-content{top:0;left:0;right:0;bottom:0;position:absolute;display:flex;align-items:center;justify-content:center;height:100%;padding:0;margin:0}"],encapsulation:2,changeDetection:0})}return o})(),ct=(()=>{class o{static#t=this.\u0275fac=function(i){return new(i||o)};static#e=this.\u0275mod=e.$C({type:o});static#i=this.\u0275inj=e.G2t({imports:[h.Np,h.yE,h.Np,h.yE]})}return o})();var f=l(18617),c=l(67336),R=l(21413),D=l(57786),E=l(18359),N=l(7673),X=l(25007),F=l(99172),$=l(25558),P=l(56977),x=l(5964),Y=l(96697),Q=l(91986),mt=l(76939),d=l(49969),_=l(66969),ht=l(36860),ut=l(67333);const gt=["mat-menu-item",""],pt=[[["mat-icon"],["","matMenuItemIcon",""]],"*"],ft=["mat-icon, [matMenuItemIcon]","*"];function _t(o,s){1&o&&(e.qSk(),e.j41(0,"svg",2),e.nrm(1,"polygon",3),e.k0s())}const vt=["*"];function Mt(o,s){if(1&o){const t=e.RV6();e.j41(0,"div",0),e.bIt("keydown",function(n){e.eBV(t);const a=e.XpG();return e.Njj(a._handleKeydown(n))})("click",function(){e.eBV(t);const n=e.XpG();return e.Njj(n.closed.emit("click"))})("@transformMenu.start",function(n){e.eBV(t);const a=e.XpG();return e.Njj(a._onAnimationStart(n))})("@transformMenu.done",function(n){e.eBV(t);const a=e.XpG();return e.Njj(a._onAnimationDone(n))}),e.j41(1,"div",1),e.SdG(2),e.k0s()()}if(2&o){const t=e.XpG();e.HbH(t._classList),e.Y8G("id",t.panelId)("@transformMenu",t._panelAnimationState),e.BMQ("aria-label",t.ariaLabel||null)("aria-labelledby",t.ariaLabelledby||null)("aria-describedby",t.ariaDescribedby||null)}}const A=new e.nKC("MAT_MENU_PANEL");let T=(()=>{class o{constructor(t,i,n,a,r){this._elementRef=t,this._document=i,this._focusMonitor=n,this._parentMenu=a,this._changeDetectorRef=r,this.role="menuitem",this.disabled=!1,this.disableRipple=!1,this._hovered=new R.B,this._focused=new R.B,this._highlighted=!1,this._triggersSubmenu=!1,a?.addItem?.(this)}focus(t,i){this._focusMonitor&&t?this._focusMonitor.focusVia(this._getHostElement(),t,i):this._getHostElement().focus(i),this._focused.next(this)}ngAfterViewInit(){this._focusMonitor&&this._focusMonitor.monitor(this._elementRef,!1)}ngOnDestroy(){this._focusMonitor&&this._focusMonitor.stopMonitoring(this._elementRef),this._parentMenu&&this._parentMenu.removeItem&&this._parentMenu.removeItem(this),this._hovered.complete(),this._focused.complete()}_getTabIndex(){return this.disabled?"-1":"0"}_getHostElement(){return this._elementRef.nativeElement}_checkDisabled(t){this.disabled&&(t.preventDefault(),t.stopPropagation())}_handleMouseEnter(){this._hovered.next(this)}getLabel(){const t=this._elementRef.nativeElement.cloneNode(!0),i=t.querySelectorAll("mat-icon, .material-icons");for(let n=0;n<i.length;n++)i[n].remove();return t.textContent?.trim()||""}_setHighlighted(t){this._highlighted=t,this._changeDetectorRef?.markForCheck()}_setTriggersSubmenu(t){this._triggersSubmenu=t,this._changeDetectorRef?.markForCheck()}_hasFocus(){return this._document&&this._document.activeElement===this._getHostElement()}static#t=this.\u0275fac=function(i){return new(i||o)(e.rXU(e.aKT),e.rXU(S.qQ),e.rXU(f.FN),e.rXU(A,8),e.rXU(e.gRc))};static#e=this.\u0275cmp=e.VBU({type:o,selectors:[["","mat-menu-item",""]],hostAttrs:[1,"mat-mdc-menu-item","mat-mdc-focus-indicator"],hostVars:8,hostBindings:function(i,n){1&i&&e.bIt("click",function(r){return n._checkDisabled(r)})("mouseenter",function(){return n._handleMouseEnter()}),2&i&&(e.BMQ("role",n.role)("tabindex",n._getTabIndex())("aria-disabled",n.disabled)("disabled",n.disabled||null),e.AVh("mat-mdc-menu-item-highlighted",n._highlighted)("mat-mdc-menu-item-submenu-trigger",n._triggersSubmenu))},inputs:{role:"role",disabled:[2,"disabled","disabled",e.L39],disableRipple:[2,"disableRipple","disableRipple",e.L39]},exportAs:["matMenuItem"],standalone:!0,features:[e.GFd,e.aNF],attrs:gt,ngContentSelectors:ft,decls:5,vars:3,consts:[[1,"mat-mdc-menu-item-text"],["matRipple","",1,"mat-mdc-menu-ripple",3,"matRippleDisabled","matRippleTrigger"],["viewBox","0 0 5 10","focusable","false","aria-hidden","true",1,"mat-mdc-menu-submenu-icon"],["points","0,0 5,5 0,10"]],template:function(i,n){1&i&&(e.NAR(pt),e.SdG(0),e.j41(1,"span",0),e.SdG(2,1),e.k0s(),e.nrm(3,"div",1),e.DNE(4,_t,2,0,":svg:svg",2)),2&i&&(e.R7$(3),e.Y8G("matRippleDisabled",n.disableRipple||n.disabled)("matRippleTrigger",n._getHostElement()),e.R7$(),e.vxM(n._triggersSubmenu?4:-1))},dependencies:[h.r6],encapsulation:2,changeDetection:0})}return o})();const yt=new e.nKC("MatMenuContent"),C={transformMenu:(0,d.hZ)("transformMenu",[(0,d.wk)("void",(0,d.iF)({opacity:0,transform:"scale(0.8)"})),(0,d.kY)("void => enter",(0,d.i0)("120ms cubic-bezier(0, 0, 0.2, 1)",(0,d.iF)({opacity:1,transform:"scale(1)"}))),(0,d.kY)("* => void",(0,d.i0)("100ms 25ms linear",(0,d.iF)({opacity:0})))]),fadeInItems:(0,d.hZ)("fadeInItems",[(0,d.wk)("showing",(0,d.iF)({opacity:1})),(0,d.kY)("void => *",[(0,d.iF)({opacity:0}),(0,d.i0)("400ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)")])])};let bt=0;const wt=new e.nKC("mat-menu-default-options",{providedIn:"root",factory:function xt(){return{overlapTrigger:!1,xPosition:"after",yPosition:"below",backdropClass:"cdk-overlay-transparent-backdrop"}}});let v=(()=>{class o{get xPosition(){return this._xPosition}set xPosition(t){this._xPosition=t,this.setPositionClasses()}get yPosition(){return this._yPosition}set yPosition(t){this._yPosition=t,this.setPositionClasses()}set panelClass(t){const i=this._previousPanelClass,n={...this._classList};i&&i.length&&i.split(" ").forEach(a=>{n[a]=!1}),this._previousPanelClass=t,t&&t.length&&(t.split(" ").forEach(a=>{n[a]=!0}),this._elementRef.nativeElement.className=""),this._classList=n}get classList(){return this.panelClass}set classList(t){this.panelClass=t}constructor(t,i,n,a){this._elementRef=t,this._changeDetectorRef=a,this._elevationPrefix="mat-elevation-z",this._baseElevation=8,this._directDescendantItems=new e.rOR,this._classList={},this._panelAnimationState="void",this._animationDone=new R.B,this.closed=new e.bkB,this.close=this.closed,this.panelId="mat-menu-panel-"+bt++,this._injector=(0,e.WQX)(e.zZn),this.overlayPanelClass=n.overlayPanelClass||"",this._xPosition=n.xPosition,this._yPosition=n.yPosition,this.backdropClass=n.backdropClass,this.overlapTrigger=n.overlapTrigger,this.hasBackdrop=n.hasBackdrop}ngOnInit(){this.setPositionClasses()}ngAfterContentInit(){this._updateDirectDescendants(),this._keyManager=new f.Bu(this._directDescendantItems).withWrap().withTypeAhead().withHomeAndEnd(),this._keyManager.tabOut.subscribe(()=>this.closed.emit("tab")),this._directDescendantItems.changes.pipe((0,F.Z)(this._directDescendantItems),(0,$.n)(t=>(0,D.h)(...t.map(i=>i._focused)))).subscribe(t=>this._keyManager.updateActiveItem(t)),this._directDescendantItems.changes.subscribe(t=>{const i=this._keyManager;if("enter"===this._panelAnimationState&&i.activeItem?._hasFocus()){const n=t.toArray(),a=Math.max(0,Math.min(n.length-1,i.activeItemIndex||0));n[a]&&!n[a].disabled?i.setActiveItem(a):i.setNextItemActive()}})}ngOnDestroy(){this._keyManager?.destroy(),this._directDescendantItems.destroy(),this.closed.complete(),this._firstItemFocusRef?.destroy()}_hovered(){return this._directDescendantItems.changes.pipe((0,F.Z)(this._directDescendantItems),(0,$.n)(i=>(0,D.h)(...i.map(n=>n._hovered))))}addItem(t){}removeItem(t){}_handleKeydown(t){const i=t.keyCode,n=this._keyManager;switch(i){case c._f:(0,c.rp)(t)||(t.preventDefault(),this.closed.emit("keydown"));break;case c.UQ:this.parentMenu&&"ltr"===this.direction&&this.closed.emit("keydown");break;case c.LE:this.parentMenu&&"rtl"===this.direction&&this.closed.emit("keydown");break;default:return(i===c.i7||i===c.n6)&&n.setFocusOrigin("keyboard"),void n.onKeydown(t)}t.stopPropagation()}focusFirstItem(t="program"){this._firstItemFocusRef?.destroy(),this._firstItemFocusRef=(0,e.mal)(()=>{let i=null;if(this._directDescendantItems.length&&(i=this._directDescendantItems.first._getHostElement().closest('[role="menu"]')),!i||!i.contains(document.activeElement)){const n=this._keyManager;n.setFocusOrigin(t).setFirstItemActive(),!n.activeItem&&i&&i.focus()}},{injector:this._injector})}resetActiveItem(){this._keyManager.setActiveItem(-1)}setElevation(t){const i=Math.min(this._baseElevation+t,24),n=`${this._elevationPrefix}${i}`,a=Object.keys(this._classList).find(r=>r.startsWith(this._elevationPrefix));if(!a||a===this._previousElevation){const r={...this._classList};this._previousElevation&&(r[this._previousElevation]=!1),r[n]=!0,this._previousElevation=n,this._classList=r}}setPositionClasses(t=this.xPosition,i=this.yPosition){this._classList={...this._classList,"mat-menu-before":"before"===t,"mat-menu-after":"after"===t,"mat-menu-above":"above"===i,"mat-menu-below":"below"===i},this._changeDetectorRef?.markForCheck()}_startAnimation(){this._panelAnimationState="enter"}_resetAnimation(){this._panelAnimationState="void"}_onAnimationDone(t){this._animationDone.next(t),this._isAnimating=!1}_onAnimationStart(t){this._isAnimating=!0,"enter"===t.toState&&0===this._keyManager.activeItemIndex&&(t.element.scrollTop=0)}_updateDirectDescendants(){this._allItems.changes.pipe((0,F.Z)(this._allItems)).subscribe(t=>{this._directDescendantItems.reset(t.filter(i=>i._parentMenu===this)),this._directDescendantItems.notifyOnChanges()})}static#t=this.\u0275fac=function(i){return new(i||o)(e.rXU(e.aKT),e.rXU(e.SKi),e.rXU(wt),e.rXU(e.gRc))};static#e=this.\u0275cmp=e.VBU({type:o,selectors:[["mat-menu"]],contentQueries:function(i,n,a){if(1&i&&(e.wni(a,yt,5),e.wni(a,T,5),e.wni(a,T,4)),2&i){let r;e.mGM(r=e.lsd())&&(n.lazyContent=r.first),e.mGM(r=e.lsd())&&(n._allItems=r),e.mGM(r=e.lsd())&&(n.items=r)}},viewQuery:function(i,n){if(1&i&&e.GBs(e.C4Q,5),2&i){let a;e.mGM(a=e.lsd())&&(n.templateRef=a.first)}},hostVars:3,hostBindings:function(i,n){2&i&&e.BMQ("aria-label",null)("aria-labelledby",null)("aria-describedby",null)},inputs:{backdropClass:"backdropClass",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],xPosition:"xPosition",yPosition:"yPosition",overlapTrigger:[2,"overlapTrigger","overlapTrigger",e.L39],hasBackdrop:[2,"hasBackdrop","hasBackdrop",t=>null==t?null:(0,e.L39)(t)],panelClass:[0,"class","panelClass"],classList:"classList"},outputs:{closed:"closed",close:"close"},exportAs:["matMenu"],standalone:!0,features:[e.Jv_([{provide:A,useExisting:o}]),e.GFd,e.aNF],ngContentSelectors:vt,decls:1,vars:0,consts:[["tabindex","-1","role","menu",1,"mat-mdc-menu-panel","mat-mdc-elevation-specific",3,"keydown","click","id"],[1,"mat-mdc-menu-content"]],template:function(i,n){1&i&&(e.NAR(),e.DNE(0,Mt,3,7,"ng-template"))},styles:['mat-menu{display:none}.mat-mdc-menu-content{margin:0;padding:8px 0;list-style-type:none}.mat-mdc-menu-content:focus{outline:none}.mat-mdc-menu-content,.mat-mdc-menu-content .mat-mdc-menu-item .mat-mdc-menu-item-text{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;flex:1;white-space:normal;font-family:var(--mat-menu-item-label-text-font);line-height:var(--mat-menu-item-label-text-line-height);font-size:var(--mat-menu-item-label-text-size);letter-spacing:var(--mat-menu-item-label-text-tracking);font-weight:var(--mat-menu-item-label-text-weight)}.mat-mdc-menu-panel{min-width:112px;max-width:280px;overflow:auto;-webkit-overflow-scrolling:touch;box-sizing:border-box;outline:0;border-radius:var(--mat-menu-container-shape);background-color:var(--mat-menu-container-color);will-change:transform,opacity}.mat-mdc-menu-panel.ng-animating{pointer-events:none}.cdk-high-contrast-active .mat-mdc-menu-panel{outline:solid 1px}.mat-mdc-menu-panel .mat-divider{color:var(--mat-menu-divider-color);margin-bottom:var(--mat-menu-divider-bottom-spacing);margin-top:var(--mat-menu-divider-top-spacing)}.mat-mdc-menu-item{display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;padding-left:var(--mat-menu-item-leading-spacing);padding-right:var(--mat-menu-item-trailing-spacing);-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:rgba(0,0,0,0);cursor:pointer;width:100%;text-align:left;box-sizing:border-box;color:inherit;font-size:inherit;background:none;text-decoration:none;margin:0;align-items:center;min-height:48px}.mat-mdc-menu-item:focus{outline:none}[dir=rtl] .mat-mdc-menu-item,.mat-mdc-menu-item[dir=rtl]{padding-left:var(--mat-menu-item-trailing-spacing);padding-right:var(--mat-menu-item-leading-spacing)}.mat-mdc-menu-item:has(.material-icons,mat-icon,[matButtonIcon]){padding-left:var(--mat-menu-item-with-icon-leading-spacing);padding-right:var(--mat-menu-item-with-icon-trailing-spacing)}[dir=rtl] .mat-mdc-menu-item:has(.material-icons,mat-icon,[matButtonIcon]),.mat-mdc-menu-item:has(.material-icons,mat-icon,[matButtonIcon])[dir=rtl]{padding-left:var(--mat-menu-item-with-icon-trailing-spacing);padding-right:var(--mat-menu-item-with-icon-leading-spacing)}.mat-mdc-menu-item::-moz-focus-inner{border:0}.mat-mdc-menu-item,.mat-mdc-menu-item:visited,.mat-mdc-menu-item:link{color:var(--mat-menu-item-label-text-color)}.mat-mdc-menu-item .mat-icon-no-color,.mat-mdc-menu-item .mat-mdc-menu-submenu-icon{color:var(--mat-menu-item-icon-color)}.mat-mdc-menu-item[disabled]{cursor:default;opacity:.38}.mat-mdc-menu-item[disabled]::after{display:block;position:absolute;content:"";top:0;left:0;bottom:0;right:0}.mat-mdc-menu-item .mat-icon{flex-shrink:0;margin-right:var(--mat-menu-item-spacing);height:var(--mat-menu-item-icon-size);width:var(--mat-menu-item-icon-size)}[dir=rtl] .mat-mdc-menu-item{text-align:right}[dir=rtl] .mat-mdc-menu-item .mat-icon{margin-right:0;margin-left:var(--mat-menu-item-spacing)}.mat-mdc-menu-item:not([disabled]):hover{background-color:var(--mat-menu-item-hover-state-layer-color)}.mat-mdc-menu-item:not([disabled]).cdk-program-focused,.mat-mdc-menu-item:not([disabled]).cdk-keyboard-focused,.mat-mdc-menu-item:not([disabled]).mat-mdc-menu-item-highlighted{background-color:var(--mat-menu-item-focus-state-layer-color)}.cdk-high-contrast-active .mat-mdc-menu-item{margin-top:1px}.mat-mdc-menu-submenu-icon{width:var(--mat-menu-item-icon-size);height:10px;fill:currentColor;padding-left:var(--mat-menu-item-spacing)}[dir=rtl] .mat-mdc-menu-submenu-icon{padding-right:var(--mat-menu-item-spacing);padding-left:0}[dir=rtl] .mat-mdc-menu-submenu-icon polygon{transform:scaleX(-1)}.cdk-high-contrast-active .mat-mdc-menu-submenu-icon{fill:CanvasText}.mat-mdc-menu-item .mat-mdc-menu-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}'],encapsulation:2,data:{animation:[C.transformMenu,C.fadeInItems]},changeDetection:0})}return o})();const V=new e.nKC("mat-menu-scroll-strategy",{providedIn:"root",factory:()=>{const o=(0,e.WQX)(_.hJ);return()=>o.scrollStrategies.reposition()}}),Ct={provide:V,deps:[_.hJ],useFactory:function Tt(o){return()=>o.scrollStrategies.reposition()}},K=(0,ht.BQ)({passive:!0});let St=(()=>{class o{get _deprecatedMatMenuTriggerFor(){return this.menu}set _deprecatedMatMenuTriggerFor(t){this.menu=t}get menu(){return this._menu}set menu(t){t!==this._menu&&(this._menu=t,this._menuCloseSubscription.unsubscribe(),t&&(this._menuCloseSubscription=t.close.subscribe(i=>{this._destroyMenu(i),("click"===i||"tab"===i)&&this._parentMaterialMenu&&this._parentMaterialMenu.closed.emit(i)})),this._menuItemInstance?._setTriggersSubmenu(this.triggersSubmenu()))}constructor(t,i,n,a,r,m,p,M,y){this._overlay=t,this._element=i,this._viewContainerRef=n,this._menuItemInstance=m,this._dir=p,this._focusMonitor=M,this._ngZone=y,this._overlayRef=null,this._menuOpen=!1,this._closingActionsSubscription=E.yU.EMPTY,this._hoverSubscription=E.yU.EMPTY,this._menuCloseSubscription=E.yU.EMPTY,this._changeDetectorRef=(0,e.WQX)(e.gRc),this._handleTouchStart=b=>{(0,f.w6)(b)||(this._openedBy="touch")},this._openedBy=void 0,this.restoreFocus=!0,this.menuOpened=new e.bkB,this.onMenuOpen=this.menuOpened,this.menuClosed=new e.bkB,this.onMenuClose=this.menuClosed,this._scrollStrategy=a,this._parentMaterialMenu=r instanceof v?r:void 0,i.nativeElement.addEventListener("touchstart",this._handleTouchStart,K)}ngAfterContentInit(){this._handleHover()}ngOnDestroy(){this._overlayRef&&(this._overlayRef.dispose(),this._overlayRef=null),this._element.nativeElement.removeEventListener("touchstart",this._handleTouchStart,K),this._menuCloseSubscription.unsubscribe(),this._closingActionsSubscription.unsubscribe(),this._hoverSubscription.unsubscribe()}get menuOpen(){return this._menuOpen}get dir(){return this._dir&&"rtl"===this._dir.value?"rtl":"ltr"}triggersSubmenu(){return!!(this._menuItemInstance&&this._parentMaterialMenu&&this.menu)}toggleMenu(){return this._menuOpen?this.closeMenu():this.openMenu()}openMenu(){const t=this.menu;if(this._menuOpen||!t)return;const i=this._createOverlay(t),n=i.getConfig(),a=n.positionStrategy;this._setPosition(t,a),n.hasBackdrop=null==t.hasBackdrop?!this.triggersSubmenu():t.hasBackdrop,i.attach(this._getPortal(t)),t.lazyContent&&t.lazyContent.attach(this.menuData),this._closingActionsSubscription=this._menuClosingActions().subscribe(()=>this.closeMenu()),this._initMenu(t),t instanceof v&&(t._startAnimation(),t._directDescendantItems.changes.pipe((0,P.Q)(t.close)).subscribe(()=>{a.withLockedPosition(!1).reapplyLastPosition(),a.withLockedPosition(!0)}))}closeMenu(){this.menu?.close.emit()}focus(t,i){this._focusMonitor&&t?this._focusMonitor.focusVia(this._element,t,i):this._element.nativeElement.focus(i)}updatePosition(){this._overlayRef?.updatePosition()}_destroyMenu(t){if(!this._overlayRef||!this.menuOpen)return;const i=this.menu;this._closingActionsSubscription.unsubscribe(),this._overlayRef.detach(),this.restoreFocus&&("keydown"===t||!this._openedBy||!this.triggersSubmenu())&&this.focus(this._openedBy),this._openedBy=void 0,i instanceof v?(i._resetAnimation(),i.lazyContent?i._animationDone.pipe((0,x.p)(n=>"void"===n.toState),(0,Y.s)(1),(0,P.Q)(i.lazyContent._attached)).subscribe({next:()=>i.lazyContent.detach(),complete:()=>this._setIsMenuOpen(!1)}):this._setIsMenuOpen(!1)):(this._setIsMenuOpen(!1),i?.lazyContent?.detach())}_initMenu(t){t.parentMenu=this.triggersSubmenu()?this._parentMaterialMenu:void 0,t.direction=this.dir,this._setMenuElevation(t),t.focusFirstItem(this._openedBy||"program"),this._setIsMenuOpen(!0)}_setMenuElevation(t){if(t.setElevation){let i=0,n=t.parentMenu;for(;n;)i++,n=n.parentMenu;t.setElevation(i)}}_setIsMenuOpen(t){t!==this._menuOpen&&(this._menuOpen=t,this._menuOpen?this.menuOpened.emit():this.menuClosed.emit(),this.triggersSubmenu()&&this._menuItemInstance._setHighlighted(t),this._changeDetectorRef.markForCheck())}_createOverlay(t){if(!this._overlayRef){const i=this._getOverlayConfig(t);this._subscribeToPositions(t,i.positionStrategy),this._overlayRef=this._overlay.create(i),this._overlayRef.keydownEvents().subscribe()}return this._overlayRef}_getOverlayConfig(t){return new _.rR({positionStrategy:this._overlay.position().flexibleConnectedTo(this._element).withLockedPosition().withGrowAfterOpen().withTransformOriginOn(".mat-menu-panel, .mat-mdc-menu-panel"),backdropClass:t.backdropClass||"cdk-overlay-transparent-backdrop",panelClass:t.overlayPanelClass,scrollStrategy:this._scrollStrategy(),direction:this._dir})}_subscribeToPositions(t,i){t.setPositionClasses&&i.positionChanges.subscribe(n=>{const a="start"===n.connectionPair.overlayX?"after":"before",r="top"===n.connectionPair.overlayY?"below":"above";this._ngZone?this._ngZone.run(()=>t.setPositionClasses(a,r)):t.setPositionClasses(a,r)})}_setPosition(t,i){let[n,a]="before"===t.xPosition?["end","start"]:["start","end"],[r,m]="above"===t.yPosition?["bottom","top"]:["top","bottom"],[p,M]=[r,m],[y,b]=[n,a],w=0;if(this.triggersSubmenu()){if(b=n="before"===t.xPosition?"start":"end",a=y="end"===n?"start":"end",this._parentMaterialMenu){if(null==this._parentInnerPadding){const J=this._parentMaterialMenu.items.first;this._parentInnerPadding=J?J._getHostElement().offsetTop:0}w="bottom"===r?this._parentInnerPadding:-this._parentInnerPadding}}else t.overlapTrigger||(p="top"===r?"bottom":"top",M="top"===m?"bottom":"top");i.withPositions([{originX:n,originY:p,overlayX:y,overlayY:r,offsetY:w},{originX:a,originY:p,overlayX:b,overlayY:r,offsetY:w},{originX:n,originY:M,overlayX:y,overlayY:m,offsetY:-w},{originX:a,originY:M,overlayX:b,overlayY:m,offsetY:-w}])}_menuClosingActions(){const t=this._overlayRef.backdropClick(),i=this._overlayRef.detachments(),n=this._parentMaterialMenu?this._parentMaterialMenu.closed:(0,N.of)(),a=this._parentMaterialMenu?this._parentMaterialMenu._hovered().pipe((0,x.p)(r=>r!==this._menuItemInstance),(0,x.p)(()=>this._menuOpen)):(0,N.of)();return(0,D.h)(t,n,a,i)}_handleMousedown(t){(0,f._G)(t)||(this._openedBy=0===t.button?"mouse":void 0,this.triggersSubmenu()&&t.preventDefault())}_handleKeydown(t){const i=t.keyCode;(i===c.Fm||i===c.t6)&&(this._openedBy="keyboard"),this.triggersSubmenu()&&(i===c.LE&&"ltr"===this.dir||i===c.UQ&&"rtl"===this.dir)&&(this._openedBy="keyboard",this.openMenu())}_handleClick(t){this.triggersSubmenu()?(t.stopPropagation(),this.openMenu()):this.toggleMenu()}_handleHover(){!this.triggersSubmenu()||!this._parentMaterialMenu||(this._hoverSubscription=this._parentMaterialMenu._hovered().pipe((0,x.p)(t=>t===this._menuItemInstance&&!t.disabled),(0,Q.c)(0,X.$)).subscribe(()=>{this._openedBy="mouse",this.menu instanceof v&&this.menu._isAnimating?this.menu._animationDone.pipe((0,Y.s)(1),(0,Q.c)(0,X.$),(0,P.Q)(this._parentMaterialMenu._hovered())).subscribe(()=>this.openMenu()):this.openMenu()}))}_getPortal(t){return(!this._portal||this._portal.templateRef!==t.templateRef)&&(this._portal=new mt.VA(t.templateRef,this._viewContainerRef)),this._portal}static#t=this.\u0275fac=function(i){return new(i||o)(e.rXU(_.hJ),e.rXU(e.aKT),e.rXU(e.c1b),e.rXU(V),e.rXU(A,8),e.rXU(T,10),e.rXU(O.dS,8),e.rXU(f.FN),e.rXU(e.SKi))};static#e=this.\u0275dir=e.FsC({type:o,selectors:[["","mat-menu-trigger-for",""],["","matMenuTriggerFor",""]],hostAttrs:[1,"mat-mdc-menu-trigger"],hostVars:3,hostBindings:function(i,n){1&i&&e.bIt("click",function(r){return n._handleClick(r)})("mousedown",function(r){return n._handleMousedown(r)})("keydown",function(r){return n._handleKeydown(r)}),2&i&&e.BMQ("aria-haspopup",n.menu?"menu":null)("aria-expanded",n.menuOpen)("aria-controls",n.menuOpen?n.menu.panelId:null)},inputs:{_deprecatedMatMenuTriggerFor:[0,"mat-menu-trigger-for","_deprecatedMatMenuTriggerFor"],menu:[0,"matMenuTriggerFor","menu"],menuData:[0,"matMenuTriggerData","menuData"],restoreFocus:[0,"matMenuTriggerRestoreFocus","restoreFocus"]},outputs:{menuOpened:"menuOpened",onMenuOpen:"onMenuOpen",menuClosed:"menuClosed",onMenuClose:"onMenuClose"},exportAs:["matMenuTrigger"],standalone:!0})}return o})(),It=(()=>{class o{static#t=this.\u0275fac=function(i){return new(i||o)};static#e=this.\u0275mod=e.$C({type:o});static#i=this.\u0275inj=e.G2t({providers:[Ct],imports:[S.MD,h.pZ,h.yE,_.z_,ut.Gj,h.yE]})}return o})();var Z=l(21801),G=l(88834),g=l(25596),W=l(18498),kt=l(83746);const Rt=()=>["/introduction"];function Dt(o,s){if(1&o&&(e.j41(0,"mat-grid-tile",6)(1,"mat-card",7)(2,"mat-card-header")(3,"mat-card-title"),e.EFF(4),e.j41(5,"button",8)(6,"mat-icon"),e.EFF(7,"more_vert"),e.k0s()(),e.j41(8,"mat-menu",9,0)(10,"button",10),e.EFF(11,"Expand"),e.k0s(),e.j41(12,"button",10),e.EFF(13,"Remove"),e.k0s()()()(),e.j41(14,"mat-card-content",11)(15,"div"),e.EFF(16,"Card Content Here"),e.k0s()()()()),2&o){const t=s.$implicit,i=e.sdS(9);e.Y8G("colspan",t.cols)("rowspan",t.rows),e.R7$(4),e.SpI(" ",t.title," "),e.R7$(),e.Y8G("matMenuTriggerFor",i)}}let Et=(()=>{class o{constructor(t){this.identity=t,this.breakpointObserver=(0,e.WQX)(H.QP),this.cards=this.breakpointObserver.observe(H.Rp.Handset).pipe((0,tt.T)(({matches:i})=>i?[{title:"Card 1",cols:1,rows:1},{title:"Card 2",cols:1,rows:1},{title:"Card 3",cols:1,rows:1},{title:"Card 4",cols:1,rows:1}]:[{title:"Card 1",cols:2,rows:1},{title:"Card 2",cols:1,rows:1},{title:"Card 3",cols:1,rows:2},{title:"Card 4",cols:1,rows:1}]))}ngOnInit(){return(0,q.A)(function*(){})()}static#t=this.\u0275fac=function(i){return new(i||o)(e.rXU(kt.K))};static#e=this.\u0275cmp=e.VBU({type:o,selectors:[["app-dashboard"]],standalone:!0,features:[e.aNF],decls:18,vars:4,consts:[["menu","matMenu"],[1,"grid-container"],[1,"mat-h1"],["mat-button","",3,"routerLink"],["mat-button",""],["cols","2","rowHeight","350px"],[3,"colspan","rowspan"],[1,"dashboard-card"],["mat-icon-button","","aria-label","Toggle menu",1,"more-button",3,"matMenuTriggerFor"],["xPosition","before"],["mat-menu-item",""],[1,"dashboard-card-content"]],template:function(i,n){1&i&&(e.j41(0,"div",1)(1,"h1",2),e.EFF(2,"Dashboard"),e.k0s(),e.j41(3,"mat-card")(4,"mat-card-header")(5,"mat-card-title"),e.EFF(6,"Read the introduction"),e.k0s(),e.j41(7,"mat-card-subtitle"),e.EFF(8,"New to Ariton (alpha)? Check out the introduction."),e.k0s()(),e.j41(9,"mat-card-actions")(10,"button",3),e.EFF(11," READ INTRODUCTION "),e.k0s(),e.j41(12,"button",4),e.EFF(13,"HIDE"),e.k0s()()(),e.j41(14,"mat-grid-list",5),e.Z7z(15,Dt,17,4,"mat-grid-tile",6,e.fX1),e.nI1(17,"async"),e.k0s()()),2&i&&(e.R7$(10),e.Y8G("routerLink",e.lJ4(3,Rt)),e.R7$(5),e.Dyx(e.bMT(17,1,n.cards)))},dependencies:[S.Jj,ct,dt,j,It,v,T,St,Z.m_,Z.An,G.Hl,G.$z,G.iY,g.Hu,g.RN,g.YY,g.m2,g.MM,g.Lc,g.dh,W.iI,W.Wk],styles:[".grid-container[_ngcontent-%COMP%]{margin:20px}.dashboard-card[_ngcontent-%COMP%]{position:absolute;inset:15px}.more-button[_ngcontent-%COMP%]{position:absolute;top:5px;right:10px}.dashboard-card-content[_ngcontent-%COMP%]{text-align:center}"]})}return o})()}}]);