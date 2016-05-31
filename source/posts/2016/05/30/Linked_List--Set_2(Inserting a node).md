===
{
    "title":"Linked List--Set 2(Inserting a node)",
    "author":"xiebaochun",
    "categories":["Data Structure"],
    "tags":[""]
}
===
# Linked List--Set 2(Inserting a node)

In this post, methods to insert a new node in linked list are discussed. A node can be added in three ways  
**1)** At the front of the linked list 
```
function Node(data, next){
	this._data = data || null;
	this._next = next || null;
}
function List(){
	this._head = null;
}
var p = List.prototype;
p.push = function(node){
	node._next = this._head;
	this._head = node;
}
``` 
**2)** After a given node.  
```
function List(){
	this._head = null;
}
var p = List.prototype;
p.push = function(pre_node,node){
	node._next = pre_node.next;
	pre_node.next = node;
}
```
**3)** At the end of the linked list.  	
```
function List(){
	this._head = null;
}
var p = List.prototype;
p.push = function(node){
	node._next = null;
	var current = this._next;
	while(current._next){
		current = current._next;
	}
	current.next = node;
}
```




