function HistoryCache() {
  this.results = [];
  chrome.history.search(
      {text: "", startTime: 0, maxResults: HistoryCache.MAX_RESULTS},
      bind(this, this.handleHistoryResults));
}

HistoryCache.MAX_RESULTS = 10000;

HistoryCache.prototype.handleHistoryResults = function(results) {
  this.results = results;
  console.log(results.length);
  this.results.forEach(function(r) { console.log(r.url, r.title); });
};

var MILLISECS_IN_DAY = 24 * 3600 * 1000;

HistoryCache.prototype.search = function(text, maxResults) {
  var results = this.results.filter(function(res) {
    var t = text.toLowerCase();
    return res.title && arrayContains(res.title.toLowerCase(), t) ||
      arrayContains(res.url.toLowerCase(), t);
  });
  results.sort(function(a, b) {
    // more counts win
    if (a.visitCount < b.visitCount) return -1;
    if (a.visitCount > b.visitCount) return +1;
    // recent entries win
    if (a.lastVisitTime > b.lastVisitTime + MILLISECS_IN_DAY) return -1;
    if (a.lastVisitTime < b.lastVisitTime + MILLISECS_IN_DAY) return +1;
    // having a title wins
    if (a.title && !b.title) return -1;
    if (b.title && !a.title) return +1;
    // shorter title wins
    if (a.title && b.title) {
      if (a.title.length < b.title.length) return -1;
      if (a.title.length > b.title.length) return +1;
    }
    // shorter url wins
    if (a.url.length < b.url.length) return -1;
    if (a.url.length > b.url.length) return +1;
    return a.url < b.url;
  });
  return {
    text: text,
    results: results.slice(0, maxResults)
  };
};

var historyCache = new HistoryCache();
