import React from 'react';
import { Card, Popover } from 'antd';
import { DownloadOutlined, HeartOutlined } from '@ant-design/icons';

function MostrarImagenes ({imagenes}) {

    const { Meta } = Card;

    return <div style={{display:'flex', flexWrap:'wrap', justifyContent:'space-around', margin:'70px 50px'}}>
    {imagenes.map(imagen => {
            return <a href={imagen.largeImageURL} target='_blank' style={{marginTop:40}}>
            <Popover content='Click para ver completa'>
                <Card key={imagen.id} hoverable style={{width:imagen.previewWidth*1.19, marginLeft:20, marginRight:20}} cover={<img src={imagen.previewURL} />}>
                    <Meta title={imagen.type} style={{textTransform:'capitalize'}} />
                    <p style={{marginTop:30}}><DownloadOutlined /> {imagen.downloads} </p>
                    <p><HeartOutlined /> {imagen.likes} </p>
                </Card>
            </Popover>
            </a>
        })}
        </div>
}

export default MostrarImagenes;

// <Popover content={content} title="Title">
//<Button type="primary">Hover me</Button>
//</Popover>