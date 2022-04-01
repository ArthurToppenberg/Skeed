//load threads in forum page

function loadThreads(){

    dir = '/javascripts/loadThreads.js';

    //make post request to server and display all threads in forum
    fetch(dir)
    .then((response) => {
        //console.log(response);
        return response.json();
    }).then((json) => {
        showThreads(json.threads);
    });
}

//show threads on forum page
function showThreads(threads){

    removeExistingThreads();

    const forumContent = document.getElementById('forum-content');

    //get each thread
    threads.forEach(forum => {
        //get the thread title
        const title = forum.title;
        //get the thread content
        const content = forum.content;
        //get the thread author
        const author = forum.username;
        //get the thread date
        const date = forum.date;
        
        //create div for thread
        var div = document.createElement('div');
        div.className = 'thread';
        div.style.width = '100%';
        div.style.transform = 'translateX(-5px)';
        div.style.backgroundColor = '#FCD3DE';
        div.style.padding = '5px';
        div.style.borderRadius = '5px';
        div.style.marginBottom = '10px';
        //create h3 for thread title
        var titlehtml = document.createElement('h3');
        titlehtml.innerHTML = title;
        //create p for thread content
        var contenthtml = document.createElement('p');
        contenthtml.innerHTML = content;
        contenthtml.style.whiteSpace = 'pre-wrap';
        //create p for thread author
        var authorhtml = document.createElement('p');
        authorhtml.innerHTML = 'Author: ' + author;
        //create p for thread date
        var datehtml = document.createElement('p');
        datehtml.innerHTML = 'Date: ' + date;

        div.appendChild(titlehtml);
        div.appendChild(contenthtml);
        div.appendChild(authorhtml);
        div.appendChild(datehtml);

        forumContent.appendChild(div);
    });
}

function removeExistingThreads(){
    const forumContent = document.getElementById('forum-content');
    while (forumContent.firstChild) {
        forumContent.removeChild(forumContent.firstChild);
    }
}

loadThreads();

export function showThreads();