import React, {useState, useMemo} from 'react'
import api from '../../services/api'
import camera from '../../assets/camera.svg'
import './styles.css'

export default function New({history}){
    const [company, setCompany] = useState('')
    const [techs, setTechs] = useState('')
    const [price, setPrice] = useState('')
    const [thumbnail, setThumbnail] = useState(null)

    const preview = useMemo(() =>{
            return  thumbnail ? URL.createObjectURL(thumbnail) : null
        }, [thumbnail])

    async function handleSubimit(e){
        e.preventDefault()
        const data = new FormData()
        const user_id = localStorage.getItem('user')

        data.append('thumbnail', thumbnail)
        data.append('company', company)
        data.append('techs', techs)
        data.append('price', price)

        await api.post('/spots', data, {
            headers: { user_id}
        })

        history.push('/dashboard')

    }

    return (
        <>
            <form onSubmit={handleSubimit}>
                <label id="thumbnail"
                        style={{backgroundImage: `url(${preview})`}}
                        className={thumbnail ? 'has-thumbnail' : ''} >
                    <input id="thumbnail" type="file" onChange={event => setThumbnail(event.target.files[0])}/>
                    <img id="thumbnail" src={camera} alt="Selec imagem"/>
                </label>

                <label htmlFor="company">EMPRESA *</label>
                <input
                    id="company"
                    placeholder="Sua empresa incrivel"
                    value={company}
                    onChange={event => setCompany(event.target.value)}
                />
                <label htmlFor="company">TECNOLOGIOA *(separadas por ,)</label>
                <input
                    id="techs"
                    placeholder="Sua empresa incrivel"
                    value={techs}
                    onChange={event => setTechs(event.target.value)}
                />
                <label htmlFor="company">VALOR DIARIA *(em branco para gratuito)</label>
                <input
                    id="price"
                    placeholder="Valor cobrado por dia"
                    value={price}
                    onChange={event => setPrice(event.target.value)}
                />
                <button className="btn" type="submit">Cadastrar</button>
                
            </form>
        </>
    )
}