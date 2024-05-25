import EditMoveForm from "@/components/EditMoveForm"

const getMoveById = async (id) => {
    try {
        const res = await fetch(`http://localhost:3000/api/moves/${id}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch Move.");
        }

        return res.json();

    } catch (error) {
        console.log(error);
    }
}

export default async function EditMove({ params }) {
    const { id } = params;
    const { move } = await getMoveById(id);
    const { detail, amount, date, moveType } = move;

    return <EditMoveForm
        id={id}
        detail={detail}
        amount={amount}
        date={date}
        moveType={moveType} />
}