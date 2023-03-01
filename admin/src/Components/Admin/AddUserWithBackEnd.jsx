import axios from 'axios';


const acceptPatient = async(patient)=>{
  try {
    const res = await axios.post(`http://localhost:3001/api/v1/auth/registration`, patient);
  } catch (error) {
    console.log(error);
  }
}


export default acceptPatient;