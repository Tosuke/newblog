<template>
  <div>
    <Header/>
    <main>
      <nuxt/>
    </main>
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
export default {
  components: {
    Header
  }
}
</script>
