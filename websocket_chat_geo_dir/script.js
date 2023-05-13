//Ждем загрузку DOM - либо в скрипте через window.onload, либо в htmlчерез параметр defer
window.onload = function () {
    const msg = document.getElementById("msg")
    const log = document.getElementById("log")
    let conn;

    function appendLog(elem){
        let doScroll = log.scrollTop > log.scrollHeight - log.clientHeight - 1;
        log.appendChild(elem);
        if (doScroll) {
            log.scrollTop = log.scrollHeight - log.clientHeight;
        }
    };

    function initConn () {
        conn = new WebSocket("wss://s8956.nyc1.piesocket.com/v3/1?api_key=HdIWizvqTAq6mmQxYt9DT6ogheSLeu43GQRLdhrC&notify_self=1");
        let item = document.createElement("div");
        item.innerHTML = "<b style='color:green'>Connection opened.</b>";
        appendLog(item);

        conn.onclose = function (evt) {
            let item = document.createElement("div");
            item.innerHTML = "<b style='color:red'>Connection closed.</b>";
            appendLog(item);
        };

        conn.onmessage = function (evt) {
            let messages = evt.data.split('\n');
            let geo_link;
            for (var i = 0; i < messages.length; i++) {
                let item = document.createElement("div");
                let message = messages[i]
                try{
                    message = JSON.parse(message);
                    geo_link = `www.openstreetmap.org/#map=18/${message.lat}/${message.lng}`; 
                    message = `<a href="${geo_link}">Моя локация</a>`
                } catch (e) {
                    // Тут не надо ничего делать
                }
                item.innerHTML = message;
                appendLog(item);
            }
        };
    };


    document.getElementById("form").onsubmit = function () {
        if (!conn) {
            initConn();
            return false;
        }
        if (!msg.value) {
            return false;
        }
        conn.send(msg.value);
        msg.value = "";
        return false;
    };

    document.getElementById("send_geo").onclick = function () {
        if (!conn) {
            return false;
        }
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { coords } = position;
                conn.send(JSON.stringify({lat:coords.latitude, lng:coords.longitude}));
            });
        }
       
        return false;
    };

    document.getElementById("close_conn").onclick = function() {
        conn.close();
        conn =null;
    }

    if (window["WebSocket"]) {
        initConn();
    } else {
        var item = document.createElement("div");
        item.innerHTML = "<b style='color:red'>Your browser does not support WebSockets.</b>";
        appendLog(item);
    }
};
