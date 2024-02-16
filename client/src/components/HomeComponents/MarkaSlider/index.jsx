import React, { useEffect, useState } from "react";
import "./index.scss";
import Marquee from "react-fast-marquee";
import axios from "axios";

const Marka = () => {
  const [data, setData] = useState([])

  async function getData() {
    const res=await axios("http://localhost:5000/marka")
    setData(res.data)
  
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <section id="marka">
      <div>
        <Marquee>
          <div className="markas">
            {
              data && data.map(x=>
                    <div key={x._id} className="marka">
  <img src={x.image} alt="" />
</div> 
                )
            }
       

          </div>

        </Marquee>
       
      </div>
    </section>
  );
};

export default Marka;
