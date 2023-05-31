//  window.addEventListener('load',()=>{
//       let long;
//       let lat;
//       let tempDescription=document.querySelector('.temperature-description');
//       let tempDegree=document.querySelector('.temperature-degree');
//       let locationTimezone=document.querySelector('.location-timezone');
//       if(navigator.geolocation){
//        navigator.geolocation.getCurrentPosition(position=>{
        
//         long=position.coords.longitude;
//         lat=position.coords.latitude;
// let proxy=`https://cors-anywhere.herokuapp.com`;
//         let api=`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${long}&key=1f753703101d433da5aef27df8ae9025&include=minutely`;
//      //    let api=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid={76080743b47ad73ea0595deec48c28c9} `;
     
       
//         fetch(api)
//         .then(response=>{
//          return response.json()
//         })
//         .then(data=>{
//          console.log(data);
//          let {app_temp,}=data.data[0];
//          let description=data.data[0].weather.description;
//          let timezone=data.data[0].timezone;
       
//          //set elements from api
//          tempDegree.textContent=app_temp;
//          tempDescription.textContent=description;
//          locationTimezone.textContent=timezone;
//         });
//     });

  
//       }
//      function seticons(icon,iconid){
//           let Skycons=new Skycons({color:'white'});
         
//      }

//  });
let search=document.querySelector('.searchArea button');
search.addEventListener('click',()=>{
     let apiKey='76080743b47ad73ea0595deec48c28c9';
     let cityNname=document.querySelector('.searchArea input').value;
     let api=`https://api.openweathermap.org/data/2.5/weather?q=${cityNname}&appid=${apiKey}`;
     
     fetch(api)
     .then(response=>{
          return response.json();
     })
     .then(data=>{
          console.log(data);
          
          localStorage.setItem('data',data);

          if(data.cod==404){
               document.querySelector('.error').style.display='block';
          }
          else{
               document.querySelector('.error').style.display='none';
               
               let {lat,lon}=data.coord;
               console.log(lat,lon);
     
               let apiL=`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=1f753703101d433da5aef27df8ae9025&include=minutely`;
               fetch(apiL)
               .then(response=>{return response.json();})
               .then(collection=>{console.log(collection);
                    let {timezone}=collection.data[0];
               document.querySelector('.timezone').textContent=timezone;
     
     
               document.querySelector('.humidity p').textContent=data.main.humidity+' %';
               document.querySelector('.windSpeed p').textContent=data.wind.speed+' kmph';
     
               temperature=data.main.temp;
               temperature=Math.round(temperature-273)+"°C";
               document.querySelector('.temperature p').textContent=temperature;
     
               document.querySelector('.location p').textContent=data.name+`  (${data.sys.country})`;
     
               let description=data.weather[0].description;
               console.log(description);
               document.querySelector('.description').textContent=description;
               
               let weather=collection.data[0].weather.icon;
               console.log(weather.toLowerCase());
               icon=document.querySelector('.des img');
               icon.src=`/weather web page/weather/weather icons/${weather}.png`;
     
     
              
          });
          }

         
      
     
  
      
})

});