;(function(w,d){
	function jQuery(selector) {
		var _domObject = {};
		if(/^#/.test( selector )) {
			_domObject.dom = document.getElementById(selector.replace(/^#/,''));
		}else if(/^\./.test( selector )) {
			_domObject.doms = p.getElementByClass(selector.replace(/^\./,''));
		}
		return _domObject;
	}
	var p = jQuery.prototype;
	p.each = function( o, cb ) {
		//console.log(typeof o);
		if(Array.isArray(o)){ 
			var length = o.length, i = 0;
			for( ; i < length; i++){
				cb.call( o[i], i, o[i] );
			}
		}
	}
	p.getElementByClass = function(className, parent) {
		  parent || (parent = document);
		  var descendants= parent.getElementsByTagName('*'), i=-1, e, result=[];
		  while (e=descendants[++i]) {
		    ((' '+(e['class']||e.className)+' ').indexOf(' '+className+' ') > -1) && result.push(e);
		  }
		  return result;
	}
	window['$'] = jQuery;
})(window,document);


