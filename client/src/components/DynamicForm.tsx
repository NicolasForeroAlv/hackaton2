import React, { useState } from 'react'

type Field = { name: string; label: string; type?: string }

export default function DynamicForm({ fields, onSubmit } : { fields: Field[]; onSubmit: (data: any)=>void }) {
  const [values, setValues] = useState<Record<string, any>>(() => {
    const init: Record<string, any> = {}
    fields.forEach(f => init[f.name] = '')
    return init
  })

  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues(v => ({ ...v, [e.target.name]: e.target.value }))
  }

  return (
    <form onSubmit={(e)=>{ e.preventDefault(); onSubmit(values) }}>
      {fields.map(f => (
        <div className="mb-3" key={f.name}>
          <label className="form-label">{f.label}</label>
          <input className="form-control" name={f.name} value={values[f.name]} onChange={handle} type={f.type||'text'} />
        </div>
      ))}
      <button className="btn btn-primary" type="submit">Enviar</button>
    </form>
  )
}
