import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PublicLayout from '../../components/PublicLayout';
import HomePage from '../../pages/HomePage';
import AuthPage from '../../pages/AuthPage';
import DashBoardPage from '../../pages/DashBoardPage';
import InviteUser from '../../components/InviteUser';
import ViewUser from '../../components/ViewUser';
import Projects from '../../components/Projects';
import ProjectInfo from '../../components/ProjectInfo';

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
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:projectId" element={<ProjectInfo />} />
          <Route path="/dashboard/projects" element={<Projects />} />
          <Route path="/dashboard/projects/:projectId" element={<ProjectInfo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
