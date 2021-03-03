<template>
  <div
    class="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-top justify-center flex-wrap"
  >
    <div
      class="h-16 text-2xl shadow-lg bg-indigo-500 text-white flex items-center w-full"
    >
      <h1
        class="ml-5 cursor-pointer"
        @click="$route.name !== 'Home' ? $router.push('/') : null"
      >
        Learn Algorithm
      </h1>
    </div>
    <router-view />
  </div>
</template>
