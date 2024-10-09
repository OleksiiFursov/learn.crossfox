let theLoaded, isMob;

const d = document,
	body = d.body,
	bc = body.classList,
	l = location,
	$ = (sel, p = d) => p.querySelector(sel),
	$$ = (sel, p = d) => p.querySelectorAll(sel),
	$each = (sel, call, p = d) => $$(sel, p).forEach(call),
	$_oo = {
		rootMargin: '0px',
		threshold: 0.2,
	},
	$o = (sel, func, c = $_oo) => {
		const el = getElement(sel)
		if (el) {
			const r = new IntersectionObserver(([e]) => {
				func(e, e.target)
			}, c);
			r.observe(el)
			return r
		}
	},
	getElement = sel => (typeof sel === 'string' ? $(sel) : sel),
	$e = (sel, type, call) => {
		const el = typeof sel === 'string' ? $(sel) : sel
		el && el.addEventListener(type, call)
	},
	isLoaded = new Promise(e => theLoaded = e),
	$v = (sel, call, once = false) => {
		isLoaded.then(() => {
			let obs = $o(sel, e => {
				if (e.isIntersecting) {
					call(sel);
					if (once) {
						obs.unobserve(getElement(sel))
					}
				}

			})
		})
	};


// GOOGLE ANALYTICS
window.dataLayer = window.dataLayer || []

function gtag() {
	dataLayer.push(arguments)
}

gtag('js', new Date())
gtag('config', 'G-1L49K9TX2N');


$o('.page-top', e => {
	bc[e.intersectionRatio === 0 ? 'add' : 'remove']('is-scroll')
})



const rand = (min, max) => Math.random() * (max - min) + min
const rwd = (d, m) => isMob ? m : d;
const points = {}

function init() {
	const h = innerHeight * .8;

	const isMobCur = innerWidth < 980 || innerWidth < innerHeight;

	if (!isMobCur && isMob) l.reload();
	isMob = isMobCur;

	for (const el of $$('.decor-balls')) {
		const rect = el.getBoundingClientRect()
		const start = rect.top + scrollY - h,
			end = start + el.offsetHeight + h,
			range = end - start

		points[el.classList.item(0)] = {
			start,
			end,
			range,
			el,
		}
	}
}

init();

const getProgress = p => (scrollY - p.start) / p.range
$e(window, 'resize', init)

if(!isMob) {
// Animated elements:
	const $balls = $$('.decor-balls>div');
	const leftCount = rand(4,6);
	$balls.forEach((el, i) => {
		const zIndex = Math.random()
		el.zIndex = zIndex;
		el.style.opacity = Math.max(0.1, String(zIndex) - 0.1)
		el.style.transform = 'scale(' + zIndex + ')'
		el.style.left = (leftCount > i ? rand(rwd(-5, -20), rwd(15, 0)) : rand(80, 100)) + '%'
		el.style.top = rand(15, 120) + '%'
	})

	$e(window, 'scroll', () => {
		for (const id in points) {
			const point = points[id];
			if (scrollY > point.start && scrollY < point.end) {
				let p = getProgress(point)
				if (id === 'decor-balls') {
					$balls.forEach(ball => {
						ball.style.translate = '0 ' + (-p * ball.zIndex * point.el.offsetHeight) + 'px'
					})
				}
			}
		}
	});
}
const mailStatus = (el, msg, s) => {
	el.textContent = msg
	el.classList[s ? 'add' : 'remove']('success')
	el.classList[s ? 'remove' : 'add']('error')
}

