const getRollNumber = async (url: string) => {
    const surl = import.meta.env.VITE_ROLL_SCRAPPER;
    const getIdData = await fetch(`${surl}?url=${url}`);
    if(getIdData.ok) {
        const idData = await getIdData.json();
        return idData;
    } else {
        return null
    }
}

export {
    getRollNumber
}