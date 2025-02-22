<script setup lang="ts">
import { ref } from "vue";
import type { SanityDocument } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Lenis from "lenis";
import { animate } from "motion";

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
      class="relative container min-h-screen mx-auto items-end flex justify-between flex-wrap"
    >
      <div class="w-full">
        <div
          class="w-full sticky top-0 pt-[100px] pb-10 bg-gradient-to-b from-zinc-950 from-85% to-black/0"
        >
          <h2
            :class="`w-full md:w-2/3 text-zinc-700 ${
              responses.length > 0 ? 'text-xl' : 'text-3xl md:text-6xl'
            } leading-[1] font-black block transition-all duration-500 uppercase`"
          >
            {{ pageData[0].title }}
          </h2>
          <h3
            :class="`w-full md:w-2/3 text-white ${
              responses.length > 0 ? 'text-4xl' : 'text-6xl md:text-8xl'
            } leading-[1] font-black block transition-all duration-500`"
          >
            {{ pageData[0].tagline }}
          </h3>
          <div class="block w-full md:w-1/2 flex items-center justify-start my-5">
            <div
              v-if="pageData[0]?.directors.length > 0"
              v-for="direct in pageData[0]?.directors"
              :key="direct?._id"
              class="flex items-center"
            >
              <div
                class="text-white w-[50px] h-[50px] rounded-full !bg-cover grayscale mr-5 md:mr-0"
                :style="{
                  background: `url(${
                    urlFor(direct.image)
                      ? urlFor(direct.image)?.url()
                      : 'https://placehold.co/200'
                  }) center center no-repeat`,
                }"
              ></div>
              <p class="hidden md:block text-gray-400 text-md capitalize ml-4 mr-8">
                {{ direct.name }}
              </p>
            </div>
            <p class="grow text-md bg-zinc-800 text-zinc-500 rounded-lg p-2">
              Responses may contain errors.
            </p>
          </div>
        </div>
        <Transition :css="false">
        <div ref="gemResponseBox" :class="`gemResponseBox w-full pt-4 ${responses.length > 0 ? 'pb-40' : 'pb-28'} }`">
              <div
                v-if="responses.length > 0"
                v-for="response in responses"
                :key="response.position"
                :class="`w-full grid mb-10`"
              >
                <div
                  :class="`${response.width} ${response.color} p-5 rounded-3xl ${response.position} border-white/5 border border-solid`"
                >
                  <p
                    class="text-white text-lg leading-relaxed font-normal"
                    v-html="response.response"
                  ></p>
                </div>
              </div>
        </div>
      </Transition>
      </div>
    </div>
    <div class="fixed inset-x-0 bottom-0 z-[5]">
      <div class="bg-gradient-to-t from-zinc-950 from-70% to-black/0 w-full">
        <form
          class="container mx-auto p-10"
          @submit="(event) => handleGemini(event)"
        >
          <div
            class="rounded-3xl bg-gray-800 overflow-hidden flex justify-between w-full items-center"
          >
            <input
              v-model="prompt"
              type="text"
              class="w-full block p-5 text-xl text-white bg-transparent border-none"
              :placeholder="`What would you like to learn about ${pageData[0].title}?`"
              :disabled="loader ? true : false"
            />
            <span
              :class="`${
                loader ? 'opacity-100' : 'opacity-0'
              } gem_loader transition-all duration-500 mr-10`"
            ></span>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
