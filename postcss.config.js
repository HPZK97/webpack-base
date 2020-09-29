module.exports = {
    plugins: [
        require('postcss-sort-media-queries')({
            sort: 'mobile-first'
        }),
        require('autoprefixer')('cover 95%'),
        require('cssnano')
    ]
}