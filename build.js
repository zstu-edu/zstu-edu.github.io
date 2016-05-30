var fs = require('fs');
var path = require('path');
require(`shelljs/global`);
//buildByRemarkable();

module.exports = build;

function build(){
	exec('cp -r ./source/css ./build');
	exec('cp -r ./source/js ./build');
	buildByRemarkable();
}

function buildByMarkdownToHtml(){
	var Markdown = require('markdown-to-html').GithubMarkdown;
	var md = new Markdown();
	md.bufmax = 2048;
	var fileName = 'source/test2.md';
	var opts = {title: 'File $BASENAME in $DIRNAME', stylesheet: './css/common.css'};

	// Write a header. 
	console.log('===============================');
	// Write a trailer at eof. 
	md.once('end', function() {
	  console.log('===============================');
	});
	md.render(fileName, opts, function(err) {
	  if (err) {
	    console.error('>>>' + err);
	    process.exit();
	  }
	  //md.pipe(process.stdout);
	  //console.log(md.html);
	  //if directory of views is exist
	  if(!fs.existsSync('./views')){
	    fs.mkdir('./views');
	    console.log('Make views directory');
	  }

	  fs.writeFile('views/test.html',md.html,function(err){
	    if(err) throw err;
	  	console.log('write success!');
	  });
	});
}

