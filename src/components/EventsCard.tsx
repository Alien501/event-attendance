import { Button, Card, CardBody, CardFooter, Chip } from "@nextui-org/react";
import { CameraIcon, PersonIcon } from "./icons";
import { Link } from "react-router-dom";

const EventsCard = ({eventData}) => {
    return(
        <Card className="event-card-container flex justify-center items-center p-2 w-80 m-2">
            <CardBody className="event-details-container flex flex-col justify-evenly">
                <div className="event-name-container">
                    <p className="text-base text-slate-200 font-normal">{eventData.eventName}</p>
                </div>
            </CardBody>
            <CardFooter className="event-card-button-container p-0 flex justify-between">
                <div className="event-status-container">
                    <Chip
                        variant="flat"
                        color={(eventData.eventStatus == 'Completed')? 'success' : 'primary'}
                    >
                        {eventData.eventStatus}
                    </Chip>
                </div>
                <div className="event-card-button-wrapper">
                    <Link to={`/participants/${eventData.eventId}`}>
                        <Button isIconOnly variant="light" color="primary" href="/participants">
                        <PersonIcon /> 
                        </Button>
                    </Link>
                    <Link to={`/attendance/${eventData.eventId}`}>
                        {
                            eventData.eventStatus == 'Completed'?
                            <Button disabled isIconOnly variant="light" color="primary">
                                <CameraIcon />
                            </Button>
                            :
                            <Button isIconOnly variant="light" color="primary">
                                <CameraIcon />
                            </Button>
                        }
                    </Link>
                </div>
            </CardFooter>
        </Card>
    )
}

export default EventsCard;