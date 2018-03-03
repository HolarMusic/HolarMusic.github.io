const detailProperties = ['genre', 'duration', 'tempo', 'type'];
const linksToDisplay = [['soundcloud', 'Soundcloud'], ['youtube', 'Youtube'], ['spotify', 'Spotify'], ['itunes', 'iTunes'], ['googleMusic', 'Google Play Music'], ['amazon', 'Amazon'], ['routenote', 'Routenote Direct'], ['bandcamp', 'Bandcamp']];

const Tracks = {
	Search: {
		source: trackList,
		cache: {},
		get elem() {
			delete this.elem;
			return this.elem = $('#SearchInput')[0];
		},
		find(q) {
			if (!q) return this.source;
			if (q == this.cache.q) {
				console.info('Used search cache.');
				return this.cache.results;
			} else {
				this.cache.q = q;
				return this.cache.results = new Map(
					new Fuse( Array.from(this.source), {
						shouldSort: true,
						threshold: 0.6,
						location: 0,
						distance: 100,
						maxPatternLength: 32,
						minMatchCharLength: 1,
						keys: [ '1.name' ]
					  }).search(q)
				);
			}
		},
		get value() {
			return this.elem.value;
		},
		set value(value) {
			this.elem.value = value;
			this.update();
		},
		updateValue() {
			let elem, value;
			(elem = this.elem).setAttribute('value', value = elem.value);
			return value;
		},
		update() {
			requestAnimationFrame(
				() => ((document.body.id == 'list') ? this.submit : this.updateValue).bind(this)()
			);
		},
		submit() {
			if (document.body.id != 'list') {
				requestAnimationFrame(this.submit.bind(this));
				location.hash = '';
			} else {
				clearTimeout(this.timeout);
				this.timeout = setTimeout((() => {
					Tracks.draw(this.find(this.updateValue()));
				}), 200);
			}
		},
		clear() {
			this.value = '';
		}
	},
	get listElement() {
		delete this.listElement;
		return this.listElement = $('#TrackList')[0];
	},
	sort(trackList = trackList, sortBy) {
		return new Map(
			Array.from(trackList).sort(
				(a, b) => (a[1][sortBy] < b[1][sortBy]) ? -1 : 1
			)
		);
	},
	draw(tracks = trackList, allTracks = window.trackList) {
		let trackParent = this.listElement;
		trackParent.classList[tracks.size ? 'remove' : 'add']('empty');

		let toBeDelayed = new Set();
		allTracks.forEach((track, id) => {
			if (track.elem === undefined) createTrackElem(track);
			updateTrackVisibility(track, tracks.has(id));
		});

		let order = 0, delay = 0;
		tracks.forEach(track => {
			track.elem.style.setProperty('--order', order++);
			if (toBeDelayed.has(track)) {
				track.elem.style.setProperty('--delay', delay++);
			}
		});

		return true;

		function createTrackElem(track) {
			if (track.elem) return;
			let elem = track.elem = Element.create('div', trackParent, 'track page-block shadow dynamic hide invisible');
			track.shown = false;
			let imageWrap     = Element.create('a', elem, { class: 'track-image-wrap shadow lighten dynamic', href: '#' + track.id });
			let image         = Element.create('img', imageWrap, { class: 'track-image', src: processLink(track.img, true) });
			let nameContainer = Element.create('div', elem, 'container');
			let title         = Element.create('div', nameContainer, { class: 'track-title', text: track.title, title: track.name });
			addEvent(title, 'dblclick', () => selectText(title));
			Element.create('div', nameContainer, { class: 'track-author', text: track.author, title: track.name });
			Element.create('div', elem, { class: 'divider-1' });
			let date;
			if ((date = track.date) instanceof Date) {
				let dateContainer = Element.create('div', elem, 'container');
				let dateConfig = {
					short: { day: 'numeric', month: 'short', year: 'numeric' },
					long:  { day: 'numeric', month: 'long',  year: 'numeric' }
				}
				Element.create('div', dateContainer, {
					class: 'dateText dateAbsolute',
					text: date.toLocaleDateString([], dateConfig.short),
					title: `${ date.toLocaleDateString([], dateConfig.long)} | ${ date.toLocaleTimeString() }`
				});
				timeago().render(Element.create('div', dateContainer, { class: 'dateText dateRelative', datetime: date }));
			}
		}
		function updateTrackVisibility(track, shouldBeShown) {
			var cl = track.elem.classList;
			if (track.shown != shouldBeShown) {
				if (shouldBeShown) {
					cl.remove('hide');
					track.shown = true;
					toBeDelayed.add(track);
					requestAnimationFrame(() => requestAnimationFrame(() => {
						if (track.shown) cl.remove('invisible');
					}));
				} else {
					cl.add('invisible');
					cl.add('hide');
					track.shown = false;
				}
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
		Images.setVectorSource(Element.create('svg', a, 'link-button'), k[0]);
	});
	var date1 = emptyElem($('#dateAbsolute')[0]);
    var date2 = emptyElem($('#dateRelative')[0]);
	var date  = track.date;
	timeago.cancel(date2);
	if (date instanceof Date) {
		Element.edit(date1, { text: date.toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' }), title: date.toLocaleDateString([], { day: 'numeric', month: 'long', year: 'numeric' }) + ' | ' + date.toLocaleTimeString([]) });
		Element.edit(date2, { datetime: date });
		timeago().render(date2);
	}
	let table = emptyElem($('#TrackDetailsTable')[0]);
	let n = 0;
	if (track.details) detailProperties.forEach(k => {
		if (!track.details.hasOwnProperty(k)) return;
		n++;
		var name = k.capFirstLetter();
		var v = track.details[k];
		v = (k == 'type') ? (['Original', 'Remix'][v]) : ((k == 'duration') ? digitClock(v * 1e3) : v);
		Element.create('div', table, { class: 'track-details-table-name', text: name });
		Element.create('div', table, { class: 'track-details-table-value', text: v });
	});
	let cl = $('#TrackInfo')[0].classList;
	((n > 0) ? cl.remove : cl.add).bind(cl)('no-table');
	$('#TrackPrice')[0].innerHTML = (track.details ? track.details.price : false) || 'Free';
	var embeds = $('#embeds')[0];
	if (track.links && (window.curEmbedTrack != track || embeds.innerHTML == '')) {
    emptyElem(embeds);
		window.curEmbedTrack = track;
		var ytId = track.links.youtube.id;
		if (track.links.youtube && ytId) {
			var ytEmbedWrap = Element.create('div', embeds, 'yt-embed-wrap embed-wrap');
			var ytEmbedWrap2 = Element.create('div', ytEmbedWrap, 'yt-embed-wrap2');
			var ytEmbed = Element.create('iframe', ytEmbedWrap2, { class: 'yt-embed embed shadow dynamic', src: 'https://www.youtube.com/embed/' + ytId + '?autoplay=0&origin=' + (location.href || (location + '') || location.pathname), frameborder: 0, allowfullscreen: true });
			if (track.links.youtube.aspectRatio) {
				ytEmbedWrap2.style['padding-bottom'] = 100 / track.links.youtube.aspectRatio + '%'
			}
		}
		if (embeds.innerHTML != '') {
			var closeButton = Element.create('div', embeds, 'close-wrap small', 'embeds-close');
			var closeButtonIcon = Element.create('div', closeButton, 'close', 'embeds-close-icon');
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
function drawPage(hash, search) {
	if (typeof hash === 'string' || hash instanceof String) {
		hash = hash || location.hash;
	} else {
		hash = location.hash;
	}
	hash = hash.replace('#','');
	// console.log('Drawing the page using hash: ' + hash);
	if (document.body.id == 'list') {
		window.listScroll = scrollY;
	}
	if (hash === '') {
		removeHash();
		if (document.body.id == 'list') return false;
		document.body.id = 'list';
		document.title = `Holar's Website`;
		if (search) {
			Tracks.Search.value = search;
			var srch = Tracks.Search.elem;
			if (srch && srch.scrollIntoView) srch.scrollIntoView(true);
			window.scrollBy(0, -100);
		} else {
			Tracks.draw(trackList);
		}
		let prevScroll = window.listScroll || window.listScrollDefault;
		if (prevScroll) scrollTo(scrollX, prevScroll);
	} else if (trackList.has(hash)) {
		var track = trackList.get(hash);
		document.body.id = 'info';
		document.title = track.name;
		if (search) {
			Tracks.Search.value = search;
		}
		drawTrack(track);
		var srch = Tracks.Search.elem;
		if (srch && srch.scrollIntoView) srch.scrollIntoView(true);
		window.scrollBy(0, -70);
	} else {
		removeHash();
	}
}
addEvent(userPrefs.ListViewStyle, true, value => {
	let cl = $('#TrackList')[0].classList;
	((value === 'list') ? cl.add : cl.remove).bind(cl)('list');
});
addEvent(window, 'hashchange', () => drawPage());
addEvent(document, 'DOMContentLoaded', () => {
	addEvent($('#SearchForm')[0], 'submit', Tracks.Search.submit.bind(Tracks.Search), { passive: true });
	addEvent($('.search-go > .circle-button')[0], 'click', Tracks.Search.submit.bind(Tracks.Search), { passive: true });
	addEvent($('.search-clear > .circle-button')[0], 'click', Tracks.Search.clear.bind(Tracks.Search), { passive: true });
	addEvent($('#SearchInput')[0], [ 'change', 'keydown' ], Tracks.Search.update.bind(Tracks.Search), { passive: true });
	addEvent($('.track-info-back')[0], 'click', removeHash);
	addEvent($('#TrackListViewToggle')[0], 'click', () => userPrefs.ListViewStyle.toggle());
	let qs = getQueries();
	drawPage(qs.track, qs.q);
}, { once: true })
