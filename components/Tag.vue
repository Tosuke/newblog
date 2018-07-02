<template functional>
  <nuxt-link :to="`/tags/${props.name}`">
    <span class="tag is-primary margin">{{ props.name }}</span>
  </nuxt-link>
</template>

<style scoped>
.margin {
  margin: 0.2rem;
}
</style>


