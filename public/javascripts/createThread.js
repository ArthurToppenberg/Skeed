//create new thread in forum

//get funciton from loadThreads.js
import {post, showThreads} from '/javascripts/loadThreads.js';

document.querySelector('#newThread').addEventListener('click', newthread);

function newthread(){
    if(document.getElementById('newthread') == undefined){
    //ui to make new thread
    const createThreadDiv = document.createElement('div');
    createThreadDiv.className = 'createThread text';
    createThreadDiv.innerHTML = `Create a new thread`;
    createThreadDiv.style.backgroundColor = '#2E382E';
    createThreadDiv.style.height = '230px';
    createThreadDiv.style.padding = '10px';
    createThreadDiv.style.marginBottom = '10px';
    createThreadDiv.id = 'newthread';
    
    //make form
    const form = document.createElement('form');
    form.action = './newThread';
    form.method = 'post';
    form.id = 'newthreadform';
   
    //input title
    const title = document.createElement('input');
    title.className = '';
    title.type = 'text';
    title.placeholder = 'Thread name';
    title.name = 'title';

    //input content
    const content = document.createElement('textarea');
    content.className = 'form-control';
    content.placeholder = 'Thread content';
    content.style.width = '100%';
    content.style.height = '150px';
    content.name = 'content';

    //submit button
    const submit = document.createElement('input');
    submit.className = 'btn';
    submit.type = 'submit';
    submit.value = 'Create';

    //close button
    const closeButton = document.createElement('button');
    closeButton.className = 'button-close';
    closeButton.innerHTML = 'X';
    closeButton.className = 'top right';

    closeButton.addEventListener('click', () => {
        document.getElementById('forum-content').removeChild(createThreadDiv);
    });

    //append elements to form
    document.getElementById('forum-content').prepend(createThreadDiv);
    createThreadDiv.appendChild(closeButton);
    form.appendChild(title);
    form.appendChild(content);
    form.appendChild(submit);
    createThreadDiv.appendChild(form);

    document.forms['newthreadform'].addEventListener('submit', (e) => {
        e.preventDefault();
        fetch(e.target.action, {
            method: 'POST',
            body: new URLSearchParams(new FormData(e.target)) // event.target is the form
        }).then((resp) => {
            return resp.json(); 
        })
        .then((data) => {
            if(data.title == true && data.content == true && data.username == true){
                document.getElementById('forum-content').removeChild(document.getElementById('newthread'));

                //call other script to reload threads
                post('/forums/getThreads', showThreads);

            }else{
                
                //if error with title
                if(data.title == false){
                    document.getElementById('newthreadform').children[0].style.border = '1px solid red';
                }else{
                    document.getElementById('newthreadform').children[0].style.border = 'none';
                }

                //if error with content
                if(data.content == false){
                    document.getElementById('newthreadform').children[1].style.border = '1px solid red';
                }else{
                    document.getElementById('newthreadform').children[1].style.border = 'none';
                }

                //if error with username
                if(!data.username){
                    alert('You must be logged in to create a thread');
                }
            }
        })
    });
}
}

