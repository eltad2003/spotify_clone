import React, { useEffect, useState } from 'react'
import fetchModel from '../../lib/fetchModel';
import './CategoriesSection.css'
import CardItem from '../../CardItem';
import TitleSection from '../../TitleSection';

function CategoriesSection() {
    const [categories, setCategories] = useState(null)

    useEffect(() => {
        fetchModel(`${process.env.REACT_APP_API}/browse/categories`)
            .then(data => { setCategories(data.categories); console.log('categories: ', data.categories) })
            .catch(err => console.log('error: ', err))
    }, [])

    return (
        <div className='container mt-3'>
            <TitleSection title={'Thể loại'} url={`/section`} />
            <CardItem list={categories} typeLink={'categories'} rounded={'circle'}>
                {item => (
                    <p className='fw-semibold mt-2 mb-0'>{item.name}</p>
                )}
            </CardItem>
        </div >
    )
}

export default CategoriesSection