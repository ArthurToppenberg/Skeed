//load threads in forum page

function loadThreads(){

    const dir = '/forums/getThreads';

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
        console.log(author);
        //get the thread date
        const date = forum.date;
        
        //create div for thread
        var div = document.createElement('div');
        div.className = 'thread';
        div.style.width = '100%';
        div.style.transform = 'translateX(-5px)';
        div.style.backgroundColor = 'white';
        div.style.padding = '5px';
        div.style.borderRadius = '5px';
        div.style.marginBottom = '10px';

        //header for thread
        const threadHeader = document.createElement('div');
        threadHeader.className = 'threadHeader';
        threadHeader.style.height = '20px';

        //create h3 for thread title
        var titlehtml = document.createElement('h3');
        titlehtml.innerHTML = title;
        titlehtml.style.margin = '0px';
        
        //create p for thread content
        var contenthtml = document.createElement('p');
        contenthtml.innerHTML = content;
        contenthtml.style.whiteSpace = 'pre-wrap';

        //footer for thread
        const threadFooter = document.createElement('div');
        threadFooter.className = 'threadFooter';
        threadFooter.style.height = '30px';

        //create div for up and down vote buttons
        const voteButtonsDiv = document.createElement('div');
        voteButtonsDiv.className = 'voteButtonsDiv';
        
        //upvote button
        const upvoteIcon = document.createElement('i');
        upvoteIcon.className = 'upvotebutton';
        upvoteIcon.src =  '../images/thumbs.png';

        //down vote button
        const downvoteIcon = document.createElement('i');
        downvoteIcon.className = 'downvotebutton';
        downvoteIcon.src =  '../images/thumbs.png';

        //create p for thread author
        var authorhtml = document.createElement('p');
        authorhtml.innerHTML = 'Author: ' + author;
        authorhtml.style.position = 'absolute';
        authorhtml.style.top = '-10px';

        //create p for thread date
        var datehtml = document.createElement('p');
        datehtml.innerHTML = 'Date: ' + date;

        threadHeader.appendChild(titlehtml);
        div.appendChild(threadHeader);
        div.appendChild(contenthtml);
        threadFooter.appendChild(authorhtml);
        threadFooter.appendChild(datehtml);
        voteButtonsDiv.appendChild(upvoteIcon);
        voteButtonsDiv.appendChild(downvoteIcon);
        threadFooter.appendChild(voteButtonsDiv);
        div.appendChild(threadFooter);

        forumContent.appendChild(div);
    });
}

function removeExistingThreads(){
    const forumContent = document.getElementById('forum-content');
    while (forumContent.firstChild) {
        forumContent.removeChild(forumContent.firstChild);
    }
}

//when the page loads call loadThreads
window.addEventListener('load', loadThreads);

export {loadThreads};