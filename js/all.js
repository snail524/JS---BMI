var send = document.querySelector('.send');   // 看結果button
var list = document.querySelector('.list');   // 顯示清單
var h1 = document.querySelector('h1');       // 按下看結果後的 loop icon
var h3 = document.querySelector('h3');     //  按下看結果好所顯示出的結果(過輕、正常....這些) 
var h4 = document.querySelector('h4');    //   按下看結果後所顯示的bmi
var Reset = document.querySelectorAll('.reset'); //reset用 總共有三個 
var look = document.querySelector('.look');     //看結果button同 send

var data = JSON.parse(localStorage.getItem('listdata')) ||[]; // 讀localstorage的值
var date = new Date();   // js抓日期

for(var i=0;i<3;i++){   //抓3個.reset
    Reset[i].addEventListener('click',reset); 
}

send.addEventListener('click',addData);   // 監聽 看結果紐是否有觸擊
function reset(){  //reset localstorage和 data陣列

   localStorage.clear();
   str='';
   list.innerHTML = str;
   console.log(data);
    data=[];
}

function addData(e){     //  按下看結果後，讀入身高體重並計算BMI，並將結果加入todo陣列，也更新localstorage
    e.preventDefault();  
    var height = document.querySelector('.textheight').value;
    var weight = document.querySelector('.textweight').value;
    var bminum = weight / (height/100) / (height/100) ;
    bminum = bminum.toFixed(2);    //計算bmi並指取到小數點第2位
    var todo = {
        bmi : bminum,
        wei: weight,
        hei: height
    };
    data.push(todo);          //  增加至陣列
    updatelist(data);         //  更新BMI記錄中的清單
    end(data);                //  將看結果更新該次
    localStorage.setItem('listdata' , JSON.stringify(data));   //更新localstorage
};

