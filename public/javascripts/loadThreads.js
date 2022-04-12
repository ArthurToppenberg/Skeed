//load threads in forum page

//make post request to server
function post(path, cb){
    fetch(path)
    .then((response) => {
        return response.json();
    }).then((json) => {
        cb(json.threads);
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
        //get votes
        const vote = forum.vote;
        //get the thread id
        const id = forum.id;
        //get the thread user vote
        const uservote = forum.uservote;
        
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

        threadHeader.appendChild(titlehtml);
        div.appendChild(threadHeader);
        div.appendChild(contenthtml);
        threadFooter.appendChild(authorhtml);
        threadFooter.appendChild(datehtml);
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
            }
            else if(userV == 'down'){
                voteCounterDiv.style.backgroundColor = '#ff0000';
            }
            else if(userV == 'guest'){ //diable both buttons if user has not voted
                //gray color
                upvoteButton.style.backgroundColor = '#2E382E';
                upvoteButton.disabled = true;
                downvoteButton.style.backgroundColor = '#2E382E';
                downvoteButton.disabled = true;
            }else{
                voteCounterDiv.style.backgroundColor = '#2E382E';
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

export {post};