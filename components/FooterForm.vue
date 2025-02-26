<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";
import { Button } from "@/components/ui/button";

const pageData = useState<any>();

await callOnce(async () => {
  const POSTS_QUERY = groq`*[_type == "footer"][0] {
        title,
        conent,
        formTitle,
        formDisclaimer
      }`;

  const { data, error } = await useSanityQuery<SanityDocument[]>(POSTS_QUERY);
  pageData.value = data;
});
</script>

<template>
  <div class="w-full mt-80 mb-40">
    <div
      v-if="pageData"
      class="container mx-auto flex flex-wrap items-start justify-between"
    >
      <h2 class="block w-full text-5xl md:text-8xl font-bold uppercase text-white mb-32">
        {{ pageData.title }}
      </h2>
      <div class="w-full md:w-6/12 mb-10 md:mb-0">
        <p class="text-3xl font-normal leading-relaxed text-white">
          {{ pageData.conent }}
        </p>
      </div>
      <div class="w-full md:w-5/12">
        <h3 class="text-5xl font-bold captilize mb-5 text-white">
          {{ pageData.formTitle }}
        </h3>
        <form class="my-5">
          <input
            type="text"
            class="block w-full rounded-full p-4 bg-gray-800 text-white"
            placeholder="Your email*"
          />
          <Button
            class="bg-white py-5 px-10 mt-5 text-black hover:bg-gray-800 hover:text-white transition-all duration-500 rounded-full text-lg font-normal"
            >Sign Up</Button
          >
        </form>
        <p class="text-sm font-normal captilize mb-5 text-gray-500">
          {{ pageData.formDisclaimer }}
        </p>
      </div>
    </div>
  </div>
</template>
