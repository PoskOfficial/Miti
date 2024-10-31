import { useTranslation } from 'react-i18next';

function useLanguage() {
  const { i18n, t } = useTranslation();
  const isNepaliLanguage = i18n.language === 'ne';
  return { i18n, t, isNepaliLanguage };
}

export default useLanguage;
