<script setup lang="ts">
import { gsap } from "gsap";
import type { ElementOrSelector } from "motion";
import { defineProps, ref, useTemplateRef, onMounted, onUnmounted } from "vue";

const isInView: globalThis.Ref<boolean, boolean> = ref(false);
const container: any = ref();
const props = defineProps({
  title: {
    type: String,
    default: "Default Title",
  },
});
const titleArr: RegExpMatchArray | null = props.title.match(/[^\s]+|\s+/g);

onMounted(() => {
  let targets = gsap.utils.toArray(container.value.children);
  targets.forEach((el: any, index : number) => {
    gsap.from(el.children, {
      y: 200,
      opacity: 0,
      filter: "blur(10px)",
      duration : 0.75,
      delay : 0.05 * index
    });
  });
});
</script>

<template>
    <span
      ref="container"
    >
      <span
        v-for="(word, index) in titleArr"
        :key="index"
        :class="`inline-block overflow-hidden text-white`"
      >
        <span
          :class="`inline-block`"
        >
          {{ word.replace(/\s/g, "&nbsp;") }}
        </span>
      </span>
    </span>
</template>
