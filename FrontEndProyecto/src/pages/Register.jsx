import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Register(){
  const [form] = useState({ })
  const navigate = useNavigate()

  async function submit(e){
    e.preventDefault()
    try{
      await axios.post('/api/auth/register/', form)
      navigate('/login')
    }catch(err){
      alert('Registro fallido')
      console.error(err)
    }
  }

  return (
    <div>
      <h1>Registro</h1>
      <form onSubmit={submit}>
        <div className="form-field"><input placeholder="Usuario" /></div>
        <div className="form-field"><input placeholder="Email" /></div>
        <div className="form-field"><input placeholder="Contraseña" type="password"/></div>
        <button className="btn" type="submit">Registrar</button>
      </form>
    </div>
  )
}
