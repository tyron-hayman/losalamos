<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
const userProfileImage = useState<any | string>()

console.log(userProfileImage)
</script>

<template>
    <div class="fixed top-0 inset-x-0">
      <div class="container mx-auto py-10 flex items-center justify-between">
        <a href="/" class="text-white uppercase font-bold text-lg">
            L0s-4lamos
        </a>
        <div class="flex items-center gap-10">
            <a href="#" class="text-white text-lg border border-white rounded-lg border-solid py-2 px-5 hover:bg-white hover:text-black transition-all duration-500">
                Submit a site
            </a>
            <a href="#" class="text-white text-xl">
                <font-awesome icon="bars-staggered" />
            </a>
        </div>
      </div>
    </div>
  </template>
  