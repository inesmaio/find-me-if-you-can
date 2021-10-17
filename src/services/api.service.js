
export const fetchUsers = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const jsonRes = await res.json();
    return jsonRes
}

export const fetchUser = async (id) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    const jsonRes = await res.json();
    return jsonRes
}