var Markdown = require('markdown-to-html').Markdown;
var fs = require('fs');
var md = new Markdown();
md.bufmax = 2048;
var fileName = 'source/test.md';
var opts = {title: 'File $BASENAME in $DIRNAME', stylesheet: 'test/style.css'};

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
  console.log(md.html);
  fs.writeFile('views/test.html',md.html,function(){
  	console.log('write success!');
  });
});