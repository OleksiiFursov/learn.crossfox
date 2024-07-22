const d = document,
  body = d.body,
  bc = body.classList,
  $ = (sel, p = d) => p.querySelector(sel),
  $$ = (sel, p = d) => p.querySelectorAll(sel),
  $_oo = {
	  rootMargin: '0px',
	  threshold: 1.0,
  },
  $o = (sel, func, c = $_oo) => {
	  const el = $(sel)
	  if (el) {
		  new IntersectionObserver(([e]) => {
			  func(e, e.target)
		  }, c).observe(el)
	  }

  },
  $e = (sel, type, call) => {
	  const el = typeof sel === 'string' ? $(sel) : sel
	  el && el.addEventListener(type, call)
  }

// GOOGLE ANALYTICS
window.dataLayer = window.dataLayer || []

function gtag () {dataLayer.push(arguments)}

gtag('js', new Date())
gtag('config','G-1L49K9TX2N')

$o('.page-top', e => {
	bc[e.intersectionRatio === 0 ? 'add' : 'remove']('is-scroll')
})

const rand = (min, max) => Math.random() * (max - min) + min
const points = {}

function getPoints () {
	const h = innerHeight * .8
	for (const el of $$('.decor-balls, .five-circle')) {

		const rect = el.getBoundingClientRect()
		const start = rect.top + scrollY - h,
		  end = start + el.offsetHeight + h,
		  range = end - start

		points[el.className] = {
			start,
			end,
			range,
			el,
		}
	}

}

getPoints()

const getProgress = p => (scrollY - p.start) / p.range

// Animated elements:
const $circles = $$('.five-circle>div')
const $balls = $$('.decor-balls>div')
const ballsZ = []
$balls.forEach(el => {
	const zIndex = Math.random()
	ballsZ.push(zIndex)
	el.style.opacity = Math.max(0.1, String(zIndex)-0.1)
	el.style.transform = 'scale(' + zIndex + ')'
	el.style.left = rand(-5, 90) + '%'
	el.style.top = rand(15, 120) + '%'
})
$e(window, 'resize', getPoints)
$e(window, 'scroll', () => {

	for (const id in points) {
		const point = points[id]

		if (scrollY > point.start && scrollY < point.end) {
			const p = getProgress(point)
			if (id === 'five-circle') {
				$circles.forEach((circle, i) => {
					circle.style.transform = `scale(${p * (7.5 - i * 2)})`
				})
			} else if (id === 'decor-balls') {
				$balls.forEach((ball, i) => {
					ball.style.translate = '0 ' + (-p * ballsZ[i] * point.el.offsetHeight) + 'px'
				})
			}
		}
	}
})

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
	const form = { form: el.closest('section[class^="modal-"]').classList[0] }
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

})

// Promo:
// setTimeout(() => {
// 	bc.add('bottom-bar-active')
// }, 7000)
