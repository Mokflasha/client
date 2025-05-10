<script setup lang="ts">
import { computed, useAttrs, defineEmits, defineProps } from 'vue'

type ButtonType = 'button' | 'submit' | 'reset'
type ButtonVariant = 'primary' | 'secondary'

// Пропсы
const props = defineProps<{
  type?: ButtonType
  variant?: ButtonVariant
  disabled?: boolean
}>()

// Эмит событий
const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

// Атрибуты (в том числе кастомные обработчики)
interface ButtonAttrs {
  onTouchstart?: (e: TouchEvent) => void
  onTouchend?: (e: TouchEvent) => void
  onTouchcancel?: (e: TouchEvent) => void
  class?: string
  [key: string]: any
}

const attrs = useAttrs() as ButtonAttrs

// Стили по варианту и состоянию
const computedClasses = computed(() => {
  const base = 'px-8 py-3 rounded-[5px] font-medium '
  const disabledClass = props.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'

  const variants: Record<ButtonVariant, string> = {
    primary: 'text-white',
    secondary: 'bg-black/30 border-2 border-[#5029de] text-white'
  }

  const variantClass = variants[props.variant || 'primary']

  return [base, variantClass, disabledClass, attrs.class || ''].join(' ')
})
</script>

<template>
  <button
    :type="props.type || 'button'"
    :disabled="props.disabled"
    :class="computedClasses"
    @click="(e) => emit('click', e)"
    @touchstart="attrs.onTouchstart?.($event)"
    @touchend="attrs.onTouchend?.($event)"
    @touchcancel="attrs.onTouchcancel?.($event)"
  >
    <slot />
  </button>
</template>
