import React from "react";
import UserCard from "../components/UserCard";

const UserCard = () => {
  const [counts, setCounts] = useState({
    totalAccounts: 0,
    totalAdmins: 0,
    totalActiveAdmins: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await axios.get("http://18.138.76.236:3000/api/counts");
        // console.log("API Response:", response.data); // Debug log
        if (response.data.success) {
          setCounts(response.data.data);
        } else {
          setError(response.data.message || "Failed to fetch counts");
        }
      } catch (err) {
        console.error("Error in Axios request:", err);
        setError("Error fetching counts");
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  // Data for the UserCard components
  const cardData = [
    {
      icon: <FontAwesomeIcon icon={faUserShield} />, // FontAwesome icon
      title: "Total Admins",
      count: counts.totalAdmins,
      bgColor: "#4A148C",
    },
    {
      icon: <FontAwesomeIcon icon={faUser} />, // FontAwesome icon
      title: "Total Players",
      count: counts.totalAccounts,
      bgColor: "#1565C0",
    },
    {
      icon: <FontAwesomeIcon icon={faUserShield} />, // FontAwesome icon
      title: "Online Admins",
      count: counts.totalActiveAdmins,
      bgColor: "#1B5E20",
    },
    {
      icon: <FontAwesomeIcon icon={faUser} />, // FontAwesome icon
      title: "Online Players",
      count: 0, // Placeholder for now
      bgColor: "#FFA000",
    },
  ];

  return (
    <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
      {cards.map((card, index) => (
        <UserCard
          key={index}
          icon={card.icon}
          title={card.title}
          count={card.count}
          bgColor={card.bgColor}
        />
      ))}
    </div>
  );
};

export default UserCard;
