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

export default {
  components: {
    Tag
  },
  async asyncData({ params, ...ctx }) {
    const slug = params.slug
    if (!slug) {
      ctx.redirect('/')
    }
    
    const component = import(`~/assets/posts/${slug}.md`).catch(() => {})
    const entry = await import(`~/assets/posts/${slug}.json`).catch(() => {})

    if (!entry) {
      ctx.error({
        statusCode: 404
      })
      return
    }

    return {
      title: entry.fields.title,
      tags: entry.fields.tags,
      createdAt: entry.sys.createdAt,
      slug,
      component: () => component
    }
  }
}
</script>

<style scoped>
.post-header {
  margin: 1rem;
  padding-bottom: 0.2rem;
  border-bottom: 1px solid #ccc;
}
</style>


