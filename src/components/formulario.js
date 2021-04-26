import React from 'react';
import { Input, notification } from 'antd';
const { Search } = Input;

function Formulario ({setDatosFinales}) {

    function validarForm (e) { e.preventDefault() }

    const onSearch = value => { 

            if (value.trim() === '' ) {
                return openNotification('info');
            }
            setDatosFinales(value);
    }
    //al clickear en buscar primero ejecuta onSearch y luego validarForm entonces luego de validar el Search y mandar la información a DatosFinales ejecutará el e.preventDefault(). Tener en cuenta que al principio utilizaba un estado para guardar los datos y solo me manejaba con validarForm la cual tenía la lógica de onSearch pero sin promesas entonces al incluir antd tuve que modificar algunas cosas por la forma en que trabaja el componente Search

    const openNotification = (type) => {
        notification[type]({
          message: 'Campo incompleto!',
          description:
            'Por favor completa el formulario de búsqueda'
        });
      };

    return (<>
        <form onSubmit={validarForm} style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', marginTop:20}}>
            <Search placeholder="Busca imágenes" allowClear enterButton="Search" size="large" onSearch={onSearch} style={{width:500}}/>
        </form>
        </>
    )
}

export default Formulario
