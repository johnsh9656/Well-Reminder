//let country_name = ""

function updateHelpLines(desc1,helpline1,desc2,helpline2) {
    // Update the HTML elements with the help line numbers
    document.getElementById('helpLineDesc').innerText = desc1;
    document.getElementById('helpLineDesc2').innerText = desc2;
    document.getElementById('helpLine').innerText = helpline1;
    document.getElementById('helpLine2').innerText = helpline2;
    // Add more lines as needed
}

const getLocation = () => {
    // get user's location with ip address
    fetch("https://ipapi.co/json/")
        .then((response) => response.json())
        .then((ip_data) => {
            console.log(ip_data);
            console.log(ip_data.country_name);
            country_name = ip_data.country_name;
            document.getElementById('country').innerText = country_name;

            fetch('data.json')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // Fetch data for each country
                data.countries.forEach(country => {
                    console.log("Data name: ", country.name);
                    
                    // check if right country
                    if (country.name === country_name) {
                        console.log('data exists');                        
                        const desc1 = country.desc1;
                        const helpline1 = country.helpline1;
                        const desc2 = country.desc2;
                        const helpline2 = country.helpline2;
                        updateHelpLines(desc1,helpline1,desc2,helpline2);
                    }
                });
            })
            .catch(error => console.error('Error fetching data:', error));
        });
}

window.onload = getLocation();

/*
<script type="module">
        // Import the functions you need from the SDKs you need
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
        // TODO: Add SDKs for Firebase products that you want to use
        // https://firebase.google.com/docs/web/setup#available-libraries
      
        // Your web app's Firebase configuration
        const firebaseConfig = {
          apiKey: "AIzaSyBa6mSiFI71bmX1Ju7louKqeiGTmKxKyWg",
          authDomain: "well-reminder.firebaseapp.com",
          projectId: "well-reminder",
          storageBucket: "well-reminder.appspot.com",
          messagingSenderId: "338260258936",
          appId: "1:338260258936:web:a2a5dfe8de683c7df5fd8d"
        };
      
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
      </script>
*/
