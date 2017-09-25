var detailProperties = [ "genre", "duration", "tempo", "type" ],
  linksToDisplay = [[ "soundcloud", "Soundcloud" ], [ "youtube", "Youtube" ], [ "spotify", "Spotify" ], [ "itunes", "iTunes" ], [ "googleMusic", "Google Play Music" ], [ "amazon", "Amazon" ], [ "routenote", "Routenote Direct" ], [ "bandcamp", "Bandcamp" ]];

var search = {
  getElem: function() {
    return $("#SearchInput")[0]
  },
  findTracks: function (str) {
    if (!str || str.length === 0) {
      return Tracks
    }
    var searchTags = str.split(" "),
      results = {},
      trackName;
    for (i in Tracks) {
      if (Tracks.hasOwnProperty(i) && Tracks[i].name && Tracks[i].name.toLowerCase) {
        trackName = Tracks[i].name.toLowerCase();
        searchTags.forEach(function(tag) {
          if (trackName.indexOf(tag.toLowerCase()) !== -1) {
            results[i] = Tracks[i]
          }
        })
      }
    }
    return results
  },
  setValue: function(value) {
    this.getElem().value = value;
    this.update()
  },
  updateValue: function() {
    var elem = this.getElem(),
      value = elem.value;
    elem.setAttribute('value', value);
    return value
  },
  update: function() {
    requestAnimationFrame(function() {
      if (document.body.id == "list") {
        this.submit()
      } else {
        this.updateValue()
      }
    }.bind(this))
  },
  submit: function() {
    try {
      if (document.body.id != "list") {
        location.hash = "";
        setTimeout(this.submit, 100);
        return false
      } else {
        drawTracks(this.findTracks(this.updateValue()))
      }
    } catch (error) {
      console.error(error)
    }
    return false
  },
  clear: function() {
    this.setValue("")
  }
}

