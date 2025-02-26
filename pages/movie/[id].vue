<script setup lang="ts">
import { ref } from "vue";
import type { SanityDocument } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Lenis from "lenis";
import { animate } from "motion";
import Loader from "~/components/Loader.vue";
import { PortableText } from '@portabletext/vue'

const pageData = useState<any>();
const responses = useState<any>("response-array", () => []);
const loader = useState<boolean>("loader-gem", () => false);
const prompt = ref();
const route = useRoute();
const gemResponseBox = ref();
const starterPromps: any = [
  "Where was this scene filmed?",
  "Who was responsible for color grading?",
  "What lens was used for this scene?",
];
let lenis: any;

onMounted(() => {
  // Initialize Lenis
  lenis = new Lenis({
    autoRaf: true,
  });
  // Listen for the scroll event and log the event data
  lenis.on("scroll", (e: any) => {});
});

await callOnce(async () => {
  const POSTS_QUERY = groq`*[_type == "post" && _id == "${route.params.id}"] {
        title,
        content,
        image,
        release,
        tagline,
        "directors": directorList[]-> {
            name,
            image
        },
      }`;

  const { data, error } = await useSanityQuery<SanityDocument[]>(POSTS_QUERY);
  pageData.value = data;
});

const { projectId, dataset } = useSanity().client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const handleGemini = async (event: Event) => {
  const e = event as SubmitEvent;
  e.preventDefault();
  loader.value = true;

  responses.value.push({
    position: "justify-self-start",
    color: "bg-blue-500",
    width: "w-full md:w-4/12",
    response: prompt.value,
  });

  try {
    const the_prompts = `In regards to ${
      pageData.value[0].title +
      " and " +
      pageData.value[0].tagline +
      " " +
      prompt.value
    }`;
    const response: any = await $fetch("/api/gemini", {
      method: "POST", // Assuming you want to POST data
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        data: encodeURIComponent(the_prompts),
      },
    });

    responses.value.push({
      position: "justify-self-end",
      color: "bg-zinc-950",
      width: "w-full md:w-7/12",
      response: response.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-black">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="italic font-bold">$1</em>')
        .replace(
          /^\s*\* (.*)$/gm,
          '<strong class="block mt-5 last:mb-5">$1</strong>'
        ),
    });

    loader.value = false;
    prompt.value = "";
  } catch (error) {
    alert(`There was an error: ${error}`);
  } finally {
    let body = document.body,
      html = document.documentElement;
    let targetScroll = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight,
      10000
    );
    lenis.scrollTo(targetScroll);
  }
  return false;
};


</script>

<template>
  <div v-if="pageData">
    <div
      :class="`container mx-auto relative pt-40`"
    >
      <h1 class="text-5xl text-white font-normal">{{ pageData[0]?.title }}</h1>
      <h2 class="text-[13vw] leading-[12vw] text-rose-600 mb-40 font-bold capitalize">{{ pageData[0]?.tagline }}</h2>

      <div
        :class="`w-2/3 mx-auto aspect-video z-[1] !bg-cover`"
        :style="{
          background: `url(${
              urlFor(pageData[0]?.image)
                ? urlFor(pageData[0]?.image)?.url()
                : 'https://placehold.co/1920x1080'
            }) center center no-repeat`,
        }"
      ></div>
      <div class="textBlock w-2/3 mx-auto my-40">
        <PortableText :value="pageData[0]?.content" />
      </div>
    </div>
      <div class="fixed z-index-[1] inset-x-0 bottom-10 flex justify-center">
        <form
          @submit="handleGemini"
          class="w-full md:w-[500px] bg-zinc-950 p-10 flex flex-col"
        >
          <label for="prompt" class="text-white text-lg mb-5">
            {{ starterPromps[Math.floor(Math.random() * starterPromps.length)] }}
          </label>
          <input
            v-model="prompt"
            type="text"
            id="prompt"
            name="prompt"
            class="bg-zinc-950 text-white border-b-2 border-white p-2"
          />
          <button
            type="submit"
            class="bg-blue-500 text-white p-2 mt-5"
          >
            Submit
          </button>
        </form>
      </div>
  </div>
  <Loader v-else />
  <FooterForm />
  <GlobalFooter />
</template>
