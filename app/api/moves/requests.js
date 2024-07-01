const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function GetMoves() {
    try {
        const res = await fetch(`${apiUrl}api/moves`, {
            cache: 'no-store'
        });

        if (!res.ok) {
            throw new Error("Failed to fetch moves.");
        }

        return res.json();
    } catch (error) {
        console.log("Error loading moves: ", error);
    }
}

export async function CreateMoves(moves) {
    try {
        const res = await fetch(`${apiUrl}api/moves`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(moves)
        });

        const data = await res.json();

        if (res.ok) {
            return data;
        } else {
            throw new Error('Failed to create a new Move')
        }

    } catch (error) {
        console.log(error);
    }
}