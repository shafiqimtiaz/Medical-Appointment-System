import axios from 'axios';


const acceptPatient = async(patient)=>{
  try {
    const res = await axios.post('/auth/registration', patient);
  } catch (error) {
    console.log(error);
  }
}


export default acceptPatient;