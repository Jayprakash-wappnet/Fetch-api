import React, { useState, useEffect } from "react";
import { IUsers } from "../models/IUsers";
import { UserService } from "../services/UserService.ts";
interface IState{
    loading:boolean,
    users: IUsers[],
    errorMsg: string
}

const Users: React.FC = () => {
    const [state, setState] = useState<IState>({
        loading: false,
        users: [] as IUsers[],
        errorMsg: "",
      });


// network request

 useEffect(() => {
    setState({ ...state, loading: true });
    UserService.getAllUsers()
      .then((res) =>
        setState({
          ...state,
          loading: false,
          users: res.data,
        })
      )
      .catch((err) =>
        setState({
          ...state,
          loading: false,
          errorMsg: err.message,
        })
      );
    //eslint-disable-next-line
 }, [])

 const { loading, users, errorMsg } = state;


  return (
    <div className="container">
      <h1>User Data from API</h1>
      {errorMsg && <p>{errorMsg}</p>}
        {loading && <h1>Loading...</h1>}
        <table className="table table-striped">
          <thead>
            <tr>
              <td>Id</td>
              <td>Name</td>
              <td>Username</td>
              <td>Email</td>
              <td>city</td>
              <td>street</td>
              <td>zipCode</td>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 &&
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.address.city}</td>
                  <td>{user.address.street}</td>
                  <td>{user.address.zipcode}</td>
                </tr>
              ))}
          </tbody>
        </table>
    </div>
  );
};

export default Users;
