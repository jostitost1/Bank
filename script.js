function myFunction() {
    var b = document.getElementById('messageInput').value;
    var url = './bevestiging.html?myValue=' + encodeURIComponent(b);
    document.location.href = url;
}

window.onload = function () {
    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
    for (var i = 0, l = params.length; i < l; i++) {
         tmp = params[i].split('=');
         data[tmp[0]] = tmp[1];
    }

    document.getElementById('myDiv').innerHTML += data["myValue"];
}