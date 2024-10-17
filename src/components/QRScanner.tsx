// @ts-nocheck
import { Scanner } from "@yudiel/react-qr-scanner";

const QRScanner = ({handleScan, handleError, result}: {handleScan: any, handleError: any, result: any}) => {

    return (
        <div className="flex flex-col items-center">
            <div className="qr-scanner-wrapper w-80 h-80 rounded-lg overflow-hidden">
                <Scanner
                    key={result}
                    onScan={handleScan}
                    onError={handleError}
                    style={{ width: '100%', height: '100%' }}
                    paused={result}
                />
            </div>
        </div>
    );
};

export default QRScanner;