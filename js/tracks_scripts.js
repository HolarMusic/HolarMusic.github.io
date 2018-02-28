const detailProperties = ['genre', 'duration', 'tempo', 'type'],
	linksToDisplay = [['soundcloud', 'Soundcloud'], ['youtube', 'Youtube'], ['spotify', 'Spotify'], ['itunes', 'iTunes'], ['googleMusic', 'Google Play Music'], ['amazon', 'Amazon'], ['routenote', 'Routenote Direct'], ['bandcamp', 'Bandcamp']];

var search = {
	cache: {},
	get elem() {
		delete this.elem;
		return this.elem = $('#SearchInput')[0];
	},
	findTracks(q) {
		if (!q) return trackList;
		if (q == search.cache.q) {
			console.log('Used search cache.');
			return search.cache.results;
		} else {
			search.cache.q = q;
			return search.cache.results = new Map(new Fuse(Array.from(trackList), {
				shouldSort: true,
				tokenize: true,
				keys: ['1.name']
			}).search(q));
		}
	},
	get value() {
		return this.elem.value;
	},
	set value(value) {
		this.elem.value = value;
		search.update();
	},
	updateValue() {
		let elem, value;
		(elem = search.elem).setAttribute('value', value = elem.value);
		return value;
	},
	update() {
		requestAnimationFrame(() => (document.body.id == 'list') ? search.submit() : search.updateValue());
	},
	submit() {
		if (document.body.id != 'list') {
			setTimeout(search.submit, 100);
			location.hash = '';
		} else {
			clearTimeout(search.timeout);
			search.timeout = setTimeout(() => {
				drawTracks(search.findTracks(search.updateValue()));
			}, 200);
		}
	},
	clear() {
		search.value = '';
	}
}

