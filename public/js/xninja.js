var jWindow = $(window);

var appendVideo = function(video){
    var appendString = '<div class="col-xs-6 col-sm-4 col-md-2 col-lg-2">'
        + '<a href="/video/'+ video.url +'">'
        + '<img class="img-rounded img-responsive" src="'+ video.thumbnail +'">'
        + '</a></div>';
    $('#videos').append(appendString);
};

var getNewVideos = (function (){
    var isLoading = false;
    var count = 1;
    return function(){
        if ( isLoading == false ) {
            isLoading = true;
            $.getJSON('/api/new/'+count,function(data){
                console.log(data)
                for (var i=0; i<data.length ;i++){
                    console.log(i)
                    appendVideo(data[i]);
                }
                count ++;
                isLoading = false;
            });
        }
    }
})();

jWindow.on("load scroll resize",function(){
    var scrollHeight = $(document).height();
    var threthold = scrollHeight - jWindow.height();
    var currentTop = jWindow.scrollTop() + jWindow.height();

    if ( currentTop > threthold ) {
        getNewVideos();
    }
});