$e(body, 'submit', e => {
	const el = e.target
	const els = el.elements
	const $message = $('.msg', el)
	e.preventDefault()
	$('.msg', el).textContent = 'Идет отправка'
	els.submit.disabled = true
	const form = {form: el.closest('section[class^="modal-"]').classList[0]}
	for (let i = 0; i < els.length; i++) {
		const item = els[i]
		form[item.name] = item.value
	}
	fetch('/sendMail.php', {
		method: 'POST',
		body: JSON.stringify(form),
	}).then(v => v.json()).then(v => {
		if (v.status) {
			for (let i = 0; i < els.length; i++) {
				els[i].value = ''
			}
			mailStatus($message, 'Успешно отправлено', 1)
			bc.remove('active-' + name)
			gtag('event', 'close-' + name)

		} else {
			mailStatus($message, 'Сообщение не отправлено', 0)
		}
		els.submit.disabled = false
	}).catch(() => {
		mailStatus($message, 'Сообщение не отправлено', 0)
		els.submit.disabled = false
	})
})
$e(body, 'input', function (e) {
	const els = e.target.closest('form')
	els.submit.disabled = !els.name.value || (els.msg && !els.msg.value)
})
$e(body, 'click', e => {
	const el = e.target
	const elC = el.classList
	if (el.tagName === 'A') {
		if (el.hash.startsWith('#')) {
			bc.remove('header-menu-active')
			return
		}
	}
	if (!elC.length) return 0
	const fx = elC[0]
	if (fx.startsWith('fx-')) {
		// Burger
		if (fx === 'fx-header-burger') {
			bc.toggle('header-menu-active')
			// Open
		} else if (fx.includes('fx-active-modal')) {
			const name = fx.replace('fx-', '')
			bc.add(name)
			gtag('event', name)

			// Close
		} else if (fx === 'fx-modal-close') {
			const name = el.closest('section[class^="modal-"]').classList[0]
			bc.remove('active-' + name)
			gtag('event', 'close-' + name)
		} else if (fx === 'fx-mr-tech') {
			el.parentElement.remove();
		}
	}


	if (elC.contains('overlay')) {
		bc.forEach(name => {
			if (name.includes('active-modal')) {
				bc.remove(name)
				gtag('event', 'close-' + name.replace('active', ''))
			}
		})
	}

});

const preloaderText = setTimeout(() => {
	$('.preloader').textContent = 'Идет загрузка...'
}, 300);

$e(window, 'load', () => {
	clearTimeout(preloaderText);
	bc.add('loaded');
	if (isMob) {

	}
	setTimeout(() => {
		animAfter('.header', theLoaded)
	}, 100)


});


const animAfter = (el, call) => $e(el, 'transitionend', call)
const vAnim = (sel, call) => $each(sel, el => $v(el, call, true));
const vAnimRun = (root, sel, call) => {
	const el = $(sel, root)
	if (!el) return 0
	el.classList.add('run')
	call && animAfter(el, call)
}

vAnim('.counters', el=> el.classList.add('active'))
vAnim(`section:not(#start) .anim-fade-top`, el => {
	el.classList.add('run');
})

vAnim('#start', el =>
	vAnimRun(el, 'h1', () =>
		vAnimRun(el, '.like-p', () =>
			vAnimRun(el, '.start-list', () =>
				vAnimRun(el, '.btns')
			)
		)
	)
)

const randAnim = (el, className = 'run', min = 200, max = 1000) => setTimeout(() => el.classList.add(className), rand(min, max))
vAnim('.anim-zoom-collection', root => {
	$each('.anim-zoom-item', el => randAnim(el, 'run', 50, 700), root)
})

// Promo:
// setTimeout(() => {
// 	bc.add('bottom-bar-active')
// }, 7000)

bc.add('js');

const colors  = ['#f4824a', '#fb4c4c', '#3c53d3'];
$each('#start .card', ((el, index)=>{
	let angel = -70, direction = false;
	let step = Math.random()*0.6;
	setInterval(()=>{
		//el.style.backgroundImage = 'linear-gradient('+angel+'deg, #232429 10%, '+colors[index]+' 90%)';
		el.style.backgroundImage = 'linear-gradient('+angel+'deg, #232429 80%, '+colors[index]+' 30%)';

		if(angel === 50){
			direction = false;
		}else if(angel === 10){
			direction = true;
		}

		if(direction){
			angel-=step;
		}else{
			angel+=step;
		}
	}, 40);
}))


