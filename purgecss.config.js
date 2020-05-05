class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-z0-9-:\\/]+/g)
  }
}

var emailCtaClass = [
  "border-solid",
  "border-4",
  "w-full",
  "mt-5"
]

module.exports = {
  content: [
    './src/**/*.vue',
    './src/**/*.js',
    './src/**/*.jsx',
    './src/**/*.html',
    './src/**/*.pug',
    './src/**/*.md',
    './docs/**/*.md',
    './blog/**/*.md',
  ],
  whitelist: [
    ...emailCtaClass,
    'body',
    'html',
    'img',
    'a',
    'g-image',
    'g-image--lazy',
    'g-image--loaded',
    'active',
  ],
  extractors: [
    {
      extractor: TailwindExtractor,
      extensions: ['vue', 'js', 'jsx', 'md', 'html', 'pug'],
    },
  ],
}
