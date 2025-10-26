// @ts-nocheck
import App from '../store/App';
import { AuthProvider } from '../store/context/AuthContext';
import { ThemeProvider } from '../store/context/ThemeContext';
import '../store/index.css';
import '../store/App.css';
import '../store/dark-mode.css';

export default function Store() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <App />
            </AuthProvider>
        </ThemeProvider>
    );
}
