<script setup lang="ts">
import type { PageData } from "../types";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import AnimatedHeader from "./AnimatedHeader.vue";

const pageData = useState<PageData | null>("pageData", () => null);

await callOnce(async () => {
  const POSTS_QUERY = groq`*[_type == "page" && _id == "singleton-homepage"][0] {
        title,
        tagline,
        subtitle,
        date,
        "post": pageBuilder[]-> {
            _id,
            title,
            tageline,
                "directors": directorList[]-> {
                    name,
                    image
                },
            date,
            image,
            content
        },
        aboutSection
      }`;

  const { data, error } = await useSanityQuery<PageData>(POSTS_QUERY);
  pageData.value = data.value;
});

const { projectId, dataset } = useSanity().client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const openMovie = (event: MouseEvent, id: string) => {
  navigateTo(`/movie/${id}`);
};
</script>

<template>
  <div class="w-full relative">
    <div
      v-if="pageData"
      class="h-[90vh] w-full flex items-center justify-center"
    >
      <div>
        <h2
          :class="`text-white text-[10vw] font-black uppercase block text-center`"
        >
          <AnimatedHeader :title="pageData.title" />
        </h2>
        <h3
          class="text-white text-4xl leading-5xl font-normal block text-center mt-10"
        >
          <AnimatedHeader :title="pageData.tagline" />
        </h3>
      </div>
    </div>
    <div class="container mx-auto">
      <h3
        class="text-white text-3xl leading-relaxed font-black uppercase block text-center"
      >
        {{ pageData?.subtitle }}
      </h3>
      <p
        class="text-white text-lg py-2 my-4 border-y border-white/20 border-solid block w-[200px] mx-auto text-center"
      >
        {{ pageData?.date }}
      </p>
      <div
        v-if="pageData!.post.length > 0"
        v-for="block in pageData?.post"
        :key="block?._id"
      >
        <h4
          @click="(event) => openMovie(event, block?._id)"
          class="text-white cursor-pointer text-4xl md:text-9xl font-black uppercase block text-center"
        >
          {{ block?.title }}
        </h4>
        <div class="block w-full flex items-center justify-center my-20">
          <div
            v-if="block?.directors.length > 0"
            v-for="direct in block?.directors"
            :key="direct?._id"
            class="flex items-center w-full md:w-auto"
          >
            <div
              class="text-white w-[50px] h-[50px] rounded-full !bg-cover grayscale"
              :style="{
                background: `url(${
                  urlFor(direct.image)
                    ? urlFor(direct.image)?.url()
                    : 'https://placehold.co/200'
                }) center center no-repeat`,
              }"
            ></div>
            <p class="text-gray-400 text-md capitalize ml-4 mr-8">
              {{ direct.name }}
            </p>
          </div>
        </div>
        <div
          @click="(event) => openMovie(event, block?._id)"
          class="w-full md:w-2/3 mx-auto !bg-cover aspect-video rounded-lg overflow-hidden bg-white cursor-pointer"
          :style="{
            background: `url(${
              urlFor(block?.image)
                ? urlFor(block?.image)?.url()
                : 'https://placehold.co/1920x1080'
            }) center center no-repeat`,
          }"
        ></div>
      </div>
    </div>
  </div>
</template>
