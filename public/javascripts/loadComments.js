import {createComment} from '/javascripts/createComment.js';

function getComments(commentsDiv, id){ // get comments

    const request = {id: id};

    fetch("/forums/getComments",{
        method: "POST",
        // Format of the body must match the Content-Type
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(request)
    }).then((response) => {
        return response.json();
    }).then((data) => {
        addComments(data);
    });

    function addComments(data){
        data.comments.forEach(comment => { // load comments
            //create new div for comment
            const commentDiv = document.createElement('div');
            commentDiv.className = 'commentDiv';

            //add comment content to div
            const commentContent = document.createElement('p');
            commentContent.innerHTML = comment.username + ' -> \n' + comment.content + ' \n' + 'date: ' + comment.date;
            commentDiv.appendChild(commentContent);

            commentsDiv.appendChild(commentDiv);
        });

        //create make comment button at the end
        const commentDiv = document.createElement('div');
        commentDiv.className = 'commentDiv';

        //create comment button
        const commentButton = document.createElement('button');
        commentButton.className = 'commentButton'
        commentButton.innerHTML = 'New Comment'
        if(!data.validated){
            commentButton.disabled = true;
            commentButton.innerHTML = 'Login to Comment'
            commentButton.style.color = 'red';
        }

        commentDiv.appendChild(commentButton);
        commentsDiv.appendChild(commentDiv);

        //when button is clicked
        var createcommentcheck = false;

        commentButton.addEventListener('click', function(){
            if(createcommentcheck){
                //remove all comment input
                commentDiv.removeChild(document.getElementById('commentDiv'));
                commentButton.innerHTML = 'New Comment';
                createcommentcheck = false;
            }else{
                commentButton.innerHTML = 'Close Comment';
                createComment(commentDiv, id, () => {
                    //remove old comments
                    while (commentsDiv.firstChild) {
                        commentsDiv.removeChild(commentsDiv.firstChild);
                    }
                    //load new comments
                    getComments(commentsDiv, id);
                });
                createcommentcheck = true;
            }
        });
    }

}

export {getComments};