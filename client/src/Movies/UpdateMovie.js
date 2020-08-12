import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams, useHistory } from 'react-router-dom'



const UpdateMovie = (props) => {

    const initialItem = {
        title: '',
        director: '',
        metascore: ''
    }
    
    const [item, setItem] = useState(initialItem)
    const { id } = useParams();
    const {goBack} = useHistory();

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then((res) => {
                console.log('get from UpdateMovie', res)
                setItem(res.data);
            })
            .catch((err) => {
                console.error('failed get from UpdateMovie', err.message)
            })
    }, [id])

    

    const handleChanges = (e) => {
        e.persist();
        let value = e.target.value;
        if (e.target.name === 'metascore') {
            value = parseInt(value, 10)
        }

        setItem({
            ...item,
            [e.target.name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .put(`http://localhost:5000/api/movies/${id}`, item)
            .then((res) => {
                console.log('put response from UpdateMovie', res)
                props.setMovieList(res.data);
                goBack();
            })
            .catch((err) => {
                console.error('failed put from UpdateMovie', err.message)
            })

    }
    return (
        <>
        <div className='update-container'>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type='text'
                        name='title'
                        placeholder='Title'
                        value={item.title}
                        onChange={handleChanges}
                    />
                </div>
                <div>
                    <input
                        type='text'
                        name='director'
                        placeholder='Director'
                        value={item.director}
                        onChange={handleChanges}
                    />
                </div>
                <div>
                    <input
                        type='text'
                        name='metascore'
                        placeholder='Metascore'
                        value={item.metascore}
                        onChange={handleChanges}
                    />
                </div>
                <button type='submit' onSubmit={handleSubmit}>Update</button>
            </form>
        </div>
  
        
        </>
    )
}

export default UpdateMovie;


//director
//id
//metascore
//title:  