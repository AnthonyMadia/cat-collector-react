import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getOne } from '../../services/cats'
import '../../styles/Form.css'

// Services


// Components
import CatInput from './CatInput'

// Image Assets
import NerdCat from '../../assets/nerd-cat.svg'

const CatForm = (props) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    id ? props.updateCat(form) : props.addCat(form)
    navigate(`/cats`)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    const fetchOne = async () => {
      const data = await getOne(id)
      setForm({
        id: data.cat.id,
        name: data.cat.name,
        breed: data.cat.breed,
        description: data.cat.description,
        age: data.cat.age
      })
    }
    id && fetchOne()
    return () => setForm({})
  }, [id])

  return (
    <>
      <div className="page-header">
        {id
          ? <h1>Edit Cat</h1>
          : <><h1>Add Cat</h1><img src={NerdCat} alt="A cat using a computer" /></>
        }
      </div>

      <section className="form-container">
        <form onSubmit={handleSubmit}>
          <CatInput form={form} handleChange={handleChange} />
          <button type="submit" className="btn submit">Submit!</button>
        </form>
      </section>
    </>
  )
}

export default CatForm