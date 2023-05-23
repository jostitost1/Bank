var paginaNaam = window.location.href.split('/').pop();
console.log(paginaNaam)




window.electron.receive("Keypad", (data) => {
    console.log(data);
    value = document.getElementById("Knop").value = document.getElementById("Knop").value + data + "";
    switch(paginaNaam) {
        case 'index.html':
            if(data == "A"){
               window.location.href= 'begin.html'
            }
            
          break;
        case 'begin.html' :
            if(data == "A"){
                window.location.href= 'keuze.html'
            }else if (data == "B"){
                window.location.href = 'index.html'
            }
          
          break;
        case 'keuze.html' :
            if(data == "A"){
                window.location.href= 'SnelPinnen.html'
            } else if  (data == "B"){
                window.location.href = 'pinnen.html'
            } else if (data == "C"){
                window.location.href = 'saldo.html'
            }else if (data == "D"){
                window.location.href = 'begin.html'
            }
            
            break;
        case 'SnelPinnen.html' :
                if(data == "A"){
                    window.location.href= 'bevestiging2.html'
                }else if (data == "B"){
                    window.location.href = 'keuze.html'
                }
                
                break;
        case 'bevestiging2.html' :
                if(data == "A"){
                    window.location.href= 'bon.html'
                } else if (data == "B"){
                    window.location.href = 'pinnen.html'
                }
                
                break;
        case 'bon.html' :
                if(data == "A"){
                    window.location.href= 'bedankt.html'
                } else if (data == "B"){
                    window.location.href = 'bedankt.html'
                }
                
                break;
        case 'pinnen.html' :
                if(data == "A"){
                    window.location.href= 'bevestiging.html'
                }else if (data == "B"){
                    window.location.href = 'keuze.html'
                }
                    
                break;
        case 'bevestiging.html' :
                if(data == "A"){
                    window.location.href= 'bon.html'
                }else if (data == "B"){
                    window.location.href = 'keuze.html'
                }
        case 'saldo.html' :
            if(data == "A"){
                window.location.href= 'keuze.html'
               
            }
            break;
        case 'bedankt.html':
            setTimeout(() => {window.location.href= 'index.html'; }, 5000);
            
                break;        
        
      } 

           
  

})


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


















