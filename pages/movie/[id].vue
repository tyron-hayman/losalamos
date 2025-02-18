<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Button from "~/components/ui/button/Button.vue";

const pageData = useState<any>()
const route = useRoute()
const config = useRuntimeConfig()
console.log(config.public.gemini_api)

await callOnce(async () => {

    const POSTS_QUERY = groq`*[_type == "post" && _id == "${route.params.id}"] {
        title,
        image,
        release,
        "directors": directorList[]-> {
            name,
            image
        },
      }`;

    const { data, error } = await useSanityQuery<SanityDocument[]>(POSTS_QUERY);
    pageData.value = data

    console.log(pageData.value)
})

const { projectId, dataset } = useSanity().client.config();
const urlFor = (source: SanityImageSource) => projectId && dataset ? imageUrlBuilder({ projectId, dataset }).image(source) : null;

</script>

<template>
    <div v-if="pageData">
        <div class="relative container min-h-screen mx-auto items-end flex justify-between">
            <div class="w-full flex flex-wrap justify-items-start gap-5">
                <div class="full">
                    <h2 class="w-1/2 text-white text-[10vw] leading-[9vw] font-black block">{{ pageData[0].title }}</h2>
                    <div class="block w-1/2 flex items-center justify-start my-5">
                        <div 
                            v-if="pageData[0]?.directors.length > 0"
                            v-for="direct in pageData[0]?.directors" :key="direct?._id"
                            class="flex items-center"
                        >
                            <div
                                class="text-white w-[50px] h-[50px] rounded-full !bg-cover grayscale"
                                :style="{
                                    background : `url(${urlFor(direct.image) ? urlFor(direct.image)?.url() : 'https://placehold.co/200'}) center center no-repeat`
                                }"
                            ></div>
                            <p class="text-gray-400 text-md capitalize ml-4 mr-8">{{ direct.name }}</p>
                        </div>
                    </div>
                </div>
                <div class="w-full my-10">
                    <form>
                        <div class="rounded-3xl bg-zinc-900 overflow-hidden flex justify-between">
                            <input type="text" class="w-full block p-5 text-xl text-white bg-transparent border-none" :placeholder="`What would you like to learn about ${pageData[0].title}?`" />
                            <Button class="bg-blue-500 text-white text-2xl py-5 px-20 m-1 rounded-3xl h-full">Ask</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div v-else>Loading</div>
</template>