function drawTracks(Tracks, defTracks) {
  if (!Tracks || Tracks.length == 0) {
    return false;
  }
  defTracks = defTracks || window.Tracks || Tracks;
  var trackParent = $("#TrackList")[0];
  /* hideTracks(Tracks); */
  var showAfter = 0;
  for (var i in defTracks) {
    if (!defTracks.hasOwnProperty(i)) { continue }
    (function () {
      var Track = defTracks[i];
      var should = Tracks.hasOwnProperty(i);
      if (!Track.elem) {
        var wrap = newElem("div", trackParent, "track-wrap" + ((document.documentElement.classList && document.documentElement.classList.toggle) ? " hide invisible" : ""));
        var elem = newElem("div", wrap, "track pb shadow-2 dynamic");
        Track.elem = wrap;
        Track.shown = false;
        if (Track.img) {
          var imgPar = newElem("a", elem, { class: "track-image-wrap lighten", href: "#" + i });
          newElem("img", imgPar, { class: "track-image shadow dynamic", src: Track.img.replace(/^http:\/\//i, 'https://') })
        }
        var title = newElem("div", elem, { class: "track-title", text: Track.title, title: Track.name });
        addEvent(title, "dblclick", function() {
          selectText(title)
        });
        newElem("div", elem, { class: "track-author", text: Track.author, title: Track.name });
        newElem("div", elem, { class: "divider-1" });
        if (Track.date && Object.prototype.toString.call(Track.date) === "[object Date]") {
          var date = Track.date;
          var dates = newElem("div", elem, "DateContainer");
          newElem("div", dates, { class: "dateText dateAbsolute", text: date.toLocaleDateString([], { day: "numeric", month: "short", year: "numeric" }), title: (date.toLocaleDateString([], { day: "numeric", month: "long", year: "numeric" }) + " | " + date.toLocaleTimeString([])) });
          newElem("div", dates, { class: "dateText dateRelative", text: timeAgo(date, 1), title: timeAgo(date) })
        }
      }
      if (Track.shown != should && Track.elem.classList && Track.elem.classList.toggle) {
        if (should) {
          Track.elem.classList.remove("hide");
          Track.shown = true;
          if (showAfter < 5) {
            Track.elem.classList.remove("invisible")
          } else {
            setTimeout(function() {
              if (Track.shown) { Track.elem.classList.remove("invisible") }
            }, showAfter)
          }
          showAfter += 60
        } else {
          Track.elem.classList.add("invisible");
          Track.elem.classList.add("hide");
          Track.shown = false
        }
      }
    }())
  }
  return true
}
function drawTrack(Track) {
  if (!Track) return false;
  var img = $("#TrackImage")[0];
  img.src = (Track.img) ? processLink(Track.img, true) : "";
  var title = $("#TrackTitle")[0];
  title.innerHTML = "";
  editElem(title, { text: Track.name || "No name", title: Track.title + " by " + Track.author });
  addEvent(title, "dblclick", function() {
    selectText(title)
  });
  var links = $("#TrackLinks")[0];
  links.innerHTML = "";
  var dlLinks = $("#TrackDlLinks")[0];
  dlLinks.innerHTML = "";
  if (Track.download && Track.download.length != 0) {
    for (var key in Track.download) {
      if (Track.download.hasOwnProperty(key)) {
        newElem("a", dlLinks, { class: "btn shadow dynamic wave", href: processLink(Track.download[key]), target: "_blank", innerHTML: "." + key, title: ("Free Download ." + key + " (" + Track.name + ")") })
      }
    }
  } else {
    editElem(dlLinks, { text: "Nothing here..." })
  }
  linksToDisplay.forEach(function(key) {
    if (Track.links.hasOwnProperty(key[0])) {
      var url = processLink(Track.links[key[0]])
      if (url) {
        var a = newElem("a", links, { class: "link", href: url, target: "_blank", title: ("\"" + Track.name + "\" on " + key[1]) });
        var dlbtn = newElem("svg", a, "link-button");
        setVectorSource(dlbtn, key[0])
      }
    }
  })
  var date1 = $("#dateAbsolute")[0];
  var date2 = $("#dateRelative")[0];
  date1.innerHTML = "";
  date2.innerHTML = "";
  if (Track.date) {
    if (Object.prototype.toString.call(Track.date) === "[object Date]") {
      var date = Track.date;
      editElem(date1, { text: date.toLocaleDateString([], { day: "numeric", month: "short", year: "numeric" }), title: date.toLocaleDateString([], { day: "numeric", month: "long", year: "numeric" }) + " | " + date.toLocaleTimeString([]) });
      editElem(date2, { text: timeAgo(date, 1), title: timeAgo(date) })
    }
  }
  var table = $("#TrackDetailsTable")[0];
  table.innerHTML = "";
  if (Track.details) {
    detailProperties.forEach(function(i) {
      if (Track.details.hasOwnProperty(i)) {
        var name = i.capFirstLetter();
        var value = Track.details[i];
        if (i == "type") {
          value = ["Original", "Remix"][value]
        } else if (i == "duration") {
          value = digitClock(value)
        }
        var row = newElem("div", table, "track-details-table-row");
        newElem("div", row, { class: "track-details-table-cell name", text: name });
        newElem("div", row, { class: "track-details-table-cell value", text: value })
      }
    });
    var price = Track.details.price;
  }
  $("#TrackPrice")[0].innerHTML = price || "Free";

  if (Track.links && (window.curEmbedTrack != Track || $("#embeds")[0].innerHTML == "")) {
    $("#embeds")[0].innerHTML = "";
    window.curEmbedTrack = Track;
    if (Track.links.youtube) {
      var ytid = Track.links.youtube.id;
      if (ytid) {
        var ytEmbedWrap = newElem("div", $("#embeds")[0], "yt-embed-wrap embed-wrap");
        var ytEmbedWrap2 = newElem("div", ytEmbedWrap, "yt-embed-wrap2");
        if (Track.links.youtube.aspectRatio) {
          ytEmbedWrap2.style["padding-bottom"] = 100 / Track.links.youtube.aspectRatio + "%"
        }
        var ytEmbed = newElem("iframe", ytEmbedWrap2, { class: "yt-embed embed shadow dynamic", src: "https://www.youtube.com/embed/" + ytid + "?autoplay=0&origin=" + (location.href || (location + "") || location.pathname), frameborder: 0, allowfullscreen: true });
        window.curYtEmbed = ytEmbedWrap2
      }
      window.curYtEmbedId = ytid
    }
    if ($("#embeds")[0].innerHTML != "") {
      var closeButton = newElem("div", $("#embeds")[0], "close-wrap small", "embeds-close");
      var closeButtonIcon = newElem("div", closeButton, "close", "embeds-close-icon");
      addEvent(closeButton, "click", function() {
        $("#embeds")[0].innerHTML = ""
      })
    }
  }
  return true
}
function downloadTrack(Track) {
  if (!isObject(Track)) {
    Track = Tracks[Track]
  }
  if (!Track || !Track.download) return false;
  var popup = newPopup();
  if (Track.img) {
    var img = newElem("img", popup, { class: "track-image shadow", src: processLink(Track.img, true) })
  }
  var dlTextWrap = newElem("div", popup, { class: "center popup-dl-text-wrap", title: Track.name });
  newElem("span", dlTextWrap, { text: "Download" });
  if (Track.title) {
    newElem("span", dlTextWrap, { class: "track-title", text: "\"" + Track.title + "\"" })
  }
  var linksWrap = newElem("div", popup, "popup-dl-links-wrap");
  var width = 100 / Object.keys(Track.download).length + "%";
  for (var key in Track.download) {
    if (Track.download.hasOwnProperty(key)) {
      var linkWrap = newElem("div", linksWrap, "link-wrap");
      linkWrap.style.width = width;
      var a = newElem("a", linkWrap, { class: "btn shadow dynamic wave", href: processLink(Track.download[key]), target: "_blank", innerHTML: "." + key, title: ("Free Download ." + key + " (" + Track.name + ")") })
    }
  }
}
function drawPage(hash) {
  if (typeof hash === 'string' || hash instanceof String) {
    hash = hash || location.hash
  } else {
    hash = location.hash
  }
  hash = hash.replace('#','');
  // console.log("Drawing the page using hash: " + hash);
  if (document.body.id == "list") {
    window.listScroll = document.body.scrollTop
  }
  if (hash === "") {
    removeHash();
    if (document.body.id == "list") return false;
    document.body.id = "list";
    document.title = "Hamty\'s Music";
    drawTracks(Tracks);
    document.body.scrollTop = window.listScroll || window.listScrollDefault || 0
  } else if (Tracks[hash]) {
    document.body.id = "info";
    document.title = Tracks[hash].name + " \| Hamty\'s Website";
    drawTrack(Tracks[hash]);
    document.body.scrollTop = window.infoScrollDefault || 0
  } else {
    removeHash()
  }
  window.listScrollDefault = 200
  window.infoScrollDefault = 200
}

addEvent(document, "DOMContentLoaded", function() {
  addEvent(window, "hashchange", function() {
    drawPage()
  });
  addEvent($("#TrackImage")[0], "click", function() {
    newElem("img", newPopup(), { class: "track-image shadow", src: $("#TrackImage")[0].src })
  });
  drawPage();
  var q = getQueries().q;
  if (q) {
    search.setValue(q)
  }
}, { once: true })
