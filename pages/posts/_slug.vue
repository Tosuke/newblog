<template>
  <section class="section">
    <div class="container">
      <header class="post-header">
        <h1 class="title is-2">{{ title }}</h1>
        <Tag v-for="tag in tags" :key="tag" :name="tag"/>
      </header>
      <div class="content">
        <Content :id="slug"/>
      </div>
    </div>
  </section>
</template>

<script>
import Content from '~/components/Content.vue'
import Tag from '~/components/Tag.vue'
import client from '~/plugins/contentful'

export default {
  components: {
    Content, Tag
  },
  async asyncData({ params, ...ctx}) {
    const slug = params.slug
    if (!slug) {
      ctx.redirect('/')
    }

    const entries = await client.getEntries({
      content_type: 'post',
      order: 'sys.createdAt',
      'fields.slug': slug,
      select: [
        'sys.createdAt',
        'fields.author',
        'fields.title',
        'fields.tags',
        'fields.heroImage'
      ].join(',')
    })
    if (entries.items.length === 0) {
      ctx.error({
        statusCode: 404
      })
      return
    }

    const entry = entries.items[0]

    return {
      title: entry.fields.title,
      tags: [...entry.fields.tags, 'hogepiyo'],
      createdAt: entry.sys.createdAt,
      slug
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


