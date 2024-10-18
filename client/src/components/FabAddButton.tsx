import { Button } from "@nextui-org/react";
import { PlusIcon } from "./icons";

const FabAddButton = () => {
    return(
        <div className="absolute bottom-2 right-2 w-14 h-14">
            <Button
                isIconOnly
                variant="solid"
                color="primary"
                className="w-full h-full"
            >
                <PlusIcon />
            </Button>
        </div>
    )
}

export default FabAddButton;