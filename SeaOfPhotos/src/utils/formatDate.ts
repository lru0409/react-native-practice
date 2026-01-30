const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString("sv-SE", {
    timeZone: "Asia/Seoul",
  });
}

export default formatDate;