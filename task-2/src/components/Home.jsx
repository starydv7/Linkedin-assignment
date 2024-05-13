import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [data, setData] = useState([]);
    const [counts, setCounts] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null); // State to store the ID of the selected item
    const [updateName, setUpdateName] = useState(''); // State to hold the name for updating
    const [updateAge, setUpdateAge] = useState(''); // State to hold the age for updating

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const responseCounts = await axios.get('http://localhost:8080/api/count');
            setCounts(responseCounts.data);

            const responseData = await axios.get('http://localhost:8080/api/data');
            setData(responseData.data);
            console.log(responseData.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleAddData = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/add', { name, age });
            const newItem = response.data; // Newly added item
            setData([...data, newItem]); // Add the new item to the data array
            setName('');
            setAge('');
            setCounts(prevCounts => ({ ...prevCounts, addCount: prevCounts.addCount + 1 })); // Increment addCount
            alert('Data added successfully');
        } catch (error) {
            console.error('Error adding data:', error);
        }
    };
    

    const handleUpdateData = async (id, name, age) => {
        try {
            setSelectedItemId(id); // Set the ID of the selected item
            setUpdateName(name); // Set the name for updating
            setUpdateAge(age); // Set the age for updating
            setShowModal(true); // Open the modal
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false); // Close the modal
    };

    const handleSubmitUpdate = async () => {
        try {
            await axios.put(`http://localhost:8080/api/update/${selectedItemId}`, { name: updateName, age: updateAge });
            setShowModal(false); // Close the modal after successful update
            fetchData(); // Refresh data
            alert('Data updated successfully');
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    return (
        <div>
            <h1>Data Management</h1>
            <div>
                <h2>Add Data</h2>
                <label>Name: </label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} /><br />
                <label>Age: </label>
                <input type="number" value={age} onChange={(e) => setAge(e.target.value)} /><br />
                <button onClick={handleAddData}>Add</button>
            </div>
            <div>
                <h2>Data</h2>
                <ul>
                    {data.map((item) => (
                        <li key={item._id}>
                            {item.name} - {item.age}
                            <button onClick={() => handleUpdateData(item._id, item.name, item.age)}>Update</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>Counts</h2>
                <p>Add Count: {counts.addCount}</p>
                <p>Update Count: {counts.updateCount}</p>
            </div>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                        <h2>Update Data</h2>
                        <label>Name: </label>
                        <input type="text" value={updateName} onChange={(e) => setUpdateName(e.target.value)} /><br />
                        <label>Age: </label>
                        <input type="number" value={updateAge} onChange={(e) => setUpdateAge(e.target.value)} /><br />
                        <button onClick={handleSubmitUpdate}>Update</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
