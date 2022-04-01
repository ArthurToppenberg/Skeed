//create new thread in forum

function newthread(){
    //ui to make new thread
    const createThreadDiv = document.createElement('div');
    createThreadDiv.className = 'createThread text';
    createThreadDiv.innerHTML = `Create a new thread`;
    createThreadDiv.style.backgroundColor = '#2E382E';
    createThreadDiv.style.height = '230px';
    createThreadDiv.style.padding = '10px';

    //make form
    const form = document.createElement('form');
    form.action = './newThread';
    form.method = 'post';
   
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

    //close button
    const closeButton = document.createElement('button');
    closeButton.className = 'button-close';
    closeButton.innerHTML = 'X';
    closeButton.className = 'top right';

    closeButton.addEventListener('click', () => {
        document.getElementById('forum-content').removeChild(createThreadDiv);
    });

    //append elements to form
    document.getElementById('forum-content').appendChild(createThreadDiv);
    createThreadDiv.appendChild(closeButton);
    form.appendChild(title);
    form.appendChild(content);
    form.appendChild(submit);
    createThreadDiv.appendChild(form);
}
