<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const pageData = useState<any>()
const today = useState<any>();

await callOnce(async () => {

    const POSTS_QUERY = groq`*[_type == "page"][0]{
        title,
        tagline,
        subtitle,
        date,
        pageBuilder[] {
        ...,
            "post": *[_type == "post"][0] {
                title,
                tageline,
                    "directors": directorList[]-> {
                        name,
                        image
                    },
                date,
                image,
                content
            }
        }
      }`;

    const { data, error } = await useSanityQuery<SanityDocument[]>(POSTS_QUERY);
    pageData.value = data
    today.value = new Date();
    console.log(data)
})

const { projectId, dataset } = useSanity().client.config();
const urlFor = (source: SanityImageSource) => projectId && dataset ? imageUrlBuilder({ projectId, dataset }).image(source) : null;

</script>

<template>
<div class="w-full relative">
    <div v-if="pageData" class="h-[90vh] w-full flex items-center justify-center">
        <div>
            <h2 class="text-white text-[10vw] font-black uppercase block text-center">{{ pageData.title }}</h2>
            <h3 class="text-white text-4xl leading-5xl font-normal block text-center mt-10">{{ pageData.tagline }}</h3>
        </div>
    </div>
    <div class="container mx-auto">
        <h3 class="text-white text-3xl leading-relaxed font-black uppercase block text-center">{{ pageData.subtitle }}</h3>
        <p class="text-white text-lg py-2 my-4 border-y border-white/20 border-solid block w-[200px] mx-auto text-center">{{ pageData.date }}</p>
        <div 
        v-if="pageData.pageBuilder.length > 0"
        v-for="block in pageData.pageBuilder" :key="block.post?._id"
        >
            <h4 class="text-white text-9xl font-black uppercase block text-center">{{  block.post?.title  }}</h4>
            <div class="block w-full flex items-center justify-center my-20">
                <div 
                    v-if="block.post?.directors.length > 0"
                    v-for="direct in block.post?.directors" :key="direct?._id"
                    class="flex items-center"
                >
                    <div
                        class="text-white w-[75px] h-[75px] rounded-full !bg-cover"
                        :style="{
                            background : `url(${urlFor(direct.image) ? urlFor(direct.image)?.url() : 'https://placehold.co/200'}) center center no-repeat`
                        }"
                    ></div>
                    <p class="text-gray-400 text-md capitalize ml-4 mr-8">{{ direct.name }}</p>
                </div>
            </div>
            <div 
            class="w-3/4 mx-auto !bg-cover aspect-video rounded-lg overflow-hidden bg-white"
            :style="{
                background : `url(${urlFor(block.post?.image) ? urlFor(block.post?.image)?.url() : 'https://placehold.co/1920x1080'}) center center no-repeat`
            }"
            ></div>
        </div>
    </div>
</div>
</template>