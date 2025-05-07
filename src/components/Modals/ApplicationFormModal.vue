<script setup lang="ts">
import {computed, ref, watch} from "vue";
import BaseModal from "@/components/Modals/BaseModal.vue";
import Input from "@/components/Base/Input.vue";
import {useFormValidation} from "@/composables/useFormValidation";
import {citiesByDistrict, districts} from "@/constants/districts";
import PolicyModal from "@/components/Modals/PolicyModal.vue";
import arrowDown from '@/assets/images/arrow-down.svg';




const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits<{ (e: "update:modelValue", value: boolean): void }>();

const showPolicy = ref(false);
const isSubmitting = ref(false);
const isSubmitted = ref(false);

const lastName = ref("");
const firstName = ref("");
const middleName = ref("");
const birthYear = ref("");
const weight = ref("");
const club = ref("");
const district = ref("");
const city = ref("");
const coachFullName = ref("");
const phone = ref("");

// Генерация списков
const birthYears = Array.from({length: 2021 - 1961 + 1}, (_, i) => (1961 + i).toString());
const weights = Array.from({length: 130}, (_, i) => (i + 1).toString());
const cities = computed(() => citiesByDistrict[district.value] || []);

// Валидация
const {errors, validateField, validateAll} = useFormValidation();

// Сброс формы
const resetForm = () => {
  lastName.value = "";
  firstName.value = "";
  middleName.value = "";
  birthYear.value = "";
  weight.value = "";
  club.value = "";
  district.value = "";
  city.value = "";
  coachFullName.value = "";
  phone.value = "";
  isSubmitted.value = false;
  isSubmitting.value = false;
  Object.keys(errors).forEach(key => delete errors[key]);
};

// Следим за закрытием модалки
watch(() => props.modelValue, (val) => {
  if (!val) resetForm();
});

// Отправка формы
const onSubmit = async (e: Event) => {
  e.preventDefault();
  const valid = validateAll({
    lastName: lastName.value,
    firstName: firstName.value,
    birthYear: birthYear.value,
    weight: weight.value,
    club: club.value,
    district: district.value,
    coachFullName: coachFullName.value,
    phone: phone.value
  });

  if (!valid) return;

  isSubmitting.value = true;

  // Эмуляция отправки
  await new Promise(resolve => setTimeout(resolve, 1800));

  isSubmitting.value = false;
  isSubmitted.value = true;
};

</script>

