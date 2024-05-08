const videoCardContainer = document.querySelector('.video-grid');

let api_key = "AIzaSyDx79eMJQjcqa5t0dTrRBK6zAxKxBkKY3s";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

fetch(video_http + new URLSearchParams({
    key: api_key,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 100,
    regionCode: 'VN'
}))
    .then(res => res.json())
    .then(data => {
        // console.log(data);
        data.items.forEach(item => {
            getChannelIcon(item);
        })
    })
    .catch(err => console.log(err));
const getChannelIcon = (video_data) => {
    fetch(channel_http + new URLSearchParams({
        key: api_key,
        part: 'snippet',
        id: video_data.snippet.channelId
    }))
        .then(res => res.json())
        .then(data => {
            video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
            console.log(video_data);
            makeVideoCard(video_data);
        })
}

function shortenText(text) {
    const maxLength = 2;
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
}

const makeVideoCard = (data) => {
    videoCardContainer.innerHTML += `
    <div class="video-preview">
        <div class="thumbnail-row">
            <a href="https://youtube.com/watch?v=${data.id}" target="_blank" class="video-title-link">
                <img class="thumbnail" src="${data.snippet.thumbnails.high.url}">
            </a>
            <div class="video-time">14:20</div>
        </div>
        <div class="video-info-grid" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
            <div class="channel-picture">   
                <div class="profile-picture-container">
                    <a href="https://www.youtube.com/c/mkbhd" target="_blank" class="channel-link">
                        <img class="profile-picture" src="${data.channelThumbnail}">
                    </a>
                    <div class="channel-tooltip">
                        <img class="channel-tooltip-picture" src="${data.channelThumbnail}">
                        <div class="channel-info-tooltip">
                            <p class="channel-tooltip-name">${data.snippet.title}</p>
                            <p class="channel-tooltip-stats">16.6M subscribers</p>
                        </div>
                    </div>
                </div>                                                                                  
            </div>
            <div class="video-info">
                <a href="https://www.youtube.com/watch?v=n2RNcPRtAiY" target="_blank" class="video-title-link">
                    <p class="video-title">${data.snippet.title}</p>
                </a>
                <div class="tooltip-hover">
                    <a href="https://www.youtube.com/c/mkbhd" target="_blank" class="channel-link">
                        <p class="video-author">${data.snippet.channelTitle}</p>
                    </a>                            
                    <p class="video-stats">3.4M views &#183; 6 months ago</p>
                </div>
            </div>
        </div>
    </div>
    `;
}


