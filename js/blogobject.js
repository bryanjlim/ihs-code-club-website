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

    compare(a, b){
        var aDateArray = a.date.split("-"); 
        var aYear = aDateArray[0];
        var aMonth = aDateArray[1];
        var aDate = aDateArray[2]; 

        var bDateArray = b.date.split("-"); 
        var bYear = bDateArray[0];
        var bMonth = bDateArray[1];
        var bDate = bDateArray[2]; 
        return new Date(bYear,bMonth,bDate) - new Date(aYear,aMonth,aDate);
    }
      
}