var a,t;
function setup() {
	createCanvas(windowWidth,windowHeight);
	a=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
	t=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
	add();
	add();
}
function draw() {
		background(66, 232, 244);
		createTable();
		status();
}

function status()
{
	let max=0;
	for(let i=0;i<4;i++)
		for(let j=0;j<4;j++)
			if(a[i][j]>max)
				max=a[i][j];
	if(max>=2048)
		text("YOU WON!!!",windowWidth/2,windowHeight/2+windowHeight/3+windowHeight/10);
	if(compare(t)&&check())
		text("YOU LOST!!!",windowWidth/2,windowHeight/2+windowHeight/3+windowHeight/10);
	for(let i=0;i<4;i++)
		for(let j=0;j<4;j++)
			t[i][j]=a[i][j];
}

function check()
{
	for(let i=0;i<4;i++)
		for(let j=0;j<4;j++)
			if(a[i][j]===0)
				return 0;
	for(let i=0;i<3;i++)
	{
		for(let j=0;j<3;j++)
		{
			if(a[i][j]===a[i+1][j])
				return 0;
			if(a[i][j]===a[i][j+1])
				return 0;
		}
	}
	if(a[3][2]===a[3][3]||a[2][3]===a[3][3])
		return 0;
	return 1;
}

function compare(t)
{
	for(var i=0;i<4;i++)
	{
		for(var j=0;j<4;j++)
		{
			if(t[i][j]!==a[i][j])
				return 0;
		}
	}
	return 1;
}

function createTable()
{
	text("2048",windowWidth/2,windowHeight/2-windowHeight/4);
	textFont('Georgia');
	textAlign(CENTER,CENTER);
	textSize(30);
	for(var i=0;i<4;i++)
	{
		for(var j=0;j<4;j++)
		{
			rect((windowWidth/2-windowWidth/4)+j*100+150,(windowHeight/3)+i*75,100,75);
			stroke(212,230,0);
			strokeWeight(2);
			if(a[i][j]!==0)
				text(a[i][j],(windowWidth/2-windowWidth/4)+j*100+150+50,(windowHeight/3)+i*75+37);
			textAlign(CENTER,CENTER);
		}
	}
}

function touchStart()
{
	var x=touchStart.x;
	var y=touchStart.y;
}
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    left();
  } else if (keyCode === RIGHT_ARROW) {
    right();
  }
	else if(keyCode === UP_ARROW){
		up();
	}
	else if (keyCode === DOWN_ARROW) {
		down();
	}
	else;
}


function magnetUp()
{
	for(let i=0;i<4;i++)
	{
		let b=[0,0,0,0];
		let x=0;
		for(let j=0;j<=3;j++)
		{
			if(a[j][i]>0)
				b[x++]=a[j][i];
		}
		x=0;
		for(let j=0;j<=3;j++)
		{
				a[j][i]=b[x++];
		}
	}
}

function magnetDown()
{
	for(let i=0;i<4;i++)
	{
		let b=[0,0,0,0];
		let x=0;
		for(let j=3;j>=0;j--)
		{
			if(a[j][i]>0)
				b[x++]=a[j][i];
		}
		x=0;
		for(let j=3;j>=0;j--)
		{
				a[j][i]=b[x++];
		}
	}
}

function magnetLeft()
{
	for(let i=0;i<4;i++)
	{
		let b=[0,0,0,0];
		let x=0;
		for(let j=0;j<=3;j++)
		{
			if(a[i][j]>0)
				b[x++]=a[i][j];
		}
		x=0;
		for(let j=0;j<=3;j++)
		{
				a[i][j]=b[x++];
		}
	}
}

function magnetRight()
{
	for(let i=0;i<4;i++)
	{
		let b=[0,0,0,0];
		let x=3;
		for(let j=3;j>=0;j--)
		{
			if(a[i][j]>0)
				b[x--]=a[i][j];
		}
		x=3;
		for(let j=3;j>=0;j--)
		{
				a[i][j]=b[x--];
		}
	}
}

function up()
{
	for(let i=1;i<4;i++)
	{
		for(let j=0;j<4;j++)
		{
			magnetUp();
			if(a[i][j]===a[i-1][j])
			{
				a[i-1][j]=a[i][j]+a[i-1][j];
				a[i][j]=0;
			}
			magnetUp();
	}
}
	add();
}

function down()
{
	for(let i=0;i<3;i++)
	{
		for(let j=0;j<4;j++)
		{
			let count=0;
			magnetDown();
			if(a[i][j]===a[i+1+count][j])
			{
				a[i+1+count][j]=a[i][j]+a[i+1+count][j];
				if(a[i+1+count][j]>max)
					max=a[i+1+count][j];
				a[i][j]=0;
			}
			magnetDown();
		}
	}
	add();
}

function left()
{
	for(let i=0;i<4;i++)
	{
		for(let j=1;j<4;j++)
		{
			let count=0,temp=j;
			magnetLeft();
			if(a[i][j]===a[i][j-1-count])
			{
				a[i][j-1-count]=a[i][j]+a[i][j-1-count];
				a[i][j]=0;
			}
			magnetLeft();
		}
	}
	add();
}

function right()
{
	for(let i=0;i<4;i++)
	{
		for(let j=0;j<3;j++)
		{
			let count=0,temp=j;
			magnetRight();
			if(a[i][j]===a[i][j+1+count])
			{
				a[i][j+1+count]=a[i][j+1+count]+a[i][j];
				a[i][j]=0;
			}
			magnetRight();
		}
	}
	add();
}
function add()
{
	let rrow=[];
	let rcol=[];
	let x=0,flag=0;
	for(let i=0;i<4;i++)
	{
		for(let j=0;j<4;j++)
		{
			if(a[i][j]===0)
			{
				flag=1;
				rrow[x]=i;
				rcol[x]=j;
				x++;
			}
		}
	}
	if(flag)
	{
		let x1=parseInt(random(x-1));
		a[rrow[x1]][rcol[x1]]=2;
	}
}
