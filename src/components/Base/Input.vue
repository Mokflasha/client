<script setup lang="ts">
import {computed, defineEmits, defineProps} from "vue";

const props = defineProps<{
  modelValue: string;
  label?: string;
  placeholder?: string;
  type?: string;
  id: string;
  disabled?: boolean;
  required?: boolean;
	inputClass?: string;
}>();


const emits = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const inputValue = computed({
  get: () => props.modelValue,
  set: (val: string) => emits("update:modelValue", val),
});

const computedClasses = computed(() => {
	const base = "border p-2 rounded-3xl h-10 font-normal focus:outline-[#5029de]";
  const conditional = props.disabled ? "opacity-50 cursor-not-allowed" : "";
  return [base, conditional, props.inputClass].join(" ");});
</script>

<template>
  <div class="flex flex-col">
    <label v-if="props.label" :for="id" class="text-sm font-normal">
      {{ props.label }} <span v-if="required">*</span>
    </label>

    <input
        :id="props.id"
        :type="props.type"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :class="computedClasses"
        v-model="inputValue"
        required
    />
  </div>
</template>