(function() {
	var Node = (function() {
		var prot = {};
		prot.val = null;
		prot.next = null;
		prot.prev = null;
		var Node = function(val) {
			var node = Object.create(prot);
			node.val = val;
			return node;
		};
		return Node;
	}());
	window.LinkedList = (function() {
		var prot = {};
		prot.add = function(val) {
			var node = Node(val);

			if (this._length) {
				this.tail.next = node;
				node.previous = this.tail;
				this.tail = node;
			} else {
				this.head = node;
				this.tail = node;
			}
			this._length += 1;

			return node;
		};
		prot.getNodeAt = function(pos) {
			var currNode = this.head;
			var len = this._length;
			var count = 1;

			if (len === 0 || pos < 1 || pos > len) {
				return null;
			}

			while (count < pos) {
				currNode = currNode.next;
				count += 1;
			}

			return currNode;
		};
		var LL = function() {
			var ll = Object.create(prot);
			ll._length = 0;
			ll.head = null;
			ll.tail = null;
			return ll;
		};
		return LL;
	}());
}());
