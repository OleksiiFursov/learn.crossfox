import gulp from 'gulp';
import './gulp/dev.js';
import './gulp/build.js';

const tasks = ['html', 'sass', 'images', 'fonts', 'files', 'js', 'pwa'];

const devTasks = gulp.parallel(...tasks.map(v=> v+':dev'));
const buildTasks = gulp.parallel(...tasks.map(v=> v+':build'), 'generate-favicon');
const buildTasksWithoutPWA = gulp.parallel(...tasks.map(v=> v+':build'));

gulp.task('default', gulp.series('clean:dev', devTasks, gulp.parallel( 'serve:dev')));
gulp.task('with-pwa', gulp.series('clean:dev', devTasks,  'generate-favicon',  gulp.parallel( 'serve:dev')));
gulp.task('build', gulp.series('clean:build', buildTasksWithoutPWA));
gulp.task('build-full', gulp.series('clean:build', buildTasks));
