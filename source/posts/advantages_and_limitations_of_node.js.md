===
{
    "title":"Advantages and limitations of node.js",
    "author":"xiebaochun",
    "categories":["node.js"],
    "tags":["node.js","architecture"]
}
===
# Advantages and limitations of node.js

Today, Node.js is the most popular and widely used server side framework for small, large and any sized web app and web application development.

The advantages of Node.js are listed below:

**Open Source**

Node.js is open source, so it’s free to use and no need to pay for license. There are also many open source modules supported by Node.js.
JavaScript as Programming Language
It uses JavaScript as a programming language for both front-end and back-end which increase programmer productivity and code reusability.

**Scalable**

You can scale your Node.js application by using two ways – Horizontal Scaling and Vertical Scaling, which helps you to improve your application performance.
In Horizontal scaling you can add more nodes to your existing system.
In Vertical scaling you can add more resources to a single node.

**Better Performance**

It provides better performance, since Node.js I/O operations are non-blocking. Also, it uses V8 JavaScript engine to execute JavaScript code. V8 engine compiles the JS code directly into machine code which make it fast.

**Caching Support**

Node.js supports caching of modules. Hence, when a Node.js modules is requested first time, it is cached into the application memory. So next calls for loading the same module may not cause the module code to be executed again.

**Lightweight and Extensible**

Node.js is based on JavaScript which can be executed on client side as well as server side. Also, it supports exchange of data using JSON which is easily consumed by JavaScript. This makes it light weight as compared to other frameworks.
Node.js is open source. Hence you can extend it as per your need.

**REST API Support**

Using Node.js you can also develop RESTful services API easily.

**Unit Testing**

It supports unit testing out of box. You can use any JS unit testing frameworks like Jasmin to test your Node.js code.

**Server Development**

Node.js has some built-in API which help you to create different types of Server like HTTP Server, DNS Server, TCP Server etc.

**Community Support**

Node.js has a wide community of developers around the world. They are active in development of new modules or packages to support different types of applications development.
#### Limitations of Node.js
There are following limitations of Node.js:
+ It doesn’t support multi-threaded programming.
+ It doesn’t support very high computational intensive tasks. When it executes long running task, it will queue all the incoming requests to wait for execution, since it follows JavaScript event loop which is single threaded.
+ Node good for executing synchronous and CPU intensive tasks.
#### What do you think?
I hope you have enjoyed the advantages and limitations of Node.js. I would like to have feedback from my blog readers. Your valuable feedback, question, or comments about this article are always welcome.

#### Referrence
[Advantages and Limitations of Node.js](http://www.dotnet-tricks.com/Tutorial/nodejs/U91V311215-Advantages-and-Limitations-of-Node.js.html)