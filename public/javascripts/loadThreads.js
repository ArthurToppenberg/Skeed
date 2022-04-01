//load threads in forum page

function loadThreads(dir){
    //make post request to server and display all threads in forum
    fetch(dir)
    .then((response) => {
        return response.json();
    }).then((json) => {
        console.log(json);
        //showForums(json.forums);
    });
}

loadThreads('/forums/getThreads');