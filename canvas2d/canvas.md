
canvas 
1. canvas渲染引擎
2. 

html css ==> 页面 （skia）

（页面）==》被处理成可以渲染数据   skia

js + skia +  解析

quickjs（v8）+ libuv + skia（基于浏览器之外的渲染js渲染引擎）



dart flutter  + skia

skia  paint

webkit html css ==>可以被渲染的数据


webgl canvas??


串行排队
CPU  写的代码  ==> CPU编程   canvas 

GPU  并行 ==> 面相与GPU编程   webgl 


GPU opengl协议






html css \==>skia 

    js      canvas

canvas  

html css  dom

canvas   

 路径 
beginPath ==> 集合 
路径 ==》 很多不同形状、样色的点集合

笔式绘图仪模型 

context 


状态绘图、路劲绘图

scale 
translate 

save 
restore


canvas 渲染引擎：

1. 拾取 
2. 局部绘制
3. 分层(舞台) 
4. 事件封装


libuv + skia + quickjs 

webkit

imgcook


isPointInStroke     路劲 ？？
1. 重新构建画布上所有的图形路劲
2. 遍历所有路径 


路径   ？？ 点？