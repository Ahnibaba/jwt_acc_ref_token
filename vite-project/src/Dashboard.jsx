import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const onLoad = async () => {
            try {
                const response = await axios.get("http://localhost:4001/dashboard", { withCredentials: true });
                if (response.data.success) {
                    setMessage(response.data.message);
                } else {
                    navigate("/");
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    // If 401, navigate to the login page
                    navigate("/login");
                } else {
                    console.log(error);
                }
            }
        };
        onLoad();
    }, [navigate]); // Include navigate in the dependency array

    return (
        <div>Dashboard {message}</div>
    );
};

export default Dashboard;
