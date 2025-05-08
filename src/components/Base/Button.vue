<script setup lang="ts">
import {computed, defineEmits, defineProps} from "vue";

type ButtonType = "button" | "submit" | "reset";
type ButtonVariant = "primary" | "secondary";

const props = defineProps<{
  type?: ButtonType;
  variant?: ButtonVariant;
  disabled?: boolean;
}>();



const emits = defineEmits<{
  (e: "click"): void;
}>();

const computedClasses = computed(() => {
  const base = "px-8 py-3 rounded-[5px]  font-medium transition shadow-md";
  const disabledClass = props.disabled ? "opacity-50  cursor-not-allowed" : "hover:scale-20";

  const variants: Record<ButtonVariant, string> = {
    primary: "bg-gradient-to-r from-[#5029de]  to-[#4124ab] text-white",
    secondary: "bg-black/30 border-2 border-[#5029de]  text-white",
  };

  const variantClass = variants[props.variant || "primary"];

  return `${base} ${variantClass} ${disabledClass}`;
});
</script>

<template>
  <button
      :type="props.type"
      :class="computedClasses"
      :disabled="disabled"
      @click="emits('click')"
  >
    <slot/>
  </button>
</template>


