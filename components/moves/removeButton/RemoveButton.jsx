"use client";

import { HiOutlineTrash } from "react-icons/hi"
import { useRouter } from "next/navigation"

export default function RemoveButton({ id }) {
    const router = useRouter();
    const removeMove = async () => {
        const confirmed = confirm("¿Estás seguro?");

        if (confirmed) {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/moves/move?id=${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                router.refresh();
            }
        }
    }

    return (
        <button onClick={removeMove} className="text-red-400 hover:opacity-70 duration-300">
            <HiOutlineTrash title="Eliminar" size={24} />
        </button>
    );
}