export const decreaseDaysOfDate = (days: number): Date => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - days);
    return currentDate;
}
