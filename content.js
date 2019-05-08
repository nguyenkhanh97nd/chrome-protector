console.log("Shield Started");
chrome.runtime.sendMessage({ text: "check_malicious"}, (response) => {
    console.log(response);
    if (response.result === "0") {
        // chrome.tab.update({active: true, url: chrome.extension.getURL('block.html')})
    }
});