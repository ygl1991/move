function computedStyle(element){
   var computedStyle=null;
   if(document.defaultView && typeof document.defaultView.getComputedStyle=='function'){
    computedStyle=document.defaultView.getComputedStyle(element,null);
   }else{
    computedStyle=element.currentStyle;
   }
   return computedStyle;
}
function startMove(obj,style,json,fnEnd){
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        var bStop=true;     
        for(var attr in json){
            var cur=0;
            if(attr=='opacity'){
                cur=Math.round(parseFloat(computedStyle(obj)[attr])*100);
            }else{
                cur=parseInt(computedStyle(obj)[attr]);
            }
            if(style && style.buffer){
              var speed=style.rate ? (json[attr]-cur)/style.rate :(json[attr]-cur)/6;
              speed=speed>0?Math.ceil(speed):Math.floor(speed);  
            }else{
               if(cur<json[attr]){
                  var speed=style.rate ? style.rate : 7;
               }else{
                  var speed=-style.rate ? style.rate : -7;
               }
            }       
            if(json[attr]!=cur)
                bStop=false;
            if(attr=='opacity'){
                if(style && style.buffer){
                   cur+=speed;
                }else{
                   if(Math.abs(cur-json[attr])<=Math.abs(speed)){               
                       cur=json[attr]; 
                    }else{
                       cur+=speed; 
                    }
                }
            	obj.style.filter='alpha(opacity:'+cur+')';
                obj.style.opacity=cur/100;
            }else{             
                if(style && style.buffer){
                    obj.style[attr]=cur+speed+'px';  
                }else{
                    if(Math.abs(cur-json[attr])<=Math.abs(speed)){
                       obj.style[attr]=json[attr]+'px';
                    }else{
                       obj.style[attr]=cur+speed+'px';  
                    }
                }                         
            }
        }
        if(bStop){
            clearInterval(obj.timer);
            if(fnEnd){
                fnEnd();
            }
        }
    },30);
}

