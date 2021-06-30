var canvas = document.getElementById('canvas')

var context = canvas.getContext('2d');

context.width = canvas.width
context.height = canvas.height

// 获取最短边半径
var minRadius = 20;
// 使用arc() API绘制圆
context.fillStyle = '#000';

context.transform(1, 0, 0, 1, canvas.width / 2, canvas.height / 2);//设置移动坐标的中心点
context.transform(2, 0, 0, 1, 0, 0);//设置坐标的很坐标为二倍

context.transform(Math.cos(Math.PI / 2), Math.sin(Math.PI / 2), -Math.sin(Math.PI / 2), Math.cos(Math.PI / 2), 0, 0);
// 绘制
context.beginPath();
context.arc(0, 0, minRadius, 0, 2 * Math.PI);

context.transform(2, 0, 0, 1, 0, 0);

context.transform(1, 0, 0, 1, 50, 0);


context.fill();
context.fillStyle = 'red';
// 绘制
context.beginPath();
context.arc(0, 0, minRadius, 0, 2 * Math.PI);


context.fill();


/**
初始矩阵设置之后的顺序如此
a c e
b d f
0 0 1

默认情况下，矩阵为：
1 0 0
0 1 0
0 0 1
当前坐标为x,y
则
1*x+0*y+0  为计算出来之后的x坐标
0*x+1*y+0  为计算出来的y坐标

可以看到，如果需要移动坐标，应该修改e，f;修改e的情况为移动x，修改f的情况，为移动y坐标

而对于x与y坐标的缩放控制，应该保证在x与y的维度之上来处理；

所以可以根据公式来得出a是缩放x坐标，d是缩放y坐标
对应的公式部分就是
(1*x)+0*y+0
0*x+(1*y)+0
这其中的1*x与1*y就是我们在这个维度之上的缩放


对于一个点旋转，之后结合cos与sin，可以把旋转之后的旋转计算矩阵应该是(cos,sin,-sin,cos,0,0)

而对于倾斜的计算又不一样，通过b,c为的tan的情况操作

*/

