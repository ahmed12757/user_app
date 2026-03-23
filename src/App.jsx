import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import FaceCapturePage from './pages/FaceCapturePage';
import Home from './pages/Home';
import AccidentReport from './pages/AccidentReport';
import SplashScreen from './components/PWA/SplashScreen';
import PWAInstallButton from './components/PWA/InstallPrompt';

const App = () => {
    console.log('🏁 App Initializing...');
    const [capturedFace, setCapturedFace] = useState(null);
    const [showSplash, setShowSplash] = useState(true);
    
    useEffect(() => {
        console.log('📱 App Mounted. Splash state:', showSplash);
    }, [showSplash]);

    // Check if user is logged in
    const isAuthenticated = () => {
        const user = localStorage.getItem('currentUser');
        return !!user;
    };

    // Check if face is verified in this session
    const isFaceVerified = () => {
        return sessionStorage.getItem('faceVerified') === 'true';
    };

    const RequireAuth = ({ children }) => {
        return isAuthenticated() ? children : <Navigate to="/login" replace />;
    };

    const RequireFace = ({ children }) => {
        if (!isAuthenticated()) {
             return <Navigate to="/login" replace />;
        }
        if (!isFaceVerified()) {
            return <Navigate to="/face-capture" replace />;
        }
        return children;
    };

    return (
        <div className="min-h-screen bg-black overflow-hidden relative">
            {/* Install button must be outside to capture event immediately */}
            <PWAInstallButton showSplash={showSplash} />
            
            {showSplash && <SplashScreen onFinish={() => {
                console.log('✨ Splash Screen finished');
                setShowSplash(false);
            }} />}
            
            {!showSplash && (
                <Routes>
                    {/* Root route: Redirect based on auth and face status */}
                    <Route 
                        path="/" 
                        element={
                            isAuthenticated() 
                                ? (isFaceVerified() ? <Navigate to="/home" replace /> : <Navigate to="/face-capture" replace />)
                                : <Navigate to="/login" replace />
                        } 
                    />
                    
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    
                    {/* Protected Routes */}
                    <Route path="/face-capture" element={
                        <RequireAuth>
                            <FaceCapturePage setCapturedFace={setCapturedFace} />
                        </RequireAuth>
                    } />
                    
                    <Route path="/home" element={
                        <RequireFace>
                            <Home />
                        </RequireFace>
                    } />
                    
                    <Route path="/report" element={
                        <RequireFace>
                            <AccidentReport capturedFace={capturedFace} />
                        </RequireFace>
                    } />
                </Routes>
            )}
        </div>
    );
};

export default App;
