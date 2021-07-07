export const getDate=(x)=>{
    var str=x.substring(0,10);
    console.log(str);
    var yms=str.split('-');
    console.log(yms);
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    return yms[2]+' '+monthNames[parseInt(yms[1])-1].substring(0,3)+' '+yms[0];

}