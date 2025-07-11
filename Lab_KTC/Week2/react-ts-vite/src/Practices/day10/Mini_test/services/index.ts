const baseUrl = 'https://server.aptech.io';


const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': localStorage.getItem('token') || 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0dW5nbnRAc29mdGVjaC52biIsImVtYWlsIjoidHVuZ250QHNvZnRlY2gudm4iLCJzdWIiOjEsImFwcGxpY2F0aW9uIjoiT25saW5lIFNob3AgLSBBUEkiLCJyb2xlcyI6W3siaWQiOjEsIm5hbWUiOiJBZG1pbmlzdHJhdG9ycyJ9LHsiaWQiOjIsIm5hbWUiOiJNYW5hZ2VycyJ9XSwiaWF0IjoxNzUyMjE2NDI3LCJleHAiOjE3ODM3NzQwMjd9.53F46cJ2rwTx42DSOipGZeUUDkpukKjsn3Ja35jbQa4',
}


export const login = async ( username : string, password : string) => {
    const response = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST', 
        headers: defaultHeaders,  
        body: JSON.stringify({ username, password }),


});
    return response.json();
}
export const getTasks = async () => {
    const response = await fetch (`${baseUrl}/workspaces/tasks`, {
        headers: defaultHeaders,
    });
    return response.json();
};

// export const getTasksById = async (id: string | number) => {
