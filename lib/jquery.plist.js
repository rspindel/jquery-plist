(function($) {
	
	function parseDate(node) {
		return new Date();
	}
	
	function parseDict(nodes) {
		return { };
	}
	
	function parseArray(nodes) {
		return [ ];
	}
	
	function parse(node) {
		console.log(node);
		switch ( node.tagName ) {
			case 'dict'   : return dict(node.childNodes);
			case 'array'  : return array(node.childNodes);
			case 'string' : return node.textContent;
			case 'number' : return parseFloat(node.textContent);
			case 'date'   : return node.textContent;
			case 'true'   : return true;
			case 'false'  : return false;
			default:
				throw "Unable to deserialize " + node.tagName;
		}
	}
	
	$.plist = function(xml) {
		return parse( $(xml).find('plist > *').get(0) );
	};
	
})(jQuery);
