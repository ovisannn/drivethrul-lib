export const FormatDateToday = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding leading zero if necessary
    const day = String(date.getDate()).padStart(2, '0'); // Adding leading zero if necessary
    return `${year}-${month}-${day}`;
};

export const FormatDateWithDays = (daysToAdd) => {
    const currentDate = new Date();
    const newDate = new Date(currentDate.getTime() + (daysToAdd * 24 * 60 * 60 * 1000));

    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, '0'); // Adding leading zero if necessary
    const day = String(newDate.getDate()).padStart(2, '0'); // Adding leading zero if necessary

    return `${year}-${month}-${day}`;
};