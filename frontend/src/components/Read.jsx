import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
const Read = () => {
  const[data,setData]=useState([]);
  const[error,SetError]=useState(null);
  async function getData(){
    const response = await fetch("http://localhost:5000");
    const result= await response.json();

    if(response.ok){
      setData(result);
    }
    else{
      console.log(result.error);
      SetError(result.error);
    }
  }

  const handleDelete=async(id)=>{
    const response=await fetch(`http://localhost:5000/${id}`,{
      method :"DELETE"
    });
    const result = await response.json();

    if(response.ok){
       SetError("Deleted Successfully");
       setTimeout(()=>{
         SetError("");
         getData();
       },2000)
    }
    else{
      SetError(result.error);
      console.log(result.error);
    }
  }
  useEffect(()=>{getData();},[]);
  console.log(data);
  return (
    <div className='container my-2'>
    <h2 className="text-center">All data</h2>
    {error && <div class="alert alert-danger" role="alert">
  {error}
</div>}
    <div className="row">
    {data.map((ele)=>(<div className="col-3">
      <div key={ele._id}className="card">
  <div className="card-body">
    <h5 className="card-title">{ele.name}</h5>
    <h6 className="card-subtitle mb-2 text-body-secondary">{ele.email}</h6>
    <p className='text-muted'>{ele.age}</p>
    <a href="#" className="card-link" onClick={()=>handleDelete(ele._id)}>Delete</a>
    <Link to={`/${ele._id}`}  className="card-link">Edit</Link>
  </div>
</div>
      </div>))}
      
    </div>
      
    </div>
  )
}

export default Read
