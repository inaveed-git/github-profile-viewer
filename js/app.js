// API URL for GitHub user profiles
const apiUrl = "https://api.github.com/users/";

// Selecting elements from the DOM
const main = document.querySelector(".main");
const search = document.querySelector("#search");

// Adding event listener for 'Enter' key press in the search input
search.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        getUser(search.value);
        search.value = "";
    }
});

// Function to fetch and display GitHub user profile
const getUser = async (username) => {
    try {
        // Fetching user data from the GitHub API
        const response = await fetch(apiUrl + username);
        const data = await response.json();

        // Creating HTML structure for the user profile card
        const card = `
        <div class="container">
            <div class="profileContainer">
                <div class="profileimg"><img src="${data.avatar_url}" alt=""></div>
                <div class="profiledetails">
                    <h1 class="profileName">${data.name}</h1>
                    <p>Creator of: <span>${data.company}</span></p>
                    <div class="profilefollow">
                        <h3 class="profileFollowers "><span>${data.followers}</span>Followers</h3>
                        <h3 class="profileFollowers "><span>${data.following}</span>Following</h3>
                        <h3 class="profileFollowers "><span>${data.public_repos}</span>Repos</h3>
                    </div>
                    <div class="profileRepos"></div>
                </div>
            </div>
        </div>`;

        // Rendering the user profile card to the main container
        main.innerHTML = card;

        // Fetching and displaying user repositories
        getRepos(username);
    } catch (error) {
        // Handling errors during API request
        console.error("Error fetching user data:", error);
    }
};

// Function to fetch and display user repositories
const getRepos = async (username) => {
    try {
        // Selecting the container for repositories
        const reposContainer = document.querySelector(".profileRepos");

        // Fetching user repositories from the GitHub API
        const response = await fetch(apiUrl + username + "/repos");
        const data = await response.json();

        // Creating anchor elements for each repository and appending to the container
        data.forEach(element => {
            const anchor = document.createElement("a");
            anchor.classList.add("reponame");
            anchor.href = element.html_url;
            anchor.innerText = element.name;
            anchor.target = "_blank";
            reposContainer.appendChild(anchor);
        });
    } catch (error) {
        // Handling errors during API request for repositories
        console.error("Error fetching user repositories:", error);
    }
};
