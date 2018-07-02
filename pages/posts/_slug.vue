<template>
  <section class="section">
    <div class="container">
    <header class="post-header">
      <p class="has-text-grey-dark is-size-6">{{ createdAt | formatDate }}</p>
      <h1 class="has-text-weight-bold is-size-3">{{ title }}</h1>
      <h2 class="has-text-weight-semibold is-size-5">{{ summary }}</h2>
      <Tag v-for="tag in tags" :key="tag" :name="tag"/>
    </header>
    <Content class="content" :html="content"/>
    </div>
  </section>
</template>

<script>
import Tag from '~/components/Tag.vue'
import Content from '~/components/Content'
import client from '~/plugins/contentful'
import { get } from '~/plugins/contentCache'
import formatDate from '~/plugins/formatDate'

import axios from 'axios'

export default {
  components: {
    Tag,
    Content
  },
  filters: {
    formatDate
  },
  validate({ params }) {
    const slug = params.slug
    return slug && /^[a-zA-Z0-9_\-]+$/.test(slug)
  },
  async asyncData({ params, ...ctx }) {
    const slug = params.slug

    const { meta: entry, content } = await get(slug).catch(err => {
      ctx.error({
        statusCode: 404
      })
    })

    return {
      title: entry.fields.title,
      summary: entry.fields.summary,
      tags: entry.fields.tags,
      createdAt: entry.sys.createdAt,
      heroImage: entry.fields.heroImage,
      slug,
      content
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
          content: `${process.env.URL}/posts/${this.slug}`
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.summary
        },
        ...(this.heroImage
          ? [
              {
                hid: 'og:image',
                property: 'og:image',
                content: 'https:' + this.heroImage.fields.file.url
              }
            ]
          : [])
      ]
    }
  }
}
</script>

<style src="prismjs/themes/prism-tomorrow.css"/>

<style scoped>
.post-header {
  margin-bottom: 0.75rem;
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
