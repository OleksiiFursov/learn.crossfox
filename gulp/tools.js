import notify from 'gulp-notify'
import config from '../config.js'

export const getBuildDir = (path = '') => `${config.FOLDER_BUILD}/${path}`
export const getSrcDir = (path = '') => `${config.FOLDER_SOURCE}/${path}`


export const getConfig = async () => (await import('../config.js?v='+Date.now())).default
export const plumberNotify = (title) => ({
	errorHandler: notify.onError({
		title: title,
		message: 'Error <%= error.message %>',
		sound: false,
	}),
})
