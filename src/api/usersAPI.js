import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '792b80a4-49dd-4b17-9640-3be566e3958b'
    }
})

export const usersAPI = {
    getUsers: (currentPage, pageSize) => {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => {
            return response.data
        })
    },

    follow: (userId) => {
        return instance.post(`follow/${userId}`).then(response => {
            return response.data.resultCode
        })
    },
    unfollow: (userId) => {
        return instance.delete(`follow/${userId}`).then(response => {
            return response.data.resultCode
        })
    },

}


export const authAPI = {
    auth: () => {
        return instance.get('/auth/me')
    },
    login: (loginForm) => {
        return instance.post('/auth/login', loginForm)
    },
    logout: () => {
        return instance.delete('/auth/login')
    },
    getCaptcha: () => {
        return instance.get('/security/get-captcha-url')
    }
}

export const profileAPI = {
    getProfile: async (userId) => {
        const response = await instance.get(`/profile/${userId}`)
        return response.data

    },
    getStatus: (userId) => {
        return instance.get(`/profile/status/${userId}`)
    },
    updateStatus: async (status) => {
        const response = await instance.put(`/profile/status/`, {status})
        return response.data

    },
    savePhoto: async (imageFile) => {
        let formData = new FormData()
        formData.append('image', imageFile)
        return await instance.put(`/profile/photo`, formData, {headers: {'Content-Type': 'multipart/form-data'}})
    },
    saveProfile: async (profileData) => {
        const response = await  instance.put('/profile', profileData)
        return response.data
    }
}
