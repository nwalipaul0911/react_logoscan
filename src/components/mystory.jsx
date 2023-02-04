import { useState } from "react";
import Options from "./templates/options";
import front_image from "../assets/LOGO_SCAN_17_sept_22_APP.jpg";
import { useEffect } from "react";
import { setResults } from "./reducers/resultreducer";
import { setLogo } from "./reducers/logoreducer";
import { useDispatch, useSelector } from "react-redux";

const MyStory = () => {
  const [logos, setLogos] = useState([])
  const [selected, setSelected]= useState('')
  const dispatch = useDispatch()

  const formSubmit = async (e) => {
    e.preventDefault();
    const url = "http://100091.pythonanywhere.com/upload-logo/";
    const logoImage = e.target.image.files[0];
    var formData = new FormData();
    formData.append("image", logoImage);
    const request = await fetch(url, {
      method: "POST",
      body: formData,
    });
    const response = await request.json();

    if (request.status == 201) {
      setLogos(response.results)
    }
  };
  const selectImage = ()=>{
    document.querySelector('#image-input').click()
  }
  const selectedUrl = (e)=>{
    e.preventDefault()
    const logoImage = e.target.files[0]
    setSelected(URL.createObjectURL(logoImage))
    
  }
  return (
    <div style={{ height: "85vh", position: "relative", background: "rgba(0,0,0)" }}>
      <Options />
      <ul className="ms-1" style={{ position: "absolute" }}>
        <li>
          <i className="fa-solid fa-camera text-light btn btn-danger py-2 my-1" onClick={()=>selectImage()}></i>
        </li>
      </ul>
      <div className="col-12 ">
        <div className="col-2 mx-auto my-4 pt-4">
          <img src={selected!==''?selected:front_image} className="img-fluid" style={{aspectRatio:4/3}} />
        </div>
        <div className="logo-result-container mx-auto">
           <div className="d-flex">
            {logos.map((logo, index)=><div key={index} className="result-container bg-light mx-2"><img src={logo} className="img-fluid logo-result-img" /></div>         
)}
          </div>
        </div>
      </div>
      <form onSubmit={e=>{formSubmit(e)}} className="ms-auto col-2 py-2 position-absolute bottom-0 end-0">
        <input type="file" onChange={e=>selectedUrl(e)} name="image" className="hidden-input" id="image-input" />
        <input type="submit" value="Upload Image" className="btn btn-warning" />
      </form>
      
      
    </div>
  );
};

export default MyStory;
