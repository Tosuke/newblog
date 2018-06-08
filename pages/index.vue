<template>
  <section class="section">
    <div class="container">
      <template v-for="post in posts">
        <div :key="post.sys.id" class="card article">
          <div class="card-content">
            <div class="container">
              <nuxt-link :to="`/posts/${post.fields.slug}`">
                <h1 class="card-header-title title">{{ post.fields.title }}</h1>
              </nuxt-link>
              <template v-for="tag in post.fields.tags">
                <span :key="tag" class="tag is-primary">{{ tag }}</span>
              </template>
              <div class="content">
                <p class="subtitle">{{ post.fields.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<script>
import client from '~/plugins/contentful'

export default {
  async asyncData() {
    const { items } = await client.getEntries({
      'content_type': 'post',
      order: '-sys.createdAt',
      limit: 10,
      select: [
        'sys.createdAt',
        'fields.title',
        'fields.tags',
        'fields.author',
        'fields.heroImage',
        'fields.description'
      ]
    })

    return {
      posts: items
    }
  }
}
</script>

<style>
.article {
  margin: 3rem 0;
}
</style>

