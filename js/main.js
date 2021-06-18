//listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e){
    e.preventDefault();
    
    //get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    if(!siteName || !siteUrl){
        alert('Please Fill Up Box');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
        alert('Please enter valid URL');
        return false;
    }

    
    //bookmark object
    var bookmark = {
        name : siteName,
        url : siteUrl
    }

    //if bookmarks is null
    if(localStorage.getItem('bookmarks') === null){

        var bookmarks = [];

        // the value which are gets from input send to localstorage
        bookmarks.push(bookmark);

        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    }else{
        // Get Bookmarks from localstorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

        //add to array
        bookmarks.push(bookmark);

        //reset back to locastorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    
    //reset the value
    document.getElementById('myForm').reset();

    //refetch bookmarks
    fetchBookmarks();

}

//delete bookmark
function deleteBookmark(url){
    // Get Bookmarks from localstorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    for(var i=0; i < bookmarks.length ; i++){
        if(bookmarks[i].url == url){
            bookmarks.splice(i,1);
        }
    }

    //reset back to locastorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));


    //refetch bookmarks
    fetchBookmarks();
}



//fetch bookmarks
function fetchBookmarks(){
        // Get Bookmarks from localstorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

        //get output id
        var bookmarksResults = document.getElementById('bookmarksResults');

        //build output
        bookmarksResults.innerHTML = "";

        for( var i = 0; i < bookmarks.length; i++){
            var name = bookmarks[i].name;
            var url = bookmarks[i].url;

            bookmarksResults.innerHTML += `
            <div class="bg-light p-3">
            <h3>${name}
            <a class="btn btn-primary" target="_blank" href="${url}">Visited</a>
            <a class="btn btn-danger" onclick=deleteBookmark(\'${url}\')>Delete</a>
            </h3>
            </div>
            `; 
        }
}

