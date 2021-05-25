<template>
  <header>
    <div class="p-5 text-center">
      <router-link class="border-1 ring-yellow-400 p-2 mx-2 rounded-lg hover:bg-yellow-200" to="/">DomRecycle</router-link>
      <router-link class="border-1 ring-yellow-400 p-2 mx-2 rounded-lg hover:bg-yellow-200" to="/basic">Basic Infinite Scroll</router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: "NavBar"
};
</script>