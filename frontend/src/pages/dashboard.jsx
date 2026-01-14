const [gigs, setGigs] = useState([]);
const [search, setSearch] = useState("");

const fetchGigs = async () => {
    try {
        const res = await axios.get(`http://localhost:5000/api/gigs?search=${search}`);
        setGigs(res.data);
    } catch (err) {
        console.log("Fetch error:", err);
    }
};

useEffect(() => {
    fetchGigs();
}, [search]);