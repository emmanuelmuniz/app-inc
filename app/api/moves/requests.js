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