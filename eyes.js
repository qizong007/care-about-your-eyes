var wrongCount = 0;
var correctCount = 0;
var magnification = 1.39;
var nowScore = 4.5;
var status = 2;//Directions: 0-left;1-up;2-right;3-down
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

// change the size 
function bigger(img){
    img.setAttribute("width",getImgWidth(img)*magnification);
    img.setAttribute("height",getImgHeight(img)*magnification);
}
function smaller(img){
    img.setAttribute("width",getImgWidth(img)/magnification);
    img.setAttribute("height",getImgHeight(img)/magnification);
}

function checkStatus(standardStatus){
    if(status == standardStatus){
        correctCount++;
        if(correctCount%5 == 0){
            nowScore += 0.1;
            smaller(img);
        }
    }else{
        wrongCount++;
        if(wrongCount%5 == 0){
            nowScore -= 0.1;
            bigger(img);
        }
    }
    refreshCount();
}

// press the Directions: 37-left;38-up;39-right;40-down
function pressButton(img){   
    document.onkeydown = function(event){
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
        // space: zoom in
        if(event.keyCode == 32){
            nowScore -= 0.1;
            bigger(img);
            refreshCount();
        }
        // enter: pass
        if(event.keyCode == 13){
            changeDirections(img);
        }
    };
}

// change the directions randomly
function changeDirections(img){   
    let current = Math.floor(Math.random()*4); 
    let rotateDeg = current*90;            
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