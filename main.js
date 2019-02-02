var sietk;
var result;
var store;
var tx;


var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
// db creation
sietk =indexedDB.open("mydb",1);
sietk.onerror = function(v){
  console.log("error"+v);
  }
  sietk.onupgradeneeded = function(v){
    result = v.target.result;
   store = result.createObjectStore("resume", {keyPath: "name"})
  }
  sietk.onsuccess = function(v){
    result = v.target.result;
    function getdata(callback){
      tx = result.transaction("resume",IDBTransaction.read_only);
      store = tx.objectStore("resume");
           data =[];
      tx.oncomplete = function(v){
        callback(result);
        console.log(result);
      }
      var cursor = store.openCursor();
      cursor.onerror = function(v){
        console.log("error"+v);
      }
      cursor.onsuccess=function(v){
      var resultcursor = v.target.result;
      if (resultcursor){
        data.push(resultcursor.value);
        resultcursor.continue();
      }
    }
  }
var parent = document.querySelector(".parent");
getdata(function(d){
  console.log(d);
  for (var i = 0; i < data.length; i++){
    var child = document.createElement("div");
    child.classList.add("child");
    parent.append(child);


    var img = document.createElement("img");
    img.src="mca.jpg";
    img.alt = data[i].name;
    child.append(img);

    var name =document.createElement("h2");
    name.textContent = data[i].name;
    child.append(name);

    var email =document.createElement("h3");
    email.textContent = data[i].email;
    child.append(email);

   var an = document.createElement("a");
   an.textContent = "viewprofile";
   an.href ="resume.html?name="+data[i].name;
   child.append(an);
  }
  })
}
