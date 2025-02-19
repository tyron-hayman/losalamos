<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Button from "~/components/ui/button/Button.vue";

const contetClass = "p-10 bg-zinc-950 mt-2 rounded-lg";

onMounted(() => {});
</script>

<template>
  <div class="w-full h-screen flex items-center justify-center relative">
    <div>
      <h2 class="text-7xl text-white block font-black mb-10 uppercase">
        Los 4lamos
      </h2>
      <Tabs default-value="account" class="w-[500px]">
        <TabsList class="bg-zinc-950 w-full">
          <TabsTrigger class="w-1/2 text-xl text-zinc-500" value="account">
            Login
          </TabsTrigger>
          <TabsTrigger class="w-1/2 text-xl text-zinc-500" value="password">
            Sign Up
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <div :class="contetClass">
            <p class="text-white text-xl mb-5">Use the form below to login.</p>
            <form>
              <input
                type="text"
                class="bg-zinc-600 text-white p-2 rounded-lg w-full mb-5"
                placeholder="Email*"
              />
              <input
                type="password"
                class="bg-zinc-600 text-white p-2 rounded-lg w-full mb-5"
                placeholder="Password*"
              />
              <Button
                class="text-black bg-white py-4 px-8 text-lg hover:bg-black hover:text-white"
                >Login</Button
              >
            </form>
          </div>
        </TabsContent>
        <TabsContent value="password">
          <div :class="contetClass">
            <p class="text-white text-xl mb-5">Change your password here.</p>
            <form>
              <input
                type="text"
                class="bg-zinc-600 text-white p-2 rounded-lg w-full mb-5"
                placeholder="Name*"
              />
              <input
                type="text"
                class="bg-zinc-600 text-white p-2 rounded-lg w-full mb-5"
                placeholder="Email*"
              />
              <input
                type="password"
                class="bg-zinc-600 text-white p-2 rounded-lg w-full mb-5"
                placeholder="Password*"
              />
              <input
                type="password"
                class="bg-zinc-600 text-white p-2 rounded-lg w-full mb-5"
                placeholder="Password Confirm*"
              />
              <Button
                class="text-black bg-white py-4 px-8 text-lg hover:bg-black hover:text-white"
                >Login</Button
              >
            </form>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  </div>
</template>
