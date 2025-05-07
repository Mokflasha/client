import {ref} from "vue";

export function useFormValidation() {
  const errors = ref<Record<string, string>>({});

  const validateField = (key: string, value: string) => {
    switch (key) {
      case "name":
        errors.value[key] = value.trim() ? "" : "Введите ФИО";
        break;
      case "email":
        errors.value[key] = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ""
          : "Некорректный Email";
        break;
      case "phone":
        errors.value[key] = /^\+?[0-9\s\-()]{7,15}$/.test(value)
          ? ""
          : "Некорректный телефон";
        break;
      case "team":
        errors.value[key] = value.trim() ? "" : "Укажите команду";
        break;
      default:
        break;
    }
  };

  const validateAll = (data: Record<string, string>) => {
    Object.entries(data).forEach(([key, value]) => {
      validateField(key, value);
    });
    return Object.values(errors.value).every((e) => !e);
  };

  return {
    errors,
    validateField,
    validateAll,
  };
}
