import Vue from 'vue';

Vue.filter('capitalize', (value) => {
    let newValue = '';
    if (!value) return newValue;
    newValue = value.toString();
    return newValue.toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');
});

Vue.filter('lowercase', (value) => {
    let newValue = '';
    if (!value) return newValue;
    newValue = value.toString();
    return newValue.toLowerCase();
});

Vue.filter('appendGreaterThanSign', (value) => {
    let newValue = '';
    if (!value) return newValue;
    newValue = value.toString();
    return `${newValue} >`
});

Vue.filter('percentage', (value) => {
    return ((value) * 100).toFixed(0) + '%'
});

Vue.filter('formatHours', (value) => {
    let hours = value
    if (hours === 0) {
        hours = ''
    } else if (hours === 1) {
        hours = `${hours} hr`
    } else {
        hours = `${hours} hrs`
    }
    return hours
});

Vue.filter('formatShortHours', (value) => {
    let hours = value
    if (hours === 0) {
        hours = ''
    } else {
        hours = `${hours}h`
    }
    return hours
});

Vue.filter('formatMinutes', (value) => {
    let minutes = value
    if (minutes === 0 || minutes === 60) {
        minutes = ''
      } else if (minutes === 1) {
        minutes =  `${minutes} min`
      } else {
        minutes = `${minutes} mins`
      }
      return minutes
});

Vue.filter('formatShortMins', (value) => {
    let minutes = value
    if (minutes === 0 || minutes === 60) {
        minutes = ''
      }  else {
        minutes = `${minutes}m`
      }
      return minutes
});

// Vue.filter('formatTimeToHM', (value) => {
//     let seconds = value
//     seconds = 
//     return 
// })

Vue.filter('numberWithCommas', (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
});
