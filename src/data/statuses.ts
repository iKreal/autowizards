export const statuses: Record<string, { previous: string | null; next: string | null }> = {
  Скасовано: {
    previous: null,
    next: "На розгляданні",
  },
  "На розгляданні": {
    previous: "Скасовано",
    next: "Підтверджено",
  },
  Підтверджено: {
    previous: "На розгляданні",
    next: "Виконано",
  },
  Виконано: {
    previous: "Підтверджено",
    next: null,
  },
};
