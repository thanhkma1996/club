
/*============================================================================
  Home page - social media
==============================================================================*/

var social = {
    twitter: function() {
        if (!window.twttr) {
            //Initialize twitter feed
            window.twttr = (function(d, s, id) {
                var t, js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s);
                js.id = id;
                js.src = "https://platform.twitter.com/widgets.js";
                fjs.parentNode.insertBefore(js, fjs);
                return window.twttr || (t = {
                    _e: [],
                    ready: function(f) {
                        t._e.push(f) }});
            }(document, "script", "twitter-wjs"));
        }

        if (window.twttr) {
            window.twttr.ready(function(twttr) {
                twttr.widgets.load(
                    document.getElementById("twitter-timeline")
                );
            });
        }
    },
    unload: function() {

    }
}

var instagram = {
    loadContent: function(s) {
        if (s.clientID) {
            var url = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=' + s.clientID;

            $.ajax({
                type: 'GET',
                url: url,
                dataType: 'jsonp',
                success: function(data) {

                    if (data.meta.code === 200 && data.data.length) {
                        var data = data.data;
                        var count = 0;
                        s.el.empty();

                        for (var i = 0; i < data.length; i++) {
                            var thisMedia = data[i],
                                item;

                            var url = thisMedia.images.low_resolution.url;

                            if (!thisMedia.images.low_resolution.url.indexOf("null") > -1) {
                                item = '<div class="il-photo__img instagram__bg" style="background-image:url(' + url + ')" data-filter="' + thisMedia.filter + '" /></div>';
                                item = '<a href="' + thisMedia.link + '" target="_blank" class="instagram__link">' + item + '</a>';
                            }

                            if (thisMedia.videos) {
                                item = '<div class="instagram__video instagram__bg" style="background-image:url(' + url + ')" data-filter="' + thisMedia.filter + '" /></div>';
                                item = '<a href="' + thisMedia.link + '" target="_blank" class="instagram__link instagram__video-link">' + item + '</a>';
                            }

                            if (item) {
                                item = '<div class="four columns instagram__item">' + item + '</div>';
                            }
                            if (item !== '') {
                                s.el.append(item);
                                count++;
                            }
                            if (count == s.limit) {
                                break;
                            }
                        } }},
                error: function() {}
            });
        }
    }
}

$('.social-feeds-wrap').each(function(index, value) {

    social.twitter();

    var $target = $(this).find(".js-instafeed");
    instagram.loadContent({
        el: $target,
        clientID: $target.data('client-id'),
        limit: $target.data('count')
    });
});
