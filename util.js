
//window.alert(new Date().pattern("yyyy-MM-dd hh:mm:ss"));
Date.prototype.pattern=function(fmt) {         
    var o = {         
    "M+" : this.getMonth()+1, //月份         
    "d+" : this.getDate(), //日         
    "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时         
    "H+" : this.getHours(), //小时         
    "m+" : this.getMinutes(), //分         
    "s+" : this.getSeconds(), //秒         
    "q+" : Math.floor((this.getMonth()+3)/3), //季度         
    "S" : this.getMilliseconds() //毫秒         
    };         
    var week = {         
    "0" : "/u65e5",         
    "1" : "/u4e00",         
    "2" : "/u4e8c",         
    "3" : "/u4e09",         
    "4" : "/u56db",         
    "5" : "/u4e94",         
    "6" : "/u516d"        
    };         
    if(/(y+)/.test(fmt)){         
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));         
    }         
    if(/(E+)/.test(fmt)){         
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);         
    }         
    for(var k in o){         
        if(new RegExp("("+ k +")").test(fmt)){         
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));         
        }         
    }         
    return fmt;         
}			
//var haorooms2= new Date().Format("yyyy-MM-dd hh:mm:ss");
Date.prototype.Format = function (fmt) {  
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
} 

Date.prototype.format = function (mask) { 
    var d = this;

    var zeroize = function (value, length) {

            if (!length) length = 2;

            value = String(value);

            for (var i = 0, zeros = ''; i < (length - value.length); i++) {

                zeros += '0';

            }

            return zeros + value;

        };

    return mask.replace(/"[^"]*"|'[^']*'|/b ( ? : d {
        1, 4
    } | m {
        1, 4
    } | yy( ? : yy) ? | ([hHMstT]) / 1 ? | [lLZ]) / b / g, function ($0) {

        switch ($0) {

        case 'd':
            return d.getDate();

        case 'dd':
            return zeroize(d.getDate());

        case 'ddd':
            return ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][d.getDay()];

        case 'dddd':
            return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d.getDay()];

        case 'M':
            return d.getMonth() + 1;

        case 'MM':
            return zeroize(d.getMonth() + 1);

        case 'MMM':
            return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()];

        case 'MMMM':
            return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][d.getMonth()];

        case 'yy':
            return String(d.getFullYear()).substr(2);

        case 'yyyy':
            return d.getFullYear();

        case 'h':
            return d.getHours() % 12 || 12;

        case 'hh':
            return zeroize(d.getHours() % 12 || 12);

        case 'H':
            return d.getHours();

        case 'HH':
            return zeroize(d.getHours());

        case 'm':
            return d.getMinutes();

        case 'mm':
            return zeroize(d.getMinutes());

        case 's':
            return d.getSeconds();

        case 'ss':
            return zeroize(d.getSeconds());

        case 'l':
            return zeroize(d.getMilliseconds(), 3);

        case 'L':
            var m = d.getMilliseconds();

            if (m > 99) m = Math.round(m / 10);

            return zeroize(m);

        case 'tt':
            return d.getHours() < 12 ? 'am' : 'pm';

        case 'TT':
            return d.getHours() < 12 ? 'AM' : 'PM';

        case 'Z':
            return d.toUTCString().match(/[A-Z]+$/);

            // Return quoted strings with the surrounding quotes removed      

        default:
            return $0.substr(1, $0.length - 2);

        }

    });

};
Date.createFormFormatString=function(fmt,str){
var formatSign=["y","M","d","H","h","m","s","S"];
var list=[];
var time=new Date(0);
for(var i in formatSign){
var sign=formatSign[i];
if(new RegExp("("+ sign +"+)").test(fmt)){
list.push({
sign:sign,
length:RegExp.$1.length,
index:fmt.indexOf(RegExp.$1)
});
}
}
list.sort(function(a,b){
return a.index-b.index;
});
var parts=str.match(new RegExp("([0-9]{1,4})","g"));
for(var i in list){
var kn=list[i];
var kv=parts[i];
if(kn.sign==="y"){
time.setYear(parseInt("2000".substr(0,4-kn.length)+kv));
}
else if(kn.sign==="M"){
time.setMonth(parseInt(kv)-1);
}
else if(kn.sign==="d"){
time.setDate(parseInt(kv));
}
else if(kn.sign==="H"){
time.setHours(parseInt(kv));
}
else if(kn.sign==="h"){
time.setHours(parseInt(kv));
}
else if(kn.sign==="m"){
time.setMinutes(parseInt(kv));
}
else if(kn.sign==="s"){
time.setSeconds(parseInt(kv));
}
else if(kn.sign==="S"){
time.setMilliseconds(parseInt(kv));
}
}
console.log(list);
console.log(time);
}
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

//扩展函数（是否包含某元素） temp.contains({"v":"111"});
Array.prototype.contains = function(e)
{
  var jsonId=Object.keys(e)[0] || "";
   for(i=0;i<this.length;i++)
    {
      if(!!jsonId && this[i][jsonId] == e[jsonId]){
           return i;  
        }else if(this[i] == e){
          return i;
        }
     }
    return false;
} 

function isScrolledIntoView(el) {
    var elemTop = el.getBoundingClientRect().top;
    var elemBottom = el.getBoundingClientRect().bottom;

    var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    return isVisible;
}
function visibleInContainer(p, e) {
        var z = p.getBoundingClientRect();
        var r = e.getBoundingClientRect();

        // Check style visiblilty and off-limits
        return e.style.opacity > 0 && e.style.display !== 'none' &&
               e.style.visibility !== 'hidden' &&
               !(r.top > z.bottom || r.bottom < z.top ||
                 r.left > z.right || r.right < z.left);
    }
var visibleY = function(el){
  var rect = el.getBoundingClientRect(), top = rect.top, height = rect.height, 
    el = el.parentNode;
  do {
    rect = el.getBoundingClientRect();
    if (top <= rect.bottom === false) return false;
    // Check if the element is out of view due to a container scrolling
    if ((top + height) <= rect.top) return false
    el = el.parentNode;
  } while (el != document.body);
  // Check its within the document viewport
  return top <= document.documentElement.clientHeight;
};
function isInViewport(element) {
  var rect = element.getBoundingClientRect();
  var html = document.documentElement;
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || html.clientHeight) &&
    rect.right <= (window.innerWidth || html.clientWidth)
  );
}
  window.onload=function()
        {
            var inputs=document.getElementsByTagName("input");
            for (var i=0;i<inputs.length; i++) { 
                if(inputs[i].getAttribute("type")=="text")
                 inputs[i].onkeyup=function(){
                    this.value=this.value.replace(/(^\s+)|\s+$/g,"");
                 };
            } 
   //https://github.com/toutouge/WebProject   