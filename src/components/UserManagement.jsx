import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function UserManagement() {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [tableData, setTableData] = useState([]);
  const [userId, setUserId] = useState(null);

  const deleteFn = async (id) => {
    try {
      await fetch(`http://localhost:3000/users/${id}`, {
        method: "Delete",
        headers: {
          "Content-Type": "application/json",
        },
      });
      showData();
    } catch (error) {
      console.log(error);
    }
  };

  function editFn(data) {

    setUserId(data.id);
    console.log(data);
    setValue("email", data.email);
    setValue("password", data.password);
    setValue("address", data.address);
    setValue("address2", data.address2);
    setValue("city", data.city);
    setValue("state", data.state);
    setValue("zipcode", data.zipcode);
  }

  const showData = useCallback(async () => {
    const getResponse = await fetch("http://localhost:3000/users");
    const getResult = await getResponse.json();
    console.log(getResult);
    setTableData(getResult);
  }, []);

  useEffect(() => {
    showData();
  }, [showData]);

  const createUser = async (data) => {
    await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };
  const updateUser =useCallback( async (data) => {
    await fetch(`http://localhost:3000/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  },[userId]);

  const onSubmit = useCallback(
    async (data) => {
      if (userId) {
        await updateUser(data);
      }
      else{
        await createUser(data);
      }

      reset();
      showData();
    },
    [reset, showData,updateUser,userId]
  );
  return (
    <div className="container mt-5">
      <h1>User Management</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">
            Email
          </label>
          <input
            {...register("email")}
            type="email"
            className="form-control"
            id="inputEmail4"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputPassword4" className="form-label">
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            className="form-control"
            id="inputPassword4"
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputAddress" className="form-label">
            Address
          </label>
          <input
            {...register("address")}
            type="text"
            className="form-control"
            id="inputAddress"
            placeholder="1234 Main St"
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputAddress2" className="form-label">
            Address 2
          </label>
          <input
            {...register("address2")}
            type="text"
            className="form-control"
            id="inputAddress2"
            placeholder="Apartment, studio, or floor"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputCity" className="form-label">
            City
          </label>
          <input
            {...register("city")}
            type="text"
            className="form-control"
            id="inputCity"
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="inputState" className="form-label">
            State
          </label>
          <select
            {...register("state")}
            id="inputState"
            className="form-select"
          >
            <option defaultValue={""}>Choose...</option>
            <option value={"Maharashtra"}>Maharashtra</option>
            <option value={"Goa"}>Goa</option>
            <option value={"Gujrat"}>Gujrat</option>
          </select>
        </div>
        <div className="col-md-2">
          <label htmlFor="inputZip" className="form-label">
            Zip
          </label>
          <input
            {...register("zipcode")}
            type="text"
            className="form-control"
            id="inputZip"
          />
        </div>
        <div className="col-12">
          {!userId ? (
            <button type="submit" className="btn btn-primary">
              Create User
            </button>
          ) : (
            <button type="submit" className="btn btn-primary">
              Update User
            </button>
          )}
        </div>
      </form>

      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Email</th>
              <th scope="col">Password</th>
              <th scope="col">Address</th>
              <th scope="col">Address2</th>
              <th scope="col">City</th>
              <th scope="col">State</th>
              <th scope="col">Zip</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item) => {
              return (
                <tr key={item.id}>
                  <th scope="row">{item.id}</th>
                  <td>{item.email}</td>
                  <td>{item.password}</td>
                  <td>{item.address}</td>
                  <td>{item.address2}</td>
                  <td>{item.city}</td>
                  <td>{item.state}</td>
                  <td>{item.zipcode}</td>
                  <td>
                    <i
                      onClick={() => editFn(item)}
                      className="fa fa-pencil me-2"
                    ></i>
                    <i
                      onClick={() => deleteFn(item.id)}
                      className="fa fa-trash"
                    ></i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserManagement;
