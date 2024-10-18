const markAttendance = async (eventId: string, rollNo: string): Promise<string> => {
    const url = `${import.meta.env.VITE_MARK_ATTENDANCE}`;
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain;charset=utf-8");

    const raw = JSON.stringify({
        eventId: eventId,
        rollNo: rollNo
    });

    const requestOptions: RequestInit = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try {
        const response = await fetch(url, requestOptions);
        const result = await response.text();

        if(JSON.parse(result).error != null){
            return "Not Registered";
        }

        return 'Present';
    } catch (error) {
        console.log('error', error);
        return 'Network Error';
    }
};

export { markAttendance };