function socialHub(){

    //get users information from server
    fetch('social/getinfo')
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
