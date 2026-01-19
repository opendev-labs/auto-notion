<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <DevStateNotifier />
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
