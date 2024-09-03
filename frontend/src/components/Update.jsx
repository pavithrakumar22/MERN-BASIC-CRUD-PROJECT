import React,{useEffect, useState} from 'react'
import { useParams,useNavigate} from 'react-router-dom';

const Update = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");
  const {id}= useParams();
  const navigate = useNavigate();
  const getSingleUser=async ()=>{
    
    const response=await fetch(`http://localhost:5000/${id}`);
    const result=await response.json();
    if(response.ok){
      setError("");
      console.log("updated user ",result);
      setName(result.name);
      setEmail(result.email);
      setAge(result.age);
    }
    else{
      console.log(result.error);
      setError(result.error);
    }
  }

  const handleUpdate = async(e) =>{
    e.preventDefault();

    // Validate inputs
    if (!name || !email || !age) {
      setError("All fields are required.");
      return;
    }

    const updatedUser = { name, email, age: parseInt(age) };

    try {
      const response = await fetch(`http://localhost:5000/${id}`, {
        method: "PATCH",
        body: JSON.stringify(updatedUser),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (!response.ok) {
        // Set error message from backend response
        setError(result.error || "Something went wrong.");
      } else {
        // Clear form and navigate
        setName("");
        setEmail("");
        setAge("");
        setError("");
        navigate("/all");
      }
    } catch (err) {
      // Handle network errors
      setError("Network error. Please try again later.");
    }
  }
  useEffect(()=>{getSingleUser()},[])
  return (
    <div>
    <div className='container my-2'>
      <h2 className='text-center'>Edit the data</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Edit</button>
      </form>
    </div>
  
    </div>
  )
}

export default Update
