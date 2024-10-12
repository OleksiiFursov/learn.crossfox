const priceI60M = 35;

export default format({
	TITLE: 'Индивидуальное обучение веб-программированию',
	URL: 'https://mentor.crossfox.online',
	FOOTER_YEAR: 2024,
	LANG: 'ru',

	// COMPANY:
	COMPANY_NAME: 'Mentor.Crossfox',
	COMPANY_NAME_SHORT: 'Mentor CF',
	COMPANY_DESCRIPTION: 'Освой программирование быстро и качественно с личным ментором. Индивидуальный подход. Front-end | Back-end',
	OPENING_HOURS: 'Mo,Tu,We,Th,Fr,Sa,Su',
	DAY_OF_WEEK: 'Monday","Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday', // first and last " not require
	OPENS: '09:00',
	CLOSES: '22:00',
	PRICE_RANGE: '$$',

	// CONTACTS:
	EMAIL: 'alex@crossfox.online',
	PHONE: '<a href="tel:123456789">+1 234 567 89</a>',
	TELEGRAM: 'crossfox_online',
	INSTA: 'crossfox.learn',
	AUTHOR: 'Oleksii Fursov',

	//DESIGNED:
	THEME_COLOR: '#ff9800',
	THEME_BACKGROUND: '#111',

	// SERVER:
	FOLDER_BUILD: './build',
	FOLDER_SOURCE: './src',
	FOLDER_COPY: ['vendor'],
	SERVER_OPEN: false,//'external',
	HTTPS: true,
	PORT: 777,
	TUNNEL: false,

	GOOGLE_ANALYTICS: 'G-1L49K9TX2N',

	GROUP_MEMBERS: 5,
	GROUP2_MEMBERS: 10,

	PRICE_C_30M: priceI60M/2*1.35,
	PRICE_C_60M: priceI60M*0.95,
	PRICE_CK_45M: priceI60M*1.1,
	PRICE_T_30M: priceI60M,

	PRICE_I_30M: priceI60M/2*1.5,
	PRICE_I_60M: priceI60M,
	PRICE_I_4_60: priceI60M*4 * .9,
	PRICE_I_8_60: priceI60M*8 * .85,


	PRICE_PM: priceI60M*6,
	PRICE_P_60M: priceI60M*1.15
})


function format(obj){
	for(const [key, value] of Object.entries(obj)){
		if(key.includes('PRICE_')){
			obj[key] = Math.ceil(value);
		}
	}
	return obj;
}
