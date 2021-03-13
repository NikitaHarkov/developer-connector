export const formatDate = date => {
  return new Intl.DateTimeFormat('et-EE', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  }).format(new Date(date));
};
