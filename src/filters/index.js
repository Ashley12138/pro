function getCreatTime(value){
    const date=new Date(value*1);
    var y=date.getFullYear();
    var m=date.getMonth()+1;
    var d=date.getDate();
    if (m<10) {
        m='0'+m;
    }
    if (d<10) {
        d='0'+d;
    }
    const t=y+'-'+m+'-'+d;
    return t
}
export{getCreatTime}