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
    
    e.preventDefault();
}