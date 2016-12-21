/*
 移动端分享插件
 */
(function() {

    var shareService = {
        appkey: '123'
        site: 'kjt.com',
        link: '',
        title: '',
        summary: '',
        pic: '',
        desc: '',
        qqShare: function() {
            var qqShareBaseUrl = 'http://connect.qq.com/widget/shareqq/index.html?url=#url#&tile=#title#&summary=#summary#&desc=#desc#&pics=#pic#&site=KJT.Com';
            var shareUrl = qqShareBaseUrl
                .replace("#url#", this.url)
                .replace("#link#", this.link)
                .replace("#desc#", this.desc)
                .replace("#pic#", this.pic)
                .replace("#title#", this.title)
                .replace("#appkey#", this.appkey)
                .replace("#site#", this.site);
            window.location.href = shareUrl;
            if (this.afterShare != null) {
                this.afterShare();
            }
        },
        weiboShare: function() {
            var weiboShareBaseUrl = 'http://service.weibo.com/share/share.php?url=#url#&appkey=#appkey#&pic=#pic#&searchPic=true&title=#title#';
            var shareUrl = qqShareBaseUrl
                .replace("#url#", this.url)
                .replace("#link#", this.link)
                .replace("#desc#", this.desc)
                .replace("#pic#", this.pic)
                .replace("#title#", this.title)
                .replace("#appkey#", this.appkey)
                .replace("#site#", this.site);
            window.location.href = shareUrl;
            if (this.afterShare != null) {
                this.afterShare();
            }
        },
        qqZoneShare: function() {
            var qqZoneShareBaseUrl = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=#url#&title=#title#&desc=#desc#&summary=#summary#&site=#site#&pics=#pic#'
            var shareUrl = qqShareBaseUrl
                .replace("#url#", this.url)
                .replace("#link#", this.link)
                .replace("#desc#", this.desc)
                .replace("#pic#", this.pic)
                .replace("#title#", this.title)
                .replace("#appkey#", this.appkey)
                .replace("#site#", this.site);
            window.location.href = shareUrl;
            if (this.afterShare != null) {
                this.afterShare();
            }
        }
    }

    window.MisteShare = {

        setShare: function(selector, options) {

            if (options != undefined) {
                var link = options.link == undefined ? window.location.href : options.link;
                var title = options.title == undefined ? document.title : options.title;
                var desc = options.desc == undefined ? '' : options.desc;
                var summary = options.summary == undefined ? '' : options.summary;
                var pic = options.pic == undefined ? ''：
                $(selector).each(function() {
                    $(this)
                        .attr('share-link', link)
                        .attr('share-title', title)
                        .attr('share-desc', desc)
                        .attr('share-summary', summary)
                        .attr('share-pic', summary);
                });
                $(selector).on('tap', function() {
                    if (options.beforeShare != undefined) {
                        options.beforeShare($(this));
                    }
                    if (options.afterShare != undefined) {
                        shareService.afterShare = options.beforeShare($(this));
                    } else {
                        shareService.afterShare = null;
                    }
                    shareService.link = $(this).attr('share-link');
                    shareService.title = $(this).attr('share-title');
                    shareService.summary = $(this).attr('share-summary');
                    shareService.pic = $(this).attr('share-pic');
                    shareService.desc = $(this).attr('share-desc');
                })
            }

        },
        init: function() {

            var sharePanel = `<div id='msiteSharePanel' style='display:none'>
        <div id='overspread' style='position: fixed;bottom: 0px;left: 0px;width: 100%;height: 100%;background: gray;opacity: 0.5;z-index: 9999'>
        </div>
        <div style='position: fixed;height: 50px;width: 100%;z-index: 99999;background-color: white;bottom: 0px;opacity: 1'>
            <ul>
                <li style='list-style-type: none;float: left;margin-right: 30px;'>
                    <a id='qqshare' href='javascript:;'>QQ</a>
                </li>
                <li style='list-style-type: none;float: left;margin-right: 30px;'>
                    <a id='qqzoneshare' href='javascript:;'>qqZnone</a>
                </li>
                <li style='list-style-type: none;float: left;margin-right: 30px;'>
                    <a id='weiboshare' href='javascript:;'>Weibo</a>
                </li>
            </ul>
        </div>
    </div>`;

            $(document.body).append(sharePanel);
            $("#msiteSharePanel #overspread").on('tap', function() {
                $("#msiteSharePanel").hide();
            });
            $("#msiteSharePanel #qqshare").on('tap', function() {
                shareService.qqShare();
            });
            $("#msiteSharePanel #qqzoneshare").on('tap', function() {
                shareService.qqZoneShare();
            });
            $("#msiteSharePanel #weiboshare").on('tap', function() {
                shareService.weiboShare();
            });
        }
    }

    $(function() {
        // 初始化分享插件
        window.MisteShare.init();
    })

})(window)