fetch('main.html')
.then(Response => Response.text())
.then(data => {
    document.getElementById('example').innerHTML = data;
});

fetch('navbar.html')
.then(Response => Response.text())
.then(data => {
    document.getElementById('navbars').innerHTML = data;
});