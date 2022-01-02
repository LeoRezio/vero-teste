import {useState,useEffect} from "react";
import api from '../service/api.service';
import {Table} from 'react-bootstrap';

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

    return (
        <>
        <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                  <th>Table heading</th>
              </tr>
            </thead>
            <tbody>
            {data?.map((info) => (
              <tr>
                <td>{info.id}</td>
                <td>{info.origem}</td>
                <td>{info.destino}</td>
                <td>{info.estado}</td>
              </tr>
              ))}
            </tbody>
        </Table>
        </>
    )

}

export default Dashboard;