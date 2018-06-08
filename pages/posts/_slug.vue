<template>
  <section class="section">
    <div class="container">
      <header class="post-header">
        <h1 class="title is-2">{{ title }}</h1>
        <template v-for="tag in tags">
          <span :key="tag" class="tag is-primary">{{ tag }}</span>
        </template>
      </header>
      <div class="content">
        <Content :id="slug"/>
      </div>
    </div>
  </section>
</template>

<script>
import Content from '~/components/Content.vue'
import client from '~/plugins/contentful'

export default {
  components: {
    Content
  },
  async asyncData(ctx) {
    const slug = ctx.route.params.slug
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
      tags: entry.fields.tags,
      createdAt: entry.sys.createdAt,
      slug
    }
  }
}
</script>

<style>
.post-header {
  margin: 1rem;
  padding-bottom: 0.2rem;
  border-bottom: 1px solid #ccc;
}
</style>


