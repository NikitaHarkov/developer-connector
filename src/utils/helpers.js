export const formatDate = date => {
  try {
    return new Intl.DateTimeFormat('et-EE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date(date));
  } catch (error) {
    return 'Current';
  }
};
