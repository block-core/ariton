import{G as O,H as C,e as k,f,i as l,j as z,k as c}from"./chunk-34GJPC4A.js";import{A as p,Aa as D,D as y,E as _,Wa as d,X as b,aa as m,ba as v,cb as u,f as g,fa as a,i as h,la as w,ma as x,p as R,rc as S}from"./chunk-7ERSWMWX.js";var V=20,T=(()=>{let i=class i{constructor(e,t,n){this._ngZone=e,this._platform=t,this._scrolled=new h,this._globalSubscription=null,this._scrolledCount=0,this.scrollContainers=new Map,this._document=n}register(e){this.scrollContainers.has(e)||this.scrollContainers.set(e,e.elementScrolled().subscribe(()=>this._scrolled.next(e)))}deregister(e){let t=this.scrollContainers.get(e);t&&(t.unsubscribe(),this.scrollContainers.delete(e))}scrolled(e=V){return this._platform.isBrowser?new g(t=>{this._globalSubscription||this._addGlobalListener();let n=e>0?this._scrolled.pipe(_(e)).subscribe(t):this._scrolled.subscribe(t);return this._scrolledCount++,()=>{n.unsubscribe(),this._scrolledCount--,this._scrolledCount||this._removeGlobalListener()}}):R()}ngOnDestroy(){this._removeGlobalListener(),this.scrollContainers.forEach((e,t)=>this.deregister(t)),this._scrolled.complete()}ancestorScrolled(e,t){let n=this.getAncestorScrollContainers(e);return this.scrolled(t).pipe(y(r=>!r||n.indexOf(r)>-1))}getAncestorScrollContainers(e){let t=[];return this.scrollContainers.forEach((n,r)=>{this._scrollableContainsElement(r,e)&&t.push(r)}),t}_getWindow(){return this._document.defaultView||window}_scrollableContainsElement(e,t){let n=k(t),r=e.getElementRef().nativeElement;do if(n==r)return!0;while(n=n.parentElement);return!1}_addGlobalListener(){this._globalSubscription=this._ngZone.runOutsideAngular(()=>{let e=this._getWindow();return p(e.document,"scroll").subscribe(()=>this._scrolled.next())})}_removeGlobalListener(){this._globalSubscription&&(this._globalSubscription.unsubscribe(),this._globalSubscription=null)}};i.\u0275fac=function(t){return new(t||i)(a(u),a(f),a(S,8))},i.\u0275prov=m({token:i,factory:i.\u0275fac,providedIn:"root"});let s=i;return s})(),Ce=(()=>{let i=class i{constructor(e,t,n,r){this.elementRef=e,this.scrollDispatcher=t,this.ngZone=n,this.dir=r,this._destroyed=new h,this._elementScrolled=new g(o=>this.ngZone.runOutsideAngular(()=>p(this.elementRef.nativeElement,"scroll").pipe(b(this._destroyed)).subscribe(o)))}ngOnInit(){this.scrollDispatcher.register(this)}ngOnDestroy(){this.scrollDispatcher.deregister(this),this._destroyed.next(),this._destroyed.complete()}elementScrolled(){return this._elementScrolled}getElementRef(){return this.elementRef}scrollTo(e){let t=this.elementRef.nativeElement,n=this.dir&&this.dir.value=="rtl";e.left==null&&(e.left=n?e.end:e.start),e.right==null&&(e.right=n?e.start:e.end),e.bottom!=null&&(e.top=t.scrollHeight-t.clientHeight-e.bottom),n&&c()!=l.NORMAL?(e.left!=null&&(e.right=t.scrollWidth-t.clientWidth-e.left),c()==l.INVERTED?e.left=e.right:c()==l.NEGATED&&(e.left=e.right?-e.right:e.right)):e.right!=null&&(e.left=t.scrollWidth-t.clientWidth-e.right),this._applyScrollToOptions(e)}_applyScrollToOptions(e){let t=this.elementRef.nativeElement;z()?t.scrollTo(e):(e.top!=null&&(t.scrollTop=e.top),e.left!=null&&(t.scrollLeft=e.left))}measureScrollOffset(e){let t="left",n="right",r=this.elementRef.nativeElement;if(e=="top")return r.scrollTop;if(e=="bottom")return r.scrollHeight-r.clientHeight-r.scrollTop;let o=this.dir&&this.dir.value=="rtl";return e=="start"?e=o?n:t:e=="end"&&(e=o?t:n),o&&c()==l.INVERTED?e==t?r.scrollWidth-r.clientWidth-r.scrollLeft:r.scrollLeft:o&&c()==l.NEGATED?e==t?r.scrollLeft+r.scrollWidth-r.clientWidth:-r.scrollLeft:e==t?r.scrollLeft:r.scrollWidth-r.clientWidth-r.scrollLeft}};i.\u0275fac=function(t){return new(t||i)(d(D),d(T),d(u),d(O,8))},i.\u0275dir=x({type:i,selectors:[["","cdk-scrollable",""],["","cdkScrollable",""]],standalone:!0});let s=i;return s})(),B=20,Re=(()=>{let i=class i{constructor(e,t,n){this._platform=e,this._change=new h,this._changeListener=r=>{this._change.next(r)},this._document=n,t.runOutsideAngular(()=>{if(e.isBrowser){let r=this._getWindow();r.addEventListener("resize",this._changeListener),r.addEventListener("orientationchange",this._changeListener)}this.change().subscribe(()=>this._viewportSize=null)})}ngOnDestroy(){if(this._platform.isBrowser){let e=this._getWindow();e.removeEventListener("resize",this._changeListener),e.removeEventListener("orientationchange",this._changeListener)}this._change.complete()}getViewportSize(){this._viewportSize||this._updateViewportSize();let e={width:this._viewportSize.width,height:this._viewportSize.height};return this._platform.isBrowser||(this._viewportSize=null),e}getViewportRect(){let e=this.getViewportScrollPosition(),{width:t,height:n}=this.getViewportSize();return{top:e.top,left:e.left,bottom:e.top+n,right:e.left+t,height:n,width:t}}getViewportScrollPosition(){if(!this._platform.isBrowser)return{top:0,left:0};let e=this._document,t=this._getWindow(),n=e.documentElement,r=n.getBoundingClientRect(),o=-r.top||e.body.scrollTop||t.scrollY||n.scrollTop||0,I=-r.left||e.body.scrollLeft||t.scrollX||n.scrollLeft||0;return{top:o,left:I}}change(e=B){return e>0?this._change.pipe(_(e)):this._change}_getWindow(){return this._document.defaultView||window}_updateViewportSize(){let e=this._getWindow();this._viewportSize=this._platform.isBrowser?{width:e.innerWidth,height:e.innerHeight}:{width:0,height:0}}};i.\u0275fac=function(t){return new(t||i)(a(f),a(u),a(S,8))},i.\u0275prov=m({token:i,factory:i.\u0275fac,providedIn:"root"});let s=i;return s})();var E=(()=>{let i=class i{};i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=w({type:i}),i.\u0275inj=v({});let s=i;return s})(),ye=(()=>{let i=class i{};i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=w({type:i}),i.\u0275inj=v({imports:[C,E,C,E]});let s=i;return s})();export{T as a,Ce as b,Re as c,E as d,ye as e};
