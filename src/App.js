import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ADD_RECORD, DELETE_RECORD, EDIT_RECORD, UPDATE_RECORD } from './action/action';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  let record = useSelector(state => state.Crud.users);
  let singlerecord = useSelector(state => state.Crud.user);
  const [editid, setEditId] = useState("");
  const [alldata, setAllData] = useState(record)
  const [input, setInput] = useState({
    name: '',
    phone: '',
    email: '',
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input, [name]: value
    })
  }
  const handleSubmit = () => {

    if (editid) {
      let obj = {
        id: editid,
        name: input.name,
        phone: input.phone,
        email: input.email,
      }
      dispatch(UPDATE_RECORD(obj));
      alert("Record successfully Edit");
      setEditId("");
    } else {
      let obj = {
        id: Math.floor(Math.random() * 100000),
        name: input.name,
        phone: input.phone,
        email: input.email,
      }
      dispatch(ADD_RECORD(obj));
      alert("Record successfully insert");
    }
    setInput({
      name: '',
      phone: '',
      email: '',
    })
  }

  useEffect(() => {
    setInput({
      name: singlerecord.name,
      phone: singlerecord.phone,
      email: singlerecord.email,
    })
    setEditId(singlerecord.id)
  }, [singlerecord])

  return (
    <center>
      <h1 className='text-white m-5'>Employee List</h1>
      <div className='tr'>
        <ul>
          <li className='text-white pe-3 fs-5 fw-bold mb-4'><span className='pe-4'>Employee First Name :-</span>
            <input type='text' className='rounded-3' name='name' onChange={handleChange} value={input.name} /></li>
        </ul>
        <ul>
          <li className='text-white pe-3 fs-5 fw-bold mb-4'><span className='pe-4'>Employee Last Name :-</span>
            <input type='text' className='rounded-3' name='phone' onChange={handleChange} value={input.phone} />
          </li>
        </ul>
        <ul>
          <li className='text-white pe-3 fs-5 fw-bold mb-3'><span className='pe-5'>Employee Email Id :-</span>
            <input type='text' className='rounded-3' name='email' onChange={handleChange} value={input.email} />
          </li>
        </ul>
        <ul>
          <li className='mt-4'> {
            editid ? (<input type='button' className='fw-bold p-2 px-4 mb-4 rounded-3' onClick={() => handleSubmit()} value='Edit' />) : (<input type='button' className='fw-bold p-2 px-4 mb-4 rounded-3' onClick={() => handleSubmit()} value='Submit' />)
          }</li>
        </ul>
      </div>

      <table className="table table-striped border">
        <thead className='p-4'>
          <tr className='py-4 w-100'>
            <th scope="col" className='fs-5 text-center py-4'>Id</th>
            <th scope="col" className='fs-5 text-center py-4'>Employee First Name</th>
            <th scope="col" className='fs-5 text-center py-4'>Employee Last Name</th>
            <th scope="col" className='fs-5 text-center py-4'>Employee Email Id</th>
            <th scope="col" className='fs-5 text-center py-4'>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            record.map((val) => {
              return (
                <tr>
                  <td className='text-center py-3' scope="row">{val.id}</td>
                  <td className='text-center py-3'>{val.name}</td>
                  <td className='text-center py-3'>{val.phone}</td>
                  <td className='text-center py-3'>{val.email}</td>
                  <td className='text-center py-3'>
                    <button className='me-3 p-1 px-3 bg-white fw-bold text-dark border-1 rounded-1' onClick={() => dispatch(EDIT_RECORD(val.id))}>Edit</button>
                    <button className='p-1 px-3 bg-white fw-bold text-dark border-1 rounded-1' onClick={() => dispatch(DELETE_RECORD(val.id))}>Delete</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>

    </center>
  );
}

export default App;
