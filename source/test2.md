---
title: Xcode中断点的威力
author: BeyondVincent
layout: post

simplecatch-sidebarlayout:
  - 
duoshuo_thread_id:
  - 1248139211572248689
ludou_ratings_score:
  - 1
categories:
  - iOS翻译
tags:
  - Xcode
---
注：本文由破船译自：<span style="text-decoration: underline;"><strong><span style="color: #339966; text-decoration: underline;"><a href="http://www.albertopasca.it/whiletrue/2013/06/xcode-power-of-breakpoints/" target="_blank"><span style="color: #339966; text-decoration: underline;">albertopasca</span></a></span></strong></span>  
本文由**<span style="color: #339966;">HoNooD</span>**在**<span style="text-decoration: underline;"><span style="color: #339966; text-decoration: underline;"><a href="http://iosfeed.com/view/76" target="_blank"><span style="color: #339966; text-decoration: underline;">iosfeed</span></a></span></span>**站点上做了推荐。

这里先推荐两篇Xcode相关的文章：  
**<span style="text-decoration: underline;"><span style="color: #339966; text-decoration: underline;"><a href="http://beyondvincent.com/2013/05/31/xcode-code-snippets/" target="_blank"><span style="color: #339966; text-decoration: underline;">Xcode Code Snippets</span></a></span></span>**  
**<span style="text-decoration: underline;"><span style="color: #339966; text-decoration: underline;"> <a href="http://beyondvincent.com/2013/05/16/ios%E4%B8%AD%E8%B0%83%E8%AF%95-%E5%9F%BA%E6%9C%AC%E6%8A%80%E5%B7%A7/" target="_blank"><span style="color: #339966; text-decoration: underline;">iOS调试 — 基本技巧</span></a></span></span>**

本文目录：

**<span style="color: #339966;">1、添加一个特殊的断点</span>**  
**<span style="color: #339966;">    异常断点(Exception breakpoint)</span>**  
**<span style="color: #339966;">    符号断点(Symbolic breakpoint)</span>**  
**<span style="color: #339966;">2、打印到控制台</span>**  
**<span style="color: #339966;">    使用NSLog打印字符串</span>**  
**<span style="color: #339966;">    使用NSLog打印对象(po)</span>**  
**<span style="color: #339966;">    带条件的打印</span>**  
**<span style="color: #339966;">    在循环里面打印一些东西</span>**  
**<span style="color: #339966;">3、运行时设置断点</span>**  
**<span style="color: #339966;">4、调试中播放声音</span>**  
**<span style="color: #339966;">5、LLDB中有用的一些命令</span>**  
**<span style="color: #339966;">    打印帮助</span>**  
**<span style="color: #339966;">    打印调用栈</span>**  
**<span style="color: #339966;">    打印最基本的内容 (p)</span>**  
**<span style="color: #339966;">    打印对象(po)</span>**  
**<span style="color: #339966;">    打印表达式(expr)</span>**  
**<span style="color: #339966;">    打印线程中的一些东西</span>**

&nbsp;

正文

下面是非常有用的一些Xcode调试技术(使用断点和LLDB调试器)

1、添加一个特殊的断点

*   异常断点(Exception breakpoint)

如果添加了异常断点，当程序每次发生了异常，都会被中断。**<span style="color: #339966;">一般用来捕获未知异常</span>**。如下示例：

<pre class="wp-code-highlight prettyprint linenums:1">*** Terminating app due to uncaught exception ’NSRangeException’, reason:
’-[__NSCFArray objectAtIndex:]: index (10) beyond bounds (3)</pre>

[<img class="alignnone size-full wp-image-1497" alt="xcode-debug-01" src="http://beyondvincent.com/wp-content/uploads/2013/07/xcode-debug-01.png" width="1049" height="654" />][1]

*   符号断点(Symbolic breakpoint)

符号断点可以中断某个函数的调用。

<pre class="wp-code-highlight prettyprint linenums:1">- [UIViewController viewDidLoad]
- [__NSCFArray objectAtIndex:]</pre>

