import fs from 'fs'
import gulp from 'gulp'
import changed from 'gulp-changed'
import clean from 'gulp-clean'
import realFavicon from 'gulp-real-favicon'
import config from '../config.js'
import { getBuildDir, getSrcDir } from './tools.js'

export const clearBuild = done => {
	if (fs.existsSync(getBuildDir())) {
		return gulp.src(getBuildDir(), { read: false })
		.pipe(clean({ force: true }))
	}
	done()
}

export const generateFonts = () =>
  gulp.src(getSrcDir('fonts/**/*'), { encoding: false })
      .pipe(changed(getBuildDir('fonts/')))
      .pipe(gulp.dest(getBuildDir('fonts/')))


export const generateFiles = async () => {
	const tasks = [];

	for (const folder of config.FOLDER_COPY) {
		tasks.push(async () => {
			return new Promise((resolve, reject) => {
				gulp.src(getSrcDir(folder + '/**/*'), { encoding: false })
					.pipe(changed(getBuildDir(folder + '/')))
					.pipe(gulp.dest(getBuildDir(folder + '/')))
					.on('end', resolve)
					.on('error', reject);
			});
		});
	}

	await Promise.all(tasks.map(task => task()));
}

export const movePWA = () =>
  gulp.src(['*.png', '*.ico', '.*.webmanifest'].map(getSrcDir))
      .pipe(changed(getBuildDir()))
      .pipe(gulp.dest(getBuildDir()))


export const generateFavicon = done =>  {
	const logoPath = getSrcDir('img/cf-favicon.png');

	if (fs.existsSync(logoPath)) {
		realFavicon.generateFavicon({
			markupFile: getBuildDir('pwa/data.json'),
			masterPicture: logoPath,
			dest: getBuildDir('pwa'),
			iconsPath: '/pwa',
			design: {
				ios: {
					pictureAspect: 'backgroundAndMargin',
					backgroundColor: config.THEME_BACKGROUND,
					margin: '14%',
					assets: {
						ios6AndPriorIcons: false,
						ios7AndLaterIcons: true,
						precomposedIcons: false,
						declareOnlyDefaultIcon: true,
					},
				},
				desktopBrowser: {},
				windows: {
					pictureAspect: 'noChange',
					backgroundColor: config.THEME_BACKGROUND,
					onConflict: 'override',
					assets: {
						windows80Ie10Tile: false,
						windows10Ie11EdgeTiles: {
							small: false,
							medium: true,
							big: false,
							rectangle: false,
						},
					},
				},
				androidChrome: {
					pictureAspect: 'noChange',
					themeColor: config.THEME_COLOR,
					manifest: {
						name: config.COMPANY_NAME,
						short_name: config.COMPANY_NAME_SHORT,
						description: config.COMPANY_DESCRIPTION,
						start_url: '/index.html',
						background_color: config.THEME_BACKGROUND,
						display: 'standalone',
						orientation: 'notSet',
						onConflict: 'override',
						declared: true,
					},
					assets: {
						legacyIcon: false,
						lowResolutionIcons: true,
					},
				},
				safariPinnedTab: {
					pictureAspect: 'blackAndWhite',
					threshold: 60,
					themeColor: config.THEME_COLOR,
				},
			},
			settings: {
				compression: 3,
				scalingAlgorithm: 'Mitchell',
				errorOnImageTooSmall: false,
			},
		}, done)
	}
	done()
}
