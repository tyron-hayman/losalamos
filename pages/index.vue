<script setup lang="ts">
import FooterForm from "~/components/FooterForm.vue";
import HeroBlock from "~/components/HeroBlock.vue";
import GlobalFooter from "~/components/GlobalFooter.vue";
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
  <HeroBlock />
  <FooterForm />
  <GlobalFooter />
</template>
