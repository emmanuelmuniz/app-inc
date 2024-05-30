import { Spinner } from "@nextui-org/spinner";

export default function LoadingDisplay() {
    return (
        <div className="
        min-h-96
        min-w-full
        grid
        place-content-center">
            <div className="">
                < Spinner />
            </div>
        </div>
    );
}