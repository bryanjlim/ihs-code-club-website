// Firebase Setup
var config = {
    apiKey: "AIzaSyCFBVxo4fnHYlpeIlv13nY-c2rEvxeOWpE",
    authDomain: "ihs-code.firebaseapp.com",
    databaseURL: "https://ihs-code.firebaseio.com",
    projectId: "ihs-code",
    storageBucket: "ihs-code.appspot.com",
    messagingSenderId: "553605068678"
  };
firebase.initializeApp(config);

var database = firebase.database().ref(); 

updateBloglist(); 


// On Sign In
$("#signinbutton").click(function(e) {
    e.preventDefault(); 
    
    const email = $("#usernameform").val();
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
        $(".submission").show(); 
    }
    else{
        $(".sign-in-wrapper").show();
        $("#signoutbutton").hide();
        $(".submission").hide(); 
    }
});

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

        // Link
        var newBlogLink = $("#link").val(); 

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

        var newBlog = new BlogObject(newBlogTitle, newBlogDate, newBlogPost, selectedCategory, newBlogAuthor, newBlogImage, newBlogLink); 
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
                    alert("You have successfully deleted the post."); 
                    location.reload(); 
                }
            }
        })
    })
}); 
