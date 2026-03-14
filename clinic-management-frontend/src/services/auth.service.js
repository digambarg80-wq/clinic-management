import api from './api'

class AuthService {
  async login(credentials) {
    if(credentials.email === 'test@test.com' && credentials.password === 'password')
    {
        return{
            token:'mock-tokent-123',
            user:{id:1, name:'Test User', email:credentials.email}
        }
    }
    throw new Error('Invalid credentials')
    // const response = await api.post('/auth/login', credentials)
    // return response.data
  }

  async register(userData) {
    return{
        message:'Registration successful',
        user: userData
    }
    // const response = await api.post('/auth/register', userData)
    // return response.data
  }

  async getCurrentUser() {
    return{
        id:1, name:'Test User', email:'test@test.com'
    }
    // const response = await api.get('/auth/me')
    // return response.data
  }
}

export default new AuthService()