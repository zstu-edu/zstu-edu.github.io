var Markdown = require('markdown-to-html').GithubMarkdown;
var fs = require('fs');
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