export async function GetMoves() {
    try {
        const res = await fetch('http://localhost:3000/api/moves', {
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
        const res = await fetch('http://localhost:3000/api/moves', {
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