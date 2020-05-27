var wrongCount = 0;
var correctCount = 0;
var magnification = 1.39;
var nowScore = 4.5;
var status = 2;//方向：0-left;1-up;2-right;3-down
var img = document.getElementById("e");
var imgWidth = img.getAttribute("width");
var imgHeight = img.getAttribute("height");
startEyeTest();

function getImgWidth(img){
    return img.getAttribute("width");
}

function getImgHeight(img){
    return img.getAttribute("height");
}

// 改变尺寸
function bigger(img){
    img.setAttribute("width",getImgWidth(img)*magnification);
    img.setAttribute("height",getImgHeight(img)*magnification);
}
function smaller(img){
    img.setAttribute("width",getImgWidth(img)/magnification);
    img.setAttribute("height",getImgHeight(img)/magnification);
}

// 检查状态
function checkStatus(standardStatus){
    if(status == standardStatus){
        correctCount++;
        if(correctCount%5 == 0){
            nowScore += 0.1;
            //alert("你现在的视力是："+nowScore.toFixed(1));
            smaller(img);
        }
    }else{
        wrongCount++;
        if(wrongCount%5 == 0){
            nowScore -= 0.1;
            //alert("你现在的视力是："+nowScore.toFixed(1));
            bigger(img);
        }
    }
    refreshCount();
}

// 按下方向:37-left;38-up;39-right;40-down
function pressButton(img){   
    document.onkeydown = function(event){
        //alert(event.keyCode);
        if(event.keyCode == 37){
            checkStatus(0);
            changeDirections(img);
        }
        if(event.keyCode == 38){
            checkStatus(1);
            changeDirections(img);
        }
        if(event.keyCode == 39){
            checkStatus(2);
            changeDirections(img);
        }
        if(event.keyCode == 40){
            checkStatus(3);
            changeDirections(img);
        }
        // 空格键：看不到了，需要放大
        if(event.keyCode == 32){
            nowScore -= 0.1;
            //alert("你现在的视力是："+nowScore.toFixed(1));
            bigger(img);
            refreshCount();
        }
    };
}

// 随机改变方向
function changeDirections(img){   
    let current = Math.floor(Math.random()*4); 
    let rotateDeg = current*90;            
    // 图片顺时针旋转(一直以初始图片为基准)
    img.style.transform = 'rotate('+rotateDeg+'deg)';    
    status = (current + 2)%4;
}

function refreshCount(){
    document.getElementById('count').innerHTML = "正确:"+correctCount+" 错误:"+wrongCount;
    document.getElementById('nowScore').innerHTML = "您现在的视力是："+nowScore.toFixed(1);
}

function startEyeTest() {
    pressButton(img);
}