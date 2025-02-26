<script setup lang="ts">
const date = new Date();
</script>

<template>
  <div class="w-full mb-40">
    <div class="container mx-auto pt-10 flex flex-wrap items-start justify-between border-t border-white/10 border-solid">
      <p class="text-md font-normal text-gray-500 mb-5 md:mb-0">
        Los4lamos {{ date.getFullYear() }}
      </p>
      <p class="text-md font-normal text-gray-500">
        Movie content is owned by its respective owners.
      </p>
    </div>
  </div>
</template>
