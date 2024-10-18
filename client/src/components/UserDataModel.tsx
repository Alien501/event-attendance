import { Button, Image, Modal, ModalContent } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { markAttendance } from "../libs/markAttendance";
import { useNavigate } from "react-router-dom";

const UserDataModel = ({ isOpen, onOpenChange, userData }: { isOpen: boolean, onOpenChange: () => void, userData: any }) => {
    const [markedAttendance, setMarkedAttendance] = useState<boolean | string>(false);
    const [attendanceStatus, setAttendanceStatus] = useState<string>('Wait...')
    const navigate = useNavigate();
    useEffect(() => {
        if(!isOpen) {
            setAttendanceStatus('Wait...')
        }
    }, [isOpen]);

    useEffect(() => {
        const eventId = parseInt(window.location.pathname.split('/')[2]);
        if (isNaN(eventId) || !eventId) {
            navigate('/');
            return;
        }

        if (userData && userData.rollNo) {
            const initiateAttendance = async (eventId: number) => {
                const res = await markAttendance(eventId.toString(), userData.rollNo);
                // alert(res)
                if (res === 'Present') {
                    setMarkedAttendance(true);
                    setAttendanceStatus(prev => "Present");
                }else{
                    setAttendanceStatus(prev => "Not Registered");
                }
            };

            initiateAttendance(eventId);
        } else {
            setMarkedAttendance(true)
            console.warn('User data is missing or incomplete');
        }
    }, [navigate, userData]);

    return (
        <Modal isDismissable={false} isOpen={isOpen} onOpenChange={onOpenChange} className="dark flex justify-center items-center w-max p-2 text-white">
            <ModalContent>
                {(onClose) => (
                    <>
                        <div className="photo-container">
                            <Image
                                width={250}
                                alt="User Image"
                                src={userData?.image || "https://nextui.org/images/hero-card-complete.jpeg"}
                            />
                        </div>
                        <div className="user-details-container">
                            <p className="text-sm font-semibold text-center">{userData?.name || "Unknown"}</p>
                            <p className="text-xs font-normal text-center">{userData?.rollNo || "Unknown"}</p>
                            <p className="text-green-500 font-bold text-center">{attendanceStatus}</p>
                        </div>
                        <Button color="primary" onPress={onClose} isLoading={attendanceStatus === 'Wait...'? true: false}>
                            Close
                        </Button>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default UserDataModel;
