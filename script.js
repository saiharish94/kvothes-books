function openSearch() {
    var searchText = document.getElementById("searchfield").value;
    if (searchText && searchText.length > 2) {
        document.getElementById("overlay").style.display = 'block';
        document.getElementById("overlayText").style.display = 'block';
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function () {
            renderSearchResults(this.responseText);
            localStorage.setItem('oldRecordsIdentifier', this.responseText);

            setTimeout(function () {
                document.getElementById("overlay").style.display = 'none';
                document.getElementById("overlayText").style.display = 'none';
            }, 2000);
        }
        xhttp.open("GET", "https://www.googleapis.com/books/v1/volumes?q=" + searchText);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("fname=Henry&lname=Ford");
    } else {
        alert('search with minimum 3 charecters')
    }
}

function renderSearchResults(results) {
    var html = '';
    if (results) {
        var json = JSON.parse(results);
        if (json.totalItems && json.totalItems === 0) {
            alert('your search has no records, please try again');
        }
        if (json.totalItems && json.totalItems > 0 && json.items && json.items.length) {
            for (let i = 0; i < json.items.length; i++) {
                if (json.items[i].volumeInfo) {
                    var thumbnail = json.items[i].volumeInfo.imageLinks ? json.items[i].volumeInfo.imageLinks.thumbnail ? json.items[i].volumeInfo.imageLinks.thumbnail : '' : '';
                    var title = json.items[i].volumeInfo.title ? json.items[i].volumeInfo.title : 'Title not defined';
                    var author = json.items[i].volumeInfo.authors ? json.items[i].volumeInfo.authors[0] ? json.items[i].volumeInfo.authors[0] : 'Author name not defined' : 'Author name not defined';
                    var desc = json.items[i].volumeInfo.description ? json.items[i].volumeInfo.description : 'Description not defined';

                    if (desc && desc.length > 100) {
                        desc = desc.substring(0, 100) + '...';
                    }

                    html += '<div class="col-md-4"><div class="searchResults"><div class="searchResultsImg"><img src="' + thumbnail + '"/></div><div class="searchResultsContent"><div class="searchResultsContentTitle">' + title + '</div><div class="searchResultsContentAuthor">by ' + author + '</div><div class="searchResultsContentDescription">' + desc + '</div></div></div></div>'
                }
            }
            document.getElementById("searchResultsRecords").innerHTML = html;
        }
    }

}

function sessionSearch() {
    if (localStorage.getItem('oldRecordsIdentifier')) {
        renderSearchResults(localStorage.getItem('oldRecordsIdentifier'))
    }
}


function navbarbgchange() {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        console.log(document.body.scrollTop + '---' + document.documentElement.scrollTop)
        document.getElementById("navbarbg").style.opacity = 1;
    } else {
        document.getElementById("navbarbg").style.opacity = 0.7;
    }
}

window.onscroll = function () {
    navbarbgchange()
};

// can use window.onload...
setTimeout(function () {
    sessionSearch();
}, 1000)
  