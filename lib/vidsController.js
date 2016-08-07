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



	constructor() {

		this.apikey = "AIzaSyC0mP8fbebxRTOoBV2N4LBPnKgnaAFhxk4";
		this.videoList = [];
		this.currentVideoIndex = 0;
		this.nextPageToken = "";
	}

	getVideo(index)
	{
		this.currentVideoIndex=index
		if (index >= this.videoList.length){
			this.addPopularVideos()
		} else {
			console.log(this.videoList[index])
                        player = new YT.Player('vid', {
                		height: '390',
				width: '640',
				videoId: this.videoList[index],
				events: {
				'onReady': onPlayerReady,
				},
				playerVars: {
					'controls':0,
					'showinfo':0,
					'rel':0
				}
			});

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
