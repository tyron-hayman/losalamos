<script setup lang="ts"></script>

<template>
  <div class="fixed top-0 inset-x-0 z-[100] bg-gradient-to-b from-zinc-950 from-60% to-black/0">
    <div class="container mx-auto py-10 flex items-center justify-between">
      <a
        href="/"
        class="text-white uppercase font-bold text-lg flex items-center gap-2"
      >
        <span>L0s-4lamos</span>
        <span
          class="bg-blue-500 px-2 py-1 text-white text-sm font-bold rounded-lg"
          >BETA</span
        >
      </a>
      <div class="flex items-center gap-10">
        <NuxtLink class="text-white text-lg capitalize font-bold" to="/explore">Explore</NuxtLink>
      </div>
    </div>
  </div>
</template>
