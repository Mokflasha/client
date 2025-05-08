<script setup lang="ts">
import ApplicationFormModal from "@/components/Modals/ApplicationFormModal.vue";
import PrivacyPolicyModal from "@/components/Modals/PrivacyPolicyModal.vue";
import CountdownTimer from "@/components/CountdownTimer.vue";
import Button from "@/components/Base/Button.vue";
import {useCountdown} from "@/composables/useCountdown";
import {useModalController} from "@/composables/useModalController";
import {ref, onMounted, onBeforeUnmount } from "vue";
import FeeModal from "@/components/Modals/FeeModal.vue";
import EntryConditionsModal from "@/components/Modals/EntryConditionsModal.vue";
import PrivacyAgreementModal from "@/components/Modals/PrivacyAgreementModal.vue";
import PolicyModal from "@/components/Modals/PolicyModal.vue";

const touchedIndex = ref<number | null>(null)
const isTouchedRegister = ref(false)
const justReleasedIndex = ref<number | null>(null)

const handleTouchStart = (index: number) => {
  touchedIndex.value = index
  justReleasedIndex.value = null
}

const handleTouchEnd = () => {
  if (touchedIndex.value !== null) {
    justReleasedIndex.value = touchedIndex.value
    setTimeout(() => {
      if (justReleasedIndex.value === touchedIndex.value) {
        justReleasedIndex.value = null
      }
    }, 250)
  }
  touchedIndex.value = null
}

onMounted(() => {
  document.addEventListener('touchstart', handleOutsideTouch, true)
})

onBeforeUnmount(() => {
  document.removeEventListener('touchstart', handleOutsideTouch, true)
})

const handleOutsideTouch = (e: TouchEvent) => {
  const target = e.target as HTMLElement
  if (!target.closest('.ripple-btn')) {
    touchedIndex.value = null
    justReleasedIndex.value = null
  }
}

const TOURNAMENT_DATE = "2025-05-24T00:00:00";

const showFeeModal = ref(false);
const showConditionsModal = ref(false);
const showPrivacyAgreement = ref(false);
const showPolicy = ref(false);

const {
  days,
  hours,
  minutes,
  seconds,
  dayLabel,
  hourLabel,
  minuteLabel,
  secondLabel
} = useCountdown(TOURNAMENT_DATE);

const {
  showForm,
  showPrivacyPolicy,
  openForm,
  openPrivacyPolicy
} = useModalController();

const isMobileMenuOpen = ref(false);
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const beforeEnter = (el: Element) => {
  el.style.height = '0';
  el.style.opacity = '0';
};

const enter = (el: Element, done: () => void) => {
  const height = (el as HTMLElement).scrollHeight;
  el.animate(
      [{height: '0', opacity: 0}, {height: `${height}px`, opacity: 1}],
      {duration: 400, easing: 'ease-out'}
  ).onfinish = () => {
    el.style.height = '';
    el.style.opacity = '';
    done();
  };
};

const leave = (el: Element, done: () => void) => {
  const height = (el as HTMLElement).scrollHeight;
  el.animate(
      [{height: `${height}px`, opacity: 1}, {height: '0', opacity: 0}],
      {duration: 400, easing: 'ease-in'}
  ).onfinish = done;
};


</script>

