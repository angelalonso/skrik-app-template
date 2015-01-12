function refresh_html_user(){
  username_js = getCookie("username");
  useremail_js = getCookie("useremail");
  userid_js = getCookie("userid");

  if (username_js == null ){
    username_js = "Enter your name here";
  }
  if (useremail_js == null ){
    useremail_js = "Enter your e-Mail here";
  }
  if (userid_js == null || userid_js == "undefined" ){
    userid_js = getnew_userid();
  }
  document.getElementById("username_html_user").value = username_js;
  document.getElementById("useremail_html_user").value = useremail_js;
  document.getElementById("userid_html_user").value = userid_js;
  var dc = document.cookie;
  document.getElementById("testing_cookies").innerHTML = dc;
  var agentdc = navigator.userAgent;
  document.getElementById("testing_cookies_b").innerHTML = agentdc;
}


function cleanup_all(){
  var cookies = $.cookie();
  for(var cookie in cookies) {
    $.removeCookie(cookie);
  }
}

function getnew_userid(){
  data = "";
  server='192.168.10.229:8000';
  $.ajax({
    type: "POST",
    url: 'http://' + server + '/getnewid/',
    data: {
        csrfmiddlewaretoken: '{{ csrf_token }}',
    },
    success: function(data) {
      userid_ajax = data;
    },
    error: function(xhr, textStatus, errorThrown) {
      alert("Error at catching user id" + result + JSON.stringify(e, null, 4));
      userid_ajax = "You get no ID. Why? because we said so";
    }
  });
  try {
    return userid_ajax;
  } catch(e) {
    return "42. If you have to ask why, you should be playing Cindy Crush instead...";
  }
}

function save_userdata()
{
  data= "";
  server='192.168.10.229:8000';
  username_js = document.getElementById("username_html_user").value;
  useremail_js = document.getElementById("useremail_html_user").value;
  userid_js = document.getElementById("userid_html_user").value;
  if (username_js == "Enter your name here" || username_js == "") {
    username_js = "Anonymous_I_guess";
  }
  if (useremail_js == "Enter your e-Mail here" || username_js == "") {
    useremail_js = "shy@i.am";
  }
  if (userid_js == "" || userid_js == "42. If you have to ask why, you should be playing Cindy Crush instead...") {
    userid_js = getnew_userid();
  }
  setCookie("username",username_js,18*365);
  setCookie("useremail",useremail_js,18*365);
  setCookie("userid",userid_js,18*365);
  $.ajax({
    type: "POST",
    url: 'http://' + server + '/saveid/' + userid_js + '/name/' + username_js + '/email/' + useremail_js + '/',
    data: {
        csrfmiddlewaretoken: '{{ csrf_token }}',
    },
    success: function(data) {
      setCookie("username",username_js,18*365);
      setCookie("useremail",useremail_js,18*365);
      setCookie("userid",userid_js,18*365);
    },
    error: function(xhr, textStatus, errorThrown) {
        alert("Please report this error: "+errorThrown+xhr.status+xhr.responseText);
    }
  });
      alert("Logged in!");
}


