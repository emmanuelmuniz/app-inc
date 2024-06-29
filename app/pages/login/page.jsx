import EditMoveForm from "@/components/EditMoveForm"

export default async function EditMove({ params }) {
    const { id } = params;
    const [move, setMove] = useState({});
    const { detail, amount, date, moveType } = move;

    useEffect(() => {
        setMove(getMoveById(id));
    }, []);

    return <div className="max-w-* bg-lavender rounded-lg p-3">
        <EditMoveForm
            id={id}
            detail={detail}
            amount={amount}
            date={date}
            moveType={moveType} />
    </div>
}