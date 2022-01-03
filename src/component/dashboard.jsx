import {useState,useEffect} from "react";
import api from '../service/api.service';
import Container from 'react-bootstrap/Container';
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";


const Dashboard = () => {
    const [data, setData] = useState([]);
    const time = 60000;

    useEffect(() => {
        const load = setInterval(() => {
            return (
                api.get(`http://191.252.93.122/desafio-front-end/api/index.php`).then((res) => {
                    console.log(res.data);
                    setData(res.data);
                })
            )
        }, time);
        return() => clearInterval(load);
    }, [data]);

    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    return (
        <Container className="mx-auto">
            <Table striped bordered responsive >
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Origem</th>
                    <th>Destino</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                {data?.map((info) => (
                  <tr key={info.id}>
                    <td>{info.id}</td>
                    <td>{info.origem}</td>
                    <td>{info.destino}</td>
                    <td>
                        <Dropdown>
                            <Dropdown.Toggle variant="outline-secondary" id={`dropdown-${info.id}`}>
                            {capitalize(info.estado)}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Em curso</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Chamando</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Em Fluxo de Seleção</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </td>
                  </tr>
                  ))}
                </tbody>
            </Table>
            <Dropdown>
              <Dropdown.Toggle drop="end" variant="success" id="dropdown-basic">
                Dropdown Button
              </Dropdown.Toggle>          
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Container>
    )

}

export default Dashboard;