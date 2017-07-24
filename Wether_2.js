const url = `http://api.openweathermap.org/data/2.5/weather?q=${prompt("Choose your city", "Tokyo")}&appid=bd5e378503939ddaee76f12ad7a97608`;


fetch(url)
  .then( response => response.json() )
  .then( response => {
    let obj = {};
    obj["name"] = response.name;
    obj['temp'] = Math.floor(response.main.temp * 10);
    obj['lat'] = response.coord.lat;
    obj['lon'] = response.coord.lon;
    return obj;
  })
  .then( obj => getCitysData(obj))
  .catch( () => console.log("нет такого города") );

	

function getCitysData(obj) {
const count = prompt("How many citys?", "15");
return	fetch(`http://api.openweathermap.org/data/2.5/find?lat=${obj['lat']}&lon=${obj['lon']}&cnt=${count}&appid=bd5e378503939ddaee76f12ad7a97608`)
		  .then( response => response.json() )
		  .then( response => response.list)
		  .then( response => getCitysNameTemp(response, obj))
		  .catch( () => console.log("мимо") );
}  

function getCitysNameTemp (arr, obj) {
  let newArr = [];
    
  for (let i = 0; i < arr.length; i++) {
    let item = {};
    item["name"] = arr[i]["name"];
    item["temp"] = Math.floor(arr[i]["main"]["temp"] * 10);
    newArr.push(item);
  }
    console.log(obj)
  
    let nextArr = [];
  
  for (let i = 0; i < newArr.length; i++) {
    if ( obj['temp'] < newArr[i]['temp'] ) {
      nextArr.push(newArr[i])
    } 
  }
  
  console.log(nextArr)
 
  if(nextArr.length === 0) { 
    console.log(`в ${obj['name']} теплее, чем в ${arr.length} ближайших городах`)
  }else{
    for (let i = 0; i < nextArr.length; i++) {  
    console.log(`в ${nextArr[i]['name']} теплее на ${(nextArr[i]['temp'] - obj['temp'])/10} градусов, чем в ${obj['name']} `)
    }
  }  
}
