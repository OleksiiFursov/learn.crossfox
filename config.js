const priceI90M = 47;
export const GOOGLE_ANALYTICS = 'G-1L49K9TX2N'

export default format({
	TITLE: 'Индивидуальное обучение веб-программированию',
	URL: 'https://mentor.crossfox.online',
	FOOTER_YEAR: 2024,
	LANG: 'ru',

	// COMPANY:
	COMPANY_NAME: 'Обучение с Crossfox',
	COMPANY_NAME_SHORT: 'Learn CF',
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
	AUTHOR: 'Oleksii Fursov',

	//DESIGNED:
	THEME_COLOR: '#ff9800',
	THEME_BACKGROUND: '#111',

	// SERVER:
	FOLDER_BUILD: './build',
	FOLDER_SOURCE: './src',
	SERVER_OPEN: false,//'external',
	HTTPS: true,
	PORT: 777,
	TUNNEL: false,

	// HOOK
	HEADER_ADDONS: '<script async src="https://www.googletagmanager.com/gtag/js?id='+GOOGLE_ANALYTICS+'"></script>\n',
	GROUP_MEMBERS: 5,
	GROUP2_MEMBERS: 10,

	PRICE_I_45M: priceI90M/2*1.25,
	PRICE_I_90M: priceI90M,
	PRICE_I_4_90: priceI90M*4 * .9,
	PRICE_I_8_90: priceI90M*8 * .85,

	PRICE_C_30M: priceI90M/3*1.3,
	PRICE_CK_45M: priceI90M/2*1.1 ,
	PRICE_C_60M: priceI90M/1.5*.95,
	PRICE_C_120M: priceI90M*1.25*.75,
	PRICE_PM: priceI90M*4*1.06,
	PRICE_T_30M: priceI90M/3*1.5,
	PRICE_P_60M: priceI90M/1.5*1.25
})


function format(obj){
	for(const [key, value] of Object.entries(obj)){
		if(key.includes('PRICE_')){
			obj[key] = Math.ceil(value);
		}
	}
	return obj;
}
