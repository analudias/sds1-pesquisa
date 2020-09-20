import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';
import { RecordsReponse } from './types';
import { formatDate } from './helpers';
import Pagination from './Pagination';
import Filters from '../../components/Filters';

const BASE_URL = 'https://sds1-ana.herokuapp.com';

const Records = () => {

    const [ recordsResponse, setRecordsResponse] = useState<RecordsReponse>();  /** useState - criando estado interno para o componente */ /**haverá no estado deste componente um payload com a estrura do records que vamos usar */
    const [activePage, setActivePage] = useState(0);

    useEffect(() => {
        axios.get(`${BASE_URL}/records?linesPerPage=12&page=${activePage}`)
        .then(response => setRecordsResponse(response.data));/** este bloco de código é iniciado assim que o componente executar */
    }, [activePage]);/**sempre que for clicado em um item diferente, esse bloco será executado*/

    const handlePageChange = (index: number) => {
        setActivePage(index)
    }

    return (
        <div className="page-container">    
        <Filters  link="/charts" linkText="VER GRÁFICO"/>     
            <table className="records-table" cellPadding="0" cellSpacing="0">{/*espaçamento dentro de uma célula*/}{/*espaçamento dentro de uma célula e outra*/}
                <thead>
                    <tr>
                        <th>INSTANTE</th>{/*células de um thead*/}
                        <th>NOME</th>
                        <th>IDADE</th>
                        <th>PLATAFORMA</th>
                        <th>GÊNERO</th>
                        <th>TÍTULO DO GAME</th>
                    </tr>
                </thead>
                <tbody>
                    {recordsResponse?.content.map(record => (
                        <tr key={record.id}>
                            <td>{formatDate(record.moment)}</td>
                            <td>{record.name}</td>
                            <td>{record.age}</td>
                            <td className="text-secondary">{record.gamePlatform}</td>
                            <td>{record.genreName}</td>
                            <td className="text-primary">{record.gameTitle}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination 
                activePage={activePage}
                goToPage={handlePageChange}
                totalPages={recordsResponse?.totalPages}
            />
        </div>
    );
}

export default Records;