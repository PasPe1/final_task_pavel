


    const request = async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {

        try {
            const response = await fetch(url, {method, body, headers});
            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }
            
            // console.log(response)
            // const data = await response.json();

            return response.text();
        } catch(e) {
            throw e;
        }
    };

    export default request;