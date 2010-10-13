(function($) {
	
	function parseDate(node) {
		return new Date();
	}
	
	function parseDict(nodes) {
		console.log(nodes);
		var dict = { };
		for ( var i = 0; i < nodes.length; i += 2 ) {
			var keyNode   = nodes[i],
			    valueNode = nodes[i + 1];
			
			// sanity check to make sure this is actually a key
			if (keyNode.tagName != 'key')
				throw 'expected <key> but found <' + keyNode.tagName + '>';
			
			dict[keyNode.textContent] = parse($(valueNode));
		}
		return dict;
	}
	
	function parseArray(nodes) {
		return [ ];
	}
	
	function parse(node) {
		switch ( node[0].tagName ) {
			case 'dict'   : return parseDict(node.children());
			case 'array'  : return parseArray(node.children());
			case 'string' : return node.text();
			case 'number' : return parseFloat(node.text());
			case 'date'   : return node.text();
			case 'true'   : return true;
			case 'false'  : return false;
			default:
				throw "Unable to deserialize " + node[0].tagName;
		}
	}
	
	$.plist = function(xml) {
		return parse( $(xml).find('plist > *') );
	};
	
})(jQuery);
