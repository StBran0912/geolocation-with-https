"use strict";

// Variante mit await
const fnCallFetch = () => {
    if ('geolocation' in navigator) {
        
        navigator.geolocation.getCurrentPosition(async position => {

            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            document.getElementById('latitude').innerText = lat;
            document.getElementById('longitude').innerText = lon;

            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ datum: new Date().toLocaleString(), latitude: lat, longitude: lon })
            }
            
            const res = await fetch('/api', options);
            const info = await res.json();
            document.getElementById('hinweis').innerText = info.status;
        });
        
    } else {
        document.getElementById('hinweis').innerText = 'geolocation is not available';
    }    
}

document.querySelector("#btnstart").addEventListener("click", fnCallFetch);