function end(items){   //看結果按鈕變身成結果
    var i = (items.length)-1;     //讀取該次陣列值
    h4.innerHTML="BMI";            //以下危險式的寫法
    send.setAttribute("value", items[i].bmi );
    if(items[i].bmi<24 && items[i].bmi>=18.5 ){
        send.setAttribute("style","background: #424242; border:#86D73F solid 6px; color:#86D73F ");    //  外面圓
        h1.setAttribute("style","background-image: url(../img/icons_loop.png);background-repeat:no-repeat;  width: 24px;height:24px;background-position: 50% 50%;left:55%;top:75%;position:absolute;border-radius:50%;background-color: #86D73F;");  // loop  的icon
        h3.innerHTML="理想";
        h4.setAttribute("style","position: absolute;top: 60%;right: 58%;font-size: 14px;line-height: 17px;color: #86D73F "); // BMI的title顯示
        h3.setAttribute("style","line-height:120px; color:#86D73F"); //最右方文字   下面皆相同
    }else if (items[i].bmi<18.5){  
        send.setAttribute("style","background: #424242; border:#31BAF9 solid 6px; color:#31BAF9 ");
        h1.setAttribute("style","background-image: url(../img/icons_loop.png);background-repeat:no-repeat;  width: 24px;height:24px;background-position: 50% 50%;left:55%;top:75%;position:absolute;border-radius:50%;background-color: #31BAF9;");
        h3.innerHTML="過輕";
        h4.setAttribute("style","position: absolute;top: 60%;right: 58%;font-size: 14px;line-height: 17px;color: #31BAF9 ")
        h3.setAttribute("style","line-height:120px; color:#31BAF9");
    }else if(items[i].bmi<27 && items[i].bmi>=24){
        send.setAttribute("style","background: #424242; border:#FF982D  solid 6px; color:#FF982D  ");
        h1.setAttribute("style","background-image: url(../img/icons_loop.png);background-repeat:no-repeat;  width: 24px;height:24px;background-position: 50% 50%;left:55%;top:75%;position:absolute;border-radius:50%;background-color: #FF982D ;");
        h3.innerHTML="過重";
        h4.setAttribute("style","position: absolute;top: 60%;right: 58%;font-size: 14px;line-height: 17px;color: #FF982D  ")
        h3.setAttribute("style","line-height:120px; color:#FF982D ")
    }else if(items[i].bmi<30 && items[i].bmi>=27){
        send.setAttribute("style","background: #424242; border:#FF6C03  solid 6px; color:#FF6C03  ");
        h1.setAttribute("style","background-image: url(../img/icons_loop.png);background-repeat:no-repeat;  width: 24px;height:24px;background-position: 50% 50%;left:45%;top:75%;position:absolute;border-radius:50%;background-color: #FF6C03 ;");
        h3.innerHTML="輕度肥胖";
        h4.setAttribute("style","position: absolute;top: 60%;right: 58%;font-size: 14px;line-height: 17px;color: #FF6C03  ")
        h3.setAttribute("style","line-height:120px; color:#FF6C03 ")
    }else if (items[i].bmi<35 && items[i].bmi>=30){
        send.setAttribute("style","background: #424242; border:#FF6C03  solid 6px; color:#FF6C03  ");
        h1.setAttribute("style","background-image: url(../img/icons_loop.png);background-repeat:no-repeat;  width: 24px;height:24px;background-position: 50% 50%;left:45%;top:75%;position:absolute;border-radius:50%;background-color: #FF6C03 ;");
        h3.innerHTML="中度肥胖";
        h4.setAttribute("style","position: absolute;top: 60%;right: 58%;font-size: 14px;line-height: 17px;color: #FF6C03  ")
        h3.setAttribute("style","line-height:120px; color:#FF6C03 ")
    }else{
        send.setAttribute("style","background: #424242; border:#FF1200 solid 6px; color:#FF1200 ");
        h1.setAttribute("style","background-image: url(../img/icons_loop.png);background-repeat:no-repeat;  width: 24px;height:24px;background-position: 50% 50%;left:45%;top:75%;position:absolute;border-radius:50%;background-color: #FF1200;");
        h3.innerHTML="重度肥胖";
        h4.setAttribute("style","position: absolute;top: 60%;right: 58%;font-size: 14px;line-height: 17px;color: #FF1200 ")
        h3.setAttribute("style","line-height:120px; color:#FF1200")
    }
    
}
 

 function updatelist(items){
    str = '';
    var len = items.length;   //讀長度
    for(var i=0 ; i<len ; i++){
        if(items[i].bmi<24 && items[i].bmi>=18.5 ){
            str += '<li data-index='+i+' style="border-left: 7px #86D73F solid;">' +'理想' ;  
        }
        else if(items[i].bmi<18.5 ){
            str += '<li data-index='+i+' style="border-left: 7px #31BAF9 solid;">' +'過輕' ;  
        }else if(items[i].bmi<27 && items[i].bmi>=24 )
         {
            str += '<li data-index='+i+' style="border-left: 7px #FF982D solid;">' +'過重' ;  
        }else if(items[i].bmi<30 && items[i].bmi>=27 )
        {
           str += '<li data-index='+i+' style="border-left: 7px #FF6C03 solid;">' +'輕度肥胖' ;  
       }else if(items[i].bmi<35 && items[i].bmi>=30 )
       {
          str += '<li data-index='+i+' style="border-left: 7px #FF6C03 solid;">' +'中度肥胖' ;  
      }
        else{
            str += '<li data-index='+i+' style="border-left: 7px #FF1200 solid;">' +'重度肥胖' ;  
        }
        str+='<p><span>BMI </span> '+items[i].bmi + '</p> '  ;
        str += '<p><span>weight </span> '+items[i].wei +'kg'+ '</p>   ';
        str += '<p><span>height </span> '+items[i].hei +'cm'+ '</p>   ';
        str += '<span>'+ (date.getMonth()+1)+'-'+date.getDate()+'-'+date.getFullYear()+'<span></li>'  // 增加日期
    }
  list.innerHTML = str;
};