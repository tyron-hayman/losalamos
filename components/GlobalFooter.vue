<script setup lang="ts">
const date = new Date();
</script>

<template>
  <div class="w-full mb-40">
    <div class="container mx-auto flex flex-wrap items-start justify-between">
      <p class="text-md font-normal text-white mb-5 md:mb-0">
        Los4lamos {{ date.getFullYear() }}
      </p>
      <p class="text-md font-normal text-white">
        Movie content is owned by its respective owners.
      </p>
    </div>
  </div>
</template>
