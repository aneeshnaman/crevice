function saveOptions() {
  console.log("Saving options");
  var json = document.getElementById("options-text").value;
  console.log(json);
  try {
    var data = JSON.parse(json);
    document.getElementById("options-text").style.border = "1px solid grey";
    console.log(data);
    chrome.storage.sync.set(data);
  } catch (e) {
    console.log("Syntax error");
    document.getElementById("options-text").style.border = "1px solid red";
  }
}

function attachListeners() {
  document.getElementById("options-save").addEventListener("click", saveOptions);
}

document.addEventListener("DOMContentLoaded", attachListeners);
