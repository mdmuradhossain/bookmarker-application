// Listen for form submit
document.getElementById('myForm').addEventListener('submit',saveBookMark);

// Save Bookmark
function saveBookMark(e){
    //Get Form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    var bookmark = {
        name: siteName,
        url: siteUrl
    }
    // Local Storage
    if(localStorage.getItem('bookmarks')===null){
        //Init Array
        var bookmarks = [];
        bookmarks.push(bookmark);
        // set to localStorage 
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }else{
        //Get bookmarks from local Storage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        //Add bookmark to array
        bookmarks.push(bookmark);
        //Re-set back to local Storage
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }
    e.preventDefault();
}