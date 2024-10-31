export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const fetchUserEvents = async (startDate: string, endDate: string) => {
  const res = await fetch(
    `${apiBaseUrl}/calendar/google/events?timeMin=${startDate}&timeMax=${endDate}`,
    { credentials: 'include' },
  );
  const data = await res.json();
  return data;
};
