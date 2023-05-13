const btn = document.querySelector('.j-btn-info')
const screen_info = document.querySelector('#screen-info')
const status_geo = document.querySelector('#status-geo')
const status_geo_tz = document.querySelector('#status-geo-tz')
const ref_map = document.querySelector('#ref-map')


const btn_tz = document.querySelector('.j-btn-tz')
let user_position = {
  "latitude": 0,
  "longitude": 0,
  "tz": null
}



// Функция, выводящая текст об ошибке
const error = () => {
  status_geo.textContent = 'Информация о местоположении недоступна';
};

const success = (position) => {
  // console.log('position', position)
  user_position.latitude = position.coords.latitude;
  user_position.longitude = position.coords.longitude;
  status_geo.textContent = `Широта: ${user_position.latitude}, Долгота: ${user_position.longitude}`
  ref_map.href = `https://www.openstreetmap.org/#map=18/${user_position.latitude}/${user_position.longitude}`;
  ref_map.textContent = 'Ссылка на карту...';

};

const success_tz = (position) => {
  // console.log('position', position)
  user_position.latitude = position.coords.latitude;
  user_position.longitude = position.coords.longitude;
  status_geo.textContent = `Широта: ${user_position.latitude}, Долгота: ${user_position.longitude}`
  ref_map.href = `https://www.openstreetmap.org/#map=18/${user_position.latitude}/${user_position.longitude}`;
  ref_map.textContent = 'Ссылка на карту...';

  let url_api_tz = `https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat=${user_position.latitude}&long=${user_position.longitude}`;
  const tzData = fetch(url_api_tz)
    .then((response) => { return response.json() })
    .then((data) => {
      console.log('Data tz:', data);
      status_geo_tz.textContent = data.timezone + " " + data.date_time_txt
      return data
    })
    .catch((error) => {
      console.log('An ERROR has occured:', error)
    })
};


btn.addEventListener('click', () => {
  // console.log('screen_info', screen_info)
  screen_info.textContent = '';
  status_geo.textContent = '';
  ref_map.href = '';
  status_geo_tz.textContent = '';
  screen_info.textContent = `Размер текущего экрана: Ширина: ${window.screen.width} Высота:${window.screen.height}`

  if (!navigator.geolocation) {
    status_geo.textContent = 'Geolocation не поддерживается вашим браузером';
  } else {
    status_geo.textContent = 'Определение местоположения…';
    navigator.geolocation.getCurrentPosition(success, error);
  }
})

btn_tz.addEventListener('click', () => {
  screen_info.textContent = '';
  status_geo.textContent = '';
  ref_map.href = '';
  status_geo_tz.textContent = '';

  if (!navigator.geolocation) {
    status_geo.textContent = 'Geolocation не поддерживается вашим браузером';
  } else {
    status_geo.textContent = 'Определение местоположения…';
    navigator.geolocation.getCurrentPosition(success_tz, error);
  }
});