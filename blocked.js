console.log(location);
function getSite() {
    let search = location.search;
    return search.replace("?site=", "");
}
document.getElementById("url").innerHTML = getSite();