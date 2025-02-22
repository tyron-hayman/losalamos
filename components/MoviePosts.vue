<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { animate } from "motion";

const pageData = useState<any>();

await callOnce(async () => {
  const POSTS_QUERY = groq`*[_type == "post"] {
        title,
        image,
        release,
        tagline
      }`;

  const { data, error } = await useSanityQuery<SanityDocument[]>(POSTS_QUERY);
  pageData.value = data;
});

const { projectId, dataset } = useSanity().client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

async function onEnter(el: any) {
  await animate(el.querySelectorAll("div"), { opacity: 1 });
}
</script>

<template>
<Transition :css="false" @enter="onEnter">
  <div class="container mx-auto relative md:grid grid-cols-3 gap-5">
      <div
        v-if="pageData"
        v-for="block in pageData"
        :key="block?._id"
        class="w-full mb-10 md:mb-0"
      >
        <div
          class="rounded-lg w-full aspect-video !bg-cover mb-5"
          :style="{
            background: `url(${
              urlFor(block?.image)
                ? urlFor(block?.image)?.url()
                : 'https://placehold.co/1920x1080'
            }) center center no-repeat`,
          }"
        ></div>
        <p class="text-md text-white font-black mb-2">
          {{ block?.title }} - {{ block?.release }}
        </p>
        <p class="text-md text-zinc-500 font-normal">{{ block?.tagline }}</p>
      </div>
  </div>
</Transition>
</template>
