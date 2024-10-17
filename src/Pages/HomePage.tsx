import { useState, useEffect, useCallback } from "react";
import EventsCard from "../components/EventsCard";
import { getAllEvents } from "../libs/getAllEvents";

const HomePage = () => {
    const [allEvents, setAllEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAllEvents = useCallback(async () => {
        try {
            setIsLoading(true);
            const data = await getAllEvents();
            const newData = data.map(item => ({
                eventId: item[0],
                eventName: item[1],
                eventStatus: item[2]
            }));
            setAllEvents(newData);
        } catch (error) {
            console.error('Error in getting event details:', error);
            setError('Failed to fetch events. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAllEvents();
    }, [fetchAllEvents]);

    return (
        <div className="h-full">
            <h2 className="text-center text-xl font-bold">Events List</h2>
            <div className="event-list-item-wrapper p-2">
                {isLoading ? (
                    <p className="text-center text-white">Loading...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : allEvents.length === 0 ? (
                    <p className="text-center text-white">No events found</p>
                ) : (
                    allEvents.map(event => <EventsCard key={event.eventId} eventData={event} />)
                )}
            </div>
            {/* <FabAddButton /> */}
        </div>
    );
};

export default HomePage;