// Ordinarily, you'd generate this data from markdown files in your
// repo, or fetch them from a database of some kind. But in order to
// avoid unnecessary dependencies in the starter template, and in the
// service of obviousness, we're just going to leave it here.

// This file is called `_posts.js` rather than `posts.js`, because
// we don't want to create an `/blog/posts` route — the leading
// underscore tells Sapper not to do that.

const fs = require('fs');
const frontMatter = require('front-matter');
const marked = require('marked');

const renderer = new marked.Renderer();

renderer.image = (href, title, text) => {
  text = typeof text === 'string' ? text : 'no description';
  return `<img loading="lazy" src="${href}" alt="${text}" width="800" height="800">`;
  // If you use lazysizes, you need to return something in the following format
  // return `<img class="lazyload" src="${href}" alt="${text}" width="800" height="800">`;
};
  
const posts = fs.readdirSync('./src/posts').map(postFilename => {
  const postContent = fs.readFileSync(`./src/posts/${postFilename}`, {
    encoding: 'utf8'
  });
  const postFrontMatter = frontMatter(postContent);
  return {
    title: postFrontMatter.attributes.title,
    slug: postFrontMatter.attributes.slug,
    html: marked(postFrontMatter.body, {renderer})
  }
});

posts.forEach(post => {
	post.html = post.html.replace(/^\t{3}/gm, '');
});

export default posts;
