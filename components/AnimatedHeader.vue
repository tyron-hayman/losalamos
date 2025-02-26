<script setup lang="ts">
import { animate } from 'motion';
import type { AnimationSequence } from 'motion';
import { defineProps } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: 'Default Title',
  },
  classes: {
    type: String,
    default: 'w-full relative',
  },
  font_size: {
    type: String,
    default: 'text-[10vw]',
  },
});

const titleArr: string[] = props.title.split(''); // Type titleArr as string[]

async function onEnter(el: Element, onComplete: () => void): Promise<void> {
  const sequence: AnimationSequence = [
    [el, { opacity: 1 }, { duration: 0.5 }], // Fade in the h2
    [el.querySelectorAll('span'), { y: 0, opacity: 1 }, { duration: 0.8 }], // Animate spans up
  ];

  await animate(sequence);
  onComplete();
}
</script>

<template>
  <div :class="classes">
    <Transition :css="false" @enter="onEnter">
      <h2
        :class="`text-white ${font_size} font-black uppercase block text-center opacity-0`"
      >
        <span
          v-for="(word, index) in titleArr"
          :key="index"
          :class="`inline-block translate-y-[100px] opacity-0 ${
            index % 2 === 0 ? 'text-rose-600' : 'text-white'
          }`"
        >
          {{ word }}
        </span>
      </h2>
    </Transition>
  </div>
</template>