require(`shelljs/global`);
exec('git add .');
if(exec('git commit -m "update"').code !==0){
	echo(`Error: Git commit gh-pages failed`);
    exit(1);
}
if (exec(`git push origin master`).code !== 0) {
	echo(`Error: Git push gh-pages failed`);
	exit(1);
}
echo(`------------ gh-pages updated`);