/**
 * gulpfile.js for metastore.js
 *
 * Created 12.12.2015<br />
 * @author  Evgeniy Malyarov
 */

var gulp = require('gulp');
module.exports = gulp;
//var changed = require('gulp-changed');
//var concat = require('gulp-concat-sourcemap');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var shell = require('gulp-shell');
var rename = require('gulp-rename');
var resources = require('./lib/gulp-resource-concat.js');
var path = require('path');
var umd = require('gulp-umd');

// Сборка ресурсов
gulp.task('injected', function(){
	gulp.src([
		'./templates/*.html',
		'./data/create_tables.sql'
	])
		.pipe(resources('merged_data.js', function (data) {
			return new Buffer('$p.injected_data._mixin(' + JSON.stringify(data) + ');');
		}))
		.pipe(gulp.dest('./data'));
});

// Основная сборка проекта
gulp.task('main', function(){
	gulp.src([
			'./src/wdg_dyn_dataview.js',
			'./src/wdg_metastore_common.js',
			'./src/wdg_filter_prop.js',
			'./src/wdg_multi_checkbox.js',
			'./src/wdg_range_slider.js',
			'./src/wdg_product_card.js',
			'./src/wdg_products_view.js',
			'./src/wdg_reviews.js',
			'./src/init.js',
			'./src/view_catalog.js',
			'./src/view_cart.js',
			'./src/view_compare.js',
			'./src/view_orders.js',
			'./src/view_settings.js',
			'./src/view_user.js',
			'./src/view_content.js',
			'./src/view_about.js',
			'./data/merged_data.js',
			'./templates/templates.js'
		])
		.pipe(concat('metastore.js'))
		.pipe(umd({
			exports: function(file) {
				return 'undefined';
			}
		}))
		.pipe(gulp.dest('./dist'))
		.pipe(rename('metastore.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./dist'));
});


var toRun = ['injected', 'main'];

// Главная задача
gulp.task('default', toRun, function(){});