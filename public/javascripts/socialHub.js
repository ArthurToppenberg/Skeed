function socialHub(){

    //get users information from server
    fetch('../social/getinfo')
    .then((response) => {
        return response.json();
    }).then((data) => {
        if(data.status != ''){
            alert(data.status);
        }else{
            buildSocialHub(data);
        }
    });

    function buildSocialHub(data){
        //create div
        const socialHub = document.createElement('div');
        socialHub.className = 'socialHub';

        //create top div
        const socialHubTop = document.createElement('div');
        socialHubTop.className = 'socialHubTop';

        //title with username
        const socialHubTitle = document.createElement('h1');
        socialHubTitle.className = 'socialHubTitle';
        socialHubTitle.innerHTML = data.username;

        //create close button
        const closeButton = document.createElement('button');
        closeButton.className = 'closeButton top right';
        closeButton.innerHTML = 'X';
        
        //action listener for button to delete socialhub and open bottom tab
        closeButton.addEventListener('click', function(){
            socialHub.remove();
            bottomTab();
        });

        //create div to hold the social hub following and followers
        const socialHubFollowersFollowing = document.createElement('div');
        socialHubFollowersFollowing.className = 'socialHubFollowersFollowing';

        //following div
        const socialHubFollowing = document.createElement('div');
        socialHubFollowing.className = 'socialHubFollowingFollowers';
        socialHubFollowersFollowing.appendChild(socialHubFollowing);
            //following title div
            const socialHubFollowingTitleDiv = document.createElement('div');
            socialHubFollowingTitleDiv.className = 'topNavBar';
            socialHubFollowing.appendChild(socialHubFollowingTitleDiv);
                //following title text
                const socialHubFollowingTitleText = document.createElement('p');
                socialHubFollowingTitleText.className = 'topNavBarText';
                socialHubFollowingTitleText.innerHTML = 'Following';
                socialHubFollowingTitleDiv.appendChild(socialHubFollowingTitleText);
                //following content div
                const socialHubFollowingContentDiv = document.createElement('div');
                socialHubFollowingContentDiv.className = 'topNavBarContent';
                socialHubFollowingContentDiv.id = 'socialHubFollowingContent';
                socialHubFollowing.appendChild(socialHubFollowingContentDiv);
                //display following
                showFollowing(socialHubFollowingContentDiv);
                
                
        //followers div
        const socialHubFollowers = document.createElement('div');
        socialHubFollowers.className = 'socialHubFollowingFollowers';
        socialHubFollowersFollowing.appendChild(socialHubFollowers);
            //followers title div
            const socialHubFollowersTitle = document.createElement('div');
            socialHubFollowersTitle.className = 'topNavBar';
            socialHubFollowers.appendChild(socialHubFollowersTitle);
                //followers title text
                const socialHubFollowersTitleText = document.createElement('p');
                socialHubFollowersTitleText.className = 'topNavBarText';
                socialHubFollowersTitleText.innerHTML = 'Followers';
                socialHubFollowersTitle.appendChild(socialHubFollowersTitleText);
                //followers content div
                const socialHubFollowersContent = document.createElement('div');
                socialHubFollowersContent.className = 'topNavBarContent';
                socialHubFollowersContent.id = 'socialHubFollowersContent';
                socialHubFollowers.appendChild(socialHubFollowersContent);
                //display followers
                showFollowers(socialHubFollowersContent);
        
        //add freinds div
        const socialHubFriendsDiv = document.createElement('div');
        socialHubFriendsDiv.className = 'socialHubFriendsDiv';
        socialHub.appendChild(socialHubFriendsDiv);
            //friends title div
            const socialHubFriendsTitleDiv = document.createElement('div');
            socialHubFriendsTitleDiv.className = 'topNavBar';
            socialHubFriendsDiv.appendChild(socialHubFriendsTitleDiv);
                //friends title text
                const socialHubFriendsTitleText = document.createElement('p');
                socialHubFriendsTitleText.className = 'freindsSearchText';
                socialHubFriendsTitleText.innerHTML = 'Search for friends:';
                socialHubFriendsTitleDiv.appendChild(socialHubFriendsTitleText);
                //freinds seartch bar
                const socialHubFriendsSearchBar = document.createElement('input');
                socialHubFriendsSearchBar.className = 'freindsSearchBar';
                socialHubFriendsSearchBar.id = 'socialHubFriendsSearchBar';
                socialHubFriendsTitleDiv.appendChild(socialHubFriendsSearchBar);

            //friends results div
            const socialHubFriendsResultsDiv = document.createElement('div');
            socialHubFriendsResultsDiv.className = 'socialHubFriendsResultsDiv';
            socialHubFriendsResultsDiv.id = 'socialHubFriendsResultsDiv';
            socialHubFriendsDiv.appendChild(socialHubFriendsResultsDiv);

        document.body.appendChild(socialHub);
        socialHub.appendChild(socialHubTop);
        socialHub.appendChild(socialHubFollowersFollowing);
        socialHubTop.appendChild(socialHubTitle);
        socialHubTop.appendChild(closeButton);

        //add module searchAddFriends.js
        var searchAddFriends = document.createElement("script");
        searchAddFriends.type = "module";
        searchAddFriends.src = "/javascripts/searchAddFreinds.js";
        document.body.append(searchAddFriends);    
    }
    return {showFollowing};
}

