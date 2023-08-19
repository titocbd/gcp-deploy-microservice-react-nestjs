import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { BASE_API } from "./configs/data";

function App() {
  const [data, setData] = useState([]);

  const fetchData = () => {
    axios.get(`${BASE_API}/users`).then(resp => {
      // console.log(data);
      setData(resp.data);
    })
    .catch(e => {console.log('error ', e);})
  }

  const deleteUser = (id) => {
    axios.delete(`${BASE_API}/users/${id}`)
      .then(resp => {
        console.log('deleted');
        fetchData();
      })
      .catch(e => {console.log('error ', e);})
  }

  useEffect(() => {
    fetchData();
  }, []);

  return data && (
    <>
      <div className="container mx-auto"></div>

      <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="my-4">
          <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Microservice</span> Example</h1>
          <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Learn more at https://github.com/vitejs/vite-plugin-react/</p>
        </div>
        <div className="text-right mr-1">
          <Link to={'/add'} className="bg-blue-700 font-semibold rounded-md text-white px-4 py-2">Add New</Link>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  First name
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    Last Name
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    Address
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-right">
                  <p>Action</p>

                </th>
              </tr>
            </thead>
            <tbody>
              {data && data.map((item, index) => 
                (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                    <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {item.first_name}
                    </th>
                    <td className="px-6 py-4">
                      {item.last_name}
                    </td>
                    <td className="px-6 py-4">
                      {item.address}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Link to={'/edit/' + item.id} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                      <button onClick={() => {deleteUser(item.id)}} className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
                      
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>

    </>
  )
}

export default App
