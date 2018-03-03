const svgNS = 'http://www.w3.org/2000/svg';
const root = window.document.documentElement;
const svgIsSupported = (!!window.document.createElementNS && !!root.setAttributeNS);
const svgElemTypes = ['svg', 'path', 'circle'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
Element.remove = (elem) => {
	elem.parentNode.removeChild(elem);
}
String.of = (n, chars) => {
	return n ? Array(n + 1).join(chars) : '';
}
Array.getRandomItem = (array) => {
	return array[parseInt(Math.random() * array.length)];
}
Array.prototype.contains = function(v) {
	return this.indexOf(v) != -1;
}
Element.prototype.$ = Element.prototype.querySelectorAll;
const $ = (...a) => document.querySelectorAll(...a);
String.prototype.isEmpty = function() {
	return (this.length === 0 || !this.trim());
}
String.prototype.capFirstLetter = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
}
const Scripts = {
	add(src) {
		return new Promise((resolve, reject) => {
			let status = this.added[src] && this.added[src].status;
			if (status === 'loaded') {
				return resolve(...this.added[src].v);
			} else if (status !== 'loading') {
				var elem = Element.create('script', document.head, { src: src, async: true });
				this.added[src] = {};
				this.added[src].status = 'loading';
			}
			addEvent(elem, 'load', (...e) => {
				this.added[src].status = 'loaded';
				resolve(...this.added[src].v = e);
			});
			addEvent(elem, 'error', (...e) => {
				this.added[src].status = 'failed';
				reject(...this.added[src].v = e);
			});
		});
	},
	added: {}
}
function getQueries(s) {
	s = s || window.location.search;
	var a = s.substr(1).split('&'),
		b = {};
	if (a) a.forEach(function(i) {
		var p = i.split('=', 2);
		if (p.length == 1) b[p[0]] = '';
		else b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, ' '));
	});
	return b;
}
Element.create = (type, parent, attributes, id) => {
	type = type.toLowerCase();
	var isSvg = svgIsSupported && svgElemTypes.contains(type),
	elem = isSvg ? document.createElementNS(svgNS, type) : document.createElement(type);
	if (parent) parent.appendChild(elem);
	if (isObject(attributes)[1] === 'object') {
		Element.edit(elem, attributes)
	} else if (attributes) {
		attributes.split(' ').forEach(c => elem.classList.add(c));
	}
	if (id) elem.id = id;
	return elem;
}
Element.edit = (elem, attributes) => {
	if (isObject(attributes)[1] !== 'object') return elem;
	var type = elem.tagName.toLowerCase(),
	isSvg = svgIsSupported && svgElemTypes.contains(type);
	Object.entries(attributes).forEach(([k, v]) => {
		var prop = k.toLowerCase();
		if (['innerhtml', 'outerhtml', 'id', 'checked', 'src'].contains(prop)) {
			elem[prop] = v;
		} else if (prop == 'class') {
			v.split(' ').forEach(c => elem.classList.add(c));
		} else if (prop == 'text') {
			elem.insertAdjacentHTML('beforeend', v);
		} else if (prop == 'style') {
			Object.entries(v).forEach(([property, value]) => {
				elem.style[property] = value;
			});
		} else {
			isSvg ? elem.setAttributeNS(null, k, v) : elem.setAttribute(k, v);
		}
	});
	return elem;
}
function emptyElem(elem) {
	while (elem.firstChild) {
		elem.removeChild(elem.firstChild);
	}
	return elem;
}
function addEvent(elem, evt, fn, options) {
	let se = (elem) => {
		if (evt.forEach) {
			evt.forEach(evt => elem.addEventListener(evt, fn, options));
		} else {
			elem.addEventListener(evt, fn, options);
		}
	}
	if (elem.forEach) {
		elem.forEach(k => se(k));
	} else {
		se(elem);
	}
	
}
function isObject(v) {
  var type  = typeof v
	, isObj = type === 'object'
	, isFn  = type === 'function'
	, isArr = v instanceof Array
	  , isMap = v instanceof Map
  type = (isArr) ? 'array' : type;
	type = (isMap) ? 'map' : type;
	return [ (v !== null && (isArr || isFn || isObj)), type ];
}
function removeHash() {
	var scrollV, scrollH, loc = window.location;
	if (loc.hash !== '') {
		scrollV = scrollY; // Prevent scrolling by storing the page's current scroll offset
		scrollH = scrollX;
		loc.hash = '';
		scrollTo(scrollH, scrollV); // Restore the scroll offset, should be flicker free
	}
	if ('replaceState' in history) {
		history.replaceState('', document.title, loc.pathname + loc.search);
	}
}
function processLink(link, https) {
	if (!link) return undefined;
	if (link.href) link = link.href;
	if (link.constructor === Array) link = link.join('');
	if (https) link = link.replace(/^http:\/\//i, 'https://');
	return (typeof link === "string") ? link : false;
}

function digitClock(ms) {
	if (ms < 0) return '-' + digitClock(-ms);
	var arr     = []
	  , sec     = parseInt(ms / 1e3)
	  , hours   = parseInt(sec / 3600)
	  , minutes = parseInt((sec % 3600) / 60)
	  , seconds = sec % 60;
	if (hours) arr.push(hours);
	arr.push((minutes < 10 ? '0' : '') + minutes);
	arr.push((seconds < 10 ? '0' : '') + seconds);
	return arr.join(`:`);
}
function getCurrentMonth() {
	return new Date().getMonth();
}
function selectText(elem) {
	if (document.selection) {
		var range = document.body.createTextRange();
		range.moveToElementText(elem);
		range.select();
	} else if (window.getSelection) {
		var range = document.createRange();
		range.selectNodeContents(elem);
		window.getSelection().removeAllRanges();
		window.getSelection().addRange(range);
	}
}
class UserPreference {
	constructor(object) {
		this.values = object.values;
		this.name = object.name;
	}
	toggle() {
		let values = this.values;
		let newValue = values[values.indexOf(this.value) + 1];
		return this.value = newValue || values[0];
	}
	set value(value) {
		if (this.value !== value) {
			localStorage[this.name] = value;
		}
		this.update();
		return value;
	}
	get value() {
		return localStorage[this.name];
	}
	get callbacks() {
		Object.defineProperty(this, 'callbacks', { value: [], writable: false, configurable: true });
		return this.callbacks;
	}
	update() {
		this.callbacks.forEach(fn => fn(this.value));
	}
	addEventListener(type, callback) {
		this.callbacks.push(callback);
	}
}
const userPrefs = (() => {
	let object = {};
	Object.entries({
		Theme: {
			values: ['light', 'dark']
		},
		ListViewStyle: {
			values: ['grid', 'list']
		}
	}).forEach(([k, v]) => {
		v.name = k;
		object[k] = new UserPreference(v);
	});
	return object;
})();
addEvent(window, 'storage', e => {
	userPrefs[e.key].update();
});
const Images = {
	setVectorSource(...args) {
		const fn = (elem, id) => {
			let img = this.svg[id];
			if (elem && id && img && img.inline) {
				if (img.inline.wide) elem.classList.add('wide');
				elem.setAttributeNS(null, 'viewBox', img.inline.svg.viewbox);
				Element.create('path', elem, { d: img.inline.path.d });
				console.log(id, elem);
			}
		}
		if (this.svg) {
			fn(...args);
		} else {
			new Promise((resolve, reject) => {
				const xhr = new XMLHttpRequest();
				xhr.open("GET", `/json/images.json`);
				xhr.onload = () => resolve(xhr.responseText);
				xhr.onerror = () => reject(xhr.statusText);
				xhr.send();
			}).then((text) => {
				this.svg = JSON.parse(text);
				fn(...args);
			});
		}
	}
}
function newPopup() {
  $('.popup-body').forEach(v => Element.remove(v));
	var popupBody   = Element.create("div", document.body, "popup-body")
	  , popupBg     = Element.create("div", popupBody, "grayout")
	  , popupWrap   = Element.create("div", popupBody, "popup-wrap")
	  , popup       = Element.create("div", popupWrap, "popup page-block shadow-5")
	  , popupInner  = Element.create("div", popup, "popup-inner")
	  , closeButton = Element.create("div", popup, "close-wrap")
	  , closeIcon   = Element.create("div", closeButton, "close");
	addEvent([ popupBg, closeButton ], 'click', () => Element.remove(popupBody));
	return popupInner;
}
function openMenu() {
	var menuBody;
	if (menuBody = $(".menu-body")[0]) {
		menuBody.classList.remove("off");
		menuBody.classList.remove("hide");
	} else {
		let menuBg, menuWrap, menu, menuInner, closeButton, menuItems, menuItem, itemVisual, toggleWrap, toggle;
		let addLink = (o) => {
			let menuItem, itemVisual;
			menuItem   = Element.create('a', menuItems, { class: 'menu-item', href: o.href });
			if(o.newtab) menuItem.target = '_blank';
			itemVisual = Element.create('div', menuItem, 'menu-item-visual');
			Images.setVectorSource(Element.create('svg', itemVisual), o.img);
			Element.create('div', menuItem, { class: 'menu-item-text', text: o.text });
			return menuItem;
		}
		let addToggle = (o) => {
			o.e = o.e || {};
			let menuItem, itemVisual, toggleWrap, toggle;
			menuItem    = Element.create("div", menuItems, "menu-item");
			itemVisual  = Element.create("div", menuItem, "menu-item-visual");
			toggleWrap  = Element.create("div", itemVisual, "material-toggle-wrap");
			
			toggle = Element.create("input", toggleWrap, { type: "checkbox", class: "material-toggle-checkbox", id: o.id, checked: o.checked });
			if (userPrefs[o.userPref]) {
				if (o.val) {
					if (!o.checked) {
						toggle.checked = (userPrefs[o.userPref].value === o.val);
					}
					addEvent(userPrefs[o.userPref], o.userPref, () => {
						toggle.checked = (userPrefs[o.userPref].value === o.val);
					});
				}
				if (!o.e.change) {
					o.e.change = () => userPrefs[o.userPref].toggle();
				}
			}
			Object.entries(o.e).forEach(e => addEvent(toggle, ...e));
			Element.create("label", toggleWrap, { for: o.id, class: "material-toggle" });
			Element.create("div", menuItem, { class: "menu-item-text", text: o.text });
			return toggle;
		}
		menuBody    = Element.create("div", document.body, "menu-body");
		menuBg      = Element.create("div", menuBody, "grayout");
		menuWrap    = Element.create("div", menuBody, "menu-wrap");
		menu        = Element.create("div", menuWrap, "menu shadow-5");
		menuInner   = Element.create("div", menu, "menu-inner");
		closeButton = Element.create("svg", menuInner, { class: "menu-close-btn" });
		Images.setVectorSource(closeButton, "close");
		addEvent([ menuBg, closeButton ], "click", closeMenu);
		Element.create("div", menuInner, "divider-2");
		menuItems   = Element.create("div", menuInner, "menu-items");
		addLink({ text: 'Home', img: 'home', href: `/` });
		Element.create("div", menuInner, "divider-2");
		menuItems   = Element.create("div", menuInner, "menu-items");
		addToggle({ text: 'Dark theme', id: 'themeToggle', userPref: 'Theme', val: 'dark' });
		addToggle({ text: 'List View', id: 'menuListViewStyleToggle', userPref: 'ListViewStyle', val: 'list' });
		addLink({ text: 'Send feedback', img: 'feedback', newtab: true, href: `https://goo.gl/forms/OZrp6VWTAkDpyUhd2` });
	}
	return menuBody;
}
function closeMenu() {
	var elem = $('.menu-body')[0];
	elem.classList.add('hide');
	setTimeout(() => {
		if(elem.classList.contains('hide')) elem.classList.add('off');
	}, 400);
}
addEvent(document, 'DOMContentLoaded', () => {
	var elem = $('.header-menu-btn')[0];
	if (elem) addEvent(elem, 'click', openMenu);
}, { once: true });
addEvent(document, 'DOMContentLoaded', () => {
	document.documentElement.style.setProperty('--banner-image', `url(/img/banners/banner${ Array.getRandomItem([1, 2, 3, 3, 3, 4, 5]) }.jpg)`);
	if ([11, 0, 1].contains(new Date().getMonth())) {
		Scripts.add('/js/LetItSnow.js');
	}
	Object.entries(userPrefs).forEach(([name, pref]) => {
		pref.update();
	})
	addEvent(userPrefs.Theme, true, value => {
		let cl = document.documentElement.classList;
		((value === 'dark') ? cl.add : cl.remove).bind(cl)('dark-theme');
	});
}, { once: true });
