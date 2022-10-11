
        window.onload = function(){
            memeApp.loadData();
        }
    
    let memeApp = {
        memeData: null,
        memeNumber: 0,
        memeTitleDomEl: null,
        memeImgDomEl: null,

        loadData: function(){
            fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json() )
            .then( data => memeApp.dataReady(data) )
        },
        dataReady: function(data){
            console.log(data);
            memeApp.memeData = data.data.memes;
            memeApp.memeTitleDomEl = document.getElementsByClassName("mems-title")[0];
            memeApp.memeImgDomEl = document.querySelector(".mems-img");

            document.addEventListener('keydown', function(e){
                switch(e.keyCode){
                    case 37:
                    console.log("left");
                    memeApp.previousMeme();
                    break;

                    case 38:
                    console.log("up");                 
                    break;

                    case 39:
                    console.log("right");
                    memeApp.nextMeme();                   
                    break;

                    case 40:
                    console.log("down");
                    break;
                }   
            });
            this.nextMeme()
        },
        nextMeme: function (){
            this.setDOMData();
            this.memeNumber++;
            if(this.memeNumber>=this.memeData.length)
            {
                this.memeNumber=0;
            }
        },
        previousMeme: function(){
            this.setDOMData();
            this.memeNumber--;
            if(this.memeNumber<0)
            {
                this.memeData.length-1;
            }
        },
        setDOMData: function(){
            let imgData = this.memeData[this.memeNumber];
            this.memeTitleDomEl.innerHTML = imgData.name;
            this.memeImgDomEl.src = imgData.url;

            document.title= "Meme#"+ this.memeNumber;
        }
    };
