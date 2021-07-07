
const GetAgo = (publishedAt) => {
    const dateObj=new Date(Date.parse(publishedAt));
    const date=new Date();
    console.log(dateObj);
    // if()
    const milli=date.getTime()-dateObj.getTime();
    console.log('mili',milli);
    const  sec=parseInt(milli/1000);
    if(sec<60) return sec==1?sec+' second ago':sec+' seconds ago';
    console.log('sec',sec);
    const min=parseInt(sec/60);
    if(min<60) return min==1?min+' minute ago':min+' minutes ago';
    console.log('min',min);
    const hour=parseInt(min/60);
    if(hour<24) return hour==1?hour+' hour ago':hour+' hours ago';
    console.log('hour',hour);
    const day=parseInt(hour/24);
    if(day<30) return day==1?day+' day ago':day+' days ago';
    console.log('day',day);
    const month=parseInt(day/30);
    if(month<12) return month==1?month+' month ago':month+' months ago';
    console.log('month',month);
    const year=parseInt(month/12);
    console.log('year',year);
    return year==1?year+' year ago':year+' years ago';
    console.log('year',year);
}

export default GetAgo;
