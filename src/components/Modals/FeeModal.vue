<script setup lang="ts">
import {defineEmits, defineProps} from "vue";
import BaseModal from "@/components/Modals/BaseModal.vue";

const props = defineProps<{
  modelValue: boolean;
}>();


const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();
</script>

<template>
  <BaseModal :modelValue="props.modelValue" @update:modelValue="val => emit('update:modelValue', val)">
    <div class="text-center p-4">
      <img src="../../assets/images/logo.png" alt="logo" class="mx-auto w-24 h-24 mb-4 bg-gray-800 rounded"/>
      <h2 class="text-lg font-semibold mb-2">Оплата взноса и страховка</h2>
      <p class="text-sm text-zinc-700 leading-relaxed">
        Взнос за участие <strong>1200₽</strong> (один раздел)<br/>
        и <strong>2000₽</strong> (оба раздела) оплачивается на взвешивании <strong>26 июля</strong>.
      </p>
    </div>
  </BaseModal>
</template>
