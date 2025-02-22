<script setup lang="ts">
import MoviePosts from "~/components/MoviePosts.vue";
import Lenis from "lenis";

onMounted(() => {
  // Initialize Lenis
  const lenis = new Lenis({
    autoRaf: true,
  });
  // Listen for the scroll event and log the event data
  lenis.on("scroll", (e) => {});
});
</script>

<template>
    <div class="container mx-auto my-40">
        <div class="mb-20">
            <h1 class="text-8xl text-white uppercase font-black">Explore</h1>
        </div>
        <div class="w-full">
            <MoviePosts />
        </div>
    </div>
</template>
