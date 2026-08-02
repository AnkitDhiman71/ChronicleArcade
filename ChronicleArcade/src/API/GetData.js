export const getData = async () => {
    try {
        const response = await fetch('http://localhost:5174/api/games');
        if (!response.ok) {
            throw new Error(`Server status: ${response.status}`);
        }
        const data = await response.json();
        return {
            data: data,
            success: true
        };
    } catch (err) {
        console.error('Error fetching custom game data from database:', err);
        return {
            data: [],
            success: false
        };
    } finally {
        console.log('Custom data fetch completed.');
    }
};