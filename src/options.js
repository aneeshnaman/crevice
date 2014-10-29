function saveOptions() {
  console.log("Saving options");
  var json = document.getElementById("options-text").value;
  console.log(json);
  try {
    var data = JSON.parse(json);
    document.getElementById("options-text").style.border = "1px solid grey";
    console.log(data);
    chrome.storage.sync.set({"options": data});
  } catch (e) {
    console.log("Syntax error");
    document.getElementById("options-text").style.border = "1px solid red";
  }
}

function attachListeners() {
  document.getElementById("options-save").addEventListener("click", saveOptions);
}

function setup() {
  chrome.storage.sync.get("options", function(data) {
    if (data["options"]) {
      document.getElementById("options-text").value =
        JSON.stringify(data["options"], undefined, 2);
    }
    attachListeners();
  });
}

document.addEventListener("DOMContentLoaded", setup);
