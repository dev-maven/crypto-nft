(function () {
	('use strict');

	/**
	 * Animation on scroll
	 */

	var backgroundClass;
	var selectedCryptoName;
	var selectedCryptoIcon;
	$('.slide-card').click(function () {
		$('.slide-card').not(this).removeClass('active');
		$(this).toggleClass('active');
	});

	$('.nft-product').click(function () {
		$('.nft-product').not(this).removeClass('product-click');
		backgroundClass = $(this).children('.nft-wrapper')[0].classList[1];
		$(this).toggleClass('product-click');

		setTimeout(() => {
			$(this).toggleClass('product-click');
		}, 1000);
	});

	$('.box').click(function (event) {
		$('.box').not(this).removeClass('box-active');
		$(this).toggleClass('box-active');
		selectedCryptoIcon = $(this).children('.fa')[0].classList[1];
		selectedCryptoName = $(this).children('.box-text')[0].innerHTML;

		setTimeout(() => {
			if ($('#crypto-detail').hasClass('dismiss')) {
				$('#crypto-detail').removeClass('dismiss').addClass('selected').show();
			}
			event.preventDefault();
			$('.detail-header')
				.children('.crypto-detail-icon')
				.addClass(selectedCryptoIcon);
			$('.detail-header').children('.crypto-detail-title')[0].innerHTML =
				selectedCryptoName;
			document.getElementById('main-cont').style.display = 'none';
			$(this).toggleClass('box-active');
		}, 500);

		setTimeout(() => {
			var timer = setInterval(() => {
				var currentPrice = document.getElementById('nft-price').innerHTML;
				currentPrice = Number(currentPrice);
				if (currentPrice == 1500) {
					currentPrice += 79.88;
					document.getElementById('nft-price').innerHTML = currentPrice;
					clearInterval(timer);
				} else {
					currentPrice += 100;
					document.getElementById('nft-price').innerHTML = currentPrice + '.00';
				}
			}, 50);
		}, 1500);
	});

	$('.nft-product').click(function () {
		setTimeout(() => {
			document.getElementById('product-detail').style.display = 'block';
			document.getElementById('main-cont').style.display = 'none';
			$('#product-detail').children('.nft-wrapper').addClass(backgroundClass);
		}, 300);
	});

	$('.product-back').click(function () {
		$('#product-detail').children('.nft-wrapper').removeClass(backgroundClass);
		document.getElementById('product-detail').style.display = 'none';
		document.getElementById('main-cont').style.display = 'block';
	});

	$('#bid-button').click(function () {
		$('#bid-button').removeClass('no-animation').addClass('click');
		setTimeout(() => {
			$('#bid-button').removeClass('click').addClass('no-animation');
		}, 500);
	});

	$('.crypto-back').click(function (event) {
		if ($('#crypto-detail').hasClass('selected')) {
			$('.detail-header')
				.children('.crypto-detail-icon')
				.removeClass(selectedCryptoIcon);
			$('#crypto-detail').removeClass('selected').addClass('dismiss');
			document.getElementById('main-cont').style.display = 'block';
			document.getElementById('nft-price').innerHTML = '0.00';
			$('.active').removeClass('active');
			$('.slide-card').eq(1).addClass('active');
		}
		event.preventDefault();
		setTimeout(() => {
			$('#crypto-detail').hide();
		}, 500);
	});

	var target = new Date(),
		timerSpan1 = document.getElementById('nft1-time'),
		timerSpan2 = document.getElementById('nft2-time'),
		timerSpan3 = document.getElementById('nft3-time'),
		timerSpan4 = document.getElementById('nft4-time'),
		year = target.getFullYear(),
		month = target.getMonth(),
		day = target.getDate(),
		date = `${year}, ${month}, ${day}`,
		startTime1 = `${date} 07:24:12`,
		nft1Time = new Date(startTime1),
		startTime2 = `${date} 13:27:13`,
		nft2Time = new Date(startTime2),
		startTime3 = `${date} 10:00:02`,
		nft3Time = new Date(startTime3),
		startTime4 = `${date} 09:00:00`,
		nft4Time = new Date(startTime4),
		handler;

	function updateTimer() {
		var time1 = nft1Time.getTime();
		nft1Time.setTime(time1 + 1000);
		source1 = nft1Time.toTimeString().split(' ')[0];
		timerSpan1.innerHTML = source1.replace(
			new RegExp('\\' + [':'].join('|\\'), 'g'),
			' $& '
		);
		nft1Time.toTimeString().split(' ')[0];

		var time2 = nft2Time.getTime();
		nft2Time.setTime(time2 + 1000);
		source2 = nft2Time.toTimeString().split(' ')[0];
		timerSpan2.innerHTML = source2.replace(
			new RegExp('\\' + [':'].join('|\\'), 'g'),
			' $& '
		);
		nft2Time.toTimeString().split(' ')[0];

		var time3 = nft3Time.getTime();
		nft3Time.setTime(time3 + 1000);
		source3 = nft3Time.toTimeString().split(' ')[0];
		timerSpan3.innerHTML = source3.replace(
			new RegExp('\\' + [':'].join('|\\'), 'g'),
			' $& '
		);
		nft3Time.toTimeString().split(' ')[0];

		var time4 = nft4Time.getTime();
		nft4Time.setTime(time4 + 1000);
		source4 = nft4Time.toTimeString().split(' ')[0];
		timerSpan4.innerHTML = source4.replace(
			new RegExp('\\' + [':'].join('|\\'), 'g'),
			' $& '
		);
		nft4Time.toTimeString().split(' ')[0];
	}

	handler = setInterval(updateTimer, 1000);

	let data = {
		bucket: 50,
		height: function () {
			return 400;
		},
		width: function () {
			return 400;
		},
		candleWick: function () {
			return 1;
		},
		candleBody: function () {
			return 5;
		},
		spacing: function () {
			return 5;
		},
		distribution: function () {
			return this.spacing() + this.candleBody();
		},
		points: function () {
			let int = Math.floor(this.width() / (this.candleBody() + this.spacing()));
			let remain = this.width() % (this.candleBody() + this.spacing());
			if (remain >= this.candleBody()) {
				int++;
			}
			return int;
		},
		prevPoint: 0,
		decimals: 0,
	};

	const chartHome = document.getElementById('myChart');
	const filter = document.getElementById('filter');
	let chartSVG, group;

	function rndRange(min, max) {
		return Math.random() * (max - min) + min;
	}

	function boxMuller(mean, stdev) {
		let x = 0,
			y = 0,
			rds,
			c;
		do {
			x = Math.random() * 2 - 1;
			y = Math.random() * 2 - 1;
			rds = x * x + y * y;
		} while (rds >= 1);
		c = Math.sqrt((-2 * Math.log(rds)) / rds);
		return x * c * stdev + mean;
	}

	function round(value, decimals) {
		return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
	}

	function removeItem(item, list) {
		return list.filter((e) => {
			return e != item;
		});
	}

	Array.prototype.max = function () {
		return Math.max.apply(null, this);
	};

	Array.prototype.min = function () {
		return Math.min.apply(null, this);
	};

	function mapRange(value, a, b, c, d) {
		value = (value - a) / (b - a);
		return c + value * (d - c);
	}

	function craftData() {
		let dataArray = [];
		let startingYPoint = rndRange(0, data.height());
		let startingXPoint = data.candleBody() / 2;
		let dataBucket = [];
		let dataBucketFormatted = [];
		let xPlace = startingXPoint;
		for (i = 0; i < data.points() * data.bucket; i++) {
			if (i === 0) {
				dataBucket.push(startingYPoint);
				data.prevPoint = startingYPoint;
			} else {
				let point = boxMuller(0, 10) + data.prevPoint;
				dataBucket.push(point);
				data.prevPoint = point;
			}
		}
		let minY = dataBucket.min();
		let maxY = dataBucket.max();
		for (i = 0; i < dataBucket.length; i++) {
			dataBucketFormatted.push(
				mapRange(dataBucket[i], minY, maxY, 0, data.height())
			);
		}
		for (i = 0; i < data.points(); i++) {
			let candlestick = {
				high: 0,
				low: 0,
				open: 0,
				close: 0,
				positive: false,
				x: xPlace,
			};
			let groupPoints = [];
			for (j = 0; j < data.bucket; j++) {
				groupPoints.push(dataBucketFormatted[j]);
			}
			candlestick.high = groupPoints.max();
			candlestick.low = groupPoints.min();
			candlestick.open = groupPoints[0];
			candlestick.close = groupPoints[data.bucket - 1];
			if (
				Math.abs(Math.abs(candlestick.open) - Math.abs(candlestick.close)) < 1
			) {
				candlestick.open++;
			}
			candlestick.high = round(candlestick.high, data.decimals);
			candlestick.low = round(candlestick.low, data.decimals);
			candlestick.open = round(candlestick.open, data.decimals);
			candlestick.close = round(candlestick.close, data.decimals);
			dataArray.push(candlestick);
			xPlace += data.distribution();
			dataBucketFormatted.splice(0, data.bucket);
		}
		for (i = 0; i < data.points(); i++) {
			if (dataArray[i]['close'] < dataArray[i]['open']) {
				dataArray[i]['positive'] = true;
			}
		}
		return dataArray;
	}

	function build() {
		chartHome.innerHTML = '';
		let chartData = craftData();
		chartSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		chartSVG.setAttribute('width', data.width());
		chartSVG.setAttribute('height', data.height());
		chartSVG.setAttribute('fill', 'none');
		chartSVG.setAttributeNS(
			'http://www.w3.org/2000/xmlns/',
			'xmlns:xlink',
			'http://www.w3.org/1999/xlink'
		);
		group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
		for (i = 0; i < data.points(); i++) {
			let cWick = document.createElementNS(
				'http://www.w3.org/2000/svg',
				'path'
			);
			let color = '#5957bb';
			if (chartData[i]['positive']) {
				color = '#bae399';
			}
			cWick.setAttribute('stroke', '#676767');
			cWick.setAttribute('stroke-width', data.candleWick());
			cWick.setAttribute(
				'd',
				'M ' +
					chartData[i]['x'] +
					',' +
					chartData[i]['high'] +
					',' +
					chartData[i]['x'] +
					',' +
					chartData[i]['low']
			);
			group.appendChild(cWick);
			let cBody = document.createElementNS(
				'http://www.w3.org/2000/svg',
				'path'
			);
			cBody.setAttribute('stroke', color);
			cBody.setAttribute('stroke-width', data.candleBody());
			cBody.setAttribute(
				'd',
				'M ' +
					chartData[i]['x'] +
					',' +
					chartData[i]['open'] +
					',' +
					chartData[i]['x'] +
					',' +
					chartData[i]['close']
			);
			group.appendChild(cBody);
		}

		chartSVG.appendChild(group);
		chartHome.appendChild(chartSVG);
	}

	build();

	filter.addEventListener('click', build);

	window.addEventListener('load', () => {
		AOS.init({
			duration: 1000,
			easing: 'ease-in-out',
			once: true,
			mirror: false,
		});

		WOW.prototype.addBox = function (element) {
			this.boxes.push(element);
		};

		var wow = new WOW();
		wow.init();
	});
})();
