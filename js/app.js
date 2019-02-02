// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save Bookmark
function saveBookmark(e) {
    //Get Form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    if (!validateForm(siteName, siteUrl)) {
        return false;
    }

    var bookmark = {
        name: siteName,
        url: siteUrl
    }
    // Local Storage
    if (localStorage.getItem('bookmarks') === null) {
        //Init Array
        var bookmarks = [];
        bookmarks.push(bookmark);
        // set to localStorage 
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        //Get bookmarks from local Storage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        //Add bookmark to array
        bookmarks.push(bookmark);
        //Re-set back to local Storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    //CLear form
    document.getElementById('myForm').reset();
    
    // Re-fetch bookmarks
    fetchBookmarks();

    // Prevent form From submitting
    e.preventDefault();
}

// Validate Form
function validateForm(siteName, siteUrl) {
    if (!siteName || !siteUrl) {
        alert('Please fill in the form');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (!siteUrl.match(regex)) {
        alert('Please use a valid URL');
        return false;
    }

    return true;
}

// Fetch bookmarks from localStorage
function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Get Output id
    var bookmarksResults = document.getElementById('bookmarksResults');

    // Build output
    bookmarksResults.innerHTML = '';
    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="well">' +
            '<h3>' + name +
            '<a href="' + url + '" class="btn btn-success" target="_blank">Visit</a>' +
            '<a href="#" class="btn btn-danger" onclick="deleteBookmark(\'' + url + '\')">Delete</a>' +
            '</h3>' +
            '</div>';
    }
}

// Delete Bookmark
function deleteBookmark(url) {
    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // loop through bookmarks
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            // Remove from array
            bookmarks.splice(i, 1);
        }
    }

    // Re-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    // Re-fetch bookmarks
    fetchBookmarks();
}