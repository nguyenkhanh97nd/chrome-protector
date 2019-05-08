function postRequest(url, data) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify(data));
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                resolve(xhr.response);
            }
        }
    })
}
const url = "http://35.197.136.181/api/predict";

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.text === "check_malicious") {
        chrome.tabs.get(sender.tab.id, function (tab) {
            let data = {
                link: tab.url
            }
            postRequest(url, data).then(response => {
                // console.log(sender.tab.id, data.link, response);
                if (response === "1") {
                    try {
                        let blockedUrl = chrome.extension.getURL('blocked.html') + "?site=" + data.link;
                        chrome.tabs.update(sender.tab.id, {url: blockedUrl})
                    } catch (e) {
                        console.log("Can't redirect block ", url)
                    }
                }
            })
        })
    }
    return true;
});