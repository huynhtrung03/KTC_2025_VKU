import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  console.log("<<=== 🚀 session DashboardPage ===>>", session);
  return (
    <div>
      <h1>DashboardPage</h1>
    </div>
  );
};

export default DashboardPage;