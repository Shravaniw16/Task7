const userContainer = document.getElementById("userContainer");
const reloadBtn = document.getElementById("reloadBtn");

function fetchUsers() {
    userContainer.innerHTML = "<p class='loading'>Loading user data...</p>";

    fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(users => {
            userContainer.innerHTML = "";

            users.forEach(user => {
                const div = document.createElement("div");
                div.className = "user-card";

                div.innerHTML = `
                    <h3>${user.name}</h3>
                    <p><b>Email:</b> ${user.email}</p>
                    <p><b>Address:</b> ${user.address.city}</p>
                `;

                userContainer.appendChild(div);
            });
        })
        .catch(error => {
            userContainer.innerHTML = "<p class='error'>❌ Unable to fetch data. Check your internet connection.</p>";
            console.error(error);
        });
}

reloadBtn.addEventListener("click", fetchUsers);

// Load data when page opens
fetchUsers();