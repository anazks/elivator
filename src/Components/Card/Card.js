import React, { useState, useEffect } from 'react';
import Axios from '../../Axios';
import { firebaseApp } from '../../firebase';
import { getDatabase, ref, set } from 'firebase/database';
import './Card.css';

const Card = () => {
  const [admissionNumber, setAdmissionNumber] = useState('');
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null); // Track selected student
  const [showContents, setShowContents] = useState(false);
  const [Value,SetValue]=  useState(1)
  const handleAdmissionNumberChange = (event) => {
    setAdmissionNumber(event.target.value);
  };

  const findStudentByAdmissionNumber = () => {
    Axios.get(`/findStudent?admissionNumber=${admissionNumber}`)
      .then((response) => {
        if (response.data) {
          setSelectedStudent(response.data);
          setShowContents(true); // Show the contents div
        } else {
          setSelectedStudent(null);
          setShowContents(false); 
        }
      })
      .catch((error) => {
        console.error('Error finding student: ', error);
        setSelectedStudent(null);
        setShowContents(false); 
      });
  };

  const generateRandomValue = () => {
    return Math.floor(Math.random() * 100) + 1;
  };

  const updateFirebaseValue = (id) => {
    console.log(id, '--id');
    const data = {
      id,
    };
    Axios.post('/updatePayment', data)
      .then((response) => {
        if (response.data) {
          console.log('Data updated');

        }
      })
      .catch((error) => {
        console.error('Error updating data: ', error);
      });
  };

  useEffect(() => {
    try {
      
    } catch (error) {
      console.error('Error fetching students: ', error);
    }
  }, []);

  const handleRowClick = (student) => {
    setSelectedStudent(student); 
  };
  const openPaymentModal = (id) => {
    const options = {
      key: 'rzp_test_CTX1puiGnZAbrV', // Replace with your actual Razorpay API key
      amount: 10000, // Amount in paise (e.g., 10000 represents ₹100)
      currency: 'INR',
      name: 'Your Company Name',
      description: 'Payment for Service/Product',
      image: 'https://yourwebsite.com/logo.png', // URL of your company logo
      handler: function(response) {
        alert(`Payment successful. Payment ID: ${response.razorpay_payment_id}`);
        updateFirebaseValue(id)
      }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

    const BlockF = ()=>{
      try {
        const database = getDatabase(firebaseApp);
        const valueRef = ref(database, '/room1');
        console.log('block f')
        // SetValue(randomValue)
        set(valueRef, 1)
          .then(() => {
            console.log('Value updated successfully');
           
          })
          .catch((error) => {
            console.error('Error updating value: ', error);
          });
      } catch (error) {
        console.log(error)
      }
    }
    const BlockS = ()=>{
      try {
        const database = getDatabase(firebaseApp);
        const valueRef = ref(database, '/room1');
        console.log('block f')
        // SetValue(randomValue)
        set(valueRef,2 )
          .then(() => {
            console.log('Value updated successfully');
           
          })
          .catch((error) => {
            console.error('Error updating value: ', error);
          });
      } catch (error) {
        console.log(error)
      }
    }
    const BlockT = ()=>{
      try {
        const database = getDatabase(firebaseApp);
        const valueRef = ref(database, '/room1');
        console.log('block f')
        // SetValue(randomValue)
        set(valueRef, 3)
          .then(() => {
            console.log('Value updated successfully');
         
          })
          .catch((error) => {
            console.error('Error updating value: ', error);
          });
      } catch (error) {
        console.log(error)
      }
    }
    const unblock = ()=>{
      try {
        const database = getDatabase(firebaseApp);
        const valueRef = ref(database, '/room1');
        console.log('block f')
        // SetValue(randomValue)
        set(valueRef, 10)
          .then(() => {
            console.log('Value updated successfully');
           
          })
          .catch((error) => {
            console.error('Error updating value: ', error);
          });
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <div className='Card-Container'>
      <div className='items student'>
        <div className='Student-input'>
          <h3>Block Floor</h3>    
           <button onClick={BlockF}>Bloack First Floor</button>
           <button onClick={BlockS}>Bloack second Floor</button>
           <button onClick={BlockT}>Bloack Third Floor</button> <br></br>
           <button onClick={unblock}>Unblock</button>
        </div>
      </div>

      {/* Render the Contents div only if selectedStudent is not null */}
      {selectedStudent && (
        <div className={`items ${showContents ? 'slide-in' : ''}`}>
          <div className='Contents'>
            <h3>Details</h3>
            <table>
              <tbody>
                <tr>
                  <th>Name:</th>
                  <td>{selectedStudent.name}</td>
                </tr>
                <tr>
                  <th>Sem:</th>
                  <td>{selectedStudent.sem}</td>
                </tr>
                <tr>
                  <th>Department:</th>
                  <td>{selectedStudent.batch}</td>
                </tr>
                <tr>
                  <th>Payment Status:</th>
                  <td>{selectedStudent.status}</td>
                </tr>
              </tbody>
            </table>
            <br />
            {/* Pay Now button */}
            <button
              onClick={() => openPaymentModal(selectedStudent._id)}
              className='print'
            >
              Pay Now
            </button>
            <button type='' className='cancel'>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;