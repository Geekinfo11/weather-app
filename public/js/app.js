const form = document.querySelector('form');
const search = document.querySelector('input');
const div = document.querySelector('.weather-data');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(!search.value){
        return div.innerHTML = '<p>you must provide the location</p>';
    }

    fetch('/weather?address='+search.value)
    .then((response)=>{
        response.json().then((data)=>{
            console.log(data);
            if(data.error){
                return div.innerHTML = '<p>'+data.error+'</p>';
            }

            div.innerHTML = '<p>Location: '+data.location+'</p>'+
                            '<p>Temperature: '+data.temperature+'°C</p>'+
                            '<p>Description: '+data.description+'</p>';
        });
    });
});