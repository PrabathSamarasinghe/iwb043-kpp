import React from 'react'
import styles from './details.module.css'
const details = ({product, closedetails}) => {

  return (
    <div className={styles.boxele}>
      <h3 className={styles.heading}>{product.firstName}</h3>
      <button className={styles.xbtn} onClick={closedetails}>X</button>
      <div className={styles.udetails}>
        <div className={styles.udetailsparts}>

            <div class="form-row">
                <label htmlFor="exampleInputfullname">Full Name</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="exampleInputFullname" 
                    value={product.fullName} 
                    aria-describedby="emailHelp" 
                    readOnly 
                />
            </div>

            <div class="form-row">
                <label htmlFor="exampleInputEmail">Address</label>
                <input 
                    type="email" 
                    className="form-control" 
                    id="exampleInputEmail" 
                    value={product.address}
                    aria-describedby="emailHelp" 
                    readOnly 
                />
            </div>

            <div class="form-row">
                <label htmlFor="exampleInputnic">NIC</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="exampleInputnic" 
                    value={product.nic}
                    aria-describedby="emailHelp" 
                    readOnly 
                />
            </div>

            <div class="form-row">
                <label htmlFor="exampleInputHome Number">Date of Birth</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="exampleInputdob" 
                    value={product.dob} 
                    aria-describedby="emailHelp" 
                    readOnly 
                />
            </div>

            <div class="form-row">
                <label htmlFor="exampleInputgender">Gender</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="exampleInputUsername" 
                    value={product.gender}
                    aria-describedby="emailHelp" 
                    readOnly 
                />
            </div>

        </div>
        <div className={styles.udetailsparts}>
        <div class="form-row">
                <label htmlFor="exampleInputaddress">Email </label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="exampleInputEmail" 
                    value={product.email}
                    aria-describedby="emailHelp" 
                    readOnly 
                />
            </div>

            <div class="form-row">
                <label htmlFor="exampleInputPhone Number">Phone Number</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="exampleInputnic" 
                    value={product.phone} 
                    aria-describedby="emailHelp" 
                    readOnly 
                />
            </div>

            <div class="form-row">
                <label htmlFor="exampleInputdob">Home Number</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="exampleInputHome Number" 
                    value={product.home} 
                    aria-describedby="emailHelp" 
                    readOnly 
                />
            </div>

            <div class="form-row">
                <label htmlFor="exampleInputUsername">Username</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="exampleInputgender" 
                    value={product.username}
                    aria-describedby="emailHelp" 
                    readOnly 
                />
            </div>
        </div>
      </div>
        <div className={styles.btnbox2}>
            <button className={styles.accbtn}>Accept</button>
            <button className={styles.rejbtn}>Reject</button>
        </div>
    </div>
  )
}

export default details
