// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const tailwindcss = require("tailwindcss");

module.exports = {
  siteName: 'Kevin W. Griffin',
  siteUrl: 'https://consultwithgriff.com',
  plugins: [
    {
      use: '@gridsome/vue-remark',
      options: {
        typeName: 'Documentation', // Required
        baseDir: './docs', // Where .md files are located
        template: './src/templates/Documentation.vue', // Optional
        route: '/:permalink',
        plugins: [
          ['griffin-email-cta', {}],
          ['gridsome-plugin-remark-shiki', { theme: 'Material-Theme-Palenight', skipInline: true }]
        ],
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'blog/**/*.md',
        typeName: 'Post',
        refs: {
          tags: {
            typeName: 'Tag',
            create: true
          }
        },
        route: '/:permalink',
        remark: {
          plugins: [
            ['@noxify/gridsome-plugin-remark-embed', { 'enabledProviders': ['Youtube', 'Twitter', 'Gist'], }],
            ['griffin-email-cta', {}],
            ['gridsome-plugin-remark-youtube'],
            ['gridsome-plugin-remark-shiki', { theme: 'Material-Theme-Palenight', skipInline: false },
            ],
            ['gridsome-plugin-remark-twitter']
          ]
        }
      }
    },
    {
      use: 'gridsome-plugin-rss',
      options: {
        contentTypeName: 'Post',
        feedOptions: {
          title: 'Kevin W. Griffin | Developer, Training, Entrepreneur',
          feed_url: 'https://consultwithgriff.com/rss.xml',
          site_url: 'https://consultwithgriff.com/'
        },
        feedItemOptions: node => ({
          title: node.title,
          description: node.summary,
          url: 'https://consultwithgriff.com' + node.path,
          author: 'Kevin W. Griffin',
          date: node.date
        }),
        output: {
          dir: './static',
          name: 'rss.xml'
        }
      }
    },
    {
      use: '@gridsome/plugin-sitemap',
      options: {
        exclude: [
          "/no-more-stream-notifications/",
          "/thanks-supercharge-signup/",
          "/thanks-signalr-signup/",
          "/thanks-signup/",
          "/thanks-confirm/",
        ],
        cacheTime: 600000, // default
      }
    },
    {
      use: 'gridsome-plugin-gtag',
      options: {
        config: {
          id: 'G-G6TPE6V0YJ',
        },
      },
    }
  ],
  templates: {
    Tag: '/article-tags/:id'
  },
  transformers: {
    remark: {
      plugins: [
        ['gridsome-plugin-remark-shiki', { theme: 'Material-Theme-Palenight', skipInline: true }]
      ],
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      anchorClassName: 'icon icon-link',
    }
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          tailwindcss
        ],
      },
    },
  },
}
