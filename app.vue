<script setup lang="ts">
import GlobalNav from "./components/GlobalNav.vue";
import Lenis from "lenis";
import { animate } from "motion";
import { ref } from "vue";

const show = useState<boolean>("appear", () => false);

async function onEnter(el: any, onComplete: any) {
  await animate(el, { opacity: 1 }, { duration: 1 });
  onComplete();
}
async function onLeave(el: any, onComplete: any) {
  await animate(el, { opacity: 0 }, { duration: 1 });
  onComplete();
}

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
  <GlobalNav />
  <Transition
    :css="false"
    appear
    @enter="onEnter"
    @leave="onLeave"
    mode="out-in"
  >
    <div class="opacity-0">
      <NuxtPage />
    </div>
  </Transition>
</template>
