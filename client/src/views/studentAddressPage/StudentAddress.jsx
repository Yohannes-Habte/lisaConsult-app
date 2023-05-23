import React, { useContext, useEffect, useState } from 'react';
import { CourseContext } from '../../context/course/CourseProvider';
import { useNavigate } from 'react-router-dom';
import { UserCartContext } from '../../context/userAndCart/UserCartProvider';
import './StudentAddress.scss';
import { COURSE_ACTION } from '../../context/course/CourseReducer';
import { toast } from 'react-toastify';

const StudentAddress = () => {
  // navigate to payment page
  const navigate = useNavigate();
  // Global state variables
  const { studentAddress, dispatch } = useContext(CourseContext);
  const { user } = useContext(UserCartContext);

  //! Local dynamic shipping address State Variables
  const [firstName, setFirstName] = useState(studentAddress.firstName || '');
  const [lastName, setLastName] = useState(studentAddress.lastName || '');
  const [profession, setProfession] = useState(studentAddress.profession || '');
  const [language, setLanguage] = useState(studentAddress.language || '');
  const [gender, setGender] = useState(studentAddress.gender || '');
  const [phone, setPhone] = useState(studentAddress.phone || '');
  const [address, setAddress] = useState(studentAddress.address || '');
  const [houseNo, setHouseNo] = useState(studentAddress.houseNo || '');
  const [zipCode, setZipCode] = useState(studentAddress.zipCode || '');
  const [city, setCity] = useState(studentAddress.city || '');
  const [state, setState] = useState(studentAddress.state || '');
  const [country, setCountry] = useState(studentAddress.country || '');

  //! When a user is not logged in, navigate to login page
    useEffect(() => {
      if (!user) {
        navigate('/course');
      }
    }, [user, navigate]);

  // Update inpute values
  const udpdateData = (e) => {
    switch (e.target.name) {
      case 'firstName':
        setFirstName(e.target.value);
        break;
      case 'lastName':
        setLastName(e.target.value);
        break;
      case 'profession':
        setProfession(e.target.value);
        break;
      case 'language':
        setLanguage(e.target.value);
        break;
      case 'gender':
        setGender(e.target.value);
        break;
      case 'phone':
        setPhone(e.target.value);
        break;
      case 'address':
        setAddress(e.target.value);
        break;
      case 'houseNo':
        setHouseNo(e.target.value);
        break;
      case 'zipCode':
        setZipCode(e.target.value);
        break;
      case 'city':
        setCity(e.target.value);
        break;
      case 'state':
        setState(e.target.value);
        break;
      case 'country':
        setCountry(e.target.value);
        break;
      default:
        break;
    }
  };

  // Set student registration data
  const setData = () => {
    setFirstName('');
    setLanguage('');
    setProfession('');
    setLanguage('');
    setGender('');
    setPhone('');
    setAddress('');
    setHouseNo('');
    setZipCode('');
    setCity('');
    setState('');
    setCountry('');
  };

   // useEffect
   useEffect(() => {
    if (!studentAddress.address) {
      navigate('/studentAddress');
    }
  }, [studentAddress, navigate]);

  // Submit student address
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !firstName ||
      !lastName ||
      !profession ||
      !language ||
      !gender ||
      !phone ||
      !address ||
      !houseNo ||
      !zipCode ||
      !city ||
      !state ||
      !country
    ) {
        toast.error("Fill in all input fields!")
    } else {
      try {
        const userAddress = {
          firstName: firstName,
          lastName: lastName,
          profession: profession,
          language: language,
          gender: gender,
          phone: phone,
          address: address,
          houseNo: houseNo,
          zipCode: zipCode,
          city: city,
          state: state,
          country: country,
        };

        dispatch({ type: COURSE_ACTION.STUDENT_ADDRESS, payload: userAddress });
        localStorage.setItem('studentAddress', JSON.stringify(userAddress));
        setData();
        navigate('/coursPayment');
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <main className="student-address-page">
      <section className="student-address-container">
        <h1 className="student-address-title"> Physical address </h1>
        <form
          action=""
          onSubmit={handleSubmit}
          className="student-address-form"
        >
          <div className="student-attributes">
            <div className="label-input-container">
              <label htmlFor="firstName"> First Name </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={udpdateData}
              />
            </div>

            <div className="label-input-container">
              <label htmlFor="lastName"> Last Name </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={udpdateData}
              />
            </div>

            <div className="label-input-container">
              <label htmlFor="profession"> Profession </label>
              <input
                type="text"
                id="profession"
                name="profession"
                value={profession}
                onChange={udpdateData}
              />
            </div>

            <div className="label-input-container">
              <label htmlFor="language"> Language </label>
              <input
                type="text"
                id="language"
                name="language"
                value={language}
                onChange={udpdateData}
              />
            </div>

            <div className="label-input-container">
              <label htmlFor="gender"> Gender </label>
              <input
                type="text"
                id="gender"
                name="gender"
                value={gender}
                onChange={udpdateData}
              />
            </div>

            <div className="label-input-container">
              <label htmlFor="phone"> Phone </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={phone}
                onChange={udpdateData}
              />
            </div>

            <div className="label-input-container">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={address}
                onChange={udpdateData}
              />
            </div>

            <div className="label-input-container">
              <label htmlFor="houseNo"> House Number </label>
              <input
                type="text"
                id="houseNo"
                name="houseNo"
                value={houseNo}
                onChange={udpdateData}
              />
            </div>

            <div className="label-input-container">
              <label htmlFor="zipCode"> Zip Code </label>
              <input
                type="number"
                id="zipCode"
                name="zipCode"
                value={zipCode}
                onChange={udpdateData}
              />
            </div>

            <div className="label-input-container">
              <label htmlFor="city"> City </label>
              <input
                type="text"
                id="city"
                name="city"
                value={city}
                onChange={udpdateData}
              />
            </div>

            <div className="label-input-container">
              <label htmlFor="state"> State </label>
              <input
                type="text"
                id="state"
                name="state"
                value={state}
                onChange={udpdateData}
              />
            </div>

            <div className="label-input-container">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={country}
                onChange={udpdateData}
              />
            </div>
          </div>
          <button className="student-address-btn">Next</button>
        </form>
      </section>
    </main>
  );
};

export default StudentAddress;
