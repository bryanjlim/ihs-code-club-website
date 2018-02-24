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

var categoriesToShow = ["Code Club Event", "Competition", "Project"]; 

$(document).ready(
    function() 
    {
        repopulateBlog(); 
    }
);

function repopulateBlog(){
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
        blogList.sort(function(a,b){
            var aDateArray = a.date.split("-"); 
            var aYear = aDateArray[0];
            var aMonth = aDateArray[1];
            var aDate = aDateArray[2]; 

            var bDateArray = b.date.split("-"); 
            var bYear = bDateArray[0];
            var bMonth = bDateArray[1];
            var bDate = bDateArray[2]; 
            return new Date(bYear,bMonth,bDate) - new Date(aYear,aMonth,aDate);
        }); 

        $('#blogWrapper').empty(); 

        for(let i=0; i < blogList.length; i++){
            if(categoriesToShow.includes(blogList[i].category)){

                var blogpostmeta = '<p class="blog-post-meta">' + blogList[i].date + '</p>';
                if(blogList[i].author != "" && blogList[i].author != undefined){
                    blogpostmeta = '<p class="blog-post-meta">' + blogList[i].date + '<a href="#"> By ' +blogList[i].author+'</a></p>';
                } 
                
                var addimage = ""; 
                if(blogList[i].imageurl != "" && blogList[i].imageurl != undefined){
                    addimage = '<img src="'+blogList[i].imageurl+'">'; 
                }

                var postLines = blogList[i].post.split(/\r\n|\r|\n/g); 
                var addpost = ""; 
                for(let i = 0; i < postLines.length; i++){
                    addpost += '<p>'+postLines[i]+'</p>'; 
                }

                var addlink = ""; 
                if(blogList[i].link != "" && blogList[i].link != undefined){
                    addlink = '<b>Link: </b><a href="'+blogList[i].link+'">'+blogList[i].link+'</a>'; 
                }

                
                $('#blogWrapper').append(
                    '<div class="blog-post-wrapper">' + 
                        '<div class="blog-post">' + 
                            '<h2 class="blog-post-title">' + blogList[i].title + '</h2>' + 
                            '<strong class="d-inline-block mb-2 text-primary">'+blogList[i].category+'</strong>' + 
                            blogpostmeta +
                            addimage +
                            addpost +
                            addlink +
                        '</div>' +
                    '</div>'
                )

            } 
        }
    })
} 

// Refine what blogs are shown

    $("#cce").click(function(e) {
        e.preventDefault(); 

        if($("#cce").hasClass("disabled")){
            $("#cce").removeClass("disabled"); 
            categoriesToShow.push("Code Club Event");  
            repopulateBlog()
        } 
        else
        {
            $("#cce").addClass("disabled"); 
            for(let i = 0; i < categoriesToShow.length; i++){
                if(categoriesToShow[i] == "Code Club Event"){
                    if (i !== -1) {
                        categoriesToShow.splice(i, 1);
                    }
                }
            }
            repopulateBlog()
        }
    }); 

    $("#com").click(function(e) {
        e.preventDefault(); 

        if($("#com").hasClass("disabled")){
            $("#com").removeClass("disabled"); 
            categoriesToShow.push("Competition"); 
            repopulateBlog() 
        } 
        else
        {
            $("#com").addClass("disabled"); 
            for(let i = 0; i < categoriesToShow.length; i++){
                if(categoriesToShow[i] == "Competition"){
                    if (i !== -1) {
                        categoriesToShow.splice(i, 1);
                    }
                }
            }
            repopulateBlog()
        }
    }); 

    $("#pro").click(function(e) {
        e.preventDefault(); 

        if($("#pro").hasClass("disabled")){
            $("#pro").removeClass("disabled"); 
            categoriesToShow.push("Project");  
            repopulateBlog()
        } 
        else
        {
            $("#pro").addClass("disabled"); 
            for(let i = 0; i < categoriesToShow.length; i++){
                if(categoriesToShow[i] == "Project"){
                    if (i !== -1) {
                        categoriesToShow.splice(i, 1);
                    }
                }
            }
            repopulateBlog()
        }
    }); 