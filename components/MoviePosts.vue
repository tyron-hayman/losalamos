<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const pageData = useState<any>();

await callOnce(async () => {
  const POSTS_QUERY = groq`*[_type == "post"] {
        title,
        image,
      }`;

  const { data, error } = await useSanityQuery<SanityDocument[]>(POSTS_QUERY);
  pageData.value = data;
});

const { projectId, dataset } = useSanity().client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;
</script>

<template>
  <div class="container mx-auto relative flex flex-wrap gap-5">
    <div
      v-if="pageData"
      v-for="block in pageData"
      :key="block?._id"
      class="rounded-lg w-1/2 aspect-video !bg-cover"
      :style="{
        background: `url(${
          urlFor(block?.image)
            ? urlFor(block?.image)?.url()
            : 'https://placehold.co/1920x1080'
        }) center center no-repeat`,
      }"
    ></div>
  </div>
</template>
