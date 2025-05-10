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
      @update:modelValue="(val) => emit('update:modelValue', val)"
  >
    <div class="max-h-72 h-full pr-2">
      <h3 class="text-xl font-semibold text-center mb-6">
        Политика конфиденциальности
      </h3>
      <div class="text-sm max-h-[80vh]  font-light text-zinc-600 flex flex-col gap-4">
        <p>
          Ваши персональные данные будут использоваться исключительно для целей обработки вашей заявки. Мы уважаем вашу
          конфиденциальность и не передаем информацию третьим лицам.
        </p>
        <p>
          Согласие на обработку персональных данных является обязательным для продолжения использования формы. Вы вправе
          в любой момент отозвать свое согласие.
        </p>
        <p>
          Мы принимаем меры по защите ваших данных в соответствии с действующим законодательством.
        </p>
        <p>
          Ознакомьтесь с полной версией нашей политики на сайте или свяжитесь с нами для получения дополнительной
          информации.
        </p>
      </div>
    </div>
  </BaseModal>
</template>
