<template>
  <section class="section">
    <div class="container">
      <header class="post-header">
        <h1 class="title is-2">{{ title }}</h1>
        <Tag v-for="tag in tags" :key="tag" :name="tag"/>
      </header>
      <div class="content">
        <component :is="component"/>
      </div>
    </div>
  </section>
</template>

<script>
import Tag from '~/components/Tag.vue'
import client from '~/plugins/contentful'
import { get } from '~/plugins/contentCache'

export default {
  components: {
    Tag
  },
  async asyncData({ params, ...ctx }) {
    const slug = params.slug
    if (!slug) {
      ctx.redirect('/')
    }

    const entry = await get(slug).meta.catch(() => {})

    if (!entry) {
      ctx.error({
        statusCode: 404
      })
      return
    }

    return {
      title: entry.fields.title,
      summary: entry.fields.summary,
      tags: entry.fields.tags,
      createdAt: entry.sys.createdAt,
      heroImage: entry.fields.heroImage,
      slug
    }
  },
  data() {
    return {
      component: get(this.$route.params.slug).component
    }
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.summary
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: `${this.title} | ${process.env.TITLE}`
        },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `https://${process.env.HOST}/posts/${this.slug}`
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.summary
        },
        ...(this.heroImage ? [{
          hid: 'og:image',
          property: 'og:image',
          content: 'https:' + this.heroImage.fields.file.url
        }] : [])
      ]
    }
  }
}
</script>

<style src="prismjs/themes/prism-tomorrow.css"/>

<style scoped>
.post-header {
  margin: 1rem;
  padding-bottom: 0.2rem;
  border-bottom: 1px solid #ccc;
}
</style>

<style>
pre[class*='language-'] .tag,
pre[class*='language-'] .number {
  align-items: stretch;
  background-color: transparent;
  border-radius: 0;
  display: inline;
  font-size: 1em;
  height: auto;
  justify-content: flex-start;
  line-height: normal;
  padding: 0;
  white-space: pre;
  margin-right: 0;
  min-width: auto;
  text-align: left;
  vertical-align: baseline;
}
</style>
