<script setup lang="ts">
import {defineEmits, defineProps } from "vue";
import BaseModal from "@/components/Modals/BaseModal.vue";

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const close = () => {
  emit("update:modelValue", false);
};
</script>

<template>
  <BaseModal :modelValue="props.modelValue" @update:modelValue="val => emit('update:modelValue', val)">
    <div class="relative w-full h-full px-1 text-sm text-zinc-700 leading-relaxed">

      <h3 class="text-xl font-semibold text-center mb-6">Политика конфиденциальности</h3>

      <p class="mb-4 font-medium">1. ОСНОВНЫЕ ПОНЯТИЯ</p>
      <p class="mb-2">Сайт – личный сайт (укажите принадлежность сайта), www.phoenix-combat.ru</p>
      <p class="mb-2">Администрация Сайта – СГСОО "Федерация спортивной борьбы грэпплинг", тел: 79624491516</p>
      <p class="mb-2">Пользователь – лицо, разместившее свои данные через форму обратной связи.</p>
      <p class="mb-2">Форма обратной связи – форма для передачи данных Администрации Сайта.</p>

      <p class="mt-6 mb-4 font-medium">2. ОБЩИЕ ПОЛОЖЕНИЯ</p>
      <ul class="list-disc list-inside space-y-2">
        <li>Документ определяет порядок защиты и обработки информации.</li>
        <li>Цель – обеспечить защиту данных от несанкционированного доступа.</li>
        <li>Регулируется настоящей политикой и законами РФ.</li>
        <li>Является публичным документом и доступна на сайте.</li>
        <li>Администрация вправе вносить изменения и публиковать новые редакции.</li>
        <li>Согласие выражается использованием формы.</li>
      </ul>

      <p class="mt-6 mb-4 font-medium">3. УСЛОВИЯ И ЦЕЛИ ОБРАБОТКИ ДАННЫХ</p>
      <ul class="list-disc list-inside space-y-2">
        <li>Данные передаются добровольно: ФИО, e-mail, телефон, регион и т.п.</li>
        <li>Цель — регистрация и информирование пользователя.</li>
        <li>Обработка основана на принципах законности и минимизации.</li>
      </ul>

      <p class="mt-6 mb-4 font-medium">4. ХРАНЕНИЕ И ИСПОЛЬЗОВАНИЕ ДАННЫХ</p>
      <p>Данные хранятся на электронных носителях и используются строго по назначению.</p>

      <p class="mt-6 mb-4 font-medium">5. ПЕРЕДАЧА ДАННЫХ</p>
      <ul class="list-disc list-inside space-y-2">
        <li>Не передаются третьим лицам, кроме случаев, установленных законом.</li>
        <li>По запросу госорганов предоставляются согласно законодательству.</li>
      </ul>

      <p class="mt-6 mb-4 font-medium">6. СРОКИ ХРАНЕНИЯ</p>
      <ul class="list-disc list-inside space-y-2">
        <li>Хранятся бессрочно.</li>
        <li>Удаляются по запросу пользователя.</li>
      </ul>

      <p class="mt-6 mb-4 font-medium">7. ПРАВА ПОЛЬЗОВАТЕЛЯ</p>
      <p>Пользователь имеет право на получение информации об обработке данных.</p>

      <p class="mt-6 mb-4 font-medium">8. ЗАЩИТА ДАННЫХ</p>
      <p>Принимаются технические и юридические меры защиты от несанкционированного доступа.</p>

      <p class="mt-6 mb-4 font-medium">9. ОБРАЩЕНИЯ</p>
      <ul class="list-disc list-inside space-y-2">
        <li>Запросы направляются по адресу: г. Ставрополь, ул. Тухачевского, 20/1, кв. 26</li>
        <li>Ответ предоставляется в течение 30 дней.</li>
        <li>Информация из обращений не подлежит разглашению.</li>
      </ul>
    </div>
  </BaseModal>
</template>
