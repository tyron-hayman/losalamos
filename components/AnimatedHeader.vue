<script setup lang="ts">
import { inView } from "motion";
import type { ElementOrSelector } from "motion";
import { defineProps, ref, useTemplateRef, onMounted, onUnmounted } from "vue";

const isInView: globalThis.Ref<boolean, boolean> = ref(false);
const container: any = useTemplateRef("container");
const props = defineProps({
  title: {
    type: String,
    default: "Default Title",
  },
  classes: {
    type: String,
    default: "w-full relative",
  },
  font_size: {
    type: String,
    default: "text-[10vw]",
  },
});
const titleArr = props.title.split(" ");
let stopViewTracking: any;

onMounted(() => {
  stopViewTracking = inView(container.value, () => {
    isInView.value = true

    return () => {
      isInView.value = false
    }
  })
})
  
onUnmounted(() => stopViewTracking())

</script>

<template>
  <div ref="container" :class="classes">
    <h2
      :class="`text-white ${font_size} font-black uppercase block text-center`"
    >
      <span
        v-for="(word, index) in titleArr"
        :key="index"
        :class="`inline-block overflow-hidden text-white mr-4`"
      >
        <span
          :class="`inline-block tranistion-all duration-700 ${
            isInView
              ? 'translate-y-[0px] opacity-1'
              : 'translate-y-[100px] opacity-0'
          }`"
          :style="{
            transitionDelay: `${index * 0.05}s`,
            WebkitTransitionDelay: `${index * 0.05}s`
          }"
        >
          {{ word }}
        </span>
      </span>
    </h2>
  </div>
</template>
