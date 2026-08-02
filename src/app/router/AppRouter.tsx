import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PublicLayout from '../../components/PublicLayout';
import HomePage from '../../pages/HomePage';
import AuthPage from '../../pages/AuthPage';
import DashBoardPage from '../../pages/DashBoardPage';
import InviteUser from '../../components/InviteUser';
import ViewUser from '../../components/ViewUser';
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login/:role" element={<AuthPage />} />
          <Route path="/dashboard/:role" element={<DashBoardPage />} />
          <Route path="/dashboard/inviteUser" element={<InviteUser />} />
          <Route path="/profile/:userId" element={<ViewUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
