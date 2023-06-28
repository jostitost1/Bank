var paginaNaam = window.location.href.split('/').pop();
console.log(paginaNaam)


function updateHTML(data) {
    // Bijvoorbeeld: update een element met id 'myElement' met de ontvangen data
     element = document.getElementById('myElement');
    element.innerText = data;
  }


window.electron.receive('updatebegin',(data) =>{
    console.log(data)
    switch(paginaNaam) {
        case 'index.html':
            if(data == "rfid"){
               window.location.href= 'keuze.html'
 
            }}
})

window.electron.receive('DataUpdate', (data) => {
    updateHTML(data)
    const objectString = JSON.stringify(data, null, 2);
    myElement.textContent = objectString;
    console.log(data)
})


window.electron.receive("Keypad", (data) => {
    passid = data;
            window.electron.send("passid", passid)
          //  console.log('super fijn')

    data = data.charAt(4)

    
    value = document.getElementById("Knop").value = document.getElementById("Knop").value + data + "";
    switch(paginaNaam) {
        case 'index.html':
            if(data == "A"){
               window.location.href= 'begin.html'
 
            }
            
            break;
        case 'begin.html' :

            

            if(data == "A"){
                window.location.href= 'bon.html'
            }
            else if (data == "B"){
                window.location.href = 'index.html'
            }
          
            break;
        case 'keuze.html' :
            console.log(data)
            if(data == "A"){
                window.location.href= 'begin.html'
                myDiv = 70;
                window.electron.send("set-title", myDiv)     
                console.log("hoi")         
            } else if  (data == "B"){
                window.location.href = 'pinnen.html'
            } else if (data == "C"){
                window.location.href = 'pincode.html'
            }else if (data == "D"){
                window.location.href = 'begin.html'
            }
            break;
        case 'pincode.html':
            if(data == "A"){
                window.location.href= 'saldo.html'
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
                    window.location.href= 'bevestiging.html',myFunction();
                }else if (data == "B"){
                    window.location.href = 'keuze.html'
                }
                    
                break;
        case 'bevestiging.html' :
                if(data == "A"){
                    window.location.href= 'bon.html'
                    // window.electron.send("set-title", myDiv)  
                    

                    
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
    var b = document.getElementById('Knop').value;
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
    console.log(document.getElementById('myDiv').innerHTML);
    myDiv = document.getElementById('myDiv').innerHTML.split("€")[1]
    window.electron.send("set-title", myDiv)
    
}


















