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
  <BaseModal
      :modelValue="props.modelValue"
      @update:modelValue="val => emit('update:modelValue', val)"
  >
    <div class="text-sm text-zinc-700 max-h-[80vh]  leading-relaxed px-1">
      <h3 class="text-xl font-semibold text-center mb-6">Условия допуска</h3>

      <p class="mb-4 font-medium">Взнос за участие:</p>
      <ul class="list-disc list-inside mb-4">
        <li>1200 ₽ — один раздел</li>
        <li>2000 ₽ — оба раздела</li>
        <li class="text-red-600 font-semibold">БЕЗ РЕГИСТРАЦИИ — 3000 ₽</li>
      </ul>

      <p class="mb-4 font-medium">Категории формируются по году рождения, а не по полным годам спортсмена.</p>

      <div class="mb-4">
        <p class="font-semibold">Мужчины (с 2004 г.р. и старше):</p>
        <p>62, 66, 71, 77, 84, 92, 100, 130 кг</p>
      </div>

      <div class="mb-4">
        <p class="font-semibold">Мальчики и девочки 2015–2016 г.р.:</p>
        <p>18, 21, 23, 25, 27, 30, 34, 34+ кг</p>
      </div>

      <div class="mb-4">
        <p class="font-semibold">Мальчики и девочки 2013–2014 г.р.:</p>
        <p>21, 23, 25, 27, 30, 34, 38, 42, 42+ кг</p>
      </div>

      <div class="mb-4">
        <p class="font-semibold">Мальчики и девочки 2011–2012 г.р.:</p>
        <p>23, 25, 27, 30, 34, 38, 42, 46, 50, 50+ кг</p>
      </div>

      <div class="mb-4">
        <p class="font-semibold">Мальчики 2010–2009 г.р.:</p>
        <p>34, 38, 42, 46, 50, 55, 60, 66, 72, 90 кг</p>
      </div>

      <div class="mb-4">
        <p class="font-semibold">Юноши 2008–2007 г.р.:</p>
        <p>32, 35, 38, 42, 47, 53, 59, 66, 73, 100 кг</p>
      </div>

      <div class="mb-4">
        <p class="font-semibold">Старшие юноши 2006–2005 г.р. (юниоры):</p>
        <p>42, 46, 50, 54, 58, 63, 69, 76, 85, 110 кг</p>
      </div>

      <p class="mt-6 font-bold text-red-600">ВНИМАНИЕ!</p>
      <ul class="list-disc list-inside mb-4 mt-2">
        <li>Полис страхования жизни и здоровья от несчастных случаев (оригинал) — ОБЯЗАТЕЛЬНО</li>
        <li>Стоимость страховки: 250 ₽ (можно оформить онлайн или на месте)</li>
        <li>Справка от врача о допуске к соревнованиям — ОБЯЗАТЕЛЬНО</li>
        <li>При отсутствии допуска спортсмен НЕ ДОПУСКАЕТСЯ, взнос НЕ ВОЗВРАЩАЕТСЯ</li>
      </ul>
    </div>
  </BaseModal>
</template>
