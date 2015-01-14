var app = { 
    initialize: function() { 
        this.bindEvents(); 
    }, 

    bindEvents: function() { 
        document.addEventListener('deviceready', this.onDeviceReady, false); 
    }, 

    onDeviceReady: function() { 
        app.receivedEvent('deviceready'); 
    }, 
    receivedEvent: function(id) { 
        var parentElement = document.getElementById(id); 
        var listeningElement = parentElement.querySelector('.listening'); 
        var receivedElement = parentElement.querySelector('.received'); 

        listeningElement.setAttribute('style', 'display:none;'); 
        receivedElement.setAttribute('style', 'display:block;'); 

        console.log('Received Event: ' + id); 
        var pushNotification = window.plugins.pushNotification; 
            alert("Register called"); 
            pushNotification.register(this.successHandler, this.errorHandler,{"senderID":"610647426983","ecb":"app.onNotificationGCM"}); 
    }, 
    successHandler: function(result) { 
        alert('Callback Success! Result = '+result) 
    }, 
    errorHandler:function(error) { 
        alert(error); 
    }, 
    onNotificationGCM: function(e) { 
        switch( e.event ) 
        { 
            case 'registered': 
                if ( e.regid.length > 0 ) 
                { 
                    console.log("Regid " + e.regid); 
                    alert('registration id = '+e.regid); 
                    document.getElementById('regId').value = e.regid; 
                } 
            break; 

            case 'message': 
              alert('message = '+e.message+' msgcnt = '+e.msgcnt); 
            break; 

            case 'error': 
              alert('GCM error = '+e.msg); 
            break; 

            default: 
              alert('An unknown GCM event has occurred'); 
              break; 
        } 
    }, 
    onNotificationAPN: function(event) { 
        var pushNotification = window.plugins.pushNotification; 
        alert("Running in JS - onNotificationAPN - Received a notification! " + event.alert); 

        if (event.alert) { 
            navigator.notification.alert(event.alert); 
        } 
        if (event.badge) { 
            pushNotification.setApplicationIconBadgeNumber(this.successHandler, this.errorHandler, event.badge); 
        } 
        if (event.sound) { 
            var snd = new Media(event.sound); 
            snd.play(); 
        } 
    } 
};
