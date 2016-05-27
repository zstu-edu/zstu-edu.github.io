===
{
    "title":"Some algorithms of javascript",
    "author":"xiebaochun",
    "categories":["web"],
    "tags":["javasctipt","algorithm"]
}
===

# Some algorithms of javascript

## Array unique
### The best & fast algorithm to find unique items in array
This method is kind of cheeky in its implementation.It uses the Javascript's object to add every item in the array as key.As we all know,
objects accepts only unique keys and sure we did capitalize on that.
```
Array.prototype.unique = function() {
	var o = {}, i, l = this.length, r = [];
	for(var i=0; i<l;i++) o[this[i]] = this[i];
	for(var i in o) r.push(o[i]);
	return r;
};
``` 
This is somewhat classified as “Hash Sieving” method and can also be related to a somewhat modified “Hash Sorting Algorithm” where every item in the array is a hash value and a hash function inserts item into a bucket, replacing existing values in case of hash collision. As such, this can be applied to any programming language for faster sieving of very large arrays.

This algorithm has a linear time complexity of O(2n) in worst case scenario. This is way better than what we will observe for the classic method as described below.

### About the classic method
The classic (and most popular) method of finding unique items in an array runs two loops in a nested order to compare each element with rest of the elements. Consequently, the time complexity of the classic method to find the unique items in an array is around quadratic O(n²).

This is not a good thing when you have to find unique items within array of 10,000 items.
```javascript
Array.prototype.unique = function() {
    var a = [], l = this.length;
    for(var i=0; i<l; i++) {
      for(var j=i+1; j<l; j++)
            if (this[i] === this[j]) j = ++i;
      a.push(this[i]);
    }
    return a;
};
```
### Comparing the above two algorithms
Test Data: An array of elements having N random integers.

| Sample (N) | Average 	Case	|		| Best Case		|      |
| --- | --- | --- | --- | --- |
| 			 | Classic			|New	| Classic		| New	|
| 50		 | 0.43				|0.25	| 0.01			| 0.02	|
| 100		 | 0.60				|0.30	| 0.09			| 0.16	|
| 500		 | 9.57				|0.87	| 0.1			| 0.2	|
| 1000		 | 24.44			|1.51	| 0.21			| 0.31	|
| 5000		 | 584.28			|7.74	| 0.4			| 1.0	|
| 10000		 | 2360.90			|15.03	| 0.7			| 1.8	|

### Conclusion
This method of finding unique items within an array seems to be particularly useful for large arrays that are tending towards the real-life situations. When there are more items in an array that are similar, there is not much of a difference in performance and in fact, the classic algorithm scores better by a small margin. However, as the array gets more random, the runtime of the classic algorithm increases manifold.

## 