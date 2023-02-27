import React from 'react'
import './card2.css'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { Typography } from '@material-ui/core';

  
const countdays= (day,mon,year)=>{
  let s1=0;
  if(year%4==0){
    if(year%100!= 0){
      s1=1;
    }
  }
  const day_map= new Map();
  day_map.set(1,31);
  if(s1== 0){
    day_map.set(2,28);
  }
  else{
    day_map.set(2,29);
  }
  day_map.set(3,31);
  day_map.set(4,30);
  day_map.set(5,31);
  day_map.set(6,30);
  day_map.set(7,31);
  day_map.set(8,31);
  day_map.set(9,30);
  day_map.set(10,31);
  day_map.set(11,30);
  day_map.set(12,31);
  let cnt=0;
  let i=1;
  while(i<mon){
    cnt= cnt+day_map.get(i);
    i++;
  }
  cnt+= day;
  return cnt;
}


const month_map= new Map();
month_map.set(1,"January");
month_map.set(2,"February");
month_map.set(3,"March");
month_map.set(4,"April");
month_map.set(5,"May");
month_map.set(6,"June");
month_map.set(7,"July");
month_map.set(8,"August");
month_map.set(9,"September");
month_map.set(10,"October");
month_map.set(11,"November");
month_map.set(12,"December");

function getDayOfFirstMonday(year) {
  const firstDay = new Date(year, 0, 1); // January 1st of the given year
  const daysUntilFirstMonday = (7 - firstDay.getDay()) % 7; // days until the next Monday
  const firstMonday = new Date(year, 0, 1 + daysUntilFirstMonday); // add days to January 1st
  const dayOfMonth = firstMonday.getDate(); // get the day of the month
  return dayOfMonth;
}



const knowweek = (year) => {
  let store = [];
  let z = 0;
  if (z == 0) {
    for (let i = 0; i < 53; i++) {
      let x = 7 * i + 1;
      let y = 7 * (i + 1);
      let z = i + 1;
      store = [...store, [x, y, z]];
    }
  }
  return store;
}

const knowweek2 = (cnt, store) => {
  let i = 0;
  for (i = 0; i < store.length; i++) {
    if (store[i][1] >= cnt) {
      return [store[i][2],cnt-store[i][0]+1];
    }
  }
}
let v1,v2,v3,v4,v5,v6;
const formatnum = (num)=>{
  let var1="";
  if(num<=999){
    var1= (num.toFixed(2)).toLocaleString();
  }
  else if((1000<=num) && (num<100000)){
    v1= Math.floor(num/1000).toLocaleString();
    var1+=v1;
    var1+=",";
    v2= Math.floor((num%1000)).toLocaleString();
    var1+= v2;
    var1+="."
    if(num%1==0){
      var1+= "00";
    }
    else{
    v6=( Math.round((num % 1) * 100)).toLocaleString();
    var1+= v6;}
  }
  else if((num>=100000) && (num<10000000)){
    v4 = (num / 100000).toFixed(2);
    var1+= v4;
    var1+= "L";
  }
  else{
    v5= (num/10000000).toFixed(2);
    var1+= v5;
    var1+= "CR";
  }
  return var1;
}






