let emails = [{
        email: "john.doe@gmail.com",
        password: "123456"

    },

    {
        email: "chris@gmail.com",
        password: "666666"
    },

    {
        email: "morgan.freeman@gmail.com",
        password: "inglorious"
    },

    {
        email: "heisenberg@gmail.com",
        password: "breaking"
    },

    {
        email: "delilah@gmail.com",
        password: "safe_password"
    },

];


// Select inputs and buttons, add event listener that validates the input value and redirects to next page

const button = document.getElementById('submit-btn');

button.addEventListener('click', () => {
    emails.forEach(email => {
        // Add a way to take email/password pair and not all array
        const emailInput = document.getElementById('username');
        const passInput = document.getElementById('pass');

        if (emailInput.value === email.email && passInput.value === email.password) {
            window.location.href = 'index.html';
            console.log('Here comes next page redirection')
        } else if (emailInput.value === "" || passInput.value === "") {
            console.log('Error message')
        }
    })
})