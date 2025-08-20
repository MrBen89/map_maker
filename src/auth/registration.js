import { useState } from "react";

export function Registration(props) {
  const [registrationData, setRegistrationData] = useState({username:"", password:"", password_confirmation:"", regErrors:""});
  const [loggedIn, setLoggedIn] = useState(false);

  const handleChange = (event) => {
    setRegistrationData({...registrationData, [event.target.name]: event.target.value})
  };

  const handleSubmits = (event) => {
    event.preventDefault();
    console.log("Registration Data", registrationData)
    console.log("submit")
    fetch('http://127.0.0.1:3001/users', {
      method: 'POST', 
      headers: {'Content-Type': 'application/json',},
      body: JSON.stringify({
              username: registrationData.username,
              password: registrationData.password,
              password_confirmation: registrationData.password_confirmation
      }),
    })
    .then(res => res.json())
    .then((res) => {
      console.log(res)
      if (res.status === "created") {
          console.log("Registration data", res.data)
        }
    })
    .catch(error => {
      console.log("Registration Error", error);
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmits}>
        <div className="form-group">
          <input
            className="form-control"
            type="username"
            name="username"
            placeholder="Username"
            required
            value={registrationData.username}
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
            value={registrationData.password}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <input
            className="form-control"
            type="password_confirmation"
            name="password_confirmation"
            placeholder= "Retype Password"
            required
            value={registrationData.password_confirmation}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary btn-sm">
          Register
        </button>
      </form>
    </div>
  );
}

//if (response.data.status === "created") {
//           console.log("Registration data", response.data)

// export default class Registration extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       username: "",
//       password: "",
//       password_confirmation: "",
//       registrationErrors: ""
//     };
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//   }

//   handleSubmit(event) {
//     const {
//       email,
//       password,
//       password_confirmation
//     } = this.state;
//     axios
//       .post(
//         "http://localhost:3001/users",
//         {
//           user: {
//             username: email,
//             password: password,
//             password_confirmation: password_confirmation
//           }
//         },
//         { withCredentials: true }
//       )
//       .then(response => {
//         if (response.data.status === "created") {
//           console.log("Registration data", response.data)
//         }
//       })
//       .catch(error => {
//         console.log("registration error", error);
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

//           <div className="form-group">
//             <input
//               className="form-control"
//               type="password"
//               name="password_confirmation"
//               placeholder="Password Confirmation"
//               required
//               value={this.state.password_confirmation}
//               onChange={this.handleChange}
//             />
//           </div>

//           <button type="submit" className="btn btn-primary btn-sm">
//             Register
//           </button>
//           <p>
//             Have an account? <Link to="/">Login</Link>
//           </p>
//         </form>
//       </div>
//     );
//   }
// }

//TODO This is old and nasty, and wants refactoring into a function component. But for now, we`ll try it out.