function drawTracks(tracks = trackList, allTracks = window.trackList) {
	var showAfter = 0,
	trackParent = $('#TrackList')[0];
	allTracks.forEach((v, k) => {
		var track = v,
		shouldBeShown = tracks.has(k);
		if (track.elem === undefined) createTrackElem(track, k);
		updateTrackVisibility(track, shouldBeShown);
	});
	return true;
	function createTrackElem(track, k) {
		if (track.elem) return;
		var elem = Element.create('div', trackParent, 'track page-block shadow dynamic' + (classListIsSupported ? ' hide invisible' : ''))
		  , imageWrap = Element.create('a', elem, { class: 'track-image-wrap shadow lighten dynamic', href: '#' + k })
		  , image = Element.create('img', imageWrap, { class: 'track-image', src: processLink(track.img, true) })
		  , nameContainer = Element.create('div', elem, 'container')
		  , title = Element.create('div', nameContainer, { class: 'track-title', text: track.title, title: track.name });
		track.elem = elem;
		track.shown = false;
		addEvent(title, 'dblclick', () => selectText(title));
		Element.create('div', nameContainer, { class: 'track-author', text: track.author, title: track.name });
		Element.create('div', elem, { class: 'divider-1' });
		if (track.date && Object.prototype.toString.call(track.date) === '[object Date]') {
			var date = track.date
			  , dateContainer = Element.create('div', elem, 'container');
			Element.create('div', dateContainer, { class: 'dateText dateAbsolute', text: date.toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' }), title: (date.toLocaleDateString([], { day: 'numeric', month: 'long', year: 'numeric' }) + ' | ' + date.toLocaleTimeString([])) });
			timeago().render(Element.create('div', dateContainer, { class: 'dateText dateRelative', datetime: date }));
		}
	}
	function updateTrackVisibility(track, shouldBeShown) {
		var cl = track.elem.classList;
		if (track.shown != shouldBeShown && classListIsSupported) {
			if (shouldBeShown) {
				cl.remove('hide');
				track.shown = true;
				(showAfter < 5) ? cl.remove('invisible') : setTimeout(() => {
					if (track.shown) cl.remove('invisible');
				}, showAfter);
				showAfter += 60;
			} else {
				cl.add('invisible');
				cl.add('hide');
				track.shown = false;
			}
		}
	}
}
function drawTrack(track) {
	if (!track) return false;
	var img = $('#TrackImage')[0];
	img.src = (track.img) ? processLink(track.img, true) : '';
	var title = emptyElem($('#TrackTitle')[0]);
	Element.edit(title, { text: track.name || 'No name', title: track.title + ' by ' + track.author });
	addEvent(title, 'dblclick', () => selectText(title));
	var links = emptyElem($('#TrackLinks')[0]);
	var dlLinks = emptyElem($('#TrackDlLinks')[0]);
	Object.entries(track.download).forEach(([k, v]) => Element.create('a', dlLinks, { class: 'btn btn-text dynamic wave', href: processLink(v), target: '_blank', text: `.${k}`, title: `Download ${track.name} in .${k}` }));
	linksToDisplay.forEach(k => {
		if (!track.links.hasOwnProperty(k[0])) return;
		var url = processLink(track.links[k[0]]);
		if (!url) return;
		var a = Element.create('a', links, { class: 'link', href: url, target: '_blank', title: `"${track.name}" on ${k[1]}` });
		setVectorSource(Element.create('svg', a, 'link-button'), k[0]);
	});
	var date1 = emptyElem($('#dateAbsolute')[0])
    , date2 = emptyElem($('#dateRelative')[0])
	  , date  = track.date;
  timeago.cancel(date2);
	if (date && date instanceof Date) {
		Element.edit(date1, { text: date.toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' }), title: date.toLocaleDateString([], { day: 'numeric', month: 'long', year: 'numeric' }) + ' | ' + date.toLocaleTimeString([]) });
		Element.edit(date2, { datetime: date });
		timeago().render(date2);
	}
	var table = emptyElem($('#TrackDetailsTable')[0]);
	if (track.details) detailProperties.forEach(k => {
		if (!track.details.hasOwnProperty(k)) return;
		var name = k.capFirstLetter()
		  , v = track.details[k];
		v = (k == 'type') ? (['Original', 'Remix'][v]) : ((k == 'duration') ? digitClock(v * 1e3) : v);
		Element.create('div', table, { class: 'track-details-table-name', text: name });
		Element.create('div', table, { class: 'track-details-table-value', text: v });
	});
	$('#TrackPrice')[0].innerHTML = track.details ? track.details.price : false || 'Free';
  var embeds = $('#embeds')[0];
	if (track.links && (window.curEmbedTrack != track || embeds.innerHTML == '')) {
    emptyElem(embeds);
		window.curEmbedTrack = track;
		var ytId = track.links.youtube.id;
		if (track.links.youtube && ytId) {
			var ytEmbedWrap = Element.create('div', embeds, 'yt-embed-wrap embed-wrap')
			  , ytEmbedWrap2 = Element.create('div', ytEmbedWrap, 'yt-embed-wrap2')
			  , ytEmbed = Element.create('iframe', ytEmbedWrap2, { class: 'yt-embed embed shadow dynamic', src: 'https://www.youtube.com/embed/' + ytId + '?autoplay=0&origin=' + (location.href || (location + '') || location.pathname), frameborder: 0, allowfullscreen: true });
			if (track.links.youtube.aspectRatio) {
        ytEmbedWrap2.style['padding-bottom'] = 100 / track.links.youtube.aspectRatio + '%'
      }
		}
		if (embeds.innerHTML != '') {
			var closeButton = Element.create('div', embeds, 'close-wrap small', 'embeds-close')
        , closeButtonIcon = Element.create('div', closeButton, 'close', 'embeds-close-icon');
			addEvent(closeButton, 'click', () => emptyElem(embeds));
		}
	}
	return true;
}
function downloadTrack(track) {
	if (!track || !track.download) return false;
	var popup = newPopup();
	if (track.img) Element.create('img', popup, { class: 'track-image shadow', src: processLink(track.img, true) });
	var dlTextWrap = Element.create('div', popup, { class: 'center popup-dl-text-wrap', title: track.name });
	Element.create('span', dlTextWrap, { text: 'Download' });
	if (track.title) Element.create('span', dlTextWrap, { class: 'track-title', text: '\"' + track.title + '\"' });
	var linksWrap = Element.create('div', popup, 'popup-dl-links-wrap');
  Object.entries(track.download).forEach(([k, v]) => {
    var linkWrap = Element.create('div', linksWrap, 'link-wrap');
    var a = Element.create('a', linkWrap, { class: 'btn shadow dynamic wave', href: processLink(v), target: '_blank', text: '.' + k, title: (`Download ${track.name} in .${k}`) })
  });
}
function drawPage(hash) {
	if (typeof hash === 'string' || hash instanceof String) {
		hash = hash || location.hash
	} else {
		hash = location.hash
	}
	hash = hash.replace('#','');
	// console.log('Drawing the page using hash: ' + hash);
	console.log(document.body.id == 'list');
	if (document.body.id == 'list') {
		window.listScroll = scrollY;
	}
	if (hash === '') {
		removeHash();
		if (document.body.id == 'list') return false;
		document.body.id = 'list';
		document.title = `Holar's Website`;
		drawTracks(trackList);
		let prevScroll = window.listScroll || window.listScrollDefault;
		if (prevScroll) scrollTo(scrollX, prevScroll);
	} else if (trackList.has(hash)) {
		var track = trackList.get(hash);
		document.body.id = 'info';
		document.title = track.name;
		drawTrack(track);
		var srch = $('#SearchForm')[0];
		if (srch && srch.scrollIntoView) srch.scrollIntoView(true);
	} else {
		removeHash();
	}
}

addEvent(document, 'DOMContentLoaded', () => {
	addEvent(window, 'hashchange', () => drawPage());
	addEvent($('#SearchForm')[0], 'submit', search.submit, { passive: true });
	addEvent($('#SearchInput')[0], [ 'change', 'keydown' ], search.update, { passive: true });
	addEvent($('.track-info-back')[0], 'click', () => removeHash());
	drawPage();
	var q = getQueries().q;
	if (q) search.value = q;
}, { once: true })
