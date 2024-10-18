const getParticipants = async (eventId: number) => {
    if (!eventId || isNaN(eventId)) {
        console.error('Invalid eventId');
        return null;
    }
    
    const url = `${import.meta.env.VITE_GET_PARTICIPANTS}`;  // Replace with your script URL
    try {
        console.log('Sending request...');
        
        const res = await fetch(url, {
            redirect: 'follow',
            method: 'POST',
            body: JSON.stringify({ eventId: eventId }),
            headers: {
                'Content-Type': "text/plain;charset=utf-8"
            },
        });

        if (!res.ok) {
            console.error('Error response:', res.statusText);
            return null;
        }

        const data = await res.json();
        console.log('Response data:', data);
        return data;
    } catch(error) {
        console.error('There was a problem with the fetch operation:', error);
    }
};

export {
    getParticipants
};
