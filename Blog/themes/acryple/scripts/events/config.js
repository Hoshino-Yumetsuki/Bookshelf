/**
 * Butterfly
 * 1. Merge CDN
 * 2. Capitalize the first letter of comment name
 */

'use strict'

const { version } = require('../../package.json')
const path = require('path')

hexo.extend.filter.register('before_generate', () => {
  const themeConfig = hexo.theme.config
  const { CDN, comments } = themeConfig

  /**
   * Merge CDN
   */

  const internalSrcCDN = {
    main_css: '/css/index.css',
    main: `https://fastly.jsdelivr.net/npm/hexo-theme-butterfly@${version}/source/js/main.js`,
    utils: `https://fastly.jsdelivr.net/npm/hexo-theme-butterfly@${version}/source/js/utils.js`,
    translate: `https://fastly.jsdelivr.net/npm/hexo-theme-butterfly@${version}/source/js/tw_cn.js`,
    local_search: `https://fastly.jsdelivr.net/npm/hexo-theme-butterfly@${version}/source/js/search/local-search.js`,
    algolia_js: `https://fastly.jsdelivr.net/npm/hexo-theme-butterfly@${version}/source/js/search/algolia.js`,
  }

  const internalSrcLocal = {
    main_css: '/css/index.css',
    main: '/js/main.js',
    utils: '/js/utils.js',
    translate: '/js/tw_cn.js',
    local_search: '/js/search/local-search.js',
    algolia_js: '/js/search/algolia.js',
  }

  const thirdPartySrcCDN = {
    algolia_search_v4: 'https://fastly.jsdelivr.net/npm/algoliasearch@4/dist/algoliasearch-lite.umd.js',
    instantsearch_v4: 'https://fastly.jsdelivr.net/npm/instantsearch.js@4/dist/instantsearch.production.min.js',
    pjax: 'https://fastly.jsdelivr.net/npm/pjax/pjax.min.js',
    gitalk: 'https://fastly.jsdelivr.net/npm/gitalk/dist/gitalk.js',
    gitalk_css: 'https://fastly.jsdelivr.net/npm/gitalk/dist/gitalk.css',
    blueimp_md5: 'https://fastly.jsdelivr.net/npm/blueimp-md5/js/md5.min.js',
    valine: 'https://fastly.jsdelivr.net/npm/valine/dist/Valine.min.js',
    disqusjs: 'https://fastly.jsdelivr.net/npm/disqusjs@1/dist/disqus.js',
    disqusjs_css: 'https://fastly.jsdelivr.net/npm/disqusjs@1/dist/disqusjs.css',
    twikoo: 'https://fastly.jsdelivr.net/npm/twikoo/dist/twikoo.min.js',
    waline_js: 'https://fastly.jsdelivr.net/npm/@waline/client/dist/waline.js',
    waline_css: 'https://fastly.jsdelivr.net/npm/@waline/client/dist/waline.css',
    sharejs: 'https://fastly.jsdelivr.net/npm/dist/js/social-share.min.js',
    sharejs_css: 'https://fastly.jsdelivr.net/npm/social-share.js/dist/css/share.min.css',
    mathjax: 'https://fastly.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js',
    katex: 'https://fastly.jsdelivr.net/npm/katex/dist/katex.min.css',
    katex_copytex: 'https://fastly.jsdelivr.net/npm/katex/dist/contrib/copy-tex.min.js',
    katex_copytex_css: 'https://fastly.jsdelivr.net/npm/katex@latest/dist/contrib/copy-tex.css',
    mermaid: 'https://fastly.jsdelivr.net/npm/mermaid/dist/mermaid.min.js',
    canvas_ribbon: 'https://fastly.jsdelivr.net/npm/butterfly-extsrc@1/dist/canvas-ribbon.min.js',
    canvas_fluttering_ribbon: 'https://fastly.jsdelivr.net/npm/butterfly-extsrc@1/dist/canvas-fluttering-ribbon.min.js',
    canvas_nest: 'https://fastly.jsdelivr.net/npm/butterfly-extsrc@1/dist/canvas-nest.min.js',
    activate_power_mode: 'https://fastly.jsdelivr.net/npm/butterfly-extsrc@1/dist/activate-power-mode.min.js',
    fireworks: 'https://fastly.jsdelivr.net/npm/butterfly-extsrc@1/dist/fireworks.min.js',
    click_heart: 'https://fastly.jsdelivr.net/npm/butterfly-extsrc@1/dist/click-heart.min.js',
    ClickShowText: 'https://fastly.jsdelivr.net/npm/butterfly-extsrc@1/dist/click-show-text.min.js',
    lazyload: 'https://fastly.jsdelivr.net/npm/vanilla-lazyload/dist/lazyload.iife.min.js',
    instantpage: 'https://fastly.jsdelivr.net/npm/instant.page@5/instantpage.js',
    typed: 'https://fastly.jsdelivr.net/npm/typed.js/dist/typed.umd.js',
    pangu: 'https://fastly.jsdelivr.net/npm/pangu@4/dist/browser/pangu.min.js',
    fancybox_css_v4: 'https://fastly.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox/fancybox.css',
    fancybox_v4: 'https://fastly.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox/fancybox.umd.js',
    medium_zoom: 'https://fastly.jsdelivr.net/npm/medium-zoom/dist/medium-zoom.min.js',
    snackbar_css: 'https://fastly.jsdelivr.net/npm/node-snackbar/dist/snackbar.min.css',
    snackbar: 'https://fastly.jsdelivr.net/npm/node-snackbar/dist/snackbar.min.js',
    fontawesomeV6: 'https://fastly.jsdelivr.net/npm/@fortawesome/fontawesome-free@6/css/all.min.css',
    flickr_justified_gallery_js: 'https://fastly.jsdelivr.net/npm/flickr-justified-gallery@2/dist/fjGallery.min.js',
    flickr_justified_gallery_css: 'https://fastly.jsdelivr.net/npm/flickr-justified-gallery@2/dist/fjGallery.css',
    aplayer_css: 'https://fastly.jsdelivr.net/npm/aplayer@1/dist/APlayer.min.css',
    aplayer_js: 'https://fastly.jsdelivr.net/npm/aplayer@1/dist/APlayer.min.js',
    meting_js: 'https://fastly.jsdelivr.net/npm/meting/dist/Meting.min.js',
    prismjs_js: 'https://fastly.jsdelivr.net/npm/prismjs@1/prism.js',
    prismjs_lineNumber_js: 'https://fastly.jsdelivr.net/npm/prismjs@1/plugins/line-numbers/prism-line-numbers.min.js',
    prismjs_autoloader: 'https://fastly.jsdelivr.net/npm/prismjs@1/plugins/autoloader/prism-autoloader.min.js',
  }

  // delete null value
  const deleteNullValue = obj => {
    if (!obj) return
    for (const i in obj) {
      obj[i] === null && delete obj[i]
    }
    return obj
  }

  const defaultVal = (obj, choose) => {
    if (obj === 'internal') {
      if (choose === 'local') return internalSrcLocal
      else return internalSrcCDN
    }

    if (obj === 'external') {
      if (choose === 'local') {
        let result = {}
        try {
          const data = path.join(hexo.plugin_dir,'hexo-butterfly-extjs/plugins.yml')
          result = hexo.render.renderSync({ path: data, engine: 'yaml'})
          Object.keys(result).map(key => {
            result[key] = '/pluginsSrc/' + result[key]
          })
        } catch (e) {}
        return result
      } else return thirdPartySrcCDN
    }
  }

  themeConfig.asset = Object.assign(defaultVal('internal', CDN.internal_provider),
    defaultVal('external', CDN.third_party_provider), deleteNullValue(CDN.option))

  /**
   * Capitalize the first letter of comment name
   */

  let { use } = comments

  if (!use) return

  if (typeof use === 'string') {
    use = use.split(',')
  }

  const newArray = use.map(item => item.toLowerCase().replace(/\b[a-z]/g, s => s.toUpperCase()))

  themeConfig.comments.use = newArray
})
