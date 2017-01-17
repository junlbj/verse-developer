/**
 * Print out Verse API data for all the action samples
 */
window.addEventListener("message", function(event) {
  var eventData = event.data;

  console.log(event);

  document.getElementById("status").innerHTML = "";

  document.getElementById("messages").innerHTML = "Message received: " + "<hr><pre id='json'></pre>";

  document.getElementById("json").innerText = JSON.stringify(eventData, null, 2);

  /**
   * Message from Verse to check whether your web application is ready.
   */
  if (eventData.verseApiType === "com.ibm.verse.ping.application.loaded") {
    if (isValidOrigin(event.origin)) {
      var loaded_message = {
        verseApiType: 'com.ibm.verse.application.loaded'
      };
      /**
       * Your application must send a message back to Verse
       * to identify that it's ready to receive data from Verse.
       */
      event.source.postMessage(loaded_message, event.origin);
    }
  }
}, false);

/** Verify we are listening to the right origin
 * @param {String} currentOrigin - The url which we should listen to
 * @return {Boolean} true if the origin is valid, false otherwise
 */
function isValidOrigin(currentOrigin) {
  var manifest = chrome.runtime.getManifest();
  var originsList = manifest.content_scripts[0].matches;
  for (var i = 0; i < originsList.length; i++) {
    if (originsList[i].indexOf(currentOrigin) !== -1) {
      return true;
    }
  }
  return false;
}
