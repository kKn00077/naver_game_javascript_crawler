var casper = require('casper').create({
    // verbose :  true , 
    // logLevel :  "debug",
    waitTimeout: 5000,
    onWaitTimeout: function() {
        result['error'] = true;
        result['message'] = '게시글을 로딩할 수 없습니다. (회원 전용 게시글 등의 사유)';
        console.log(JSON.stringify(result));
        this.exit();
    },
    pageSettings: {
        loadImages:  false,        // do not load images
        loadPlugins: false,         // do not load NPAPI plugins (Flash, Silverlight, ...)
        resourceTimeout: 1000000
    }
})
, url = casper.cli.get(0)
, result = {};

// casper.userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X)');
casper.userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36');

result['error'] = true;

if (!url) {
    result['message'] = 'url을 입력하세요!';
    console.log(JSON.stringify(result));

    casper.exit();
}

casper.start().thenOpen(url, function() {
    if(url.indexOf('cafe') > -1) {
        // iframe 로딩을 한다.
        this.withFrame(5, function(){
            this.waitForSelectorTextChange('div.CommentBox', function(){ // iframe이 로딩완료+댓글 목록 로딩완료 될 때까지의 시간을 확보
                var data = this.evaluate(function() {
                    
                    var ele = null;

                    // 문자열에서 숫자만들 추출하기 위한 정규식
                    // 혹여나 가져오는 값들 중에서 한글이 섞여있을 수도 있으니 숫자만 추출한다.
                    var regex = /[^0-9]/g;
                    var views = 0;
                    var likes = 0;
                    var comments = 0;
                    
                    ele = document.querySelector('div.article_info span.count');
                    if(ele) {
                        views = ele.innerHTML.replace(regex, "");
                        ele = null;
                    }

                    ele = document.querySelector('[data-type="like"] em.u_cnt._count');
                    if(ele) {
                        likes = ele.innerHTML.replace(regex, "");
                        ele = null;
                    }
                    
                    ele = document.querySelector('a.button_comment strong.num');
                    if(ele) {
                        comments = ele.innerHTML.replace(regex, "");
                        ele = null;
                    }
                    
                    return {'views': Number(views), 'likes': Number(likes), 'comments': Number(comments)};
                });
                
                result['data'] = data;
            })
        })
    } else { // 네이버 라운지
        // 게시글 컨텐츠가 로딩될 때까지 기다림
        this.waitForSelector('.detail_container-body__2BXku', function(){
            // 게시글 댓글 목록이 로딩될 때까지 기다림
            this.waitForSelectorTextChange('div.comment_list_wrap__1ch6r', function(){
                var data = this.evaluate(function() {
            
                    var ele = null;

                    // 문자열에서 숫자만들 추출하기 위한 정규식
                    // 혹여나 가져오는 값들 중에서 한글이 섞여있을 수도 있으니 숫자만 추출한다.
                    var regex = /[^0-9]/g;
                    var views = 0;
                    var likes = 0;
                    var comments = 0;
        
                    ele = document.querySelector('span.content_viewcount__1OovO');
                    if(ele) {
                        views = ele.innerHTML.replace(regex, "");
                        ele = null;
                    }

                    ele = document.querySelector('em.appraisal_buff__3SabX').nextSibling;
                    if(ele) {
                        likes = ele.innerHTML.replace(regex, "");
                        ele = null;
                    }

                    ele = document.querySelector('strong.header_count__LvnGz');
                    if(ele) {
                        comments = ele.innerHTML.replace(regex, "");
                        ele = null;
                    }
                    
            
                    return {'views': Number(views), 'likes': Number(likes), 'comments': Number(comments)};
                });
            
                result['data'] = data;
            })

        });
    }
    
});

casper.run(function() {
    result['error'] = false;
    result['message'] = '정상처리 되었습니다.';

    console.log(JSON.stringify(result));
    this.exit();
});
