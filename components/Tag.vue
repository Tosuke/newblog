<template>
  <nuxt-link :to="`/tags/${name}`">
    <span class="tag is-primary margin">{{ name }}</span>
  </nuxt-link>
</template>

<script>
export default {
  props: ['name']
}
</script>

<style scoped>
.margin {
  margin: 0.2rem;
}
</style>


