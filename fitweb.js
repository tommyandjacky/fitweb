var fis = module.exports = require('fis');

fis.cli.name = 'fitweb';
fis.cli.info = fis.util.readJSON(__dirname+'/package.json');

fis.require.prefixes.unshift('fitweb');

fis.config.merge({
    modules: {
        parser: {
            less: 'less',
            tmpl : 'nunjucks'
        },
        postprocessor: {
            js: "jswrapper, require-async",
            html: "require-async"
        },
        postpackager : ['autoload', 'simple'],
        lint : {
            js : 'jshint'
        }
    },
    roadmap: {
        ext: {
            less: 'css',
            tmpl : 'js'
        },
        path : [
            {
                //less的mixin文件无需发布
                reg : /^\/app\/(.*)mixin\.less$/i,
                release : false
            },
            {
                //其他css文件
                reg : /^\/app\/(.*)\.(css|less)$/i,
                //css文件会做csssprite处理
                useSprite : true,
                release : '/$1.$2'
            },
            {
                //前端模板
                reg: /^\/app\/(.*)\.tmpl$/i,
                //当做类js文件处理，可以识别__inline, __uri等资源定位标识
                isJsLike: true,
                release: "$1.tmpl.js"
            },
            {
                reg : /\/app\/(.*)\.(html|jsp|tpl|vm|htm|asp|aspx)/,
                useCache : false,
                release : '/$1.$2'
            },
            {
                reg : /^\/app\/(.*)$/i,
                useCache : false,
                release : '$1'
            },
            {
                reg : /^\/app_lib\/(.*)$/i,
                useCache : false,
                release : '/lib/$1'
            },
            {
                reg : /^\/app_server\/(.*)$/i,
                useCompile : false,
                release : '/server/$1'
            },
            {
                reg : /^\/app_modules\/(.*)$/i,
                useCache : false,
                release : '/modules/$1'
            },
            {
                reg : /^\/pkg\/(.*)$/i,
                release : '/pkg/$1'
            },
            {
                reg : 'map.json',
                release : '/map.json'
            },
            {
                reg : "**",
                release : false
            }
        ]
    },
    settings: {
        postprocessor: {
            jswrapper: {
                type: 'amd'
            }
        },
        parser: {
            // nunjucks : {
            //     name:function(file){},
            //     env : {
            //         tags : {
            //             blockStart: '{%',
            //             blockEnd: '%}'
            //         }
            //     }
            // }
        },
        jshint : {
            //using Chinese reporter
            i18n : 'zh-CN',
            camelcase : true,
            curly : true,
            eqeqeq : true,
            forin : true,
            immed : true,
            latedef : true,
            newcap : true,
            noarg : true,
            noempty : true,
            node : true
        }
    }
});