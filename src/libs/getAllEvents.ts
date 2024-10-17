const getAllEvents = async () => {
    const url = `${import.meta.env.VITE_GET_ALL_EVENTS}`;
    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': "text/plain;charset=utf-8"
            },
            redirect: 'follow'
        });

        if(!res) {
            alert('Error');
        }
        const data = await res.json();
        // console.log(data);
        return data;
    } catch(error) {
        console.error('There was a problem', error);
    }
}

export {
    getAllEvents
}