import {useState,useEffect} from "react";
import api from '../service/api.service';
import Container from 'react-bootstrap/Container';
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";


const Dashboard = () => {
    const [data, setData] = useState([]);
    const [modal,setModal] = useState(false);
    const [status,setStatus] = useState()
    const time = 30000;

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

    
    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    const updateState = (id, selected) => {
      const params = { id: id, estado: selected}
      api.get(`http://191.252.93.122/desafio-front-end/api/update.php`, {params} ).then((res) => {
        console.log(res.data);
        console.log(params);
        setStatus(res.data.status);
        if (res.data.status === 200) {
          data[id - 1].estado = selected;
        }
      })
      setModal(true);
    }
    const closeModal = () => setModal(false)
    return (
        <Container className="mx-auto">
            <Table striped bordered responsive >
                <thead>
                  <tr>
                    <th className="text-center">ID</th>
                    <th className="text-center">Origem</th>
                    <th className="text-center">Destino</th>
                    <th className="text-center">Estado</th>
                  </tr>
                </thead>
                <tbody>
                {data?.map((info) => (
                  <tr key={info.id}>
                    <td className="text-center">{info.id}</td>
                    <td className="text-center">{info.origem}</td>
                    <td className="text-center">{info.destino}</td>
                    <td>
                        <Dropdown className="text-center" onSelect={(selectedKey) => updateState(info.id, selectedKey)}>
                            <Dropdown.Toggle  variant="outline-secondary" id={`dropdown-${info.id}`}>
                            {capitalize(info.estado)}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="em curso">Em curso</Dropdown.Item>
                                <Dropdown.Item eventKey="chamando">Chamando</Dropdown.Item>
                                <Dropdown.Item eventKey="em fluxo de selecao">Em Fluxo de Seleção</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </td>
                  </tr>
                  ))}
                </tbody>
            </Table>
            <Modal
              show={modal}
              onHide={closeModal}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Body className="fs-2 text-center">
                {status}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                  Fechar
                </Button>
              </Modal.Footer>
            </Modal>
          </Container>
    )

}

export default Dashboard;