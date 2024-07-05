const url = 'https://odds.p.rapidapi.com/v4/sports/upcoming/odds?regions=us&oddsFormat=decimal&markets=h2h%2Cspreads&dateFormat=iso';
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '5862e6893dmsh70127aa8798e0cap1027d2jsn69460ea29940',
        'x-rapidapi-host': 'odds.p.rapidapi.com'
    }
};

// Function to create and append odds cards to the DOM
function displayOdds(odds) {
    const oddsContainer = document.getElementById('odds');

    odds.forEach(odd => {
        const oddCard = document.createElement('div');
        oddCard.className = 'odd-card';

        const sportTitle = document.createElement('h2');
        sportTitle.textContent = `Sport: ${odd.sport_title}`;
        sportTitle.style.cursor = 'pointer';

        const teams = document.createElement('p');
        teams.textContent = `Teams: ${odd.home_team} vs ${odd.away_team}`;
        teams.className = 'hidden';

        const sites = document.createElement('p');
        sites.textContent = `Sites: ${odd.bookmakers[0].title} - Odds: ${odd.bookmakers[0].markets[0].outcomes.map(outcome => `${outcome.name}: ${outcome.price}`).join(', ')}`;
        sites.className = 'hidden';

        // Add event listener to toggle details display on click
        sportTitle.addEventListener('click', () => {
            teams.classList.toggle('hidden');
            sites.classList.toggle('hidden');
        });

        oddCard.appendChild(sportTitle);
        oddCard.appendChild(teams);
        oddCard.appendChild(sites);
        oddsContainer.appendChild(oddCard);
    });
}

// Async function to fetch data from the API and handle response
async function fetchOdds() {
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data); // Log the data to inspect its structure
        if (Array.isArray(data)) {
            displayOdds(data);
        } else {
            console.error('Unexpected response data format:', data);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Call the async function to fetch and display odds
fetchOdds();