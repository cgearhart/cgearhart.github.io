/*! jQuery Waypoints v2.0.1 | Copyright (c) 2011-2013 Caleb Troughton | Dual licensed under the MIT license and GPL license. | https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt */
(function(){var t,e,n,r,i,o,l,s,f,u,a,c,h,d,p,w,y=[].indexOf||function(t){for(var e=0,n=this.length;e<n;e++){if(e in this&&this[e]===t)return e}return-1},v=[].slice;t=window.jQuery;e=t(window);i={horizontal:{},vertical:{}};o=1;s={};l="waypoints-context-id";a="resize.waypoints";c="scroll.waypoints";h=1;d="waypoints-waypoint-ids";p="waypoint";w="waypoints";n=function(){function e(e){var n=this;this.$element=e;this.element=e[0];this.didResize=false;this.didScroll=false;this.id="context"+o++;this.oldScroll={x:e.scrollLeft(),y:e.scrollTop()};this.waypoints={horizontal:{},vertical:{}};e.data(l,this.id);s[this.id]=this;e.bind(c,function(){var e;if(!n.didScroll){n.didScroll=true;e=function(){n.doScroll();return n.didScroll=false};return window.setTimeout(e,t[w].settings.scrollThrottle)}});e.bind(a,function(){var e;if(!n.didResize){n.didResize=true;e=function(){t[w]("refresh");return n.didResize=false};return window.setTimeout(e,t[w].settings.resizeThrottle)}})}e.prototype.doScroll=function(){var e,n=this;e={horizontal:{newScroll:this.$element.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.$element.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};if(y.call(window,"ontouchstart")>=0&&(!e.vertical.oldScroll||!e.vertical.newScroll)){t[w]("refresh")}t.each(e,function(e,r){var i,o,l;l=[];o=r.newScroll>r.oldScroll;i=o?r.forward:r.backward;t.each(n.waypoints[e],function(t,e){var n,i;if(r.oldScroll<(n=e.offset)&&n<=r.newScroll){return l.push(e)}else if(r.newScroll<(i=e.offset)&&i<=r.oldScroll){return l.push(e)}});l.sort(function(t,e){return t.offset-e.offset});if(!o){l.reverse()}return t.each(l,function(t,e){if(e.options.continuous||t===l.length-1){return e.trigger([i])}})});return this.oldScroll={x:e.horizontal.newScroll,y:e.vertical.newScroll}};e.prototype.refresh=function(){var e,n,r,i=this;r=t.isWindow(this.element);n=this.$element.offset();this.doScroll();e={horizontal:{contextOffset:r?0:n.left,contextScroll:r?0:this.oldScroll.x,contextDimension:this.$element.width(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:r?0:n.top,contextScroll:r?0:this.oldScroll.y,contextDimension:r?t[w]("viewportHeight"):this.$element.height(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};return t.each(e,function(e,n){return t.each(i.waypoints[e],function(e,r){var i,o,l,s,f;i=r.options.offset;l=r.offset;o=t.isWindow(r.element)?0:r.$element.offset()[n.offsetProp];if(t.isFunction(i)){i=i.apply(r.element)}else if(typeof i==="string"){i=parseFloat(i);if(r.options.offset.indexOf("%")>-1){i=Math.ceil(n.contextDimension*i/100)}}r.offset=o-n.contextOffset+n.contextScroll-i;if(r.options.onlyOnScroll&&l!=null||!r.enabled){return}if(l!==null&&l<(s=n.oldScroll)&&s<=r.offset){return r.trigger([n.backward])}else if(l!==null&&l>(f=n.oldScroll)&&f>=r.offset){return r.trigger([n.forward])}else if(l===null&&n.oldScroll>=r.offset){return r.trigger([n.forward])}})})};e.prototype.checkEmpty=function(){if(t.isEmptyObject(this.waypoints.horizontal)&&t.isEmptyObject(this.waypoints.vertical)){this.$element.unbind([a,c].join(" "));return delete s[this.id]}};return e}();r=function(){function e(e,n,r){var o,l;r=t.extend({},t.fn[p].defaults,r);if(r.offset==="bottom-in-view"){r.offset=function(){var e;e=t[w]("viewportHeight");if(!t.isWindow(n.element)){e=n.$element.height()}return e-t(this).outerHeight()}}this.$element=e;this.element=e[0];this.axis=r.horizontal?"horizontal":"vertical";this.callback=r.handler;this.context=n;this.enabled=r.enabled;this.id="waypoints"+h++;this.offset=null;this.options=r;n.waypoints[this.axis][this.id]=this;i[this.axis][this.id]=this;o=(l=e.data(d))!=null?l:[];o.push(this.id);e.data(d,o)}e.prototype.trigger=function(t){if(!this.enabled){return}if(this.callback!=null){this.callback.apply(this.element,t)}if(this.options.triggerOnce){return this.destroy()}};e.prototype.disable=function(){return this.enabled=false};e.prototype.enable=function(){this.context.refresh();return this.enabled=true};e.prototype.destroy=function(){delete i[this.axis][this.id];delete this.context.waypoints[this.axis][this.id];return this.context.checkEmpty()};e.getWaypointsByElement=function(e){var n,r;r=t(e).data(d);if(!r){return[]}n=t.extend({},i.horizontal,i.vertical);return t.map(r,function(t){return n[t]})};return e}();u={init:function(e,i){var o;if(i==null){i={}}if((o=i.handler)==null){i.handler=e}this.each(function(){var e,o,f,u;e=t(this);f=(u=i.context)!=null?u:t.fn[p].defaults.context;if(!t.isWindow(f)){f=e.closest(f)}f=t(f);o=s[f.data(l)];if(!o){o=new n(f)}return new r(e,o,i)});t[w]("refresh");return this},disable:function(){return u._invoke(this,"disable")},enable:function(){return u._invoke(this,"enable")},destroy:function(){return u._invoke(this,"destroy")},prev:function(t,e){return u._traverse.call(this,t,e,function(t,e,n){if(e>0){return t.push(n[e-1])}})},next:function(t,e){return u._traverse.call(this,t,e,function(t,e,n){if(e<n.length-1){return t.push(n[e+1])}})},_traverse:function(e,n,r){var i,o;if(e==null){e="vertical"}if(n==null){n=window}o=f.aggregate(n);i=[];this.each(function(){var n;n=t.inArray(this,o[e]);return r(i,n,o[e])});return this.pushStack(i)},_invoke:function(e,n){e.each(function(){var e;e=r.getWaypointsByElement(this);return t.each(e,function(t,e){e[n]();return true})});return this}};t.fn[p]=function(){var e,n;n=arguments[0],e=2<=arguments.length?v.call(arguments,1):[];if(u[n]){return u[n].apply(this,e)}else if(t.isFunction(n)){return u.init.apply(this,arguments)}else if(t.isPlainObject(n)){return u.init.apply(this,[null,n])}else if(!n){return t.error("jQuery Waypoints needs a callback function or handler option.")}else{return t.error("The "+n+" method does not exist in jQuery Waypoints.")}};t.fn[p].defaults={context:window,continuous:true,enabled:true,horizontal:false,offset:0,triggerOnce:false};f={refresh:function(){return t.each(s,function(t,e){return e.refresh()})},viewportHeight:function(){var t;return(t=window.innerHeight)!=null?t:e.height()},aggregate:function(e){var n,r,o;n=i;if(e){n=(o=s[t(e).data(l)])!=null?o.waypoints:void 0}if(!n){return[]}r={horizontal:[],vertical:[]};t.each(r,function(e,i){t.each(n[e],function(t,e){return i.push(e)});i.sort(function(t,e){return t.offset-e.offset});r[e]=t.map(i,function(t){return t.element});return r[e]=t.unique(r[e])});return r},above:function(t){if(t==null){t=window}return f._filter(t,"vertical",function(t,e){return e.offset<=t.oldScroll.y})},below:function(t){if(t==null){t=window}return f._filter(t,"vertical",function(t,e){return e.offset>t.oldScroll.y})},left:function(t){if(t==null){t=window}return f._filter(t,"horizontal",function(t,e){return e.offset<=t.oldScroll.x})},right:function(t){if(t==null){t=window}return f._filter(t,"horizontal",function(t,e){return e.offset>t.oldScroll.x})},enable:function(){return f._invoke("enable")},disable:function(){return f._invoke("disable")},destroy:function(){return f._invoke("destroy")},extendFn:function(t,e){return u[t]=e},_invoke:function(e){var n;n=t.extend({},i.vertical,i.horizontal);return t.each(n,function(t,n){n[e]();return true})},_filter:function(e,n,r){var i,o;i=s[t(e).data(l)];if(!i){return[]}o=[];t.each(i.waypoints[n],function(t,e){if(r(i,e)){return o.push(e)}});o.sort(function(t,e){return t.offset-e.offset});return t.map(o,function(t){return t.element})}};t[w]=function(){var t,e;e=arguments[0],t=2<=arguments.length?v.call(arguments,1):[];if(f[e]){return f[e].apply(null,t)}else{return f.aggregate.call(null,e)}};t[w].settings={resizeThrottle:100,scrollThrottle:30};e.load(function(){return t[w]("refresh")})}).call(this);

/*! Bootstrap.js by @fat & @mdo | plugins: bootstrap-transition.js, bootstrap-scrollspy.js, bootstrap-tooltip.js, bootstrap-affix.js | Copyright 2012 Twitter, Inc. | http://www.apache.org/licenses/LICENSE-2.0.txt*/
!function(a){a(function(){a.support.transition=function(){var a=function(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"},c;for(c in b)if(a.style[c]!==undefined)return b[c]}();return a&&{end:a}}()})}(window.jQuery),!function(a){function b(b,c){var d=a.proxy(this.process,this),e=a(b).is("body")?a(window):a(b),f;this.options=a.extend({},a.fn.scrollspy.defaults,c),this.$scrollElement=e.on("scroll.scroll-spy.data-api",d),this.selector=(this.options.target||(f=a(b).attr("href"))&&f.replace(/.*(?=#[^\s]+$)/,"")||"")+" .nav li > a",this.$body=a("body"),this.refresh(),this.process()}b.prototype={constructor:b,refresh:function(){var b=this,c;this.offsets=a([]),this.targets=a([]),c=this.$body.find(this.selector).map(function(){var c=a(this),d=c.data("target")||c.attr("href"),e=/^#\w/.test(d)&&a(d);return e&&e.length&&[[e.position().top+(!a.isWindow(b.$scrollElement.get(0))&&b.$scrollElement.scrollTop()),d]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){b.offsets.push(this[0]),b.targets.push(this[1])})},process:function(){var a=this.$scrollElement.scrollTop()+this.options.offset,b=this.$scrollElement[0].scrollHeight||this.$body[0].scrollHeight,c=b-this.$scrollElement.height(),d=this.offsets,e=this.targets,f=this.activeTarget,g;if(a>=c)return f!=(g=e.last()[0])&&this.activate(g);for(g=d.length;g--;)f!=e[g]&&a>=d[g]&&(!d[g+1]||a<=d[g+1])&&this.activate(e[g])},activate:function(b){var c,d;this.activeTarget=b,a(this.selector).parent(".active").removeClass("active"),d=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',c=a(d).parent("li").addClass("active"),c.parent(".dropdown-menu").length&&(c=c.closest("li.dropdown").addClass("active")),c.trigger("activate")}};var c=a.fn.scrollspy;a.fn.scrollspy=function(c){return this.each(function(){var d=a(this),e=d.data("scrollspy"),f=typeof c=="object"&&c;e||d.data("scrollspy",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.scrollspy.Constructor=b,a.fn.scrollspy.defaults={offset:10},a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=c,this},a(window).on("load",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);b.scrollspy(b.data())})})}(window.jQuery),!function(a){var b=function(a,b){this.init("tooltip",a,b)};b.prototype={constructor:b,init:function(b,c,d){var e,f,g,h,i;this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.enabled=!0,g=this.options.trigger.split(" ");for(i=g.length;i--;)h=g[i],h=="click"?this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this)):h!="manual"&&(e=h=="hover"?"mouseenter":"focus",f=h=="hover"?"mouseleave":"blur",this.$element.on(e+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(f+"."+this.type,this.options.selector,a.proxy(this.leave,this)));this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},getOptions:function(b){return b=a.extend({},a.fn[this.type].defaults,this.$element.data(),b),b.delay&&typeof b.delay=="number"&&(b.delay={show:b.delay,hide:b.delay}),b},enter:function(b){var c=a.fn[this.type].defaults,d={},e;this._options&&a.each(this._options,function(a,b){c[a]!=b&&(d[a]=b)},this),e=a(b.currentTarget)[this.type](d).data(this.type);if(!e.options.delay||!e.options.delay.show)return e.show();clearTimeout(this.timeout),e.hoverState="in",this.timeout=setTimeout(function(){e.hoverState=="in"&&e.show()},e.options.delay.show)},leave:function(b){var c=a(b.currentTarget)[this.type](this._options).data(this.type);this.timeout&&clearTimeout(this.timeout);if(!c.options.delay||!c.options.delay.hide)return c.hide();c.hoverState="out",this.timeout=setTimeout(function(){c.hoverState=="out"&&c.hide()},c.options.delay.hide)},show:function(){var b,c,d,e,f,g,h=a.Event("show");if(this.hasContent()&&this.enabled){this.$element.trigger(h);if(h.isDefaultPrevented())return;b=this.tip(),this.setContent(),this.options.animation&&b.addClass("fade"),f=typeof this.options.placement=="function"?this.options.placement.call(this,b[0],this.$element[0]):this.options.placement,b.detach().css({top:0,left:0,display:"block"}),this.options.container?b.appendTo(this.options.container):b.insertAfter(this.$element),c=this.getPosition(),d=b[0].offsetWidth,e=b[0].offsetHeight;switch(f){case"bottom":g={top:c.top+c.height,left:c.left+c.width/2-d/2};break;case"top":g={top:c.top-e,left:c.left+c.width/2-d/2};break;case"left":g={top:c.top+c.height/2-e/2,left:c.left-d};break;case"right":g={top:c.top+c.height/2-e/2,left:c.left+c.width}}this.applyPlacement(g,f),this.$element.trigger("shown")}},applyPlacement:function(a,b){var c=this.tip(),d=c[0].offsetWidth,e=c[0].offsetHeight,f,g,h,i;c.offset(a).addClass(b).addClass("in"),f=c[0].offsetWidth,g=c[0].offsetHeight,b=="top"&&g!=e&&(a.top=a.top+e-g,i=!0),b=="bottom"||b=="top"?(h=0,a.left<0&&(h=a.left*-2,a.left=0,c.offset(a),f=c[0].offsetWidth,g=c[0].offsetHeight),this.replaceArrow(h-d+f,f,"left")):this.replaceArrow(g-e,g,"top"),i&&c.offset(a)},replaceArrow:function(a,b,c){this.arrow().css(c,a?50*(1-a/b)+"%":"")},setContent:function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},hide:function(){function e(){var b=setTimeout(function(){c.off(a.support.transition.end).detach()},500);c.one(a.support.transition.end,function(){clearTimeout(b),c.detach()})}var b=this,c=this.tip(),d=a.Event("hide");this.$element.trigger(d);if(d.isDefaultPrevented())return;return c.removeClass("in"),a.support.transition&&this.$tip.hasClass("fade")?e():c.detach(),this.$element.trigger("hidden"),this},fixTitle:function(){var a=this.$element;(a.attr("title")||typeof a.attr("data-original-title")!="string")&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},hasContent:function(){return this.getTitle()},getPosition:function(){var b=this.$element[0];return a.extend({},typeof b.getBoundingClientRect=="function"?b.getBoundingClientRect():{width:b.offsetWidth,height:b.offsetHeight},this.$element.offset())},getTitle:function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||(typeof c.title=="function"?c.title.call(b[0]):c.title),a},tip:function(){return this.$tip=this.$tip||a(this.options.template)},arrow:function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},validate:function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},enable:function(){this.enabled=!0},disable:function(){this.enabled=!1},toggleEnabled:function(){this.enabled=!this.enabled},toggle:function(b){var c=b?a(b.currentTarget)[this.type](this._options).data(this.type):this;c.tip().hasClass("in")?c.hide():c.show()},destroy:function(){this.hide().$element.off("."+this.type).removeData(this.type)}};var c=a.fn.tooltip;a.fn.tooltip=function(c){return this.each(function(){var d=a(this),e=d.data("tooltip"),f=typeof c=="object"&&c;e||d.data("tooltip",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.tooltip.Constructor=b,a.fn.tooltip.defaults={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1},a.fn.tooltip.noConflict=function(){return a.fn.tooltip=c,this}}(window.jQuery),!function(a){var b=function(b,c){this.options=a.extend({},a.fn.affix.defaults,c),this.$window=a(window).on("scroll.affix.data-api",a.proxy(this.checkPosition,this)).on("click.affix.data-api",a.proxy(function(){setTimeout(a.proxy(this.checkPosition,this),1)},this)),this.$element=a(b),this.checkPosition()};b.prototype.checkPosition=function(){if(!this.$element.is(":visible"))return;var b=a(document).height(),c=this.$window.scrollTop(),d=this.$element.offset(),e=this.options.offset,f=e.bottom,g=e.top,h="affix affix-top affix-bottom",i;typeof e!="object"&&(f=g=e),typeof g=="function"&&(g=e.top()),typeof f=="function"&&(f=e.bottom()),i=this.unpin!=null&&c+this.unpin<=d.top?!1:f!=null&&d.top+this.$element.height()>=b-f?"bottom":g!=null&&c<=g?"top":!1;if(this.affixed===i)return;this.affixed=i,this.unpin=i=="bottom"?d.top-c:null,this.$element.removeClass(h).addClass("affix"+(i?"-"+i:""))};var c=a.fn.affix;a.fn.affix=function(c){return this.each(function(){var d=a(this),e=d.data("affix"),f=typeof c=="object"&&c;e||d.data("affix",e=new b(this,f)),typeof c=="string"&&e[c]()})},a.fn.affix.Constructor=b,a.fn.affix.defaults={offset:0},a.fn.affix.noConflict=function(){return a.fn.affix=c,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var b=a(this),c=b.data();c.offset=c.offset||{},c.offsetBottom&&(c.offset.bottom=c.offsetBottom),c.offsetTop&&(c.offset.top=c.offsetTop),b.affix(c)})})}(window.jQuery)

/* The good stuff begins here */
$(document).ready(function(){
    $('.items:eq(1)').hide();
    //Fade items on load
    $('.items .item').find('img').hide().one("load",function(){
        $(this).fadeIn(500);
    }).each(function(){
        if(this.complete) $(this).trigger("load");
    });

	//iPad detection
	var is_ios_device = (
		(navigator.userAgent.toLowerCase().indexOf("ipad") > -1) ||
		(navigator.userAgent.toLowerCase().indexOf("iphone") > -1) ||
		(navigator.userAgent.toLowerCase().indexOf("ipod") > -1)
	);

	//Disable scrolling animations on iOS devices
	if(!is_ios_device){
		jQuery(window).scroll(function() {
			scrollBanner();
		});

		//Tooltips
		$('abbr,.hint').tooltip({'placement':'top','delay':750});
	}

	//Scroll to page anchors
	$('.menu a').click(function(){
		$('html,body').animate({scrollTop: $($(this).attr('href')).offset().top},'slow');
		return false;
	});

	//CSS3 fallback for IE7/8
	$('.item:nth-child(3n+1)').css('margin-left','0px');

    $('#more').click(function(e){
        e.preventDefault();
        $('.items:eq(1)').slideDown(300);
        $(this).slideUp(300);
    })
});

function scrollBanner() {
	//Get the scoll position of the page
	scrollPos = jQuery(this).scrollTop();

	//Scroll and fade out the banner text
	$('.mainintro').css({
		'top' : (scrollPos*0.2)+"px",
	});
}