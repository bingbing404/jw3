// 轮播图
var i=0;               //现在正在显示第几张图片  从0 开始
var LIWIDTH=823;      //每个 li 的固定宽度
var DURATION=500;      // 每次轮播动画 持续 的时间
var LICOUNT=5;          // li  的 总个数
var ulImgs=document.getElementById("ul-imgs");    //要移动的 ul
var ulIdxs=document.getElementById("ul-idxs");    //包含下面列表的列表ul
var lis=ulIdxs.children;        //下边列表的元素列表
	//从当前位置移动到任意一个范围的位置
function moveTo(to){
	//如果用户没有传入要调到第几张 就自动跳到下一张
	if(to==undefined){
		to=i+1
	}
	if(i==0){
		if(to>i){
			//如果滚动从头开始 再重新加上transition
			//如果要看当前位置右边的图片 是不会出问题的
			ulImgs.className="transition";
		}else{
			//只有i=0 在开头 且还要看左边的图片时 才会出问题
			//为了避免看到 偷梁换柱的效果  先把 transition属性去掉
			ulImgs.className="";
			//将ulImgs拉取到最左侧
			ulImgs.style.marginLeft=-LIWIDTH*LICOUNT+"px"
			//使用定时器是为了 将加回transition属性的操作与 偷梁换柱的效果 强行隔离开
			setTimeout(function(){
				moveTo(LICOUNT-1)
			},100);
			return;
		}		
	}
	//先将 表示第几张的图片 变量i 变为目标位置
	i=to;
	//在用i计算 ulImgs 的margin-left 的距离
	ulImgs.style.marginLeft=-i*LIWIDTH+"px";
	//先删除下列表的所有 class
	for(var li of lis){
		li.className="";
	}
	if(i==LICOUNT){
		i=0;
		//当transition动画播放完之后  才开始
		setTimeout(function(){
			//清掉 transition属性
			ulImgs.className="";
			//将ulImgs 拉回到0位置
			ulImgs.style.marginLeft=0;
		},DURATION)
	}
	//再给的当前位置的下选择框 添加 active属性
	lis[i].className="active";
}
// 两边按钮
var btnLeft=document.getElementById("b-left");
var btnRight=document.getElementById("b-right");
//用开关控制上次动画还没播放完  下次动画不能开始
var canClick=true;
btnRight.onclick=function(){
	//调用两个按钮的公共移动方法  参数一表示 移动到i+1 的位置 相当于左移1个
	move(1)	
}
//创建 两个按钮共用 的移动函数  n传入1时 移动到i+1 的位置 左移
//                           n传入-1时 移动到i-1 的位置 右移
function move(n){
	if(canClick){
		console.log(i+n);
		//只有可单击时 才调用真正移动ul的方法
		moveTo(i+n)
		//马上把开关关上  禁止再次点击
		canClick=false;
		//只有本地 transition动画播放完  才能自动打开开关 点击按钮才有反应
		setTimeout(function(){
			canClick=true;
		},DURATION+100);
	}
}
btnLeft.onclick=function(){
	move(-1);
}
//自动播放
//每次轮播之间间隔 3秒、
var interval=3000;
//定义自动轮播的函数
var timer=setInterval(function(){
	moveTo();
},3000);
//获取页面整体
var banner=document.getElementsByClassName("lunbo")[0];
//鼠标移入时  停止轮播
banner.onmouseover=function(){
	clearInterval(timer);
}
//鼠标移出时 继续执行
banner.onmouseout=function(){
	timer=setInterval(function(){
		moveTo()
	},3000);
}
//下面列表的效果、
var ulIdxs=document.getElementById("ul-idxs");
var cnaClick=true;
ulIdxs.onclick=function(e){
	if(canClick){
		var li=e.target;
		if(li.nodeName=="LI"){
			if(li.className!=="active"){
				for(var i=0;i<lis.length;i++){
					if(lis[i]==li){
						break;
					}
				}
				moveTo(i);
				setTimeout(function(){
					canClick=true;
				},DURATION);
			}
		}
	}
}
//热门活动右侧板块 按钮效果
var body=document.body;
var lists=body.querySelectorAll(".cont1 .yi-ri .list li")
for(var list of lists){
	var list=this;
	list.onclick=function(){
		var span=body.querySelector(".cont1 .yi-ri .list li span")
		if(span.className==""){
			span.setAttribute("class","active");
		}
		console.log(span);
	}
}