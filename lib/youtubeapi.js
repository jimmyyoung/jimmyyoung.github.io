var apikey = "AIzaSyC0mP8fbebxRTOoBV2N4LBPnKgnaAFhxk4"
var videoList = [];
var currentVideoIndex = 0;
var nextPageToken = "";

function httpGetAsync(url, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", url, true); // true for asynchronous 
    xmlHttp.send(null);
}

function getVideo(index)
{
	currentVideoIndex=index
	if (index >= videoList.length){
		addPopularVideos()
	} else {
		console.log(videoList[index])
	}
	

}

function addPopularVideos()
{
	httpGetAsync("https://www.googleapis.com/youtube/v3/videos?part=id&chart=mostPopular&key="+apikey+"&pageToken="+nextPageToken, setVideoList)

}

function setVideoList(raw_response)
{

	response = JSON.parse(raw_response)

	for (var i = 0; i<5; i++){
		videoList.push(response["items"][i]["id"])
	}
	nextPageToken = response["nextPageToken"]
	getVideo(currentVideoIndex)
}
