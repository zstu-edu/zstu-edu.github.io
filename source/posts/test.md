---
title: 'Windows Store App开发[007]视图模型与数据绑定'
author: BeyondVincent
layout: post

duoshuo_thread_id:
  - 1248139211572248630
simplecatch-sidebarlayout:
  - 
categories:
  - Step by Step
  - Windows商店应用开发
---
在程序中使用视图模型（ViewModel），可以带来很多好处，在开发中值得采纳，视图模型的使用对Metro App开发非常有帮助，通过学习MVC和MVVC你可以了解到试图模型。在这里我将介绍如何定义和使用试图模型，其中包括数据的绑定等内容。

&#160;&#160;&#160; 本次程序我以DevDiv论坛的板块为参考数据，写一个视图模型，有一个主画面，画面的左边有一个列表，列表中的数据来自试图模型中板块项列表，同时右边会显示选中板块的介绍。下面是程序的运行图，我们可以先来看看最终效果：

[<img title="1" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" border="0" alt="1" src="http://beyondvincent.com/wp-content/uploads/2013/06/1_thumb2.png" width="682" height="435" />][1] 

&#160;&#160;&#160; 本次学习内容主要包括一下几部分：

1、视图模型（ViewModel）的创建

2、添加页面

3、编写页面相关代码

4、添加资源字典

5、编写XAML

6、程序运行效果图与Demo程序

&#160;

1、视图模型（ViewModel）的创建

&#160;&#160; 对于创建具有可持续性和和可维护性的应用程序，试图模型是必须具有的一个基础部分，它可以让我将应用程序数据与呈现数据给用户的方法相分离。如果不使用视图模型的话，你会发现你的程序越来越难以维护和开发。

&#160;&#160; 在本小节，我首先使用Blank App模版创建了一个名为DevDiv_DataBinding的工程。并在其中创建一个Data目录，然后再Data目录下创建两个新的类文件。分别是ForumItem.cs和ViewModel.cs文件。

ForumItem类的代码如下

<pre class="wp-code-highlight prettyprint linenums:1">using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel;

namespace DevDiv_DataBinding.Data
{
    class ForumItem : INotifyPropertyChanged
    {
        private string name, link, info;// 论坛板块的名称,链接和描述信息
        private int topicCount; // 主题数
        public string Name
        {
            get { return name; }
            set { name = value; NotifyPropertyChanged(&quot;Name&quot;); }
        }
        public string Link
        {
            get { return link; }
            set { link = value; NotifyPropertyChanged(&quot;Link&quot;); }
        }
        public string Info
        {
            get { return info; }
            set { info = value; NotifyPropertyChanged(&quot;info&quot;); }
        }
        public int TopicCount
        {
            get { return topicCount; }
            set { topicCount = value; NotifyPropertyChanged(&quot;TopicCount&quot;); }
        }
        public event PropertyChangedEventHandler PropertyChanged;
        private void NotifyPropertyChanged(string propName)
        {
            if (PropertyChanged != null)
            {
                PropertyChanged(this, new PropertyChangedEventArgs(propName));
            }
        }
    }
}</pre>

ForumItem类是论坛中每个板块的信息：板块名称、链接、描述信息和主题数。  
  
该类中最重要的部分是实现了INotifyPropertyChanged接口，即让该类的属性可观测，Metro UI控件一个很好的特性是它们支持数据绑定，这意味着当他们所显示的可观测数据发生变化时控件将会自动更新。所以在这里让ForumItem支持可观测，那么方便UI上自动的进行更新。 

ViewModel类的代码如下：

<pre class="wp-code-highlight prettyprint linenums:1">using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel;
using System.Collections.ObjectModel;

namespace DevDiv_DataBinding.Data
{
    class ViewModel : INotifyPropertyChanged
    {
        private ObservableCollection&lt;forumitem&gt; forumItemList;
        private int selectedItemIndex;
        private string itemDetail;
        public ViewModel()
        {
            forumItemList = new ObservableCollection&lt;forumitem&gt;();
            selectedItemIndex = -1;
        }

        public int SelectedItemIndex
        {
            get { return selectedItemIndex; }
            set
            {
                selectedItemIndex = value; NotifyPropertyChanged(&quot;SelectedItemIndex&quot;);
            }
        }

        public string ItemDetail
        {
            get { return itemDetail; }
            set
            {
                itemDetail = value; NotifyPropertyChanged(&quot;ItemDetail&quot;);
            }
        }

        public ObservableCollection&lt;forumitem&gt; ForumItemList
        {
            get
            {
                return forumItemList;
            }
        }

        public event PropertyChangedEventHandler PropertyChanged;
        private void NotifyPropertyChanged(string propName)
        {
            if (PropertyChanged != null)
            {
                PropertyChanged(this, new PropertyChangedEventArgs(propName));
            }
        }
    }

}</pre>

ViewModel中最重要的是forumItemList对象集合（ObservableCollection）。ObservableCollection类实现了一个集合的基本特性，并在向列表中的项有被添加、删除或替换时发送事件通知。注意ObservableCollection类本身并不会发送一个事件通知，当它包含的某个对象的数据值被修改时，只有通过创建一个可观测的forumItemList 对象的可观测集合，才能确保对ForumItem所做的任何改变都将导致UI控件的更新。  
  
ViewModel也实现了INotifyPropertyChanged接口，因为在这里有用到了可观测对象itemDetail。 

好吧，上面就是一个简单的视图模型，下面我会介绍视图模型如何跟UI进行交互以实现数据改变后UI能够自动更新。 

2、添加页面 

&#160;&#160;&#160; 我在工程中添加了Pages目录，并添加了一个空白页ListPage.xaml。在这里我并没有使用工程默认创建的MainPage.xaml。 

&#160;&#160;&#160; 为了让程序启动的时候默认加载ListPage界面，需要更新App.xaml.cs，如下语句，修改为Pages.ListPage

<pre class="wp-code-highlight prettyprint linenums:1">var rootFrame = new Frame();
if (!rootFrame.Navigate(typeof(Pages.ListPage)))
{
    throw new Exception(&quot;Failed to create initial page&quot;);
}</pre>

这样我们的页面就添加好了。  
  
下面我们就来对该页面ListPage.xaml.cs进行编写 

3、编写页面相关代码 

这里我直接贴出ListPage.xaml.cs文件的代码，以方便你直接阅读

<pre class="wp-code-highlight prettyprint linenums:1">using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Controls.Primitives;
using Windows.UI.Xaml.Data;
using Windows.UI.Xaml.Input;
using Windows.UI.Xaml.Media;
using Windows.UI.Xaml.Navigation;
using DevDiv_DataBinding.Data;

// The Blank Page item template is documented at &lt;a href="\" target="\" _blank\?? ?LinkId=&#039;234238\""&#039; fwlink go.microsoft.com http:&gt;http://go.microsoft.com/fwlink/?LinkId=234238&lt;/a&gt;

namespace DevDiv_DataBinding.Pages
{
    /// &lt;summary&gt;
    /// An empty page that can be used on its own or navigated to within a Frame.
    /// &lt;/summary&gt;
    public sealed partial class ListPage : Page
    {
        ViewModel viewModel;

        public ListPage()
        {

            viewModel = new ViewModel();
            viewModel.SelectedItemIndex = -1;
            viewModel.ForumItemList.Add(new ForumItem { Name = &quot;Android开发论坛&quot;, TopicCount = 4, Link = &quot;http://www.devdiv.com/forum-110-1.html&quot;,
                                                        Info = &quot;Android开发论坛、Android开发者论坛、环境搭建、应用开发、驱动开发、系统移植、文档&quot;});
            viewModel.ForumItemList.Add(new ForumItem { Name = &quot;Android开发资料&quot;, TopicCount = 8, Link = &quot;http://www.devdiv.com/forum-102-1.html&quot; });
            viewModel.ForumItemList.Add(new ForumItem { Name = &quot;iOS开发论坛/iPhone开发论坛&quot;, TopicCount = 8, Link = &quot;http://www.devdiv.com/forum-102-1.html&quot; });
            viewModel.ForumItemList.Add(new ForumItem { Name = &quot;iOS开发资料/iPhone开发资料&quot;, TopicCount = 8, Link = &quot;http://www.devdiv.com/forum-102-1.html&quot; });
            viewModel.ForumItemList.Add(new ForumItem { Name = &quot;微软/诺基亚 Windows Phone开发论坛 &quot;, TopicCount = 8, Link = &quot;http://www.devdiv.com/forum-102-1.html&quot; });
            viewModel.ForumItemList.Add(new ForumItem { Name = &quot;Windows Phone开发资料&quot;, TopicCount = 8, Link = &quot;http://www.devdiv.com/forum-102-1.html&quot; });
            viewModel.ForumItemList.Add(new ForumItem { Name = &quot;Windows 8 开发论坛 &quot;, TopicCount = 8, Link = &quot;http://www.devdiv.com/forum-102-1.html&quot;,
                                                        Info = &quot;Windows 8 代码、教程、入门、文档、视频&quot;});
            viewModel.ForumItemList.Add(new ForumItem { Name = &quot;Symbian开发论坛&quot;, TopicCount = 8, Link = &quot;http://www.devdiv.com/forum-102-1.html&quot; });
            viewModel.ForumItemList.Add(new ForumItem { Name = &quot;Symbian开发论坛&quot;, TopicCount = 8, Link = &quot;http://www.devdiv.com/forum-102-1.html&quot; });
            viewModel.ForumItemList.Add(new ForumItem { Name = &quot;Symbian开发论坛&quot;, TopicCount = 8, Link = &quot;http://www.devdiv.com/forum-102-1.html&quot; });
            viewModel.ForumItemList.Add(new ForumItem { Name = &quot;Symbian开发论坛&quot;, TopicCount = 8, Link = &quot;http://www.devdiv.com/forum-102-1.html&quot; });
            viewModel.ForumItemList.Add(new ForumItem { Name = &quot;Symbian开发论坛&quot;, TopicCount = 8, Link = &quot;http://www.devdiv.com/forum-102-1.html&quot; });
            viewModel.ForumItemList.Add(new ForumItem { Name = &quot;Symbian开发论坛&quot;, TopicCount = 8, Link = &quot;http://www.devdiv.com/forum-102-1.html&quot; });

            this.InitializeComponent();

            this.DataContext = viewModel;
        }

        /// &lt;summary&gt;
        /// Invoked when this page is about to be displayed in a Frame.
        /// &lt;/summary&gt;
        /// &lt;param name="e" /&gt;Event data that describes how this page was reached.  The Parameter
        /// property is typically used to configure the page.&lt;/param&gt;
        protected override void OnNavigatedTo(NavigationEventArgs e)
        {
        }

        private void ListSelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            viewModel.ItemDetail = ((ForumItem)e.AddedItems[0]).Info;
            if (viewModel.ItemDetail == null || viewModel.ItemDetail.Length == 0)
            {
                viewModel.ItemDetail = ((ForumItem)e.AddedItems[0]).Name;
            }
        }
    }
}</pre>

上面的代码看着让我有点头疼，在这里我创建了一个viewModel并对其进行了初始化。你需要重点关注的下面的代码：  
  
this.DataContext = viewModel; 

DataContext 属性指定绑定到一个UI控件及其所有子控件的数据的来源。也就是说这里控件需要用到的数据来源是viewModel。使用this关键字来为整个布局设置DataContext。 

代码最后定义了一个方法ListSelectionChanged，该方法处理当ListView中选择项改变后会触发的事件。在xaml文件中有使用到。

&#160;

4、添加资源字典  
  
&#160;&#160;&#160;&#160; 为了方便样式的统一，在这里我自定义了ListView使用到的一些样式，这样做的好处是UI控件的字体，颜色等属性我只需要在一个地方修改就可以应用到所有使用到的地方，非常的方便。为此我在工程中创建了Resources目录，并用Resource Dictionary（资源字典）项模板创建了一个新的ForumResourceDictionary.xaml文件。 

该文件的代码如下：

<pre class="wp-code-highlight prettyprint linenums:1">&lt;?XML:NAMESPACE PREFIX = &quot;[default] http://schemas.microsoft.com/winfx/2006/xaml/presentation&quot; NS = &quot;http://schemas.microsoft.com/winfx/2006/xaml/presentation&quot; /&gt;&lt;?XML:NAMESPACE PREFIX = &quot;[default] http://schemas.microsoft.com/winfx/2006/xaml/presentation&quot; NS = &quot;http://schemas.microsoft.com/winfx/2006/xaml/presentation&quot; /&gt;&lt;?XML:NAMESPACE PREFIX = &quot;[default] http://schemas.microsoft.com/winfx/2006/xaml/presentation&quot; NS = &quot;http://schemas.microsoft.com/winfx/2006/xaml/presentation&quot; /&gt;&lt;?XML:NAMESPACE PREFIX = &quot;[default] http://schemas.microsoft.com/winfx/2006/xaml/presentation&quot; NS = &quot;http://schemas.microsoft.com/winfx/2006/xaml/presentation&quot; /&gt;&lt;?XML:NAMESPACE PREFIX = &quot;[default] http://schemas.microsoft.com/winfx/2006/xaml/presentation&quot; NS = &quot;http://schemas.microsoft.com/winfx/2006/xaml/presentation&quot; /&gt;&lt;?XML:NAMESPACE PREFIX = &quot;[default] http://schemas.microsoft.com/winfx/2006/xaml/presentation&quot; NS = &quot;http://schemas.microsoft.com/winfx/2006/xaml/presentation&quot; /&gt;&lt;resourcedictionary xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation" xmlns:local="using:DevDiv_DataBinding.Resources" xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"&gt;
    &lt;resourcedictionary.mergeddictionaries&gt;
        &lt;resourcedictionary source="/Common/StandardStyles.xaml"&gt;&lt;/resourcedictionary&gt;
    &lt;/resourcedictionary.mergeddictionaries&gt;

    &lt;solidcolorbrush x:key="AppBackgroundColor" color="#3E790A"&gt;&lt;/solidcolorbrush&gt;
    &lt;style x:key="ForumListItem" targettype="TextBlock" basedon="{StaticResource BasicTextStyle}"&gt;
        &lt;setter property="FontSize" value="38"/&gt;
        &lt;setter property="FontWeight" value="Light"/&gt;
        &lt;setter property="Margin" value="10, 0"/&gt;
        &lt;setter property="VerticalAlignment" value="Center"/&gt;
    &lt;/style&gt;

    &lt;datatemplate x:key="ForumListItemTemplate"&gt;
        &lt;stackpanel orientation="Horizontal"&gt;
            &lt;textblock text="{Binding Name}"&gt;&lt;/textblock&gt;
        &lt;/stackpanel&gt;
    &lt;/datatemplate&gt;

&lt;/resourcedictionary&gt;</pre>

看上面的代码，我定义了ForumListItem样式，以及一个数据模版ForumListItemTemplate。ForumListItem定义了item的一些字体、布局等属性。ForumListItemTemplate这定义了该item具有的控件内容以及绑定到的数据。通过在.cs文件中设置DataContext属性，使视图模型作为绑定的数据源，Binding 关键字则让指定细节（“显示这个特定属性的值”)。  
  
最后把该资源字典添加到App.xaml中即可，如下代码

<pre class="wp-code-highlight prettyprint linenums:1">&lt;resourcedictionary source="Resources/ForumResourceDictionary.xaml" /&gt;</pre>

5、编写XAML  
  
我把ListPage.xaml文件的编写放到最后，这并不影响程序的开发。 

同样我先把文件代码贴出来，然后对关键部分进行分析

<pre class="wp-code-highlight prettyprint linenums:1">&lt;?XML:NAMESPACE PREFIX = &quot;[default] http://schemas.microsoft.com/winfx/2006/xaml/presentation&quot; NS = &quot;http://schemas.microsoft.com/winfx/2006/xaml/presentation&quot; /&gt;&lt;?XML:NAMESPACE PREFIX = &quot;[default] http://schemas.microsoft.com/winfx/2006/xaml/presentation&quot; NS = &quot;http://schemas.microsoft.com/winfx/2006/xaml/presentation&quot; /&gt;&lt;?XML:NAMESPACE PREFIX = &quot;[default] http://schemas.microsoft.com/winfx/2006/xaml/presentation&quot; NS = &quot;http://schemas.microsoft.com/winfx/2006/xaml/presentation&quot; /&gt;&lt;?XML:NAMESPACE PREFIX = &quot;[default] http://schemas.microsoft.com/winfx/2006/xaml/presentation&quot; NS = &quot;http://schemas.microsoft.com/winfx/2006/xaml/presentation&quot; /&gt;&lt;page xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation" xmlns:local="using:DevDiv_DataBinding.Pages" xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:d="http://schemas.microsoft.com/expression/blend/2008" x:class="DevDiv_DataBinding.Pages.ListPage" istabstop="false" mc:ignorable="d"&gt;

    &lt;grid background="{StaticResource AppBackgroundColor}"&gt;
        &lt;grid.rowdefinitions&gt;
            &lt;rowdefinition&gt;&lt;/rowdefinition&gt;
            &lt;rowdefinition&gt;&lt;/rowdefinition&gt;
        &lt;/grid.rowdefinitions&gt;
        &lt;grid.columndefinitions&gt;
            &lt;columndefinition width="885*"&gt;&lt;/columndefinition&gt;
            &lt;columndefinition width="481*"&gt;&lt;/columndefinition&gt;
        &lt;/grid.columndefinitions&gt;
        &lt;stackpanel grid.rowspan="2"&gt;
            &lt;textblock text="论坛首页-DevDiv.com" margin="10" foreground="Red"&gt;&lt;/textblock&gt;
            &lt;listview grid.rowspan="2" x:name="ForumList" itemssource="{Binding ForumItemList}" itemtemplate="{StaticResource ForumListItemTemplate}" selectionchanged="ListSelectionChanged"&gt;&lt;/listview&gt;
        &lt;/stackpanel&gt;
        &lt;stackpanel orientation="Vertical" grid.column="1"&gt;
            &lt;textblock text="板块详情" margin="10" foreground="Red"&gt;&lt;/textblock&gt;
            &lt;textblock text="{Binding ItemDetail}" margin="10" fontsize="30"&gt;&lt;/textblock&gt;
        &lt;/stackpanel&gt;
        &lt;stackpanel orientation="Vertical" background="White" grid.column="1" grid.row="1"&gt;
    &lt;textblock height="80"&gt;&lt;/textblock&gt;
            &lt;img source="../Assets/icon.png" horizontalalignment="Center" /&gt;
            &lt;textblock foreground="Red" fontsize="18" height="135"&gt;        
                &lt;run text="大家好！我是破船"&gt;&lt;/run&gt;
                    &lt;run text="欢迎跟我一起学习"&gt;&lt;/run&gt;  
                &lt;linebreak&gt;&lt;/linebreak&gt;
                    &lt;run text="Window 8 Metro App开发"&gt;&lt;/run&gt;
            &lt;/textblock&gt;
        &lt;/stackpanel&gt;
    &lt;/grid&gt;
&lt;/page&gt;</pre>

首先，来看看VS设计器显示的内容是什么，如下图：

[<img title="2" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" border="0" alt="2" src="http://beyondvincent.com/wp-content/uploads/2013/06/2_thumb3.png" width="682" height="403" />][2] 

可以看到，Grid控件的Background 特性为我在资源字典中指定的颜色。  
  
我们来看上面的关键代码：

<pre class="wp-code-highlight prettyprint linenums:1">&lt;?XML:NAMESPACE PREFIX = &quot;[default] http://schemas.microsoft.com/winfx/2006/xaml/presentation&quot; NS = &quot;http://schemas.microsoft.com/winfx/2006/xaml/presentation&quot; /&gt;&lt;?XML:NAMESPACE PREFIX = &quot;[default] http://schemas.microsoft.com/winfx/2006/xaml/presentation&quot; NS = &quot;http://schemas.microsoft.com/winfx/2006/xaml/presentation&quot; /&gt;&lt;?XML:NAMESPACE PREFIX = &quot;[default] http://schemas.microsoft.com/winfx/2006/xaml/presentation&quot; NS = &quot;http://schemas.microsoft.com/winfx/2006/xaml/presentation&quot; /&gt;&lt;listview grid.rowspan="2" x:name="ForumList" itemssource="{Binding ForumItemList}" itemtemplate="{StaticResource ForumListItemTemplate}" selectionchanged="ListSelectionChanged"&gt;&lt;/listview&gt;</pre>

该代码片段是使用了ListView ，并指定了它的数据源ItemsSource和数据模板ItemTemplate。  
  
Binding 关键字告诉ListView控件应该显示我在.cs代码文件中设置的DataContext对象的ForumItemList 属性的内容。而ItemTemplate则告诉ListView 控件应该如何显示ItemSource 中的每一数据项。StaticResource关键字和ForumListItemTemplate 值表示将使用我在资源字典中指定的数据模板。 

最后就是指定SelectionChanged事件的处理方法。 

再来看看下面的代码：该代码是显示在画面右上角的，其中第二个TextBlock 中将数据源绑定到视图模型的ItemDetail上。当用户改变选择项时，视图模型中的ItemDetail 内容也会改变，这样UI也会自动的更新ItemDetail 内容。

<pre class="wp-code-highlight prettyprint linenums:1">&lt;?XML:NAMESPACE PREFIX = &quot;[default] http://schemas.microsoft.com/winfx/2006/xaml/presentation&quot; NS = &quot;http://schemas.microsoft.com/winfx/2006/xaml/presentation&quot; /&gt;&lt;?XML:NAMESPACE PREFIX = &quot;[default] http://schemas.microsoft.com/winfx/2006/xaml/presentation&quot; NS = &quot;http://schemas.microsoft.com/winfx/2006/xaml/presentation&quot; /&gt;&lt;stackpanel orientation="Vertical" grid.column="1"&gt;
    &lt;textblock text="板块详情" margin="10" foreground="Red"&gt;&lt;/textblock&gt;
    &lt;textblock text="{Binding ItemDetail}" margin="10" fontsize="30"&gt;&lt;/textblock&gt;
&lt;/stackpanel&gt;</pre>

至此，我们的代码关键部分就编写完毕了。在设计器中你是看不到ListView中的数据的，因为设计器不能显示动态生成的内容。下面就让我们运行起来看看吧。

6、程序运行效果图与Demo程序  
  
未选中效果

&#160;

[<img title="3" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" border="0" alt="3" src="http://beyondvincent.com/wp-content/uploads/2013/06/3_thumb3.png" width="682" height="435" />][3] 

&#160;

选中效果

[<img title="4" style="border-left-width: 0px; border-right-width: 0px; border-bottom-width: 0px; display: inline; border-top-width: 0px" border="0" alt="4" src="http://beyondvincent.com/wp-content/uploads/2013/06/4_thumb2.png" width="682" height="435" />][4] 

&#160;

代码下载

<a href="https://github.com/BeyondVincent/WindowsStoreAppStepByStep/tree/master/DataBinding" target="_blank"><img src="http://beyondvincent.com/wp-content/uploads/2013/05/code_xaml.png" /></a>

<div style="text-align: left">
  <span style="color: #339966"></span>
</div>

<div style="text-align: left">
  <span style="color: #339966">本文由<span style="text-decoration: underline"><a href="http://beyondvincent.com/"><span style="color: #339966; text-decoration: underline">破船</span></a></span>原创●转载请注明出处●<time data-updated="true" datetime="2013-05-18T17:37:00+08:00">2012-05-31</time></span>
</div>

 [1]: http://beyondvincent.com/wp-content/uploads/2013/06/12.png
 [2]: http://beyondvincent.com/wp-content/uploads/2013/06/22.png
 [3]: http://beyondvincent.com/wp-content/uploads/2013/06/33.png
 [4]: http://beyondvincent.com/wp-content/uploads/2013/06/42.png