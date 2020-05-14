
// Initializing data of Geoname api
const geonameBaseUrl =  "http://api.geonames.org/searchJSON?q=";
const geonameUsername = "parth101";
const btn = document.getElementById("submit");
const savebtn = document.getElementById("save-btn");

let allData = {};

// Initializing data of Weatherbit api
const weatherbitBaseUrl = "https://api.weatherbit.io/v2.0/forecast/daily?";
const weatherbitApiKey = "c6af9b05e4e143de993e31996f746095";


// Initializing data of Pixabay api
const pixabayBaseUrl = "https://pixabay.com/api/";
const pixabayApiKey = "16532197-9730337b17378a223478266a6";

// Event listener to add function to existing HTML DOM element
btn.addEventListener("click", handleSubmit);
savebtn.addEventListener("click", handleSave);

// URL ENCODER
const encodeUrl = (url) => {
    console.log(encodeURI(url));
    return encodeURI(url);
}

// Helper function to fetch data from all the API's
const fetchData = (location, startDate, endDate) => {
    document.getElementById("submit").innerText = "Loading...";

    //Encoded the URL
    var geonameUrl = encodeUrl(`${geonameBaseUrl}${location}&maxRows=10&username=${geonameUsername}`);    

    // Fetch Geoname api
    fetch(geonameUrl)    
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        return data.geonames[0]; 
    })
    // Pass lat & long data to Weatherbit fetch api
    .then((data) => {
        console.log(data);
        
        const lat = data.lat;
        const long = data.lng;
        console.log(lat, long);

        
        
        // Fetched api of Weatherbit
        var weatherbitUrl = encodeUrl(`${weatherbitBaseUrl}lat=${lat}&lon=${long}&key=${weatherbitApiKey}`);
        fetch(weatherbitUrl)
        .then((res) => res.json())

        // UI Updation
        .then((weatherData) => {
            const weatherInfo = weatherData.data[0];

            const loc = document.getElementsByClassName("get-location");
            const weather = document.getElementById("weather");
            const tripLength = document.getElementById("get-trip-length");
            
            var today = new Date();
            console.log(today);

            loc[0].innerText = `${location}`;
            loc[1].innerText = `${location} is ${startDate.slice(8, 10)-today.getDate()} days away`;
            tripLength.innerText = `Your trip is ${endDate.slice(8,10)-startDate.slice(8,10)} days long`
            weather.innerHTML = `High: ${weatherInfo.app_max_temp} &nbsp Low: ${weatherInfo.app_min_temp}
                                <br> ${weatherInfo.weather.description}`;

            console.log(loc);
            console.log(weatherData);

        })
        // Fetch Pixabay API
        .then( () => {
            var pixabayUrl = encodeUrl(`${pixabayBaseUrl}?key=${pixabayApiKey}&q=${location}&image_type=photo`);
            console.log(pixabayUrl);

            fetch(pixabayUrl
            )
            .then((res) => res.json())
            .then((imageData) => {
                const image = document.getElementById("location-pic");
                const trips = document.getElementById("section__trips");

                const imageInfo = imageData.hits[0].pageURL;
                console.log(imageInfo);

                image.src=imageInfo;
                trips.style.display = "block";
                trips.scrollIntoView();

                document.getElementById("submit").innerText = "Submit"


                const allInfo = { location: location,
                            startDate: startDate,
                            endDate: endDate,
                            latitude: lat,
                            longitude: long,
                            tripLength: `${endDate.slice(8,10)-startDate.slice(8,10)}`,
                            imageUrl: `${imageInfo}`
                            };
                allData = allInfo;
                

                console.log(allData);
            })
            // .catch((error) => console.log(error));
        })
        .catch( (error) => console.log(error));
    });
};

// Callback function for click on submit button
function handleSubmit(event) {
    event.preventDefault();

    const location = document.getElementById("location").value;
    const startDate = document.getElementById("start-date").value;
    const endDate = document.getElementById("end-date").value


    // Helper function from fetching the API's to upadting the UI
    fetchData(location, startDate, endDate);
}

function handleSave(allData) {

     const postData = (allData) => {
        fetch('http://localhost:8082/addData',{
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(allData)
        })
        .then(res => res.json())
        .then( () => {
            console.log(allData);
        })
        .catch((error) => console.log(error));

        savebtn.disabled = "true";
        savebtn.innerText = "Saved";
        // savebtn.style.pointerEvents = "none";


    }

    postData();
}

export { handleSubmit,
        encodeUrl,
        handleSave
    }