function bottomTab(){
    //create div
    const bottomTab = document.createElement('div');
    bottomTab.className = 'bottomTab';

    //create button
    const bottomTabButton = document.createElement('button');
    bottomTabButton.className = 'bottomTabButton';

    //create text
    const bottomTabText = document.createElement('p');
    bottomTabText.className = 'bottomTabText';
    bottomTabText.innerHTML = 'Social Hub';

    //add action listener to button
    bottomTabButton.addEventListener('click', function(){
        //remove bottom tab and make a new div to hold the social hub
        bottomTab.remove();
        socialHub();
    });
    document.body.appendChild(bottomTab);
    bottomTab.appendChild(bottomTabButton);
    bottomTabButton.appendChild(bottomTabText);
}

bottomTab();

//-- auto update following and followers
setInterval(function(){
    
    showFollowers();
    showFollowing();
    
}, 5000); //call each 5 seconds

function showFollowing(socialHubFollowingContentDiv){

    //get following
    fetch('/social/following', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        if(data.status != ''){
            alert(data.status);
        }else{
            const followings = data.following;

            if(socialHubFollowingContentDiv == undefined){
                socialHubFollowingContentDiv = document.getElementById('socialHubFollowingContent');
            }
        
            //get socialHubFollowingContentDiv
            if(socialHubFollowingContentDiv != undefined){
        
                //remove all children
                while(socialHubFollowingContentDiv.firstChild){
                    socialHubFollowingContentDiv.removeChild(socialHubFollowingContentDiv.firstChild);
                }
        
                followings.forEach(following => {
                    //following content div
                    const followingDiv = document.createElement('div');
                    followingDiv.className = 'followingDiv';
                    socialHubFollowingContentDiv.appendChild(followingDiv);
                        //following username text
                        const followingName = document.createElement('p');
                        followingName.className = 'socialHubFriendsSearchResultsDivMatchUsername';
                        followingName.innerHTML = following;
                        followingDiv.appendChild(followingName);
                        //following unfollow button
                        const followingUnfollowButton = document.createElement('button');
                        followingUnfollowButton.className = 'followingUnfollowButton';
                        followingUnfollowButton.innerHTML = '-';
                        followingDiv.appendChild(followingUnfollowButton);
        
                    //action listner for unfollow button
                    followingUnfollowButton.addEventListener('click', function(){
                        //send unfollow request to server
                        fetch('/social/unfollow', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({follower: following})
                        }).then((response) => {
                            return response.json();
                        }).then((data) => {
                            if(data.status != ''){
                                alert(data.status);
                            }else{
                                //remove following div
                                followingDiv.remove();
                                showFollowing(data.following);
                            }
                        });
                    });
                });
            }
        }
    }); 
}

function showFollowers(socialHubFollowersContentDiv){

    //get followers
    fetch('/social/followers', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        if(data.status != ''){
            alert(data.status);
        }else{
            const followers = data.followers;
            const notFollowingBack = data.notFollowingBack;

            if(socialHubFollowersContentDiv == undefined){
                socialHubFollowersContentDiv = document.getElementById('socialHubFollowersContent');
            }

            //get socialHubFollowersContentDiv
            if(socialHubFollowersContentDiv != undefined){

                //remove all children
                while(socialHubFollowersContentDiv.firstChild){
                    socialHubFollowersContentDiv.removeChild(socialHubFollowersContentDiv.firstChild);
                }

                followers.forEach(follower => {
                    //followers content div
                    const followersDiv = document.createElement('div');
                    followersDiv.className = 'followersDiv';
                    socialHubFollowersContentDiv.appendChild(followersDiv);
                        //followers username text
                        const followersName = document.createElement('p');
                        followersName.className = 'socialHubFriendsSearchResultsDivMatchUsername';
                        followersName.innerHTML = follower;
                        followersDiv.appendChild(followersName);
                        //if follower is in not following list then display follow button
                        if(notFollowingBack != undefined){
                            if(notFollowingBack.includes(follower)){
                                //follow button
                                const followersFollowButton = document.createElement('button');
                                followersFollowButton.className = 'followersFollowButton';
                                followersFollowButton.innerHTML = '+';
                                followersDiv.appendChild(followersFollowButton);

                                //action listner for follow button
                                followersFollowButton.addEventListener('click', function(){
                                    const data = {username: follower};
                        
                                    fetch('/social/addFreind', {
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
                                            followersDiv.remove();
                                        }
                                    });
                                });
                            }
                        }
                });
            }
        }
    });
}
