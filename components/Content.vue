<template>
  <component :is="currentComponent"/>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    currentComponent() {
      const id = this.id // dirty hack for reactive system
      return () => import(`~/assets/posts/${id}.md`)
    }
  }
}
</script>