<template>
  <div class="min-h-screen w-full relative overflow-x-hidden" :class="showForm ? 'touch-none' : ''">
    <div class="flex justify-between sm:justify-center p-5 items-center">
      <div class="flex sm:flex-col items-center sm:hidden  justify-center">
        <img src="./assets/images/logo.png" alt="logo" class="w-[75px]"/>
        <p class="text-white font-extrabold ml-2 mt-2 w-[180px] sm:w-full">Alliance Cup Championship</p>
      </div>
			
      <div @click="toggleMobileMenu" class="sm:hidden w-8 h-8 relative" aria-label="Toggle menu">
        <!-- Верхняя линия -->
        <span
            class="block absolute left-0 h-[4px] w-8 bg-white transition-all duration-500 ease-in-out"
            :class="isMobileMenuOpen
      ? 'top-1/2 translate-y-[-50%] rotate-45'
      : 'top-[6px] rotate-0 translate-y-0'"
        />
        <!-- Средняя линия -->
        <span
            class="block absolute left-0 h-[4px] w-8 bg-white transition-all duration-500 ease-in-out origin-left"
            :class="isMobileMenuOpen
      ? 'top-1/2 translate-y-[-50%] opacity-0 scale-x-0'
      : 'top-[14px] opacity-100 scale-x-100'"
        />
        <!-- Нижняя линия -->
        <span
            class="block absolute left-0 h-[4px] w-8 bg-white transition-all duration-500 ease-in-out"
            :class="isMobileMenuOpen
      ? 'top-1/2 translate-y-[-50%] -rotate-45'
      : 'top-[22px] rotate-0 translate-y-0'"
        />
      </div>
    </div>
    <div
        class="absolute inset-0 -z-10 bg-[url(./assets/images/background.jpg)] bg-no-repeat bg-cover bg-[center_66%]"></div>
    <div class="fixed inset-0 -z-10 bg-black/50 min-h-screen h-full"></div>
    <ApplicationFormModal v-model="showForm" :openPrivacyPolicy="openPrivacyPolicy"/>
    <PrivacyPolicyModal v-model="showPrivacyPolicy"/>

    <transition @before-enter="beforeEnter"
                @enter="enter"
                @leave="leave"
    >
      <div
          v-show="isMobileMenuOpen"
          class="sm:hidden text-white text-center px-[5vw] pt-4 flex flex-col items-center gap-4 bg-black/30 rounded-b-xl overflow-hidden"
      >
        <p class="text-base font-medium">
          Соревнования по единоборствам: грепплинг, панкратион, вольная, греко-римская борьба.
        </p>
        <!--
         здесь тоже я указал каркас для того, чтоб человек,при нажатии на номер
         телефона мог позвонить, если будут вопросы
         тебенужно просто вместо этого номера вставить номер на который будут совершаться звонки
         в таком же формате как я указал тестовый номер
         -->
        <a href="tel:+71234567890"
           class="font-semibold mt-4 text-[32px] text-[#5029de] hover:underline focus:underline">+7 (123)
          456-78-90</a>
        <p class="text-sm text-gray-300">техподдержка</p>
      </div>
    </transition>

    <FeeModal v-model="showFeeModal"/>
    <div class="text-white px-[5vw] sm:pt-1 max-sm:pt-8 flex flex-col items-center gap-4">

      <div class="flex flex-col gap-2">
        <div class="flex flex-col justify-evenly items-center border-[3px] border-[#44008C] bg-black/50 px-[2vw] sm:pt-[6vh] sm:pb-[1vh] sm:px-[6vw] py-[2vh] h-[200px] sm:h-auto
         shadow-[0_0_30px_#44008C]">
				 <h1 class="sm:mb-0 mb-4 uppercase text-center sm:hidden  text-2xl text-white text-glow">
						Open Grappling Tournament 2025
					</h1>
					<h1 class="sm:mb-0 title-desk mb-4 uppercase text-center text-[96px] max-sm:hidden  text-2xl text-white text-glow ">
						ALLIANCE CHAMPIONSHIP 2025
					</h1>
          <!--    Где href нужно будет ввести ссылку на расписание оно уже откроется на новой странице      -->
          <a href="#" target="_blank" class=" sm:rounded-[2px] sm:ring-[#44008C] sm:py-4 sm:mt-[40px] sm:text-[clamp(1rem,1vw,1rem)] sm:bg-[#44008C]
          text-[clamp(.9rem,1.5vw,1.25rem)] rounded-3xl uppercase w-fit
          px-8 py-3 font-medium transition shadow-md 
          bg-gradient-to-r from-[#5029de] to-[#4124ab] text-white
          ">
            РАСПИСАНИЕ ТУРНИРА
          </a>
        </div>

        <div class="text-center font-medium text-[clamp(1rem,2vw,1.5rem)]">
          <h2 class="text-[27px] sm:hidden font-medium mt-[20px]">Махачкала, Дворец спорта "Автодор"</h2>
          <h2 class="text-[27px] sm:hidden font-medium">24–25 Мая, 2025</h2>
          <Button
						@click="openForm"
						@touchstart="handleTouchStart"
						@touchend="handleTouchEnd"
						@touchcancel="handleTouchEnd"
						variant="primary"
						class="text-[clamp(.9rem,1.5vw,1.25rem)] uppercase rounded-3xl w-fit transition-all duration-150 ease-out"
						:class="isTouchedRegister
							? 'bg-[#241259] text-white scale-90 shadow-[0_0_18px_#5029de]'
							: 'bg-black/30 hover:bg-[#5029de]/80 hover:text-white sm:hidden hover:shadow-[0_0_14px_#5029de]'"
					>Зарегистрироваться
          </Button>

        </div>
      </div>
      <EntryConditionsModal v-model="showConditionsModal"/>
      <PrivacyAgreementModal v-model="showPrivacyAgreement"/>
      <PolicyModal v-model="showPolicy"/>
      <div class="flex flex-col-reverse sm:flex-col gap-4 w-full items-center">
        <nav>
					<div class="sm:btn-div sm:bg-black/70 sm:rounded-[10px] sm:pb-9 sm:pt-1 sm:px-[300px] rounded-lg flex flex-col uppercase text-center text-[clamp(0.9rem,1.2vw,1.1rem)]  "> 
						<p class="text-[27px] desc-btn-div roboto max-sm:hidden">24.05.2025</p>
						<div class="rounded-lg flex flex-col sm:grid gap-3 sm:gap-2 uppercase text-center text-[clamp(0.9rem,1.2vw,1.1rem)]  grid-cols-2"> 
							<a
								v-for="(item, index) in [
									{ label: 'Условия допуска', action: () => showConditionsModal = true, full: false },
									{ label: 'Скачать регламент', href: '#', download: true, full: false },
									{ label: 'Список участников', href: '#', full: true },
									{ label: 'Оплата взноса и страховка', action: () => showFeeModal = true, full: true, firstMobile: true }
								]"
								:key="index"
								:href="item.href || undefined"
								:download="item.download || false"
								@click="item.action && item.action()"
								@touchstart="handleTouchStart(index)"
								@touchend="handleTouchEnd"
								@touchcancel="handleTouchEnd"
								:class="[
									'max-sm:ripple-btn main-btn cursor-pointer select-none touch-manipulation',
									'rounded-xl px-6 py-5 font-normal text-sm',
									'ring-2 ring-[#5029de] transition-all duration-150 ease-out text-[clamp(0.9rem,1.2vw,1.1rem)]',
									'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5029de]',
									'sm:rounded-[2px] sm:ring-[#44008C] sm:py-4 sm:text-[clamp(1.5rem,1.2vw,2rem)] sm:bg-[#44008C]',
									item.full ? 'col-span-2' : '',
									item.firstMobile ? 'order-[-1] sm:order-none' : '',
									touchedIndex === index
										? 'bg-[#5029de] text-white shadow-[0_0_30px_#5029de]'
										: justReleasedIndex === index
											? 'bg-[#1e0c9f]/80 text-white shadow-[0_0_20px_#1e0c9f]'
											: 'bg-black/30 hover:bg-[#5029de]/80 hover:text-white hover:shadow-[0_0_14px_#5029de]'
								]"
								:style="{ '-webkit-tap-highlight-color': 'transparent' }"
							>
								{{ item.label }}
							</a>
						</div>
					</div>
        </nav>
				<h2 class="text-[27px] max-sm:hidden font-medium leading-[15px] roboto">Махачкала, Дворец спорта "Автодор"</h2>
				<h2 class="text-[27px] max-sm:hidden font-medium leading-[22px]">24–25 Мая, 2025</h2>
        <Button
          @click="openForm"
          @touchstart="handleTouchStart"
          @touchend="handleTouchEnd"
          @touchcancel="handleTouchEnd"
          variant="primary"
          class="max-sm:hidden ripple-btn text-[clamp(.9rem,1.5vw,1.25rem)] uppercase rounded-3xl w-fit transition-all duration-150 ease-out"
          :class="isTouchedRegister
            ? 'bg-[#5029de] text-white scale-90 shadow-[0_0_18px_#5029de]'
            : 'bg-black/30 hover:bg-[#5029de]/80 hover:text-white hover:shadow-[0_0_14px_#5029de]'"
        >
          зарегистрироваться
        </Button>

        <CountdownTimer
            :times="[
            { value: days, label: dayLabel },
            { value: hours, label: hourLabel },
            { value: minutes, label: minuteLabel },
            { value: seconds, label: secondLabel }
          ]"
            :showTitle="true"
        />
      </div>

      <div class="flex flex-col gap-6 w-full items-center mt-10 sm:absolute sh:relative bottom-0 mb-4">
        <div class="flex flex-col gap-2 items-center">
          <p class="sm:hidden font-semibold">Наши спонсоры:</p>
          <div class="flex flex-row gap-8 items-center">
            <a href="#"><img class="h-[clamp(5rem,10vw,4rem)] w-[90px]" src="./assets/images/mircato.png"
                             alt="mircato"/></a>
            <a href="#"><img class="h-[clamp(6rem,15vw,8rem)]" src="./assets/images/dihard.png" alt="dihard"/></a>
            <a href="#"><img class="h-[clamp(5rem,10vw,4rem)]" src="./assets/images/architeck.png" alt="architeck"/></a>
          </div>
        </div>

        <div class="flex flex-col gap-2 text-[.7rem] font-medium underline text-center sm:hidden">
          <a
              @click="showPrivacyAgreement = true"
              class="underline text-sm text-white transition
         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B413FF]
         active:opacity-80"
          >
            Согласие на обработку персональных данных
          </a>

          <a
              @click="showPolicy = true"
              class="underline text-sm text-white transition
         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B413FF]
         active:opacity-80"
          >
            Политика конфиденциальности
          </a>

        </div>
      </div>
    </div>
  </div>