<template>
  <BaseModal
      :modelValue="props.modelValue"
      @update:modelValue="val => emit('update:modelValue', val)"
  >
    <div class="w-full p-5 h-full sm:rounded-xl sm:max-w-lg sm:h-auto montserrat overflow-y-auto scrollbar-hide">
      <h2 class="text-md font-medium text-[20px] text-[#333333] TTNorms text-center pb-[20px]">Отправь заявку на чемпионат прямо сейчас!</h2>

      <template v-if="!isSubmitted">
        <form @submit="onSubmit" class="p-8 pt-[2rem] flex flex-col text-[#333333] gap-5">
          <Input v-model="lastName" id="lastName" class="gap-2" label="Твоя фамилия" inputClass="border-[#bfbfbf] focus:outline focus:outline-[#5029de]" required @blur="validateField('lastName', lastName)"/>
          <p v-if="errors.lastName" class="text-red-500 text-sm">{{ errors.lastName }}</p>

          <Input v-model="firstName" id="firstName" class="gap-2" label="Имя" inputClass="border-[#bfbfbf] focus:outline focus:outline-[#5029de]" required @blur="validateField('firstName', firstName)"/>
          <p v-if="errors.firstName" class="text-red-500 text-sm">{{ errors.firstName }}</p>

          <Input v-model="middleName" id="middleName" class="gap-2" label="Отчество" inputClass="border-[#bfbfbf] focus:outline focus:outline-[#5029de]"/>

          <label class="text-sm font-normal -mb-3">Год рождения *</label>
          <select v-model="birthYear"
					:style="{ backgroundImage: `url(${arrowDown})` }"
					class="border border-[#bfbfbf] p-2 rounded-3xl h-10 font-normal text-sm bg-white focus:outline focus:outline-[#5029de]  appearance-none bg-no-repeat bg-[right_.7rem_center] bg-[length:.7rem] pr-10">
            <option disabled value=""></option>
            <option v-for="year in birthYears" :key="year" :value="year">{{ year }}</option>
          </select>
          <p v-if="errors.birthYear" class="text-red-500 text-sm">{{ errors.birthYear }}</p>

          <label class="text-sm font-normal -mb-3">Вес, кг *</label>
          <select v-model="weight"
					:style="{ backgroundImage: `url(${arrowDown})` }"
					class="border border-[#bfbfbf] p-2 rounded-3xl h-10 font-normal text-sm bg-white focus:outline focus:outline-[#5029de]  appearance-none bg-no-repeat bg-[right_.7rem_center] bg-[length:.7rem] pr-10">
            <option disabled value=""></option>
            <option v-for="w in weights" :key="w" :value="w">{{ w }}</option>
          </select>
          <p v-if="errors.weight" class="text-red-500 text-sm">{{ errors.weight }}</p>

          <Input v-model="club" id="club" label="Клуб" class="gap-2" inputClass="border-[#bfbfbf] focus:outline focus:outline-[#5029de]" required @blur="validateField('club', club)"/>
          <p v-if="errors.club" class="text-red-500 text-sm">{{ errors.club }}</p>

          <label class="text-sm font-normal -mb-3">Округ *</label>
          <select v-model="district"
									:style="{ backgroundImage: `url(${arrowDown})` }"
                  class="border border-[#bfbfbf] p-2 rounded-3xl h-10 font-normal text-sm bg-white focus:outline focus:outline-[#5029de]  appearance-none bg-no-repeat bg-[right_.7rem_center] bg-[length:.7rem] pr-10">
            <option disabled value=""></option>
            <option v-for="d in districts" :key="d" :value="d">{{ d }}</option>
          </select>
          <p v-if="errors.district" class="text-red-500 text-sm">{{ errors.district }}</p>

          <label v-if="cities.length" class="text-sm font-normal -mb-3">Город *</label>
          <select v-if="cities.length" v-model="city"
                  class="border border-[#bfbfbf] p-2 rounded-3xl h-10 font-normal text-sm bg-white focus:outline focus:outline-[#5029de]">
            <option disabled value=""></option>
            <option v-for="c in cities" :key="c" :value="c">{{ c }}</option>
          </select>

          <Input v-model="coachFullName" id="coachFullName"  class="gap-2" label="ФИО тренера" inputClass="border-[#bfbfbf] focus:outline focus:outline-[#5029de]" required
                 @blur="validateField('coachFullName', coachFullName)"/>
          <p v-if="errors.coachFullName" class="text-red-500 text-sm">{{ errors.coachFullName }}</p>

          <Input v-model="phone" id="phone" label="Номер телефона" inputClass="border-[#bfbfbf] focus:outline focus:outline-[#5029de]" class="gap-2" type="tel" required
                 @blur="validateField('phone', phone)"/>
          <p v-if="errors.phone" class="text-red-500 text-sm">{{ errors.phone }}</p>

          <button type="submit"
                  class="py-3 mb-3 rounded-md bg-gradient-to-r from-[#5029de] to-[#4124ab] text-white
              shadow-[0_0_10px_#5029de] hover:shadow-[0_0_20px_#5029de]
              transition duration-300 ease-in-out
              active:scale-[0.97] active:brightness-90 flex items-center justify-center"
                  :disabled="isSubmitting">
            <template v-if="isSubmitting">
              <svg class="animate-spin mr-2 h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              Регистрация...
            </template>
            <template v-else>
              Зарегестрироваться
            </template>
          </button>
        </form>
      </template>

      <template v-else>
        <div class="text-center flex flex-col items-center gap-4 py-6">
          <h3 class="text-xl font-semibold text-[#5029de]">Поздравляем!</h3>
          <p class="text-sm text-gray-700">
            Вы успешно зарегистрировались.<br/>
            Для оплаты участия, напишите нам в WhatsApp:
          </p>
          <a href="https://wa.me/79999999999" target="_blank"
             class="text-white bg-green-500 hover:bg-green-600 rounded-full px-6 py-2 mt-2 transition shadow">
            Перейти в WhatsApp
          </a>
        </div>
      </template>

      <PolicyModal v-model="showPolicy"/>
      <p class="text-[.75em] text-center text-black mt-1">
        Нажимая кнопку, вы даёте согласие на
        <a @click="showPolicy = true" class="underline cursor-pointer">обработку персональных данных</a>
      </p>
    </div>
  </BaseModal>
</template>
