import { useEffect, useState } from "react";
import { LuzmoDashboardComponent } from '@luzmo/react-embed';
import { useRouter } from "next/router";

function App() {
  const [data, setData] = useState(null);  

  const router = useRouter();

  const dashboardId = router.query.id;

  const fetchData = async () => {
    const response = await fetch("https://api.luzmo.com/0.1.0/securable", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "get",
        key: process.env.LUZMO_API_KEY,
        token: process.env.LUZMO_API_TOKEN,
        version: "0.1.0",
        find: {
          where: {
            id: dashboardId,
            type: "dashboard",
          },
        },
      }),
    });
    const data = await response.json();
    setData(data);
  };

  useEffect(() => {
    if (dashboardId) {
      fetchData();
    }
  }, [dashboardId]);

  return (
    <div>
      <h1>Dashboard</h1>
      <LuzmoDashboardComponent
        appServer="https://app.luzmo.com"
        apiHost="https://api.luzmo.com"
        authKey={process.env.LUZMO_API_KEY}
        authToken={process.env.LUZMO_API_TOKEN}
        dashboardId={dashboardId}
      ></LuzmoDashboardComponent>
    </div>
  );
}

export default App;
