<script setup lang="ts">
import {defineProps} from "vue";

interface TimeBlock {
  value: number | string;
  label: string;
}


const props = defineProps<{
  times: TimeBlock[];
  title?: string;
  showTitle?: boolean;
}>();
</script>

<template>
  <div class="flex flex-col items-center w-full">
    <p v-if="props.showTitle" class="font-normal text-base block mt-3">{{ props.title }}</p>

    <div class="flex flex-row justify-between w-full px-[5vw]">
      <template v-for="(time, index) in props.times" :key="index">
        <div class="flex flex-col text-center">
          <p class="text-[clamp(2rem,6vw,9rem)] font-bold">{{ time.value }}</p>
          <p class="text-[clamp(1rem,2vw,1.5rem)] font-thin">{{ time.label }}</p>
        </div>
        <p v-if="index < props.times.length - 1" class="text-[clamp(2rem,8vw,6rem)]">:</p>
      </template>
    </div>
  </div>
</template>

