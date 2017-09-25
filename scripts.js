const svgNS = "http://www.w3.org/2000/svg";
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var scripts = {};
HTMLElement.prototype.setClass = function(classes) {
  if (typeof classes == "string") {
    classes = classes.split(" ")
  }
  if (classes.length == 1) {
    this.classList.add(classes)
  } else if (classes.length > 1) {
    for (var i = 0; i < classes.length; i++) {
      this.classList.add(classes[i])
    }
  }
}
String.prototype.isEmpty = function() {
  return (this.length === 0 || !this.trim())
}
String.prototype.capFirstLetter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1)
}
function getQueries(s) {
  s = s || window.location.search;
  var a = s.substr(1).split('&'),
    b = {};
  if (a) a.forEach(function(i) {
    var p = i.split('=', 2);
    if (p.length == 1) b[p[0]] = "";
    else b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "))
  });
  return b
}
var theme = {
  isSupported: function() {
    return (((typeof localStorage) !== "undefined") && (document.documentElement.classList && document.documentElement.classList.toggle))
  },
  toggle: function() {
    if (this.isSupported()) {
      localStorage.darkTheme = document.documentElement.classList.toggle("dark-theme")
    }
  },
  set: function(theme) {
    if (theme === 1 || theme === true || (theme.toLowerCase && ( theme.toLowerCase() === "true" || theme.toLowerCase() === "dark"))) {
      localStorage.darkTheme = true
    } else {
      localStorage.darkTheme = false
    }
    this.load()
  },
  load: function() {
    if (this.isSupported()) {
      (localStorage.darkTheme == "true") ? document.documentElement.classList.add("dark-theme") : document.documentElement.classList.remove("dark-theme")
    }
  },
  get: function() {
    return (localStorage.darkTheme == "true") ? "dark" : "light"
  }
}
addEvent(window, "storage", function(e) {
  if (e.key == "darkTheme") theme.load()
})
theme.load();
var images = {
  soundcloud: {
    inline: {
      wide: true,
      svg: { viewbox: "0 0 612 333.3" },
      path: { d: "M522.7 138.2c-.7-.1-1.4-.2-2.1-.2-9.5-78.3-74.8-138-153.1-138-27.9 0-71.1 13.6-91.2 25.8l-6.6 4v302.8l256.7.7c44.8 0 85.6-48 85.6-100.6 0-49.5-37.5-89.2-89.3-94.5zm-288.8-110.4c-7.6 0-13.8 6.2-13.8 13.8v275.2c0 7.6 6.2 13.8 13.8 13.8 7.6 0 13.8-6.1 13.8-13.8v-275.2c0-7.6-6.2-13.8-13.8-13.8zm-55 27.5c-7.6 0-13.8 6.2-13.8 13.8v247.7c0 7.6 6.2 13.8 13.8 13.8 7.6 0 13.8-6.1 13.8-13.8v-247.7c0-7.6-6.2-13.8-13.8-13.8zm-55 0c-7.6 0-13.8 6.2-13.8 13.8v247.7c0 7.6 6.2 13.8 13.8 13.8 7.6 0 13.8-6.1 13.8-13.8v-247.7c0-7.6-6.2-13.8-13.8-13.8zm-55 55c-7.6 0-13.8 6.2-13.8 13.8v192.6c0 7.6 6.2 13.8 13.8 13.8 7.6 0 13.8-6.1 13.8-13.8v-192.6c0-7.6-6.2-13.8-13.8-13.8zm-55.1 41.3c-7.6 0-13.8 6.2-13.8 13.8v123.8c0 7.6 6.2 13.8 13.8 13.8 7.6 0 13.8-6.2 13.8-13.8v-123.8c0-7.6-6.2-13.8-13.8-13.8z" }
    }
  },
  youtube: {
    inline: {
      wide: true,
      svg: { viewbox: "0 0 512 360.3" },
      path: { d: "M492 30.9c-18.4-21.9-52.6-30.9-117.7-30.9h-236.6c-66.6 0-101.3 9.5-119.7 32.9-18 22.8-18 56.4-18 102.9v88.6c0 90.1 21.3 135.8 137.7 135.8h236.6c56.5 0 87.8-7.9 108.1-27.3 20.7-19.8 29.6-52.2 29.6-108.4v-88.6c0-49.1-1.4-82.9-20-105zm-163.3 161.5l-107.4 56.1c-2.4 1.3-5 1.9-7.6 1.9-3 0-5.9-.8-8.6-2.4-4.9-3-8-8.4-8-14.1v-111.9c0-5.8 3-11.1 7.9-14.1s11.1-3.2 16.2-.5l107.4 55.8c5.5 2.8 8.9 8.5 8.9 14.6 0 6.2-3.4 11.8-8.9 14.7z" }
    }
  },
  bandcamp: {
    inline: {
      wide: true,
      svg: { viewbox: "0 0 446 270.2" },
      path: { d: "m109.3 270.2 17.7 0c-7.1-3.9-13.2-10.7-17.6-16.6zm-22.1 0 0-188.7L0 270.2Zm233.9 0 4.3-9.3c-3.9 3.7-8.6 6.9-14.2 9.3zM446 0 124.9 0 88 79.8l22.6 0 0 69.5c13.3-13 25.2-21.1 40.7-21.6 37 0 58 30.4 58 69.5 0 26.8-9 60.8-37.2 73.1l89.7 0c-23.9-9.8-37.4-34.3-37.4-65.1 0-43.1 20.8-77.5 66.8-77.5 36.5 0 50.3 26.6 52.2 50.9l-22.6 0c-2.9-18.6-13.3-29.8-33-29.8-29 0-38.3 27.7-38.3 52.4 0 24 5.9 53.5 38.1 53.5 15.7 0 29.3-11.7 33.3-33l22.6 0c0 0.1 0 0.2 0 0.3zM147.7 254.7c25.6 0 37.5-23.2 37.5-53.8 0-17.8-1.9-52.2-38.1-52.2-33.8 0-37.5 36.5-37.5 59.1 0 37 23.2 46.9 38.1 46.9z" }
    }
  },
  download: {
    inline: {
      wide: true,
      svg: { viewbox: "0 0 28 34" },
      path: { d: "M28 12h-8V0H8v12H0l14 14 14-14zM0 30v4h28v-4H0z" }
    }
  },
  routenote: {
    inline: {
      svg: { viewbox: "0 0 99.3 99.3" },
      path: { d: "M46.6 0c-2.6.4-5.199.699-7.799 1.199-19.4 4.2-35.102 20.801-38.102 40.301-.3 1.7-.499 3.4-.699 5.1v6.201c.4 2.5.699 4.998 1.199 7.398 4.3 20 20.3 35.1 40.5 38.5 24.3 4 48.001-10.498 55.301-33.898 8.9-28.2-8.299-57.601-37.199-63.701-2.3-.5-4.6-.7-7-1.1h-6.201zm-23.6 19.801h20.5c10.2 0 18.8 7.1 20.6 17 1.8 10-3.699 19.599-13.299 23.299-.2.1-.501.201-.801.301 1.8 4.8 7.801 8.899 12.301 8.299v-3.398c4.4 2.3 8.498 4.6 12.898 7l-12.799 7v-3.5c-7.6-.5-13.4-3.7-17.4-10-2.3-3.5-3.5-8.401-2.9-11.301.9-.1 1.9-.099 2.9-.199 7.4-.8 12.8-7.1 12.5-14.4-.3-7.3-6.2-13.201-13.6-13.301-6.4-.1-12.9 0-19.4 0h-1.5v-6.799z" }
    }
  },
  spotify: {
    inline: {
      svg: { viewbox: "0 0 1674.9 1674.9" },
      path: { d: "M1332.8 742.4c-269.9-160.3-715.2-175-972.9-96.8-41.4 12.6-85.1-10.8-97.7-52.2-12.5-41.4 10.8-85.1 52.2-97.7 295.8-89.8 787.6-72.4 1098.3 112 37.2 22.1 49.4 70.2 27.4 107.3-22.1 37.2-70.2 49.5-107.3 27.4zm-8.8 237.4c-18.9 30.7-59.1 40.4-89.8 21.5-225-138.3-568.2-178.4-834.5-97.6-34.5 10.4-71-9-81.5-43.5-10.4-34.5 9.1-70.9 43.5-81.4 304.2-92.3 682.3-47.6 940.7 111.3 30.7 18.9 40.4 59.1 21.5 89.8zm-102.5 228c-15 24.7-47.2 32.4-71.8 17.4-196.7-120.2-444.2-147.3-735.7-80.7-28.1 6.4-56.1-11.2-62.5-39.2-6.4-28.1 11.1-56.1 39.3-62.5 319-72.9 592.6-41.5 813.4 93.3 24.6 15 32.4 47.2 17.3 71.8zm-384.1-1207.8c-462.5 0-837.4 374.9-837.4 837.4s374.9 837.4 837.4 837.4 837.4-374.9 837.4-837.4c.1-462.5-374.9-837.4-837.4-837.4" }
    }
  },
  itunes: {
    inline: {
      svg: { viewbox: "0 0 416.9 552" },
      path: { d: "M348.2 272c-.6-64.8 52.9-95.9 55.3-97.5-30.1-44-76.9-50-93.6-50.7-39.9-4-77.8 23.5-98 23.5-20.2 0-51.4-22.9-84.5-22.3-43.5.6-83.5 25.3-105.9 64.2-45.2 78.4-11.6 194.4 32.4 258 21.5 31.1 47.1 66 80.8 64.8 32.4-1.3 44.7-21 83.9-21s50.2 21 84.5 20.3c34.9-.6 57-31.7 78.3-62.9 24.7-36.1 34.9-71 35.5-72.8-.8-.4-68-26.1-68.7-103.6zm-64.5-190.3c17.9-21.7 29.9-51.8 26.6-81.8-25.7 1-56.9 17.1-75.4 38.8-16.6 19.2-31.1 49.8-27.2 79.2 28.7 2.2 58.1-14.6 76-36.2z" }
    }
  },
  googleMusic: {
    inline: {
      svg: { viewbox: "0 0 468 512" },
      path: { d: "M269.7 279.7l-230.9 230.9c3.8.9 7.6 1.4 11.5 1.4 9.5 0 19-2.7 27.3-8.1l267-149.4-74.8-74.8zm172.5-67.6l-67.3-37.6-81.5 81.5 81.5 81.5 67.3-37.6c16.1-9 25.7-25.4 25.7-43.9s-9.6-34.9-25.7-43.9zm-432.1-192c-6.4 8.6-10.1 19.1-10.1 30.2v411.4c0 11.1 3.7 21.6 10.1 30.2l235.9-235.9-235.9-235.9zm67.5-12c-11.7-7.5-25.7-9.8-38.8-6.7l230.9 230.9 74.9-74.9-267-149.3z" }
    }
  },
  amazon: {
    inline: {
      svg: { viewbox: "0 0 371.6 322.1" },
      path: { d: "M299.9 248.3c9.2-6.8 32.1-18.6 66.3-8.3 3.1.9 5.3 3.9 5.3 7.1.1 11.2-2.3 37.6-24.3 59.5-1.5 1.5-4.1 0-3.5-2.1 3.8-13.8 11.4-43.5 9-47.6-2.8-4.7-37.5-5-51.5-4.9-2.1 0-2.9-2.6-1.3-3.8zm-298.4 10.3c-3.9-3.5.3-9.8 5.1-7.5 33.2 16.4 95.8 41.7 164.9 41.7 70.7 0 129.8-16.9 159.5-27.3 4.8-1.7 8.3 4.6 4.3 7.9-23.6 19.1-74.3 48.7-162 48.7-87.4 0-144.2-38.4-171.9-63.5zm280.6-62.1c-7-10.6-16.2-22.8-16.3-34.8v-71.9c0-28.7 2.1-89.8-79.8-89.8-66.6 0-87.3 35.5-93.6 57.5-2.5 8.7 3.4 17.6 12.4 18.5 12.5.9 33.9 7.4 40.4-5.4 5-10.5 13.7-26.1 40.7-26.1 10.4 0 25.1 4.4 25.1 17.3 3.3 29.8-4.1 35.5-32.3 34.7-19 0-91.4 9.8-91.4 82.2s76.8 64.1 81.9 62.9c9.5-2.2 27.3-8.7 44.1-24.7 9.3-6.4 17.8 10.6 23.3 17.3 5.3 6.5 14.9 7.2 21.1 1.5 9.8-9.7 33.4-24.6 24.5-39.1zm-111-4c-25.7 0-25-23.3-19-34.3 5.6-10.3 20.2-28.6 59.6-29.9-.7 36.2-8.2 63.6-40.6 64.2z" }
    }
  },
  close: {
    inline: {
      svg: { viewbox: "0 0 24 24" },
      path: { d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" }
    }
  }
}
function $(q, caller) {
  caller = caller || document;
  return caller.querySelectorAll(q);
}
function newElem(type, parent, attributes, id) {
  type = type.toLowerCase();
  var elem,
    isSvg = (document.createElementNS && document.setAttributeNS) && (type == "svg" || type == "path" || type == "circle");
  if (isSvg) {
    elem = document.createElementNS(svgNS, type);
  } else {
    elem = document.createElement(type);
  }
  (parent || document.body).appendChild(elem);
  if (isObject(attributes)) {
    editElem(elem, attributes)
  } else if (attributes) {
    elem.setClass(attributes)
  }
  if (id) {
    elem.id = id
  }
  return elem
}
function editElem(elem, attributes) {
  if (!isObject(attributes)) {
    return elem
  }
  var type = elem.tagName.toLowerCase(),
    isSvg = (document.createElementNS && document.setAttributeNS) && (type == "svg" || type == "path" || type == "circle");
  for (var i in attributes) {
    if (attributes.hasOwnProperty(i) && i.toLowerCase) {
      var p = i.toLowerCase();
      if (p == "innerhtml" || p == "outerhtml" || p == "id" || p == "checked" || p == "src" ) {
        elem[i] = attributes[i]
      } else if (p == "class") {
        elem.setClass(attributes[i])
      } else if (p == "text") {
        elem.insertAdjacentHTML("beforeend", attributes[i])
      } else if (isSvg) {
        elem.setAttributeNS(svgNS, i, attributes[i])
      } else {
        elem.setAttribute(i, attributes[i])
      }
    }
  }
  return elem
}
function addEvent(elem, evnt, func, options) {
  if (elem.addEventListener) { // W3C DOM
    elem.addEventListener(evnt, func, options);
  } else if (elem.attachEvent) { // IE DOM
    elem.attachEvent("on" + evnt, func);
  } else { // No much to do
    elem[evnt] = func;
  }
}
function addScript(src) {
  if (scripts.src) {
    return false
  } else {
    return scripts.src = newElem("script", document.head, { src: src })
  }
}
function isObject(val) {
  if (val === null) { return false; }
  return ((typeof val === 'function') || (typeof val === 'object'));
}
function newPopup() {
  var otherPopup = $(".popup-body")[0];
  if (otherPopup) {
    otherPopup.outerHTML = "";
    return newPopup();
  }
  var popupBody = newElem("div", false, "popup-body"),
    popupBg = newElem("div", popupBody, "grayout"),
    popupWrap = newElem("div", popupBody, "popup-wrap"),
    popup = newElem("div", popupWrap, "popup pb shadow-5"),
    popupInner = newElem("div", popup, "popup-inner"),
    closeButton = newElem("div", popup, "close-wrap"),
    closeButtonIcon = newElem("div", closeButton, "close");
  addEvent(popupBg, "click", closePopup);
  addEvent(closeButton, "click", closePopup);
  return popupInner;
  function closePopup() {
    var elem = $(".popup-body")[0];
    elem.parentNode.removeChild(elem);
  }
}
function openMenu() {
  var otherMenu = $(".menu-body")[0];
  if (otherMenu) {
    otherMenu.classList.remove("off");
    otherMenu.classList.remove("hide");
    return otherMenu;
  }
  var menuBody = newElem("div", false, "menu-body"),
    menuBg = newElem("div", menuBody, "grayout");
  addEvent(menuBg, "click", closeMenu);
  var menuWrap = newElem("div", menuBody, "menu-wrap"),
    menu = newElem("div", menuWrap, "menu shadow-5"),
    menuInner = newElem("div", menu, "menu-inner"),
    closeButton = newElem("svg", menuInner, { class: "menu-close-btn", onclick: "closeMenu()" });
  setVectorSource(closeButton, "close");
  newElem("div", menuInner, "divider-2");
  var menuItems = newElem("div", menuInner, "menu-items")
    menuItem = newElem("div", menuItems, "menu-item"),
    menuItemVisual = newElem("div", menuItem, "menu-item-visual"),
    menuThemeToggleWrap = newElem("div", menuItemVisual, "material-toggle-wrap"),
    menuThemeToggleCheckbox = newElem("input", menuThemeToggleWrap, { type: "checkbox", class: "material-toggle-checkbox", id: "themeToggle", checked: (theme.get() == "dark") }),
    menuThemeToggleLabel = newElem("label", menuThemeToggleWrap, { for: "themeToggle", class: "material-toggle" });
  addEvent(menuThemeToggleCheckbox, "change", function() {
    theme.set($("#themeToggle")[0].checked)
  });
  var menuItemText = newElem("div", menuItem, { class: "menu-item-text", text: "Dark Theme" });
  return menuBody
}
function closeMenu() {
  var elem = $(".menu-body")[0];
  elem.classList.add("hide");
  setTimeout(function() {
    elem.classList.add("off")
  }, 400)
}
addEvent(document, "DOMContentLoaded", function() {
  var elem = $(".header-menu-btn")[0];
  if (elem) {
    addEvent(elem, "click", openMenu)
  }
});
function setVectorSource(elem, id) {
  if (elem && id && images[id] && images[id].inline) {
    /*
    if (images[id].svg) { elem.src = images[id].svg; }
    if (images[id].png) { elem.onerror = "this.onerror = null; this.src = \'" + images[id].png + "\'"; }
    */
    images[id].inline;
    if (images[id].inline.wide) {
      elem.classList.add("wide")
    }
    elem.setAttributeNS(svgNS, "viewbox", images[id].inline.svg.viewbox);
    elem.insertAdjacentHTML("beforeend", id.capFirstLetter());
    newElem("path", elem, { d: images[id].inline.path.d });
    elem.outerHTML += ""
  } else {
    return elem
  }
}
function removeHash() {
  var scrollV, scrollH, loc = window.location;
  if (!(loc.hash === "" || loc.hash === "_=_")) {
    scrollV = document.body.scrollTop; // Prevent scrolling by storing the page's current scroll offset
    scrollH = document.body.scrollLeft;
    loc.hash = "";
    document.body.scrollTop = scrollV; // Restore the scroll offset, should be flicker free
    document.body.scrollLeft = scrollH
  }
  if ("replaceState" in history) {
    history.replaceState("", document.title, loc.pathname + loc.search)
  }
}
function processLink(link, https) {
  if (!link) return undefined;
  if (link.href) link = link.href;
  if (link.constructor === Array) link = link.join("");
  if (https) link = link.replace(/^http:\/\//i, 'https://');
  return (typeof link === "string") ? link : false
}
function timeAgo(then, length) {
  length = length || 3;
  var now = new Date();
  if ((now - then) < 0) return "Coming soon";
  var deltaYr = now.getFullYear() - then.getFullYear();
  if (then.getMonth() > now.getMonth() || (then.getMonth() === now.getMonth() && then.getDate() > now.getDate())) deltaYr--;
  var deltaMn = now.getMonth() - then.getMonth();
  if (deltaMn < 0) deltaMn += 12;
  if (then.getDate() > now.getDate()) deltaMn--;
  var tempDy = (now.getTime() - new Date(then.getFullYear() + deltaYr, then.getMonth() + deltaMn, then.getDate()).getTime()) / (1000 * 60 * 60 * 24);
  var deltaDy = Math.floor(tempDy);
  var tempHr = (tempDy - deltaDy) * 24;
  var deltaHr = Math.floor(tempHr);
  var tempMt = (tempHr - deltaHr) * 60;
  var deltaMt = Math.floor(tempMt);
  var tempSc = (tempMt - deltaMt) * 60;
  var deltaSc = Math.floor(tempSc);
  var sb = [];
  if (deltaYr > 0) sb.push(deltaYr + ' year' + (deltaYr > 1 ? 's' : ''));
  if (deltaMn > 0) sb.push(deltaMn + ' month' + (deltaMn > 1 ? 's' : ''));
  if (deltaDy > 0) sb.push(deltaDy + ' day' + (deltaDy > 1 ? 's' : ''));
  if (deltaHr > 0) sb.push(deltaHr + ' hour' + (deltaHr > 1 ? 's' : ''));
  if (deltaMt > 0) sb.push(deltaMt + ' minute' + (deltaMt > 1 ? 's' : ''));
  if (deltaSc > 0) sb.push(deltaSc + ' second' + (deltaSc > 1 ? 's' : ''))
  if (sb.length > length) sb.length = length;
  return (sb.join(', ') + " ago")
}
function digitClock(sec) {
  var arr = [],
    hours = Math.floor(sec / 3600),
    minutes = Math.floor((sec % 3600) / 60),
    seconds = sec % 60;
  if (hours > 0) arr.push(hours);
  arr.push((minutes < 10 ? "0" : "") + minutes);
  arr.push((seconds < 10 ? "0" : "") + seconds);
  return arr.join(":")
}
function getCurrentMonth() {
  return (new Date()).getMonth()
}
function selectText(elem) {
  if (document.selection) {
    var range = document.body.createTextRange();
    range.moveToElementText(elem);
    range.select()
  } else if (window.getSelection) {
    var range = document.createRange();
    range.selectNodeContents(elem);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range)
  }
}
addEvent(document, "DOMContentLoaded", function() {
  var backgrounds = [
    "/img/banners/banner1.jpg",
    "/img/banners/banner2.jpg",
    "/img/banners/banner3.jpg",
    "/img/banners/banner3.jpg",
    "/img/banners/banner3.jpg",
    "/img/banners/banner4.jpg",
    "/img/banners/banner5.jpg"
  ];
  var elem = $(".banner")[0];
  if (elem) {
    elem.style["background-image"] = "url(" + backgrounds[Math.floor(Math.random() * (backgrounds.length))] + ")"
  }
}, { once: true });
(function() {
  var m = month[getCurrentMonth()];
  if ((location.pathname != "/banner") && (m == "December" || m == "January" || m == "February")) {
    addEvent(document, "DOMContentLoaded", function() {
      addScript("/LetItSnow.js")
    }, { once: true });
  }
})();
