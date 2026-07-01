import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

import { AppProvider, NotificationProvider } from './context';
import { Navbar, Footer } from './components/common';
import {
  HomePage,
  SubmitClaimPage,
  ClaimsListPage,
  ReviewClaimsPage,
  BudgetManagementPage,
  MonthlySummaryPage
} from './pages';

function App() {
  return (
    <AppProvider>
      <NotificationProvider>
        <Router>
          <div className="app-container">
            <Navbar />
            <main className="main-content">
              <Container fluid>
                <Routes>
                  {/* Home Page */}
                  <Route path="/" element={<HomePage />} />
                  
                  {/* Claim Routes */}
                  <Route path="/submit-claim" element={<SubmitClaimPage />} />
                  <Route path="/claims" element={<ClaimsListPage />} />
                  <Route path="/review" element={<ReviewClaimsPage />} />
                  
                  {/* Budget Routes */}
                  <Route path="/budgets" element={<BudgetManagementPage />} />
                  
                  {/* Summary Routes */}
                  <Route path="/summary" element={<MonthlySummaryPage />} />
                  
                  {/* Redirect unknown routes to home */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Container>
            </main>
            <Footer />
          </div>
        </Router>
      </NotificationProvider>
    </AppProvider>
  );
}

export default App;