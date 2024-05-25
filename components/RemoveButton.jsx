"use client";

import { HiOutlineTrash } from "react-icons/hi"
import { useRouter } from "next/navigation"

export default function RemoveButton({ id }) {
    const router = useRouter();
    const removeMove = async () => {
        const confirmed = confirm("¿Estás seguro?");

        if (confirmed) {
            const res = await fetch(`http://localhost:3000/api/moves?id=${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                router.refresh();
            }
        }
    }

    return (
        <button onClick={removeMove} className="text-red-400">
            <HiOutlineTrash size={24} />
        </button>
    );
}