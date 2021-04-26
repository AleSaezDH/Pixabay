import React, { useEffect, useState } from 'react';
import Formulario from './formulario';
import MostrarImagenes from './mostrarImagenes';
import Logo from '../logo.png';
import { Spin, Button, notification, Input } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const { Search } = Input;

function Home () {

    const [datosFinales, setDatosFinales] = useState('');
    const [imagenes, setimagenes] = useState([]);
    const [paginador, setPaginador] = useState(1);
    const [tope, setTope] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(datosFinales === '') return ;
        setimagenes([]); // para que el loading aparezca solo cuando se vuelve a hacer una consulta y no se vean las imágenes cargadas previamente
        setLoading(true);
        let imagenesPorPagina = 30;
        setTimeout(() => {
            fetch(`https://pixabay.com/api/?key=21331349-aa61d3f95de32ebf2d31453dc&q=${datosFinales}&page=${paginador}&per_page=${imagenesPorPagina}`)
            .then(response => response.json())
            .then(datos => {
                if (datos.total == 0) {
                    setLoading(false);
                    return openNotification('info');
                }
                let cantidadPaginas = Math.ceil(datos.totalHits / imagenesPorPagina);
                setTope(cantidadPaginas);
                setimagenes(datos.hits);
                setLoading(false);
                let formulario = document.querySelector('form');
                formulario.scrollIntoView({ behavior: 'smooth' });
            });
        }, 500);
        // el timeout es simplemente porque a veces carga muy rápido entonces al ser tan rápida la respuesta se ve raro que el ícono del loading aparezca tan poquito quizá se puede interpretar como un error y de esta manera se ve bien claro
    }, [datosFinales, paginador]);

    const openNotification = (type) => {
        notification[type]({
          message: 'Búsqueda vacía',
          description:
            'La API no encontró ningúna imágen que coincida con tu búsqueda'
        });
      };

    const antIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />;

    return (<>
        <div style={{display:'flex', justifyContent:'center', marginTop:100}}><img src={Logo}></img></div>
        <Formulario setDatosFinales={setDatosFinales}/>
        {loading ? <Spin indicator={antIcon} style={{display:'flex', justifyContent:'center', marginTop:70}}/> : null}
        {imagenes.length !== 0 ? <MostrarImagenes imagenes={imagenes}/> : null}
        <div style={{display:'flex', justifyContent:'space-around', padding:'0 550px 70px 550px'}}>
        {paginador !== 1 && imagenes.length !== 0 ? <Button type="primary" onClick={() => setPaginador(paginador - 1)}>Anterior</Button> : null}
        {paginador !== tope && imagenes.length !== 0 ? <Button type="primary" onClick={() => setPaginador(paginador + 1)}>Siguiente</Button> : null}
        </div>
        </>
    )
}

export default Home;

/*<Button type="primary" shape="round" icon={<DownloadOutlined />} size={size}>
          Download
        </Button>*/
