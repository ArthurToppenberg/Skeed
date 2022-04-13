function createComment(commentsDiv, id, cb){

    //create comment div
    const commentDiv = document.createElement('div');
    commentDiv.className = 'commentDiv';
    commentDiv.id = 'commentDiv';
    console.log(id);

    //text area for comment
    const commentTextArea = document.createElement('textarea');
    commentTextArea.className = 'commentTextArea';
    commentTextArea.placeholder = 'Enter comment here ...';

    //create submit button
    const submitButton = document.createElement('button');
    submitButton.className = 'commentSubmitButton';
    submitButton.innerHTML = 'Submit';

    commentDiv.appendChild(commentTextArea);
    commentDiv.appendChild(submitButton);
    commentsDiv.appendChild(commentDiv);

    submitButton.addEventListener('click', function(){
        
        const data = {id: id, content: commentTextArea.value};

        //send comment to server
        fetch("/forums/newComment",{
            method: "POST",
            // Format of the body must match the Content-Type
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if(data.status){
                //remove all comment input
                commentDiv.remove();

                cb();
            }else{

            }
        });

    });

}

export {createComment};