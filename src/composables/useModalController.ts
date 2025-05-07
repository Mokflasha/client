import {ref} from "vue";

interface ModalController {
  showForm: ReturnType<typeof ref<boolean>>;
  showPrivacyPolicy: ReturnType<typeof ref<boolean>>;
  firstOpen: ReturnType<typeof ref<boolean>>;
  animateOnce: ReturnType<typeof ref<boolean>>;
  openForm: () => void;
  closeForm: () => void;
  openPrivacyPolicy: () => void;
  closePrivacyPolicy: () => void;
}

export function useModalController(): ModalController {
  const showForm = ref(false);
  const showPrivacyPolicy = ref(false);
  const firstOpen = ref(true);
  const animateOnce = ref(false);

  const disableBodyScroll = () => {
    document.body.style.overflow = "hidden";
  };

  const enableBodyScroll = () => {
    document.body.style.overflow = "";
  };

  const openForm = () => {
    showForm.value = true;
    disableBodyScroll();
    if (firstOpen.value) {
      animateOnce.value = true;
      firstOpen.value = false;
    } else {
      animateOnce.value = false;
    }
  };

  const closeForm = () => {
    showForm.value = false;
    enableBodyScroll();
  };

  const openPrivacyPolicy = () => {
    showPrivacyPolicy.value = true;
  };

  const closePrivacyPolicy = () => {
    showPrivacyPolicy.value = false;
  };

  return {
    showForm,
    showPrivacyPolicy,
    firstOpen,
    animateOnce,
    openForm,
    closeForm,
    openPrivacyPolicy,
    closePrivacyPolicy,
  };
}
