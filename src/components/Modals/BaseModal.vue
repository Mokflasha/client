<script setup lang="ts">
import { defineEmits, defineProps, onBeforeUnmount, onMounted, watch } from 'vue'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const close = () => emit('update:modelValue', false)
const onBackdropClick = () => close()

// Scroll lock
const lockScroll = () => {
  document.body.style.overflow = 'hidden'
}
const unlockScroll = () => {
  document.body.style.overflow = ''
}

watch(() => props.modelValue, (val) => {
  val ? lockScroll() : unlockScroll()
})
onMounted(() => {
  if (props.modelValue) lockScroll()
})
onBeforeUnmount(() => unlockScroll())
</script>
<template>
  <transition name="fade" appear>
    <div
      v-show="modelValue"
      class="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center px-4"
      @click.self="onBackdropClick"
    >
      <!-- Прокручиваемая модалка -->
      <transition name="slide-down" appear>
        <div
          v-show="modelValue"
          class="overflow-auto max-h-screen w-full pointer-events-auto"
        >
          <div class="bg-white rounded-xl shadow-xl max-w-lg w-full mx-auto mt-20 mb-10">
            <!-- Верх модалки -->
            <div class="border-b flex justify-end">
              <button
                @click="close"
                class="p-3 text-2xl text-[#bfbfbf] cursor-pointer"
              >
                ×
              </button>
            </div>

            <!-- Контент -->
            <div>
              <slot />
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>


<style scoped>
/* Фон */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

/* Модалка */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.5s ease;
}
.slide-down-enter-from {
  transform: translateY(-100px);

}
.slide-down-enter-to {
  transform: translateY(0);

}
.slide-down-leave-from {
  transform: translateY(0);

}
.slide-down-leave-to {
  transform: translateY(-100px);

}
</style>

