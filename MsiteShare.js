(function() {

    var isSupportTouch = "ontouchstart" in window || "ontouchend" in window.document;
    var _tapClick = 'click';
    var _isWx = true;
    if (_isWx) {
        with(document) 0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://res.wx.qq.com/open/js/jweixin-1.0.0.js'];
    }

    var shareService = {
        appkey: '',
        site: '',
        link: '',
        title: '',
        summary: '',
        pic: '',
        desc: '',
        qqShare: function() {
            var qqShareBaseUrl = 'http://connect.qq.com/widget/shareqq/index.html?url=#link#&title=#title#&summary=#summary#&desc=#desc#&pics=#pic#&site=KJT.Com';
            var shareUrl = qqShareBaseUrl
                .replace("#link#", this.link)
                .replace("#desc#", this.desc)
                .replace("#pic#", this.pic)
                .replace("#title#", this.title)
                .replace("#summary#", this.summary)
                .replace("#appkey#", this.appkey)
                .replace("#site#", this.site);
            window.location.href = shareUrl;
            if (this.afterShare != null) {
                this.afterShare();
            }
        },
        weiboShare: function() {
            var weiboShareBaseUrl = 'http://service.weibo.com/share/share.php?url=#link#&appkey=#appkey#&pic=#pic#&searchPic=true&title=#title#';
            var shareUrl = weiboShareBaseUrl
                .replace("#link#", this.link)
                .replace("#desc#", this.desc)
                .replace("#pic#", this.pic)
                .replace("#title#", this.title)
                .replace("#summary#", this.summary)
                .replace("#appkey#", this.appkey)
                .replace("#site#", this.site);
            window.location.href = shareUrl;
            if (this.afterShare != null) {
                this.afterShare();
            }
        },
        qqZoneShare: function() {
            var qqZoneShareBaseUrl = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=#link#&title=#title#&desc=#desc#&summary=#summary#&site=#site#&pics=#pic#'
            var shareUrl = qqZoneShareBaseUrl
                .replace("#link#", this.link)
                .replace("#desc#", this.desc)
                .replace("#pic#", this.pic)
                .replace("#title#", this.title)
                .replace("#summary#", this.summary)
                .replace("#appkey#", this.appkey)
                .replace("#site#", this.site);
            window.location.href = shareUrl;
            if (this.afterShare != null) {
                this.afterShare();
            }
        }
    }

    var wxShareService = {
        appId: '',
        timestamp: '',
        signature: '',
        nonceStr: '',
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'],
        link: '',
        title: '',
        summary: '',
        pic: '',
        afterShare: null,
        wxShare: function() {
            var that = this;
            wx.ready(function() {
                wx.onMenuShareTimeline({
                    title: that.title,
                    link: that.link,
                    imgUrl: that.pic,
                    desc: that.summary,
                    success: function() {
                        if (that.afterShare != null) {
                            that.afterShare();
                        }
                    }
                });

                wx.onMenuShareAppMessage({
                    title: that.title,
                    link: that.link,
                    imgUrl: that.pic,
                    desc: that.summary,
                    success: function() {
                        if (that.afterShare != null) {
                            that.afterShare();
                        }
                    }
                });

                wx.onMenuShareQQ({
                    title: that.title,
                    link: that.link,
                    imgUrl: that.pic,
                    desc: that.summary,
                    success: function() {
                        if (that.afterShare != null) {
                            that.afterShare();
                        }
                    }
                });

                wx.error(function(res) {
                    alert("errorMSG:" + JSON.stringify(res));
                });
            });
        }
    }

    window.MsiteShare = {
        isWx: _isWx,
        setShare: function(selector, options) {
            if (options != undefined) {
                var link = options.link == undefined ? window.location.href : options.link;
                var title = options.title == undefined ? document.title : options.title;
                var desc = options.desc == undefined ? '' : options.desc;
                var summary = options.summary == undefined ? '' : options.summary;
                var pic = options.pic == undefined ? '' : options.pic;
                $(selector).each(function() {
                    $(this)
                        .attr('share-link', link)
                        .attr('share-title', title)
                        .attr('share-desc', desc)
                        .attr('share-summary', summary)
                        .attr('share-pic', pic);
                });

                $(selector).on(_tapClick, function() {
                    if (options.beforeShare != undefined) {
                        options.beforeShare(shareService);
                    }
                    if (options.afterShare != undefined) {
                        shareService.afterShare = options.beforeShare;
                    } else {
                        shareService.afterShare = null;
                    }

                    $("#msiteSharePanel").show();

                    if (_isWx) {
                        wxShareService.link = $(this).attr('share-link');
                        wxShareService.title = $(this).attr('share-title');
                        wxShareService.summary = $(this).attr('share-summary');
                        wxShareService.pic = $(this).attr('share-pic');
                        wxShareService.desc = $(this).attr('share-desc');
                        wxShareService.wxShare();
                    } else {
                        shareService.link = $(this).attr('share-link');
                        shareService.title = $(this).attr('share-title');
                        shareService.summary = $(this).attr('share-summary');
                        shareService.pic = $(this).attr('share-pic');
                        shareService.desc = $(this).attr('share-desc');
                    }
                })
            }
        },
        init: function() {

            var sharePanel = "<div id=\"msiteSharePanel\" style=\"display:none\">" +
                "    <div id=\"overspread\" style=\"position: fixed;bottom: 0px;left: 0px;width: 100%;height: 100%;background: gray;opacity: 0.5;z-index: 9999\">" +
                "    </div>" +
                "    <div style=\"position: fixed;height: 50px;width: 100%;z-index: 99999;background-color: white;bottom: 0px;opacity: 1\">" +
                "        <a id=\"qqshare\" href=\"javascript:;\" style=\"padding: 5px;\">" +
                "            <img src=\'img/qq.jpg\' style=\"height: 100%;\" />" +
                "        </a>" +
                "        <a id=\"qqzoneshare\" href=\"javascript:;\" style=\"padding: 5px;\">" +
                "            <img src=\'img/qqZone.jpg\' style=\"height: 100%;\" />" +
                "        </a>" +
                "        <a id=\"weiboshare\" href=\"javascript:;\" style=\"padding: 5px;\">" +
                "            <img src=\'img/weiBo.jpg\' style=\"height: 100%;\" />" +
                "        </a>" +
                "    </div>" +
                "</div>";

            $(document.body).append(sharePanel);
            $("#msiteSharePanel #overspread").on(_tapClick, function() {
                $("#msiteSharePanel").hide();
            });
            $("#msiteSharePanel #qqshare").on(_tapClick, function() {
                shareService.qqShare();
            });
            $("#msiteSharePanel #qqzoneshare").on(_tapClick, function() {
                shareService.qqZoneShare();
            });
            $("#msiteSharePanel #weiboshare").on(_tapClick, function() {
                shareService.weiboShare();
            });
        },
        wxInit: function() {
            var sharePanel = '<div id="msiteSharePanel" style="display:none;background-color: rgba( 0, 0, 0, 0.6); height:100%; position: fixed;left:0;top: 0; text-align: center; width: 100%; z-index: 9999999999;">' +
                '                                    <img src="img/share_page.png" style="width: 100%; height: 100%;" />' +
                '                                    </div>';
            $(document.body).append(sharePanel);
            $("#msiteSharePanel").on(_tapClick, function() {
                $("#msiteSharePanel").hide();
            })
        },
        setWxConfig: function(options) {
            if (window.wx) {
                wx.config({
                    debug: false,
                    appId: options.appId,
                    timestamp: options.timestamp,
                    nonceStr: options.nonceStr,
                    signature: options.signature,
                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
                });
            } else {
                setTimeout(function() {
                    wx.config({
                        debug: false,
                        appId: options.appId,
                        timestamp: options.timestamp,
                        nonceStr: options.nonceStr,
                        signature: options.signature,
                        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
                    });
                }, 2000);
            }
        },
        setConfig: function(options) {
            shareService.appkey = options.appkey;
            shareService.site = options.site;
        }
    }

    $(function() {
        if (!_isWx) {
            window.MsiteShare.init();
        } else {
            window.MsiteShare.wxInit();
        }
    })

})(window)