const readAbleTime = (globaltime) => {
    const date = new Date(globaltime);
    const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

    return formattedDate;
}

export default readAbleTime