[<img class="alignnone size-full wp-image-1498" alt="xcode-debug-02" src="http://beyondvincent.com/wp-content/uploads/2013/07/xcode-debug-02.png" width="1049" height="654" />][2]

&nbsp;

2、打印到控制台

*   使用NSLog打印字符串

使用断点来替换NSLog代码(或者在运行时添加一个NSLog)——与代码写NSLog的效果相同。

[<img class="alignnone size-full wp-image-1499" alt="xcode-debug-04" src="http://beyondvincent.com/wp-content/uploads/2013/07/xcode-debug-04.png" width="1030" height="654" />][3]

![Atl xcode-debug-04](http://beyondvincent.com/wp-content/uploads/2013/07/xcode-debug-04.png)

&nbsp;

*   使用NSLog打印对象(po)

<pre class="wp-code-highlight prettyprint linenums:1">NSLog(@"obj: %@", obj);</pre>

[<img class="alignnone size-full wp-image-1500" alt="xcode-debug-05" src="http://beyondvincent.com/wp-content/uploads/2013/07/xcode-debug-05.png" width="1030" height="654" />][4]

*   带条件的打印

例如：当aNumber大于10才打印出“str”的内容。

<pre class="wp-code-highlight prettyprint linenums:1">expr (void)NSLog(@"Ok, print a log: %@", str)</pre>

[<img class="alignnone size-full wp-image-1501" alt="xcode-debug-07" src="http://beyondvincent.com/wp-content/uploads/2013/07/xcode-debug-07.png" width="1030" height="681" />][5]

&nbsp;

*   在循环里面打印一些东西

例如，在循环中希望i大于5才开始打印。

<pre class="wp-code-highlight prettyprint linenums:1">for ( int i=0; i&lt;10; i++ )
{
[self self]; // something
}</pre>

使用“ignore”值，并利用下面的代码进行打印：

<pre class="wp-code-highlight prettyprint linenums:1">expr (void)NSLog(@"Ok, print a log: %@", str)</pre>

<img class="alignnone size-full wp-image-1502" alt="xcode-debug-08" src="http://beyondvincent.com/wp-content/uploads/2013/07/xcode-debug-08.png" width="1030" height="681" />

3、运行时设置断点

在运行的时候，根据条件设置断点有时候非常有用。

<pre class="wp-code-highlight prettyprint linenums:1">breakpoint set -f APViewController.m -l 33</pre>

[<img class="alignnone size-full wp-image-1503" alt="xcode-debug-09" src="http://beyondvincent.com/wp-content/uploads/2013/07/xcode-debug-09.png" width="1030" height="681" />][6]

4、调试中播放声音

[<img class="alignnone size-full wp-image-1504" alt="Schermata-06-2456470-alle-15.43.13" src="http://beyondvincent.com/wp-content/uploads/2013/07/Schermata-06-2456470-alle-15.43.13.png" width="475" height="304" />][7]

5、LLDB中有用的一些命令

当Xcode停留在某个断点时，我们可以通过控制台(console)与**<span style="color: #339966;">lldb</span>**进行交互。

*   打印帮助

<pre class="wp-code-highlight prettyprint linenums:1">(lldb) help</pre>

*   打印调用栈(bt)

<pre class="wp-code-highlight prettyprint linenums:1">(lldb) bt
* thread #1: tid = 0x1c03, 0x00003146 Debug`-[APViewController callMe:andANumber:](self=0x07187e50, _cmd=0x000038b9, str=0x0715aa40, aNum=38) + 230 at APViewController.m:33, stop reason = breakpoint 3.1
frame #0: 0x00003146 Debug`-[APViewController callMe:andANumber:](self=0x07187e50, _cmd=0x000038b9, str=0x0715aa40, aNum=38) + 230 at APViewController.m:33
frame #1: 0x0000304a Debug`-[APViewController viewDidLoad](self=0x07187e50, _cmd=0x005c5a77) + 122 at APViewController.m:16
frame #2: 0x000f41c7 UIKit`-[UIViewController loadViewIfRequired] + 536
frame #3: 0x000f4232 UIKit`-[UIViewController view] + 33
frame #4: 0x000433d5 UIKit`-[UIWindow addRootViewControllerViewIfPossible] + 66
frame #5: 0x0004376f UIKit`-[UIWindow _setHidden:forced:] + 368
frame #6: 0x00043905 UIKit`-[UIWindow _orderFrontWithoutMakingKey] + 49
frame #7: 0x0004c917 UIKit`-[UIWindow makeKeyAndVisible] + 65
frame #8: 0x00002e1b Debug`-[APAppDelegate application:didFinishLaunchingWithOptions:](self=0x07560750, _cmd=0x005a9c21, application=0x0716a640, launchOptions=0x00000000) + 571 at APAppDelegate.m:28
frame #9: 0x00010157 UIKit`-[UIApplication _handleDelegateCallbacksWithOptions:isSuspended:restoreState:] + 266
frame #10: 0x00010747 UIKit`-[UIApplication _callInitializationDelegatesForURL:payload:suspended:] + 1248
frame #11: 0x0001194b UIKit`-[UIApplication _runWithURL:payload:launchOrientation:statusBarStyle:statusBarHidden:] + 805
frame #12: 0x00022cb5 UIKit`-[UIApplication handleEvent:withNewEvent:] + 1022
frame #13: 0x00023beb UIKit`-[UIApplication sendEvent:] + 85
frame #14: 0x00015698 UIKit`_UIApplicationHandleEvent + 9874
frame #15: 0x01becdf9 GraphicsServices`_PurpleEventCallback + 339
frame #16: 0x01becad0 GraphicsServices`PurpleEventCallback + 46
frame #17: 0x01c06bf5 CoreFoundation`__CFRUNLOOP_IS_CALLING_OUT_TO_A_SOURCE1_PERFORM_FUNCTION__ + 53
frame #18: 0x01c06962 CoreFoundation`__CFRunLoopDoSource1 + 146
frame #19: 0x01c37bb6 CoreFoundation`__CFRunLoopRun + 2118
frame #20: 0x01c36f44 CoreFoundation`CFRunLoopRunSpecific + 276
frame #21: 0x01c36e1b CoreFoundation`CFRunLoopRunInMode + 123
frame #22: 0x0001117a UIKit`-[UIApplication _run] + 774
frame #23: 0x00012ffc UIKit`UIApplicationMain + 1211
frame #24: 0x00002b22 Debug`main(argc=1, argv=0xbffff3a4) + 130 at main.m:16
frame #25: 0x00002a55 Debug`start + 53
(lldb)</pre>

*   打印最基本的内容 (p)

<pre class="wp-code-highlight prettyprint linenums:1">(lldb) print anInt</pre>

*   打印对象(po)

<pre class="wp-code-highlight prettyprint linenums:1">(lldb) po anObj
(lldb) po 0x0715aa40</pre>

*   打印表达式(expr)

<pre class="wp-code-highlight prettyprint linenums:1">(lldb) expr 5+2
(lldb) expr aString = @"aNewValue"</pre>

*   打印线程中的一些东西

<pre class="wp-code-highlight prettyprint linenums:1">(lldb) help frame</pre>

<div style="text-align: left;">
  <span style="color: #808080;">本文由<strong><span style="text-decoration: underline; color: #339966;"><a href="http://beyondvincent.com/"><span style="color: #339966; text-decoration: underline;">破船</span></a></span></strong>翻译●转载请注明出处●<time datetime="2013-05-18T17:37:00+08:00" data-updated="true">2013-07-01</time></span>
</div>

 [1]: http://beyondvincent.com/wp-content/uploads/2013/07/xcode-debug-01.png
 [2]: http://beyondvincent.com/wp-content/uploads/2013/07/xcode-debug-02.png
 [3]: http://beyondvincent.com/wp-content/uploads/2013/07/xcode-debug-04.png
 [4]: http://beyondvincent.com/wp-content/uploads/2013/07/xcode-debug-05.png
 [5]: http://beyondvincent.com/wp-content/uploads/2013/07/xcode-debug-07.png
 [6]: http://beyondvincent.com/wp-content/uploads/2013/07/xcode-debug-09.png
 [7]: http://beyondvincent.com/wp-content/uploads/2013/07/Schermata-06-2456470-alle-15.43.13.png