// @ts-ignore
import { useEffect, useState } from "react";
import QRScanner from "../components/QRScanner";
import { Button, useDisclosure } from "@nextui-org/react";
import UserDataModel from "../components/UserDataModel";
import { getRollNumber } from "../libs/getRollNumber";
import { useNavigate, useParams } from "react-router-dom";

interface UserData {
    rollNo: string;
    image: string;
    name: string;
}

const MarkAttendance: React.FC = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [qrResult, setResult] = useState<boolean | string>(false);
    const [userData, setUserData] = useState<UserData | null>(null);
    const { eventId } = useParams<{ eventId: string }>();
    const navigate = useNavigate();

    const handleScan = async (scanResult: any) => {
        if (scanResult) {
            if (!scanResult[0].rawValue.includes('https://www.rajalakshmi.org/QRCode/REC.php?RegisterNo=')) {
                // alert(scanResult[0].rawValue)
                // alert('Invalid QR');
                return;
            }
            setResult(scanResult[0].rawValue);
            const fetchIdData = await getRollNumber(scanResult[0].rawValue);
            if (fetchIdData) {
                setResult(true);
                setUserData({
                    rollNo: fetchIdData.rollno,
                    image: fetchIdData.d,
                    name: fetchIdData.name,
                });
                onOpen();
            }
        }else {
            alert('Scan Again!')
        }
    };

    useEffect(() => {
        setResult(false);
        if (!isOpen) {
            setUserData(null);
        }
    }, [isOpen]);

    const handleError = (error: Error) => {
        console.error(error);
        setResult(false);
    };

    return (
        <div className="mark-attendance-page-wrapper">
            <h1 className="text-xl font-semibold text-center mb-4">QR Scanner</h1>
            <div className="qr-wrapper">
                <QRScanner
                    handleError={handleError}
                    handleScan={handleScan}
                    result={isOpen}
                />
                <Button className="block mx-auto mt-2" color="primary" variant="ghost" onPress={() => navigate('/')}>
                    Go Back
                </Button>
            </div>
            <UserDataModel
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                userData={userData}
            />
        </div>
    );
};

export default MarkAttendance;
