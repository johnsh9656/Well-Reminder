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
            country_name = ip_data.country_name;
            document.getElementById('country').innerText = country_name;

            fetch('data.json')
            .then(response => response.json())
            .then(data => {
                //console.log(data);
                // Fetch data for each country
                const targetData = data.countries.find(country => country.name === country_name);


                data.countries.forEach(country => {

                    // check if right country
                    if (country.name === country_name) {
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
