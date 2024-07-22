import gulp from 'gulp'
import babel from 'gulp-babel'
import changed from 'gulp-changed'
import cssnano from 'gulp-cssnano'
// HTML
import fileInclude from 'gulp-file-include'
import htmlClean from 'gulp-htmlclean'
import gulpIf from 'gulp-if'

// Images
import imagemin from 'gulp-imagemin'
import plumber from 'gulp-plumber'
import gulpSass from 'gulp-sass'
import sassGlob from 'gulp-sass-glob'
import sourceMaps from 'gulp-sourcemaps'
import webp from 'gulp-webp'
import webpHTML from 'gulp-webp-html'
// SASS
import * as dartSass from 'sass'
import webpack from 'webpack-stream'
import webpackConfig from '../webpack.config.js'
import {
	clearBuild,
	generateFavicon,
	generateFiles,
	generateFonts,
	movePWA,
} from './task.js'
import { getBuildDir, getConfig, getSrcDir, plumberNotify } from './tools.js'

const sass = gulpSass(dartSass)

gulp.task('clean:build', clearBuild)
gulp.task('fonts:build', generateFonts)
gulp.task('pwa:build', movePWA)
gulp.task('files:build', generateFiles)
gulp.task('html:build', async () =>
  gulp.src([
	  getSrcDir('html/**/*.html'),
	  '!' + getSrcDir('/html/part/*.html'),
	  '!' + getSrcDir('html/blocks/*.html'),
	  '!' + getSrcDir('/html/blocks/**/*.html'),
	  '!' + getSrcDir('/html/pages/**/*.html'),
  ])
      .pipe(changed(getBuildDir()))
      .pipe(plumber(plumberNotify('HTML')))
      .pipe(fileInclude({ context: await getConfig() }))
      .pipe(htmlClean())
      .pipe(webpHTML())
      .pipe(gulp.dest(getBuildDir())),
)

gulp.task('sass:build', () =>
  gulp.src(getSrcDir('scss/*.scss'))
      .pipe(changed(getBuildDir('css/')))
      .pipe(plumber(plumberNotify('SCSS')))
      .pipe(sourceMaps.init())
      .pipe(sassGlob())
      .pipe(sass())
      .pipe(sourceMaps.write('.'))
      .pipe(gulpIf('*.css', cssnano()))
      .pipe(gulp.dest(getBuildDir('css/'))),
)

gulp.task('images:build', () =>
  gulp.src(getSrcDir('img/**/*'), { encoding: false })
      .pipe(changed(getBuildDir('img/')))
      .pipe(gulpIf(file =>  file.extname !== '.svg', webp()))
      .pipe(imagemin({ verbose: true }))
      .pipe(gulp.dest(getBuildDir('img/')))
)

gulp.task('js:build', () =>
  gulp.src(getSrcDir('js/*.js'))
      .pipe(changed(getBuildDir('js/')))
      .pipe(plumber(plumberNotify('JS')))
      .pipe(babel())
      .pipe(webpack(webpackConfig))
      .pipe(gulp.dest(getBuildDir('js/'))),
);

gulp.task('generate-favicon', generateFavicon)

