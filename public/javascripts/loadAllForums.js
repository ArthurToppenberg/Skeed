
function getForums(dir) {
    // Creates a promise object for retrieving the desired data
    fetch(dir)
    // When recieved, exposes the JSON component
    .then((response) => {
        return response.json();
    }).then((json) => {
        showForums(json.forums);
    });
}

function showForums(allForums) {

    const forums_div = document.getElementById('forums');

    allForums.forEach(element => {
        
        const forum_div = document.createElement('div');
        forum_div.classList.add('forum-flex-container');

        const forum_link = document.createElement('a');
        forum_link.href = `/forums${element}`;
        forum_link.innerHTML = element;

        forum_div.appendChild(forum_link);
        forums_div.appendChild(forum_div);

    });

}

getForums('/forums/allforums');