function getMsg() {
    // Creates a promise object for retrieving the desired data
    fetch("/home/allForums")
    // When recieved, exposes the JSON component
    .then((response) => {
        return response.json();
    })
    // Displays the message on the page
    .then((json) => {
        new_msg = "Server message: "+json.msg
        document.getElementById("msg").innerHTML = new_msg;
    });
}

console.log(getMsg());