function buildByRemarkable(){
	var Remarkable = require('remarkable');
	var hljs       = require('highlight.js') // https://highlightjs.org/
	var md = new Remarkable('full',{
		html:true,
		highlight: function (str, lang) {
	    if (lang && hljs.getLanguage(lang)) {
	      try {
	        return hljs.highlight(lang, str).value;
	      } catch (err) {}
	    }
	 
	    try {
	      return hljs.highlightAuto(str).value;
	    } catch (err) {}
	 
	    return ''; // use external default escaping 
	  }
	});

	var postList = [];

	var categories = [];

	var categoriesPostList = {};

	render('./source/posts');

	buildIndex(postList);
	buildCategoriesPostList(categoriesPostList);
	//buildAside(categories);

	function getCategories(files,dir){
		for(file in files){
			var file_name = files[file];
			if(file_name.substr(file_name.length - 3) == '.md'){

				var txt = fs.readFileSync(__dirname +  dir.replace('.','')+ '/' + file_name);		

				var text = txt.toString();

				var info = text.split('===')[1];
				if(info){
					var item = JSON.parse(info);	
					var cates = item.categories.toString().split(',');

					for(var i = 0; i < cates.length; i++){
						categories.push(cates[i]);
						categoriesPostList[cates[i]] = categoriesPostList[cates[i]]?categoriesPostList[cates[i]]:[];
						categoriesPostList[cates[i]].push({link:'./'+dir.replace('./source/','')+'/'+file_name.substr(0,file_name.length -3)+'.html',info:JSON.parse(info)});
					}
				}
			}			
		}
		categories = uniqueArray(categories);
	}

	function render(dir){
		var files = fs.readdirSync(dir);

		getCategories(files,dir);

		for(file in files){

			var file_name = files[file];

			if(fs.statSync(dir +'/'+ file_name).isDirectory()){
				render(dir +'/'+ file_name);
				// return false;
			}

			if(file_name.substr(file_name.length - 3) == '.md'){
				console.log('File:' + file_name + 'found');

				var txt = fs.readFileSync(__dirname + dir.replace('.','') +'/'+ file_name);	
				var text;	
				if(typeof txt != 'string'){
					text = txt.toString();
				}

				var info = text.split('===')[1];
				if(info){
					//console.log('>>>>>>>>' + typeof JSON.parse(info));
					var item = JSON.parse(info);
					postList.push({link:'./'+dir.replace('./source/','')+'/'+file_name.substr(0,file_name.length -3)+'.html',info:JSON.parse(info)});
				}

				//info = JSON.parse(info);
				var title = info?JSON.parse(info).title:'';
				var article =  md.render(txt.toString().replace(info,'').replace(/======/,'')) + '<script>\
								var idcomments_acct = \'1d91760ed815800e7c6d113414d302cf\';\
								var idcomments_post_id;\
								var idcomments_post_url;\
								</script>\
								<span id="IDCommentsPostTitle" style="display:none"></span>\
								<script type=\'text/javascript\' src=\'http://www.intensedebate.com/js/genericCommentWrapperV2.js\'></script>';


				var html = layout(article, title);
				var publishPostPath = './build/'+dir.replace('./source/','');
				if(!fs.existsSync(publishPostPath)){
					mkdirsSync(publishPostPath);
				}
				fs.writeFileSync(
					publishPostPath+'/'+file_name.substr(0,file_name.length -3)+'.html',html);
				console.log('file html write success!');
			}			
		}
	}
	function layout(mdHtml,title) {
		var headerHtml = fs.readFileSync(__dirname + '/source/layout/header.html');
		var asideHtml = fs.readFileSync(__dirname + '/source/layout/aside.html');
		var footerHtml = fs.readFileSync(__dirname + '/source/layout/footer.html');
		var layoutHtml = fs.readFileSync(__dirname +'/source/layout/layout.html');

		asideHtml = asideHtml.toString().replace('{$nav}',buildAside(categories));

		layoutHtml = layoutHtml.toString();


		if(title) layoutHtml = layoutHtml.replace('{$title}',title);
		return html = layoutHtml.replace('{$header}',headerHtml.toString()).replace('{$aside}',asideHtml).replace('{$footer}',footerHtml.toString()).replace('{$markdown}',mdHtml);
	}

	function buildAside(categories){
		var html = '';
		for(var i = 0; i < categories.length;i++){
			html += '<li><a href="/categories-'+categories[i]+'.html">'+categories[i]+'</a></li>';
		}
		return html;
	}

	function buildIndex(postList){
		var postListHtml = '';
		
		for(var index = 0;index<postList.length;index++){
			postListHtml += '<li><a href="'+postList[index].link+'">'+(postList[index].info.title||'No title')+'</a></li>';
		}

		postListHtml = '<h2>Articles</h2><ul class="post-list">' + postListHtml + '</ul>';

		var html = layout(postListHtml,'index');

		fs.writeFileSync(
			'./build/index.html',html);
		console.log('file index html write success!');
	}

	function buildCategoriesPostList(categoriesPostList){
		//console.log(categoriesPostList);
		for(var item in categoriesPostList){
			//console.log('>>>>>>'+ typeof item);
			var postListHtml = '';

			var postList = categoriesPostList[item];
			
			for(var index = 0;index<postList.length;index++){
				postListHtml += '<li><a href="'+postList[index].link+'">'+(postList[index].info.title||'No title')+'</a></li>';
			}

			postListHtml = '<h2>Articles</h2><ul class="post-list">' + postListHtml + '</ul>';

			var html = layout(postListHtml,(item ||'No title'));

			fs.writeFileSync(
				'./build/categories-'+item+'.html',html);
			console.log('file categories html write success!');
		}
	}
}

//数组去重
function uniqueArray(array){
	if(!array){
		return [];
	}
	var length = array.length,result=[], temp = {};
	for(var i = 0; i < length; i++){
		if(!temp[array[i]]){
			result.push(array[i]);
			temp[array[i]] = true;
		}
	}
	return result;
}
//创建多层文件夹 同步
function mkdirsSync(dirpath, mode) { 
    if (!fs.existsSync(dirpath)) {
        var pathtmp;
        dirpath.split('\/').forEach(function(dirname) {

            if (pathtmp) {
                pathtmp = path.join(pathtmp, dirname);
            }
            else {
                pathtmp = dirname;
            }
            if (!fs.existsSync(pathtmp)) {
                if (!fs.mkdirSync(pathtmp, mode)) {
                    return false;
                }
            }
            //console.log(pathtmp);
        });
        //console.log(dirpath.split('\/'));
    }
    return true; 
}



