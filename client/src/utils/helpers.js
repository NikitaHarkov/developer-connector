export const formatDate = date => {
  const newDate = new Date(date);
  return new Intl.DateTimeFormat('et-EE').format(newDate);
};
