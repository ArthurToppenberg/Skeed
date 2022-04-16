// this script will request inputed username and return closest match from server and display in socialhubfreindsresultsdiv
document.querySelector("#socialHubFriendsSearchBar").addEventListener("input", getClosesetMatch);

function getClosesetMatch() {
    //get inputed username
    var inputedUsername = document.querySelector("#socialHubFriendsSearchBar").value;

    //if inputed username is not empty
    if (inputedUsername != "") {

        const data = {inputedUsername: inputedUsername};

        //get closest match from server
        fetch('../social/searchfreinds', {
            method: "POST",
            // Format of the body must match the Content-Type
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        }).then((response) => {
            return response.json();
        }).then((data) => {
            //check status
            if (data.status != "") {
                alert(data.status);
            }else{
                displayClosestMatches(data.closestMatches);
            }
        });
    }

    function displayClosestMatches(closestMatches){
        //clear div
        document.querySelector("#socialHubFriendsResultsDiv").innerHTML = "";

        //create div for each match
        closestMatches.forEach(match => {
            //create div
            const socialHubFriendsSearchResultsDivMatch = document.createElement('div');
            socialHubFriendsSearchResultsDivMatch.className = 'socialHubFriendsSearchResultsDivMatch';

            //create div for username
            const socialHubFriendsSearchResultsDivMatchUsername = document.createElement('div');
            socialHubFriendsSearchResultsDivMatchUsername.className = 'socialHubFriendsSearchResultsDivMatchUsername';
            socialHubFriendsSearchResultsDivMatchUsername.innerHTML = match;

            //create div for add button
            const socialHubFriendsSearchResultsDivMatchAddButton = document.createElement('button');
            socialHubFriendsSearchResultsDivMatchAddButton.className = 'socialHubFriendsSearchResultsDivMatchAddButton';
            socialHubFriendsSearchResultsDivMatchAddButton.innerHTML = 'add';

            //action listener for button to add friend
            socialHubFriendsSearchResultsDivMatchAddButton.addEventListener('click', function(){
                addFriend(match);
            });

            //append divs to match div
            socialHubFriendsSearchResultsDivMatch.appendChild(socialHubFriendsSearchResultsDivMatchUsername);
            socialHubFriendsSearchResultsDivMatch.appendChild(socialHubFriendsSearchResultsDivMatchAddButton);

            //append match div to socialHubFriendsSearchResultsDiv
            document.getElementById('socialHubFriendsResultsDiv').appendChild(socialHubFriendsSearchResultsDivMatch);

            function addFriend(match){

                const data = {username: match};
                
                fetch('../social/addFreind', {
                    method: "POST",
                    // Format of the body must match the Content-Type
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(data)
                }).then((response) => {
                    return response.json();
                }).then((data) => {
                    //check status
                    if (data.status != "") {
                        alert(data.status);
                    }else{
                        getClosesetMatch();
                    }
                });

            }
        });
    }
}