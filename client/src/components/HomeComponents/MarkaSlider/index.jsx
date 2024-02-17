import React, { useEffect, useState } from "react";
import "./index.scss";
import Marquee from "react-fast-marquee";
import axios from "axios";

const Marka = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  async function getData() {
    const res=await axios("http://localhost:5000/marka")
    setData(res.data)
  setLoading(false)
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
              loading ? <span className="loader"></span>  :(
              data && data.map(x=>
                    <div key={x._id} className="marka">
  <img src={x.image} alt="" />
</div> 
                )
           ) }
       

          </div>

        </Marquee>
       
      </div>
    </section>
  );
};

export default Marka;
