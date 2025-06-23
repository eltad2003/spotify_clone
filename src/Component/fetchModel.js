/**
 * @param {string} url      The URL to issue the GET request.
 * @returns {Promise}       A promise that resolves to the model data fetched from the server.
 */
const fetchModel = async (url) => {
    const token = localStorage.getItem('token')
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        }); // Fetch data from the server
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching model:', error);
        return null;
    }
}

export default fetchModel;
