import { Button, CircularProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchOneClothe } from '../http/clotheAPI';

const ClothPage = () => {

  const [clothe, setClothe] = useState({ info: [] })
  const [clotheLoading, setClotheLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { id } = useParams();
  console.log(id)

  useEffect(() => {
    fetchOneClothe(id).then(data => {
      setClothe(data)
      setClotheLoading(false)
    }).catch(e => {
      setError(true)
      setErrorMessage(`${e}`)
      setClotheLoading(false)
      console.log('start')
    })
  }, [])

  return (
    <div>
      {clotheLoading ?
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: "100%", height: 300 }}>
          <CircularProgress color="secondary" />
        </div>
        : error ?
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: "100%", height: 300 }}>
            <div style={{width: '70%'}}>
              <Alert  variant="filled" severity="error">{errorMessage}</Alert>
            </div>
          </div>
          :
          <div style={{ display: 'flex', maxWidth: 1000, margin: "20px auto" }}>
            <img alt="одежда" width="335px" height="501px" style={{ objectFit: 'cover' }} src={"https://mighty-atoll-55052.herokuapp.com/" + clothe.img} />
            <div style={{ maxWidth: 400, width: '100%', marginLeft: 30 }}>
              <div className="clothe-page__top-info">
                <h5>{clothe.name}</h5>
                <h5>Рейтинг: {clothe.rating}</h5>
                <h5>Цена: {clothe.price}тг</h5>
                <Button variant="outlined">
                  Добавить в корзину
                </Button>
              </div>
              <div>
                {
                  clothe.info.map((description, index) =>
                    <div style={{ padding: "5px 10px", background: index % 2 === 0 ? "#E2B661" : "#fff" }} key={description.id}>
                      {description.title + ": " + description.description}
                    </div>
                  )
                }
              </div>
            </div>
          </div>
      }
    </div>

  )
}

export default ClothPage;