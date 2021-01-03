import axios from 'axios';

const userServices = {
    async signInWithEmailAndPassword(email, password) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCVpkhOCLVVZzQDnTlO0hU64Yq6OIkG-00`;
        const data = {
            "email": email,
            "password": password,
            "returnSecureToken": true
        }
        const options = {
            method: 'POST',
            headers: {
                'content-Type': 'application/json',
            },
            data: data,
            url,
        };
        let results = axios(options)
        .then(response => {
            // eslint-disable-next-line no-console
            return response
        })
        .catch(error => {
            // eslint-disable-next-line no-console
            return error.response
        });
        return results
    }
}

export default userServices