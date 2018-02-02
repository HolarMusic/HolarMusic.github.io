var trackList = (() => {
	let me = "Holar", trackList;
	trackList = new Map([
		['sunriseRun', {
			title: "Sunrise Run",
			author: me,
			img: "/img/cover_art/sunriseRun.jpg",
			links: {
				soundcloud: {
					href: "https://soundcloud.com/holarmusic/sunrise-run",
					id: "336075012"
				},
				youtube: {
					id: "VQ6aYSLpzrk",
					aspectRatio: 21 / 9
				},
				bandcamp: "https://holar.bandcamp.com/track/sunrise-run",
				routenote: "https://routenote.com/r/Holar/5051813086700",
				spotify: "https://open.spotify.com/album/3ezpSZpLMy6OIZzrwWYc0S",
				itunes: "https://itunes.apple.com/us/album/sunrise-run/id1271787113",
				googleMusic: "https://play.google.com/store/music/album?id=Bklastv6l3lfjgufc6htw27evh4&tid=song-Tdrph3sarqidzjm4vmoiraxis54",
				amazon: "http://a.co/bKUw2EC"
			},
			download: {
				flac: "https://toneden.io/holar/post/sunrise-run-flac",
				mp3: "https://toneden.io/holar/post/sunrise-run-mp3"
			},
			details: {
				type: 0,
				tempo: 100,
				genre: "House",
				duration: 214
			},
			date: new Date(2017, 7, 3)
		}],
		['luminescence', {
			title: "Luminescence",
			author: me,
			img: "/img/cover_art/luminescence.jpg",
			links: {
				soundcloud: {
					href: "https://soundcloud.com/holarmusic/luminescence",
					id: "299164687"
				},
				youtube: {
					id: "UUx1BnTf7WE",
					aspectRatio: 21 / 9
				},
				bandcamp: "https://holar.bandcamp.com/track/luminescence",
				routenote: "https://routenote.com/r/Holar/5057302302047",
				spotify: "https://open.spotify.com/album/3Wn6PZ8sn9hIqZdTdUUqsy",
				itunes: "https://itunes.apple.com/us/album/luminescence-single/id1191528389",
				googleMusic: "https://play.google.com/store/music/album?id=B2fygf2oi5on57rtqjtsduvo6qe&tid=song-Tkvpzh7ysxwehbto23yswudb6fy",
				amazon: "http://a.co/c5LclNb"
			},
			download: {
				flac: "https://toneden.io/holar/post/luminescence-flac",
				mp3: "https://toneden.io/holar/post/luminescence-mp3"
			},
			details: {
				type: 0,
				tempo: 128,
				genre: "Ambient",
				duration: 196
			},
			date: new Date(2016, 11, 22)
		}],
		['nightOwls', {
			title: remix(`Night Owls`, me),
			author: "3MBER & SRK",
			img: "/img/cover_art/nightOwls.jpg",
			links: {
				soundcloud: {
					href: "https://soundcloud.com/holarmusic/3mber-srk-night-owls-remix",
					id: "296019861"
				},
				youtube: {
					id: "65F6nA7xdTs",
					aspectRatio: 21 / 9
				},
				bandcamp: "https://holar.bandcamp.com/track/night-owls-hamtys-remix",
				routenote: "https://routenote.com/r/Holar/5051813106149",
				spotify: "https://open.spotify.com/track/3t4XU0s9v9sqGA6pHKIv9H",
				googleMusic: "https://play.google.com/store/music/album?id=Bd35qvrjpsrduukklwfriuquldq&tid=song-Tkcnai6nkmu4xutn4cxt6j4mhby",
				amazon: "http://a.co/8ohJ8Cq"
			},
			download: {
				flac: "http://viid.me/qw3mvz",
				mp3: "http://viid.me/qw3nlY"
			},
			details: {
				type: 1,
				tempo: 110,
				genre: "Glitch Hop",
				duration: 264
			},
			date: new Date(2016, 11, 3)
		}],
		['promenade', {
			title: "Promenade",
			author: me,
			img: "/img/cover_art/promenade.jpg",
			links: {
				soundcloud: {
					href: "https://soundcloud.com/holarmusic/promenade",
					id: "289789969"
				},
				youtube: {
					id: "2jD7uWM1edY"
				},
				bandcamp: "https://holar.bandcamp.com/track/promenade",
				routenote: "https://routenote.com/r/Holar/5057302536046",
				spotify: "https://open.spotify.com/track/6DpVOF4V701LaM6Og6haot",
				itunes: "https://itunes.apple.com/us/album/promenade-single/id1172262246",
				googleMusic: "https://play.google.com/store/music/album?id=Brrutihiqx35gypghstkcfl4fwe&tid=song-Tbqcxk7a6erkjgkpdr7oyno7bia",
				amazon: "http://a.co/4ntVB2y"
			},
			download: {
				flac: "http://sh.st/4dPZJ",
				mp3: "http://sh.st/4dPYT"
			},
			details: {
				type: 0,
				tempo: 128,
				genre: "House",
				duration: 187
			},
			date: new Date(2016, 9, 25)
		}],
		['lockynAqua', {
			title: remix('Aqua', me),
			author: "Lockyn",
			img: "/img/cover_art/lockynAqua.jpg",
			links: {
				soundcloud: {
					href: "https://soundcloud.com/holarmusic/lockyn-aqua-remix",
					id: "272023163"
				},
				youtube: {
					id: "mEvwdNUg9jo"
				},
				bandcamp: "https://holar.bandcamp.com/track/aqua-hamtys-remix",
				routenote: "https://routenote.com/r/Holar/5054316976394",
				spotify: "https://open.spotify.com/track/3UkUivmEDHAbpSv6nWNQrc",
				googleMusic: "https://play.google.com/store/music/album?id=B7k7gumhd3fyaqkomjogidenrti&tid=song-T6upg53xcvzw3a2ds2rapomsopu",
				amazon: "http://a.co/aUgS57j"
			},
			download: {
				flac: "http://sh.st/HzIKA",
				mp3: "http://sh.st/HzP5W"
			},
			details: {
				type: 1,
				tempo: 140,
				genre: "Dubstep",
				duration: 274
			},
			date: new Date(2016, 6, 3)
		}],
		['sunshine', {
			title: "Sunshine",
			author: me,
			img: "/img/cover_art/sunshine.jpg",
			links: {
				soundcloud: {
					href: "https://soundcloud.com/holarmusic/sunshine",
					id: "234120701"
				},
				youtube: {
					id: "Z7T-bCQcJVQ"
				},
				bandcamp: "https://holar.bandcamp.com/track/sunshine",
				routenote: "https://routenote.com/r/Holar/5054316679721",
				spotify: "https://open.spotify.com/track/0YDuj354BlSS6cGJ3GlMEe",
				itunes: "https://itunes.apple.com/us/album/sunshine-single/id1064571834",
				googleMusic: "https://play.google.com/store/music/album?id=Bkp4ngu4uukha2fbysb6xfkz5x4&tid=song-Tbvcx7ifjkkks6jzckspuxl56ge",
				amazon: "http://a.co/fgBKt9N"
			},
			download: {
				mp3: "http://sh.st/nqRuX"
			},
			details: {
				type: 0,
				tempo: 128,
				genre: "House",
				duration: 195
			},
			date: new Date(2015, 10, 21)
		}],
		['seaLights', {
			title: "Sea Lights",
			author: me,
			img: "/img/cover_art/seaLights.jpg",
			links: {
				soundcloud: {
					href: "https://soundcloud.com/holarmusic/sea-lights",
					id: "211472761"
				},
				youtube: {
					id: "UiGhXFMFY94"
				},
				bandcamp: "https://holar.bandcamp.com/track/sea-lights",
				routenote: "https://routenote.com/r/Holar/5054316912866",
				spotify: "https://open.spotify.com/album/69am0Zo4fw2BC8MeTLBVXb",
				itunes: "https://itunes.apple.com/us/album/sea-lights-single/id1048686789",
				googleMusic: "https://play.google.com/store/music/album?id=B2czaashqxrlvfoky65u2u7hs3q&tid=song-T57leozr2ojphotladdtkgajiom",
				amazon: "http://a.co/hO0KOKg"
			},
			download: {
				mp3: ["http://", "adf", ".ly/", "1JcSyZ"]
			},
			details: {
				type: 0,
				tempo: 128,
				genre: "House",
				duration: 191
			},
			date: new Date(2015, 5, 22, 19)
		}],
		['home', {
			title: "Home",
			author: me,
			img: "/img/cover_art/home.jpg",
			links: {
				soundcloud: {
					href: "https://soundcloud.com/holarmusic/hamty-home",
					id: "197628146"
				},
				youtube: {
					id: "Idmo2W8zcAg"
				},
				bandcamp: "https://holar.bandcamp.com/track/home",
				routenote: "https://routenote.com/r/Holar/5054316598497",
				spotify: "https://open.spotify.com/track/2t9yVSf5fCqRDnAiPRNN8h",
				itunes: "https://itunes.apple.com/us/album/home-single/id1136243036",
				googleMusic: "https://play.google.com/store/music/album?id=Bwjornj4la7gq7e5ab422nvgxsa&tid=song-T6ruoo3vftide5is34it3bdrhga",
				amazon: "http://a.co/8Ctcf0E"
			},
			download: {
				mp3: ["http://", "adf", ".ly/", "1Bkfyo"]
			},
			date: new Date(2015, 2, 25)
		}],
		['inspiration', {
			title: "Inspiration",
			author: me,
			img: "/img/cover_art/inspiration.jpg",
			links: {
				soundcloud: {
					href: "https://soundcloud.com/holarmusic/hamty-inspiration",
					id: "188781969"
				},
				youtube: {
					id: "Uo8Ozq5fZro"
				},
				bandcamp: "http://holar.bandcamp.com/track/inspiration",
				routenote: "https://routenote.com/r/Holar/5057302785420",
				spotify: "https://open.spotify.com/album/6ul7QhCKZS6G05U5foNdAJ",
				itunes: "https://itunes.apple.com/us/album/inspiration-single/id1178568009",
				googleMusic: "https://play.google.com/store/music/album?id=Bm7myjvos72uhkzidduoj5v7qbq&tid=song-T2ddobgslrjx4vzn2f2xvevvmvm",
				amazon: "http://a.co/dWyQZYH"
			},
			download: {
				mp3: ["http://", "adf", ".ly/", "wTZVo"]
			},
			date: new Date(2015, 0, 20)
		}],
		['riverJourney', {
			title: "River Journey",
			author: me,
			img: "/img/cover_art/riverJourney.jpg",
			links: {
				soundcloud: {
					href: "https://soundcloud.com/holarmusic/hamty-home",
					id: "168005259"
				},
				youtube: {
					id: "edFv3BTwk5g"
				},
				bandcamp: "https://holar.bandcamp.com/track/river-journey"
			},
			download: {
				mp3: ["http://", "adf", ".ly/", "sDPor"]
			},
			date: new Date(2014, 8, 16)
		}],
		['return', {
			title: "The Return",
			author: me,
			img: "/img/cover_art/return.jpg",
			links: {
				soundcloud: {
					href: "https://soundcloud.com/holarmusic/the-return",
					id: "159126579"
				},
				youtube: {
					id: "g5KG7cE5y44"
				},
				bandcamp: "https://holar.bandcamp.com/track/the-return"
			},
			download: {
				mp3: ["http://", "adf", ".ly/", "sDQXi"]
			},
			date: new Date(2014, 6, 17)
		}],
		['timeRift', {
			title: "Time Rift",
			author: me,
			img: "/img/cover_art/timeRift.jpg",
			links: {
				soundcloud: {
					href: "https://soundcloud.com/holarmusic/time-rift",
					id: "154753490"
				},
				youtube: {
					id: "eMzHfDn8oxQ"
				},
				bandcamp: "https://holar.bandcamp.com/track/time-rift"
			},
			download: {
				mp3: ["http://", "adf", ".ly/", "sDQnR"]
			},
			date: new Date(2014, 5, 17)
		}],
		['adventure', {
			title: "The Adventure",
			author: me,
			img: "/img/cover_art/adventure.jpg",
			links: {
				soundcloud: {
					href: "https://soundcloud.com/holarmusic/the-adventure",
					id: "152132897"
				},
				youtube: {
					id: "YJvl1S2oPZk"
				},
				bandcamp: "https://holar.bandcamp.com/track/the-adventure"
			},
			download: {
				mp3: ["http://", "adf", ".ly/", "wTZVo"]
			},
			date: new Date(2014, 4, 31)
		}],
		['waterfall', {
			title: "Waterfall",
			author: me,
			img: "/img/cover_art/waterfall.jpg",
			links: {
				soundcloud: {
					href: "https://soundcloud.com/holarmusic/waterfall",
					id: "150125450"
				},
				youtube: {
					id: "WsDoJDo_r7o"
				},
				bandcamp: "https://holar.bandcamp.com/track/waterfall"
			},
			download: {
				mp3: ["http://", "adf", ".ly/", "sDR6S"]
			},
			date: new Date(2014, 4, 18)
		}],
		['dream', {
			title: "The Dream",
			author: me,
			img: "/img/cover_art/dream.jpg",
			links: {
				soundcloud: {
					href: "https://soundcloud.com/holarmusic/the-dream",
					id: "148844848"
				},
				youtube: {
					id: "Ok-iXgMPFh8"
				},
				bandcamp: "https://holar.bandcamp.com/track/the-dream"
			},
			download: {
				mp3: ["http://", "adf", ".ly/", "sDRMG"]
			},
			date: new Date(2014, 4, 10)
		}],
		['night', {
			title: "Night",
			author: me,
			img: "/img/cover_art/night.jpg",
			links: {
				soundcloud: {
					href: "https://soundcloud.com/holarmusic/night",
					id: "147683128"
				},
				youtube: {
					id: "AbjsM2ZjVYk"
				},
				bandcamp: "https://holar.bandcamp.com/track/night"
			},
			download: {
				mp3: "http://vk.com/doc73722124_294652636"
			},
			date: new Date(2014, 4, 3)
		}],
		['morningAtMountains', {
			title: "Morning at Mountains",
			author: me,
			img: "/img/cover_art/morningAtMountains.jpg",
			links: {
				soundcloud: {
					href: "https://soundcloud.com/holarmusic/morning-at-mountains",
					id: "144771494"
				},
				youtube: {
					id: "H2xDQTu6TiE"
				},
				bandcamp: "https://holar.bandcamp.com/track/morning-at-mountains"
			},
			download: {
				mp3: "http://vk.com/doc73722124_289449116"
			},
			date: new Date(2014, 3, 15)
		}],
		['skyIsYours', {
			title: "The Sky Is Yours",
			author: me,
			img: "/img/cover_art/skyIsYours.jpg",
			links: {
				soundcloud: {
					href: "https://soundcloud.com/holarmusic/the-sky-is-yours",
					id: "142873172"
				},
				youtube: {
					id: "pPoXW-mXfdQ"
				},
				bandcamp: "https://holar.bandcamp.com/track/the-sky-is-yours"
			},
			download: {
				mp3: "http://vk.com/doc73722124_285878202"
			},
			date: new Date(2014, 3, 3)
		}],
		['dayBeforeTommorow', {
			title: "A Day Before Tommorow",
			author: me,
			img: "/img/cover_art/dayBeforeTommorow.jpg",
			links: {
				soundcloud: {
					href: "https://soundcloud.com/holarmusic/a-day-before-tommorow",
					id: "142003805"
				},
				youtube: {
					id: "BIvzkdIkS20"
				},
				bandcamp: "https://holar.bandcamp.com/track/a-day-before-tommorow"
			},
			download: {
				mp3: "http://vk.com/doc73722124_284248677"
			},
			date: new Date(2014, 2, 29)
		}],
		['lonelyIsland', {
			title: "Lonely Island",
			author: me,
			img: "/img/cover_art/lonelyIsland.jpg",
			links: {
				soundcloud: {
					href: "https://soundcloud.com/holarmusic/lonely-island",
					id: "133859908"
				},
				youtube: {
					id: "I5YiQ2pNDKg"
				},
				bandcamp: "https://holar.bandcamp.com/track/lonely-island"
			},
			download: {
				mp3: "http://vk.com/doc73722124_269169331"
			},
			date: new Date(2014, 1, 8)
		}],
		['cupcake', {
			title: "Cupcake",
			author: me,
			img: "/img/cover_art/cupcake.jpg",
			links: {
				soundcloud: {
					href: "https://soundcloud.com/holarmusic/cupcake",
					id: "130147289"
				},
				youtube: {
					id: "rW5h_FAzc7c"
				},
				bandcamp: "https://holar.bandcamp.com/track/cupcake"
			},
			download: {
				mp3: "http://vk.com/doc73722124_262489411"
			},
			date: new Date(2014, 0, 18)
		}],
		['upInTheSky', {
			title: "Up in the Sky",
			author: me,
			img: "/img/cover_art/upInTheSky.jpg",
			links: {
				soundcloud: {
					href: "https://soundcloud.com/holarmusic/up-in-the-sky",
					id: "127409517"
				},
				youtube: {
					id: "5sWDRztm1mc"
				},
				bandcamp: "https://holar.bandcamp.com/track/up-in-the-sky"
			},
			download: {
				mp3: "http://vk.com/doc73722124_256971167"
			},
			date: new Date(2014, 0, 1)
		}],
		['snowglobe', {
			title: "Snowglobe",
			author: me,
			img: "/img/cover_art/snowglobe.jpg",
			links: {
				soundcloud: {
					href: "https://soundcloud.com/holarmusic/snowglobe",
					id: "125914573"
				},
				youtube: {
					id: "GIYzDxHWrN0"
				},
				bandcamp: "https://holar.bandcamp.com/track/snowglobe"
			},
			download: {
				mp3: "http://vk.com/doc73722124_267812810"
			},
			date: new Date(2013, 11, 21)
		}],
		['winterTime', {
			title: "Winter Time",
			author: me,
			img: "/img/cover_art/winterTime.jpg",
			links: {
				soundcloud: {
				href: "https://soundcloud.com/holarmusic/winter-time",
					id: "125861775"
				},
				youtube: {
					id: "a6h9m_VJ2Ao"
				},
				bandcamp: "https://holar.bandcamp.com/track/winter-time"
			},
			download: {
				mp3: "http://vk.com/doc73722124_267810165"
			},
			date: new Date(2013, 11, 21)
		
		}],
		['sleepingCity', {
			title: "Sleeping City",
			author: me,
			img: "/img/cover_art/sleepingCity.jpg",
			links: {
				soundcloud: {
					href: "https://soundcloud.com/holarmusic/sleeping-city",
					id: "125435154"
				},
				youtube: {
					id: "yZFzIMOpOCs"
				},
				bandcamp: "https://holar.bandcamp.com/track/sleeping-city"
			},
			download: {
				mp3: "http://vk.com/doc73722124_267805133"
			},
			date: new Date(2013, 11, 13)
		}],
		['cubeGame', {
			title: "The Cube Game",
			author: me,
			img: "/img/cover_art/cubeGame.jpg",
			links: {
				soundcloud: {
					href: "https://soundcloud.com/holarmusic/the-cube-game",
					id: "125435167"
				},
				youtube: {
					id: "TnKZk7iBMhk"
				},
				bandcamp: "https://holar.bandcamp.com/track/the-cube-game"
			},
			download: {
				mp3: "http://vk.com/doc73722124_267800668"
			},
			date: new Date(2013, 11, 8)
		}]
	]);

	trackList.forEach(v => {
		v.name = (() => {
			let a = [];
			if (v.author) a.push(v.author);
			if (v.title) a.push(v.title);
			return a.join(` - `);
		})();

		if (v.links.youtube && v.links.youtube.id) {
			v.links.youtube.href = "https://youtu.be/" + v.links.youtube.id;
		}
	});

	return trackList;

	function remix(title, artist) {
		return `${title} (${artist} Remix)`;
	}
})();



if (typeof module !== 'undefined' && module.exports) {
	module.exports = trackList;
}
