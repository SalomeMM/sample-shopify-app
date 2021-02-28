const script = document.createElement("script");
script.src = "https://code.jquery.com/jquery-3.4.1.min.js";
script.type = "text/javascript";
script.onreadystatechange = handler;
script.onload = handler;
document.getElementsByTagName("head")[0].appendChild(script);

function handler() {

console.log("This is coming from script tag api!!!!!!!!");

const header = $(`header.site-header`).parent();

header
  .prepend("<div>Hello this is coming from the public folder</div>")
  .css({ "background-color": "orange", "text-align": "center" });

}