const Create_cards = (props) => {
  var date= [];
  var sale= [];
  var data= [];
  props.excelData.map((iterator)=>{
    const {Date_Of_Invoice}= iterator;
    const {Invoice_Amount}= iterator
    // const val= parseInt(Date_Of_Invoice)
    data= [...data,[Invoice_Amount,Date_Of_Invoice]];
    sale= [...sale,Invoice_Amount]
    date= [...date,Date_Of_Invoice]
  })
  console.log("THe elements inside date are ",date);
  console.log(data);



let maxYear=0;
let maxMon= 0;
let maxDay= 0;
let maxquat= 0;
let maxmyr=0;

for(const[money,dateString] of data){
  const year= parseInt(dateString.substring(6,10));
  const month= parseInt(dateString.substring(3,5));
  const day= parseInt(dateString.substring(0,2));

  if(year> maxYear){
    maxYear= year;
  }
}
console.log("I am the maxYear",maxYear);

for(const[money,dateString] of data){
    const year= parseInt(dateString.substring(6,10));
    const month= parseInt(dateString.substring(3,5));
    const day= parseInt(dateString.substring(0,2));
  if(year=== maxYear){
    if(month> maxMon){
        maxMon= month;
    }
  }
  }
  console.log("I am the maxMon",maxMon);

  for(const[money,dateString] of data){
    const year= parseInt(dateString.substring(6,10));
    const month= parseInt(dateString.substring(3,5));
    const day= parseInt(dateString.substring(0,2));
  if(year=== maxYear){
    if(month=== maxMon){
        if(maxDay< day){
            console.log("I am the possibilty of maxDay",day)
            maxDay= day;
        }
    }
  }
  }
if(1<= maxMon && maxMon<=3){
  maxquat= 1;
}
else if(4<= maxMon && maxMon<=6){
  maxquat=2;
}
else if(7<=maxMon && maxMon<=9){
  maxquat=3;
}
else{
  maxquat= 4;
}
maxmyr= maxYear;
console.log("I am the maxDay",maxDay);
let cnt_days= countdays(maxDay,maxMon,maxYear);
let store= knowweek(maxYear);
let no_week= knowweek2(cnt_days,store)[0];
let prev_days= knowweek2(cnt_days,store)[1];
console.log("I am the max year, max month and max day",maxYear,maxMon,maxDay);
console.log("I am the total number of days till last date",cnt_days);
console.log("I am storing the week information",store);
console.log("I am the week number of maximum day",no_week);



let sum1=0;
let sum2=0;
let rand1=0;
let rand2=0;
let temp1=0;
let temp2= 0;
let jav1=0;
let jav2=0;
let p= 0;
let k=0;
let m=0;
let n=0;
let dis_mon_quat2;
let dis_yr_quat2;
let dis_mon;
let dis_yr;
if(maxMon <=3){
  maxYear= maxYear-1;
  p=1;
}
if(p== 1){
    if(maxMon== 1){
        k= 1;
        dis_mon= 12;
        dis_yr= maxmyr-1;
    }
}
if(p==1){
    if(k==1){
        if(maxDay==1){
            m=1;
        }
    }
}
if(maxquat==1){
  n=1;
}
if(n==1){
 dis_mon_quat2= 4;
 dis_yr_quat2= maxmyr-1;
}
else{
  dis_mon_quat2= maxquat-1;
  dis_yr_quat2= maxmyr;
}

for(const[money,dateString] of data){
  const y1= parseInt(dateString.substring(6,10));
  const m1= parseInt(dateString.substring(3,5));
  const d1= parseInt(dateString.substring(0,3));
  
  if(p==0){
  if(y1== maxYear && m1<=maxMon ){
    if(m1>=4){
    sum1+= money;}
    else{
    sum2+= money;
    }
  }
  if(y1== maxYear-1 && m1<=maxMon ){
    if(m1>=4){
    sum2+= money;}
  }}
  if(p==1){
    if(y1== maxYear+1 && m1<= maxMon){
      sum1+= money;
    }
    if(y1== maxYear){
      if(m1>=4){
        sum1+= money;
      }
      else{
        sum2+= money;
      }
    }
    if(y1== maxYear-1){
      if(m1>= 4){
        sum2+= money;
      }
    }
  }

  if(y1== maxmyr){
    if(maxquat==1){
      if(1<= m1 && 3>=m1){
        jav1+= money;
      }
    }
    else if(maxquat== 2){
      if(4<=m1 && 6>=m1){
        jav1+= money;
      }
    }
    else if(maxquat== 3){
      if(7<=m1 && 9>=m1){
        jav1+= money;
      }
    }
    else if(maxquat== 4){
      if(10<=m1 && 12>=m1){
        jav1+= money;
      }
    }
  }

  if(maxquat== 4){
    if(y1== maxmyr && 7<=m1 && 9>= m1){
      jav2+= money;
    }
  }
  else if(maxquat== 3){
    if(y1== maxmyr && 4<=m1 && 6>=m1){
      jav2+= money;
    }
  }
  else if(maxquat== 2){
    if(y1== maxmyr && 1<=m1 && 3>=m1){
      jav2+= money;
    }
  }
  else{
    if(y1== maxmyr-1 && 10<=m1 && 12>=m1){
      jav2+= money;
    }
  }


if(p== 1){
if(k== 1){
    if(y1== maxYear+1){
        if(m1== 1){
            rand1+= money;
        }
    }
    if(y1== maxYear){
        if(m1== 12){
            rand2+= money;
        }
    }
}
else{
    if(y1== maxYear+1){
        if(m1== maxYear){
            rand1+= money;
        }
        if(m1== maxYear-1){
            rand1+= money;
        }
    }
}
}
else{
    if(y1== maxYear && m1== maxMon){
        rand1+= money;
    }
    if(y1== maxYear && m1== maxMon-1){
        rand2+= money;
    }
}
if(p==1){
    if(k==1){
        if(m==1){
            if(y1== maxYear+1 && m1== maxMon && d1== maxDay){
                temp1+= money;
            }
            
            if(y1== maxYear && m1== 12 && d1== 31){
                temp2+= money;
            }
        }
        else{
            if(y1== maxYear+1 && m1== maxMon && d1== maxDay){
                temp1+= money;
            }
            if(y1== maxYear+1 && m1== maxMon && d1== maxDay-1){
                temp2+= money;
            }
        }
    }
}
else{
  if(y1== maxYear && m1== maxMon && d1== maxDay){
    temp1+= money;
  }
  if(y1== maxYear && m1== maxMon && d1== maxDay-1){
    temp2+= money;
  }
}
}


let l1;
let l2;
{p==0 && console.log("The total sum of financial year from",maxYear,"to",maxYear+1,"is",sum1)}
{p==1 && console.log("The total sum of financial year from",maxYear,"to",maxYear+1,"is",sum1)}
{p==0 && console.log("The total sum upto financial year from",maxYear-1,"to",maxYear,"is",sum2);}
{p==1 && console.log("The total sum upto financial year from",maxYear-1,"to",maxYear,"is",sum2);}
console.log("The total sum upto present month is",rand1);
console.log("The total sum upto previous month is",rand2);
console.log("The total sum upto today is",temp1);
console.log("The total sum upto Previous day is",temp2);
console.log("The total sum in the present quarter ",maxquat,"is",jav1);
console.log("The total sum in previous quarter ",dis_mon_quat2,"is",jav2);
if(p==0){
  l1= maxYear;
  l2= maxYear+1;
}
if(p==1){
  l1= maxYear-1;
  l2= maxYear;
}

let py1;
let py4;
let py5;
let py6;
let py7;
let py8;

if(sum2!=0){
py1= ((sum1-sum2)/sum2)*100;}
else{
  py1= 100;
}
if(py1<0){
py4= -py1;
}
else{
  py4= py1;
}
let py2;
if(rand2!=0){
py2= ((rand1-rand2)/rand2)*100;}
else{
  py2= 100;
}
if(py2<0){
  py5= -py2;
}
else{
  py5= py2;
}
// console.log(py2);
let py3;
if(temp2!= 0){
py3= ((temp1-temp2)/temp2)*100;}
else{
  py3= 100;
}
if(py3<0){
  py6= -py3;
}
else{
  py6= py3;
}
// console.log(py3);
if(jav2!=0){
  py7= ((jav1-jav2)/(jav2))*100;
}
else{
  py7= 100;
}

if(py7<0){
  py8= -py7;
}
else{
  py8= py7;
}
console.log(py7);
  // return (
    
  //   <div className='box'>
  //   <div className= 'one'>
  //   <div className='fir'>
    // <div className={`ek ${py1 < 0 ? 'negative' : 'positive'}`}>
    //   <div style={{ display: 'flex', alignItems: 'center' }}>
    //   <Typography variant="h5" component="span">
    //   &#x20B9;
    // </Typography>
    //    <p> {formatnum(sum1)} </p> 
    //    </div>
    //   </div>
  //     <div className='dho'>
  //     </div>
  //   </div>
  //   <div className='sec'>
  //   <div className='teen'>
  //       {l1}-{l2}
  //     </div>
  //     <div className='chaar'>
  //     <div style={{ display: 'flex', alignItems: 'center' }}>
  //     {py1>0 && <ArrowUpwardIcon/>}
  //      {py1<0 && <ArrowDownwardIcon/>}
  //      <p> 
  //      {py4.toFixed(2)}% 
  //      </p>
  //     </div>
      
  //     </div>
  //   </div>
  //   </div>

  //   <div className= 'two'>
    // <div className='fir'>
    //   <div className='ek'>
    //   <div style={{ display: 'flex', alignItems: 'center' }}>
    //   <Typography variant="h5" component="span">
    //   &#x20B9;
    // </Typography>
    //    <p> {formatnum(rand1)} </p> 
    //    </div>
    //   </div>
  //     <div className='dho'>
  //     </div>
  //   </div>
  //   <div className='sec'>
  //   <div className='teen'>
  //     </div>
  //     <div className='chaar'>
  //     <div style={{ display: 'flex', alignItems: 'center' }}>
  //     {py2>0 && <ArrowUpwardIcon/>}
  //      {py2<0 && <ArrowDownwardIcon/>}
  //      <p> 
  //      {py5.toFixed(2)}% 
  //      </p>
  //     </div>
  //     </div>
  //   </div>
  //   </div>

  //   <div className= 'Three'>
  //   <div className='fir'>
  //     <div className='ek'>
  //     <div style={{ display: 'flex', alignItems: 'center' }}>
  //     <Typography variant="h5" component="span">
  //     &#x20B9;
  //   </Typography>
  //      <p> {formatnum(temp1)} </p> 
  //      </div>
  //     </div>
  //     <div className='dho'>
  //     </div>
  //   </div>
  //   <div className='sec'>
  //   <div className='teen'>
  //     </div>
      // <div className='chaar'>
      // <div style={{ display: 'flex', alignItems: 'center' }}>
      // {py3>0 && <ArrowUpwardIcon/>}
      //  {py3<0 && <ArrowDownwardIcon/>}
      //  <p> 
      //  {py6.toFixed(2)}% 
      //  </p>
      // </div>
      // </div>
  //   </div>
  //   </div>
  //   </div>
  // )
  return(
    <>
      <div className= "box">

      <div className= "one">

        <div className='fir'>
       <div className={`${py1 < 0 ? 'negative' : 'positive'}`}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
      <Typography variant="h5" component="span">
      &#x20B9;
    </Typography>
       <p> {formatnum(sum1)} </p> 
       </div>
      </div>
        </div>

        <div className='sec'>
          <div className='ek'>
            {l1}-{l2}
          </div>
          <div className="dho">
          <div className={`${py1 < 0 ? 'negative' : 'positive'}`}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
      {py1>0 && <ArrowUpwardIcon/>}
       {py1<0 && <ArrowDownwardIcon/>}
       <p> 
       {py4.toFixed(2)}% 
       </p>
      </div>
        </div>
        </div>
        </div>

      </div>

      <div className='two'>
        
        <div className='fir'>
        <div className={`${py7 < 0 ? 'negative' : 'positive'}`}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
      <Typography variant="h5" component="span">
      &#x20B9;
    </Typography>
       <p> {formatnum(jav1)} </p> 
       </div>
      </div>
      </div>

      <div className='sec'>
          <div className='ek'>
          Quarter{dis_mon_quat2}
          </div>
          <div className="dho">
          <div className={`${py7 < 0 ? 'negative' : 'positive'}`}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
      {py7>0 && <ArrowUpwardIcon/>}
       {py7<0 && <ArrowDownwardIcon/>}
       <p> 
       {py8.toFixed(2)}% 
       </p>
      </div>
      </div>
        </div>
        </div>


      </div>
      <div className='three'>
      <div className='fir'>
        <div className={`${py2 < 0 ? 'negative' : 'positive'}`}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
      <Typography variant="h5" component="span">
      &#x20B9;
    </Typography>
       <p> {formatnum(rand1)} </p> 
       </div>
      </div>
      </div>

      <div className='sec'>
          <div className='ek'>
            {month_map.get(maxMon)}
          </div>
          <div className="dho">
          <div className={`${py2 < 0 ? 'negative' : 'positive'}`}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
      {py3>0 && <ArrowUpwardIcon/>}
       {py3<0 && <ArrowDownwardIcon/>}
       <p> 
       {py6.toFixed(2)}% 
       </p>
      </div>
      </div>
        </div>
        </div>


      </div>
      <div className='four'>
        
      <div className='fir'>
        <div className={`${py3 < 0 ? 'negative' : 'positive'}`}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
      <Typography variant="h5" component="span">
      &#x20B9;
    </Typography>
       <p> {formatnum(temp1)} </p> 
       </div>
      </div>
      </div>

      <div className='sec'>
          <div className='ek'>
          Day{maxDay}
          </div>
          <div className="dho">
          <div className={`${py3 < 0 ? 'negative' : 'positive'}`}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
      {py3>0 && <ArrowUpwardIcon/>}
       {py3<0 && <ArrowDownwardIcon/>}
       <p> 
       {py6.toFixed(2)}% 
       </p>
      </div>
      </div>
        </div>
        </div>


      </div>
      </div>
    </>
  )




}

export default Create_cards