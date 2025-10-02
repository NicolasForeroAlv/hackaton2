import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../services/api'

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const navigate = useNavigate()

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await API.post('/auth/login', { email, password })
      localStorage.setItem('token', res.data.token)
      navigate('/dashboard')
    } catch (error: any) {
      setErr(error?.response?.data?.message || 'Error')
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-5">
        <div className="card p-3">
          <h4>Login</h4>
          {err && <div className="alert alert-danger">{err}</div>}
          <form onSubmit={submit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input className="form-control" value={email} onChange={e=>setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input className="form-control" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
            </div>
            <button className="btn btn-primary" type="submit">Entrar</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
