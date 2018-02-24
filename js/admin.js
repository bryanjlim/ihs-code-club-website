// Firebase Setup
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

updateBloglist(); 


// On Sign In
$("#signinbutton").click(function(e) {
    e.preventDefault(); 
    
    const email = $("#usernameform").val() + "@ihscodeclubsite.com";
    const password = $("#passwordform").val(); 
    const promise = firebase.auth().signInWithEmailAndPassword(email, password); 
    promise.catch(e => alert(e.message)); 
}); 

// On Sign Out
$("#signoutbutton").click(function(e) {
    e.preventDefault(); 

    const promise = firebase.auth().signOut();
}); 

// On Firebase Authentication State Change
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        $(".sign-in-wrapper").hide();
        $("#signoutbutton").show();
    }
    else{
        $(".sign-in-wrapper").show();
        $("#signoutbutton").hide();
    }
});

// Blog class for Firebase submission 
class Blog{
    constructor(title, date, post, category, author, imageurl){
        this.title = title;
        this.date = date; 
        this.post = post; 
        this.category = category;
        this.author = author; 
        this.imageurl = imageurl; 
    }

    toString(){
        return("TITLE:"+this.title+" AUTHOR:"+this.author+" DATE:"+this.date+" POST:"+this.post+" IMAGEURL:"+this.imageurl+" CATEGORY:"+this.category); 
    }
}

// On Blog Submit
$("#blogsubmitbutton").click(function(e){
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');

    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
        if (form.checkValidity() === false) {
            e.preventDefault(); 
            e.stopPropagation();
        }
        form.classList.add('was-validated');
    });


    if($("#newblogform").hasClass('was-validated')){
        // Title
        var newBlogTitle = $("#title").val(); 
        
        // Author
        var newBlogAuthor = $("#author").val(); 
        
        // Date
        var newBlogDate = $("#date").val(); 

        // Image
        var newBlogImage = $("#imageurl").val(); 

        // Post
        var newBlogPost = $("#post").val(); 

        // Category
        var radios = document.getElementsByName('category');
        var selectedCategory = "Code Club Event";
        for (var i = 0, length = radios.length; i < length; i++)
        {
            if (radios[i].checked)
            {
                selectedCategory = radios[i].value; 
                break;
            }
        }

        var newBlog = new Blog(newBlogTitle, newBlogDate, newBlogPost, selectedCategory, newBlogAuthor, newBlogImage); 
        database.push(newBlog); 
    }
}); 

function updateBloglist(){
    $('#bloglist').empty();
    database.once("value", function(snapshot){
        snapshot.forEach(function(data){
            if(data.val().title != ""){
                var title = data.val().title; 
                var date = data.val().date; 

                var addToList = '<option value="' + data.ref + '">' + title + " (" + date+") </option>"; 
                $('#bloglist').append(addToList); 
            }
        })
    })
}

// On Blog Delete
$("#blogdeletebutton").click(function(e) {
    var deleteRef = $("#bloglist").val(); 
    
    // Delete data from Firebase
    database.once("value", function(snapshot){
        snapshot.forEach(function(data){
            if(data.ref == deleteRef){
                if (confirm('Are you sure you want to delete this post? This cannot be undone.')) {
                    data.ref.remove(); 
                }
            }
        })
    })
}); 
