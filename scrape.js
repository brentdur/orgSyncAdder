var page = require('webpage').create();
page.viewportSize = {
  width: 1024,
  height: 900
};
//delete this
var fs = require('fs');

// page.onResourceError = function(resourceError) {
//     page.reason = resourceError.errorString;
//     page.reason_url = resourceError.url;
// };


page.open('http://orgsync.com/sso_redirect/new-york-university', function(status){
  console.log(status + ' on initial auth redirect');
  if(status === 'success'){
    page.render('a.png');
    page.evaluate(function(){
      // Add your nyu username and pass here
      var uName = '';
      var uPass = '';
      document.getElementById('netid').value = uName;
      document.getElementById('password').value = uPass;
      document.getElementById('login').lastElementChild.click();
    });
    var t = setTimeout(function(){
      two('https://orgsync.com/61895/events/new');
    }, 6000);
  }
});


function two(url){
  page.open(url, function(status){
    console.log(status, url);
    if(status ==='success'){
      page.render('b.png');
      var t = setTimeout(function(){
        exit();
      }, 2000);
    }
    else{
      // console.log(
      //           "Error opening url \"" + page.reason_url
      //           + "\": " + page.reason
      // );
      setTimeout(function(){
        two(url);
      }, 4000);
    }
  });
};

function exit() {
  console.log('Done');
  phantom.exit();
};


