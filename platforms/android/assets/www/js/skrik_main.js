function refresh_html_main(){
  //username_js = getCookie("username");
  username_js = window.localStorage.getItem("username");
  document.getElementById("username_html_main").innerHTML = username_js;
  //userid_js = getCookie("userid");
  userid_js = window.localStorage.getItem("userid");
  pokelist(userid_js);
  document.getElementById("userlist_html_main").innerHTML = "";
  userlist(userid_js);
  //var dc = document.cookie;
  var dc = window.localStorage;
  document.getElementById("testing_cookies").innerHTML = dc;
  var agentdc = navigator.appCodeName;
  document.getElementById("testing_cookies_b").innerHTML = agentdc;
}

function userlist(userid_js){
  server='192.168.10.229:8000';
  $.ajax({
    type: "POST",
    url: 'http://' + server + '/getusers/' + userid_js + '/',
    data: {
        csrfmiddlewaretoken: '{{ csrf_token }}',
    },
    success: function(data) {
      var entries = data.split('###');
      var $myList = $( "#userlist_html_main" );
      var newItems = [];
      $.each( entries, function( index, value ) {
        if (value != "") {
          uservalues = value.split('///');
          newItems.push( '<li><a href="javascript:poke_to(' + userid_js + ',' + uservalues[0] + ');" >' + uservalues[1] + '</a></li>' );
        }
      });
      $myList.append( newItems.join( "" ) );
      $myList.listview( "refresh" );
    },
    error: function(xhr, textStatus, errorThrown) {
      alert("Userlist " + result + "! " + JSON.stringify(e, null, 4));
    }
  });
}

function pokelist(userid_js){
  server='192.168.10.229:8000';
  $.ajax({
    type: "POST",
    url: 'http://' + server + '/user/' + userid_js + '/',
    data: {
        csrfmiddlewaretoken: '{{ csrf_token }}',
    },
    success: function(data) {
      document.getElementById("userpokes_html_main").innerHTML = data;
    },
    error: function(xhr, textStatus, errorThrown) {
      alert("Pokelist " + result + "! " + JSON.stringify(e, null, 4));
    }
  });
}


function poke_to(user_from,user_to){
  server='192.168.10.229:8000';
  $.ajax({
    type: "POST",
    url: 'http://' + server + '/poke/' + user_from + '/' + user_to + '/',
    data: {
        csrfmiddlewaretoken: '{{ csrf_token }}',
    },
    success: function(data) {
      refresh_html_main();
      alert("Sent!");
    },
    error: function(xhr, textStatus, errorThrown) {
      alert(result + e);
        alert("Please report this error: "+errorThrown+xhr.status+xhr.responseText);
    }
  });
}

function cleanall(){
  //userid_js = getCookie("userid");
  userid_js = window.localStorage.getItem("userid");
  server='192.168.10.229:8000';
  $.ajax({
    type: "POST",
    url: 'http://' + server + '/cleanall/' + userid_js + '/',
    data: {
        csrfmiddlewaretoken: '{{ csrf_token }}',
    },
    success: function(data) {
      refresh_html_main();
    },
    error: function(xhr, textStatus, errorThrown) {
      alert(result + e);
        alert("Please report this error: "+errorThrown+xhr.status+xhr.responseText);
    }
  });
}


