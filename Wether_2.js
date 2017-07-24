'use strict';

const url = `http://api.openweathermap.org/data/2.5/weather?q=${prompt("Choose your city", "Moscow")}&appid=bd5e378503939ddaee76f12ad7a97608`;

const mainCityData = getMainCityData(url);

function getMainCityData(url) {

	let data =	fetch(url)
		.then( response => response.json() )
		.then( response => {
		let obj = {};
		obj['name'] = response.name;
		obj['temp'] = response.main.temp;
		obj['lat'] = response.coord.lat;
		obj['lon'] = response.coord.lon;
		return obj;
		})
		.then( obj => getCitysData(obj))
		.catch( () => console.log("нет такого города") );

	}

function getCitysData(obj) {
const count = prompt("How many citys?", "5");
return	fetch(`http://api.openweathermap.org/data/2.5/find?lat=${obj['lat']}&lon=${obj['lon']}&cnt=${count}&appid=bd5e378503939ddaee76f12ad7a97608`)
		.then( response => response.json() )
		.then( response => response.list)
		.then( response => getCitysNameTemp(response, obj))
		.catch( () => console.log("мимо") );

function getCitysNameTemp (arr, obj) {
	
    const newArr = [];
	for (let i = 0; i < arr.length; i++) {
		let newItem = {};
		newItem["name"] = arr[i]["name"];
		newItem["temp"] = arr[i]["main"]["temp"];
		newArr.push(newItem);
	}
	console.log(obj)
	console.log(newArr)
    for (let i = 0; i < newArr.length; i++) {
		if ( arr[i]['temp'] <= obj['temp'] ) {
			console.log('Москва - самая теплая')
		} else {
			console.log('В МОСКВЕ ЗИМА')
		}
	}
}