
var canvas = document.getElementById('canvas');

var hideCanvas = document.createElement('canvas')

var topCanvas = document.getElementById('topCanvas');//把频繁绘制的图形 ==> 单独的图层


var ctx = canvas.getContext('2d');
var hideCtx = hideCanvas.getContext('2d');
var topCtx = topCanvas.getContext('2d');

let width = hideCtx.width = topCtx.width = ctx.width = topCanvas.width = canvas.width = hideCanvas.width = document.body.offsetWidth;
let height = hideCtx.height = topCtx.height = ctx.height = topCanvas.height = canvas.height = hideCanvas.height = document.body.offsetHeight;

let mapHash = {}

let lastSelectedItem;
initMap();

async function initMap() {
    let fetchHanlder = await fetch('./china.json');
    let GeoJSON = await fetchHanlder.json();
    GeoJSON.features.forEach((item) => {
        let { center, name } = item.properties;
        let geometry = item.geometry.coordinates;
        let RandomColor = getRandomColor();
        mapHash[RandomColor] ? RandomColor = getRandomColor() : '';
        mapHash[RandomColor] = {
            name,
            center,
            geometry,
            RandomColor
        };
        //图形迭代
        geometry.forEach((singleItem) => {
            singleItem[0].forEach((geoPoint, index) => {
                singleItem[0][index] = GeoToPos(geoPoint);
            });
            singleItem = singleItem[0];
            drawGraph(ctx, hideCtx, singleItem, 1, RandomColor, '#074b7f', true, '#1aa0d2');
        });
    });
}


function drawMap(geoInfo) {
    clear(topCtx);
    Object.keys(mapHash).forEach((itemKey) => {
        //有选中的图形
        if (lastSelectedItem == itemKey) {
            return
        }
        if (geoInfo && geoInfo.RandomColor == itemKey) {

            mapHash[itemKey].geometry.forEach((geometryItem) => {
                geometryItem.forEach((singleItem) => {
                    let lastSelectedItem = itemKey;
                    // drawGraph(ctx, hideCtx, singleItem, 1, itemKey, '#094260', true);
                    drawOneGraph(topCtx, singleItem, true, 1, '#094260', '#1c1ba8');
                })
            });
        }

    });
}



document.addEventListener('mousemove', initMove);

let preSelect = false;
function initMove(e) {
    const getHexColor = hitToColor(e);
    let geoInfo = mapHash[getHexColor];
    if (!geoInfo) {
        //上一次选中这一次没中；

        preSelect && drawMap();
        preSelect = false;
        return;
    }

    preSelect = true;
    drawMap(geoInfo)
}


function hitToColor(e) {
    let pointX = e.clientX, pointY = e.clientY;
    let getHideColor = hideCtx.getImageData(pointX, pointY, 1, 1).data;
    const getHexColor = rgbToHex(getHideColor[0], getHideColor[1], getHideColor[2]);
    return getHexColor;
}

function drawGraph(ctx, hideCtx, points, lineWidth, lowColor, color, isFill = false, strokeColor) {
    drawOneGraph(ctx, points, isFill, lineWidth, color, strokeColor);//绘制可视化的画布
    drawOneGraph(hideCtx, points, true, 0, lowColor);//绘制隐藏画布
}



function clear(context) {
    if (context) {
        context.clearRect(0, 0, context.width, context.height);//清空画布
        return
    }
    ctx.clearRect(0, 0, ctx.width, ctx.height);//清空画布
    hideCtx.clearRect(0, 0, ctx.width, ctx.height);//清空画布
}
/**
 * ctx 绘图环境
 * point 图形的点
 * color 图形颜色
 * isFill 图形是否是填充
 */
function drawOneGraph(ctx, point, isFill, lineWidth, color, strokeColor) {
    ctx.save();//储存状态
    ctx.beginPath();
    color && (isFill ? ctx.fillStyle = color : ctx.strokeStyle = color);//判断是有颜色的情况，就设置颜色大小
    ctx.lineWidth = lineWidth;
    ctx.lineJoin = 'round';
    strokeColor && (ctx.strokeStyle = strokeColor)
    point.forEach((point, index) => {
        //index为0
        if (!index) {
            ctx.moveTo(point.x, point.y);
        } else {
            ctx.lineTo(point.x, point.y);
        }
    })
    ctx.closePath();
    isFill ? ctx.fill() : ctx.stroke();//判断是否是填充

    if (strokeColor) {
        ctx.stroke();
    }


    ctx.restore();//恢复上一次的状态
}


//转换坐标地图坐标
function GeoToPos(pos) {
    let longitude = pos[0];//计算之前的经度
    let latitude = pos[1];//计算之前的维度
    //最大最小经纬度
    let bounds = {
        xMax: 140,
        yMax: 53.5,
        xMin: 70.5,
        yMin: 10,
    };

    var xScale = width / Math.abs(bounds.xMax - bounds.xMin)
    var yScale = height / Math.abs(bounds.yMax - bounds.yMin);
    var scale = xScale < yScale ? xScale : yScale;//比例计算不超出


    var xoffset = width / 2.0 - Math.abs(bounds.xMax - bounds.xMin) / 2 * scale
    var yoffset = height / 2.0 - Math.abs(bounds.yMax - bounds.yMin) / 2 * scale
    var point = {
        x: (longitude - bounds.xMin) * scale + xoffset,
        y: (bounds.yMax - latitude) * scale + yoffset
    };

    return point;
}










//随机生成16位的颜色值
function getRandomColor() {
    return '#' + (function (color) {
        return (color += '0123456789abcdef'[Math.floor(Math.random() * 16)])
            && (color.length == 6) ? color : arguments.callee(color);
    })('');
}


function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}