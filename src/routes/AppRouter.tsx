import { Navigate, Route, Routes } from "react-router";
import { ProtectedRoute } from "./ProtectedRoute";
import Login from "../Auth/Login";
import Casino from "../Games/Casino";
import InGame from "../Game/Ingame";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Casino />} />
        <Route path="/game/:gameCode" element={<InGame />} />
      </Route>

      <Route path="*" element={(<Navigate to="/" replace />)} />
    </Routes>
  )
}
