var config = {
    apiKey: "AIzaSyBk0A1an1FIl8BOomxnLWfWRdUPswbcfMQ",
    authDomain: "ihs-code-club-website-test.firebaseapp.com",
    databaseURL: "https://ihs-code-club-website-test.firebaseio.com",
    projectId: "ihs-code-club-website-test",
    storageBucket: "ihs-code-club-website-test.appspot.com",
    messagingSenderId: "412840068196"
  };
firebase.initializeApp(config);

var database = firebase.database().ref(); 

$(document).ready(
    function() 
    {
        var blogList = []; 

        database.once("value", function(snapshot){
            snapshot.forEach(function(data){
                if(data.val().title != ""){
                    var title = data.val().title; 
                    var date = data.val().date; 
                    var category = data.val().category;
                    var imageurl = data.val().imageurl;
                    var post = data.val().post; 
                    var author = data.val().author; 
                    var link = data.val().link; 

                    blogList.push(new BlogObject(title, date, post, category, author, imageurl, link));  
                }
            })
            blogList.sort(); 
            for(let i=0; i < blogList.length; i++){

                var blogpostmeta = '<p class="blog-post-meta">' + blogList[i].date + '</p>';
                if(blogList[i].author != "" && blogList[i].author != undefined){
                    blogpostmeta = '<p class="blog-post-meta">' + blogList[i].date + '<a href="#"> By ' +blogList[i].author+'</a></p>';
                } 
                
                var addimage = ""; 
                if(blogList[i].imageurl != "" && blogList[i].imageurl != undefined){
                    addimage = '<img src="'+blogList[i].imageurl+'">'; 
                }

                $('#blogWrapper').append(
                    '<div class="blog-post-wrapper">' + 
                        '<div class="blog-post">' + 
                            '<h2 class="blog-post-title">' + blogList[i].title + '</h2>' + 
                            '<strong class="d-inline-block mb-2 text-primary">'+blogList[i].category+'</strong>' + 
                            blogpostmeta +
                            addimage+
                            '<p>'+blogList[i].post+'</p>' +
                            '<b>Link: </b><a href="'+blogList[i].link+'">'+blogList[i].link+'</a>' +
                        '</div>' +
                    '</div>'
                )
            }
        })
    }
);