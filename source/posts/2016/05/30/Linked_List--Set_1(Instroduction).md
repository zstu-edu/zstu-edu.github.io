===
{
    "title":"Linked List--Set 1(Instroduction)",
    "author":"xiebaochun",
    "categories":["Data Structure"],
    "tags":[""]
}
===
# Linked List--Set 1(Instroduction)

Like arrays, Linked List is a linear data structure. Unlike arrays, linked list elements are not stored at contiguous location; the elements are linked using pointers.  
Each node in a list consists of at least two parts:

```
1) data
2) pointer to the next node
```
![linked list](http://commoninterview.com/images/Single_Linked_List.jpg)  
In javascript, we can represent a node using object.
```
<!-- var Node = {
	data = null,
	next = null
} -->
function Node(data, next){
	this.data = data || null,
	this.next = next || null 
}
```
Let us create a simple linked list width 3 nodes.
```
function Node(data, next){
	this.data = data || null,
	this.next = next || null 
}
var third = new Node(3, null);
var seconed = new Node(2, third);
var head = new Node(1, seconed);
```
Linked List Traversal
```
function Node(data, next){
	this.data = data || null,
	this.next = next || null 
}
function printList(node){
	while(node != null){
		console.log(node.data);
		printList(node.next);
	}
}
var third = new Node(3, null);
var seconed = new Node(2, third);
var head = new Node(1, seconed);
printList(head);
```
output:
```
1 2 3
```

## Linked List vs arrays

Both Arrays and Linked List can be used to store linear data of similar types, but they both have some advantages and disadvantages over each other.

Following are the points in favour of Linked Lists.

(1)	The size of the arrays is fixed: So we must know the upper limit on the number of elements in advance. Also, generally, the allocated memory is equal to the upper limit irrespective of the usage, and in practical uses, upper limit is rarely reached.

(2)	Inserting a new element in an array of elements is expensive, because room has to be created for the new elements and to create room existing elements have to shifted.

For example, suppose we maintain a sorted list of IDs in an array id[].

id[] = [1000, 1010, 1050, 2000, 2040, …..].

And if we want to insert a new ID 1005, then to maintain the sorted order, we have to move all the elements after 1000 (excluding 1000).

Deletion is also expensive with arrays until unless some special techniques are used. For example, to delete 1010 in id[], everything after 1010 has to be moved.

So Linked list provides following two advantages over arrays
1)	Dynamic size
2)	Ease of insertion/deletion

Linked lists have following drawbacks:
1)	Random access is not allowed. We have to access elements sequentially starting from the first node. So we cannot do binary search with linked lists.
2)	Extra memory space for a pointer is required with each element of the list.
3) Arrays have better cache locality that can make a pretty big difference in performance.

Please also see this thread.

References:
http://cslibrary.stanford.edu/103/LinkedListBasics.pdf

Please write comments if you find anything incorrect, or you want to share more information about the topic discussed above.






