import { useState } from "react";

export default function Front() {
  const [searchBar, setSearchBar] = useState(false);

  const styles = {
    div1: {fontFamily: "'Poppins', sans-serif",textAlign: 'center',fontSize: '3rem',color: 'yellow',fontWeight: 'bold',marginBottom: '10px',},
    div2: {fontFamily: "'Poppins', sans-serif",textAlign: 'center',fontSize: '1.8rem',color: 'white',fontStyle: 'italic',},
  };

  return (
    <section className="z-10">
      <div className="sm:w-11/12 mx-auto">
        <div
          className="relative py-8 sm:rounded-3xl w-full h-[620px] bg-homefrontbg bg-cover bg-center bg-no-repeat"
          style={{ position: 'relative', overflow: 'hidden' }}
        >
          <div className="absolute inset-0 flex items-center justify-center text-black text-[50px] font-bold">
            <div className="text-center">
            <div style={styles.div1}>COLLEGE PREDICTOR</div>
            <div style={styles.div2}>Find Suitable College</div>
            </div>
          </div>
          <div className="absolute bottom-[24%] sm:left-[6%] left-[5%] flex items-center flex-wrap gap-4">
          </div>
        </div>
      </div>
    </section>
  );      
}  