</template>

<style>
.text-glow {
  filter: drop-shadow(0px 0px 2px #B413FF);
}
.ripple-btn {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  user-select: none;
	transition: all 0.3s ease;
}

/* Для анимации эффекта при нажатии */
.ripple-btn:active::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  animation: ripple-effect 0.6s linear;
}

.ripple-btn:active {
  transform: scale(0.98); /* Эффект уменьшения при касании */
}

/* Анимация ripple-эффекта */
@keyframes ripple-effect {
  0% {
    transform: scale(0);
    opacity: 0.5;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
}

/* Свечение при фокусе и при касании */
.ripple-btn:focus-visible,
.ripple-btn:hover {
  box-shadow: 0 0 30px rgb(80, 41, 222);
  text-shadow: 0 0 5px rgb(80, 41, 222);
	background: rgb(80, 41, 222);
}

@media (max-width: 1600px) {
  .title-desk{
		font-size: 50px;
	}
	.desc-btn-div{
		font-size: 20px;
	}
	.btn-div{
		padding-inline: 150px;
		padding-bottom: 15px;
	}
	.main-btn{
		font-size: 15px;
		padding-block: 15px;
	}
}
/* Для мобильных устройств */
@media (max-width: 768px) {
  .ripple-btn {
    padding: 10px 20px;
    font-size: 14px;
  }

  .ripple-btn:active {
    transform: scale(0.95);
  }
}
</style>