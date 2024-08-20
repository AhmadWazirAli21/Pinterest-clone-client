import './Home.css'
import { useContext } from 'react';
import { MainContext} from '../../context/main'
import PinBox from '../../components/PinBox/PinBox';
function Home() {
  const { allPins} =useContext(MainContext);
  return (
    <>
   {allPins?.length === 0 ? <div className="no-pins">
        <p>Thers is no pins yet</p>
    </div> :
      <div id="home" className="home-page-container">
       {allPins.map((ele, index) => {
              return <PinBox 
                key={index}
                id={ele._id}
                img={ele?.img_url}
              />
            })}
      </div>}
    </>
  );
}

export default Home