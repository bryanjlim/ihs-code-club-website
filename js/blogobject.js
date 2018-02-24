class BlogObject{
    constructor(title, date, post, category, author, imageurl, link){
        this.title = title;
        this.date = date; 
        this.post = post; 
        this.category = category;
        this.author = author; 
        this.imageurl = imageurl; 
        this.link = link; 
    }

    toString(){
        return("TITLE:"+this.title+" AUTHOR:"+this.author+" DATE:"+this.date+" POST:"+this.post+" IMAGEURL:"+this.imageurl+" CATEGORY:"+this.category); 
    }      
}