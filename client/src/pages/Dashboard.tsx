import React, { useEffect, useState } from 'react'
import API from '../services/api'
import DynamicForm from '../components/DynamicForm'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

type Company = { id: string; name: string; nit: string; employees: number }

const Dashboard: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([])
  const [error, setError] = useState('')

  const fetchCompanies = async () => {
    try {
      const res = await API.get('/companies')
      setCompanies(res.data)
    } catch (e:any) {
      setError(e?.response?.data?.message || 'Error Loading')
    }
  }

  useEffect(()=>{ fetchCompanies() }, [])

  const add = async (payload: any) => {
    try {
      await API.post('/companies', payload)
      fetchCompanies()
    } catch (e:any) {
      setError(e?.response?.data?.message || 'Error')
    }
  }

  const data = companies.map(c => ({ name: c.name, employees: c.employees }))

  return (
    <div className="row">
      <div className="col-md-6">
        <div className="card p-3">
          <h5>Agregar Empresa</h5>
          <DynamicForm fields={[
            { name: 'name', label: 'Nombre' },
            { name: 'nit', label: 'NIT' },
            { name: 'employees', label: 'Empleados', type: 'number' }
          ]} onSubmit={add} />
          {error && <div className="alert alert-danger mt-2">{error}</div>}
        </div>
      </div>

      <div className="col-md-6">
        <div className="card p-3">
          <h5>Estadísticas</h5>
          <div style={{ width:'100%', height:300 }}>
            <ResponsiveContainer>
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="employees" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card p-3 mt-3">
          <h5>Empresas guardadas</h5>
          <ul className="list-group">
            {companies.map(c => <li key={c.id} className="list-group-item">{c.name} — Empleados: {c.employees}</li>)}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
