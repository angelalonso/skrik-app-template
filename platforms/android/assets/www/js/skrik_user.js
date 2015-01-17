function refresh_html_user(){
  alert("refresh");
  //username_js = getCookie("username");
  //useremail_js = getCookie("useremail");
  //userid_js = getCookie("userid");
  username_js = window.localStorage.getItem("username");
  useremail_js = window.localStorage.getItem("useremail");
  userid_js = window.localStorage.getItem("userid");
  regid_js = window.localStorage.getItem("regid");

  if (username_js == null ){
    username_js = "Enter your name here";
  }
  if (useremail_js == null ){
    useremail_js = "Enter your e-Mail here";
  }
  check_userid()
  document.getElementById("username_html_user").value = username_js;
  document.getElementById("useremail_html_user").value = useremail_js;
  //document.getElementById("userid_html_user").value = userid_js;
  document.getElementById("regid_html_user").value = regid_js;
//  var dc = document.cookie;
  var dc = window.localStorage;
  document.getElementById("testing_cookies").innerHTML = dc;
}

function check_userid(){
  current_userid = document.getElementById("userid_html_user").value;
  alert("HTML: " + current_userid);
  if (current_userid == "null" || current_userid == "" || current_userid == "99999999999999")
  {
    current_userid = window.localStorage.getItem("userid");
    alert("LS: " + current_userid);
    if (current_userid == "null" || current_userid == "" || current_userid == "99999999999999")
    {
      getnew_userid();  
    } else 
    {
      document.getElementById("userid_html_user").value = current_userid;
      refresh_html_user()
    }
  }
}


function cleanup_all(){
  alert("clean up");
  regid_aux = window.localStorage.getItem("regid");
  window.localStorage.clear();
  window.localStorage.setItem("regid",regid_aux);
 // var cookies = $.cookie();
 // for(var cookie in cookies) {
 //   $.removeCookie(cookie);
 // }
}

function getnew_userid(){
  alert("new id");
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
    document.getElementById("userid_html_user").value = userid_ajax;
    window.localStorage.setItem("userid",userid_ajax);
    //return userid_ajax;
  } catch(e) {
    //return "42. If you have to ask why, you should be playing Cindy Crush instead...";
    error_user="99999999999999"
    document.getElementById("userid_html_user").value = error_user;
    window.localStorage.setItem("userid",error_user);
  }
}

function save_userdata()
{
  data= "";
  server='192.168.10.229:8000';
  username_js = document.getElementById("username_html_user").value;
  useremail_js = document.getElementById("useremail_html_user").value;
  userid_js = window.localStorage.getItem("userid");
  regid_js = window.localStorage.getItem("regid");
  if (username_js == "Enter your name here" || username_js == "") 
  {
    username_js = "Anonymous_I_guess";
  }
  if (useremail_js == "Enter your e-Mail here" || username_js == "") 
  {
    useremail_js = "shy@i.am";
  }
  if (userid_js == "" || userid_js == "42. If you have to ask why, you should be playing Cindy Crush instead...") 
  {
    userid_js = getnew_userid();
  }
  //setCookie("username",username_js,18*365);
  //setCookie("useremail",useremail_js,18*365);
  //setCookie("userid",userid_js,18*365);
  window.localStorage.setItem("username",username_js);
  window.localStorage.setItem("useremail",useremail_js);
  window.localStorage.setItem("userid",userid_js);
  //window.localStorage.setItem("regid",regid_js);
  $.ajax({
    type: "POST",
    url: 'http://' + server + '/saveid/' + userid_js + '/name/' + username_js + '/email/' + useremail_js + '/regid/' + regid_js + '/',
    data: {
        csrfmiddlewaretoken: '{{ csrf_token }}',
    },
    success: function(data) {
      //setCookie("username",username_js,18*365);
      //setCookie("useremail",useremail_js,18*365);
      //setCookie("userid",userid_js,18*365);
      window.localStorage.setItem("username",username_js);
      window.localStorage.setItem("useremail",useremail_js);
      window.localStorage.setItem("userid",userid_js);
      //window.localStorage.setItem("regid",regid_js);
    },
    error: function(xhr, textStatus, errorThrown) {
        alert("Please report this error: "+errorThrown+xhr.status+xhr.responseText);
    }
  });
      alert("Logged in!");
}


