import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faVirusSlash,
    faHeadSideCoughSlash,
    faHeadSideMask,
    faHandsWash,
    faPeopleArrows,
    faHouseUser,
    faLaptopHouse,
    faHandshakeSlash,
    faPumpMedical,
    faPlaneSlash,
    faStoreSlash,
    faShieldVirus } from '@fortawesome/free-solid-svg-icons'
import './App.css';

function App() {
  return (
    <div className="App">
        <header className="App-header">
                <div className="col-sm-12">
                    <h1 style={{ fontSize: '3rem'}}>
                        <img src={process.env.PUBLIC_URL + '/img/map.svg'} className="App-logo" alt="logo" /><br/>
                        <span className="text-india">INDIA</span>
                    </h1>
                    <b>VERSUS</b>
                    <h1 style={{ fontSize: '3rem'}}>
                      <span className="text-covid-19">C<FontAwesomeIcon icon={faVirusSlash} />VID-19</span>
                    </h1>
                </div>
                <div className="col-sm-12 mt-3">
                    <p>
                        This website is <span style={{'color': '#ffa928'}}><code>under development</code></span>. Please check back again.<br/>
                        <h3><code><b>STAY HOME! SAVE LIVES!</b></code></h3><button className="btn btn-dark btn-lg">Help stop coronavirus!</button> 
                    </p>
                </div>

            <div className="container mt-5">
                <div className="row justify-content-md-center">
                    <div className="col-sm-1">
                      <h1><FontAwesomeIcon icon={faHeadSideCoughSlash} className="text-danger" /></h1>
                      <div className="caution-msg">Cover your cough</div>
                    </div>
                    <div className="col-sm-1">
                      <h1><FontAwesomeIcon icon={faHeadSideMask} className="text-success" /></h1>
                      <div className="caution-msg">Wear masks</div>
                    </div>
                    <div className="col-sm-1">
                      <h1><FontAwesomeIcon icon={faHandsWash} className="text-success" /></h1>
                      <div className="caution-msg">Wash hands often</div>
                    </div>
                    <div className="col-sm-1">
                      <h1><FontAwesomeIcon icon={faPeopleArrows} className="text-success" /></h1>
                      <div className="caution-msg">Keep social distancing</div>
                    </div>
                    <div className="col-sm-1">
                      <h1><FontAwesomeIcon icon={faHouseUser} className="text-success" /></h1>
                      <div className="caution-msg">Stay Home</div>
                    </div>
                    <div className="col-sm-1">
                      <h1><FontAwesomeIcon icon={faLaptopHouse} className="text-success" /></h1>
                      <div className="caution-msg">Work from home</div>
                    </div>
                    <div className="col-sm-1">
                      <h1><FontAwesomeIcon icon={faHandshakeSlash} className="text-danger" /></h1>
                      <div className="caution-msg">Do not shake hands</div>
                    </div>
                    <div className="col-sm-1">
                      <h1><FontAwesomeIcon icon={faPumpMedical} className="text-success" /></h1>
                      <div className="caution-msg">Use sanitizers and handwash often</div>
                    </div>
                    <div className="col-sm-1">
                      <h1><FontAwesomeIcon icon={faPlaneSlash} className="text-danger" /></h1>
                      <div className="caution-msg">Do not travel</div>
                    </div>
                    <div className="col-sm-1">
                      <h1><FontAwesomeIcon icon={faStoreSlash} className="text-danger" /></h1>
                      <div className="caution-msg">Do not panic for essentials</div>
                    </div>
                    <div className="col-sm-1">
                      <h1><FontAwesomeIcon icon={faShieldVirus} className="text-success" /></h1>
                      <div className="caution-msg">Stay Safe</div>
                    </div>
                </div>
            </div>
      </header>
    </div>
  );
}

export default App;
