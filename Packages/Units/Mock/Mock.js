export class Mock {
    static async fetch(url, opts) {
        console.log('Mock.fetch:', url, opts);

        let delay = Math.random() * 2e3;
        await new Promise((resolve) => setTimeout(resolve, delay));

        let response_data = null;

        if (Math.random() < 0.7) {
            response_data = {
                output: '1 1 2 3 5 8 13 21 34 55',
                status: 'success',
            };
        }
        else {
            response_data = {
                error: 'SyntaxError: Unexpected token',
                status: 'error',
            };
        }

        return JSON.stringify(response_data);
    }
}
