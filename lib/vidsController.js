class vidsController {
	
	httpGetAsync(url, callback){ 
    		var xmlHttp = new XMLHttpRequest();
		xmlHttp.caller = this;
    		xmlHttp.onreadystatechange = function() { 
        		if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            		callback(xmlHttp.responseText, xmlHttp.caller);
    		} 
    	xmlHttp.open("GET", url, true); // true for asynchronous 
   	 xmlHttp.send(null);
	}

	constructor(){
		this.apikey = "AIzaSyC0mP8fbebxRTOoBV2N4LBPnKgnaAFhxk4";
		this.videoList = [];
		this.currentVideoIndex = 0;
		this.nextPageToken = "";
		this.player = null;
		this.currentIndex = 0;
	}


	getNextVideo(){
		this.currentIndex++;
		this.getVideo(this.currentIndex);
	}

	playVideo(youtubeID){
		if (this.player == null) {
            this.player = new YT.Player('vid', {
                height: '390',
				width: '640',
                videoId: youtubeID,
                events: {
                    'onReady': onPlayerReady,
                },
                playerVars: {
                    'controls':0,
                    'showinfo':0,
                    'rel':0
                }
            });
        } else {
            this.player.stopVideo()
            this.player.loadVideoById(youtubeID, 5, "large")
        }
	}	

	getVideo(index){
		this.currentVideoIndex=index
		if (index >= this.videoList.length){
			this.addPopularVideos()
		} else {
			console.log(this.videoList[index])
            this.playVideo(this.videoList[index])
		}
	}

	addPopularVideos()
	{
		this.httpGetAsync("https://www.googleapis.com/youtube/v3/videos?part=id&chart=mostPopular&key="+this.apikey+"&pageToken="+this.nextPageToken, this.setVideoList)
	}


	// Async set videolist
	setVideoList(raw_response,caller)
	{
		var response = JSON.parse(raw_response)
		for (var i = 0; i<5; i++){
			caller.videoList.push(response["items"][i]["id"])
		}
		caller.nextPageToken = response["nextPageToken"]
		caller.getVideo(caller.currentVideoIndex)
	}

}
