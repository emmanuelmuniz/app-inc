"use client";

import { HiOutlineTrash } from "react-icons/hi"
import { useRouter } from "next/navigation"

export default function RemoveCategory({ id }) {
    const router = useRouter();
    const removeCategory = async () => {
        const confirmed = confirm("¿Estás seguro?");

        if (confirmed) {
            const res = await fetch(`http://localhost:3000/api/categories?id=${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                router.refresh();
            }
        }
    }

    return (
        <button onClick={removeCategory} className="text-red-400 hover:opacity-70 duration-300 mx-1 flex justify-center">
            <HiOutlineTrash title="Eliminar" size={24} />
        </button>
    );
}
