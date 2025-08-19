import { useState, useEffect } from "react";





export function Login(props) {
  const [userData, setUserData] = useState({username:"", password:"",loginErrors:""});
  const [loggedIn, setLoggedIn] = useState(false);

  const handleChange = (event) => {
    setUserData({...userData, [event.target.name]: event.target.value})
  };

  function handleLogin() {
    setLoggedIn(true);
  }

  const HandleSubmit = (event) => {
    event.preventDefault();
    fetch('http://127.0.0.1:3001/sessions', {
      method: 'POST', 
      headers: {'Content-Type': 'application/json',},
      body: JSON.stringify({
            user: {
              username: "Derek",
              password: "password"
            }
      }),
    })
    .then(res => res.json())
    .then((res) => {
      console.log(res.logged_in)
      if (res.logged_in && res.patient) {
          handleLogin()
          console.log("me data!")
        } else {
          handleLogin()
          console.log("moo data!")
        }
    })
    .catch(error => {
      console.log("login error", error);
    });
  }

  return (
    <div>
      <form onSubmit={HandleSubmit}>
        <div className="form-group">
          <input
            className="form-control"
            type="username"
            name="username"
            placeholder="Username"
            required
            value={userData.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="Password"
            required
            value={userData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-sm">
          Login
        </button>
      </form>
    </div>
  );

}
// import React, { Component } from "react";
// import axios from "axios";

// export default class Login extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       username: "",
//       password: "",
//       loginErrors: ""
//     };
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//   }

//   handleSubmit(event) {
//     const { username, password } = this.state;
//     axios
//       .post(
//         "http://localhost:3001/sessions",
//         {
//           user: {
//             username: email,
//             password: password
//           }
//         },
//         { withCredentials: true }
//       )
//       .then(response => {
//         if (response.data.logged_in && response.data.patient) {
//           this.props.handleSuccessfulAuth(response.data);
//         } else {
//           this.props.handleSuccessfulDoctorAuth(response.data);
//         }
//       })
//       .catch(error => {
//         console.log("login error", error);
//       });

//     event.preventDefault();
//   }

//   handleChange(event) {
//     this.setState({
//       [event.target.name]: event.target.value
//     });
//   }

//   render() {
//     return (
//       <div>
//         <form onSubmit={this.handleSubmit}>
//           <div className="form-group">
//             <input
//               className="form-control"
//               type="email"
//               name="email"
//               placeholder="Email"
//               required
//               value={this.state.username}
//               onChange={this.handleChange}
//             />
//           </div>
//           <div className="form-group">
//             <input
//               className="form-control"
//               type="password"
//               name="password"
//               placeholder="Password"
//               required
//               value={this.state.password}
//               onChange={this.handleChange}
//             />
//           </div>
//           <button type="submit" className="btn btn-primary btn-sm">
//             Login
//           </button>
//         </form>
//       </div>
//     );
//   }
// }

// //TODO also needds changing over to functional, and to be re-written by myself

 