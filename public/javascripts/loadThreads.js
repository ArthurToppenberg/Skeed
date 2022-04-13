//load threads in forum page

//import commets scripts
import {getComments} from '/javascripts/loadComments.js';

//make post request to server
function post(path, cb){
    fetch(path)
    .then((response) => {
        return response.json();
    }).then((json) => {
        cb(json);
    });
}

//show threads on forum page
function showThreads(data){

    const threads = data.threads;

    removeExistingThreads();

    const forumContent = document.getElementById('forum-content');

    // tell unauthenticated users to do so
    if(!data.authenticated){
        var div = document.createElement('div');
        div.className = 'thread';
        div.style.width = '100%';
        div.style.transform = 'translateX(-5px)';
        div.style.backgroundColor = 'white';
        div.style.padding = '5px';
        div.style.borderRadius = '5px';
        div.style.marginBottom = '10px';

        const threadHeader = document.createElement('div');
        threadHeader.className = 'threadHeader';
        threadHeader.style.height = '20px';

        //create h3 for thread title
        var titlehtml = document.createElement('h3');
        titlehtml.innerHTML = 'Login to create threads and comments';
        titlehtml.style.margin = '0px';

        div.appendChild(threadHeader);
        threadHeader.appendChild(titlehtml);
        forumContent.appendChild(div);
    }

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
        //get votes
        const vote = forum.vote;
        //get the thread id
        const id = forum.id;
        //get the thread user vote
        const uservote = forum.uservote;
        //get number of comments
        const comments = forum.comments;
        
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
        const upvoteButton = document.createElement('button');
        upvoteButton.className = 'upvotebutton';
        upvoteButton.style.backgroundColor = '#00ff00';

        //down vote button
        const downvoteButton = document.createElement('button');
        downvoteButton.className = 'downvotebutton';
        downvoteButton.style.backgroundColor = '#ff0000';

        //div for vote counter
        const voteCounterDiv = document.createElement('div');
        voteCounterDiv.className = 'voteCounterDiv';
        //vote counter
        const voteCounter = document.createElement('p');
        voteCounter.className = 'voteCounter';

        //create p for thread author
        var authorhtml = document.createElement('p');
        authorhtml.innerHTML = 'Author: ' + author;
        authorhtml.style.position = 'absolute';
        authorhtml.style.top = '-10px';

        //create p for thread date
        var datehtml = document.createElement('p');
        datehtml.innerHTML = 'Date: ' + date;

        //open comments button
        const openCommentsButton = document.createElement('button');
        openCommentsButton.className = 'openCommentsButton';
        openCommentsButton.innerHTML = 'Open Comments (' + comments + ')';


        threadHeader.appendChild(titlehtml);
        div.appendChild(threadHeader);
        div.appendChild(contenthtml);
        threadFooter.appendChild(authorhtml);
        threadFooter.appendChild(datehtml);
        threadFooter.appendChild(openCommentsButton);
        voteButtonsDiv.appendChild(upvoteButton);
        voteButtonsDiv.appendChild(voteCounterDiv);
        voteCounterDiv.appendChild(voteCounter);
        voteButtonsDiv.appendChild(downvoteButton);
        threadFooter.appendChild(voteButtonsDiv);
        div.appendChild(threadFooter);

        forumContent.appendChild(div);

        upvoteButton.addEventListener('click', function(){
            updownVoteSend(id, 'up');
        });

        downvoteButton.addEventListener('click', function(){
            updownVoteSend(id, 'down');
        });
        
        //create comments div under thread for comments and comment from server
        var open = false;
        openCommentsButton.addEventListener('click', function(){
            if(open){// remove comment box
                open = false;
                openCommentsButton.innerHTML = 'Open Comments (' + comments + ')';
                div.removeChild(commentsDiv);
            }else{ // make comment box
                open = true;
                //make comments div
                const commentsDiv = document.createElement('div');
                commentsDiv.className = 'commentsDiv';
                commentsDiv.id = 'commentsDiv';
                openCommentsButton.innerHTML = 'Close Comments';
                div.appendChild(commentsDiv);
                getComments(commentsDiv, id); //loads comments 
            } 
        });

        //send up or down vote to server
        function updownVoteSend(id, vote){
            
            //send data to server
            const data = {vote:vote, id:id};

            // Creates a promise object for sending the desired data
            fetch("/forums/vote",{
                method: "POST",
                // Format of the body must match the Content-Type
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            }).then((response) => {
                return response.json();
            }).then((data) => {
                updateVoteDiv(data.votes, data.uservote);
            });
        }

        //function to updata vote div
        function updateVoteDiv(votes, userV){
           //change colors of vote buttons depending on the user's vote
            if(userV == 'up'){
                voteCounterDiv.style.backgroundColor = '#00ff00';
                voteCounter.style.color = '#000000';
            }
            else if(userV == 'down'){
                voteCounterDiv.style.backgroundColor = '#ff0000';
                voteCounter.style.color = '#000000';
            }
            else if(userV == 'guest'){ //diable both buttons if user has not voted
                //gray color
                upvoteButton.style.backgroundColor = '#2E382E';
                upvoteButton.disabled = true;
                downvoteButton.style.backgroundColor = '#2E382E';
                downvoteButton.disabled = true;
            }else{
                voteCounterDiv.style.backgroundColor = '#2E382E';
                voteCounter.style.color = '#FFFFFF';
            }
            voteCounter.innerHTML = votes;
        }

        //initial update of vote div
        updateVoteDiv(vote, uservote);
    });

}

function removeExistingThreads(){
    const forumContent = document.getElementById('forum-content');
    while (forumContent.firstChild) {
        forumContent.removeChild(forumContent.firstChild);
    }
}

//when the page loads call loadThreads
window.addEventListener('load', post('/forums/getThreads', showThreads));

export {post, showThreads};